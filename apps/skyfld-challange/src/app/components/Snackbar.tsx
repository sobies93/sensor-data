import React from 'react';
import { Snackbar, SnackbarContent, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import { useSensorContext } from '../contexts/SensorDataContext';

const CustomSnackbar: React.FC = () => {
const { snackbarMessage, snackbarOpen, handleSnackbarClose } = useSensorContext();

  return (
    <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
      <SnackbarContent
        message={snackbarMessage}
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default CustomSnackbar;
