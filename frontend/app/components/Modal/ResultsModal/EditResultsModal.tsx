import { useModalContext } from '@/app/context/ModalContext';
import {
  Alert,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  countTotalSetAmount,
  fromatResultDate,
} from '@/app/utils/formatExerciseResults';
import DynamicColorBtn from '../../UI/Buttons/DynamicColorBtn';

interface CustomProps {}

export default function EditResultsModal({}: CustomProps) {
  const { mode, toggleModal } = useModalContext();
  const exerciseResults = (mode.modeData as ExerciseNormalised)
    ?.exerciseResults;

  const handleClose = () => {
    toggleModal();
  };

  return (
    <>
      <DialogTitle>manage existing results</DialogTitle>
      <DialogContent>
        <Typography variant='body1' mt={3} mb={2}>
          Results:
        </Typography>
        {!exerciseResults.length && (
          <Alert variant='outlined' severity='info'>
            There are no recorded results in this exercise yet.
          </Alert>
        )}
        <List dense={true}>
          {exerciseResults.map((el) => {
            return (
              <ListItem
                key={el.resultId}
                secondaryAction={
                  <Stack direction='row'>
                    <IconButton
                      aria-label='delete'
                      onClick={() => {
                        toggleModal('result', 'delete', undefined, el, true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label='edit'>
                      <EditIcon
                        onClick={() => {
                          toggleModal('result', 'edit', undefined, el, true);
                        }}
                      />
                    </IconButton>
                  </Stack>
                }
              >
                <ListItemText
                  primary={fromatResultDate(el.resultDate)}
                  secondary={`total sets: ${countTotalSetAmount(
                    el.resultSets
                  )}`}
                />
              </ListItem>
            );
          })}
        </List>
      </DialogContent>
      <DialogActions>
        <DynamicColorBtn onClick={handleClose}>Cancel</DynamicColorBtn>
      </DialogActions>
    </>
  );
}
