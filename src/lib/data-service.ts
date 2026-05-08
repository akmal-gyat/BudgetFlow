import { Transaction, WishlistItem } from '../types';

// Mock data service that uses LocalStorage for now
// This preserves the async nature of Firebase for easy migration
const STORAGE_KEYS = {
  TRANSACTIONS: 'budgetflow_transactions',
  WISHLIST: 'budgetflow_wishlist'
};

export const dataService = {
  getTransactions: async (): Promise<Transaction[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return data ? JSON.parse(data) : [];
  },

  addTransaction: async (transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction> => {
    const transactions = await dataService.getTransactions();
    const newTransaction: Transaction = {
      ...transaction,
      id: Math.random().toString(36).substring(2, 11),
      createdAt: new Date().toISOString()
    };
    transactions.push(newTransaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return newTransaction;
  },

  deleteTransaction: async (id: string): Promise<void> => {
    const transactions = await dataService.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(filtered));
  },

  getWishlist: async (): Promise<WishlistItem[]> => {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  },

  addWishlistItem: async (item: Omit<WishlistItem, 'id'>): Promise<WishlistItem> => {
    const wishlist = await dataService.getWishlist();
    const newItem: WishlistItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 11)
    };
    wishlist.push(newItem);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    return newItem;
  },

  updateWishlistItem: async (id: string, updates: Partial<WishlistItem>): Promise<void> => {
    const wishlist = await dataService.getWishlist();
    const index = wishlist.findIndex(item => item.id === id);
    if (index !== -1) {
      wishlist[index] = { ...wishlist[index], ...updates };
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    }
  },

  deleteWishlistItem: async (id: string): Promise<void> => {
    const wishlist = await dataService.getWishlist();
    const filtered = wishlist.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(filtered));
  }
};
