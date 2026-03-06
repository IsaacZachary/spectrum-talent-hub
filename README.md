# Spectrum Network Recruitment Portal 🛡️

[![React](https://img.shields.io/badge/React-18.3-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind--CSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-black?logo=shadcnui)](https://ui.shadcn.com/)
[![PHP](https://img.shields.io/badge/PHP-8.x-777BB4?logo=php)](https://www.php.net/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql)](https://www.mysql.com/)

A professional, high-fidelity recruitment portal built for **Spectrum Network International**. This portal manages job listings, applicant submissions, and features a full administrative dashboard for managing the recruitment pipeline.

---

## 🚀 Features

- **Public Job Board**: Searchable and filterable job listings.
- **Dynamic Application Form**: Support for detailed applicant info and CV/Resume uploads.
- **Admin Dashboard**: 
    - Real-time recruitment statistics.
    - Application management (Reviewing, Shortlisting, Interviewing, etc.).
    - Job listing management (Create, Edit, Publish).
- **Backend Integration**: Custom PHP REST API connected to a secure MySQL database on cPanel.
- **Responsive Design**: Optimized for mobile, tablet, and desktop viewing.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (TypeScript)
- **Styling**: Tailwind CSS with custom branding (Navy & Red)
- **Components**: shadcn/ui + Lucide Icons
- **Build Tool**: Vite

### Backend
- **Language**: PHP (REST API)
- **Database**: MySQL (hosted on cPanel)
- **File Storage**: File system based CV storage

---

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- PHP (v7.4+)
- MySQL Database

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/IsaacZachary/spectrum-talent-hub.git
   cd spectrum-talent-hub
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure the Database**:
   - Update `api/config.php` with your database credentials.
   - Run `api/seed.php` once to populate initial data.

4. **Run Locally**:
   ```bash
   npm run dev
   ```

5. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🛡️ Administrative Access
To access the admin dashboard, navigate to `/admin`.
*(Note: In a production environment, ensure this route is protected by authentication or server-side redirects).*

---

## 📄 Documentation
Detailed guides can be found in the `/docs` directory:
- [Implementation Guide](./docs/IMPLEMENTATION.md)
- [Stack Overview](./docs/STACK.md)
- [Reusability & Collaboration](./docs/COLLABORATION.md)

---

## ✨ Credits
Special thanks to **Isaac Zachary** for the vision and coordination in bringing this portal to life for Spectrum Network International.

---

© 2026 Spectrum Network International. All rights reserved.
