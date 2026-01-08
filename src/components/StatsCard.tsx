import React from 'react';
import { useLedgerStore } from '../store/ledger';

export const StatsCard = () => {
  // Derived totals computed inside the selector
  const totals = useLedgerStore((state) =>
    state.transactions.reduce(
      (acc, t) => {
        const val = t.amount;
        if (t.type === 'COLLECT') acc.in += val;
        else acc.out += val;
        return acc;
      },
      { in: 0, out: 0 }
    )
  );

  const net = totals.in - totals.out;

  return (
    <section className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: '.8rem', textTransform: 'uppercase', opacity: .7 }}>Collected</div>
          <div style={{ fontSize: '1.5rem', color: 'var(--color-success)' }}>{totals.in.toFixed(2)}</div>
        </div>

        <div>
          <div style={{ fontSize: '.8rem', textTransform: 'uppercase', opacity: .7 }}>Net Position</div>
          <div style={{ fontSize: '2rem', fontWeight: 800 }}>{net.toFixed(2)}</div>
        </div>

        <div>
          <div style={{ fontSize: '.8rem', textTransform: 'uppercase', opacity: .7 }}>Deposited</div>
          <div style={{ fontSize: '1.5rem', color: 'var(--color-danger)' }}>{totals.out.toFixed(2)}</div>
        </div>
      </div>
    </section>
  );
};
