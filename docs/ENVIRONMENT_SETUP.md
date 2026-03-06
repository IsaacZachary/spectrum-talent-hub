# Complete Environment & Infrastructure Setup

This document records the exact configuration, credentials, and steps used to set up the Spectrum Network Recruitment Portal across local development, GitHub, and the cPanel hosting environment.

## 1. Local Development 💻
The portal is built with React, Vite, and Tailwind CSS.
- **Project Path**: `c:\Users\Ba3eh\Documents\snp-recruitment-portal`
- **Commands**:
  - `npm install` (Install dependencies)
  - `npm run dev` (Start local development server on port 8080)
  - `npm run build` (Generates production-ready files in the `dist/` directory)
- **Recent Fixes**:
  - The `vite.config.ts` base path was updated to `base: "./"` to support subfolder deployment (fixing 404 errors for assets).

## 2. GitHub Repository 🐙
- **Repository URL**: `https://github.com/IsaacZachary/spectrum-talent-hub`
- **Visibility**: Currently **Public** (to allow cPanel to clone it without SSH/PAT, since shell access is disabled on the host). 
  - *Note: Once the portal is stabilized or if you switch to manual File Manager uploads, you can safely revert this repository to **Private** for maximum security.*
- **SSH Keys**: A public key named `cPanel Spectrum Network` was added to your GitHub settings to authorize future cPanel pull requests once Shell Access is enabled.

## 3. cPanel & Hosting 🌐
The project is hosted on HostPinnacle via cPanel.
- **cPanel URL**: `https://www.spectrumnetworkpi.com:2083/`
- **cPanel User**: `spectsx2`
- **Web Root for Portal**: `public_html/recruitment`
- **Uploads Directory**: `public_html/uploads` (Used for storing applicant CVs).

### Deployment Strategy (Git Version Control)
Because "Shell Access" is disabled in cPanel, we used the **Git Version Control** tool to clone the public repository.
To update the live site:
1. In cPanel, navigate to **Git Version Control**.
2. Click **Manage** next to the repository.
3. Go to the **Pull or Deploy** tab and click **Update from Remote**.
4. In **File Manager**, move the files from the newly pulled `dist/` folder directly into the root of `public_html/recruitment`.

## 4. Database Setup (MySQL) 🗄️
A dedicated MySQL database is set up in cPanel to handle jobs and applications.

### Credentials
- **DB Host**: `localhost`
- **DB Name**: `spectsx2_recruitment`
- **DB User**: `spectsx2_admin`
- **DB Password**: `VyGBD7{%[EvSIk,I`

### Architecture
- The API is built in native PHP to run seamlessly on cPanel.
- API files (`jobs.php`, `applications.php`, `upload.php`, `config.php`) reside in `public_html/recruitment/api`.
- The database connection string is embedded in `api/config.php`.

## 5. Security & Next Steps 🛡️
- **Admin Dashboard**: Accessible at `/recruitment/admin`. We highly recommend using cPanel's **Directory Privacy** to password-protect the `public_html/recruitment/admin` route (or the entire portal if it's internal).
- **SSL**: Ensure the WordPress host forces HTTPS so all CV uploads and API requests are encrypted.
- **Privacy**: Go to your GitHub Repository Settings and change the visibility back to **Private** if you plan to upload files manually via ZIP instead of using cPanel's Git auto-pull.
