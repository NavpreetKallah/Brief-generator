## Brief-generator

**Stack:** Next.js, TypeScript, Vitest.
- Vitest for its lightweight speed
- Next.js's App Router to keep the API key server-side.
- Localstorage was used to store data.

**What I cut:**
- No cloud migration beyond Vercel's default hosting. This was out of scope for a 
  3-hour build and I would have moved to a managed Postgres instance if more time was given.
- No additional guardrails on the brief-generation prompt beyond the verification schema. A user could steer the AI off-task. I 
  judged that closing this properly was out of scope for the time budget.

**How I used AI tools:**
Used Claude for UI scaffolding, since the brief said a designer already 
exists. Claude produced heavily duplicated components, which needed a 
refactor regardless of AI use. When I raised this, Claude agreed and attempted 
to fix it, but the result used far more className variants than the design 
needed. I simplified these manually to get a consistent, streamlined UI.

**Time spent**
This was all tracked with Github commit history.
- Planning with Claude: 5 min
- Repo setup: 5 min
- Deploying to Vercel: 10 min
- Brief generation feature: 30 min
- Claude/Gemini integration: 30 min (API Access fell through)
- UI: 55 min
- Video: 20 min
- README: 15 min
- **Total: 2 hour 50 minutes**

**Running the tests**

```
npm test
```

Runs the Vitest suite, including the schema validation test for a malformed briefs. 
