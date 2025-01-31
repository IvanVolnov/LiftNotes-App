import { allExerciseResults } from './demoResults.js';

/**
 * Generates a random timestamp string (YYYY-MM-DD HH:mm:ss)
 * between `start` and `end` dates.
 */
function getRandomTimestamp(start: Date, end: Date): string {
  const startMs = start.getTime();
  const endMs = end.getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);
  const randomDate = new Date(randomMs);

  // Format as "YYYY-MM-DD HH:mm:ss"
  const year = randomDate.getFullYear();
  const mon = String(randomDate.getMonth() + 1).padStart(2, '0');
  const day = String(randomDate.getDate()).padStart(2, '0');
  const hour = String(randomDate.getHours()).padStart(2, '0');
  const min = String(randomDate.getMinutes()).padStart(2, '0');
  const sec = String(randomDate.getSeconds()).padStart(2, '0');

  return `${year}-${mon}-${day} ${hour}:${min}:${sec}`;
}

/**
 * Build a large string of INSERT statements for the `results` table.
 */
export default function generateDemoResults(): string {
  const insertStatements: string[] = [];

  // Get today's date
  const END_DATE = new Date(); // "today"

  // Clone "today" and subtract one year from it
  const START_DATE = new Date();
  START_DATE.setFullYear(START_DATE.getFullYear() - 1);

  // Loop over each exerciseId in our big object
  for (const [exerciseId, resultsArray] of Object.entries(allExerciseResults)) {
    // For each Result in that array
    for (const result of resultsArray) {
      // Generate  result_date
      const resultDate = getRandomTimestamp(START_DATE, END_DATE);

      // Convert the resultSets array to valid JSON
      // We'll use single quotes around the whole JSON, then ::jsonb cast
      const resultSetsJson = JSON.stringify(result.resultSets);

      // Build the INSERT
      const sql = `
INSERT INTO results (
  result_id,
  exercise_id,
  result_date,
  result_sets
)
VALUES (
  '${result.resultId}', 
  '${exerciseId}',
  '${resultDate}',
  '${resultSetsJson}'::jsonb
);`.trim();

      insertStatements.push(sql);
    }
  }

  // Join all INSERTs into one big block
  return insertStatements.join('\n');
}
