// src/components/TransactionList.tsx
import React, { useCallback, useMemo } from 'react'
import { useLedgerStore } from '../store/ledger'
import { TransactionItem } from './TransactionItem'

export const TransactionList = () => {
  const txs = useLedgerStore(state => state.transactions)
  const deleteTx = useLedgerStore(state => state.deleteTx)
  const orderedTxs = useMemo(() => [...txs].reverse(), [txs])
  const handleDelete = useCallback((id: string) => deleteTx(id), [deleteTx])

  if (orderedTxs.length === 0) {
    return <p style={{ textAlign: 'center', opacity: .6 }}>No transactions yet.</p>
  }

  return (
    <ul className="transaction-list">
      {orderedTxs.map(t => (
        <TransactionItem key={t.id} entry={t} onDelete={handleDelete} />
      ))}
    </ul>
  )
}
