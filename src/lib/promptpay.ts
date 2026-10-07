/**
 * PromptPay "Thai QR" payload, built in the browser (the site is a static export).
 *
 * The payload follows the EMVCo merchant-presented QR layout every Thai banking
 * app reads: tag 29 carries the PromptPay target, tag 54 the amount, and the
 * string ends with a CRC-16/CCITT-FALSE checksum over everything before it.
 */

const PROMPTPAY_AID = "A000000677010111";

export type PromptPayTarget = {
  kind: "phone" | "id" | "ewallet";
  /** Sub-tag inside tag 29: 01 phone, 02 national ID / tax ID, 03 e-wallet. */
  tag: "01" | "02" | "03";
  value: string;
};

/** Accepts a 10-digit mobile number, a 13-digit national/tax ID or a 15-digit e-wallet ID; dashes and spaces are ignored. */
export function promptPayTarget(raw: string): PromptPayTarget | null {
  const digits = raw.replace(/[\s-]/g, "");
  if (!/^\d+$/.test(digits)) return null;
  // mobile numbers go in international form, zero-padded to 13: 0812345678 -> 0066812345678
  if (digits.length === 10 && digits.startsWith("0")) return { kind: "phone", tag: "01", value: `0066${digits.slice(1)}` };
  if (digits.length === 13) return { kind: "id", tag: "02", value: digits };
  if (digits.length === 15) return { kind: "ewallet", tag: "03", value: digits };
  return null;
}

const field = (tag: string, value: string) => `${tag}${String(value.length).padStart(2, "0")}${value}`;

function crc16(data: string) {
  let crc = 0xffff;
  for (let i = 0; i < data.length; i++) {
    crc ^= data.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/** Largest amount the QR form accepts; the banking app still applies its own limits. */
export const MAX_AMOUNT = 1_000_000;

/** Whole satang only, so 99.999 does not become a payload the bank rejects. */
export const validAmount = (amount: number) =>
  Number.isFinite(amount) && amount > 0 && amount <= MAX_AMOUNT && Math.abs(amount * 100 - Math.round(amount * 100)) < 1e-6;

/** Payload string for a QR code. With an amount the banking app fills it in; without one the payer types it. */
export function promptPayPayload(id: string, amount?: number) {
  const target = promptPayTarget(id);
  if (!target) throw new Error("PromptPay ID must be a mobile number, a national/tax ID or an e-wallet ID");
  if (amount !== undefined && !validAmount(amount)) throw new Error("Invalid amount");
  const body =
    field("00", "01") +
    // 12 = one-time QR that carries an amount, 11 = reusable QR without one
    field("01", amount ? "12" : "11") +
    field("29", field("00", PROMPTPAY_AID) + field(target.tag, target.value)) +
    field("58", "TH") +
    field("53", "764") +
    (amount ? field("54", amount.toFixed(2)) : "") +
    "6304";
  return body + crc16(body);
}

/** Shown under the QR: a mobile number as 081-234-5678; a national ID keeps only its last digits on screen. */
export function formatPromptPayId(raw: string) {
  const d = raw.replace(/[\s-]/g, "");
  if (d.length === 10) return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.length === 13) return `x-xxxx-xxxxx-${d.slice(10, 12)}-${d[12]}`;
  return d;
}
