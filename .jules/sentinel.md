# Sentinel Journal

### Code Health: MSO Cleanup
- **Activity**: Removed legacy Microsoft Office conditional comments and namespaces from .
- **Security Reasoning**: While primarily a code health issue, removing unnecessary metadata reduces the surface area of information disclosed about the document's origin (e.g., student names like 'Schino Davide' or 'Ahmed Mourad' in MSO properties). It also prevents potential issues with parsers that might handle these non-standard tags incorrectly.
- **Verification Note**: Verified with grep that all text occurrences were removed. Playwright verification encountered timeouts due to missing local assets () and external font loading, but page structure was confirmed valid by inspecting the document after removal.
## Sentinel Journal - 2026-05-07

### Code Health: MSO Cleanup
- **Activity**: Removed legacy Microsoft Office conditional comments and namespaces from `index.html`.
- **Security Reasoning**: While primarily a code health issue, removing unnecessary metadata reduces the surface area of information disclosed about the document's origin (e.g., student names like 'Schino Davide' or 'Ahmed Mourad' in MSO properties). It also prevents potential issues with parsers that might handle these non-standard tags incorrectly.
- **Verification Note**: Verified with grep that all text occurrences were removed. Playwright verification encountered timeouts due to missing local assets (`js/scripts.js`) and external font loading, but page structure was confirmed valid by inspecting the document after removal.

### May 11, 2026 - CDN & External Script Pruning
- **Finding:** Unused external scripts (e.g. Font Awesome when Bootstrap Icons is heavily used) increase attack surface (XSS via compromised CDN) and page load times.
- **Action:** Pruned redundant `use.fontawesome.com` script and migrated residual classes to local/pre-existing Bootstrap Icons CDN equivalents. Minimizing external dependencies reduces third-party risk.

### May 11, 2026 - PII Obfuscation
- **Finding:** Personal phone number exposed in plain text in `index.html`. This exposes the owner to potential scraping and spam.
- **Action:** Replaced the plain text phone number and `tel:` link with an obfuscated version linking to the contact form (`#contact`), adding a security comment. PII should never be exposed in plain text.
