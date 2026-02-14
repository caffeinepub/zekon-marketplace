# Specification

## Summary
**Goal:** Make it clear how to make the app publicly accessible in the Caffeine UI and where to retrieve the generated public Frontend URL after going live.

**Planned changes:**
- Update `frontend/docs/deployment.md` to add a dedicated “Deploy via Caffeine UI” section (in addition to any CLI instructions).
- Document the exact workflow: the public URL is only generated/shown after clicking the platform’s “Go live” control.
- Explicitly explain the on-screen message “Your live site will appear here once you go live” and what to do next.
- Add clear steps for locating and copying the Frontend URL in the Caffeine UI, noting it commonly ends with `.icp0.io`.

**User-visible outcome:** Users can follow the deployment doc to click “Go live” in Caffeine and then find/copy the publicly accessible Frontend URL (often ending in `.icp0.io`) without needing the assistant to provide the URL.
