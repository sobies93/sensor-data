import React from 'react';
import { Snackbar as MuiSnackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useSensorContext } from '../contexts/SensorDataContext';

const Snackbar: React.FC = () => {
const { snackbarMessage, snackbarOpen, handleSnackbarClose } = useSensorContext();

  return (
    <MuiSnackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <SnackbarContent
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </MuiSnackbar>
  );
};

export default Snackbar;
