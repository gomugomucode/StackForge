# SEO AUDIT

## Expected Score: > 95

## Audit Findings

### 1. Incomplete Metadata (OpenGraph & Twitter Cards)
* **File:** `src/components/ui/SEOHead.tsx`
* **Description:** Currently, only `<title>` and `<meta name="description">` are appended to the DOM.
* **Fix Recommendation:** Inject `og:title`, `og:description`, `og:image`, `twitter:card`, and `twitter:creator` properties dynamically.

### 2. Missing Structured Data (JSON-LD)
* **File:** `SEOHead.tsx`
* **Description:** No schema.org data is emitted. Google lacks context that `TechHubPage` represents a "Course" or "Article".
* **Fix Recommendation:** Accept a `schemaType` prop in `SEOHead` and inject a `<script type="application/ld+json">` tag with corresponding Course/Article schema.

### 3. Canonical URLs
* **Description:** Missing `<link rel="canonical">`.
* **Fix Recommendation:** Inject the canonical URL based on `window.location.href` (stripping queries if appropriate) in `SEOHead`.

### 4. Missing Crawl Agents (Sitemap & Robots.txt)
* **File:** Project Root
* **Description:** Client-side React apps require a statically hosted `sitemap.xml` for indexation.
* **Fix Recommendation:** Create a build script (`generate-sitemap.js`) that outputs a static XML file during `npm run build` containing URLs to all Roadmaps and Tech Hub pages.
