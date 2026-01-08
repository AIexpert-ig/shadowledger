// src/app.tsx
import React from 'react'
import { useLedgerStore } from './store/ledger'
import { DashboardView } from './components/DashboardView'
import { ReportView } from './components/ReportView'

// Expose a tiny shim to keep the original button callbacks working.
// In a real app you'd replace it with a proper useLedgerStore() call.
export const app = {
  toggleReportMode: () => useLedgerStore.getState().toggleView()
}

export const App = () => {
  const mode = useLedgerStore(state => state.viewMode)

  return mode === 'dashboard' ? <DashboardView /> : <ReportView />
}
