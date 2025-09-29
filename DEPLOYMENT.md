# Deployment Guide - Vercel

This guide explains how to deploy the StudyHub platform to Vercel with external studies.

## Overview

The platform is currently configured to run in **demo mode** with external studies hosted on separate platforms. This means:
- ✅ No database required for deployment
- ✅ All studies link to external URLs
- ✅ Anonymous session tracking via browser localStorage
- ✅ Easy to switch to full database mode later

## Prerequisites

- GitHub account
- Vercel account (free tier works great)
- Git repository with your code

## Deployment Steps

### 1. Prepare Your Repository

Ensure all changes are committed and pushed to GitHub:

```bash
git add .
git commit -m "Configure for Vercel deployment with external studies"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the `study-platform` repository

### 3. Configure Project Settings

Vercel should auto-detect Next.js. Verify these settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Install Command**: `npm install`
- **Output Directory**: `.next` (default)
- **Root Directory**: `./` (or the path to your Next.js app)

### 4. Environment Variables (Optional)

For demo mode with external studies, **no environment variables are required**!

However, if you want to add them later for database integration:

| Variable | Value | Required |
|----------|-------|----------|
| `DATABASE_URL` | Your PostgreSQL connection string | No (for demo) |
| `NODE_ENV` | `production` | Auto-set by Vercel |
| `NEXT_PUBLIC_APP_URL` | Your Vercel URL | Optional |

### 5. Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (2-3 minutes)
3. Visit your deployment URL

## Post-Deployment

### Testing Your Deployment

1. **Homepage**: Should show 4 external studies
2. **Study Cards**: Should display "External" badges
3. **Study Details**: Click any study to view details
4. **Launch Study**: After consenting, click "Launch External Study"
5. **External Redirect**: Should open the external study in a new tab

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow Vercel's DNS configuration instructions

## External Studies Configuration

The platform currently links to these external studies:

| Study ID | Title | URL |
|----------|-------|-----|
| 1 | Phase Interface Study | https://phase-interface.web.app/ |
| 2 | Multi-Grid Game Study | https://multi-grid-game-9ytj.vercel.app/ |
| 3 | Player Behavior Research | https://player-app-fbf4c.web.app/ |
| 4 | Human-Robot Interaction Study | https://assisthri.web.app/ |

To modify these studies, edit the mock data in:
- `src/app/page.tsx` (homepage study list)
- `src/app/studies/[studyId]/page.tsx` (study detail pages)

## Upgrading to Full Database Mode

When you're ready to add database support:

### 1. Set Up Database

Choose a PostgreSQL provider:
- **Vercel Postgres** (easiest integration)
- **Supabase** (generous free tier)
- **PlanetScale** (scalable)
- **Railway** (developer-friendly)

### 2. Add Environment Variables

In your Vercel project settings:

```env
DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"
```

### 3. Run Migrations

```bash
# Locally first
npm run db:push

# Or create a migration
npm run db:migrate
```

### 4. Deploy

Vercel will automatically redeploy with database support.

### 5. Mix Internal and External Studies

You can have both:
- Studies with `externalUrl` in settings → External studies
- Studies without `externalUrl` → Internal studies using the question renderer

## Troubleshooting

### Build Fails

**Error**: `Prisma generate failed`

**Solution**: This is expected in demo mode. The build script includes a fallback that allows the build to continue. If the build still fails, ensure `prisma generate || echo 'Warning: Prisma generate failed'` is in your postinstall script.

### 404 on Study Pages

**Solution**: Make sure the study IDs in your URLs match the IDs in the mock data (1, 2, 3, 4).

### External Links Don't Open

**Solution**: Check that the consent checkbox is clicked. The button is disabled until consent is given.

### TypeScript Errors

**Solution**: Run `npm run type-check` locally to catch any type errors before deployment.

## CI/CD

Vercel automatically:
- ✅ Deploys on every push to `main`
- ✅ Creates preview deployments for PRs
- ✅ Runs build checks
- ✅ Provides deployment URLs

## Performance Optimization

The deployment includes:
- Server-side rendering (SSR)
- Automatic code splitting
- Image optimization
- Edge caching
- Gzip compression

## Cost

With the current configuration:
- **Vercel Free Tier**: Perfect for demo/development
- **No database costs**: Using external studies
- **Bandwidth**: Well within free tier limits

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review the [Vercel Next.js documentation](https://vercel.com/docs/frameworks/nextjs)
3. Check this repository's issues

## Next Steps

After deploying:
1. ✅ Test all 4 external study links
2. ✅ Verify mobile responsiveness
3. ✅ Test dark/light theme switching
4. ✅ Share your deployment URL
5. Consider adding database for internal studies
6. Consider adding analytics (Vercel Analytics is free)

---

**Deployment Time**: ~5 minutes
**Maintenance**: Automatic updates via Git push
**Scalability**: Automatically scales with Vercel