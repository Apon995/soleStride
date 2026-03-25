interface Category {
  _id : string,
  id: string;
  name: string;
  description?: string;
  parentId: string | null;
  level: number;
  highlight: boolean;
}