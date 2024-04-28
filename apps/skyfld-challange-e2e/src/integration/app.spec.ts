import { mockedSensorData } from '@skyfld-demo/mocked-data';


describe('Sensor Data', () => {
  it('should fetch sensor data', () => {
    // mock data as fast solution to resolve proxy issue
    cy.intercept('GET', '/api/sensorData', mockedSensorData).as(
      'getSensorData'
    );

    cy.visit('/');

    // Wait for the request to complete
    cy.wait('@getSensorData').then((interception) => {
      // Assert that the request was made
      expect(interception.request.url).to.contain('/api/sensorData');
      expect(interception.response.statusCode).to.eq(200);
    });

    mockedSensorData.forEach((data) => {
      cy.contains(data.id); 
      cy.contains(data.temperature); 
      cy.contains(data.humidity);
      cy.contains(data.type);
    });
  });
});
