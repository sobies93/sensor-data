import React from 'react';
import { SensorProvider } from './contexts/SensorDataContext';
import SensorFormContainer from './components/containers/SensorFormContainer';
import SensorDashboardContainer from './components/containers/SensorDashboardContainer';
import SnackbarContainer from './components/containers/SnackbarContainer';


export const App = () => {
  return (
      <SensorProvider>
        <SensorDashboardContainer />
        <SensorFormContainer />
        <SnackbarContainer />
      </SensorProvider>
  );
};

export default App;
