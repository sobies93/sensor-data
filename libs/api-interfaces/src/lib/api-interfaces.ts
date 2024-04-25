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
  THERMOCOUPLES = 'THERMOCOUPLES',
  THERMISTORS = 'THERMISTORS',
} ;

export type SensorDataRequest = Pick<SensorData, 'type' | 'temperature' | 'humidity'>;
