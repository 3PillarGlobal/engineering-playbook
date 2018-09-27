export type Document = {
  id: number;
  name: string;
  description?: string;
  url?: string;
};

export type DocumentInput = {
  name: string;
  description?: string;
  url?: string;
};
