import { RawItem, NormalizedItem } from "../types/DataTypes";

export function normalizeItem(item: RawItem): NormalizedItem {
  return {
    id: item.id,
    name: item.name.trim(),
    age: Number(item.age),
    active: item.active.toLowerCase() === "yes",
  };
}

export function convertData(data: RawItem[]): NormalizedItem[] {
  return data.map(normalizeItem);
}
