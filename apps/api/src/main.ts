import * as express from 'express';
import { sensorRouter } from './app/routes/sensorRoutes';

const app = express();

app.use(express.json());

app.use('/api/sensorData', sensorRouter);

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
