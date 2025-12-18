const COLORS = ["#F97316", "#3B82F6", "#10B981", "#8B5CF6", "#EF4444"];

export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
};

export const getInitials = (name?: string) => {
  if (!name) return "?";

  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
