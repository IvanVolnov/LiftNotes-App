import { TableCell, TableRow } from '@mui/material';
import { yellow } from '@mui/material/colors';

interface CustomProps {
  result: Result;
}

export default function SetsRows({ result }: CustomProps) {
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
      setAmount: duples.length,
      setId: `formatted-${x.setId}`,
    });
  });
  // console.log(formattedSets);

  return (
    <>
      {formattedSets.map((set, i) => (
        <TableRow
          key={set.setId}
          sx={{
            '& > td':
              i !== formattedSets?.length - 1 ? { borderBottom: 0 } : {},
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell>{i === 0 && resultDate}</TableCell>
          <TableCell align='right'>{set.setAmount}</TableCell>
          <TableCell align='right'>{set.reps}</TableCell>
          <TableCell align='right'>{set.weightAmount}</TableCell>
          <TableCell>{set.weightUnit}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
