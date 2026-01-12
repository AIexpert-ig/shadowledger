import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type LedgerEntry = {
  id: string
  date: string
  type: 'COLLECT' | 'DEPOSIT'
  desc: string
  amount: number
  image?: string
}

type LedgerState = {
  transactions: LedgerEntry[]
  currentView: 'DASHBOARD' | 'REPORT' // <-- NEW: Track which screen is open
  addTx: (tx: LedgerEntry) => void
  deleteTx: (id: string) => void
  setView: (view: 'DASHBOARD' | 'REPORT') => void // <-- NEW: Action to change screen
}

export const useLedgerStore = create<LedgerState>()(
  persist(
    (set) => ({
      transactions: [],
      currentView: 'DASHBOARD', // Default to Dashboard
      
      addTx: (tx) => set((state) => ({ 
        transactions: [tx, ...state.transactions] 
      })),

      deleteTx: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      setView: (view) => set({ currentView: view }) // Simple switcher
    }),
    { name: 'shadow-ledger-storage' }
  )
)