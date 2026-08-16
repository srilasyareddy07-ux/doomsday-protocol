# Doomsday Protocol

A Doctor Doom–themed companion app for *Avengers: Doomsday* (in theaters December 18, 2026):

- **Checklist** (`/`) — your full watch order, from *Iron Man* through *VisionQuest*, with progress tracking and a shareable status card.
- **Multiverse Explorer** (`/multiverse`) — six spinning 3D "earths" you can drag, zoom, and click into.
- **Death Pool** (`/deathpool`) — predict who survives and who dies, with live crowd percentages.
- **Doom's Interrogation** (`/doom-chat`) — an in-character chat with Doctor Doom, powered by Groq.

No login. Each visitor gets an anonymous ID (a cookie) the first time they load the site, and all their
data — checklist progress, death pool picks, chat history — is stored under that ID.

---

## 1. Get a Groq API key (free)

1. Go to [console.groq.com](https://console.groq.com) and sign up (free).
2. Once logged in, go to **API Keys** in the left sidebar.
3. Click **Create API Key**, name it whatever you like, and copy the key — you'll only see it once.

## 2. Create a Vercel KV (Upstash Redis) database

1. Go to your [Vercel dashboard](https://vercel.com/dashboard) and open (or create) the project for this app.
2. Go to the **Storage** tab.
3. Click **Create Database** → choose **Upstash** → **Redis** (this shows up as "KV" in older Vercel UIs).
4. Give it a name and create it. Connect it to your project when prompted.
5. Once created, go to the database's **.env.local** / **Quickstart** tab and copy:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

(If you just want to try the app locally without setting this up yet, it will still run — it falls
back to in-memory storage automatically, which just doesn't persist between server restarts.)

## 3. Add environment variables in Vercel

In your Vercel project: **Settings → Environment Variables**, add:

| Name | Value |
|---|---|
| `GROQ_API_KEY` | the key from step 1 |
| `KV_REST_API_URL` | from step 2 |
| `KV_REST_API_TOKEN` | from step 2 |

(If you connected the Upstash database to the project in step 2, the `KV_*` variables may already be
added automatically — check before re-adding them.)

For local development, copy `.env.example` to `.env.local` and fill in the same values:

```bash
cp .env.example .env.local
```

## 4. Push this project to a new GitHub repo

```bash
cd doomsday-protocol
git init
git add .
git commit -m "Initial commit"
gh repo create doomsday-protocol --private --source=. --push
```

(No `gh` CLI? Create an empty repo on [github.com/new](https://github.com/new), then:)

```bash
git remote add origin https://github.com/YOUR_USERNAME/doomsday-protocol.git
git branch -M main
git push -u origin main
```

## 5. Import the repo into Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Select the GitHub repo you just pushed.
3. Framework preset should auto-detect as **Next.js** — leave build settings as default.
4. Make sure the environment variables from step 3 are set for this project.
5. Click **Deploy**.

That's it — your Doomsday Protocol site will be live on a `*.vercel.app` URL.

---

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

---

## Project structure

```
app/
  page.tsx                 # Checklist (site root)
  multiverse/page.tsx       # Multiverse Explorer
  deathpool/page.tsx        # Death Pool
  doom-chat/page.tsx        # Doom's Interrogation
  api/
    checklist/route.ts      # GET/POST per-visitor checklist progress
    deathpool/route.ts      # GET/POST picks + shared crowd vote counts
    doom-chat/route.ts      # POST — calls Groq server-side, persists chat history
  globals.css                # Doom theme: colors, typography, "armor plate" panels
  layout.tsx                 # Nav + Doomsday countdown footer wrap every page
components/
  Nav.tsx
  DoomsdayCountdown.tsx      # Release date/time + live countdown, shown on every page
  ProgressMeter.tsx
  ShareCard.tsx
  multiverse/
    Globe.tsx                # react-three-fiber earth / TVA structure + hero pins
    SpaceBackground.tsx      # lightweight CSS starfield/asteroids/rockets
lib/
  kv.ts                      # @vercel/kv wrapper w/ in-memory dev fallback
  visitor.ts                 # reads the anonymous visitor cookie
  data/
    checklist-items.ts
    earths.ts
    characters.ts
middleware.ts                # mints the anonymous visitor-id cookie
public/                      # static assets
```

## Notes

- The Death Pool's post-release **accuracy scoring** UI is intentionally not built yet — the data
  model (each visitor's saved picks) is already in place, so once real outcomes are known you can
  build a small script/route that compares `deathpool:picks:{uuid}` to the actual results and computes
  a score. Flagged as a TODO by design.
- The Groq model used is `llama-3.3-70b-versatile`. Swap it in `app/api/doom-chat/route.ts` if you'd
  prefer a different Groq-hosted model.
