import { HOTEL_INFO } from "@/data/hotelInfo";

/**
 * Formats a monetary amount into the configured currency format (e.g. Rs. 8,500)
 */
export function formatCurrency(amount: number): string {
  const formattedNumber = amount.toLocaleString("en-PK");
  return `${HOTEL_INFO.currencySymbol} ${formattedNumber}`;
}

/**
 * Formats a date string cleanly
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-PK", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: HOTEL_INFO.timezone,
  });
}
