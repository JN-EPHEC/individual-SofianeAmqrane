import { validatePassword } from "../utils/password";

describe("Password Validator - White Box Testing", () => {
  it("devrait rejeter un mot de passe vide", () => {
    expect(validatePassword("", 20)).toBe(false);
  });

  it("devrait rejeter si moins de 8 caractères", () => {
    expect(validatePassword("Ab1!", 20)).toBe(false);
  });

  it("devrait rejeter si plus long que maxLength", () => {
    expect(validatePassword("Password123!", 5)).toBe(false);
  });

  it("devrait rejeter sans chiffre", () => {
    expect(validatePassword("NoNumber!", 20)).toBe(false);
  });

  it("devrait rejeter sans majuscule", () => {
    expect(validatePassword("nonumber1!", 20)).toBe(false);
  });

  it("devrait rejeter sans minuscule", () => {
    expect(validatePassword("NONUMBER1!", 20)).toBe(false);
  });

  it("devrait rejeter sans caractère spécial", () => {
    expect(validatePassword("NoSpecial123", 20)).toBe(false);
  });

  it("devrait accepter un mot de passe valide", () => {
    expect(validatePassword("Valide123!", 20)).toBe(true);
  });
});