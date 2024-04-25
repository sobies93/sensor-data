import React from 'react';
import SensorDashboard from './components/sensorDashboard';
import { SensorProvider } from './contexts/SensorDataContext';
import SensorForm from './components/SensorForm';
import Snackbar from './components/Snackbar';


export const App = () => {
  return (
      <SensorProvider>
        <SensorDashboard />
        <SensorForm />
        <Snackbar />
      </SensorProvider>
  );
};

export default App;
