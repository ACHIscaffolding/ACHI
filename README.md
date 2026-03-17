ACHI Scaffolding ERP / CRM System
Overview

This project is a production-oriented ERP and CRM system developed for ACHI Scaffolding, a scaffolding contracting company. The goal is to centralize and manage the company’s full business lifecycle, from initial client contact to project execution, inventory management, and invoicing.

The system is designed to be:

Scalable

Modular

Production-ready

Easy to maintain and extend

It combines a modern frontend architecture with a cloud-based backend to ensure accessibility from anywhere.

Core Features
1. Contact & Relationship Management

Manage all stakeholders:

Prospect

Lead

Client

Supplier

Employee

Partner

Worker

Store detailed information:

Company, phone, email, address

Source of contact (Google, Instagram, referral, etc.)

Track communication history and notes

2. Project & Pipeline Management

Full business workflow:

Inquiry → Site Visit → Quotation → Negotiation → Won / Lost → Execution → Completion

Track project status and priority

Link projects to contacts

Maintain full lifecycle visibility

3. Quotations System

Create structured quotations

Support multiple items per quotation

Track status:

Draft

Sent

Negotiation

Approved / Rejected

4. Job Orders & Execution

Convert approved quotations into job orders

Track execution status

Manage on-site operations

5. Invoicing System

Generate invoices from completed work

Track payment status

Maintain financial records

6. Inventory Management

Manage scaffolding materials and equipment

Track:

Total quantity

Available quantity

Allocated to projects

Damaged items

Link inventory usage to projects

7. Activities & Follow-ups

Log:

Calls

Meetings

Emails

Schedule follow-ups

Maintain full activity history

Tech Stack
Frontend

React

TypeScript

Vite

Material UI (MUI)

Tailwind CSS (for utility styling where applicable)

Backend

Supabase (PostgreSQL + Authentication)

Deployment

GitHub Pages (Frontend)

Supabase Cloud (Backend)

Tools

Git & GitHub (version control)

Postman (API testing)

Project Structure
src/
│
├── components/
│   ├── layout/           # App layout (sidebar, header)
│   ├── common/           # Reusable components
│   └── ui/               # UI elements
│
├── pages/
│   ├── DashboardPage.tsx
│   ├── CRMPage.tsx
│   ├── ContactsPage.tsx
│   ├── LeadsPage.tsx
│   ├── ClientsPage.tsx
│   ├── ProjectsPage.tsx
│   ├── ProjectDetailsPage.tsx
│   ├── QuotationsPage.tsx
│   ├── JobOrdersPage.tsx
│   ├── InvoicesPage.tsx
│   ├── InventoryPage.tsx
│   ├── ActivitiesPage.tsx
│   ├── FollowUpsPage.tsx
│   ├── ReportsPage.tsx
│   ├── SettingsPage.tsx
│   ├── LoginPage.tsx
│   └── NotFound.tsx
│
├── hooks/                # Custom React hooks
├── lib/                  # Utilities and helpers
├── data/                 # Static or mock data
├── theme/                # Material UI theme
└── main.tsx              # App entry point



Running the Project Locally
Requirements

Node.js (v18+ recommended)

npm or yarn

Steps
# Clone the repository
git clone <YOUR_REPOSITORY_URL>

# Navigate to project folder
cd <PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev

The app will run at:

http://localhost:8080/
