import { calculateEnergy } from './energy';

test('calculates energy correctly', () => {
  expect(calculateEnergy(10, 2, 5)).toBe(100);
});

test('returns 0 for zero or negative mass', () => {
  expect(calculateEnergy(0, 2, 5)).toBe(0);
  expect(calculateEnergy(-1, 2, 5)).toBe(0);
});

test('returns 0 for zero or negative fuelPerKg', () => {
  expect(calculateEnergy(10, 0, 5)).toBe(0);
  expect(calculateEnergy(10, -2, 5)).toBe(0);
});

test('returns 0 for zero or negative energyPerKg', () => {
  expect(calculateEnergy(10, 2, 0)).toBe(0);
  expect(calculateEnergy(10, 2, -5)).toBe(0);
});