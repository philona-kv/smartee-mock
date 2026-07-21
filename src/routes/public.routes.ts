import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import getAreaHospitalFixture from '../fixtures/getAreaHospital.json';
import getProductSeriesListFixture from '../fixtures/getProductSeriesList.json';

const router = Router();

function extractBody(req: Request): Record<string, unknown> {
  const wrapped = req.body?.body;
  if (wrapped && typeof wrapped === 'object') {
    return wrapped as Record<string, unknown>;
  }
  return (req.body ?? {}) as Record<string, unknown>;
}

router.post('/getAreaHospital', (req: Request, res: Response) => {
  const body = extractBody(req);
  console.log('[public/getAreaHospital] Guid:', body.Guid);
  return sendSuccess(res, structuredClone(getAreaHospitalFixture));
});

router.post('/getProductSeriesList', (_req: Request, res: Response) => {
  console.log('[public/getProductSeriesList]');
  return sendSuccess(res, structuredClone(getProductSeriesListFixture));
});

export default router;
