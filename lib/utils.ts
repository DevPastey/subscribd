/**
 * Formats a numerical value as standard U.S. money ($ with exactly two decimal places),
 * defaulting to USD.
 *
 * @param value - The numerical amount to format (number or numeric string).
 * @param currency - The ISO 4217 currency code (defaults to 'USD').
 * @returns A formatted currency string (e.g., "$1,234.56", "$0.00").
 */
export function formatCurrency(
  value: number | string,
  currency: string = 'USD'
): string {
  try {
    const numericValue = typeof value === 'string' ? Number(value) : value;

    if (isNaN(numericValue) || typeof numericValue !== 'number') {
      return '$0.00';
    }

    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numericValue);
  } catch (_error) {
    const numericValue = typeof value === 'number' ? value : Number(value);
    const fallbackNumber = isNaN(numericValue) ? 0 : numericValue;
    return `$${fallbackNumber.toFixed(2)}`;
  }
}

export function formatRenewalPeriod(billing: string) {
  switch (billing.toLowerCase()) {
    case 'monthly':
      return 'per month';
    case 'yearly':
      return 'per year';
    case 'weekly':
      return 'per week';
    case 'daily':
      return 'per day';
    default:
      return '';
  }
}


export default formatCurrency;