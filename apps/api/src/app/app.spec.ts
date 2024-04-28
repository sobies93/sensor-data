import request = require('supertest');

import { app } from './app';
import { mockedSensorData } from '@skyfld-demo/mocked-data';

describe('Sensor Controller', () => {
  describe('create task', () => {
      test('GET /api/sensorData', async () => {
        const response = await request(app).get('/api/sensorData');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array); 
        expect(response.body).toEqual(mockedSensorData);
      });
    
      test('POST /api/sensorData', async () => {
        const requestData = {
          type: 'THERMISTORS',
          temperature: 25,
          humidity: 50,
        };
    
        const response = await request(app).post('/api/sensorData').send(requestData);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message', 'Sensor data stored successfully');
        // You can add more specific assertions here based on the expected response data
      });
    
      // Add more tests for other endpoints as needed
    });
});
