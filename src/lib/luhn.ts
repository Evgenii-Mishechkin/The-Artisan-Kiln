export function isValidLuhn(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 13 || digits.length > 19) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i]!, 10);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

export function detectCardBrand(
  cardNumber: string,
): "visa" | "mastercard" | "unknown" {
  const digits = cardNumber.replace(/\D/g, "");
  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(digits)) return "visa";
  if (
    /^(5[1-5]\d{14}|2(2[2-9]\d{2}|[3-6]\d{3}|7([01]\d|20))\d{12})$/.test(
      digits,
    )
  ) {
    return "mastercard";
  }
  return "unknown";
}
