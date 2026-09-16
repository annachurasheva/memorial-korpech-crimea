export const CONSENT_KEY = 'mem-consent';
export function getConsent(): boolean {
  return typeof localStorage !== 'undefined' && localStorage.getItem(CONSENT_KEY) === '1';
}
export function setConsent(value: boolean): void {
  localStorage.setItem(CONSENT_KEY, value ? '1' : '0');
}
