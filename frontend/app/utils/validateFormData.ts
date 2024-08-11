export function validateEmail(email: string) {
  const emailValidationRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  return emailValidationRegex.test(email);
}
