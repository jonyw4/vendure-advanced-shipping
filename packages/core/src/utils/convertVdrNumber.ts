export const VDR_NUMBER_MULTIPLAYER = 100;

export function convertNumberForVdr(number: number): number {
  return number * VDR_NUMBER_MULTIPLAYER;
}

export function convertVdrNumberToNormal(number: number): number {
  return number / VDR_NUMBER_MULTIPLAYER;
}
