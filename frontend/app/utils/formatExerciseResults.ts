import generateRandomId from './generateRandomId';

export function fromatResultDate(resultDate: string) {
  return new Date(resultDate).toLocaleDateString('en-GB').replace(/\//g, '.');
}

export function countTotalSetAmount(setsArr: ResultSet[]) {
  return setsArr.reduce((acc, el, i) => acc + +el.setAmount, 0);
}

function formatSets(result: Result) {
  const resultDate = fromatResultDate(result.resultDate);

  const formattedSets: ResultSet[] = [];

  const totalSetAmount = countTotalSetAmount(result.resultSets);

  result.resultSets.forEach((x, i) => {
    const formattedId = x.setId || generateRandomId().toString();
    return formattedSets.push({
      ...x,
      isFirstSet: i === 0,
      isLastSet: i === result.resultSets.length - 1,
      totalSets: totalSetAmount,
      setId: formattedId,
      resultDate,
    });
  });
  return formattedSets;
}

export default function formatExerciseResults(results: Result[]) {
  return results.map((result) => formatSets(result)).flat();
}
