export const CHANNEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  instagram: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/40' },
  linkedin: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/40' },
  facebook: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/40' },
  email: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/40' },
  tiktok: { bg: 'bg-rose-500/20', text: 'text-rose-400', border: 'border-rose-500/40' },
  youtube: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/40' },
  twitter: { bg: 'bg-sky-500/20', text: 'text-sky-400', border: 'border-sky-500/40' },
  bluesky: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/40' },
};

export function getChannelColor(platform: string) {
  const normalized = platform.toLowerCase().trim();
  return CHANNEL_COLORS[normalized] || { bg: 'bg-surface-2', text: 'text-text-2', border: 'border-surface-2' };
}
