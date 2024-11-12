import { TableCell, TableRow } from '@mui/material';

interface CustomProps {
  result: Result;
}

export default function SetsRows({ result }: CustomProps) {
  const resultDate = new Date(result.resultDate)
    .toLocaleDateString('en-GB')
    .replace(/\//g, '.');

  const formattedResult = result;

  return (
    <>
      {result.sets.map((set, i) => (
        <TableRow
          key={set.setId}
          sx={{
            '& > td': i !== result.sets.length - 1 ? { borderBottom: 0 } : {},
            '&:last-child td, &:last-child th': { border: 0 },
          }}
        >
          <TableCell>{i === 0 && resultDate}</TableCell>
          <TableCell align='right'>{set.sets}</TableCell>
          <TableCell align='right'>{set.reps}</TableCell>
          <TableCell align='right'>{set.weightAmount}</TableCell>
          <TableCell>{set.weightUnit}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
