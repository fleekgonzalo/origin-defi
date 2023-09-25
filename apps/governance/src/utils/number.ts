export function toSignificantDigits(num: number, digits: number = 5): string {
  // Convert to scientific notation
  const parts = num
    .toExponential()
    .split('e')
    .map((part) => +part);

  let coefficient = parts[0];
  const exponent = parts[1];

  // Adjust the coefficient to the desired number of significant digits
  coefficient =
    Math.round(coefficient * Math.pow(10, digits - 1)) /
    Math.pow(10, digits - 1);

  // Convert back to regular number using the adjusted coefficient and the original exponent
  const result = coefficient * Math.pow(10, exponent);

  // Determine the number of fraction digits required for formatting
  const fractionDigits = Math.max(0, digits - 1 - exponent);

  // Use toLocaleString to format the number
  return result.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}
