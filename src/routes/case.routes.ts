import { Router, Request, Response } from 'express';
import { sendSuccess } from '../utils/response';
import { createCase, getDefaultCaseFlow } from '../store';
import getCaseListFixture from '../fixtures/getCaseList.json';
import getCaseDesignFeedBackFixture from '../fixtures/getCaseDesignFeedBack.json';

const router = Router();

function extractBody(req: Request): Record<string, unknown> {
  const wrapped = req.body?.body;
  if (wrapped && typeof wrapped === 'object') {
    return wrapped as Record<string, unknown>;
  }
  return (req.body ?? {}) as Record<string, unknown>;
}

function handleCreateCase(req: Request, res: Response) {
  const body = extractBody(req);
  console.log('[case/createCase] body keys:', Object.keys(body));
  const stored = createCase(body);
  return sendSuccess(res, {
    CaseMainID: stored.CaseMainID,
    CaseSN: stored.CaseSN,
  });
}

router.post('/createCase', handleCreateCase);
router.post('/createCaseOnlyDesign', handleCreateCase);

router.post('/getCaseList', (req: Request, res: Response) => {
  console.log('[case/getCaseList]', extractBody(req));
  return sendSuccess(res, structuredClone(getCaseListFixture));
});

router.post('/getCaseFlow', (req: Request, res: Response) => {
  console.log('[case/getCaseFlow]', extractBody(req));
  return sendSuccess(res, getDefaultCaseFlow());
});

router.post('/modifyCasePhoto', (req: Request, res: Response) => {
  console.log('[case/modifyCasePhoto]', extractBody(req));
  return sendSuccess(res, null);
});

router.post('/reUploadLocalData', (req: Request, res: Response) => {
  console.log('[case/reUploadLocalData]', extractBody(req));
  return sendSuccess(res, null);
});

router.post('/updateProductSeries', (req: Request, res: Response) => {
  console.log('[case/updateProductSeries]', extractBody(req));
  return sendSuccess(res, null);
});

router.post('/getCaseDesignFeedBack', (req: Request, res: Response) => {
  console.log('[case/getCaseDesignFeedBack]', extractBody(req));
  return sendSuccess(res, structuredClone(getCaseDesignFeedBackFixture));
});

export default router;
