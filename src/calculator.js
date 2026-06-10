#!/usr/bin/env node
/**
 * calculator.js
 *
 * Supports operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 *
 * CLI usage examples:
 *   node src/calculator.js add 2 3    # -> 5
 *   node src/calculator.js sub 5 2    # -> 3
 *   node src/calculator.js mul 4 6    # -> 24
 *   node src/calculator.js div 10 2   # -> 5
 */

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, sub, mul, div, mod, pow, sqrt');
  console.log('Aliases: +, -, *, x, /, %, pow, exp');
  console.log('Note: sqrt is unary: node src/calculator.js sqrt <num>');
}

function toNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Error: missing arguments.');
    printUsage();
    process.exit(2);
  }

  const op = args[0].toLowerCase();
  // Unary sqrt
  if (op === 'sqrt') {
    if (args.length < 2) {
      console.error('Error: missing argument for sqrt.');
      printUsage();
      process.exit(2);
    }
    const n = toNumber(args[1]);
    if (Number.isNaN(n)) {
      console.error('Error: operand must be a valid number.');
      process.exit(3);
    }
    if (n < 0) {
      console.error('Error: square root of negative number');
      process.exit(6);
    }
    console.log(Math.sqrt(n));
    process.exit(0);
  }

  // Binary ops
  if (args.length < 3) {
    console.error('Error: missing arguments for binary operation.');
    printUsage();
    process.exit(2);
  }

  const a = toNumber(args[1]);
  const b = toNumber(args[2]);
  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exit(3);
  }

  let result;
  switch (op) {
    case 'add':
    case '+':
      result = a + b;
      break;

    case 'sub':
    case '-':
      result = a - b;
      break;

    case 'mul':
    case 'x':
    case '*':
      result = a * b;
      break;

    case 'div':
    case '/':
      if (b === 0) {
        console.error('Error: division by zero');
        process.exit(4);
      }
      result = a / b;
      break;

    case 'mod':
    case '%':
      if (b === 0) {
        console.error('Error: modulo by zero');
        process.exit(7);
      }
      result = a % b;
      break;

    case 'pow':
    case 'exp':
      result = Math.pow(a, b);
      break;

    default:
      console.error(`Error: unknown operation "${op}"`);
      printUsage();
      process.exit(5);
  }

  console.log(result);
}


// Export for testing or programmatic use
module.exports = {
  add: (x, y) => x + y,
  sub: (x, y) => x - y,
  mul: (x, y) => x * y,
  div: (x, y) => { if (y === 0) throw new Error('division by zero'); return x / y; },
  // modulo: returns remainder of a / b
  modulo: (a, b) => { if (b === 0) throw new Error('modulo by zero'); return a % b; },
  // power: base raised to exponent
  power: (base, exponent) => Math.pow(base, exponent),
  // squareRoot: returns sqrt(n), error for negative inputs
  squareRoot: (n) => { if (n < 0) throw new Error('square root of negative number'); return Math.sqrt(n); }
};
