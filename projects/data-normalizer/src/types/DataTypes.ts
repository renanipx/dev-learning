export type RawItem = {
  id: number;
  name: string;
  age: string;
  active: string;
};

export type NormalizedItem = {
  id: number;
  name: string;
  age: number;
  active: boolean;
};
