'use client';

import { useState, useEffect } from 'react';

interface Workout {
  id: string;
  name: string;
  exercises: Exercise[];
  difficulty: 'bronze' | 'bronze-ii' | 'bronze-iii' | 'silver' | 'silver-ii' | 'silver-iii' | 'gold' | 'gold-ii' | 'gold-iii' | 'platinum' | 'platinum-ii' | 'platinum-iii' | 'diamond' | 'diamond-ii' | 'diamond-iii' | 'champion';
  points: number;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number; // in seconds
  type: 'strength' | 'cardio' | 'flexibility';
}

const ranks = [
  { name: 'Bronze', color: 'from-amber-600 to-amber-800', metallic: 'from-amber-400 via-amber-600 to-amber-800', points: 0 },
  { name: 'Bronze II', color: 'from-amber-500 to-amber-700', metallic: 'from-amber-300 via-amber-500 to-amber-700', points: 50 },
  { name: 'Bronze III', color: 'from-amber-400 to-amber-600', metallic: 'from-amber-200 via-amber-400 to-amber-600', points: 100 },
  { name: 'Silver', color: 'from-gray-400 to-gray-600', metallic: 'from-gray-200 via-gray-400 to-gray-600', points: 150 },
  { name: 'Silver II', color: 'from-gray-300 to-gray-500', metallic: 'from-gray-100 via-gray-300 to-gray-500', points: 200 },
  { name: 'Silver III', color: 'from-gray-200 to-gray-400', metallic: 'from-gray-50 via-gray-200 to-gray-400', points: 250 },
  { name: 'Gold', color: 'from-yellow-400 to-yellow-600', metallic: 'from-yellow-200 via-yellow-400 to-yellow-600', points: 300 },
  { name: 'Gold II', color: 'from-yellow-300 to-yellow-500', metallic: 'from-yellow-100 via-yellow-300 to-yellow-500', points: 400 },
  { name: 'Gold III', color: 'from-yellow-200 to-yellow-400', metallic: 'from-yellow-50 via-yellow-200 to-yellow-400', points: 500 },
  { name: 'Platinum', color: 'from-slate-300 to-slate-500', metallic: 'from-slate-100 via-slate-300 to-slate-500', points: 600 },
  { name: 'Platinum II', color: 'from-slate-200 to-slate-400', metallic: 'from-slate-50 via-slate-200 to-slate-400', points: 750 },
  { name: 'Platinum III', color: 'from-slate-100 to-slate-300', metallic: 'from-white via-slate-100 to-slate-300', points: 900 },
  { name: 'Diamond', color: 'from-cyan-400 to-cyan-600', metallic: 'from-cyan-200 via-cyan-400 to-cyan-600', points: 1000 },
  { name: 'Diamond II', color: 'from-cyan-300 to-cyan-500', metallic: 'from-cyan-100 via-cyan-300 to-cyan-500', points: 1200 },
  { name: 'Diamond III', color: 'from-cyan-200 to-cyan-400', metallic: 'from-cyan-50 via-cyan-200 to-cyan-400', points: 1400 },
  { name: 'Champion', color: 'from-purple-500 to-purple-700', metallic: 'from-purple-300 via-purple-500 to-purple-700', points: 1500 },
];

const sampleWorkouts: Workout[] = [
  // Bronze Tier
  {
    id: '1',
    name: 'Bronze Foundations',
    difficulty: 'bronze',
    points: 25,
    exercises: [
      { id: '1', name: 'Wall Push-ups', sets: 3, reps: 10, type: 'strength' },
      { id: '2', name: 'Assisted Squats', sets: 3, reps: 12, type: 'strength' },
      { id: '3', name: 'Knee Plank', sets: 3, reps: 1, duration: 20, type: 'strength' },
    ]
  },
  {
    id: '2',
    name: 'Bronze Strength',
    difficulty: 'bronze-ii',
    points: 35,
    exercises: [
      { id: '4', name: 'Regular Push-ups', sets: 3, reps: 8, type: 'strength' },
      { id: '5', name: 'Bodyweight Squats', sets: 3, reps: 15, type: 'strength' },
      { id: '6', name: 'Full Plank', sets: 3, reps: 1, duration: 30, type: 'strength' },
    ]
  },
  {
    id: '3',
    name: 'Bronze Advanced',
    difficulty: 'bronze-iii',
    points: 50,
    exercises: [
      { id: '7', name: 'Wide Push-ups', sets: 3, reps: 12, type: 'strength' },
      { id: '8', name: 'Jump Squats', sets: 3, reps: 15, type: 'strength' },
      { id: '9', name: 'Side Plank', sets: 3, reps: 1, duration: 20, type: 'strength' },
    ]
  },
  // Silver Tier
  {
    id: '4',
    name: 'Silver Foundations',
    difficulty: 'silver',
    points: 60,
    exercises: [
      { id: '10', name: 'Diamond Push-ups', sets: 3, reps: 10, type: 'strength' },
      { id: '11', name: 'Pistol Squats (Assisted)', sets: 3, reps: 8, type: 'strength' },
      { id: '12', name: 'Burpees', sets: 3, reps: 5, type: 'cardio' },
    ]
  },
  {
    id: '5',
    name: 'Silver Power',
    difficulty: 'silver-ii',
    points: 75,
    exercises: [
      { id: '13', name: 'Decline Push-ups', sets: 3, reps: 12, type: 'strength' },
      { id: '14', name: 'Pistol Squats', sets: 3, reps: 10, type: 'strength' },
      { id: '15', name: 'Mountain Climbers', sets: 3, reps: 1, duration: 45, type: 'cardio' },
    ]
  },
  {
    id: '6',
    name: 'Silver Elite',
    difficulty: 'silver-iii',
    points: 100,
    exercises: [
      { id: '16', name: 'Archer Push-ups', sets: 3, reps: 8, type: 'strength' },
      { id: '17', name: 'Pistol Squats (Full)', sets: 3, reps: 12, type: 'strength' },
      { id: '18', name: 'Burpee Pull-ups', sets: 3, reps: 8, type: 'strength' },
    ]
  },
  // Gold Tier
  {
    id: '7',
    name: 'Gold Foundations',
    difficulty: 'gold',
    points: 120,
    exercises: [
      { id: '19', name: 'One-arm Push-ups (Assisted)', sets: 3, reps: 5, type: 'strength' },
      { id: '20', name: 'Box Jumps', sets: 3, reps: 12, type: 'strength' },
      { id: '21', name: 'Handstand Hold', sets: 3, reps: 1, duration: 30, type: 'strength' },
    ]
  },
  {
    id: '8',
    name: 'Gold Power',
    difficulty: 'gold-ii',
    points: 150,
    exercises: [
      { id: '22', name: 'One-arm Push-ups', sets: 3, reps: 8, type: 'strength' },
      { id: '23', name: 'Plyometric Lunges', sets: 3, reps: 15, type: 'strength' },
      { id: '24', name: 'Handstand Push-ups (Wall)', sets: 3, reps: 5, type: 'strength' },
    ]
  },
  {
    id: '9',
    name: 'Gold Elite',
    difficulty: 'gold-iii',
    points: 200,
    exercises: [
      { id: '25', name: 'One-arm Push-ups (Full)', sets: 3, reps: 12, type: 'strength' },
      { id: '26', name: 'Box Jumps (High)', sets: 3, reps: 15, type: 'strength' },
      { id: '27', name: 'Freestanding Handstand', sets: 3, reps: 1, duration: 45, type: 'strength' },
    ]
  },
  // Platinum Tier
  {
    id: '10',
    name: 'Platinum Foundations',
    difficulty: 'platinum',
    points: 250,
    exercises: [
      { id: '28', name: 'Handstand Push-ups', sets: 3, reps: 5, type: 'strength' },
      { id: '29', name: 'Muscle-ups (Assisted)', sets: 3, reps: 3, type: 'strength' },
      { id: '30', name: 'Sprint Intervals', sets: 4, reps: 1, duration: 30, type: 'cardio' },
    ]
  },
  {
    id: '11',
    name: 'Platinum Power',
    difficulty: 'platinum-ii',
    points: 300,
    exercises: [
      { id: '31', name: 'Handstand Push-ups (Full)', sets: 3, reps: 8, type: 'strength' },
      { id: '32', name: 'Muscle-ups', sets: 3, reps: 5, type: 'strength' },
      { id: '33', name: 'High-Intensity Training', sets: 5, reps: 1, duration: 45, type: 'cardio' },
    ]
  },
  {
    id: '12',
    name: 'Platinum Elite',
    difficulty: 'platinum-iii',
    points: 400,
    exercises: [
      { id: '34', name: 'Handstand Push-ups (Strict)', sets: 3, reps: 12, type: 'strength' },
      { id: '35', name: 'Muscle-ups (Strict)', sets: 3, reps: 8, type: 'strength' },
      { id: '36', name: 'Elite Conditioning', sets: 6, reps: 1, duration: 60, type: 'cardio' },
    ]
  },
  // Diamond Tier
  {
    id: '13',
    name: 'Diamond Foundations',
    difficulty: 'diamond',
    points: 500,
    exercises: [
      { id: '37', name: 'Planche Hold', sets: 3, reps: 1, duration: 15, type: 'strength' },
      { id: '38', name: 'Front Lever', sets: 3, reps: 1, duration: 20, type: 'strength' },
      { id: '39', name: 'Iron Cross Training', sets: 3, reps: 1, duration: 10, type: 'strength' },
    ]
  },
  {
    id: '14',
    name: 'Diamond Power',
    difficulty: 'diamond-ii',
    points: 600,
    exercises: [
      { id: '40', name: 'Planche Push-ups', sets: 3, reps: 3, type: 'strength' },
      { id: '41', name: 'Front Lever Pull-ups', sets: 3, reps: 5, type: 'strength' },
      { id: '42', name: 'Iron Cross Hold', sets: 3, reps: 1, duration: 15, type: 'strength' },
    ]
  },
  {
    id: '15',
    name: 'Diamond Elite',
    difficulty: 'diamond-iii',
    points: 750,
    exercises: [
      { id: '43', name: 'Planche Push-ups (Full)', sets: 3, reps: 8, type: 'strength' },
      { id: '44', name: 'Front Lever Rows', sets: 3, reps: 10, type: 'strength' },
      { id: '45', name: 'Iron Cross (Full)', sets: 3, reps: 1, duration: 20, type: 'strength' },
    ]
  },
  // Champion Tier
  {
    id: '16',
    name: 'Champion Ultimate',
    difficulty: 'champion',
    points: 1000,
    exercises: [
      { id: '46', name: 'Planche Push-ups (Strict)', sets: 3, reps: 12, type: 'strength' },
      { id: '47', name: 'Freestanding Handstand (Extended)', sets: 3, reps: 1, duration: 90, type: 'strength' },
      { id: '48', name: 'Elite Conditioning (Ultimate)', sets: 8, reps: 1, duration: 120, type: 'cardio' },
    ]
  },
];

// Group workouts by rank tier
const rankTiers = [
  {
    name: 'Bronze',
    color: 'from-amber-600 to-amber-800',
    metallic: 'from-amber-400 via-amber-600 to-amber-800',
    workouts: sampleWorkouts.filter(w => w.difficulty.startsWith('bronze'))
  },
  {
    name: 'Silver',
    color: 'from-gray-400 to-gray-600',
    metallic: 'from-gray-200 via-gray-400 to-gray-600',
    workouts: sampleWorkouts.filter(w => w.difficulty.startsWith('silver'))
  },
  {
    name: 'Gold',
    color: 'from-yellow-400 to-yellow-600',
    metallic: 'from-yellow-200 via-yellow-400 to-yellow-600',
    workouts: sampleWorkouts.filter(w => w.difficulty.startsWith('gold'))
  },
  {
    name: 'Platinum',
    color: 'from-slate-300 to-slate-500',
    metallic: 'from-slate-100 via-slate-300 to-slate-500',
    workouts: sampleWorkouts.filter(w => w.difficulty.startsWith('platinum'))
  },
  {
    name: 'Diamond',
    color: 'from-cyan-400 to-cyan-600',
    metallic: 'from-cyan-200 via-cyan-400 to-cyan-600',
    workouts: sampleWorkouts.filter(w => w.difficulty.startsWith('diamond'))
  },
  {
    name: 'Champion',
    color: 'from-purple-500 to-purple-700',
    metallic: 'from-purple-300 via-purple-500 to-purple-700',
    workouts: sampleWorkouts.filter(w => w.difficulty === 'champion')
  }
];

export default function Home() {
  const [currentRank, setCurrentRank] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [exerciseProgress, setExerciseProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [hoveredTier, setHoveredTier] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [completedWorkouts, setCompletedWorkouts] = useState<Set<string>>(new Set());

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentRankData = ranks[currentRank];
  const nextRank = ranks[currentRank + 1];
  const progressToNext = nextRank ? ((totalPoints - currentRankData.points) / (nextRank.points - currentRankData.points)) * 100 : 100;

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout);
    setIsWorkoutActive(true);
    setCurrentExercise(0);
    setExerciseProgress(0);
  };

  const completeWorkout = () => {
    if (selectedWorkout) {
      const newTotalPoints = totalPoints + selectedWorkout.points;
      setTotalPoints(newTotalPoints);
      
      // Track completed workout
      setCompletedWorkouts(prev => new Set([...prev, selectedWorkout.id]));
      
      // Check if user should rank up
      const newRankIndex = ranks.findIndex(rank => newTotalPoints < rank.points);
      const targetRankIndex = newRankIndex === -1 ? ranks.length - 1 : Math.max(0, newRankIndex - 1);
      
      if (targetRankIndex > currentRank) {
        setCurrentRank(targetRankIndex);
      }
    }
    setIsWorkoutActive(false);
    setSelectedWorkout(null);
  };

  const getNextRecommendedWorkout = (tierWorkouts: Workout[]) => {
    // Find the first uncompleted workout in this tier
    for (const workout of tierWorkouts) {
      if (!completedWorkouts.has(workout.id)) {
        return workout;
      }
    }
    // If all workouts in tier are completed, return the last one
    return tierWorkouts[tierWorkouts.length - 1];
  };

  const isWorkoutUnlocked = (workout: Workout, tierWorkouts: Workout[]) => {
    // First workout in tier is always unlocked
    if (workout.id === tierWorkouts[0].id) {
      return true;
    }
    
    // Find the previous workout in the tier
    const workoutIndex = tierWorkouts.findIndex(w => w.id === workout.id);
    if (workoutIndex <= 0) return true;
    
    const previousWorkout = tierWorkouts[workoutIndex - 1];
    return completedWorkouts.has(previousWorkout.id);
  };

  const isRankTierUnlocked = (tierIndex: number) => {
    // Bronze tier (index 0) is always unlocked
    if (tierIndex === 0) return true;
    
    // Check if all workouts in the previous tier are completed
    const previousTier = rankTiers[tierIndex - 1];
    return previousTier.workouts.every(workout => completedWorkouts.has(workout.id));
  };

  const getRankColor = (rank: string) => {
    const rankData = ranks.find(r => r.name.toLowerCase().replace(' ', '-') === rank);
    return rankData?.metallic || 'from-gray-400 via-gray-600 to-gray-800';
  };

  const getRankDisplayName = (rank: string) => {
    const rankData = ranks.find(r => r.name.toLowerCase().replace(' ', '-') === rank);
    return rankData?.name || rank.charAt(0).toUpperCase() + rank.slice(1);
  };

  const getCardStyle = (index: number, tierName: string, totalCards: number, cardId: string) => {
    const isTierHovered = hoveredTier === tierName;
    const isCardHovered = hoveredCard === cardId;
    
    if (isTierHovered || isCardHovered) {
      // Vertical fan out effect - spread cards up and down
      const spread = 60; // How far cards spread apart vertically
      const horizontalOffset = 20; // Slight horizontal offset for visual interest
      
      // Calculate position based on index
      const verticalOffset = (index - (totalCards - 1) / 2) * spread;
      const horizontalPosition = index * 4; // Slight horizontal stacking
      
      // If this specific card is hovered, bring it to foreground
      const zIndex = isCardHovered ? 1000 : totalCards - index;
      
      return {
        top: `${verticalOffset}px`,
        left: `${horizontalPosition}px`,
        transform: 'rotate(0deg)',
        transition: 'all 0.4s ease-out',
        zIndex: zIndex,
      };
    } else {
      // Stacked position
      return {
        top: `${index * 12}px`,
        left: `${index * 6}px`,
        transform: 'rotate(0deg)',
        transition: 'all 0.4s ease-out',
        zIndex: totalCards - index,
      };
    }
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-900" suppressHydrationWarning>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30px_30px,_rgba(156,146,172,0.05)_2px,_transparent_0)]"></div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="container mx-auto px-6 py-12">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Workout: Ranked
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Progress through tiers, unlock achievements, and dominate your goals.
            </p>
          </div>

          {/* Rank Display Card */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className={`inline-block bg-gradient-to-r ${currentRankData.metallic} text-white px-8 py-4 rounded-2xl text-2xl font-bold mb-4 shadow-2xl border border-white/100 relative`}>
                  <div className="relative z-10 drop-shadow-lg">{currentRankData.name}</div>
                </div>
                <p className="text-gray-300 text-lg">
                  {totalPoints} / {nextRank?.points || 'Max'} Points
                </p>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-white/10 rounded-full h-4 mb-6">
                <div 
                  className={`h-4 rounded-full bg-gradient-to-r ${currentRankData.metallic} shadow-lg transition-all duration-500`}
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
              
              {nextRank && (
                <p className="text-center text-gray-400">
                  {nextRank.points - totalPoints} points to {nextRank.name}
                </p>
              )}
            </div>
          </div>

          {/* Rank Card Stacks */}
          {!isWorkoutActive && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
              {rankTiers.map((tier, tierIndex) => {
                const isTierUnlocked = isRankTierUnlocked(tierIndex);
                
                return (
                  <div 
                    key={tier.name} 
                    className={`relative group ${!isTierUnlocked ? 'opacity-50' : ''}`}
                    onMouseEnter={() => isTierUnlocked && setHoveredTier(tier.name)}
                    onMouseLeave={() => isTierUnlocked && setHoveredTier(null)}
                  >
                    {/* Rank Tier Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-block bg-gradient-to-r ${tier.metallic} text-white px-8 py-4 rounded-2xl text-xl font-bold mb-4 shadow-2xl border border-white/100 relative`}>
                        <div className="relative z-10 drop-shadow-lg">{tier.name} Tier</div>
                      </div>
                      <p className="text-gray-400 text-sm">
                        {tier.workouts.length} levels available
                      </p>
                      {!isTierUnlocked && (
                        <p className="text-red-400 text-sm mt-2">
                          Complete previous tier to unlock
                        </p>
                      )}
                    </div>

                    {/* Card Stack */}
                    <div className="relative h-72">
                      {(() => {
                        const recommendedWorkout = getNextRecommendedWorkout(tier.workouts);
                        const sortedWorkouts = [
                          recommendedWorkout,
                          ...tier.workouts.filter(w => w.id !== recommendedWorkout.id)
                        ];
                        
                        return sortedWorkouts.map((workout, index) => {
                          const isCompleted = completedWorkouts.has(workout.id);
                          const isRecommended = workout.id === recommendedWorkout.id;
                          const isUnlocked = isTierUnlocked && isWorkoutUnlocked(workout, tier.workouts);
                          
                          return (
                            <div
                              key={workout.id}
                              className={`absolute w-full border rounded-2xl p-6 transition-all duration-500 transform ${
                                !isUnlocked
                                  ? 'bg-gray-800 border-gray-600 cursor-not-allowed'
                                  : isCompleted 
                                    ? 'bg-green-500/20 border-green-400/40 hover:bg-white/20 cursor-pointer hover:scale-105 hover:shadow-2xl backdrop-blur-xl' 
                                    : isRecommended 
                                      ? 'bg-white/15 border-white/30 hover:bg-white/20 cursor-pointer hover:scale-105 hover:shadow-2xl backdrop-blur-xl' 
                                      : 'bg-white/10 border-white/20 hover:bg-white/20 cursor-pointer hover:scale-105 hover:shadow-2xl backdrop-blur-xl'
                              }`}
                              style={getCardStyle(index, tier.name, tier.workouts.length, workout.id)}
                              onClick={() => isUnlocked && startWorkout(workout)}
                              onMouseEnter={() => isUnlocked && setHoveredCard(workout.id)}
                              onMouseLeave={() => isUnlocked && setHoveredCard(null)}
                            >
                              {/* Rank Badge */}
                              <div className={`inline-block bg-gradient-to-r ${getRankColor(workout.difficulty)} text-white px-4 py-2 rounded-xl text-sm font-bold mb-4 shadow-xl border border-white/100 relative`}>
                                <div className="relative z-10 drop-shadow-md">{getRankDisplayName(workout.difficulty)}</div>
                              </div>
                              
                              {/* Lock Icon for locked workouts */}
                              {!isUnlocked && (
                                <div className="absolute top-4 right-4">
                                  <div className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    🔒
                                  </div>
                                </div>
                              )}
                              
                              {/* Completion Status */}
                              {isCompleted && (
                                <div className="absolute top-4 right-4">
                                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    ✓
                                  </div>
                                </div>
                              )}
                              
                              {/* Recommended Badge */}
                              {isRecommended && !isCompleted && isUnlocked && (
                                <div className="absolute top-4 right-4">
                                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    →
                                  </div>
                                </div>
                              )}
                              
                              {/* Workout Info */}
                              <h3 className={`text-xl font-bold mb-3 ${
                                !isUnlocked ? 'text-gray-400' : 'text-white'
                              }`}>
                                {workout.name}
                              </h3>
                              <p className={`mb-4 ${
                                !isUnlocked ? 'text-gray-500' : 'text-gray-300'
                              }`}>
                                {workout.exercises.length} exercises • {workout.points} points
                              </p>
                              
                              {/* Exercise Preview */}
                              <div className="space-y-3">
                                {workout.exercises.slice(0, 2).map((exercise) => (
                                  <div key={exercise.id} className="flex justify-between text-sm">
                                    <span className={!isUnlocked ? 'text-gray-500' : 'text-gray-300'}>{exercise.name}</span>
                                    <span className={!isUnlocked ? 'text-gray-500' : 'text-white font-medium'}>
                                      {exercise.sets}×{exercise.reps}
                                    </span>
                                  </div>
                                ))}
                                {workout.exercises.length > 2 && (
                                  <div className={`text-sm ${!isUnlocked ? 'text-gray-600' : 'text-gray-400'}`}>
                                    +{workout.exercises.length - 2} more exercises
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        });
                      })()}
                      
                      {/* Stack Base */}
                      <div className={`absolute inset-0 bg-white/5 border border-white/10 rounded-2xl transition-opacity duration-500 ${hoveredTier === tier.name ? 'opacity-0' : 'opacity-100'}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Active Workout */}
          {isWorkoutActive && selectedWorkout && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-4">
                    {selectedWorkout.name}
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Exercise {currentExercise + 1} of {selectedWorkout.exercises.length}
                  </p>
                </div>

                {currentExercise < selectedWorkout.exercises.length && (
                  <div className="text-center">
                    <div className="mb-8">
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {selectedWorkout.exercises[currentExercise].name}
                      </h3>
                      <p className="text-gray-300 text-lg">
                        {selectedWorkout.exercises[currentExercise].sets} sets × {selectedWorkout.exercises[currentExercise].reps} reps
                        {selectedWorkout.exercises[currentExercise].duration && ` (${selectedWorkout.exercises[currentExercise].duration}s)`}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-6">
                      <button
                        onClick={() => setCurrentExercise(prev => prev + 1)}
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/100"
                      >
                        Complete Exercise
                      </button>
                      <button
                        onClick={() => setIsWorkoutActive(false)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105 border border-white/100"
                      >
                        Quit Workout
                      </button>
                    </div>
                  </div>
                )}

                {currentExercise >= selectedWorkout.exercises.length && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full mb-6">
                      <span className="text-3xl">🎉</span>
                    </div>
                    <h3 className="text-3xl font-bold text-green-400 mb-4">
                      Workout Complete!
                    </h3>
                    <p className="text-gray-300 text-lg mb-8">
                      You earned {selectedWorkout.points} points!
                    </p>
                    <button
                      onClick={completeWorkout}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      Claim Points
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
