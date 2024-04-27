import React from 'react';
import { useSensorContext } from './../../contexts/SensorDataContext';
import SensorDashboard from '../presentational/SensorDashboard';

const SensorDashboardContainer: React.FC = () => {
    const { sensorData } = useSensorContext();

    return <SensorDashboard sensorData={sensorData} />;
};

export default SensorDashboardContainer;