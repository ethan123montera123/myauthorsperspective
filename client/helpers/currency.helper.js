/**
 * @param {number} usd the USD value as a float or an integer
 * @returns {string} a neatly formatted string with a '$' prefix for displaying USD values
 *
 * Example: 1234567.89 => '$1,234,567.89'
 */
function formatUsd(number, options = { showDecimals: true }) {
  const { showDecimals } = options;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return formatter.format(number);
}

export { formatUsd };
