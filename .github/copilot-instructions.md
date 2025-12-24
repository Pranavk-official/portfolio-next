# Copilot Instructions for Portfolio Project

## Project Overview

Next.js 16 + React 19 portfolio site featuring animated UI components, Notion-powered blog, and section-based architecture. Uses TypeScript, Tailwind CSS 4, Motion (formerly Framer Motion), and animated components from Magic UI + shadcn/ui registries.

## Architecture

### Section-Based Structure

Sections compose the homepage (`src/app/page.tsx`) and are wrapped with `BlurFade` animations:

```tsx
// src/sections/index.tsx - All sections wrapped with BlurFade for scroll animations
import Hero from "@sections/hero/HeroSection";
const Experience = () => (
  <BlurFade delay={0.25 * 2} inView direction="up">
    <ExperienceSection />
  </BlurFade>
);
export { Hero, Services, Skill, Experience, Footer };

// src/app/page.tsx - Sections commented out are pending rework
import { Hero, Services, Skill, Experience, Footer } from "@sections/index";
```

**Section Structure**:

- Each section: `src/sections/[name]/[Name]Section.tsx` with `"use client"` directive
- Config data: `src/sections/[name]/config/` (e.g., `workExperience.ts`, `serviceItems.tsx`)
- Validation utils: Experience section has `utils/validation.ts` for data validation with dev warnings

### Path Aliases (tsconfig.json)

```
@/            → Root directory
@app/*        → src/app/*
@components/* → components/*
@sections/*   → src/sections/*
@lib/*        → lib/*
@config/*     → src/config/*
@public/*     → public/*
```

**Critical**: Always use path aliases. The build uses Turbopack and requires these for proper resolution.

## UI Component System

### Registry Architecture

`components.json` defines three external registries:

- `@magicui` → https://magicui.design/r/{name}.json (animated components)
- `@react-bits` → https://reactbits.dev/r/{name}.json
- `@uilayouts` → https://www.ui-layouts.com/r/{name}.json

Use `shadcn` CLI to add components: `bun run shadcn add @magicui/blur-fade`

### Magic UI Animation Patterns

All animations use `motion` from `motion/react` (NOT `framer-motion`):

```tsx
// Staggered scroll animations
<BlurFade delay={0.25 * index} inView direction="up">
  <TimelineItem experience={experience} />
</BlurFade>
```

**Key Components**:

- `BlurFade` - Scroll-triggered reveal (used extensively in sections)
- `HyperText`, `TextAnimate`, `AuroraText` - Text animations
- `MagicCard`, `NeonGradientCard` - Interactive cards
- `DotPattern`, `GridPattern` - Background patterns

## Content Management

### Notion Blog Integration

Blog powered by Notion API (`lib/notion.ts`), NOT markdown files:

```typescript
// lib/notion.ts exports
getAllPublished() → PostMetadata[]  // All published posts
getFilteredPosts(page, search, tag) → FilteredPostsResult  // Paginated/filtered
getPost(slug) → Post  // Single post with markdown content
getAllTags() → string[]  // Unique tags
```

**Environment Variables** (Required for blog):

```env
NOTION_TOKEN=secret_xxx
NOTION_DATA_SOURCE_ID=database_id_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # or production URL
```

**Fallback Behavior**: When Notion credentials missing, `generateStaticParams` returns empty array and logs "Notion credentials not available, skipping static generation"

### Blog Routes

- `/blog` - List view with search, tag filtering, pagination (`src/app/blog/page.tsx`)
- `/blog/[slug]` - Post detail with markdown rendering via `notion-to-md`
- Blog uses ISR: `export const revalidate = 60` (60s cache)

### Site Configuration

Duplicate configs exist: `config/site.ts` AND `src/config/site.ts` (keep in sync!)

- Personal info, social links, SEO metadata
- Used in `layout.tsx` for Next.js metadata API

## Styling System

### Tailwind CSS 4 Setup

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css"; /* Animation utilities */
@import "highlight.js/styles/github-dark.css"; /* Code syntax */

@custom-variant dark (&:is(.dark *)); /* Dark mode variant */
```

**Color System**: `oklch()` color space for perceptual uniformity

```css
:root {
  --background: oklch(1 0 0);
}
:root.dark {
  --background: oklch(0.141 0.005 285.823);
}
```

**Blog Design System**: Additional fonts in layout.tsx

- `Crimson_Pro` - Blog headings (`--font-crimson-pro`)
- `JetBrains_Mono` - Code blocks (`--font-jetbrains-mono`)
- `Outfit` - UI elements (`--font-outfit`)

### Theme Toggle Implementation

Custom animated theme toggle uses View Transitions API:

```tsx
// components/ui/animated-theme-toggler.tsx
- Manual localStorage theme persistence (no next-themes dependency confusion)
- View Transitions API for smooth theme switch
- Inline script in layout.tsx prevents FOUC: checks localStorage before hydration
```

## Development Workflows

### Build Commands

```bash
bun run dev    # Dev server with Turbopack (port 3000)
bun run build  # NODE_OPTIONS=--max-old-space-size=8192 (memory-intensive)
bun run start  # Production server
bun run lint   # ESLint
```

**Build Notes**:

- Turbopack compiles in ~10-15s
- Static generation requires Notion credentials
- Memory allocation increased due to Three.js dependencies (`@react-three/*`)

### Debugging Failed Imports

Terminal error shows dev server looking for missing `@/lib/blog-api` (doesn't exist - blog uses `@/lib/notion` instead). Check imports in layout.tsx if compilation fails.

## Key Patterns & Conventions

### 1. Client vs Server Components

- **Client**: All sections, animated components, interactive elements (theme toggle, navigation)
- **Server**: Blog list/detail pages (ISR), layout metadata generation
- Rule: `"use client"` required for `motion` components and React hooks

### 2. Data Validation Pattern

Experience section validates config at runtime (see `src/sections/experience/utils/validation.ts`):

```tsx
const validExperiences = useMemo(() => {
  const validated = validateWorkExperiences(workExperiences);
  if (
    process.env.NODE_ENV === "development" &&
    validated.length !== workExperiences.length
  ) {
    console.warn(
      `${workExperiences.length - validated.length} invalid entries filtered`
    );
  }
  return validated;
}, []);
```

### 3. Image Handling

Remote images configured in `next.config.ts`:

```typescript
remotePatterns: [
  { protocol: "https", hostname: "images.unsplash.com" },
  { protocol: "https", hostname: "ui-avatars.com" },
];
```

### 4. Seasonal Features

Layout conditionally renders `<Snow />` component based on date helpers:

```tsx
import { isChristmasSeason } from "@/lib/utils/dateHelpers";
{
  isChristmasSeason() && <Snow />;
}
```

### 5. Announcement Bar

`AnnouncementBar` component fetches latest blog post count for dynamic messaging:

```tsx
const posts = await getAllPublished();
// Displays different messages based on post count
```

## Adding New Features

### New Section with Animation

1. Create `src/sections/[name]/[Name]Section.tsx`:

```tsx
"use client";
export default function NewSection() {
  return <div className="py-10 min-h-screen">...</div>;
}
```

2. Add to `src/sections/index.tsx`:

```tsx
import NewSection from "@sections/new/NewSection";
const New = () => (
  <BlurFade delay={0.25 * 4} inView direction="up">
    <NewSection />
  </BlurFade>
);
export { Hero, Services, Skill, Experience, New, Footer };
```

3. Import in `src/app/page.tsx` and add to render

### New Animated Component

```tsx
"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export const NewComponent = ({ className, delay = 0, ...props }: Props) => {
  return <motion.div className={cn("...", className)} initial={{...}} animate={{...}} {...props} />;
};
```

### Notion Blog Post Properties

Required Notion database properties (case-sensitive):

- `Title` or `title` (title)
- `Slug` (rich_text)
- `Published` (checkbox)
- `Date` (date)
- `Tags` (multi_select)
- `Description` (rich_text)
