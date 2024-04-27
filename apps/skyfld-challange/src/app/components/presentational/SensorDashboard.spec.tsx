import React from 'react';
import { render } from '@testing-library/react';
import SensorDashboard from './SensorDashboard';
import { SensorType } from '@skyfld-demo/api-interfaces';

const mockSensorData = [
  { id: 'mocked1', type: SensorType.THERMISTORS , temperature: 25, humidity: 50, createdAt: 0, updatedAt: 0},
  { id: 'mocked2', type: SensorType.THERMOCOUPLES, temperature: 20, humidity: 60, createdAt: 0, updatedAt: 0 },
];

test('renders sensor data correctly', () => {
  const { getByText } = render(<SensorDashboard sensorData={mockSensorData} />);
  
  // TODO use some better methods
  mockSensorData.forEach((sensor) => {
    expect(getByText(sensor.id).textContent).toContain(sensor.id);
    expect(getByText(sensor.type).textContent).toContain(sensor.type);
    expect(getByText(sensor.temperature.toString()).textContent).toContain(sensor.temperature.toString());
    expect(getByText(sensor.humidity.toString()).textContent).toContain(sensor.humidity.toString());
  });
});
