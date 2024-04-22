import express from "express";
import cors from "cors";
import { generatePrime } from "./primeGenerator";
const app = express();
const port = 3000;
app.use(cors());
app.get("/primes/:digits", async (req, res) => {
  const digits = parseInt(req.params.digits);
  if (isNaN(digits) || digits <= 0) {
    return res.status(400).send("Digits parameter must be a positive integer");
  }
  try {
    const prime = await generatePrime(digits);
    res.json({ digits, primes: prime.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating prime number.");
  }
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
