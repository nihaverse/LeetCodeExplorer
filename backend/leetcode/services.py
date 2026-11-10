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
    }