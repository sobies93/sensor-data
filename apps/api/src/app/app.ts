import * as express from 'express';
import { sensorRouter } from './routes/sensorRoutes';

export const app = express();

app.use(express.json());

app.use('/api/sensorData', sensorRouter);