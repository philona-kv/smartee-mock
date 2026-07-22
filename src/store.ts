import {
  generateCaseCode,
  generateCaseSN,
  generateNumericId,
} from './utils/ids';
import getCaseFlowFixture from './fixtures/getCaseFlow.json';

export interface StoredCase {
  CaseMainID: string;
  CaseSN: string;
  CaseCode: string;
  PatientName: string;
  PatientGender: number | null;
  PatientContact: string | null;
  PatientAge: number | null;
  HospitalID: string | null;
  HospitalName: string | null;
  ReceiveAddressID: string | null;
  CreateTime: string;
  Type: number;
  SubType: number;
  ProductSeriesID: string | null;
  request: unknown;
}

const casesById = new Map<string, StoredCase>();
const casesBySn = new Map<string, StoredCase>();
const casesByCode = new Map<string, StoredCase>();

function emptyFlowItem() {
  return {
    CaseFlowID: null,
    Type: null,
    SubType: null,
    TreatPlanID: null,
    CreateTime: null,
    AdjustTreatPlanTimes: null,
    RestartTreatPlanTimes: null,
    CaseOrderEndTimes: null,
    CaseFlow0Item: null,
    CaseFlow1Item: null,
    CaseFlow2Item: null,
    CaseFlow3Item: null,
    CaseFlow4Item: null,
    CaseFlow5Item: null,
    CaseFlow6Item: null,
    CaseFlow7Item: null,
    CaseFlow8Item: null,
    CaseFlow9Item: null,
    CaseFlow10Item: null,
    CaseFlow11Item: null,
    CaseFlow12Item: null,
    CaseFlow13Item: null,
    CaseFlow14Item: null,
    CaseFlow131Item: null,
    CaseFlow16Item: null,
    CaseFlow17Item: null,
  };
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function createCase(requestBody: Record<string, unknown>): StoredCase {
  const CaseMainID = generateNumericId();
  const CaseSN = generateCaseSN();
  const CaseCode = generateCaseCode();

  const stored: StoredCase = {
    CaseMainID,
    CaseSN,
    CaseCode,
    PatientName: String(requestBody.PatientName ?? 'Mock Patient'),
    PatientGender:
      requestBody.PatientGender != null ? Number(requestBody.PatientGender) : null,
    PatientContact:
      requestBody.PatientContact != null
        ? String(requestBody.PatientContact)
        : null,
    PatientAge:
      requestBody.PatientAge != null ? Number(requestBody.PatientAge) : null,
    HospitalID:
      requestBody.HospitalID != null ? String(requestBody.HospitalID) : null,
    HospitalName: null,
    ReceiveAddressID:
      requestBody.ReceiveAddressID != null
        ? String(requestBody.ReceiveAddressID)
        : null,
    CreateTime: today(),
    Type: 1,
    SubType: 4,
    ProductSeriesID:
      requestBody.ProductSeriesID != null
        ? String(requestBody.ProductSeriesID)
        : null,
    request: requestBody,
  };

  casesById.set(CaseMainID, stored);
  casesBySn.set(CaseSN, stored);
  casesByCode.set(CaseCode, stored);
  return stored;
}

export function getCaseById(caseMainId: string): StoredCase | undefined {
  return casesById.get(String(caseMainId));
}

export function searchCases(keyWords?: string): StoredCase[] {
  const all = Array.from(casesById.values());
  if (!keyWords) return all;
  const q = keyWords.trim().toLowerCase();
  return all.filter(
    (c) =>
      c.CaseSN.toLowerCase().includes(q) ||
      c.CaseCode.toLowerCase().includes(q) ||
      c.CaseMainID.includes(q) ||
      c.PatientName.toLowerCase().includes(q),
  );
}

export function buildCaseFlowForStored(stored: StoredCase) {
  const sourceFlowId = generateNumericId();
  const caseTeethModelId = generateNumericId();
  const designId = generateNumericId();

  return {
    CaseFlows: [
      emptyFlowItem(),
      {
        ...emptyFlowItem(),
        CaseFlow3Item: {
          SourceFlowID: sourceFlowId,
          CaseTeethModelID: caseTeethModelId,
          IsPass: true,
          UnqualifiedID: null,
          CheckType: 2,
          CheckTime: today(),
          ReceiveTime: `${today()} 12:00:00`,
          UnQNoticePath: null,
          CanReuploadLocalData: null,
          CanCancelReUploadLocalData: null,
        },
      },
      {
        ...emptyFlowItem(),
        CaseFlow4Item: {
          CaseDesignID: designId,
          DesignPlayPath: `https://check.zenyumsmileplans.com/#playerPC?playerUrl=mock/designpath.smapro&caseDesignID=${designId}&type=2&source=16`,
          DesignPlayReadPath: `https://check.zenyumsmileplans.com/#playerPC?playerUrl=mock/designpath.smapro&caseDesignID=${designId}&type=2&source=16`,
          DesignPlayNotConfirmPath: `https://check.zenyumsmileplans.com/#playerPC?playerUrl=mock/designpath.smapro&caseDesignID=${designId}&disConfirm=true&type=2&source=16`,
          ExplainPath: `https://sdownload.smartee.cn/F?path=createPdf/BKT/smartawsapse1/1e506cdd-ab7a-478e-8a8b-6f377f89da48/20260719215900181/designexplain__e40cde3f-c699-4281-a24b-4eb6b852c2c0.pdf`,
          UpperTotalSteps: null,
          LowerTotalSteps: null,
          DesignID: designId,
          DesignCreateTime: `${today()} 12:00:00`,
          HasFeedBack: false,
        },
      },
    ],
    Case: {
      CaseMainID: stored.CaseMainID,
      CaseSN: stored.CaseSN,
      CaseCode: stored.CaseCode,
      PatientName: stored.PatientName,
      PatientGender: stored.PatientGender,
      PatientContact: stored.PatientContact,
      PatientAge: stored.PatientAge,
      HospitalID: stored.HospitalID,
      HospitalName: stored.HospitalName ?? 'Zenyum Test',
      ReceiveAddressID: stored.ReceiveAddressID,
      CreateTime: stored.CreateTime,
      Type: stored.Type,
      SubType: stored.SubType,
      ProductSeriesID: stored.ProductSeriesID,
      CasePropertyText: null,
      Notes: null,
      CaseFiles: null,
      TreatPlanItem: null,
      CaseMainExtendItem: null,
    },
  };
}

export function getDefaultCaseFlow() {
  return structuredClone(getCaseFlowFixture);
}

export function toCaseListItem(stored: StoredCase) {
  return {
    CaseMainID: stored.CaseMainID,
    CaseSN: stored.CaseSN,
    CaseCode: stored.CaseCode,
    PatientName: stored.PatientName,
    PatientGender: stored.PatientGender,
    PatientContact: stored.PatientContact,
    PatientAge: stored.PatientAge,
    HospitalID: stored.HospitalID,
    HospitalName: stored.HospitalName,
    ReceiveAddressID: stored.ReceiveAddressID,
    CreateTime: stored.CreateTime,
    Type: stored.Type,
    SubType: stored.SubType,
    ProductSeriesID: stored.ProductSeriesID,
    CasePropertyText: null,
    Notes: null,
    CaseFiles: null,
    TreatPlanItem: null,
    CaseMainExtendItem: null,
  };
}
