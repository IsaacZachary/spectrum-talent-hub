# 🛠️ Maintenance & Update Guide

This guide explains how to correctly update the Spectrum Talent Hub portal. 

> [!IMPORTANT]
> **Why your cPanel changes didn't work:**
> This portal is a modern React application. The files you see in cPanel (under `public_html/recruitment`) are the **optimized/built** version of the site. Modifying the source code (the `.tsx` files) directly in cPanel does not update the website because the web server only reads the files in the `build` folder.

---

## � Local Environment Setup

Before you can make changes, your computer needs the following tools:

### 1. Required Software
- **Node.js**: [Download here](https://nodejs.org/). (Recommend the LTS version). This is needed to "build" the website.
- **Git**: [Download here](https://git-scm.com/downloads). This is needed to send your changes to GitHub.
- **Visual Studio Code**: [Download here](https://code.visualstudio.com/). The recommended editor for making code changes.

### 2. First-Time Setup
Once you have the software above:
1. **Clone the project**:
   ```bash
   git clone https://github.com/IsaacZachary/spectrum-talent-hub.git
   ```
2. **Open the folder** in VS Code.
3. **Install dependencies**: Open the terminal in VS Code and run:
   ```bash
   npm install
   ```

---

## �🔄 The Update Workflow (Standard Procedure)

To ensure your changes reflect on the live site, ALWAYS follow these 4 steps:

### 1. Make Changes Locally
Open the project on your computer using a code editor (like VS Code).
- **Header Location/Contact:** Go to `src/components/PortalHeader.tsx`
- **General Text/Wordings:** Check the files in `src/pages/` (e.g., `Index.tsx`, `About.tsx`)
- **Branding/Colors:** Modify `tailwind.config.ts`

### 2. Build the Project
After saving your changes, you must "rebuild" the site to update the production files. Open your terminal in the project folder and run:
```bash
npm run build
```
This command updates the `build/` folder with your latest changes.

### 3. Commit and Push to GitHub
Now, save these changes to GitHub. If you are using a terminal:
```bash
git add .
git commit -m "update: changed header location and wordings"
git push origin main
```
*Note: Make sure the `build/` folder is included in the commit.*

### 4. Deploy in cPanel
Once you push to GitHub, you need to tell cPanel to pull the latest code.
1. Log in to your **cPanel**.
2. Search for **Git Version Control**.
3. Find the `snp-recruitment-portal` repository.
4. Click **Manage** -> **Pull or Deploy**.
5. Click **Update from Remote** and then **Deploy HEAD**.

Your changes will be live **instantly**.

---

## 📍 Where to make common changes

| Feature | File Location |
| :--- | :--- |
| **Top Header Bar** (Address, Phone, Email) | `src/components/PortalHeader.tsx` |
| **Navigation Menu Labels** | `src/components/PortalHeader.tsx` |
| **Home Page Hero Text** | `src/pages/Index.tsx` |
| **Footer Information** | `src/components/Footer.tsx` (if applicable) |
| **Database Credentials** | `api/config.php` |

---

## ❓ Frequently Asked Questions

### Do I need a local database for wording changes?
**No.** The API scripts in the `api/` folder are already configured to connect to the cPanel database. As long as you are only changing wordings or UI layout, you don't need to touch the database.

### What should I NOT touch?
-   **`package.json`**: Unless you are adding new features/libraries.
-   **`vite.config.ts`**: This controls how the site is built.
-   **`.cpanel.yml`**: This is critical for the deployment to work.

### How do I see changes before pushing?
Run `npm run dev` in your terminal. This will give you a local link (usually `http://localhost:8080/recruitment/`) where you can see a live preview of your changes as you type.

---
*Maintained by Isaac Zachary*
