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

### May 12, 2026 - Subresource Integrity (SRI) for External Dependencies
- **Finding:** External scripts and stylesheets loaded from CDNs (e.g. Bootstrap) lacked Subresource Integrity (SRI) hashes, creating a supply-chain vulnerability if the CDN was compromised.
- **Action:** Added SRI hashes and crossorigin="anonymous" attributes to Bootstrap and Google Fonts dependencies in `index.html`. Note that the originally reported vulnerable script (Font Awesome) had already been removed in a prior commit.

### May 19, 2026 - Performance Optimization: Hardware Accelerated Animations
- **Activity**: Refactored cursor glow animation in `js/premium.js` to use `transform: translate()` instead of `top`/`left` properties. Added `top: 0; left: 0;` baseline to `css/premium.css`.
- **Security/Performance Reasoning**: Modifying `top` and `left` properties triggers full layout calculations and repaints (layout thrashing) on the main thread for every frame. Switching to `transform` offloads the animation work to the GPU via the compositor thread, ensuring smooth 60fps performance without blocking the main CPU thread. This prevents potential denial-of-service or severe UX degradation on lower-end devices.
- **Verification Note**: Created a Playwright script `benchmark.py` to confirm the architectural change. Visual tests via Playwright confirmed the DOM state updates correctly to `transform: translate(x, y) translate(-50%, -50%)`.
