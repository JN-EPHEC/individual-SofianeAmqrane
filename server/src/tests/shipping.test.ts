import { calculateShipping } from "../utils/shipping";

describe("Shipping Calculator - TP 04", () => {
  
  describe("CBT - Limites et Erreurs", () => {
    it("devrait lever une erreur pour une distance négative", () => {
      expect(() => calculateShipping(-1, 5, "standard")).toThrow("Invalid distance");
    });

    it("devrait lever une erreur pour un poids invalide (<= 0 ou > 50)", () => {
      expect(() => calculateShipping(10, 0, "standard")).toThrow("Invalid weight");
      expect(() => calculateShipping(10, 51, "standard")).toThrow("Invalid weight");
    });
  });

  describe("N-Wise Testing - Scénarios optimisés", () => {
    const scenarios = [
      [1, 10, 5, "standard", 10],    // Cas 1 : (10 + 0%) * 1 = 10
      [2, 10, 20, "express", 30],    // Cas 2 : (10 + 50%) * 2 = 30
      [3, 100, 5, "express", 50],    // Cas 3 : (25 + 0%) * 2 = 50
      [4, 100, 20, "standard", 37.5],// Cas 4 : (25 + 50%) * 1 = 37.5
      [5, 600, 5, "express", 100],   // Cas 5 : (50 + 0%) * 2 = 100
      [6, 600, 20, "standard", 75],  // Cas 6 : (50 + 50%) * 1 = 75
    ];

    test.each(scenarios)(
      "ID %i: dist %i, poids %i, type %s => doit coûter %p€",
      (id, dist, weight, type, expected) => {
        expect(
          calculateShipping(
            dist as number, 
            weight as number, 
            type as 'standard' | 'express'
          )
        ).toBe(expected as number);
      }
    );
  });
});