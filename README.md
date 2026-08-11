# 🏠 RentNest — Frontend

> **Find Your Perfect Home Without the Stress**
>
> RentNest is a modern, full-featured house rental platform built for Bangladesh. Tenants discover and book verified properties; landlords manage listings and track earnings; admins oversee the entire platform — all in one beautifully crafted web application.

---

## 📋 Table of Contents

- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)
- [Pages & Routes](#-pages--routes)
- [User Roles](#-user-roles)
- [API Overview](#-api-overview)
- [Authentication Flow](#-authentication-flow)
- [Scripts](#-scripts)

---

## 🌐 Live Demo

| Resource | URL |
|---|---|
| Frontend | _Deploy URL here_ |
| Backend API | `http://localhost:5000` |

---

## ✨ Features

### 🔍 Property Discovery
- Browse all verified rental properties across Bangladesh
- Keyword search — matches title, location, and description
- Filter by category, city, price range, bedrooms, bathrooms, and availability
- Grid / List view toggle
- Client-side pagination (12 per page)
- Featured property badges, availability status, ratings

### 🏡 Property Details
- Full image gallery
- Detailed overview table (year built, lease term, pet policy, parking)
- Landlord profile card with superhost & verified badges
- Similar properties section
- Instant rental request booking sidebar

### 📅 Booking & Rental Requests
- Tenants submit rental requests with a preferred move-in date
- Landlords review, approve, or reject incoming requests
- Status lifecycle: `PENDING → APPROVED → COMPLETED / REJECTED`

### 💳 Stripe Payments
- Tenants pay for approved rentals via Stripe Checkout
- Payment receipt view with full transaction details
- Complete payment history per tenant

### ⭐ Reviews & Ratings
- Tenants submit star ratings and comments post-rental
- Edit and delete your own reviews
- Landlords view all reviews left on their properties
- Aggregated ratings shown on property cards and detail pages

### 🔐 Authentication
- JWT-based cookie sessions (`accessToken` + `refreshToken`)
- Role selection at registration — Tenant or Landlord
- Auto-login immediately after registration
- Secure `httpOnly` cookie storage
- Password change from profile/settings

### 👤 Profile Management
- Update avatar, phone, bio, gender, date of birth, occupation
- Update address fields (city, state, country, zip)
- Update social links (website, GitHub, LinkedIn, Facebook)

### 🌙 Dark / Light Mode
- System-aware theme with manual toggle
- Full dark mode support across all pages and dashboard

### 🔔 Notifications
- Notification dropdown in the top navbar
- Notification widget in the tenant dashboard

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16.2.6](https://nextjs.org/) (App Router) |
| **Language** | TypeScript 5 |
| **Runtime** | React 19 |
| **Styling** | Tailwind CSS v4 |
| **UI Components** | shadcn/ui, @base-ui/react |
| **Animations** | Framer Motion |
| **Icons** | Lucide React, React Icons |
| **Forms** | React Hook Form + Zod |
| **Data Fetching (client)** | TanStack React Query v5 |
| **Data Fetching (server)** | Next.js Server Actions + native `fetch` |
| **Tables** | TanStack React Table v8 |
| **Auth** | JWT + httpOnly cookies |
| **Toasts** | Sonner |
| **Theme** | next-themes |

---

## 🚀 Getting Started

### Prerequisites

- Node.js `>= 20`
- npm or yarn or pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/rentnest-frontend.git
cd rentnest-frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Fill in the values (see Environment Variables section)

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```env
# Backend API base URL (server-side — used in Server Actions)
BACKEND_API_URL=http://localhost:5000

# Backend API base URL (client-side — used in React components)
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000

# JWT secrets (must match the backend)
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key

# JWT expiration
JWT_ACCESS_EXPIRATION=1d
JWT_REFRESH_EXPIRATION=7d
```

> ⚠️ Never commit real secrets to version control. The `.env` file is listed in `.gitignore`.

---

## 📁 Project Structure

```
rentnest-frontend/
├── app/
│   ├── (authRoute)/                   # Login & Register
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── _actions/authActions.ts    # Login, Register, Logout server actions
│   │   └── _components/              # LoginForm, RegistrationForm
│   │
│   ├── (publicRoute)/                 # Public-facing pages
│   │   ├── page.tsx                   # Home page
│   │   ├── about/
│   │   ├── contact/
│   │   ├── profile/
│   │   ├── settings/
│   │   └── properties/
│   │       ├── page.tsx               # Property listing
│   │       ├── [id]/page.tsx          # Property detail
│   │       ├── _actions/              # property.action.ts, rental-request.actions.ts
│   │       └── _components/           # PropertyListing component
│   │
│   └── (dashboardRoute)/
│       └── dashboard/
│           ├── admin/                 # Admin panel (users, properties, rentals, payments)
│           ├── landlord/              # Landlord portal (listings, bookings, reviews, earnings)
│           └── tenant/                # Tenant portal (requests, payments, reviews)
│
├── components/
│   ├── hero/                          # Hero section components
│   ├── home/                          # Home page sections
│   ├── properties/                    # Property listing components
│   ├── property-details/              # Property detail components
│   ├── property-form/                 # Landlord property create/edit form
│   ├── reviews/                       # Review modals and display
│   ├── dashboard/                     # Dashboard-specific components
│   ├── shared/                        # Navbar, Footer
│   ├── providers/                     # QueryProvider, ThemeProvider
│   └── ui/                            # shadcn/ui primitives
│
├── service/                           # Reusable server-side service functions
│   ├── getCurrentUser.ts
│   ├── updateProfile.ts
│   ├── changePassword.ts
│   ├── review.service.ts
│   └── city.service.ts
│
├── lib/
│   ├── types/                         # TypeScript interfaces (User, etc.)
│   ├── validations/                   # Zod schemas (login, register)
│   └── utils.ts                       # cn() utility
│
├── types/
│   └── property.ts                    # Property, Landlord, SearchState, CATEGORIES, CITIES
│
├── hooks/                             # Custom React hooks (useCities, etc.)
├── public/                            # Static assets
├── app/globals.css                    # Global styles + design tokens
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## 📄 Pages & Routes

### Public Pages

| Route | Page |
|---|---|
| `/` | Home — Hero, Featured Properties, Browse by City, How It Works |
| `/properties` | Property listing with search and pagination |
| `/properties/:id` | Full property detail with booking sidebar |
| `/about` | About RentNest |
| `/contact` | Contact form |
| `/profile` | User profile view |
| `/settings` | Account settings |

### Auth Pages

| Route | Page |
|---|---|
| `/auth/login` | Email + password login |
| `/auth/register` | Name, email, password, phone, role selection |

### Admin Dashboard

| Route | Page |
|---|---|
| `/dashboard/admin` | Stats overview — total users, properties, rentals, payments |
| `/dashboard/admin/users` | User table with status management (Active / Inactive / Banned) |
| `/dashboard/admin/properties` | All platform property listings |
| `/dashboard/admin/rentals` | All rental requests with tenant & property info |
| `/dashboard/admin/payments` | Platform-wide payments |
| `/dashboard/admin/settings` | Admin account settings |

### Landlord Dashboard

| Route | Page |
|---|---|
| `/dashboard/landlord` | Overview with earnings, booking counts |
| `/dashboard/landlord/properties` | My property listings |
| `/dashboard/landlord/properties/new` | Create a new property |
| `/dashboard/landlord/properties/:id` | Edit an existing property |
| `/dashboard/landlord/bookings` | Incoming booking requests |
| `/dashboard/landlord/requests` | All rental requests |
| `/dashboard/landlord/approved` | Approved rentals |
| `/dashboard/landlord/payments` | Rental earnings |
| `/dashboard/landlord/reviews` | Tenant reviews on my properties |

### Tenant Dashboard

| Route | Page |
|---|---|
| `/dashboard/tenant` | Overview — active booking, countdown, quick actions |
| `/dashboard/tenant/bookings` | My booking history |
| `/dashboard/tenant/requests` | My rental requests with status |
| `/dashboard/tenant/requests/:id/pay` | Stripe payment page for approved request |
| `/dashboard/tenant/payments` | Full payment history |
| `/dashboard/tenant/payments/:id` | Payment receipt detail |
| `/dashboard/tenant/reviews` | My submitted reviews (edit/delete) |

---

## 👥 User Roles

| Role | Access |
|---|---|
| **TENANT** | Browse properties, submit rental requests, make payments, write reviews, manage profile |
| **LANDLORD** | Create and manage property listings, approve/reject booking requests, view earnings and reviews |
| **ADMIN** | Full platform access — manage users, properties, rentals, and view all payments |

---

## 🔌 API Overview

All API calls target `http://localhost:5000`.

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login and receive JWT tokens |
| `GET` | `/api/auth/me` | Get current logged-in user |
| `PATCH` | `/api/auth/me` | Update user profile |
| `POST` | `/api/auth/change-password` | Change password |
| `POST` | `/api/auth/refresh-token` | Refresh access token |

### Properties
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/properties` | List all properties (paginated) |
| `GET` | `/api/properties/:id` | Get a single property by ID |

### Rentals
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/rentals` | Create rental request (tenant) |
| `GET` | `/api/rentals` | Get my rental requests (tenant) |

### Payments
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/payments/create` | Create Stripe Checkout session |
| `GET` | `/api/payments` | Get my payment history |
| `GET` | `/api/payments/:id` | Get payment details |

### Reviews
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reviews` | Submit a review |
| `GET` | `/api/reviews` | Get property reviews |
| `GET` | `/api/reviews/me` | Get my submitted reviews |
| `PATCH` | `/api/reviews/:id` | Edit a review |
| `DELETE` | `/api/reviews/:id` | Delete a review |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/users` | List all users |
| `PATCH` | `/api/admin/users/:id` | Update user status |
| `GET` | `/api/admin/properties` | List all properties |
| `GET` | `/api/admin/rentals` | List all rental requests |

---

## 🔐 Authentication Flow

```
Register ──► POST /api/auth/register
                    │
                    ▼
         Set httpOnly cookies
         accessToken  (expires: 1 day)
         refreshToken (expires: 7 days)
                    │
                    ▼
         Redirect to dashboard

Login ──► POST /api/auth/login
                    │
                    ▼
         Set httpOnly cookies (same as above)
                    │
                    ▼
         Redirect to dashboard

Every request ──► Server Action reads `accessToken`
                  from cookies() via next/headers
                  Sends as: Authorization: Bearer <token>
                            Cookie: accessToken=<token>

Logout ──► Delete both cookies ──► Redirect to /auth/login
```

---

## 📜 Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Format code with Prettier
npm run format

# Type check without emitting files
npm run typecheck
```

---

## 🎨 Design System

The design system is defined in `app/globals.css` using CSS custom properties:

| Token | Light | Dark |
|---|---|---|
| `--primary` | `#2563eb` (Blue 600) | `#2563eb` |
| `--secondary` | `#0ea5e9` (Sky 500) | `#0ea5e9` |
| `--background` | `#f8fafc` | `#020617` |
| `--card` | `#ffffff` | `#111827` |
| Brand accent | `#14b8a6` (Teal 500) | `#14b8a6` |

Utility classes: `.glass-card`, `.shadow-luxury`, `.shadow-glow`, `.gradient-brand`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📝 License

This project is for academic/assignment purposes.

---

<div align="center">
  <strong>Built with ❤️ for RentNest</strong><br/>
  Next.js · TypeScript · Tailwind CSS · shadcn/ui · Framer Motion
</div>
