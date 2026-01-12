// src/components/DashboardView.tsx
import { StatsCard } from './StatsCard'
import { TransactionForm } from './TransactionForm'
import { TransactionList } from './TransactionList'

export const DashboardView = () => (
  <main className="app-container">
    <header className="header">
      <h1>🌑 Shadow Ledger</h1>
      <button
        className="btn secondary"
        style={{ width: 'auto' }}
        onClick={() => {
          // toggle via store
          // we don't export the store here – a simple method is easier
          const { toggleView } = (window as any).app
          toggleView()
        }}
      >
        📄 View Report
      </button>
    </header>

    <StatsCard />
    <TransactionForm />
    <h3 style={{ marginTop: '2rem', marginBottom: '1rem', opacity: .6 }}>
      Recent Activity
    </h3>
    <TransactionList />
  </main>
)
