import { generatePrime, isPrime } from "../src/primeGenerator";
import * as fc from "fast-check";

describe("generatePrime", () => {
  it("should generate a prime number with the specified number of digits", async () => {
    const prime = await generatePrime(4);
    expect(prime.toString().length).toBe(4);
    expect(prime % 2n).toBe(1n);
  });

  it("should throw an error if the digit length is less than 1", async () => {
    await expect(generatePrime(0)).rejects.toThrow(
      "Digit length must be at least 1",
    );
  });

  it("should correctly identify prime numbers", () => {
    fc.assert(
      fc.property(fc.bigUintN(32), (num) => {
        if (num < 2n) {
          expect(isPrime(num)).toBe(false);
        } else {
          const primeCheck = isPrime(num);
          const isActuallyPrime = (n: bigint) => {
            if (n <= 1n) return false;
            for (let i = 2n; i * i <= n; i++) {
              if (n % i === 0n) return false;
            }
            return true;
          };
          expect(primeCheck).toBe(isActuallyPrime(num));
        }
      }),
      { endOnFailure: true },
    );
  });

  it("should correctly identify prime numbers", () => {
    fc.assert(
      fc.property(fc.bigUintN(64), (num) => {
        if (num < 2n) {
          expect(isPrime(num)).toBe(false);
        } else {
          const primeCheck = isPrime(num);
          const isActuallyPrime = (n: bigint) => {
            if (n <= 1n) return false;
            if (n === 2n || n === 3n) return true;
            if (n % 2n === 0n) return false;
            if (n % 3n === 0n) return false;

            for (let i = 5n; i * i <= n; i += 6n) {
              if (n % i === 0n) return false;
              if (n % (i + 2n) === 0n) return false;
            }

            return true;
          };
          expect(primeCheck).toBe(isActuallyPrime(num));
        }
      }),
      { endOnFailure: true },
    );
  });
});
