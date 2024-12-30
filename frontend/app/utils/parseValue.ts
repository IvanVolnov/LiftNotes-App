export default function parseValue(key: keyof ResultSet, val: string) {
  const numericFields: (keyof ResultSet)[] = [
    'setNumber',
    'reps',
    'weightAmount',
    'totalSets',
    'setAmount',
  ];
  if (numericFields.includes(key)) {
    return Number(val);
  }
  return val;
}
