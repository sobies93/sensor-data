import * as express from 'express';
import { v4 as uuidv4 } from 'uuid';

import { SensorData, SensorDataRequest, SensorType } from '@skyfld-demo/api-interfaces';
import { validateHumidity, validateTemperature } from '@skyfld-demo/validation';

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

// TODO get that from .env
const LENGTH_TO_TRIGGER_SAVING_ERROR = 6;
const isProduction = false;
const GENERIC_ERROR = 'The error has ocurred';

const getSensorData = () => sensorData; 

// TODO put sensorRouter to separate file
sensorRouter.get('/', (req, res) => {
  res.json(getSensorData()).status(200);
});

// TODO put sensorRouter to controller file
sensorRouter.post('/', (req, res) => {
  const { type, temperature, humidity } = req.body as SensorDataRequest;

  if (!humidity || !validateHumidity(humidity)) {
    return res.json({ error: 'Invalid humidity' }).status(400);
  }

  if (!temperature || !validateTemperature(temperature)) {
    return res.json({ error: 'Invalid temperature' }).status(400);
  }

  if (!type || !Object.values(SensorType).includes(type)) {
    return res.json({ error: 'Invalid sensor type' }).status(400);
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
      // throw new Error('Unable to save')
      return res.status(500).json({error: "Unable to save" });
    }
    sensorData.push(newSensorData);
    res.status(201).json({ message: 'Sensor data stored successfully', data: newSensorData });
  } catch (error) {
    const message = isProduction ? GENERIC_ERROR : error.toString();
    res.status(500).json({message });
  }

});

app.use('/api/sensorData', sensorRouter);

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
