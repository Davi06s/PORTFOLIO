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

### Security Improvement: Contact Info Obfuscation
- **Activity**: Obfuscated plaintext email and phone number using inline JavaScript to dynamically construct `mailto` and `tel` links. Added `<noscript>` fallback suggesting the use of the contact form.
- **Security Reasoning**: Plaintext contact details in HTML source are easily targeted by automated scraping bots, leading to spam and potential privacy violations. Constructing the details via JavaScript at runtime mitigates this risk while preserving functionality for real users.
- **Verification Note**: Confirmed functionality with an ad-hoc playwright script, visual verification on local dev server, and running the `test_sri.py` suite.
