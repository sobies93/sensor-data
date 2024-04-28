import { v4 as uuidv4 } from 'uuid';
import { SensorData, SensorDataRequest, SensorType } from '@skyfld-demo/api-interfaces';
import { validateHumidity, validateTemperature } from '@skyfld-demo/validation';
import { mockedSensorData } from '@skyfld-demo/mocked-data';

const MAX_SENSOR_DATA_ERROR_EXAMPLE = 4;

const sensorData = mockedSensorData;
export const getSensorData = () => {
  return sensorData;
};

export const createSensorData = (data: SensorDataRequest) => {
  const { type, temperature, humidity } = data;

  if(sensorData.length >= MAX_SENSOR_DATA_ERROR_EXAMPLE) {
    throw new Error('Unable to save');
  }
  if (!humidity || !validateHumidity(humidity)) {
    throw new Error('Invalid humidity');
  }

  if (!temperature || !validateTemperature(temperature)) {
    throw new Error('Invalid temperature');
  }

  if (!type || !Object.values(SensorType).includes(type)) {
    throw new Error('Invalid sensor type');
  }

  const id = uuidv4();
  const createdAt = Date.now();
  const updatedAt = Date.now();

  const newSensorData: SensorData = {
    id,
    type,
    humidity,
    temperature,
    createdAt,
    updatedAt,
  };

  sensorData.push(newSensorData);
};
