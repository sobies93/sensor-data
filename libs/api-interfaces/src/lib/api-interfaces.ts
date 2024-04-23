export interface SensorData {
  id: string;
  humidity: number;
  // add validation for absolute zero
  temperature: number; 
  type: SensorType;
  createdAt: number;
  updatedAt: number;
};

// const enum ?
export enum SensorType {
  THERMOCOUPLES,
  THERMISTORS,
} ;