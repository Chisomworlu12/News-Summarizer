# 📰 NewsSummarizer

A modern, responsive news discovery platform engineered to solve **News Fatigue** and **Information Overload**. Built with React, Tailwind CSS v4, and Supabase, this app aggregates live RSS feeds from 9+ world-class sources and uses AI to distill each article into concise bullet-point summaries — so you stay informed without the mental exhaustion.

**Live demo:** https://news-summarizer-hazel.vercel.app

---

## 🧠 The Problem (Research-Driven)

My research into modern audience engagement revealed a growing crisis in how people consume information. The following pain points served as the foundation for this project:

![Research Overview](public/4.jpg)

### 1. News Fatigue & Avoidance

![News Fatigue](public/1.jpg)

Audiences are becoming overwhelmed by the sheer volume of news, leading to a "fatigue" that causes them to disengage from current events entirely.

### 2. The "2 Million Words" Issue

![Article Length](public/3.jpg)

Users expressed frustration with the length of modern articles. The common sentiment: "I just need to know the main topic, not read 2 million words."

### 3. Lack of Information Standardisation

![Standardisation](public/2.jpg)

Content production is often shaped by advertising models rather than reader needs, making it difficult to find structured, unbiased summaries.

---

## 🚀 User Stories & Solutions

### 🎯 Story 1: Instant Information Digest

**As a** busy professional, **I want** a short, straight-to-the-point summary of long news articles so that I can quickly understand the key facts without reading unnecessary detail.

- **Solution:** Integrated an AI-powered summarisation engine (GPT-4o-mini via Supabase Edge Functions) that distils complex reports into 5–7 bullet points.

### 🎯 Story 2: Reliable Data Access

**As a** user, **I want** a news feed that is always available so that I never hit an empty state when external APIs fail.

- **Solution:** Built a custom RSS-to-Database ETL pipeline — raw XML is fetched, parsed, and stored in Supabase PostgreSQL, so the React app reads from our own database rather than a third-party API.

### 🎯 Story 3: Verified & Secure Access

**As a** user, **I want** to be certain that my account is secure so that my reading history stays private.

- **Solution:** Implemented a full auth lifecycle (email/password + Google OAuth) with mandatory Terms of Service agreement, password validation, email confirmation, and a 2-hour inactivity auto-logout.

---

## 🛠️ Technical Challenges & Solutions

### 🏗️ The "Production Data" Pivot — RSS Ingestion

**Challenge:** During deployment, the third-party News API hit rate limits and caused feed failures.

**Solution:** Moved from a direct API dependency to a custom **ETL pipeline**:

- **Extract:** Fetches raw XML from 9 high-authority RSS feeds via a Supabase Edge Function proxy.
- **Transform:** Parses the XML, cleans HTML tags, and extracts images.
- **Load:** Upserts articles into Supabase (PostgreSQL), preventing duplicates via `onConflict: "url"`.
- **UI:** The React app queries our own database — lightning-fast loads and 100% uptime regardless of upstream availability.

### 🔒 Secure AI Processing

**Challenge:** The OpenAI API key must never be exposed to the client.

**Solution:** All summarisation requests are routed through a **Supabase Edge Function** (Deno runtime). The function verifies the user's JWT, enforces per-user rate limits (2/day anonymous, 10/day authenticated), fetches full article content server-side, and calls the OpenAI API — the key never leaves the server.

### 🔄 Migration to TypeScript

**Challenge:** As the codebase grew, JavaScript's lack of type safety led to runtime errors and harder-to-maintain code.

**Solution:** Migrated the entire codebase to TypeScript with strict mode enabled. Type definitions cover Redux slices, API responses, component props, and custom hooks — catching bugs at compile time and improving IDE autocomplete throughout.

### ✅ Test Coverage & CI/CD

**Challenge:** Manual testing became unsustainable as features grew.

**Solution:** Implemented Jest for unit and integration testing across critical flows (auth, AI summarisation, state management). A GitHub Actions CI/CD pipeline runs the test suite on every commit before deployment.

---

## 🏗️ File Structure

```
src/
├── assets/                  # Static assets
├── components/
│   ├── home/                # Landing page sections (Hero, Features, How, CTA)
│   ├── layout/              # Navbar (Desktop + Mobile), Footer
│   │   └── Navbar/
│   ├── news/                # NewsCard, Categories, HeadlineSlider, Search
│   ├── summary/             # SummaryModal, SummaryCard, SummaryCount, LimitModal
│   └── ui/                  # Button, Spinner, Error, ThemeToggle, ScrollReveal, AmbientBackground
├── context/
│   └── AuthContext.tsx      # Session management, auto-logout, Google OAuth
├── features/
│   ├── news/                # newsSlice — async thunks, category/search state
│   └── theme/               # themeSlice — dark/light with localStorage persistence
├── hooks/
│   ├── useSummary.ts        # Summary modal state, guest limit logic
│   ├── useSummaries.ts      # Fetch & delete saved summaries from Supabase
│   ├── useSavedSummary.ts   # Save/remove individual summaries
│   └── useSlide.ts          # Headline carousel state & touch swipe
├── lib/
│   ├── supabase.ts          # Supabase client (PKCE auth flow)
│   └── rssSources.ts        # RSS feed definitions (9 sources, 5 categories)
├── pages/
│   ├── Home.tsx
│   ├── NewsFeed.tsx
│   ├── SavedSummary.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   ├── ForgotPassword.tsx
│   └── ResetPassword.tsx
├── services/
│   └── openAiServices.ts    # Calls the Supabase Edge Function for summaries
├── store/
│   ├── store.ts             # Redux store (news + theme reducers)
│   └── hooks.ts             # Typed useAppDispatch / useAppSelector
├── types/
│   └── global.d.ts          # Module declarations (CSS, lenis/react)
├── utils/
│   └── rssParser.ts         # fetchAndStoreRSS, getArticles, getTopHeadlines
└── App.tsx                  # BrowserRouter + route definitions
```

---

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/Chisomworlu12/news-summarizer.git
cd news-summarizer
```

2. **Install dependencies**

```bash
npm install
```

3. **Set environment variables** — create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the dev server**

```bash
npm run dev
```

5. **Run tests**

```bash
npm test
```

---

## 🏗️ System Architecture

```
Browser (React + Redux)
       │
       ├── reads articles ──────► Supabase PostgreSQL (articles table)
       │                                    ▲
       │                          Supabase Edge Function: rapid-handler
       │                          (fetches RSS XML, parses, upserts)
       │
       └── summarise request ───► Supabase Edge Function: summarize-article
                                  (rate-limit check → fetch article HTML
                                   → OpenAI GPT-4o-mini → return bullets)
```

1. **Data Ingestion:** The `rapid-handler` Edge Function proxies RSS XML, parses it server-side, and upserts articles into Supabase — bypassing CORS and protecting source URLs.
2. **State Management:** Redux Toolkit manages the global news feed, category filters, search term, and theme — allowing instant UI updates without redundant database calls.
3. **Secure AI Processing:** Summarisation requests go to `summarize-article`, a Deno Edge Function that keeps the OpenAI API key server-side and enforces per-user rate limits via a `rate_limits` table.
4. **Authentication:** Supabase Auth with PKCE flow — supports email/password and Google OAuth, with a 2-hour inactivity auto-logout managed via `setTimeout` in `AuthContext`.
5. **Type Safety:** Full TypeScript with strict mode — types defined for Redux state, API responses, component props, and all custom hooks.

---

## 🎓 Lessons Learned

### 1. Data Resiliency is Mandatory

Relying on a third-party API for live data proved to be a single point of failure. Moving to a custom ETL pipeline taught me how to manage data ownership and ensure 100% uptime even when external services are throttled or down.

### 2. Redux Toolkit for Complex State

With global authentication, news feeds, AI usage tracking, and theme preferences all running simultaneously, Redux's predictable state container and DevTools made debugging significantly easier than a Context-only approach.

### 3. Research-First Engineering

Starting with audience research into News Fatigue helped me prioritise the right features. Instead of building another generic news app, I focused on specific pain points — leading to the summarisation feature as the product's core value proposition.

### 4. UX & Security Balance

Routing AI calls through Edge Functions rather than calling OpenAI directly from the client taught me how to balance developer convenience with real security requirements — keeping paid API keys off the client permanently.

### 5. Automated Testing Saves Time

Implementing Jest tests and CI/CD pipelines initially felt like overhead, but quickly proved invaluable — catching regressions before deployment and giving confidence during large refactors.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS v4, Framer Motion, Lenis |
| State | Redux Toolkit |
| Backend / DB | Supabase (PostgreSQL, Auth, Storage) |
| Edge Logic | Deno (Supabase Edge Functions) |
| AI Engine | OpenAI GPT-4o-mini |
| Deployment | Vercel |
| Testing | Jest, React Testing Library |
| CI/CD | GitHub Actions |

---

## 💻 Credits

- **Frontend Development:** Thanks to **[@Irene-Munyewu](https://github.com/Irene-Munyewu)** for building the Login and Signup pages.

---

## 👤 Author

**Chisom Worlu**
_Software Developer focused on building resilient, research-backed solutions._

[![Portfolio](https://img.shields.io/badge/Portfolio-chisom--portfoilio.vercel.app-8b5cf6)](https://chisom-portfoilio.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Chisomworlu12-181717?logo=github)](https://github.com/Chisomworlu12)
