# Workout: Ranked

A modern, competitive workout app with a ranked progression system built with Next.js, TypeScript, and Tailwind CSS.

## 🏆 Features

### Ranked Progression System
- **6 Rank Tiers**: Bronze, Silver, Gold, Platinum, Diamond, Champion
- **Granular Progression**: Each tier has 3 levels (I, II, III) for detailed progression
- **Sequential Unlocking**: Complete previous levels to unlock next ones
- **Tier Locking**: Complete all workouts in current tier before advancing to next rank

### Interactive Card Stacks
- **Visual Card Stacks**: Each rank tier displays as overlapping cards
- **Fan-out Animation**: Cards spread vertically on hover with smooth transitions
- **Individual Card Focus**: Hover over specific cards to bring them to foreground
- **Progress Tracking**: Visual indicators for completed workouts and recommended next steps

### Workout Management
- **Structured Workouts**: Each workout contains multiple exercises with sets, reps, and duration
- **Real-time Progress**: Track current exercise and overall workout completion
- **Point System**: Earn points for completing workouts to advance ranks
- **Exercise Types**: Strength, cardio, and flexibility exercises

### Modern UI/UX
- **Glass Morphism Design**: Backdrop blur effects and transparent elements
- **Metallic Rank Icons**: Premium metallic gradients for rank badges
- **Responsive Design**: Works on desktop and mobile devices
- **Smooth Animations**: CSS transitions and hover effects throughout

## 🎮 How to Play

1. **Start with Bronze**: Begin with "Bronze Foundations" workout
2. **Complete Sequentially**: Finish each workout to unlock the next
3. **Advance Ranks**: Complete all Bronze workouts to unlock Silver tier
4. **Earn Points**: Each workout awards points toward rank progression
5. **Track Progress**: Visual indicators show completion status and recommendations

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Font**: Roboto (optimized with Next.js font system)
- **Deployment**: Vercel-ready

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd burkiiwtf
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
burkiiwtf/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout with font optimization
│   └── page.tsx             # Main workout app component
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎯 Core Features

### Rank System
- **Bronze**: Foundation workouts (Wall Push-ups, Assisted Squats)
- **Silver**: Intermediate strength (Regular Push-ups, Pistol Squats)
- **Gold**: Advanced movements (One-arm Push-ups, Handstand Hold)
- **Platinum**: Elite training (Handstand Push-ups, Muscle-ups)
- **Diamond**: Master level (Planche, Front Lever, Iron Cross)
- **Champion**: Ultimate challenges (Extended handstands, elite conditioning)

### Progression Logic
- Workouts must be completed in sequence within each tier
- All workouts in a tier must be completed before advancing to next rank
- Points system determines overall rank progression
- Visual indicators show completion status and next recommended workout

### UI Components
- **Card Stacks**: Visual representation of workout tiers
- **Progress Bars**: Rank progression visualization
- **Metallic Badges**: Premium rank indicators
- **Interactive Elements**: Hover effects and smooth transitions

## 🎨 Design Philosophy

The app follows a modern, competitive gaming aesthetic with:
- Dark gradient backgrounds
- Glass morphism effects
- Metallic accents
- Smooth animations
- Clear visual hierarchy

## 🔧 Development

### Key Components
- **Workout Interface**: Active workout mode with exercise tracking
- **Rank Display**: Current rank, progress, and next rank information
- **Card Management**: Interactive card stacks with hover animations
- **Progress Tracking**: Completion status and point accumulation

### State Management
- React hooks for local state
- Workout completion tracking
- Rank progression logic
- UI interaction states

## 📈 Future Enhancements

Potential features for future development:
- User accounts and persistent progress
- Social features and leaderboards
- Custom workout creation
- Achievement system
- Mobile app version
- Workout history and analytics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Workout: Ranked** - Level up your fitness journey with competitive progression!
