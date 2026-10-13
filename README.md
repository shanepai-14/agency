# Seafarer Recruitment Agency – Website (Frontend)

A multi-page frontend for a seafarer recruitment (manning) agency that places crew with European ship owners. Its main job is to collect applications from seafarers, including their CV and documents.

This is a **frontend-only** project. The forms validate on the client and submit to **mock functions** that you can replace with real API calls later (see [Connecting a real API](#connecting-a-real-api)).

**Stack:** React 18 + Vite · React Router · Tailwind CSS · Framer Motion · React Hook Form + Zod · Lucide icons · react-helmet-async

---

## Getting started

Requirements: Node.js 18+ (20 LTS recommended).

```bash
npm install       # install dependencies
npm run dev       # start dev server at http://localhost:5173
npm run build     # production build into /dist
npm run preview   # preview the production build locally
```

### Deploying to Vercel
The project is ready for Vercel with no extra setup:

1. In Vercel, choose **Add New → Project** and import the GitHub repository.
2. Leave the detected settings as they are (Framework: Vite, Build: `npm run build`, Output: `dist`). `vercel.json` sets these too.
3. Optional: under **Environment Variables**, add `VITE_API_URL` once a real API exists.
4. Click **Deploy**. After that, every push to `main` deploys automatically.

`vercel.json` rewrites every route to `index.html`, so deep links like `/vacancies/chief-officer-bulk-001` work on refresh. It also gives the hashed files in `/assets` long-term cache headers.

On other hosts, serve `index.html` for all routes (e.g. Netlify `_redirects`: `/* /index.html 200`, or Nginx `try_files $uri /index.html`).

---

## Routes

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/seafarers` | For Seafarers |
| `/positions` | Positions (ranks and typical requirements) |
| `/vacancies` | Vacancy listings with search and filters (state kept in the URL) |
| `/vacancies/:id` | Vacancy detail |
| `/how-to-apply` | Process, documents checklist, short FAQ |
| `/apply` | 4-step application form. Accepts `?position=<rankId>&vacancy=<vacancyId>` |
| `/ship-owners` | Services for employers + inquiry form |
| `/faq` | FAQ tabs (`?tab=owners` opens the ship-owner tab) |
| `/contact` | Contact details, map placeholder, contact form |
| `/privacy` | Privacy Policy placeholder |
| `*` | 404 page |

---

## Project structure

```
src/
  components/
    layout/   Header, Footer, Logo, Seo, SiteLayout (page transitions + scroll-to-top)
    ui/       Button, Card/IconCard, SectionHeading, PageHero, CtaBanner, Accordion,
              Tabs, Lists (CheckList, NumberedSteps, Badge), ImagePlaceholder, Reveal, Icon
    forms/    ApplicationForm, InquiryForm, ContactForm, FormField (inputs),
              FileUpload, TagSelect, FormParts (Honeypot, SubmitButton, alerts, StepIndicator)
  data/       ← all editable content
  lib/        schemas.js (Zod validation), files.js (upload rules), utils.js
  pages/      one file per route
  services/
    api.js    ← mock submit functions (connect real API here)
```

---

## Editing content

All text lives in `src/data/`, so you can edit it without touching components:

| File | Contents |
|---|---|
| `site.js` | Agency name, licence, address, phone, email, WhatsApp, office hours, navigation links |
| `ranks.js` | Rank categories, ranks and typical requirements. Rank `id`s are used in URLs and the application form, so keep them stable |
| `vacancies.js` | Vacancy listings (**sample data, replace before launch**). `rankId` must match `ranks.js`, and `vesselType` must match `vesselTypes.js` |
| `vesselTypes.js` | Vessel types and contract-length filter buckets |
| `faqs.js` | FAQs for seafarers and ship owners (`featured: true` also shows them on How to Apply) |
| `content.js` | Home process steps, "why choose us", documents checklist, seafarer support, About page copy, ship-owner services |
| `privacy.js` | Privacy Policy sections (placeholder; needs review by a legal advisor) |

Search the project for `[` to find every placeholder, such as `[Agency Name]`, `[Licence No.]`, `[Phone]` and `[Email]`.

**Icons:** data files refer to Lucide icons by name (e.g. `icon: 'Compass'`). To use a new icon, add it to the map in `src/components/ui/Icon.jsx`.

**Images:** the site uses labelled placeholders (`<ImagePlaceholder label="vessel at sea" />`). Replace each one with an `<img>` that has meaningful `alt` text.

**Map:** replace the placeholder block at the bottom of `src/pages/Contact.jsx` with an embedded map iframe.

**Colours and fonts:** defined in `tailwind.config.js` (`navy`, `mist`, `accent`) and loaded in `index.html` (Sora, Plus Jakarta Sans).

---

## Connecting a real API

All submissions go through **`src/services/api.js`**:

| Function | Used by | Suggested endpoint | Body |
|---|---|---|---|
| `submitApplication(data)` | `/apply` | `POST /api/applications` | `multipart/form-data` (includes `cv` and `certificates` files) |
| `submitInquiry(data)` | `/ship-owners` | `POST /api/inquiries` | JSON |
| `submitContact(data)` | `/contact` | `POST /api/contact` | JSON |

Each function has a `// REAL API:` comment containing the `fetch` call to swap in:

1. Create a `.env` file containing `VITE_API_URL=https://your-api.example.com`.
2. In `api.js`, replace each `return mockRequest(...)` with the commented `fetch(...)` block, and remove the `eslint-disable` comments above `API_BASE_URL` and `handleResponse`.
3. The components need no changes. They expect each function to **resolve** on success and **throw an `Error`** (whose `message` is shown to the user) on failure. `handleResponse` already does this.

The application payload contains `fullName`, `dateOfBirth`, `nationality`, `email`, `phone`, `position` (rank id), `seaService`, `vesselTypes[]`, `lastVessel`, `lastRank`, `availableFrom`, `cv` (1 file), `certificates[]` (files), `message`, `consent`, `vacancyId` and `website` (honeypot).

**Spam protection:** every form has a hidden honeypot field called `website`. If it contains a value, the submission is silently dropped. Repeat this check on the server, and add rate limiting or a CAPTCHA there if needed.

**Server-side validation:** client-side checks (Zod schemas in `src/lib/schemas.js`, file rules in `src/lib/files.js`) are for UX only. The backend must validate again, including file type and size (CV: PDF/DOC/DOCX ≤ 5 MB; certificates: PDF/JPG/PNG ≤ 5 MB each, max 10).

**Vacancies from an API:** `src/data/vacancies.js` is static for now. To load listings from a backend, fetch them in `Vacancies.jsx` and `VacancyDetail.jsx` and keep the same object shape.

### Testing the error state
While the mocks are active, any form submitted with an email ending in **`@fail.test`** fails, so you can see the error message.

---

## Accessibility and behaviour notes

- Semantic landmarks, a skip link, labels on every field, `aria-invalid`/`aria-describedby` for errors, visible focus rings, and touch targets of at least 44px.
- Accordion and tabs follow WAI-ARIA patterns (tabs support arrow keys).
- Animations respect `prefers-reduced-motion`.
- The page scrolls to the top after every route change, once the outgoing page has faded out.
- Each page sets its own `<title>` and meta description through `<Seo />`.
