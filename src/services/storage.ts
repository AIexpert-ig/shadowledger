// src/services/storage.ts
export interface LedgerEntryRaw {
    id: string
    date: string
    type: 'COLLECT' | 'DEPOSIT'
    desc: string
    amount: number
    image?: string // base64
  }
  
  const KEY = 'shadow_ledger_v2026'
  
  export const StorageService = {
    getAll: (): LedgerEntryRaw[] => JSON.parse(localStorage.getItem(KEY) ?? '[]'),
    setAll: (entries: LedgerEntryRaw[]) => localStorage.setItem(KEY, JSON.stringify(entries))
  }
  