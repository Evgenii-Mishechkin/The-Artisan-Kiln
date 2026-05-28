import { detectCardBrand, isValidLuhn } from "@/lib/luhn";
import type { CardForm, CustomerForm, PaymentMethod } from "@/types";

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCustomer(form: CustomerForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  if (!form.phone.trim()) errors.phone = "Phone is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_RE.test(form.email.trim()))
    errors.email = "Enter a valid email";
  if (!form.address.trim()) errors.address = "Shipping address is required";
  return errors;
}

export function validateCard(card: CardForm): FieldErrors {
  const errors: FieldErrors = {};
  const number = card.number.replace(/\s/g, "");
  const digits = number.replace(/\D/g, "");

  if (!digits) errors.number = "Card number is required";
  else if (!isValidLuhn(digits)) errors.number = "Invalid card number";
  else if (detectCardBrand(digits) === "unknown")
    errors.number = "Only Visa or Mastercard accepted";

  if (!card.expiry.trim()) errors.expiry = "Expiry is required";
  else {
    const match = card.expiry.match(/^(\d{2})\s*\/\s*(\d{2})$/);
    if (!match) errors.expiry = "Use MM/YY format";
    else {
      const month = parseInt(match[1]!, 10);
      const year = 2000 + parseInt(match[2]!, 10);
      if (month < 1 || month > 12) errors.expiry = "Invalid month";
      else {
        const now = new Date();
        const expiry = new Date(year, month, 0);
        if (expiry < new Date(now.getFullYear(), now.getMonth(), 1))
          errors.expiry = "Card has expired";
      }
    }
  }

  const cvv = card.cvv.replace(/\D/g, "");
  if (!cvv) errors.cvv = "CVV is required";
  else if (cvv.length < 3 || cvv.length > 4)
    errors.cvv = "CVV must be 3–4 digits";

  return errors;
}

export function validateCheckout(
  customer: CustomerForm,
  paymentMethod: PaymentMethod,
  card: CardForm,
): FieldErrors {
  return {
    ...validateCustomer(customer),
    ...(paymentMethod === "credit_card" ? validateCard(card) : {}),
  };
}
