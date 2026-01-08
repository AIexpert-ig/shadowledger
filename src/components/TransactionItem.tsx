// src/components/TransactionItem.tsx
import React from 'react'
import type { LedgerEntry } from '../store/ledger'
import { useLedgerStore } from '../store/ledger'

interface Props {
  entry: LedgerEntry
  index: number
}

export const TransactionItem: React.FC<Props> = ({ entry, index }) => {
  const deleteTx = useLedgerStore(state => state.deleteTx)

  return (
    <li className="transaction-item">
      <div className="t-icon">{entry.type === 'COLLECT' ? '📥' : '📤'}</div>
      <div className="t-details">
        <span className="t-desc">{entry.desc}</span>
        <span className="t-meta">
          {entry.date} {!entry.image ? '' : '• 📎 Receipt'}
        </span>
      </div>
      <div
        className="t-amount"
        style={{ color: entry.type === 'COLLECT' ? 'var(--color-success)' : 'var(--color-text-primary)' }}
      >
        {entry.amount.toFixed(2)}
      </div>
      <div
        className="t-delete"
        onClick={() => deleteTx(entry.id)}
      >
        ✕
      </div>
    </li>
  )
}
