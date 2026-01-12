import { useLedgerStore } from '../store/ledger';

export const StatsCard = () => {
  // FIX: Select ONLY the transactions list first (Stable)
  const transactions = useLedgerStore((state) => state.transactions);

  // Calculate totals inside the component (Safe)
  const totals = transactions.reduce(
    (acc, t) => {
      const val = t.amount;
      if (t.type === 'COLLECT') acc.in += val;
      else acc.out += val;
      return acc;
    },
    { in: 0, out: 0 }
  );

  const net = totals.in - totals.out;

  return (
    <section className="glass-card" style={{ marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Glow */}
      <div style={{
        position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%',
        background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', position: 'relative', zIndex: 1 }}>
        
        {/* Collected */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            COLLECTED
          </div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent-green)' }}>
            {totals.in.toFixed(0)}
            <span style={{fontSize:'0.8rem', opacity:0.6}}>.{(totals.in % 1).toFixed(2).substring(2)}</span>
          </div>
        </div>

        {/* Net Total */}
        <div style={{ textAlign: 'center', borderLeft: '1px solid var(--glass-border)', borderRight: '1px solid var(--glass-border)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--primary)', marginBottom: '0.5rem' }}>
            NET TOTAL
          </div>
          <div style={{ fontSize: '1.75rem', fontFamily: 'JetBrains Mono, monospace', fontWeight: '800', textShadow: '0 0 20px var(--primary-glow)' }}>
            {net.toFixed(0)}
          </div>
        </div>

        {/* Deposited */}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
            DEPOSITED
          </div>
          <div style={{ fontSize: '1.25rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--accent-red)' }}>
            {totals.out.toFixed(0)}
             <span style={{fontSize:'0.8rem', opacity:0.6}}>.{(totals.out % 1).toFixed(2).substring(2)}</span>
          </div>
        </div>

      </div>
    </section>
  );
};