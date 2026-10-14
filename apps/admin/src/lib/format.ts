/**
 * Formats a Prisma Decimal string (e.g. "8500.00") into a localised
 * currency string using the hotel's currency code (e.g. "PKR 8,500").
 */
export function formatCurrency(
  value: string | number,
  currency = "PKR"
): string {
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return `${currency} —`;
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

/**
 * Formats total guest capacity as a readable string.
 * e.g. capacityAdults=2, capacityChildren=1 → "2 adults · 1 child"
 */
export function formatCapacity(adults: number, children: number): string {
  const childLabel = children === 1 ? "child" : "children";
  if (children === 0) {
    return `${adults} adults`;
  }
  return `${adults} adults · ${children} ${childLabel}`;
}
