import { Request, Response } from 'express';
import { getSensorData as fetchSensorData, createSensorData } from '../services/sensorService';
import { handleError } from '../utils/handleError';

export const getSensorData = (req: Request, res: Response) => {
  try {
    const sensorData = fetchSensorData();
    res.json(sensorData).status(200);
  } catch (error) {
    res.status(500).json({ error: handleError(error.toString()) });
  }
};

export const addSensorData = (req: Request, res: Response) => {
  try {
    createSensorData(req.body);
    res.status(201).json({ message: 'Sensor data stored successfully' });
  } catch (error) {
    res.status(500).json({ error: handleError(error.toString())});
  }
};
