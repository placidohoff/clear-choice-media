# Hosting

## Goals
Make this website hosted so that it is accessible on the web. Have it hosted on Render.

## Render setup
This project is a standard Next.js app, so Render can deploy it as a Web Service.

### Recommended Render settings
- Service type: Web Service
- Repository: this GitHub repository
- Root directory: leave empty unless the app is kept in a subfolder
- Runtime: Node
- Node version: 20 or 22
- Build command: `npm install && npm run build`
- Start command: `npm run start -- --hostname 0.0.0.0 --port $PORT`

### Why the start command matters
Render provides a port through the `PORT` environment variable. `next start` alone will not reliably use the value Render expects, so we tell Next to listen on all interfaces and the Render port.

### Deploy steps
1. Push the repo to GitHub.
2. Log in to Render and click New > Web Service.
3. Connect the GitHub repository.
4. Choose the branch to deploy from, usually `master`.
5. Set the build command to `npm install && npm run build`.
6. Set the start command to `npm run start -- --hostname 0.0.0.0 --port $PORT`.
7. Set the Node version to `20`.
8. Click Create Web Service.
9. Wait for the build to finish and watch the logs.

### If the app fails to start
Look for these common issues:
- Port binding error: confirm the start command includes `--port $PORT`
- Node version mismatch: use Node 20+
- Missing build output: make sure `npm run build` succeeds locally before deploying

### Final deployment check
Once Render finishes deployment, open the live URL and verify the homepage loads. If the page is served and the branding appears, the hosting setup is working.