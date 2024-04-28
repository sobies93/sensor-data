

# SkyfldDemo

This project was generated using [Nx](https://nx.dev).

Project contains simple React app `skyfld-challange` with store kept via ContextApi and Express app called `api` serving as simple API handling create and read operations on mocked in memory storage. Additional libs holds mocked data, validation and description of api interfaces.

UI was created using MuiUI. Refreshing data every 30 seconds is achieved using Web Worker.

## Running the app
Run 
```
nmp install
```
Then run
```
nmp start
```
The app will be loaded at localhost:4200

## Running unit tests

Run `npm run test` to execute the unit tests via [Jest](https://jestjs.io) and a basic test to verify the functionality of the API endpoints.

## Running end-to-end tests

Run `nx e2e skyfld-challange-e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io) to run basic test for the frontend to check that sensor data is correctly fetched and displayed. Since some issues with proxing API was mocked.

