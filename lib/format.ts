const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Formats "YYYY-MM" or "YYYY-MM-DD" as e.g. "Oct 2026".
export function formatDate(iso: string): string {
  const [year, month = "1"] = iso.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(year, 10)}`;
}

// Formats an ISO date or timestamp as e.g. "Oct 30, 2026".
export function formatDay(iso: string): string {
  const [year, month, day] = iso.slice(0, 10).split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${parseInt(year, 10)}`;
}
