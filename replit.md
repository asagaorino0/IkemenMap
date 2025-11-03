# Staff Introduction Application

## Project Overview
A Next.js 15 App Router application featuring Google Maps integration for displaying staff profiles and store locations. Built with TypeScript, Tailwind CSS, Shadcn UI, and PostgreSQL database with Drizzle ORM.

## Current State
- ✅ **Next.js 15.5.6** running on port 5000
- ✅ **Database** configured with Drizzle ORM (PostgreSQL via Neon)
- ✅ **Sample Data** seeded (5 stores in Tokyo)
- ✅ **Homepage** with Google Maps integration (requires API key)
- ✅ **Listings Page** displaying staff cards sorted by date
- ✅ **Workflow** configured and running successfully

## Project Architecture

### Tech Stack
- **Framework**: Next.js 15.5.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.x + Shadcn UI
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Maps**: @vis.gl/react-google-maps

### Directory Structure
```
├── app/                    # Next.js App Router
│   ├── page.tsx           # Homepage with map
│   ├── listings/page.tsx  # Staff listings
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── map-view.tsx       # Google Maps wrapper
│   ├── staff-panel.tsx    # Sliding staff panel
│   └── ui/                # Shadcn components
├── lib/                   # Utilities
│   ├── actions.ts         # Server actions
│   ├── seed.ts            # DB seed script
│   └── utils.ts           # Helper functions
├── server/                # Server code
│   └── db.ts              # DB connection
└── shared/                # Shared code
    └── schema.ts          # DB schema
```

### Database Schema
**Table: stores**
- `id` (serial) - Primary key
- `companyName` (text) - Company name
- `storeName` (text) - Store name
- `address` (text) - Full address
- `tel` (text) - Phone number
- `sns` (text) - Social media handle
- `staffName` (text) - Staff member name
- `latitude` (double) - Map latitude
- `longitude` (double) - Map longitude
- `postedAt` (timestamp) - Created date (auto)

## Environment Variables Required

### Current Setup
- ✅ `DATABASE_URL` - PostgreSQL connection (configured)
- ⚠️ `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` - Google Maps API key (needs to be added)

### How to Add Google Maps API Key
1. Create `.env.local` file in project root
2. Add: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here`
3. Get API key from [Google Cloud Console](https://console.cloud.google.com/)
4. Enable Maps JavaScript API for your project

## Key Features

### 1. Interactive Map (/)
- Google Maps with store markers
- Click markers to view staff profiles
- Sliding panel shows detailed information
- "View All Staff" button to listings

### 2. Staff Listings (/listings)
- Grid layout with staff cards
- Sorted by posted date (newest first)
- Contact information display
- Back button to map view

### 3. Database Operations
- **Seed**: `npx tsx lib/seed.ts`
- **Push Schema**: `npm run db:push`
- **Studio**: `npm run db:studio`

## Recent Changes (Latest Session)
- ✅ Fixed Next.js 16 → 15 version mismatch
- ✅ Fixed Tailwind CSS v4 → v3 compatibility
- ✅ Fixed Drizzle ORM query syntax (eq function)
- ✅ Fixed WebSocket bufferutil dependency
- ✅ Added comprehensive README
- ✅ Removed deprecated turbo config warnings
- ✅ All tasks completed and architect-reviewed

## Known Issues & Notes
- Google Maps won't display until API key is configured (expected)
- LSP diagnostics present but non-blocking (type inference for client components)
- Database already seeded with 5 Tokyo stores

## User Preferences
- Preferred coding style: Clean, modern TypeScript with functional components
- UI preferences: Minimalist design with Shadcn UI components
- Database: PostgreSQL with Drizzle ORM over traditional ORMs

## Deployment Checklist
- [ ] Add Google Maps API key to `.env.local`
- [ ] Test map functionality with API key
- [ ] Run `npm run build` to verify production build
- [ ] Configure allowedDevOrigins in next.config.ts if needed
- [ ] Deploy to Replit or other hosting platform

## Commands Reference
```bash
# Development
npm run dev          # Start dev server (port 5000)

# Database
npm run db:push      # Push schema changes
npm run db:studio    # Open Drizzle Studio
npx tsx lib/seed.ts  # Seed database

# Production
npm run build        # Build for production
npm run start        # Start production server
```

## Last Updated
November 3, 2025 - Initial project creation complete
