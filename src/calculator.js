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
  console.log('Operations: add, sub, mul, div (aliases: +, -, *, x, /)');
}

function toNumber(s) {
  const n = Number(s);
  return Number.isFinite(n) ? n : NaN;
}

const args = process.argv.slice(2);
if (args.length < 3) {
  console.error('Error: missing arguments.');
  printUsage();
  process.exit(2);
}

const [op, aRaw, bRaw] = args;
const a = toNumber(aRaw);
const b = toNumber(bRaw);
if (Number.isNaN(a) || Number.isNaN(b)) {
  console.error('Error: both operands must be valid numbers.');
  process.exit(3);
}

let result;
switch (op.toLowerCase()) {
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

  default:
    console.error(`Error: unknown operation "${op}"`);
    printUsage();
    process.exit(5);
}

console.log(result);

// Export for testing or programmatic use
module.exports = {
  add: (x,y) => x+y,
  sub: (x,y) => x-y,
  mul: (x,y) => x*y,
  div: (x,y) => { if (y===0) throw new Error('division by zero'); return x/y; }
};
