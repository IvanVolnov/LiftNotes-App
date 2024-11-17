function formatSets(result: Result) {
  const resultDate = new Date(result.resultDate)
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const sameResultsId: string[] = [];
  const formattedSets: ResultSet[] = [];

  result.sets.forEach((x, i) => {
    const duples = result.sets.filter(
      (y) =>
        x.reps === y.reps &&
        x.weightAmount === y.weightAmount &&
        x.weightUnit === y.weightUnit
    );
    if (sameResultsId.includes(duples[0].setId)) return;
    if (duples.length > 1) {
      sameResultsId.push(duples[0].setId);
    }

    return formattedSets.push({
      ...x,
      isFirstSet: i === 0,
      isLastSet: x.setNumber + duples.length === result.sets.length + 1,
      setAmount: duples.length,
      totalSets: result.sets.length,
      setId: `formatted-${x.setId}`,
      resultDate,
    });
  });
  return formattedSets;
}

export default function formatExerciseResults(results: Result[]) {
  return results.map((result) => formatSets(result)).flat();
}
