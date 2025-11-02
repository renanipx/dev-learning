export function quarterOf(month: number): number {
  if (month < 1 || month > 12) {
    throw new Error("Month must be between 1 and 12");
  }

  return Math.ceil(month / 3);
}