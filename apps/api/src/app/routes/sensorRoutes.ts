import * as express from 'express';
import { getSensorData, addSensorData } from '../controllers/sensorController';

export const sensorRouter = express.Router();

sensorRouter.get('/', getSensorData);
sensorRouter.post('/', addSensorData);

