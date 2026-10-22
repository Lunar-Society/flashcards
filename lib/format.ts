const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Formats "YYYY-MM" or "YYYY-MM-DD" as e.g. "Oct 2026".
export function formatDate(iso: string): string {
  const [year, month = "1"] = iso.split("-");
  return `${MONTHS[parseInt(month, 10) - 1]} ${parseInt(year, 10)}`;
}
