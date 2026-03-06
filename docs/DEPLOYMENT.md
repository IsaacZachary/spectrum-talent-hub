# Deployment & WordPress Integration Guide 🚀

Follow these steps to deploy the recruitment portal to your Spectrum Network cPanel and integrate it with your WordPress site.

## 1. Prepare Files for Upload
I have already generated a production build for you in the `dist/` folder. For the portal to work, you need to combine the frontend build with the backend API.

**Contents to Upload:**
1.  All files inside the `dist/` folder (includes `index.html`, `assets/`, `.htaccess`, etc.).
2.  The entire `api/` folder (contains `config.php`, `jobs.php`, etc.).

---

## 2. Uploading to cPanel
You can either use a **Subfolder** or a **Subdomain**.

### Option A: Subfolder (Recommended for easiest integration)
1.  Open **File Manager** in cPanel.
2.  Navigate to `public_html/`.
3.  Create a new folder named `recruitment`.
4.  Upload the contents of the `dist/` folder and the `api/` folder inside `public_html/recruitment/`.
5.  Create an empty folder named `uploads` inside `public_html/` (one level up from `recruitment`, or adjust `api/upload.php` path).
    *   *Note: I configured `upload.php` to look for `../uploads/`, so it should be outside the public portal folder for security.*

### Option B: Subdomain (e.g., recruitment.spectrumnetworkpi.com)
1.  In cPanel, go to **Domains** and create the subdomain.
2.  Set the **Document Root** to a new folder (e.g., `/home3/spectsx2/recruitment.spectrumnetworkpi.com`).
3.  Upload the contents of the `dist/` and `api/` folders there.

---

## 3. Database Link
Ensure your `api/config.php` on the server has the live credentials:
- **DB Name**: `spectsx2_recruitment`
- **User**: `spectsx2_admin`
- **Pass**: `VyGBD7{%[EvSIk,I`
- **Host**: `localhost`

---

## 4. Integration with WordPress
Once deployed, you can integrate it into your main site:

### Method 1: Embed via iframe (Portal appears inside your site)
Add this code to a new page in WordPress (using the "Custom HTML" block):
```html
<iframe 
  src="https://www.spectrumnetworkpi.com/recruitment" 
  width="100%" 
  height="1000px" 
  style="border:none; overflow:hidden;"
  scrolling="no">
</iframe>
```

### Method 2: Direct Link (Recommended for Admin)
Add a "Recruitment" link to your WordPress Navigation Menu:
1.  Go to **Appearance > Menus**.
2.  Add a **Custom Link**.
3.  **URL**: `https://www.spectrumnetworkpi.com/recruitment`
4.  **Link Text**: `Careers`

### Method 3: Call to Action Button
Edit your homepage hero or footer and add a button:
```html
<a href="/recruitment" class="btn btn-primary">Join Our Team</a>
```

---

## 🛡️ Protecting the Admin Dashboard
Since the admin dashboard `https://yourdomain.com/recruitment/admin` is accessible to everyone, you should protect the `/admin` route.
1.  In cPanel, use the **Directory Privacy** tool.
2.  Select the `recruitment` folder (or a subfolder if you split them).
3.  Set a username and password to prevent unauthorized access to the pipeline.

---
*Guide prepared by Antigravity for Spectrum Network International.*
