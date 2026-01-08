// src/components/TransactionList.tsx
import React from 'react'
import { useLedgerStore } from '../store/ledger'
import { TransactionItem } from './TransactionItem'

export const TransactionList = () => {
  const txs = useLedgerStore(state => state.transactions)

  if (txs.length === 0) {
    return <p style={{ textAlign: 'center', opacity: .6 }}>No transactions yet.</p>
  }

  return (
    <ul className="transaction-list">
      {txs.slice().reverse().map((t, i) => (
        <TransactionItem key={t.id} entry={t} index={i} />
      ))}
    </ul>
  )
}
