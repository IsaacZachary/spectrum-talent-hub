# Technical Stack & Architecture Doc 🏗️

This document explains the "Why" and "How" of the Spectrum Network Recruitment Portal.

## The Architecture
We chose a **Separated Frontend-Backend** architecture for maximum flexibility:
- **Frontend**: A modern React Single Page Application (SPA).
- **Backend**: A RESTful PHP API communicating with MySQL.

### Why this stack?
1. **Performance**: React ensures a snappy UI, while PHP is the native language of cPanel, requiring zero additional server configuration.
2. **Scalability**: The database schema allows for thousands of applications without performance degradation.
3. **Integration**: Being a standalone app, it can be embedded anywhere (WordPress, static HTML, etc.) without dependency conflicts.

## Commands Overview

### Development
```bash
npm install        # Install dependencies
npm run dev        # Launch local dev server
```

### Production
```bash
npm run build      # Create a production-ready bundle in /dist
```

### Backend Tasks
- **Update DB**: Modify `api/jobs.php` or `api/applications.php`.
- **Seed Data**: Run `php api/seed.php` or visit the URL to reset/add initial jobs.

## Advanced Integration
### Hosting on a Subdomain
To move from an iframe to a subdomain (e.g., `https://careers.spectrumnetworkpi.com`):
1. Point the subdomain's document root to the folder containing the `dist` files.
2. Update the `API_BASE_URL` in `src/lib/api.ts` if the API moved to a different domain.

### Protecting the Admin Dashboard
The current `/admin` route is client-side. To secure it:
- **Basic**: Use a `.htaccess` login on the `admin.php` or the folder.
- **Advanced**: Implement a JWT-based authentication system in the PHP API.
