import express from 'express';
import { json } from 'body-parser';
import { nmgwRouter } from './src/nmgw.app';

const app = express();
const port = 3000;

app.use(json());

// Use the router from nmgw.app.ts
app.use('/api/nmgw/', nmgwRouter);

// Start the server
app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
