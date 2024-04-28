// it should be renamed do StoreContex, content should be refactored to separate files for better structure and readability, consider using useReducer
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SensorData, SensorDataRequest } from '@skyfld-demo/api-interfaces';
import { RequestState, SnackbarLevel } from '../types';

interface SensorContextType {
  sensorData: SensorData[];
  requestState: RequestState;
  error: string | null;
  saveSensorData: (data: SensorDataRequest) => Promise<void>;
  fetchSensorData: () => Promise<void>;
  snackbarOpen: boolean;
  snackbarMessage: string;
  handleSnackbarClose: () => void;
  snackbarLevel: SnackbarLevel | undefined;
}

const initialSensorContext: Pick<SensorContextType, 'sensorData' | 'requestState' | 'error'> = {
  sensorData: [],
  requestState: RequestState.Idle,
  error: null,
};

const SensorContext = createContext<SensorContextType | undefined>(undefined);

export const useSensorContext = () => {
  const context = useContext(SensorContext);
  if (!context) {
    throw new Error('useSensorContext must be used within a SensorProvider');
  }
  return context;
};

export const SensorProvider: React.FC = ({ children }) => {
  const [sensorData, setSensorData] = useState<SensorData[]>(initialSensorContext.sensorData);
  const [requestState, setRequestState] = useState<RequestState>(initialSensorContext.requestState);
  const [error, setError] = useState<string | null>(initialSensorContext.error);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>('');
  const [snackbarLevel, setSnackbarLevel] = useState<SnackbarLevel | undefined>(undefined);

  const saveSensorData = async (data: SensorDataRequest) => {
    try {
      setRequestState(RequestState.Loading);
      const response = await fetch('/api/sensorData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok || responseData.error) {
        throw new Error(responseData.error || 'Failed to save sensor data');
      }
      setRequestState(RequestState.Success);
      showMessage('Succeed to save sensor data', SnackbarLevel.Success);
      fetchSensorData();
      return responseData;

    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage);
      showMessage(errorMessage, SnackbarLevel.Error);
      setRequestState(RequestState.Error);
      return {error: errorMessage};
    }
  };

  const showMessage = (message: string, level?: SnackbarLevel) => {
    setSnackbarMessage(message);
    setSnackbarLevel(level)
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchSensorData = async (showPrompt?: boolean) => {
    try {
      const response = await fetch('/api/sensorData');
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to fetch sensor data');
      }
      const data = await response.json();
      setSensorData(data);
      if (showPrompt) {
        showMessage("Data was fetched")
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setError(errorMessage);
      showMessage(errorMessage, SnackbarLevel.Error);
      setRequestState(RequestState.Error);
    }
  };

  useEffect(() => {
    fetchSensorData(true);
  }, []);

  useEffect(() => {
    const worker = new Worker(new URL("./../workers/refreshWorker.ts", import.meta.url));

    // Listen for messages from the worker
    worker.onmessage = (event) => {
      if (event.data === 'fetchData') {
        fetchSensorData(true); // Trigger fetchData action from context API
      }
    };

    // Start the worker
    worker.postMessage('start');

    // Cleanup function to terminate the worker when the component unmounts
    return () => {
      worker.terminate();
    };
  }, []);

  return (
    <SensorContext.Provider value={{ sensorData, requestState, error, saveSensorData, fetchSensorData, handleSnackbarClose, snackbarLevel, snackbarMessage, snackbarOpen }}>
      {children}
    </SensorContext.Provider>
  );
};
