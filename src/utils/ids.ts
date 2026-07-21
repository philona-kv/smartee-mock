let seq = Date.now() % 1_000_000;

function nextSeq(): number {
  seq += 1;
  return seq;
}

/** Generates a 18-digit-ish numeric ID string similar to Smartee CaseMainID values. */
export function generateNumericId(): string {
  const base = BigInt('3030') * BigInt(10) ** BigInt(14);
  const suffix = BigInt(Date.now() % 10 ** 11) * BigInt(1000) + BigInt(nextSeq() % 1000);
  return (base + suffix).toString();
}

/** Generates a CaseSN like PCM2605240068 */
export function generateCaseSN(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const n = String(nextSeq() % 10000).padStart(4, '0');
  return `PCM${yy}${mm}${dd}${n}`;
}

/** Generates a CaseCode like P2046003 */
export function generateCaseCode(): string {
  return `P${String(2_000_000 + (nextSeq() % 900_000))}`;
}
