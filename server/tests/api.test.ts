import request from "supertest";
import app from "../src/app";

// Mock the primeGenerator module
jest.mock("../src/primeGenerator", () => ({
  generatePrime: jest.fn((digits) => {
    if (digits === 3) {
      return "113"; // Example prime number for testing
    }
    throw new Error("Internal Server Error");
  }),
}));

describe("Prime Number API Integration Tests", () => {
  let originalConsoleError: (message?: any, ...optionalParams: any[]) => void;

  beforeAll(() => {
    // Save the original console.error
    originalConsoleError = console.error;
    // Mock console.error to suppress the error output
    console.error = jest.fn();
  });

  afterAll(() => {
    // Restore the original console.error
    console.error = originalConsoleError;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should generate a prime number with the specified number of digits", async () => {
    const response = await request(app)
      .get("/primes/3") // Simulating a client request
      .send();

    // Verifying the response
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("digits", 3);
    expect(response.body).toHaveProperty("primes");
    expect(response.body.primes).toMatch(/^\d+$/); // Ensuring it's a number
  });

  it("should return 400 for invalid input", async () => {
    const response = await request(app)
      .get("/primes/invalid") // Simulating an invalid input
      .send();

    // Verifying the response
    expect(response.status).toBe(400);
    expect(response.text).toBe("Digits parameter must be a positive integer");
  });

  it("should return 404 for missing input", async () => {
    const response = await request(app)
      .get("/primes/") // Simulating a missing input
      .send();

    // Verifying the response
    expect(response.status).toBe(404); // 404 because the endpoint doesn't match
  });

  it("should return 500 for internal server errors", async () => {
    const generatePrimeMock = require("../src/primeGenerator").generatePrime;
    generatePrimeMock.mockImplementationOnce(() => {
      throw new Error("Internal Server Error");
    });

    const response = await request(app).get("/primes/5").send();

    // Verifying the response
    expect(response.status).toBe(500);
    expect(response.text).toBe("Error generating prime number.");
  });
});
