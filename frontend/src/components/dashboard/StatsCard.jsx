function StatCard({ icon: Icon, iconClass, title, value, unit, note }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/40">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconClass}`}
      >
        <Icon size={20} />
      </div>

      <p className="mt-6 text-muted">{title}</p>

      <p className="mt-2 font-display text-4xl font-bold">
        {value}
        {unit && (
          <span className="ml-2 text-xl font-medium text-muted">{unit}</span>
        )}
      </p>

      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
    </div>
  );
}

export default StatCard;