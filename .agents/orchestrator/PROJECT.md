# Project: Royal Bar Restaurant Homepage Revamp

## Architecture
- Framework: Next.js 15 (using App Router, client/server components)
- Styling: Tailwind CSS, Lucide icons, Framer Motion
- Interactive Components: Atropos for 3D hover effects, Lottie-React for animations
- Data Flow:
  - Homepage collections section loads restaurant category tiles dynamically.
  - Image rotation cycles through pre-defined Unsplash URLs.
  - Story section displays Lottie animation fetched client-side.

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | Exploration & Selection | Identify appropriate restaurant Lottie animation in `public/lottie` and verify initial project build | none | DONE |
| 2 | Collections Redesign | Rebuild `components/home/Collections.tsx` with a dense, interconnected mosaic grid using Atropos | M1 | DONE |
| 3 | Dynamic Image Rotation | Implement a 7-second background image rotation timer for Atropos tiles in `Collections.tsx` | M2 | DONE |
| 4 | Story Animation Update | Replace the Lottie file and remove layout comments in `components/home/Story.tsx` | M1 | DONE |
| 5 | Build Verification | Run complete build and check for type safety, linting, and structural errors | M3, M4 | DONE |
| 6 | Git Commit & Push | Commit modifications and push changes to remote GitHub repository | M5 | DONE |

## Code Layout
- Homepage entry point: `app/page.tsx`
- Collections component: `components/home/Collections.tsx`
- Story component: `components/home/Story.tsx`
- Lottie animations: `public/lottie/`, `public/lottie-story.json`
- Next.js configuration: `next.config.mjs`
- Tailwind configuration: `tailwind.config.ts`

## Interface Contracts
### `components/home/Collections.tsx`
- Dynamic image loading list.
- Component state: active image indices for each grid tile.
- Timer: 7-second auto-rotate interval, running in `useEffect`.

### `components/home/Story.tsx`
- Fetch the chosen Lottie animation json file and set it in component state.
