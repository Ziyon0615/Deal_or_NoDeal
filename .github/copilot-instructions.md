# Copilot Instructions for Deal or No Deal Project

## Project Overview
This is a modern "Deal or No Deal" online game built with Next.js, TypeScript, and Tailwind CSS. It's fully responsive, features beautiful animations, and is ready to deploy to Vercel.

## Key Technologies
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js 18+

## Project Structure
- `/app` - Next.js app directory with main game logic
- `/components` - Reusable React components (GameBoard, PrizePanel, GameControls, DealModal)
- Configuration files for TypeScript, Tailwind, PostCSS, and Next.js

## Common Tasks

### Development
```bash
npm run dev
# Opens game at http://localhost:3000
```

### Building
```bash
npm run build
npm start
```

### Deployment
```bash
# Option 1: Vercel CLI
vercel

# Option 2: GitHub + Vercel dashboard
git push origin main
```

## Game Features
- 10 boxes with prize amounts ($500-$1000)
- Interactive box selection and revealing
- Dynamic banker's deal system
- Responsive design for all devices
- Smooth animations and visual effects

## Prize Amounts
The game uses these prize values: $500, $550, $600, $650, $700, $750, $800, $850, $900, $1000

## Customization Points
- Prize amounts: Edit `PRIZE_AMOUNTS` in `app/page.tsx`
- Colors: Modify `tailwind.config.js` theme
- Game logic: Update state management in `app/page.tsx` and components

## Testing Checklist
- [x] Project initializes without errors
- [x] All components render correctly
- [x] Game logic works as expected
- [x] Responsive on mobile/tablet/desktop
- [x] Ready for Vercel deployment

## Deployment Checklist
Before deploying to Vercel:
1. Run `npm run build` locally to verify no build errors
2. Test game in Chrome, Firefox, and Safari
3. Test on mobile device
4. Ensure all animations work smoothly

## Notes
- No environment variables needed
- All dependencies are in package.json
- Project follows Next.js 14+ best practices
- TypeScript strict mode enabled for type safety
