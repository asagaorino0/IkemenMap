# Staff Introduction Application

A Next.js 15 application with Google Maps integration for displaying staff profiles and store locations.

## Features

- 🗺️ Interactive Google Maps with store markers
- 👥 Staff profile display with sliding panel
- 📋 Staff listings page sorted by posted date
- 🎨 Modern UI with Tailwind CSS and Shadcn UI
- 🗄️ PostgreSQL database with Drizzle ORM

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Maps**: Google Maps (@vis.gl/react-google-maps)

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- PostgreSQL database (configured via DATABASE_URL)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env.local` file with the following:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
DATABASE_URL=your_database_url_here
```

### Google Maps API Key Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**
4. Create credentials (API Key)
5. Copy the API key to your `.env.local` file

### Database Setup

1. Push the database schema:
```bash
npm run db:push
```

2. Seed the database with sample data:
```bash
npx tsx lib/seed.ts
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5000](http://localhost:5000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with map view
│   ├── listings/          # Staff listings page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── map-view.tsx       # Google Maps component
│   ├── staff-panel.tsx    # Sliding staff profile panel
│   └── ui/                # Shadcn UI components
├── lib/                   # Utility functions
│   ├── actions.ts         # Server actions
│   ├── seed.ts            # Database seed script
│   └── utils.ts           # Helper functions
├── server/                # Server-side code
│   └── db.ts              # Database connection
├── shared/                # Shared code
│   └── schema.ts          # Database schema
└── drizzle.config.ts      # Drizzle ORM config
```

## Database Schema

### Stores Table

| Column | Type | Description |
|--------|------|-------------|
| id | serial | Primary key |
| companyName | text | Company name |
| storeName | text | Store name |
| address | text | Store address |
| tel | text | Phone number |
| sns | text | Social media handle |
| staffName | text | Staff member name |
| latitude | double | Store latitude |
| longitude | double | Store longitude |
| postedAt | timestamp | Post date (auto-generated) |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Drizzle Studio

## Pages

### Homepage (/)
- Interactive Google Maps with store markers
- Click markers to view staff profiles in sliding panel
- Button to navigate to staff listings

### Listings Page (/listings)
- Grid view of all staff members
- Sorted by posted date (newest first)
- Shows store details and contact information
- Back button to return to map view

## Contributing

This is a Replit project. Feel free to fork and customize for your needs.

## License

ISC
