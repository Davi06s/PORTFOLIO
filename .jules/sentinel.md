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

### Code Health: CSS Selector Hardening
- **Activity**: Replaced brittle DOM-dependent CSS selector with a specific class for transparent PNG backgrounds.
- **Security Reasoning**: Using specific utility classes instead of order-dependent selectors (`:not(:first-child)`) prevents unintended style leakage if DOM order changes. This hardens the CSS architecture against UI defects caused by future content updates.
- **Verification Note**: Verified visually using a Playwright script targeting the local development server.
