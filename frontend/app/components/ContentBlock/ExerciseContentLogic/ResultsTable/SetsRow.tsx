import { TableCell, TableRow } from '@mui/material';

interface CustomProps {
  set: ResultSet;
}

export default function SetsRow({ set }: CustomProps) {
  return (
    <TableRow
      key={set.setId}
      sx={{
        '& > td': !set.isLastSet ? { borderBottom: 0 } : {},
        '&:last-child td, &:last-child th': { border: 0 },
      }}
    >
      <TableCell>{set.isFirstSet && set.resultDate}</TableCell>
      <TableCell padding='none' align='right'>
        {set.setAmount}
      </TableCell>
      <TableCell padding='none' align='right'>
        {set.reps}
      </TableCell>
      <TableCell padding='none' align='right'>
        {set.weightAmount}
      </TableCell>
      <TableCell>{set.weightUnit}</TableCell>
    </TableRow>
  );
}
