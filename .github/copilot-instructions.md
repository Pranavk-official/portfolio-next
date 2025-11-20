# Copilot Instructions for Portfolio Project

## Project Overview
Next.js 15 + React 19 portfolio site featuring animated UI components, blog functionality, and section-based architecture. Uses TypeScript, Tailwind CSS 4, and custom animated components from Magic UI design system.

## Architecture

### Section-Based Structure
All major page sections live in `src/sections/` with dedicated config folders:
- Each section exports a default component (e.g., `HeroSection.tsx`)
- Config data lives in `config/` subdirectories (e.g., `projects/config/projects.ts`)
- Sections are composed in `src/sections/index.tsx` and imported to `src/app/page.tsx`
- Use `"use client"` directive for sections with interactivity/animations

Example section pattern:
```tsx
// src/sections/hero/HeroSection.tsx
"use client";
const HeroSection = () => { /* ... */ }
export default HeroSection;

// src/sections/index.tsx
import Hero from "@sections/hero/HeroSection";
export { Hero, Services, Skill, Project, Footer };
```

### Path Aliases (tsconfig.json)
- `@/` - Root directory
- `@app/*` - `src/app/*`
- `@components/*` - `components/*`
- `@sections/*` - `src/sections/*`
- `@lib/*` - `lib/*`
- `@config/*` - `src/config/*`
- `@public/*` - `public/*`

Always use these aliases instead of relative imports.

## UI Component Patterns

### Magic UI Components
Custom animated components in `components/ui/` integrate with shadcn/ui registry (`@magicui`). Key patterns:
- **Animation components**: `BlurFade`, `HyperText`, `TextAnimate`, `AuroraText`
- **Interactive components**: `NeonGradientCard`, `AnimatedThemeToggler`, `Dock`, `IconCloud`
- All use Framer Motion (`motion/react`) for animations
- Props include `delay`, `duration`, `className`, `startOnView`, `animateOnHover`

Example usage:
```tsx
import { HyperText } from "@components/ui/hyper-text";
<HyperText className="text-2xl">{quote.content}</HyperText>
```

### Shared Components
Reusable components in `components/shared/` and `components/[section]/` are section-specific:
- `NavDock` - Global navigation dock
- `ProfileCard`, `Quote` - Hero section components
- `ProjectCard` - Projects section component

### Styling Conventions
- Tailwind CSS 4 with `@tailwindcss/postcss`
- Custom CSS variables in `src/app/globals.css` using `oklch()` color space
- Dark mode: `:root.dark` class toggle via custom theme toggler
- Use `cn()` utility from `@/lib/utils` to merge Tailwind classes

## Content Management

### Blog System
Markdown-based blog using gray-matter + remark:
- Posts in `_posts/*.md` with YAML frontmatter
- Frontmatter fields: `title`, `excerpt`, `coverImage`, `date`, `author`, `ogImage`
- `lib/blog-api.ts` provides `getPostBySlug()`, `getAllPosts()`
- Blog routes in `src/app/blog/` (currently showing "Coming Soon" page)
- Blog test components in `src/app/blog-test/_components/`

### Project Data
Projects array in `src/sections/projects/config/projects.ts`:
```typescript
export interface Project {
  id: string;
  title: string;
  year: string;
  shortDescription: string;
  technologies: string[];
  category: 'web-app' | 'mobile' | 'tool' | 'community';
  // ...
}
```

### Site Configuration
Global metadata in `config/site.ts` (and duplicated in `src/config/site.ts`):
- Personal info, social links, SEO metadata
- Referenced in `src/app/layout.tsx` for Next.js metadata API

## Development Workflows

### Commands
```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Theme System
Custom animated theme toggle with View Transitions API:
- Manual localStorage-based persistence
- Inline script in layout.tsx prevents flash of unstyled content (FOUC)
- Component: `components/ui/animated-theme-toggler.tsx`
- Fixed top-right position in layout

### Animation Strategy
- Wrap sections with `BlurFade` for scroll-triggered animations (see `src/sections/index.tsx`)
- Use `delay` prop (e.g., `delay={0.25 * 3}`) for staggered reveals
- `inView` and `direction="up"` for scroll-based triggers

## Key Conventions

1. **Client vs Server Components**: Mark interactive/animated components with `"use client"`, especially sections
2. **Config Separation**: Keep data in `config/` folders separate from component logic
3. **Type Safety**: Define interfaces in dedicated files (e.g., `src/interfaces/post.ts`)
4. **Image Handling**: Remote images configured in `next.config.ts` for `images.unsplash.com` and `ui-avatars.com`
5. **Responsive Design**: Mobile-first with `md:`, `lg:`, `2xl:` breakpoints
6. **TODOs in Code**: Projects section disabled in `page.tsx` pending rework

## Current Work Items
- Blog system implementation (placeholder page exists)
- Work experience timeline feature (TODO in `page.tsx`)
- Projects section refinement (currently commented out)

## Adding New Features

### New Section
1. Create `src/sections/[name]/[Name]Section.tsx` with `"use client"`
2. Add config data to `src/sections/[name]/config/`
3. Export from `src/sections/index.tsx`
4. Import in `src/app/page.tsx`
5. Wrap with `BlurFade` for animations

### New Animated Component
1. Create in `components/ui/` following existing patterns
2. Use `motion` from `motion/react` (not `framer-motion`)
3. Include `className` prop with `cn()` utility
4. Add TypeScript interface extending React component props

### Blog Post
Create `.md` file in `_posts/` with frontmatter:
```yaml
---
title: "Post Title"
excerpt: "Brief description"
coverImage: "https://..."
date: "2024-11-15T05:35:07.322Z"
author:
  name: "Author Name"
  picture: "https://..."
ogImage:
  url: "https://..."
---
```
