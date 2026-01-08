# Modernization Proposal: Shadow Ledger 2026 Architecture

## 1. Executive Summary
This document outlines the strategy for evolving "Shadow Ledger" from a single-file prototype into a scalable, enterprise-grade distributed system. The goal is to support multiple travel consultants, centralized reporting, and robust data security while maintaining the "offline-first" capability that users love.

## 2. Current State (The `feature/modernize-2026` Branch)
We have successfully refactored the legacy HTML monolith into a modular React application.
* **Frontend:** React 19, Vite, TypeScript.
* **State:** Zustand (with automated persistence).
* **Styling:** CSS Modules with OKLCH color spaces.
* **Status:** Stable and ready for beta testing.

## 3. Proposed Microservices Architecture
To support the 2026 roadmap, we propose splitting the monolithic repository into three distinct artifacts:

### 📦 Artifact A: `shadow-ledger-client` (The PWA)
* **Responsibility:** User Interface and Offline Logic.
* **Key Upgrade:** Implement **TanStack Query** to handle synchronization between `localStorage` (offline) and the new API (online).
* **Deployment:** Vercel or Cloudflare Pages (Edge Network).

### ⚙️ Artifact B: `shadow-ledger-api` (The Backend)
* **Responsibility:** Data reconciliation, PDF generation, and Corporate ERP integration.
* **Tech Stack:** * **Runtime:** Node.js (Hono or Fastify).
    * **Database:** PostgreSQL (Supabase) for relational financial data.
    * **Auth:** Auth0 or Clerk (replacing the current "no-auth" model).
* **API Contract:**
    * `POST /sync`: Accepts a batch of offline transactions to sync with the server.
    * `GET /reports/pdf`: Generates the official Marriott-style settlement PDF.

### 🎨 Artifact C: `shadow-ledger-ui` (Design System)
* **Responsibility:** Shared component library to ensure brand consistency across internal tools.
* **Content:** The "Glassmorphism" cards, buttons, and OKLCH color tokens exported as an NPM package.

## 4. Migration Roadmap
| Phase | Goal | Actions |
| :--- | :--- | :--- |
| **Q1 2026** | **Stabilize** | Merge `feature/modernize-2026` to `main`. Deploy PWA. |
| **Q2 2026** | **Connect** | Initialize `shadow-ledger-api`. Add "Sign In" to the PWA. |
| **Q3 2026** | **Scale** | Migrate local receipts (Base64) to Cloud Storage (AWS S3). |

---
*Prepared by: Senior Full-Stack Architect*
*Date: January 8, 2026*