import { createSensorData, getSensorData } from './sensorService'; // Import the functions to be tested
import { SensorDataRequest, SensorType } from '@skyfld-demo/api-interfaces';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked_uuid'),
}));

describe('successfullyCreateSensorData', () => {
  test('throws error for invalid input', () => {
    const invalidData: SensorDataRequest = {
      type: SensorType.THERMISTORS,
      humidity: 150,
      temperature: 25,
    };

    expect(() => createSensorData(invalidData)).toThrow('Invalid humidity');

    expect(getSensorData().length).toBe(3);
  });

  test('creates sensor data with valid input', () => {
    const validData: SensorDataRequest = {
      type: SensorType.THERMISTORS,
      humidity: 50,
      temperature: 25,
    };

    createSensorData(validData);

    expect(getSensorData().length).toBe(4);

    expect(getSensorData()[3]).toEqual({
      id: 'mocked_uuid',
      type: SensorType.THERMISTORS,
      humidity: 50,
      temperature: 25,
      createdAt: expect.any(Number),
      updatedAt: expect.any(Number),
    });
  });

  test('throws error when reaching maximum sensor data', () => {

    expect(getSensorData().length).toBe(4);

    const data: SensorDataRequest = {
      type: SensorType.THERMISTORS,
      humidity: 80,
      temperature: 30,
    };
    expect(() => createSensorData(data)).toThrow('Unable to save');

    expect(getSensorData().length).toBe(4);
  });
});
