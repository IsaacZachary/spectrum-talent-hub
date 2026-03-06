# Guide for Similar Recruitment Portal Tasks 📖

This guide outlines the step-by-step workflow for building and integrating a standalone recruitment portal into an existing environment like WordPress/cPanel.

## 1. Environmental Assessment
- **Identify the host**: Is it WordPress? Standalone PHP?
- **Integration Strategy**: Decide between:
    - **iframe**: Quickest and safest for complex React apps within WordPress.
    - **Subdomain**: Best for dedicated branding (e.g., `recruitment.domain.com`).
    - **Plugin**: Heavily integrated but harder to maintain.

## 2. Database Design & Setup
- Always use a relational database (MySQL) for recruitment data.
- **Core Tables**:
    - `jobs`: Stores descriptions, requirements, and status.
    - `applications`: Stores applicant info and links to `jobs`.
- **Primary Keys**: Use string IDs (UUIDs) for portability across environments.

## 3. Backend API Layer (PHP REST)
- Use a lightweight PHP layer for cPanel compatibility.
- **Security Check**:
    - Enable CORS headers (`Access-Control-Allow-Origin`).
    - Use PDO with prepared statements to prevent SQL Injection.
- **File Uploads**: Implement a dedicated upload script that sanitizes filenames and checks MIME types.

## 4. Frontend Architecture (React)
- **Design System**: Match the existing site's brand (colors, fonts).
- **API Client**: Abstract the `fetch` calls into a single service (`lib/api.ts`).
- **State Management**: Use `useEffect` for basic fetching or `TanStack Query` for advanced needs.

## 5. Deployment Workflow
1. **Build**: Run `npm run build` locally.
2. **Upload**: FTP the `dist` contents to a folder like `public_html/jobs`.
3. **API**: Place the `api` folder nearby and ensure `config.php` matches the server environment.
4. **Testing**: Verify file uploads and database persistence on the live server.

## 6. Pro-Tips
- **Seeding**: Always include a `seed.php` to populate the DB during development/handoff.
- **Maintenance**: Create a dedicated `README` and `docs` early to help the next developer.
