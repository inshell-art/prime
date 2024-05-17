import request from "supertest";
import express from "express";
import cors from "cors";
import { generatePrime } from "../../../server-src/primeGenerator"; // Adjust the path as necessary

const app = express();
app.use(cors());
app.use(express.json()); // Make sure to parse JSON body

app.get("/primes/:digits", async (req, res) => {
  const digits = parseInt(req.params.digits);
  if (isNaN(digits) || digits <= 0) {
    return res.status(400).send("Digits parameter must be a positive integer");
  }

  try {
    const prime = await generatePrime(digits);
    res.json({ digits, prime: prime.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating prime number.");
  }
});

describe("GET /primes/:digits", () => {
  test("should respond with a prime number for valid digit input", async () => {
    const digits = 4;
    const response = await request(app).get(`/primes/${digits}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("prime");
    expect(response.body.digits).toBe(digits);
    expect(response.body.prime.length).toBe(digits);
  });

  test("should respond with 400 error for non-integer digits", async () => {
    const response = await request(app).get("/primes/abc");
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual(
      "Digits parameter must be a positive integer"
    );
  });

  test("should respond with 400 error for negative digits", async () => {
    const response = await request(app).get("/primes/-5");
    expect(response.statusCode).toBe(400);
    expect(response.text).toEqual(
      "Digits parameter must be a positive integer"
    );
  });
});
