## Technical Take-Home Challenge

**Ticket picked:** I picked Ticket 1 due to it containing aspects I have previously built, during my time at NSK Care Services a simple website form was sent to clients and this data was then stored in the database. I decided against Ticket 3 as I haven't built a weighted scoring/matching algorithm outside of coursework, and a 3-hour assessed project isn't the place to get that judgment right for the first time.

**Stack:** Next.js, TypeScript, Vitest.
- Vitest for its lightweight speed
- Next.js's App Router to keep the API key server-side.
- Localstorage was used to store data.

**What I cut:**
- No cloud migration beyond Vercel's default hosting. This was out of scope for a 
  3-hour build and I would have moved to a managed Postgres instance if more time was given.
- No additional guardrails on the brief-generation prompt beyond the verification schema. A user could steer the AI off-task. I 
  judged that closing this properly was out of scope for the time budget.

**AI provider note:** 
After failing to get the starter credit working for myself I emailed the Ventureship team on Tuesday requesting an Anthropic API key 
and followed up Thursday morning with no response. 
Rather than wait on this, I built using Gemini and left the Claude 
implementation commented out to show the integrations are quite similar.

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
- Claude/Gemini integration: 30 min
- UI: 55 min
- Video: 20 min
- README: 15 min
- **Total: 2 hour 50 minutes**

**Running the tests**

```
npm test
```

Runs the Vitest suite, including the schema validation test for a malformed briefs. 
