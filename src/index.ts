import express from 'express';
import cors from 'cors';
import caseRoutes from './routes/case.routes';
import designRoutes from './routes/design.routes';
import publicRoutes from './routes/public.routes';

const PORT = Number(process.env.PORT) || 3080;

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

app.use((req, _res, next) => {
  const authHeaders = {
    sign: req.headers.sign,
    user: req.headers.user,
    timestamp: req.headers.timestamp,
    token: req.headers.token,
  };
  console.log(
    `${req.method} ${req.path}`,
    '| auth:',
    JSON.stringify(authHeaders),
  );
  next();
});

app.get('/health', (_req, res) => {
  res.json({ ok: true, service: 'smartee-mock' });
});

app.use('/case', caseRoutes);
app.use('/design', designRoutes);
app.use('/public', publicRoutes);

app.use((_req, res) => {
  res.status(404).json({
    status: 0,
    message: `Unknown Smartee mock endpoint: ${_req.method} ${_req.path}`,
    body: null,
  });
});

app.listen(PORT, () => {
  console.log(`Smartee mock server listening on http://localhost:${PORT}`);
  console.log(`Set SMARTEE_BASE_URL=http://localhost:${PORT}`);
});
