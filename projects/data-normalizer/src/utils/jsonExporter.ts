import { NormalizedItem } from "../types/DataTypes";

export function exportToJSON(data: NormalizedItem[]): string {
  return JSON.stringify(data, null, 2);
}
