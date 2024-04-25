import { SensorDataRequest } from "@skyfld-demo/api-interfaces";

export const validateTemperature = (temperature: number): boolean =>
  temperature > -273;

export const validateHumidity = (humidity: number): boolean =>
  humidity >= 0 && humidity <= 100;

export const validateSensorDataRequest = (sensorData: SensorDataRequest) => 
  validateHumidity(sensorData.humidity) && validateTemperature(sensorData.temperature);