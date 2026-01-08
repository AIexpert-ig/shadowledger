// src/components/ReportView.tsx
import React from 'react'
import { useLedgerStore } from '../store/ledger'

export const ReportView: React.FC = () => {
  const txs = useLedgerStore(state => state.transactions)
  const totals = useLedgerStore(state => state.totals)

  const net = totals ? totals.in - totals.out : 0

  return (
    <section
      className="glass-card"
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        width: '100%'
      }}
    >
      <h2 style={{ color: 'black', marginBottom: '1rem' }}>Official Settlement Report</h2>
      <table style={{ width: '100%', color: 'black', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #333' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
            <th style={{ textAlign: 'left' }}>Desc</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {txs.map(t => {
            const val = t.amount
            return (
              <tr key={t.id}>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{t.date}</td>
                <td style={{ padding: '8px', borderBottom: '1px solid #eee' }}>{t.desc}</td>
                <td
                  style={{
                    padding: '8px',
                    borderBottom: '1px solid #eee',
                    textAlign: 'right'
                  }}
                >
                  {val.toFixed(2)}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div
        style={{
          textAlign: 'right',
          color: 'black',
          fontSize: '1.5rem',
          marginTop: '20px',
          fontWeight: 'bold'
        }}
      >
        Net: {net.toFixed(2)}
      </div>

      <button
        className="btn secondary"
        style={{ width: 'auto', marginTop: '1rem' }}
        onClick={() => {
          const { toggleView } = (window as any).app
          toggleView()
        }}
      >
        ← Back to Dashboard
      </button>
    </section>
  )
}
