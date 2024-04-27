import supertest from 'supertest';

describe('API Endpoints', () => {
  const request = supertest(app);

  test('GET /api/sensorData', async () => {
    const response = await request.get('/api/sensorData');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array); // Assuming the response is an array
    // You can add more specific assertions here based on the expected response data
  });

  test('POST /api/sensorData', async () => {
    const requestData = {
      type: 'THERMISTORS',
      temperature: 25,
      humidity: 50,
    };

    const response = await request.post('/api/sensorData').send(requestData);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'Sensor data stored successfully');
    // You can add more specific assertions here based on the expected response data
  });

  // Add more tests for other endpoints as needed
});
