import { useLedgerStore } from './store/ledger'
import { StatsCard } from './components/StatsCard'
import { TransactionForm } from './components/TransactionForm'
import { TransactionList } from './components/TransactionList'
import { ReportView } from './components/ReportView'

export default function App() {
  const currentView = useLedgerStore((state) => state.currentView)
  const setView = useLedgerStore((state) => state.setView)

  // 1. If Store says "REPORT", show ONLY the Report View
  if (currentView === 'REPORT') {
    return <ReportView />
  }

  // 2. Otherwise, show the Dashboard
  return (
    <div className="app-container">
      <header className="header">
        <h1>Shadow Ledger</h1>
        <button 
          className="btn secondary"
          onClick={() => setView('REPORT')} // Switch to Report Mode
        >
          View Report
        </button>
      </header>
      
      <StatsCard />
      <TransactionForm />
      <TransactionList />
    </div>
  )
}