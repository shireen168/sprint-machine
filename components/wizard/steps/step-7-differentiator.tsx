'use client';

interface Step7DifferentiatorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function Step7Differentiator({
  value,
  onChange,
  error,
}: Step7DifferentiatorProps) {
  const maxLength = 200;

  return (
    <div className="space-y-2">
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">
          Your Unique Value
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          placeholder="E.g., Only AI platform built specifically for non-technical small business owners, with guided setup"
          maxLength={maxLength}
          className="w-full h-20 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/20 resize-none"
          rows={1}
        />
        <div className="text-xs text-white/50 mt-1 text-right">
          {value.length} / {maxLength}
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}

      <div className="text-white/60 text-xs bg-white/5 border border-white/10 rounded-lg px-3 py-2">
        <p className="font-medium mb-0">Consider: Unique features, pricing, niche, service</p>
      </div>
    </div>
  );
}
