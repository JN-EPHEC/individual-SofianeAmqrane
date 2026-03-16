export function validatePassword(password: string, maxLength: number): boolean {
  // Branche 1 : Vide
  if (!password) return false;
  
  // Branche 2 : Trop court
  if (password.length < 8) return false;
  
  // Branche 3 : Trop long
  if (password.length > maxLength) return false;
  
  // Branche 4 : Chiffre
  if (!/\d/.test(password)) return false;

  // Branche 5 : Majuscule
  if (!/[A-Z]/.test(password)) return false;

  // Branche 6 : Minuscule
  if (!/[a-z]/.test(password)) return false;

  // Branche 7 : Caractère spécial
  if (!/[!@#$%^&*]/.test(password)) return false;

  return true;
}