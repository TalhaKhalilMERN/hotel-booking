import { HOTEL_INFO } from "@/data/hotelInfo";

/**
 * Formats a monetary amount or API decimal string into the configured currency format (e.g. Rs. 8,500).
 * Handles both number and decimal string values from the backend safely without throwing
 * or scattering unsafe numeric conversions throughout components.
 */
export function formatCurrency(amount: number | string): string {
  if (amount === undefined || amount === null) {
    return `${HOTEL_INFO.currencySymbol} 0`;
  }
  const numeric = typeof amount === "string" ? Number(amount.trim()) : amount;
  if (!Number.isFinite(numeric) || numeric < 0) {
    return `${HOTEL_INFO.currencySymbol} 0`;
  }
  const formattedNumber = Math.round(numeric)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${HOTEL_INFO.currencySymbol} ${formattedNumber}`;
}

/**
 * Dedicated helper to format the backend's canonical basePrice decimal string for display.
 * Keeps basePrice in its API representation as a decimal string at the data boundary.
 */
export function formatBasePrice(basePrice: string): string {
  return formatCurrency(basePrice);
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
