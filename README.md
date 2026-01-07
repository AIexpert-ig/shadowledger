# Shadow Ledger 🌑

**Shadow Ledger** is a zero-dependency, single-file web application designed to solve the "Cash Lag" problem for travel consultants. It acts as a private book of record to track physical cash liabilities against bank deposits before they are officially reconciled in the corporate ERP.

## 🚀 The Problem
Travel consultants collect cash daily but deposit it periodically. ERP systems are often updated with a delay (3-5 days), creating a "Blind Spot" where the consultant cannot see their true net financial position.

## ✅ The Solution
Shadow Ledger provides a mobile-friendly interface to:
1.  **Log Collections:** Record cash received from clients immediately.
2.  **Log Deposits:** Record ATM/CDM receipts and transfers.
3.  **Real-Time Netting:** Instantly calculates `(Cash Held - Cash Sent)` to show your exact liability.
4.  **Generate Reports:** One-click generation of settlement text to email Finance.

## 🛠 Features
* **Offline First:** Uses `localStorage`. Data persists in your browser even if you close the tab or lose internet.
* **Zero Server:** No backend, no database. Your financial data never leaves your device.
* **Mobile Ready:** Responsive design for quick entry on the go.

## 📦 Usage
No installation required. This is a static HTML file.
1.  Download `index.html`.
2.  Open it in any web browser.
3.  (Optional) Host on GitHub Pages for mobile access.

## 🔒 Privacy Note
This tool uses **Local Storage**. If you clear your browser cache, your ledger history will be erased. Export your data regularly.

## 📄 License
MIT License.
