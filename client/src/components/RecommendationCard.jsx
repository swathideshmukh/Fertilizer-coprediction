function RecommendationCard() {
  return (
    <div className="bg-[var(--moss-900)] text-white rounded-lg p-8 mt-6 relative overflow-hidden">
      <span className="absolute top-0 left-0 right-0 h-1 bg-[var(--wheat)]" />

      <p className="label-eyebrow text-[var(--wheat)] mb-3">
        AI Recommendation
      </p>

      <h2 className="font-display text-2xl mb-4 leading-snug">
        Reduce nitrogen dosage by 12% this season
      </h2>

      <p className="text-[var(--moss-100)]/80 leading-7 max-w-2xl">
        Based on soil moisture, rainfall prediction, and nitrogen analysis,
        the optimal nitrogen dosage for this season should be reduced to
        avoid over-fertilization and maximize crop productivity.
      </p>
    </div>
  );
}

export default RecommendationCard;
