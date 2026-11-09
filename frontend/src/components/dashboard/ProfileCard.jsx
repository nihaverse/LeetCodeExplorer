import { Globe, Trophy, Flame, CheckCircle } from "lucide-react";
function ProfileCard() {
  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-[#19120A] p-6 shadow-xl">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="w-24 h-24 rounded-full bg-[#FFA116] flex items-center justify-center text-3xl font-bold text-black">
          N
        </div>
        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            Niharika
          </h2>
          <p className="text-gray-400 mt-1">
            Competitive Programmer
          </p>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-2 gap-5 mt-8">
        <div className="flex items-center gap-3">
          <Globe className="text-[#4BDCC6]" />
          <div>
            <p className="text-sm text-gray-400">
              Global Rank
            </p>
            <p className="font-semibold">
              24,810
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Trophy className="text-[#FFA116]" />
          <div>
            <p className="text-sm text-gray-400">
              Contest Rating
            </p>
            <p className="font-semibold">
              1682
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <CheckCircle className="text-green-400" />
          <div>
            <p className="text-sm text-gray-400">
              Problems Solved
            </p>
            <p className="font-semibold">
              427
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Flame className="text-red-400" />
          <div>
            <p className="text-sm text-gray-400">
              Current Streak
            </p>
            <p className="font-semibold">
              16 Days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;