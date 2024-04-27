import React from 'react';
import { useSensorContext } from '../../contexts/SensorDataContext';
import Snackbar from '../presentational/Snackbar';

const SnackbarContainer: React.FC = () => {
const { snackbarMessage, snackbarOpen, handleSnackbarClose } = useSensorContext();

  return (
    <Snackbar snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} handleSnackbarClose={handleSnackbarClose} />
  );
};

export default SnackbarContainer;
