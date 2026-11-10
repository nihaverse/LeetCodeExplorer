import { BadgeCheck } from "lucide-react";

function ProfileCard({ user }) {
  const { username, name, avatar, country, contest } = user;

  const subtitle = [name, country].filter(Boolean).join(" · ");

  return (
    <div className="rounded-3xl border border-border bg-surface p-6">
      <div className="flex flex-wrap items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="h-24 w-24 rounded-2xl border-2 border-primary object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary font-display text-3xl font-bold text-background">
              {username?.[0]?.toUpperCase()}
            </div>
          )}
          <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-background">
            <BadgeCheck size={18} />
          </span>
        </div>

        {/* Name */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="font-display text-2xl font-semibold">{username}</h2>
            {contest?.badge && (
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-muted">
                {contest.badge}
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-muted">{subtitle}</p>}
        </div>

        {/* Rank */}
        {contest ? (
          <div className="flex gap-8 border-l border-border pl-8">
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted">
                CONTEST RANK
              </p>
              <p className="mt-1 font-display text-2xl font-semibold">
                #{contest.globalRanking?.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-widest text-muted">
                TOP
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-primary">
                {contest.topPercentage}%
              </p>
            </div>
          </div>
        ) : (
          <p className="border-l border-border pl-8 text-sm text-muted">
            No contest data yet
          </p>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;