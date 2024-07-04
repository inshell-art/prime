import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { generatePrime } from './primeGenerator';
import './loadEnv';

const isTest =
  process.env.NODE_ENV === 'emu' || process.env.NODE_ENV === 'staging';

const app = express();

if (!isTest) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again later',
  });

  app.use(limiter);
}

app.use(cors());

app.get('/primes/:digits', async (req, res) => {
  const digits = parseInt(req.params.digits);
  if (isNaN(digits) || digits <= 0) {
    return res.status(400).send('Digits parameter must be a positive integer');
  }

  if (digits > 100) {
    return res
      .status(400)
      .json({ error: 'Digits parameter must be less than or equal to 100' });
  }

  try {
    const prime = await generatePrime(digits);
    res.json({ digits, primes: prime.toString() });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating prime number.');
  }
});

export default app;
