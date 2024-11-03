export default function areArraysEqualUnordered(arr1: any[], arr2: any[]) {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = arr1.map((obj) => JSON.stringify(obj)).sort();
  const sortedArr2 = arr2.map((obj) => JSON.stringify(obj)).sort();

  return sortedArr1.every((obj, index) => obj === sortedArr2[index]);
}
