const { add, sub, mul, div, modulo, power, squareRoot } = require('../calculator');

describe('calculator functions', () => {
  test('addition: 2 + 3 => 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtraction: 10 - 4 => 6', () => {
    expect(sub(10, 4)).toBe(6);
  });

  test('multiplication: 45 * 2 => 90', () => {
    expect(mul(45, 2)).toBe(90);
  });

  test('division: 20 / 5 => 4', () => {
    expect(div(20, 5)).toBe(4);
  });

  test('division by zero throws', () => {
    expect(() => div(1, 0)).toThrow(/division by zero/);
  });

  test('modulo: 5 % 2 => 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(1, 0)).toThrow(/modulo by zero/);
  });

  test('power: 2 ^ 3 => 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('power with negative exponent: 2 ^ -1 => 0.5', () => {
    expect(power(2, -1)).toBeCloseTo(0.5);
  });

  test('squareRoot: sqrt(16) => 4', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('squareRoot negative throws', () => {
    expect(() => squareRoot(-1)).toThrow(/square root of negative/);
  });

  test('works with floats: 1.5 + 2.25 => 3.75', () => {
    expect(add(1.5, 2.25)).toBeCloseTo(3.75);
  });

  test('negative numbers: -5 - (-3) => -2', () => {
    expect(sub(-5, -3)).toBe(-2);
  });
});
