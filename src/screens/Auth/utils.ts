export function normalizePhoneNumber(phoneNumber: string): string {
  return phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber
}
