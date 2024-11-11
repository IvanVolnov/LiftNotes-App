const exerciseResults1: Result[] = [
  {
    resultId: 'dskfwqerf12345678',
    resultDate: '2024-11-09T08:45:20Z',
    sets: [
      {
        resultId: 'dskfwqerf12345678',
        setId: 'set9087123412321',
        setNumber: 1,
        reps: 10,
        weightAmount: 15,
        weightUnit: 'kg',
      },
      {
        resultId: 'dskfwqerf12345678',
        setId: 'set9087123412322',
        setNumber: 2,
        reps: 10,
        weightAmount: 15,
        weightUnit: 'kg',
      },
      {
        resultId: 'dskfwqerf12345678',
        setId: 'set9087123412323',
        setNumber: 3,
        reps: 8,
        weightAmount: 13,
        weightUnit: 'kg',
      },
    ],
  },
];

const exerciseResults2: Result[] = [
  {
    resultId: 'asgdxcbn87654321',
    resultDate: '2024-11-10T07:20:00Z',
    sets: [
      {
        resultId: 'asgdxcbn87654321',
        setId: 'set8765432176543',
        setNumber: 1,
        reps: 15,
        weightAmount: 10,
        weightUnit: 'kg',
      },
      {
        resultId: 'asgdxcbn87654321',
        setId: 'set8765432176544',
        setNumber: 2,
        reps: 14,
        weightAmount: 10,
        weightUnit: 'kg',
      },
      {
        resultId: 'asgdxcbn87654321',
        setId: 'set8765432176545',
        setNumber: 3,
        reps: 12,
        weightAmount: 9,
        weightUnit: 'kg',
      },
    ],
  },
];

const exerciseResults3: Result[] = [
  {
    resultId: 'mncghj4567890123',
    resultDate: '2024-11-11T06:10:30Z',
    sets: [
      {
        resultId: 'mncghj4567890123',
        setId: 'set4567890123678',
        setNumber: 1,
        reps: 12,
        weightAmount: 18,
        weightUnit: 'kg',
      },
      {
        resultId: 'mncghj4567890123',
        setId: 'set4567890123679',
        setNumber: 2,
        reps: 10,
        weightAmount: 16,
        weightUnit: 'kg',
      },
      {
        resultId: 'mncghj4567890123',
        setId: 'set4567890123680',
        setNumber: 3,
        reps: 9,
        weightAmount: 15,
        weightUnit: 'kg',
      },
    ],
  },
];

const dummyData: Exercise[] = [
  {
    exerciseId: 'ew6515651rgerwg',
    exerciseType: 'compound',
    exerciseName: 'dummy ex',
    exerciseDescription: 'dummy ex description',
    position: 0,
    created_at: Date.now().toString(),
    previousTrainingWasEasy: true,
    exerciseLastUpdated: '2024-11-03T13:29:20.428Z',
    exerciseResults: exerciseResults1,
  },
  {
    exerciseId: 'yu765dfg534rtg34',
    exerciseType: 'isolation',
    exerciseName: 'dummy ex 2',
    exerciseDescription: 'dummy ex description 2',
    position: 1,
    created_at: Date.now().toString(),
    previousTrainingWasEasy: false,
    exerciseLastUpdated: '2024-11-09T08:45:20.428Z',
    exerciseResults: exerciseResults1,
  },
  {
    exerciseId: 'ht4589djkrh56dd5',
    exerciseName: 'dummy ex 3',
    exerciseDescription: 'dummy ex description 3',
    position: 2,
    created_at: Date.now().toString(),
    previousTrainingWasEasy: true,
    exerciseLastUpdated: '2024-11-10T07:20:00.428Z',
    exerciseResults: exerciseResults2,
  },
  {
    exerciseId: 'oi0987gfnmbzxcvw',
    exerciseType: 'stretching',
    exerciseName: 'dummy ex 4',
    exerciseDescription: 'dummy ex description 4',
    position: 3,
    created_at: Date.now().toString(),
    previousTrainingWasEasy: false,
    exerciseLastUpdated: '2024-11-11T06:10:30.428Z',
    exerciseResults: exerciseResults3,
  },
];

export default dummyData;
