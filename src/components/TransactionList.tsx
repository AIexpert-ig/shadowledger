import { useLedgerStore } from '../store/ledger';

export const TransactionList = () => {
  const transactions = useLedgerStore((state) => state.transactions);
  const deleteTx = useLedgerStore((state) => state.deleteTx);

  if (transactions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
        No transactions yet.
      </div>
    );
  }

  return (
    <ul className="transaction-list">
      {transactions.map((t) => {
        // Detect if the file is a PDF
        const isPdf = t.image?.startsWith('data:application/pdf');

        return (
          <li key={t.id} className="transaction-item">
            <div className="t-icon">
              {t.type === 'COLLECT' ? '📥' : '📤'}
            </div>
            
            <div className="t-details">
              <span className="t-desc">{t.desc}</span>
              <span className="t-meta">{t.date}</span>
              
              {/* FILE DISPLAY LOGIC */}
              {t.image && (
                <div style={{ marginTop: '0.5rem' }}>
                  {isPdf ? (
                    <a 
                      href={t.image} 
                      download={`receipt-${t.desc}.pdf`}
                      className="btn secondary"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
                    >
                      📄 View PDF
                    </a>
                  ) : (
                    <img 
                      src={t.image} 
                      alt="Receipt" 
                      style={{ 
                        height: '40px', 
                        borderRadius: '4px', 
                        border: '1px solid var(--glass-border)',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        // Open full image in new tab
                        const w = window.open("");
                        w?.document.write(`<img src="${t.image}" style="max-width:100%"/>`);
                      }}
                    />
                  )}
                </div>
              )}
            </div>

            <div style={{ textAlign: 'right' }}>
              <div 
                className="t-amount" 
                style={{ color: t.type === 'COLLECT' ? 'var(--accent-green)' : 'var(--text-main)' }}
              >
                {t.type === 'COLLECT' ? '+' : '-'}{t.amount.toFixed(2)}
              </div>
              <button 
                className="t-delete"
                onClick={() => deleteTx(t.id)}
                aria-label="Delete transaction"
              >
                ×
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};