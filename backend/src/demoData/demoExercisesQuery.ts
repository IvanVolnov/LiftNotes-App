const demoExerisesQuery = `INSERT INTO exercises (
    exercise_id,
    user_id,
    position,
    exercise_name,
    exercise_type,
    exercise_description,
    exercise_external_links,
    previous_training_was_easy
)
VALUES
(
  '3f7f8a30-dc80-4b8d-951a-5f276df3d032',
  $1,
  1,
  'Bodyweight Squat',
  'compound',
  'Stand with feet shoulder-width apart and lower into a squat while keeping your chest up and knees behind your toes.',
  '[{"label":"Bodyweight Squat Tutorial","href":"https://www.masterclass.com/articles/bodyweight-squat-guide"}]'::jsonb,
  TRUE
),
(
  'ee7a12c1-9ec7-4b66-bbf0-52ca8ef3e47f',
  $1,
  2,
  'Push-Up',
  'compound',
  'Place your hands slightly wider than shoulder-width and lower your body until your chest nearly touches the floor before pushing back up.',
  '[{"label":"YouTube guide","href":"https://www.youtube.com/watch?v=ryncZFQCB8I"}]'::jsonb,
  FALSE
),
(
  'a9df034c-7303-45bf-9dd0-4f665f659f93',
  $1,
  3,
  'Treadmill Jog',
  'cardio',
  'Start at a comfortable speed on the treadmill, maintain an upright posture, and increase pace gradually as you warm up.',
  '[{"label":"","href":""}]'::jsonb,
  TRUE
),
(
  '50338a31-0730-42f7-b2cb-2b19706fce4c',
  $1,
  4,
  'Bicep Curl',
  'isolation',
  'Stand with a dumbbell in each hand, palms facing forward, and curl the weights up while keeping your elbows close to your torso.',
  '[{"label":"Bicep Curl Technique","href":"https://www.verywellfit.com/how-to-do-the-biceps-arm-curl-3498604"},{"label":"Video instruction","href":"https://www.youtube.com/watch?v=XE_pHwbst04"}]'::jsonb,
  FALSE
),
(
  'da3a8850-fa8f-4ad9-9ed9-38b80f896f0f',
  $1,
  5,
  'Hamstring Stretch',
  'stretching',
  'Sit on the floor with one leg extended, lean forward from your hips, and reach for your toes to stretch the back of your thigh.',
  '[{"label":"","href":""}]'::jsonb,
  TRUE
),
(
  '15d6c2ab-508d-4af2-8bd4-4942786c0376',
  $1,
  6,
  'Bench Press',
  'compound',
  'Lie on the bench with feet on the floor, grip the bar slightly wider than shoulder-width, and lower it to your chest before pressing up.',
  '[{"label":"Variations","href":"https://www.healthline.com/health/exercise-fitness/bench-press-muscles-worked#how-to"},{"label":"Barbell Technique vid","href":"https://www.youtube.com/watch?v=hWbUlkb5Ms4"},{"label":"How To: Dumbbell Incline Press","href":"https://www.youtube.com/watch?v=hChjZQhX1Ls"}]'::jsonb,
  FALSE
),
(
  '7260bf2b-27d3-47b5-bc3a-5add01049f1c',
  $1,
  7,
  'Plank',
  'no type',
  'Place your forearms on the ground, keep your body straight from head to heels, and hold the position while engaging your core.',
  '[{"label":"","href":""}]'::jsonb,
  TRUE
),
(
  'b380f43f-1b06-4d55-80f3-84257871ac55',
  $1,
  8,
  'Deadlift',
  'compound',
  'Stand with feet under the barbell, bend at the hips and knees to grab the bar, then lift by driving through your heels and extending your hips.',
  '[{"label":"How to Deadlift with Proper Form guide","href":"https://stronglifts.com/deadlift/"}]'::jsonb,
  FALSE
),
(
  'a6bb7bf4-8d01-4ce5-8145-57da2cfc02bc',
  $1,
  9,
  'Lunge',
  'compound',
  'Step one foot forward, bend both knees to lower your body, and push back through your front heel to return to the starting position.',
  '[{"label":"Forward Lunge","href":"https://www.acefitness.org/resources/everyone/exercise-library/94/forward-lunge/?srsltid=AfmBOopUXLLCO6HIHx2WP_TtSTs3Kun9ZYuurWqclVOI-7DaGWbu2Tp4"},{"label":"Lunge Variations","href":"https://www.mensjournal.com/health-fitness/best-lunge-variations"}]'::jsonb,
  FALSE
),
(
  'c1aa317f-858a-48b0-b1f6-1947ea36b8f6',
  $1,
  10,
  'Jumping Jacks',
  'cardio',
  'Start with feet together and arms at your sides, then jump out while raising your arms overhead before returning to the starting position.',
  '[{"label":"quick demo video","href":"https://www.youtube.com/watch?v=4QcSLaqUJBo"}]'::jsonb,
  TRUE
);
`;

export default demoExerisesQuery;
