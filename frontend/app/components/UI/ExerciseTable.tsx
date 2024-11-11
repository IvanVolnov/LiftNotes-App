import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface CustomProps {
  results: Result[];
}

export default function ExerciseTable({ results }: CustomProps) {
  return (
    <TableContainer component={Paper} sx={{ backgroundColor: 'transparent' }}>
      <Table size='small' aria-label='a dense table'>
        <TableHead>
          <TableRow>
            <TableCell>date</TableCell>
            <TableCell>sets</TableCell>
            <TableCell>reps</TableCell>
            <TableCell>weight</TableCell>
            <TableCell>weight</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {results.sets.map((set) => (
            <TableRow
              key={set.resultId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component='th' scope='row'>
                {new Date(results.resultDate)
                  .toLocaleDateString('en-GB')
                  .replace(/\//g, '.')}
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
