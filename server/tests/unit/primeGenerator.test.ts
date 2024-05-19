import { generatePrime } from "../../../server-src/primeGenerator";

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
});
