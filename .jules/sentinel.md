# Sentinel Journal

- 2026-05-11: Implemented Subresource Integrity (SRI) checks for external CDN scripts to prevent supply chain attacks via tampering. Validated SRI generation procedure using `crypto.createHash('sha384')` via Node.js script since the repository doesn't have `package.json` setup for typical tooling. Emphasized adding `crossorigin="anonymous"` alongside `integrity` attributes. Added explicit security comments in HTML source to document mitigation steps, following persona guidelines.
