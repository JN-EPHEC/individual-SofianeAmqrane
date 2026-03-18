import { validateUserRegistration } from "../utils/userValidator";

describe("User Registration Validator - Homework 2", () => {
  
  describe("Tests de robustesse (Catalog-Based & Errors)", () => {
    it("devrait lever une erreur si l'âge est supérieur à 120", () => {
      expect(() => validateUserRegistration(125, "user", "test@ephec.be")).toThrow("Âge invalide");
    });

    it("devrait lever une erreur pour un rôle non autorisé", () => {
      expect(() => validateUserRegistration(25, "guest", "test@ephec.be")).toThrow("Rôle invalide");
    });

    it("devrait retourner false si l'email n'a pas de point ou d'@ ", () => {
      expect(validateUserRegistration(25, "user", "testatephecbe")).toBe(false);
      expect(validateUserRegistration(25, "user", "test@ephec")).toBe(false);
    });
  });

  describe("Tests logiques (N-Wise / Pairwise)", () => {
    const testCases = [
      [20, "admin", "admin@test.be", true],    
      [17, "stagiaire", "stagi@test.be", true],  
      [16, "user", "mineur@test.be", false],   
      [120, "user", "vieux@test.be", true],   
    ];

    test.each(testCases)(
      "Pour Age %i, Role %s, Email %s => attendu: %p",
      (age, role, email, expected) => {
        expect(validateUserRegistration(age as number, role as string, email as string)).toBe(expected);
      }
    );
  });
});