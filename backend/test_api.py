import requests

BASE = "http://localhost:3000"
BAD_USER = "thisuserdoesnotexist_xyz_98765"

for path in [f"/{BAD_USER}", f"/{BAD_USER}/solved", f"/userContestRankingInfo/{BAD_USER}", f"/{BAD_USER}/calendar"]:
    r = requests.get(BASE + path, timeout=60)
    print(f"\n{path} -> {r.status_code}")
    print(r.text[:300])