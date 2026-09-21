import { formatCurrency } from '@/lib/utils';

describe('formatCurrency', () => {
  it('formats standard positive numbers to USD currency format by default', () => {
    expect(formatCurrency(2489.48)).toBe('$2,489.48');
    expect(formatCurrency(5.99)).toBe('$5.99');
    expect(formatCurrency(12)).toBe('$12.00');
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats numeric strings properly', () => {
    expect(formatCurrency('15.5')).toBe('$15.50');
    expect(formatCurrency('1000')).toBe('$1,000.00');
    expect(formatCurrency('0')).toBe('$0.00');
  });

  it('handles negative values accurately', () => {
    expect(formatCurrency(-25.5)).toBe('-$25.50');
  });

  it('rounds numbers to two decimal places', () => {
    expect(formatCurrency(10.555)).toBe('$10.56');
    expect(formatCurrency(10.554)).toBe('$10.55');
  });

  it('handles other valid currency codes when provided', () => {
    expect(formatCurrency(100, 'EUR')).toBe('€100.00');
    expect(formatCurrency(100, 'GBP')).toBe('£100.00');
  });

  it('handles non-numeric invalid inputs gracefully', () => {
    expect(formatCurrency('invalid-amount')).toBe('$0.00');
    expect(formatCurrency(NaN)).toBe('$0.00');
  });

  it('uses fallback in catch block when an error or invalid currency is thrown', () => {
    // Passing an invalid currency code to Intl.NumberFormat will throw a RangeError in Intl
    const result = formatCurrency(50.25, 'INVALID_CURRENCY_CODE_123');
    expect(result).toBe('$50.25');
  });
});
