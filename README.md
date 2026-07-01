# Deal or No Deal - Online Game

A modern, interactive "Deal or No Deal" game built with Next.js, TypeScript, and Tailwind CSS. Perfect for entertainment with stunning visual effects and smooth gameplay.

## Features

✨ **Modern UI/UX**
- Beautiful gradient design with glassmorphism effects
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Dark theme optimized for gaming experience

🎮 **Engaging Gameplay**
- 10 boxes with prize amounts: $500 - $1000
- Strategic box selection and revealing
- Dynamic banker's deal system
- Real-time prize value calculations
- Progress tracking

🚀 **Performance**
- Built with Next.js 14+ for optimal performance
- Server-side rendering support
- Fast loading times
- Optimized for all devices

📱 **Cross-Platform**
- Works on desktop, tablet, and mobile
- Touch-friendly controls
- Responsive grid layout

## Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd dealornodeal
```

2. **Install dependencies:**
```bash
npm install
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## How to Play

1. **Click "START NEW GAME"** to begin
2. **Select your lucky box** from the 10 available boxes
3. **Reveal boxes one by one** to eliminate prize amounts
4. **Deal or No Deal** - When the banker offers a deal, decide:
   - **Accept**: Take the banker's offer and win that amount
   - **Reject**: Continue playing to reveal your final box
5. **Win**: Your earnings are determined by either the deal you accept or your final box value

## Prize Amounts

| Box | Amount |
|-----|--------|
| 1   | $500   |
| 2   | $550   |
| 3   | $600   |
| 4   | $650   |
| 5   | $700   |
| 6   | $750   |
| 7   | $800   |
| 8   | $850   |
| 9   | $900   |
| 10  | $1000  |

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Follow the prompts** and your game will be live!

### Option 2: Using GitHub

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Deal or No Deal game"
git remote add origin https://github.com/YOUR_USERNAME/dealornodeal.git
git push -u origin main
```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Click "Deploy"

3. **Vercel will automatically:**
   - Detect it's a Next.js project
   - Install dependencies
   - Build and deploy
   - Provide you with a live URL

### Environment Variables
No special environment variables are required for this project. It works out of the box!

## Project Structure

```
dealornodeal/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main game page
│   └── globals.css         # Global styles
├── components/
│   ├── GameBoard.tsx       # Game board with boxes
│   ├── PrizePanel.tsx      # Prize display
│   ├── GameControls.tsx    # Control buttons
│   └── DealModal.tsx       # Deal offer modal
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── README.md
```

## Technologies Used

- **Next.js 14+** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18+** - UI library

## Customization

### Change Prize Amounts
Edit the `PRIZE_AMOUNTS` array in [app/page.tsx](app/page.tsx#L21):
```typescript
const PRIZE_AMOUNTS = [500, 550, 600, 650, 700, 750, 800, 850, 900, 1000]
```

### Customize Colors
Edit the theme in [tailwind.config.js](tailwind.config.js):
```javascript
colors: {
  gold: '#FFD700',
  gameblue: '#0F172A',
  gamepurple: '#7C3AED',
  // Add more colors...
}
```

### Adjust Game Logic
Modify game mechanics in [app/page.tsx](app/page.tsx) - adjust deal offer calculation, box reveal logic, etc.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Tips

- Game is optimized for ~60 FPS animations
- All assets are pre-loaded
- CSS animations use GPU acceleration
- Responsive images and lazy loading ready

## License

MIT License - Feel free to use and modify

## Support & Feedback

For issues or suggestions:
1. Test in different browsers
2. Check the browser console for errors
3. Ensure Node.js 18+ is installed

## Future Enhancements

Possible additions:
- Sound effects and background music
- Leaderboard system
- Different difficulty levels
- Multiplayer mode
- Theme customization

---

**Ready to play?** 🎮 Deploy now and start playing!

```bash
npm run dev
# or
vercel
```

Enjoy the game! 🎉
