export function cn(
  ...classes: Array<string | false | null | undefined>
): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPhoneDisplay(phone: string): string {
  return phone;
}

export function formatAddressLines(address: {
  additional: string | null;
  street: string;
  postalCode: string;
  city: string;
}): string[] {
  const lines: string[] = [];
  if (address.additional) {
    lines.push(address.additional);
  }
  lines.push(address.street);
  lines.push(`${address.postalCode} ${address.city}`);
  return lines;
}

export function mapsSearchUrl(address: {
  additional: string | null;
  street: string;
  postalCode: string;
  city: string;
}): string {
  const query = [
    address.additional,
    address.street,
    address.postalCode,
    address.city,
  ]
    .filter(Boolean)
    .join(" ");

  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
