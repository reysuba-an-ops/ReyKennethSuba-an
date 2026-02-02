# Rey Kenneth R. Suba-an — Portfolio (Template)

This is a simple, responsive, interactive portfolio template. It now includes a Certificates section so you can showcase your course and professional certificates.

## Files
- `index.html` — main page (about, projects, skills, certificates, contact)
- `styles.css` — styling (theme + certificates)
- `script.js` — interactivity (filters, modal, skill animations)
- `README.md` — this file

## Certificates feature
- Add certificate cards in the `#certGrid` area in `index.html`.
- Each certificate card uses:
  - `img` — a screenshot or image of the certificate (recommended size: 1200×800 or similar)
  - `data-pdf` attribute on the `article.cert-card` with the public PDF URL for direct download/open
  - Title and issuer/date in the card body
- Visitors can:
  - Click "View" to open a modal/lightbox to inspect certificate image and open/download the PDF
  - Click "Download" to open the certificate PDF directly in a new tab or download it

## How to customize certificates
1. Open `index.html` and find the Certificates section (id=`certificates`).
2. For each certificate, add or update a `article.cert-card` like:
   ```html
   <article class="cert-card" data-type="course" data-pdf="https://your-site.com/certs/your-cert.pdf">
     <img src="https://your-site.com/images/your-cert-image.jpg" alt="Certificate title" />
     <div class="card-body">
       <h3>Certificate Title</h3>
       <p class="muted-sm">Issuer — Month Year</p>
       <div class="card-actions">
         <button class="btn" data-action="view-cert">View</button>
         <a class="btn outline" href="https://your-site.com/certs/your-cert.pdf" target="_blank" rel="noopener">Download</a>
       </div>
     </div>
   </article>
