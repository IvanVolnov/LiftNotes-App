'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import formatExerciseResults from '@/app/utils/formatExerciseResults';
import SetsRow from '../ResultsTable/SetsRow';
import { useState } from 'react';
import TablePaginationActions from '../ResultsTable/TablePaginationActions';
import { Padding } from '@mui/icons-material';

interface CustomProps {
  results: Result[];
}

export default function ExerciseTable({ results }: CustomProps) {
  const fromattedResults = formatExerciseResults(results);
  // console.log(fromattedResults);

  const defaultRowsPerPage = 3;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);

  // // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - fromattedResults.length)
      : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant='body1' mb={1} ml={2}>
        progress history:{' '}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <Table size='small' aria-label='exercise results table'>
          <TableHead>
            <TableRow>
              <TableCell>date</TableCell>
              <TableCell padding='none' align='right'>
                sets
              </TableCell>
              <TableCell padding='none' align='right'>
                reps
              </TableCell>
              <TableCell padding='none' align='right'>
                weight
              </TableCell>
              <TableCell>unit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? fromattedResults.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : fromattedResults
            ).map((result) => (
              <SetsRow key={result.setId} set={result} />
            ))}
          </TableBody>
          {fromattedResults.length > defaultRowsPerPage && (
            <TableFooter>
              <TableRow>
                <TablePagination
                  sx={{
                    gap: '1rem',
                    '&  div': {
                      paddingLeft: '0rem',
                      marginLeft: '0.5rem',
                      marginRight: '0.5rem',
                    },
                  }}
                  labelRowsPerPage={'per page'}
                  rowsPerPageOptions={[
                    3,
                    4,
                    6,
                    10,
                    { label: 'All', value: -1 },
                  ]}
                  colSpan={5}
                  count={fromattedResults.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'sets per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
