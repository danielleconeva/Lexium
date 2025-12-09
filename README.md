# Lexium – Legal Case Management Portal

Lexium is a **legal case management portal for law firms**, built with **React + TypeScript + Redux Toolkit** on top of the **Firebase ecosystem**  
(**Firebase Authentication**, **Cloud Firestore**, **Firebase Hosting**).

Each law firm operates in its own isolated workspace for **cases, hearings, and tasks**, while optionally publishing **anonymised case summaries** to a public catalogue.

---

## 1. Overview

Lexium is designed as a **firm-centric workspace** rather than a personal to-do app. The core idea:

-   Every firm has a **single shared account** (email + password) for its team.
-   All internal data (**cases, tasks, upcoming hearings**) is scoped by **firm ID**.
-   A dedicated **public area** exposes only what the firm explicitly marks as public, via anonymised case summaries.

From a technical perspective, Lexium demonstrates:

-   **Authentication & access control** with Firebase Authentication and protected routes.
-   **Firm-scoped data modelling** in Cloud Firestore (per-firm scoping).
-   A **card-based UI** using styled-components and lucide-react icons.
-   **Global UX primitives** – centralised notifications and a global loader.

---

## 2. Architecture & Tech Stack

Lexium is implemented as a **single-page application** with a clear separation between UI, state management, and backend integration.

### Frontend

-   **React** (SPA)
-   **TypeScript**
-   **React Router** – public vs. private routes
-   **Redux Toolkit** – `auth`, `cases`, `tasks`, `notifications` slices
-   **styled-components** – component-scoped styling, animations, and layout
-   **lucide-react** – clean, consistent icon set

### Backend / Platform

-   **Firebase Authentication** – firm-level email/password accounts
-   **Cloud Firestore** – persistence for cases, hearings, and tasks
-   **Firebase Hosting** – SPA hosting (no server-side rendering)

State and data flow are encapsulated in custom hooks (`useAuth`, `useCases`, `useTasks`), keeping UI components focused on presentation and interaction.

---

## 3. Core Concepts

Before diving into individual screens, Lexium is organised around three core concepts.

### 3.1 Firm Workspaces & Data Isolation

Each firm has:

-   A **shared login** (firm email + password).
-   A **firm-scoped view** of all cases and tasks.
-   Isolation enforced at the data layer via a `firmId` stored alongside each record.

This makes Lexium suitable for showcasing **multi-firm workspace design** and per-firm isolation.

### 3.2 Private vs Public Areas

Lexium deliberately separates **internal case management** from **public communication**:

-   **Private Area** – dashboards, case CRUD, tasks, and upcoming view.  
    Only accessible to authenticated firms.
-   **Public Area** – a curated set of anonymised case summaries, with safe public details, available without authentication.

Visibility is controlled per case via an explicit `isPublic` flag and public-specific fields (public description, initials).

---

## 4. Authentication & Access Control

The authentication layer is built on Firebase Authentication and integrated with React Router and Redux Toolkit.

-   **Firm registration**
    -   Firm Name, Email, Password.
    -   Creates a firm profile and initialises the firm’s workspace.
-   **Login / Logout**
    -   Email + password sign-in using Firebase Authentication.
    -   Logout clears auth state and returns to the public landing area.
-   **Protected routes**
    -   `/dashboard`, `/cases`, `/cases/:id`, `/cases/:id/edit`, `/case/:id/tasks`, `/upcoming` are **guarded** and require a valid firm session.
    -   `/public-cases` and `/public-cases/:id` remain accessible to unauthenticated visitors.
-   **Global loader & notifications**
    -   A `GlobalLoader` reacts to `auth`, `cases`, and `tasks` loading flags.
    -   A Redux-backed `Notification` component surfaces success/error messages (e.g. “Case created successfully”, “Task updated successfully”).

This structure cleanly separates **authentication concerns** from view logic and provides a professional, predictable UX.

---

## 5. Public Area

The public area demonstrates how firms can **selectively disclose** anonymised case information.

### 5.1 Public Cases Catalogue – `/public-cases`

A **read-only catalogue** of cases that firms have explicitly exposed as public.

**Purpose**

To provide an overview of selected cases without exposing sensitive data, and to demonstrate public querying of firm-owned, filtered data.

**Key behaviours**

The catalogue lists only cases where `isPublic === true`, showing firm name, case reference (number/year), case type, court, status, and the next upcoming hearing date. A search bar allows users to search by case number, and the underlying model can be extended with additional filters (e.g. by type, status, court) without structural changes.

### 5.2 Public Case Details – `/public-cases/:id`

A focused detail view for a single public case.

**Purpose**

To demonstrate **anonymised, public-safe detail pages** derived from the same core data model as internal cases, with controlled exposure.

**Displayed information**

The details page presents general information (firm name, case type and status, court and formation, reference number/year, initiation date), anonymised parties rendered as initials (e.g. “Maria Petrova” → “M. P.”), a short public description tailored for external audiences, and a hearings timeline showing each hearing’s date and time in chronological order.

---

## 6. Private Area (Firm Workspace)

The private area is the **operational centre** of Lexium. All data is automatically filtered by the current firm.

### 6.1 Dashboard – `/dashboard`

The dashboard provides a **high-level operational snapshot**.

**Purpose**

To give the firm a quick view of workload and upcoming responsibilities, and to provide a natural entry point into cases and tasks.

**Main components**

The dashboard combines stat badges (open cases, pending tasks, total cases, task completion rate), a task progress card with a visual completion bar and “X done / Y remaining” summary, a “Recent Cases” list with reference, client name and initiation date plus a “View All” link to `/cases`, and a “Recent Tasks” list that highlights the latest tasks with their associated case, due date, and status.

---

### 6.2 Cases Module – `/cases`, `/cases/new`, `/cases/:id`, `/cases/:id/edit`

The cases module is the **core CRUD area** for the firm.

#### 6.2.1 Cases List – `/cases`

**Purpose**

To act as the firm’s main **case index**, combining at-a-glance information with quick actions.

**Key features**

The list shows all cases for the current firm, including case reference (number/year), type, court, status, next hearing date, and a star indicator for important cases, and provides quick actions to view case details or toggle the star, all within a clean card-based layout with icons and hover feedback.

#### 6.2.2 Create Case – `/cases/new`

Case creation is structured into **semantic cards**, reflecting how lawyers think about case information.

**Purpose**

To streamline case onboarding and keep required fields explicit and enforceable.

**Sections**

The form is split into: Case Identification (case number and year), Case Details (type, court, formation, status), Parties Involved (client name and opposing party), Important Dates (required initiation date and a dynamic list of hearings with date and time that can be added or removed), and Notes & Description (internal notes for the firm and an optional public description used when the case is published).

Once submitted, the case is stored in Firestore with a `firmId`, making it visible only in that firm’s workspace and in the public area if `isPublic` is enabled.

#### 6.2.3 Case Details – `/cases/:id`

The case details page centralises both **core metadata** and **related operational data**.

**Purpose**

To provide a comprehensive view of a case, along with controls for lifecycle management and visibility.

**Main components**

The layout combines an Introduction Card (case reference, status and type badges, visibility badge, star indicator, client name, and actions to edit, archive/reopen, or delete the case), an Information Card (case reference, court, formation, initiation date and internal notes), a Next Hearing Card that highlights the next upcoming hearing or shows a clear “no upcoming hearing” state, and a Related Tasks Card listing the most recent tasks with status pills and due dates plus a “View All” link to the full `/case/:id/tasks` view.

#### 6.2.4 Edit Case – `/cases/:id/edit`

The edit flow reuses the **same card structure** as the create page, with all fields pre-filled.

**Purpose**

To provide a consistent UX and reduce duplication of UI logic while enabling full updates of case metadata, parties, dates, notes, and visibility.

---

### 6.3 Case Tasks – `/case/:id/tasks`

The tasks module focuses on **per-case task management**.

**Purpose**

To track procedural steps, deadlines, and follow-up work linked to a specific case.

**Features**

Tasks are grouped in three status columns (To Do, In Progress, Done), each showing task cards with title, due date, and actions to edit or delete. A dedicated modal is used to create and edit tasks, enforcing required title and due date and allowing the user to switch status via pills, while a shared confirmation modal is used for destructive actions such as task deletion.

---

### 6.4 Upcoming View – `/upcoming`

The upcoming view is a **lightweight agenda** for hearings, avoiding a complex calendar implementation.

**Purpose**

To give the firm a time-ordered overview of upcoming hearings across all cases.

**Key elements**

The agenda groups hearings by date, rendering compact date rows (day number, weekday, month, and a badge with the number of hearings) and, beneath them, hearing cards that summarise case reference, case type, parties (client vs opposing party), court, and time; hearings are derived from each case’s `hearingsChronology` and filtered to future dates only.

---

## 7. UX & UI Highlights

Lexium uses a **consistent, modern UI language**:

-   Card-based layout with soft shadows and rounded corners.
-   Controlled use of gradients for primary actions (e.g. main buttons, key badges).
-   Animated elements:
    -   Entrance animations for dashboards and statistic badges.
    -   Button hover states and subtle transform effects.
-   **Global UX infrastructure**:
    -   Centralised toast notifications via Redux.
    -   Global loader overlay based on combined slice loading states.
    -   Reusable confirmation modal for destructive actions.

This makes Lexium suitable as a **portfolio project** to demonstrate both front-end engineering and product thinking in a legal-tech setting.

---

## Getting Started

Follow these steps to run Lexium locally:

1. Clone the repository

    ```bash
    git clone https://github.com/danielleconeva/Lexium.git
    cd Lexium
    ```

2. Install dependencies

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open the app in your browser

    Go to the URL printed in the terminal (usually http://localhost:5173).
