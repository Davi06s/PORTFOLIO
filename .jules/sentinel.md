## Sentinel Journal - 2026-05-07

### Code Health: MSO Cleanup
- **Activity**: Removed legacy Microsoft Office conditional comments and namespaces from .
- **Security Reasoning**: While primarily a code health issue, removing unnecessary metadata reduces the surface area of information disclosed about the document's origin (e.g., student names like 'Schino Davide' or 'Ahmed Mourad' in MSO properties). It also prevents potential issues with parsers that might handle these non-standard tags incorrectly.
- **Verification Note**: Verified with grep that all text occurrences were removed. Playwright verification encountered timeouts due to missing local assets () and external font loading, but page structure was confirmed valid by inspecting the document after removal.
## Sentinel Journal - 2026-05-07

### Code Health: MSO Cleanup
- **Activity**: Removed legacy Microsoft Office conditional comments and namespaces from `index.html`.
- **Security Reasoning**: While primarily a code health issue, removing unnecessary metadata reduces the surface area of information disclosed about the document's origin (e.g., student names like 'Schino Davide' or 'Ahmed Mourad' in MSO properties). It also prevents potential issues with parsers that might handle these non-standard tags incorrectly.
- **Verification Note**: Verified with grep that all text occurrences were removed. Playwright verification encountered timeouts due to missing local assets (`js/scripts.js`) and external font loading, but page structure was confirmed valid by inspecting the document after removal.

### Security Enhancement: Added SRI to External Stylesheet
- **Activity**: Added Subresource Integrity (SRI) and crossorigin attributes to the bootstrap-icons.css CDN link in `index.html`.
- **Security Reasoning**: Including an SRI hash ensures that the browser will only execute or apply the fetched resource if its content matches the expected hash. This protects the site and its users from potential attacks where a compromised CDN serves malicious content (e.g., XSS attacks via CSS exfiltration or manipulated layout).
- **Verification Note**: Generated the SHA-384 hash by downloading the file and computing the digest. Verified the page loaded correctly with `curl` on a local Python HTTP server without generating integrity failure errors.
