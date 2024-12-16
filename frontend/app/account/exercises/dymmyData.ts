const exerciseResults1: Result[] = [
  {
    resultId: 'dskfwqerf12345678',
    resultDate: '2024-11-09T08:45:20Z',
    sets: [
      {
        setId: 'set9087123412321',
        setNumber: 1,
        reps: 10,
        weightAmount: 15,
        weightUnit: 'body weight',
        setAmount: 3,
        totalSets: 2,
      },
      {
        setId: 'set9087123412322',
        setNumber: 2,
        reps: 10,
        weightAmount: 15,
        weightUnit: 'горизонт',
        setAmount: 3,
        totalSets: 2,
      },
      {
        setAmount: 3,
        totalSets: 2,
        setId: 'set9087123412323',
        setNumber: 3,
        reps: 8,
        weightAmount: 13,
        weightUnit: 'кг и гриф',
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
    exerciseExternalLinks: [
      {
        label: 'yids',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
      {
        label: '235234523',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
    ],
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
    exerciseExternalLinks: [
      {
        label: 'yids',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
      {
        label: 'sfgsdfgsdfbgtr',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
      {
        label: 'sfgsdfsdddddddddddfgsdfbgtr',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
      {
        label: '235234523',
        href: 'https://youtu.be/T5NUv-XSCyI?si=BDVDIyElU7LbRJdh',
      },
    ],
  },
];

export default dummyData;
