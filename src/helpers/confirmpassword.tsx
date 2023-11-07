export function confirmPasswordValidator(confirmPassword: string): string {
    if (!confirmPassword ) return " ConifrmPassword is required";
    if (confirmPassword.length < 5) return 'confirm Password must be at least 5 characters long';
    return '';
  }