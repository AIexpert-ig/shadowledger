import create from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageService } from '../services/storage';

export interface LedgerEntry {
  id: string;
  date: string;      // e.g. '2026‑05‑01'
  type: 'COLLECT' | 'DEPOSIT';
  desc: string;
  amount: number;
  image?: string;    // base‑64 image data, optional
}

export interface LedgerState {
  transactions: LedgerEntry[];
  viewMode: 'dashboard' | 'report';

  // actions -------------------------------------------------------
  addTx: (tx: LedgerEntry) => void;
  deleteTx: (id: string) => void;
  toggleView: () => void;
}

// Zustand store – **no totals field** (derived in components)
export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      transactions: StorageService.getAll(),
      viewMode: 'dashboard',

      addTx: (tx) => set((state) => ({ transactions: [...state.transactions, tx] })),
      deleteTx: (id) =>
        set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),

      toggleView: () =>
        set((state) => ({
          viewMode: state.viewMode === 'dashboard' ? 'report' : 'dashboard',
        })),
    }),
    {
      name: 'shadow-ledger-store',
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
