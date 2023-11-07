export function passwordValidator(password: string): string {
  if (!password) return "Password is required";
  if (password.length < 5) return 'Password must be at least 5 characters long';
  return '';
}
