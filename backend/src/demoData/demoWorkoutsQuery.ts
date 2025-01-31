const demoWorkoutsQuery = `
  INSERT INTO workouts (
    user_id,
    workout_id,
    position,
    workout_name,
    workout_description
  )
  VALUES
    (
      $1,
      'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
      1,
      'Workout Variation 1',
      'A two-day routine with compound moves.'
    ),
    (
      $1,
      '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
      2,
      'Three-day split',
      'A three-day split for cardio and strength.'
    ),
    (
      $1,
      'bc4c3c26-b63e-4c86-992c-2c9c8eb5e57b',
      3,
      'Single full-body routine',
      ''
    );
`;

export default demoWorkoutsQuery;
