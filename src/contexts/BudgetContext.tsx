import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, WishlistItem, BudgetSummary } from '../types';
import { dataService } from '../lib/data-service';

interface BudgetContextType {
  transactions: Transaction[];
  wishlist: WishlistItem[];
  summary: BudgetSummary;
  loading: boolean;
  addTransaction: (t: Omit<Transaction, 'id' | 'createdAt'>) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  addWishlistItem: (item: Omit<WishlistItem, 'id'>) => Promise<void>;
  updateWishlistItem: (id: string, updates: Partial<WishlistItem>) => Promise<void>;
  deleteWishlistItem: (id: string) => Promise<void>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [tData, wData] = await Promise.all([
        dataService.getTransactions(),
        dataService.getWishlist()
      ]);
      setTransactions(tData);
      setWishlist(wData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addTransaction = async (t: Omit<Transaction, 'id' | 'createdAt'>) => {
    await dataService.addTransaction(t);
    await fetchData();
  };

  const deleteTransaction = async (id: string) => {
    await dataService.deleteTransaction(id);
    await fetchData();
  };

  const addWishlistItem = async (item: Omit<WishlistItem, 'id'>) => {
    await dataService.addWishlistItem(item);
    await fetchData();
  };

  const updateWishlistItem = async (id: string, updates: Partial<WishlistItem>) => {
    await dataService.updateWishlistItem(id, updates);
    await fetchData();
  };

  const deleteWishlistItem = async (id: string) => {
    await dataService.deleteWishlistItem(id);
    await fetchData();
  };

  const summary = transactions.reduce((acc, curr) => {
    if (curr.type === 'income') {
      acc.totalIncome += curr.amount;
    } else {
      acc.totalExpenses += curr.amount;
    }
    acc.balance = acc.totalIncome - acc.totalExpenses;
    return acc;
  }, { totalIncome: 0, totalExpenses: 0, balance: 0 } as BudgetSummary);

  return (
    <BudgetContext.Provider value={{
      transactions,
      wishlist,
      summary,
      loading,
      addTransaction,
      deleteTransaction,
      addWishlistItem,
      updateWishlistItem,
      deleteWishlistItem
    }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) throw new Error('useBudget must be used within a BudgetProvider');
  return context;
};
