const demoDaysQuery = `
  INSERT INTO days (
  day_id,
  workout_id,
  position,
  day_name,
  day_description
)
VALUES
  (
    'e3239f69-840b-4d37-8210-107d8d66c1c2',
    'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
    1,
    'Day 1',
    'Bench press and squats.'
  ),
  (
    'd3b99789-4d4a-4af7-9dbd-2f7c360029ee',
    'f7c40d36-2cb7-4c56-918f-adfb0f7aac7e',
    2,
    'Day 2',
    'Deadlifts and curls.'
  ),
  (
    'f9a3bf8f-4dca-4b77-97d2-9c45ec0fe104',
    '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
    1,
    'Day 1',
    'Jumping jacks and lunges.'
  ),
  (
    'fa79d728-8380-47f6-9ef5-470596033c65',
    '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
    2,
    'Day 2',
    'Treadmill jog and squats.'
  ),
  (
    'be58f5fe-4cef-4caa-84e3-58d4c876b39b',
    '3bfa882c-22e6-4ad0-8c3a-8ac79ff3d01b',
    3,
    'Day 3',
    'Bench press and stretching.'
  ),
  (
    '44fba5aa-782c-4eb9-b616-bcb72bb7a17d',
    'bc4c3c26-b63e-4c86-992c-2c9c8eb5e57b',
    1,
    'Full-body exercises',
    'repeat this day every workout'
  );

`;

export default demoDaysQuery;
