# StudyHub - Research Study Platform

A modern, anonymous research study platform for conducting user research. Built with Next.js, TypeScript, and PostgreSQL.

## Features

- 🧪 **Flexible Study System** - Support for multiple question types (text, multiple choice, rating scales, etc.)
- 🔓 **Anonymous Participation** - No authentication required - participants can join studies instantly
- 📊 **Progress Tracking** - Real-time progress indicators and auto-save functionality
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎯 **Privacy-First** - Completely anonymous responses with GDPR-compliant data handling
- ⚡ **Modern Tech Stack** - Next.js 15, TypeScript, Tailwind CSS, Prisma

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS + Shadcn/ui
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation
- **Session Management**: Browser-based anonymous sessions

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd study-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/studyplatform"
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push database schema
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Development

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Create and run migrations
- `npm run db:seed` - Seed database with sample data
- `npm run db:studio` - Open Prisma Studio

### Project Structure

```
src/
├── app/                     # Next.js App Router pages
│   ├── page.tsx            # Main landing/study listing page
│   ├── studies/            # Study-related pages
│   │   └── [studyId]/      # Dynamic study routes
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── ui/                 # Shadcn/ui components
│   ├── layout/             # Layout components (navbar, providers)
│   └── study/              # Study-specific components
├── lib/                    # Utility libraries
│   ├── anonymous-session.ts # Anonymous session management
│   ├── db.ts               # Prisma client
│   └── utils.ts            # Helper utilities
├── types/                  # TypeScript type definitions
├── hooks/                  # Custom React hooks
└── stores/                 # Zustand stores
```

## Database Schema

The application uses a flexible JSON-based content system that supports various study formats:

- **Users** - Optional user table (kept for future extension, but not required for participation)
- **Studies** - Research studies with flexible JSON content
- **StudyResponses** - Individual question responses (anonymous - no user required)
- **StudySessions** - Anonymous session tracking and progress

## Study Content Format

Studies use a flexible JSON schema that supports:

- Multiple sections and questions
- Various question types (text, multiple choice, rating scales, etc.)
- Conditional logic and validation
- Media content (images, videos)
- Custom settings (time limits, progress tracking)

Example:
```typescript
{
  version: "1.0",
  title: "User Experience Survey",
  sections: [
    {
      id: "demographics",
      title: "About You",
      questions: [
        {
          id: "age",
          type: "number",
          title: "What is your age?",
          required: true,
          config: { min: 18, max: 100 }
        }
      ]
    }
  ]
}
```

## Anonymous Participation

The platform is designed for completely anonymous participation:

- **No Login Required** - Users can participate in any study without creating an account
- **Browser-Based Sessions** - Anonymous sessions are tracked using browser fingerprinting and localStorage
- **Privacy-First** - No personally identifiable information is collected
- **Session Management** - Progress is auto-saved locally and can be resumed
- **Participation Tracking** - localStorage prevents duplicate participation in the same study

## Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Set up database** (Supabase, PlanetScale, or other PostgreSQL provider)
4. **Deploy** - Vercel will automatically build and deploy

### Docker

1. **Build the container**
   ```bash
   docker build -t study-platform .
   ```

2. **Run with environment variables**
   ```bash
   docker run -p 3000:3000 --env-file .env.local study-platform
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions and support:
- Open an issue on GitHub
- Check the documentation
- Review the code examples in the repository
