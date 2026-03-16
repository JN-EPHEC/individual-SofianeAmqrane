export function calculateShipping(
  distance: number,
  weight: number,
  type: 'standard' | 'express'
): number {
  if (distance < 0) throw new Error("Invalid distance");
  if (weight <= 0 || weight > 50) throw new Error("Invalid weight");

  let baseCost = 0;

  // 1. Coût de base selon la distance
  if (distance <= 50) {
    baseCost = 10;
  } else if (distance <= 500) {
    baseCost = 25;
  } else {
    baseCost = 50;
  }

  // 2. Majoration selon le poids
  let total = baseCost;
  if (weight >= 10) {
    total = baseCost * 1.5; // +50% de majoration
  }

  // 3. Option Express
  if (type === 'express') {
    total = total * 2;
  }

  return total;
}