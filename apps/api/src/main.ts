import { app } from "./app/app";

const port = process.env.port || 4000;

const server = app.listen(port, () => {
  console.log('Listening at http://localhost:' + port + '/api');
});

server.on('error', console.error);
