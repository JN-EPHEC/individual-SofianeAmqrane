export function validateUserRegistration(
  age: number,
  role: 'admin' | 'user' | 'stagiaire' | string, 
  email: string
): boolean {
  
  if (age > 120) {
    throw new Error("Âge invalide");
  }
  
  if (age < 18) {
    if (role !== "stagiaire") {
      return false;
    }
  }

  const validRoles = ["admin", "user", "stagiaire"];
  if (!validRoles.includes(role)) {
    throw new Error("Rôle invalide");
  }

  if (!email.includes("@") || !email.includes(".")) {
    return false;
  }

  return true;
}