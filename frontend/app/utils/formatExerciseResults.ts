function formatSets(result: Result) {
  const resultDate = new Date(result.resultDate)
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const formattedSets: ResultSet[] = [];

  const totalSetAmount = result.resultSets.reduce(
    (acc, el, i) => acc + el.setAmount,
    0
  );

  result.resultSets.forEach((x, i) => {
    return formattedSets.push({
      ...x,
      isFirstSet: i === 0,
      isLastSet: i === result.resultSets.length - 1,
      totalSets: totalSetAmount,
      setId: `formatted-${x.setId}`,
      resultDate,
    });
  });
  return formattedSets;
}

export default function formatExerciseResults(results: Result[]) {
  return results.map((result) => formatSets(result)).flat();
}
