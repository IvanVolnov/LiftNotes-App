// ===========================
// Exercises Array
// ===========================

export const exercises = [
  {
    exerciseId: '3f7f8a30-dc80-4b8d-951a-5f276df3d032',
    exerciseName: 'Bodyweight Squat',
    exerciseDescription:
      'Stand with feet shoulder-width apart and lower into a squat while keeping your chest up and knees behind your toes.',
    position: 1,
    exerciseExternalLinks: [
      {
        label: 'Bodyweight Squat Tutorial',
        href: 'https://www.masterclass.com/articles/bodyweight-squat-guide',
      },
    ],
    exerciseType: 'compound',
    previousTrainingWasEasy: true,
  },
  {
    exerciseId: 'ee7a12c1-9ec7-4b66-bbf0-52ca8ef3e47f',
    exerciseName: 'Push-Up',
    exerciseDescription:
      'Place your hands slightly wider than shoulder-width and lower your body until your chest nearly touches the floor before pushing back up.',
    position: 2,
    exerciseExternalLinks: [
      {
        label: 'YouTube guide',
        href: 'https://www.youtube.com/watch?v=ryncZFQCB8I',
      },
    ],
    exerciseType: 'compound',
    previousTrainingWasEasy: false,
  },
  {
    exerciseId: 'a9df034c-7303-45bf-9dd0-4f665f659f93',
    exerciseName: 'Treadmill Jog',
    exerciseDescription:
      'Start at a comfortable speed on the treadmill, maintain an upright posture, and increase pace gradually as you warm up.',
    position: 3,
    exerciseExternalLinks: [{ label: '', href: '' }],
    exerciseType: 'cardio',
    previousTrainingWasEasy: true,
  },
  {
    exerciseId: '50338a31-0730-42f7-b2cb-2b19706fce4c',
    exerciseName: 'Bicep Curl',
    exerciseDescription:
      'Stand with a dumbbell in each hand, palms facing forward, and curl the weights up while keeping your elbows close to your torso.',
    position: 4,
    exerciseExternalLinks: [
      {
        label: 'Bicep Curl Technique',
        href: 'https://www.verywellfit.com/how-to-do-the-biceps-arm-curl-3498604',
      },
      {
        label: 'Video instruction',
        href: 'https://www.youtube.com/watch?v=XE_pHwbst04',
      },
    ],
    exerciseType: 'isolation',
    previousTrainingWasEasy: false,
  },
  {
    exerciseId: 'da3a8850-fa8f-4ad9-9ed9-38b80f896f0f',
    exerciseName: 'Hamstring Stretch',
    exerciseDescription:
      'Sit on the floor with one leg extended, lean forward from your hips, and reach for your toes to stretch the back of your thigh.',
    position: 5,
    exerciseExternalLinks: [
      {
        label: '',
        href: '',
      },
    ],
    exerciseType: 'stretching',
    previousTrainingWasEasy: true,
  },
  {
    exerciseId: '15d6c2ab-508d-4af2-8bd4-4942786c0376',
    exerciseName: 'Bench Press',
    exerciseDescription:
      'Lie on the bench with feet on the floor, grip the bar slightly wider than shoulder-width, and lower it to your chest before pressing up.',
    position: 6,
    exerciseExternalLinks: [
      {
        label: 'Variations',
        href: 'https://www.healthline.com/health/exercise-fitness/bench-press-muscles-worked#how-to',
      },
      {
        label: 'Barbell Technique vid',
        href: 'https://www.youtube.com/watch?v=hWbUlkb5Ms4',
      },
      {
        label: 'How To: Dumbbell Incline Press',
        href: 'https://www.youtube.com/watch?v=hChjZQhX1Ls',
      },
    ],
    exerciseType: 'compound',
    previousTrainingWasEasy: false,
  },
  {
    exerciseId: '7260bf2b-27d3-47b5-bc3a-5add01049f1c',
    exerciseName: 'Plank',
    exerciseDescription:
      'Place your forearms on the ground, keep your body straight from head to heels, and hold the position while engaging your core.',
    position: 7,
    exerciseExternalLinks: [{ label: '', href: '' }],
    exerciseType: 'no type',
    previousTrainingWasEasy: true,
  },
  {
    exerciseId: 'b380f43f-1b06-4d55-80f3-84257871ac55',
    exerciseName: 'Deadlift',
    exerciseDescription:
      'Stand with feet under the barbell, bend at the hips and knees to grab the bar, then lift by driving through your heels and extending your hips.',
    position: 8,
    exerciseExternalLinks: [
      {
        label: 'How to Deadlift with Proper Form guide',
        href: 'https://stronglifts.com/deadlift/',
      },
    ],
    exerciseType: 'compound',
    previousTrainingWasEasy: false,
  },
  {
    exerciseId: 'a6bb7bf4-8d01-4ce5-8145-57da2cfc02bc',
    exerciseName: 'Lunge',
    exerciseDescription:
      'Step one foot forward, bend both knees to lower your body, and push back through your front heel to return to the starting position.',
    position: 9,
    exerciseExternalLinks: [
      {
        label: 'Forward Lunge',
        href: 'https://www.acefitness.org/resources/everyone/exercise-library/94/forward-lunge/?srsltid=AfmBOopUXLLCO6HIHx2WP_TtSTs3Kun9ZYuurWqclVOI-7DaGWbu2Tp4',
      },
      {
        label: 'Lunge Variations',
        href: 'https://www.mensjournal.com/health-fitness/best-lunge-variations',
      },
    ],
    exerciseType: 'compound',
    previousTrainingWasEasy: false,
  },
  {
    exerciseId: 'c1aa317f-858a-48b0-b1f6-1947ea36b8f6',
    exerciseName: 'Jumping Jacks',
    exerciseDescription:
      'Start with feet together and arms at your sides, then jump out while raising your arms overhead before returning to the starting position.',
    position: 10,
    exerciseExternalLinks: [
      {
        label: 'quick demo video',
        href: 'https://www.youtube.com/watch?v=4QcSLaqUJBo',
      },
    ],
    exerciseType: 'cardio',
    previousTrainingWasEasy: true,
  },
];

// ===========================
// Workouts Array
// ===========================
export const workouts = [
  {
    workoutId: 'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
    workoutName: 'Workout Variation 1',
    workoutDescription: 'A two-day routine with compound moves.',
    position: 1,
  },
  {
    workoutId: '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
    workoutName: 'Three-day split',
    workoutDescription: 'A three-day split for cardio and strength.',
    position: 2,
  },
  {
    workoutId: 'bc4c3c26-b63e-4c86-992c-2c9c8eb5e57b',
    workoutName: 'Single full-body routine',
    workoutDescription: '',
    position: 3,
  },
];

// ===========================
// Days Array
// ===========================
const days = [
  {
    dayId: 'e3239f69-840b-4d37-8210-107d8d66c1c2',
    dayName: 'Day 1',
    dayDescription: 'Bench press and squats.',
    position: 1,
    workoutId: 'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
  },
  {
    dayId: 'd3b99789-4d4a-4af7-9dbd-2f7c360029ee',
    dayName: 'Day 2',
    dayDescription: 'Deadlifts and curls.',
    position: 2,
    workoutId: 'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
  },

  {
    dayId: 'f9a3bf8f-4dca-4b77-97d2-9c45ec0fe104',
    dayName: 'Day 1',
    dayDescription: 'Jumping jacks and lunges.',
    position: 1,
    workoutId: '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
  },
  {
    dayId: 'fa79d728-8380-47f6-9ef5-470596033c65',
    dayName: 'Day 2',
    dayDescription: 'Treadmill jog and squats.',
    position: 2,
    workoutId: '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
  },
  {
    dayId: 'be58f5fe-4cef-4caa-84e3-58d4c876b39b',
    dayName: 'Day 3',
    dayDescription: 'Bench press and stretching.',
    position: 3,
    workoutId: '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
  },

  {
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    dayName: 'Full-body exercises',
    dayDescription: 'repeat this day every workout',
    position: 1,
    workoutId: 'bc4c3c26-b63e-4c86-992c-2c9c8eb5e57b',
  },
];

// ===========================
// Day–Exercise Link Array
// ===========================
export const dayExercises = [
  // ───────────────────────────────
  // Workout Variation 1
  //   Day 1 (Bench press and squats)
  //   dayId: "e3239f69-840b-4d37-8210-107d8d66c1c2"
  // ───────────────────────────────
  {
    dayExerciseId: '1ec1dd71-683b-44be-8fff-04fc59b55f9c',
    dayId: 'e3239f69-840b-4d37-8210-107d8d66c1c2',
    exerciseId: '15d6c2ab-508d-4af2-8bd4-4942786c0376', // Bench Press
    position: 1,
  },
  {
    dayExerciseId: 'cb4e6d9e-0a32-4a99-9133-6ff29bf76eb8',
    dayId: 'e3239f69-840b-4d37-8210-107d8d66c1c2',
    exerciseId: '3f7f8a30-dc80-4b8d-951a-5f276df3d032', // Bodyweight Squat
    position: 2,
  },

  // ───────────────────────────────
  // Workout Variation 1
  //   Day 2 (Deadlifts and curls)
  //   dayId: "d3b99789-4d4a-4af7-9dbd-2f7c360029ee"
  // ───────────────────────────────
  {
    dayExerciseId: '456a97c3-9f4c-42e3-93fa-1169d36f21ed',
    dayId: 'd3b99789-4d4a-4af7-9dbd-2f7c360029ee',
    exerciseId: 'b380f43f-1b06-4d55-80f3-84257871ac55', // Deadlift
    position: 1,
  },
  {
    dayExerciseId: '6a8cc5b9-016b-48d1-87bf-a905dad17c55',
    dayId: 'd3b99789-4d4a-4af7-9dbd-2f7c360029ee',
    exerciseId: '50338a31-0730-42f7-b2cb-2b19706fce4c', // Bicep Curl
    position: 2,
  },

  // ───────────────────────────────
  // Workout Variation 2
  //   Day 1 (Jumping jacks and lunges)
  //   dayId: "f9a3bf8f-4dca-4b77-97d2-9c45ec0fe104"
  // ───────────────────────────────
  {
    dayExerciseId: 'b7bd366d-de60-4de8-947b-d965c972d649',
    dayId: 'f9a3bf8f-4dca-4b77-97d2-9c45ec0fe104',
    exerciseId: 'c1aa317f-858a-48b0-b1f6-1947ea36b8f6', // Jumping Jacks
    position: 1,
  },
  {
    dayExerciseId: '1d45478c-c3eb-4a53-83fd-7369dd7b7a89',
    dayId: 'f9a3bf8f-4dca-4b77-97d2-9c45ec0fe104',
    exerciseId: 'a6bb7bf4-8d01-4ce5-8145-57da2cfc02bc', // Lunge
    position: 2,
  },

  // ───────────────────────────────
  // Workout Variation 2
  //   Day 2 (Treadmill jog and squats)
  //   dayId: "fa79d728-8380-47f6-9ef5-470596033c65"
  // ───────────────────────────────
  {
    dayExerciseId: '5da341c9-011c-4d54-939e-eb633e138fb9',
    dayId: 'fa79d728-8380-47f6-9ef5-470596033c65',
    exerciseId: 'a9df034c-7303-45bf-9dd0-4f665f659f93', // Treadmill Jog
    position: 1,
  },
  {
    dayExerciseId: '36d38c6d-f4f7-42c9-b36a-dcd4f6964606',
    dayId: 'fa79d728-8380-47f6-9ef5-470596033c65',
    exerciseId: '3f7f8a30-dc80-4b8d-951a-5f276df3d032', // Bodyweight Squat
    position: 2,
  },

  // ───────────────────────────────
  // Workout Variation 2
  //   Day 3 (Bench press and stretching)
  //   dayId: "be58f5fe-4cef-4caa-84e3-58d4c876b39b"
  // ───────────────────────────────
  {
    dayExerciseId: '8417d45d-a34b-40a8-84c5-fc8cfe2335d9',
    dayId: 'be58f5fe-4cef-4caa-84e3-58d4c876b39b',
    exerciseId: '15d6c2ab-508d-4af2-8bd4-4942786c0376', // Bench Press
    position: 1,
  },
  {
    dayExerciseId: '8ac15836-79fe-44ec-b4cc-65bbcb95a274',
    dayId: 'be58f5fe-4cef-4caa-84e3-58d4c876b39b',
    exerciseId: 'da3a8850-fa8f-4ad9-9ed9-38b80f896f0f', // Hamstring Stretch
    position: 2,
  },

  // ───────────────────────────────
  // Workout Variation 3
  //   Day 1 (Full-body exercises)
  //   dayId: "44fba5aa-782c-4eb9-b616-bcb72bb7a17d"
  // ───────────────────────────────
  {
    dayExerciseId: '18937c42-e988-4e1a-8528-19e7d6178c11',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: 'c1aa317f-858a-48b0-b1f6-1947ea36b8f6', // Jumping Jacks
    position: 1,
  },
  {
    dayExerciseId: 'ae4ac2bd-b039-490d-81b8-72af3c3a19a4',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: '3f7f8a30-dc80-4b8d-951a-5f276df3d032', // Bodyweight Squat
    position: 2,
  },
  {
    dayExerciseId: 'adfaaf6f-066a-4177-a811-1cc391beeb81',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: 'ee7a12c1-9ec7-4b66-bbf0-52ca8ef3e47f', // Push-Up
    position: 3,
  },
  {
    dayExerciseId: '9f34e4d8-8a75-4163-845d-21fc6199c797',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: 'b380f43f-1b06-4d55-80f3-84257871ac55', // Deadlift
    position: 4,
  },
  {
    dayExerciseId: 'b1fc7333-7efe-49e2-8316-95c41824ec8a',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: '50338a31-0730-42f7-b2cb-2b19706fce4c', // Bicep Curl
    position: 5,
  },
  {
    dayExerciseId: 'f3c53fd5-e59a-4f98-9aaa-f0b81537cd37',
    dayId: '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    exerciseId: 'da3a8850-fa8f-4ad9-9ed9-38b80f896f0f', // Hamstring Stretch
    position: 6,
  },
];
