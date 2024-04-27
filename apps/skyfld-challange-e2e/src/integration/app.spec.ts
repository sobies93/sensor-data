describe('Sensor Data', () => {
  beforeEach(() => {
    cy.visit('/'); // Assuming the app starts at the root URL
  });

  it('should add sensor data', () => {
    cy.get('input[name="temperature"]').type('25');
    cy.get('input[name="humidity"]').type('50');

    cy.get('button[type="submit"]').click();

    cy.contains('Succeed to save sensor data');

    cy.contains('25');
    cy.contains('50');
  });
});