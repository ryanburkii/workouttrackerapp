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
      setTotalPoints(prev => prev + selectedWorkout.points);
      
      // Check if user should rank up
      const newRank = ranks.findIndex(rank => totalPoints + selectedWorkout.points < rank.points);
      if (newRank > currentRank) {
        setCurrentRank(newRank);
      }
    }
    setIsWorkoutActive(false);
    setSelectedWorkout(null);
  };

  const getRankColor = (rank: string) => {
    const rankData = ranks.find(r => r.name.toLowerCase().replace(' ', '-') === rank);
    return rankData?.metallic || 'from-gray-400 via-gray-600 to-gray-800';
  };

  const getRankDisplayName = (rank: string) => {
    const rankData = ranks.find(r => r.name.toLowerCase().replace(' ', '-') === rank);
    return rankData?.name || rank.charAt(0).toUpperCase() + rank.slice(1);
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
              {rankTiers.map((tier, tierIndex) => (
                <div key={tier.name} className="relative group">
                  {/* Rank Tier Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-block bg-gradient-to-r ${tier.metallic} text-white px-8 py-4 rounded-2xl text-xl font-bold mb-4 shadow-2xl border border-white/100 relative`}>
                      <div className="relative z-10 drop-shadow-lg">{tier.name} Tier</div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {tier.workouts.length} levels available
                    </p>
                  </div>

                  {/* Card Stack */}
                  <div className="relative">
                    {tier.workouts.map((workout, index) => (
                      <div
                        key={workout.id}
                        className={`absolute w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer transform hover:scale-105 hover:shadow-2xl ${
                          index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
                        }`}
                        style={{
                          top: `${index * 12}px`,
                          left: `${index * 6}px`,
                          transform: `rotate(${index * 1.5}deg)`,
                        }}
                        onClick={() => startWorkout(workout)}
                      >
                        {/* Rank Badge */}
                        <div className={`inline-block bg-gradient-to-r ${getRankColor(workout.difficulty)} text-white px-4 py-2 rounded-xl text-sm font-bold mb-4 shadow-xl border border-white/100 relative`}>
                          <div className="relative z-10 drop-shadow-md">{getRankDisplayName(workout.difficulty)}</div>
                        </div>
                        
                        {/* Workout Info */}
                        <h3 className="text-xl font-bold text-white mb-3">
                          {workout.name}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {workout.exercises.length} exercises • {workout.points} points
                        </p>
                        
                        {/* Exercise Preview */}
                        <div className="space-y-3">
                          {workout.exercises.slice(0, 2).map((exercise) => (
                            <div key={exercise.id} className="flex justify-between text-sm">
                              <span className="text-gray-300">{exercise.name}</span>
                              <span className="text-white font-medium">
                                {exercise.sets}×{exercise.reps}
                              </span>
                            </div>
                          ))}
                          {workout.exercises.length > 2 && (
                            <div className="text-sm text-gray-400">
                              +{workout.exercises.length - 2} more exercises
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {/* Stack Base */}
                    <div className="w-full h-72 bg-white/5 border border-white/10 rounded-2xl"></div>
                  </div>
                </div>
              ))}
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
                        className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        Complete Exercise
                      </button>
                      <button
                        onClick={() => setIsWorkoutActive(false)}
                        className="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
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
