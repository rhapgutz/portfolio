import { Category } from "./category";

export interface Transaction {
  _id: string;
  type: string;
  category: Category;
  transactionDate: Date;
  amount: number;
  notes: string;
}
