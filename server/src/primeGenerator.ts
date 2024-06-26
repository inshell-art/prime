import { randomBytes } from 'crypto';

// Miller-Rabin primality test adapted for BigInt
export const isPrime = (n: bigint, accuracy: number = 5): boolean => {
  if (n === 2n || n === 3n) return true;
  if (n < 2n || n % 2n === 0n) return false;

  let r: bigint = 0n;
  let d: bigint = n - 1n;
  while (d % 2n === 0n) {
    d /= 2n;
    r += 1n;
  }

  WitnessLoop: for (let i = 0; i < accuracy; i++) {
    const a: bigint =
      BigInt(2) + (BigInt(randomBytes(6).readUIntLE(0, 6)) % (n - 3n));
    let x: bigint = modPowBigInt(a, d, n);

    if (x === 1n || x === n - 1n) continue;

    for (let j: bigint = 0n; j < r - 1n; j++) {
      x = modPowBigInt(x, 2n, n);
      if (x === n - 1n) continue WitnessLoop;
    }

    return false;
  }

  return true;
};

// Modular exponentiation (a^b mod n)
const modPowBigInt = (
  base: bigint,
  exponent: bigint,
  modulus: bigint,
): bigint => {
  let result: bigint = 1n;
  base %= modulus;

  while (exponent > 0n) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent /= 2n;
    base = (base * base) % modulus;
  }

  return result;
};

export const generatePrime = async (digits: number): Promise<bigint> => {
  if (digits < 1) throw new Error('Digit length must be at least 1');

  const min: bigint = 10n ** (BigInt(digits) - 1n);
  const max: bigint = 10n ** BigInt(digits) - 1n;

  let candidate: bigint =
    min +
    (BigInt('0x' + randomBytes(Number(digits)).toString('hex')) % (max - min));

  while (!isPrime(candidate)) {
    // Apply the "0x" prefix here as well
    candidate =
      min +
      (BigInt('0x' + randomBytes(Number(digits)).toString('hex')) %
        (max - min));
  }

  return candidate;
};
