import React from 'react'
import { useLedgerStore } from '../store/ledger'

export const ReportView: React.FC = () => {
  // FIX: Select ONLY the transactions list
  const txs = useLedgerStore(state => state.transactions)
  
  // FIX: Calculate totals locally
  const totals = txs.reduce(
    (acc, t) => {
      const val = t.amount;
      if (t.type === 'COLLECT') acc.in += val;
      else acc.out += val;
      return acc;
    },
    { in: 0, out: 0 }
  );

  const net = totals.in - totals.out

  return (
    <section className="glass-card" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Official Settlement Report</h2>
      
      <table style={{ width: '100%', color: 'var(--text-main)', borderCollapse: 'collapse', marginBottom: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid var(--glass-border)' }}>
            <th style={{ textAlign: 'left', padding: '8px' }}>Date</th>
            <th style={{ textAlign: 'left' }}>Desc</th>
            <th style={{ textAlign: 'right' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {txs.map(t => (
            <tr key={t.id}>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--glass-border)' }}>{t.date}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--glass-border)' }}>{t.desc}</td>
              <td style={{ padding: '8px', borderBottom: '1px solid var(--glass-border)', textAlign: 'right' }}>
                {t.amount.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', color: 'var(--primary)', fontSize: '1.5rem', marginTop: '20px', fontWeight: 'bold' }}>
        Net: {net.toFixed(2)}
      </div>

      <button className="btn secondary" style={{ width: 'auto', marginTop: '1rem' }} onClick={() => (window as any).app.toggleView()}>
        ← Back to Dashboard
      </button>
    </section>
  )
}