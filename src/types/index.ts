
export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: string;
  description: string;
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  name: string;
  amount: number;
  status: 'pending' | 'completed';
  category: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
}
