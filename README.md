# 📰 News Summarizer

A modern, responsive news discovery platform engineered to solve News Fatigue and Information Overload. Built with React, Tailwind CSS, and Supabase, this app provides real-time news with AI-generated summaries to help users stay informed without the mental exhaustion of traditional media consumption.

## 🧠 The Problem (Research-Driven)

My research into modern audience engagement revealed a growing crisis in how people consume information. The following pain points served as the foundation for this project:

![](public/4.jpg)

### 1. News Fatigue & Avoidance

![](public/1.jpg)

Audiences are becoming overwhelmed by the sheer volume of news, leading to a "fatigue" that causes them to stop engaging with current events entirely.

### 2. The "2 Million Words" Issue

![](public/3.jpg)

Users expressed frustration with the length of modern articles. The common sentiment is: "I just need to know the main topic, not read 2 million words."

### 3. Lack of Information Standardization

![](public/2.jpg)

Content production is often distorted by advertising models rather than user needs, making it difficult for readers to find structured, unbiased summaries.

---

## 🚀 User Stories & Solutions

### 🎯 Story 1: Instant Information Digest

**As a** busy professional, **I want** a short, straight to the point summary of long news articles so that I can quickly understand the main facts without reading unnecessary details.

- **Solution:** Integrated an AI-powered summarization engine that distills complex reports into digestible bullet points.

### 🎯 Story 2: Reliable Data Access

**As a** user, **I want** a news feed that is always available **so that** I don't encounter "empty states" when external APIs fail.

- **Solution:** Built a custom RSS-to-Database pipeline (ETL) to ensure data ownership and 100% uptime.

### 🎯 Story 3: Verified & Secure Access

**As a** user, **I want** to be certain that my account is secure **so that** my reading usage is private.

- **Solution:** Implemented a strict signup-to-login flow with mandatory Terms of Service (TOS) agreement and password validation.

---

## 🛠️ Technical Challenges & Solutions

### 🏗️ The "Production Data" Pivot (RSS Ingestion)

**Challenge:** During deployment, the third-party News API became unreliable, hitting rate limits and causing feed failures.
**Solution:** I moved from a direct API dependency to a custom **ETL (Extract, Transform, Load)** pipeline.

- **Ingestion:** Fetches raw XML from high-authority RSS feeds.
- **Storage:** Parses and stores data in **Supabase (PostgreSQL)**.
- **UI:** The React app fetches from my own database, ensuring lightning-fast loads and reliability.

### 🔒 Secure Auth Lifecycle

**Challenge:** Supabase automatically logs users in upon signup, bypassing the intended "verification" step.
**Solution:** I implemented an asynchronous `signOut` call immediately following `signUp`. This forces a manual login, ensuring the user confirms their credentials and intentionally agrees to the site's terms.

### 🔄 Migration to TypeScript

**Challenge:** As the codebase grew, JavaScript's lack of type safety led to runtime errors and harder-to-maintain code.
**Solution:** Migrated the entire codebase to TypeScript, adding strict type definitions for components, Redux slices, API responses, and utility functions. This improved developer experience and caught bugs at compile time.

## ✅ Test Coverage & CI/CD

**Challenge:** Manual testing became unsustainable as features increased.
**Solution:** Implemented Jest for unit and integration testing, covering critical flows like authentication, AI summarization, and state management. Set up a CI/CD pipeline to automatically run tests on every commit, ensuring code quality before deployment.

---

## 🏗️ Complete Project Structure

### 🧩 Reusable UI Components (`/components`)

- **Navbar System**: Features **Navbar.tsx**, **DesktopMenu**, **MobileMenu**
- **NewsCard.tsx**: The primary article display component.
- **SummaryCard.tsx**: Dedicated component for viewing saved AI summaries.
- **HeadlineSlider.tsx**: Interactive carousel for featured news stories.
- **Search.tsx**: Optimized search bar with debounced input.
- **Modals**: **LimitModal.tsx** (for usage tracking) and **SummaryModal.tsx** (for AI content).
- **UI Elements**: **Button.tsx**, **Categories.tsx**, **Footer.tsx**, **Spinner.tsx**, **Error.tsx**, and **ThemeToggle.tsx**.
- **Tracking**: **SummaryCount.tsx** to monitor real-time AI usage.

### 📄 Application Pages (`/pages`)

- **NewsFeed.tsx**: The main dashboard displaying the aggregated news.
- **SavedSummary.tsx**: A private library for users to store and manage their AI summaries.
- **Authentication**: **Login.tsx**, **Signup.tsx**, **ForgotPassword.tsx**, and **ResetPassword.tsx**.

### ⚙️ Core Logic & Services

- **State Management**: Redux Toolkit with slices for news, theme, and summaries.
- **Context**: **AuthContext.jsx** (session management)
- **Hooks**: useSummary.ts, useSummaries.ts, useSavedSummary.ts, and useSlide.ts.
- **Services**: openAiServices.ts (openAI integration).
- **Utils/Lib**: rssParser.ts (XML logic) and supabase.ts (Database client).
- **Config**: rssSources.ts (Source management).
- **Testing**: Jest test suites for components, Redux slices, and API services.

## 🏗️ File Map

news-summarizer/
├── public/ # Research images (1.jpg, 2.jpg, 3.jpg, 4.jpg)
├── src/
│ ├── components/ # Reusable UI (NewsCard.tsx, Search.tsx, Navbar)
│ ├── features/ # Redux Toolkit slices
│ │ ├── auth/ # Authentication state
│ │ ├── news/ # News feed state
│ │ └── theme/ # Theme state
│ ├── hooks/ # Custom TypeScript hooks
│ ├── pages/ # App views (NewsFeed.tsx, Signup.tsx, Login.tsx,Home.tsx, ResetPassword.tsx)
│ ├── services/ # API logic (OpenAIServices.ts)
│ ├── utils/ # Helper functions (rssParser.ts)
│ ├── lib/ # Third-party config (supabase.ts)
│ ├── types/ # TypeScript type definitions
│ └── App.tsx # Main routing
├── .github/
│ └── workflows/ # CI/CD pipeline configuration
├── .env # Environment variables
└── README.md # Project documentation

---

## 🔧 Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/news-summarizer.git

```

2. **Install dependencies**

```bash
npm install

```

3. **Set Environment Variables** (`.env`)

```env
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

```

4. **Run Dev Server**

```bash
npm run dev

```

---

## 🏗️ System Architecture

1. **Data Ingestion**: A custom ETL script parses high-authority RSS feeds and populates the Supabase PostgreSQL database.
2. **State Management**: Redux Toolkit manages the global news state, allowing for complex filtering and instant UI updates without redundant API calls.
3. **Secure AI Processing**: To protect API keys, summarization requests are sent to **Supabase Edge Functions**. This Deno-based environment securely communicates with the OpenAI API, keeping secrets server-side.
4. **Rate Limiting**: Custom logic within the Edge Functions tracks user IDs to manage AI token consumption for both anonymous and authenticated users.
5. **Type Safety**: Full TypeScript coverage ensures compile-time error detection and improved developer experience.
6. **Automated Testing**: Jest test suites validate critical functionality, with CI/CD integration ensuring code quality on every commi

## 🎓 Lessons Learned

Building **NewsSummarizer** provided deep insights into full-stack development, specifically regarding data integrity and the ethical use of AI.

### 1. Data Resiliency is Mandatory

Relying on a third-party API for "live" data proved to be a single point of failure. Moving to a custom **ETL (Extract, Transform, Load)** pipeline taught me how to manage data ownership and ensure 100% uptime, even when external services are throttled or down.

## 2. Redux Toolkit for Complex State

Migrating from Context API to Redux Toolkit dramatically improved state management for this app. With global authentication, news feeds, AI usage tracking, and theme preferences all happening simultaneously, Redux's predictable state container and DevTools made debugging and feature development significantly easier.

### 3. The Power of "Research-First" Engineering

Starting with audience research into **News Fatigue** helped me prioritize features. Instead of just building another "News App," I focused on specific problems like "Information Standardization" and "Length Frustration," which led to the creation of the **Open AI** summarization integration.

### 4. UX & Security Balance

Implementing a strict `signUp` to `signOut` flow taught me how to balance "out-of-the-box" library features (like Supabase's auto-login) with my own security requirements to ensure users intentionally agree to Terms of Service and verify their access.

## 5. Automated Testing Saves Time

Implementing Jest tests and CI/CD pipelines initially felt like overhead, but quickly proved invaluable. Catching bugs before deployment and having confidence in refactoring code significantly accelerated development velocity.

## 6. TypeScript's Impact on Code Quality

Converting the entire codebase to TypeScript eliminated an entire class of runtime bugs. Type definitions for Redux actions, API responses, and component props caught errors during development rather than in production, while improving IDE autocomplete and refactoring confidence.

## 🎓 Lessons Learned

- **Data Ownership:** Building my own RSS pipeline proved that data resiliency is more important than convenience.
- **Security Architecture:** Learning to bridge Frontend (React) with Backend logic (Edge Functions) is essential for handling paid APIs like OpenAI.
- **User Psychology:** Designing for "News Fatigue" taught me that sometimes, **less is more**. Features like "Summarize" provide more value than "infinite scrolling."

---

## 💻 Credits & Acknowledgments

- **Frontend Development**: A special thanks to **[@Irene-Munyewu](https://github.com/Irene-Munyewu)
  ** for programming the **Login** and **Signup** pages, translating the design into clean, functional code.

## 🛠️ Tech Stack Used

- **Frontend:** React, Tailwind CSS, Vite, frramer motion
- **State Management:** Redux Toolkit
- **Backend/Database:** Supabase (PostgreSQL)
- **Edge Logic:** Deno (Supabase Edge Functions)
- **AI Engine:** OpenAI (GPT-4o-mini)
- **Deployment:** Vercel
- **Testing:** Jest
- **CI/CD:** GitHub Actions

## 👤 Author

**Chisom Worlu**
_Software Developer focused on building resilient, research-backed solutions._

---
