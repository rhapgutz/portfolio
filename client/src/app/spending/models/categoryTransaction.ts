import { Category } from "./category";
import { Transaction } from "./transaction";

export interface CategoryTransaction {
  category: Category;
  transactions: Transaction[];
}