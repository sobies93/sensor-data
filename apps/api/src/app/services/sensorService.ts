import { v4 as uuidv4 } from 'uuid';
import { SensorData, SensorDataRequest, SensorType } from '@skyfld-demo/api-interfaces';
import { validateHumidity, validateTemperature } from '@skyfld-demo/validation';

const sensorData: SensorData[] = [
  {
    id: "e577518b-5c6d-4b63-bc44-07b9f9c8ee46",
    humidity: 50,
    temperature: 25,
    type: SensorType.THERMISTORS,
    createdAt: 1637938800,
    updatedAt: 1637938800,
  },
  {
    id: "80a098fb-50b9-42d2-b60b-22f6c3017f8e",
    humidity: 60,
    temperature: 22,
    type: SensorType.THERMISTORS,
    createdAt: 1637848800,
    updatedAt: 1637848800,
  },
  {
    id: "4dc091e3-d2c8-41cb-b8b0-d8be5930104c",
    humidity: 70,
    temperature: 20,
    type: SensorType.THERMISTORS,
    createdAt: 1637758800,
    updatedAt: 1637758800,
  },
];

const MAX_SENSOR_DATA_ERROR_EXAMPLE = 4;

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
