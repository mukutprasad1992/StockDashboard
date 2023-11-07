export function emailValidator(email: string): string {
  const re = /\S+@\S+\.\S+/;
  if (!email) return "Email address is required";
  if (!re.test(email)) return 'Ooops! We need a valid email address';
  return '';
}
