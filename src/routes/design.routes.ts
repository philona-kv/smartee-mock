import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { generateNumericId } from '../utils/ids';
import getTeethDataFixture from '../fixtures/getTeethData.json';

const router = Router();

function extractBody(req: Request): Record<string, unknown> {
  const wrapped = req.body?.body;
  if (wrapped && typeof wrapped === 'object') {
    return wrapped as Record<string, unknown>;
  }
  return (req.body ?? {}) as Record<string, unknown>;
}

router.post('/addAdjustTreatPlan', (req: Request, res: Response) => {
  const body = extractBody(req);
  console.log('[design/addAdjustTreatPlan] CaseMainID:', body.CaseMainID);
  return sendSuccess(res, {
    AdjustTreatPlanID: generateNumericId(),
  });
});

router.post('/addCaseDesignFeedBack', (req: Request, res: Response) => {
  console.log('[design/addCaseDesignFeedBack]', extractBody(req));
  return sendSuccess(res, null);
});

router.post('/getTeethData', (req: Request, res: Response) => {
  const body = extractBody(req);
  console.log('[design/getTeethData] CaseDesignID:', body.CaseDesignID);
  return sendSuccess(res, structuredClone(getTeethDataFixture));
});

router.post('/confirmDesign', (req: Request, res: Response) => {
  console.log('[design/confirmDesign]', extractBody(req));
  return sendSuccess(res, null);
});

export default router;
