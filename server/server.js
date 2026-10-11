import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT) || 5000;
const allowedOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(helmet());
app.use(cors({ origin: allowedOrigin }));
app.use(express.json({ limit: '20kb' }));
app.use('/api/quote', rateLimit({ windowMs: 15 * 60 * 1000, limit: 20, standardHeaders: 'draft-7', legacyHeaders: false }));

app.get("/", (req, res) => {
  res.send("KPR Electronics Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "KPR Electronics API"
  });
});

app.post('/api/quote', (req, res) => {
  const { name, email, phone = '', product, quantity = 1, message = '' } = req.body ?? {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.trim().length > 100) {
    return res.status(400).json({ message: 'Please provide a valid name (2–100 characters).' });
  }
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ message: 'Please provide a valid email address.' });
  }
  if (typeof product !== 'string' || product.trim().length < 1 || product.trim().length > 160) {
    return res.status(400).json({ message: 'Please select a valid product.' });
  }
  const count = Number(quantity);
  if (!Number.isInteger(count) || count < 1 || count > 10000) {
    return res.status(400).json({ message: 'Quantity must be a whole number between 1 and 10,000.' });
  }
  if (typeof phone !== 'string' || phone.length > 40 || typeof message !== 'string' || message.length > 2000) {
    return res.status(400).json({ message: 'Phone or message is too long.' });
  }

  const quote = {
    id: `KPR-${Date.now()}`,
    name: name.trim(), email: email.trim(), phone: phone.trim(),
    product: product.trim(), quantity: count, message: message.trim(),
    receivedAt: new Date().toISOString()
  };
  // Development behaviour: logs the request only. Replace with database/email integration for production.
  console.log('\nNew KPR Electronics quote request:', JSON.stringify(quote, null, 2));
  return res.status(201).json({ message: 'Quote request received successfully.', reference: quote.id });
});

app.use((err, _req, res, _next) => {
  console.error('API error:', err.message);
  res.status(500).json({ message: 'An unexpected server error occurred.' });
});

app.listen(PORT, () => console.log(`KPR Electronics API listening on http://localhost:${PORT}`));
