import { SensorData, SensorType } from "@skyfld-demo/api-interfaces";

export const mockedSensorData: SensorData[] = [
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