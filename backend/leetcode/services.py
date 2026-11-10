import json
from datetime import datetime, timedelta, timezone
from urllib.parse import quote
from .client import fetch


def _by_difficulty(items, difficulty):
    for item in items or []:
        if item.get("difficulty") == difficulty:
            return item
    return {}


def _acceptance_rate(solved_data):
    accepted = _by_difficulty(solved_data.get("acSubmissionNum"), "All").get("submissions", 0)
    total = _by_difficulty(solved_data.get("totalSubmissionNum"), "All").get("submissions", 0)
    if not total:
        return None
    return round(accepted / total * 100, 1)


def _contest(contest_data):
    ranking = contest_data.get("userContestRanking")
    if not ranking:
        return None
    return {
        "rating": round(ranking["rating"]),
        "globalRanking": ranking.get("globalRanking"),
        "topPercentage": ranking.get("topPercentage"),
        "attendedCount": ranking.get("attendedContestsCount"),
        "badge": (ranking.get("badge") or {}).get("name"),
    }


def _contest_history(contest_data, limit=6):
    history = contest_data.get("userContestRankingHistory") or []
    attended = [h for h in history if h.get("attended")]
    return [
        {
            "title": h["contest"]["title"],
            "startTime": h["contest"]["startTime"],
            "rating": round(h["rating"]),
            "ranking": h.get("ranking"),
        }
        for h in attended[-limit:]
    ]


def _weekly_activity(calendar_data, weeks=12):
    raw = calendar_data.get("submissionCalendar") or "{}"
    try:
        days = json.loads(raw)
    except ValueError:
        days = {}

    today = datetime.now(timezone.utc).date()
    this_monday = today - timedelta(days=today.weekday())
    first_monday = this_monday - timedelta(weeks=weeks - 1)

    buckets = {first_monday + timedelta(weeks=i): 0 for i in range(weeks)}

    for timestamp, count in days.items():
        day = datetime.fromtimestamp(int(timestamp), tz=timezone.utc).date()
        monday = day - timedelta(days=day.weekday())
        if monday in buckets:
            buckets[monday] += count

    return [
        {"weekStart": monday.isoformat(), "submissions": total}
        for monday, total in buckets.items()
    ]


def get_profile(username):
    name = quote(username, safe="")

    profile = fetch(f"/{name}")
    solved = fetch(f"/{name}/solved")
    contest = fetch(f"/userContestRankingInfo/{name}")
    calendar = fetch(f"/{name}/calendar")

    return {
        "username": profile.get("username"),
        "name": profile.get("name"),
        "avatar": profile.get("avatar"),
        "country": profile.get("country"),
        "problemRanking": profile.get("ranking"),
        "solved": {
            "total": solved.get("solvedProblem"),
            "easy": solved.get("easySolved"),
            "medium": solved.get("mediumSolved"),
            "hard": solved.get("hardSolved"),
        },
        "acceptanceRate": _acceptance_rate(solved),
        "streak": calendar.get("streak"),
        "contest": _contest(contest),
        "contestHistory": _contest_history(contest),
        "weeklyActivity": _weekly_activity(calendar),
    }
