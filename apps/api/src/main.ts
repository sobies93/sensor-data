import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { SensorData, SensorType } from '@skyfld-demo/api-interfaces';

const app = express();

app.use(express.json());

const sensorRouter = express.Router();

const sensorData: SensorData[] = [
  {
    id: "e577518b-5c6d-4b63-bc44-07b9f9c8ee46",
    humidity: 50,
    temperature: 25,
    type: SensorType.THERMISTORS,
    createdAt: 1637938800, // Example timestamps
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

const LENGTH_TO_TRIGGER_SAVING_ERROR = 5;
const isProduction = false;
const GENERIC_ERROR = 'The error has ocurred';

type SensorDataRequest = Pick<SensorData, 'type' | 'temperature' | 'humidity'>;

const getSensorData = () => sensorData; 

sensorRouter.get('/', (req, res) => {
  res.status(200).json(getSensorData());
})

sensorRouter.post('/', (req, res) => {
  const { type, temperature, humidity } = req.body as SensorDataRequest;

  if (!type || !type || temperature) {
    return res.status(400).json({ error: 'Type and value are required' });
  }

  if (!Object.values(SensorType).includes(type)) {
    return res.status(400).json({ error: 'Invalid sensor type' });
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

  try {
    if(sensorData.length + 1 === LENGTH_TO_TRIGGER_SAVING_ERROR) {
      throw new Error('Unable to save')
    }
    sensorData.push(newSensorData);
    res.status(201).json({ message: 'Sensor data stored successfully', data: newSensorData });
  } catch (error) {
    const message = isProduction ? GENERIC_ERROR : error;
    res.send(500).json({message });
  }

});

app.use('/api/sensorData', sensorRouter);

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
