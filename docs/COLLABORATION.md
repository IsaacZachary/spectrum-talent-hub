# Sharing & Reusability Guide 🤝

How to make this project a template for your team and share it effectively.

## ♻️ Making it Reusable
This portal is designed to be a "White Label" recruitment solution. To reuse it for another project:
1. **Branding**: Update the colors in `tailwind.config.ts` and replace `public/logo.png`.
2. **Metadata**: Change the project name and SEO tags in `index.html`.
3. **API Endpoints**: The PHP scripts are generic; just change the DB credentials in `api/config.php`.

## 📤 Sharing with Colleagues
### 1. GitHub (Recommended)
Invite your colleagues to the repository. They can clone it and contribute using the standard Git workflow.
```bash
git add .
git commit -m "feat: updated job listings"
git push origin main
```

### 2. cPanel Handoff
If you've deployed the site, share the:
- **URL**: e.g., `spectrumnetworkpi.com/recruitment`
- **Database Access**: Via phpMyAdmin in cPanel.
- **File Access**: Grant them access to the `public_html/recruitment` folder via FTP or File Manager.

## 🛠️ Modifying the UI
The project uses **shadcn/ui** components. To add new UI elements:
1. Find a component on [ui.shadcn.com](https://ui.shadcn.com).
2. Copy the code into the `src/components/ui` folder.
3. Import and use it in your pages.

---
*Created by Antigravity for the Spectrum Talent Hub project.*
