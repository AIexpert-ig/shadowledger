// src/components/TransactionItem.tsx
import React from 'react'
import type { LedgerEntry } from '../store/ledger'

interface Props {
  entry: LedgerEntry
  onDelete: (id: string) => void
}

export const TransactionItem = React.memo(({ entry, onDelete }: Props) => {
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
        onClick={() => onDelete(entry.id)}
      >
        ✕
      </div>
    </li>
  )
})
