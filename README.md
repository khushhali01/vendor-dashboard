# Vendor Management Dashboard (React + Vite + Supabase)

##  Live Demo
https://vendor-dashboard-theta.vercel.app

This project is a Vendor Management Dashboard built using React and Vite with Supabase as the backend for data fetching and admin authentication. The application demonstrates how a modern admin panel can be structured to manage vendors through a clean, responsive, and user-friendly interface.

The system includes an Admin Login module powered by Supabase Authentication, allowing secure admin access. Once logged in, the admin is redirected to a Dashboard Overview displaying key metrics such as total vendors, total customers, and active prepaid cards. Vendor data is fetched from Supabase and displayed in a structured table with features like search, status indicators (Active/Inactive), and vendor detail viewing.

The Vendors module allows admins to view and filter vendor records fetched from the backend, while maintaining a professional admin panel layout similar to real-world enterprise dashboards.

 Note: Although the dashboard UI includes a Customers section and customer count cards, customer details data is currently not fetched or implemented. This section is intentionally kept as a placeholder for future backend expansion.
 The Download Report button is implemented for UI/UX demonstration purposes only. It is a frontend-only feature and does not generate or download any actual report, as no backend or server-side logic is integrated for report processing.

---

##  Features
- Admin Login UI 
- Dashboard overview with summary cards:
  - Total Vendors
  - Total Customers
  - Active Prepaid Cards
- Vendor listing with:
  - Active / Inactive status
  - Search functionality
  - View action
- Clean, responsive admin panel layout
- Built using React + Vite + Supabase for fast development
- using Supabase for fetching data  and authentication

---

##  Tech Stack

- React.js
- Vite
- Supabase
- JavaScript (ES6+)
- CSS / UI components
- Tailwind CSS
- Mock JSON data

---

##  Setup & Installation

### 1. Clone the repository
git clone https://github.com/khushhali01/vendor-dashboard.git 

cd vendor-dashboard

### 2. Install dependencies
npm install

### 3. Supabase Configuration

# Step 1️. Create a Supabase Project
1. Go to https://supabase.com
2. Click New Project
3. Complete project setup
4. Open Project Settings → API
5. Copy:
Project URL
Anon Public API Key

# Step 2️. Create .env File
After cloning the project, go to the root folder (same level as package.json) and create a file  .  named: .env

 # Step 3️. Add Supabase Credentials
Paste the following into the .env file
Replace values with your own Supabase credentials

VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

 # Step 4️. Important Rules
Variables must start with VITE_
Do not add quotes (" ")
File name must be exactly .env
Keep .env in the root directory

### 4. Run the project
npm run dev

### 5. Open in browser
http://localhost:5173

---

##  Assumptions
- Static data is used
- No payment or sensitive data handling
- Project is frontend-focused
- Customer details data is not fetched or implemented
- Download Report button is frontend-only for UI demonstration and does not generate or download  
  reports

---
