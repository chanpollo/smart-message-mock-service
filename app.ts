import express from 'express';
import { nmgwRouter } from './src/nmgw.app';
const app = express();
const port = 3000;
app.use(express.json({}));
app.use('/api/v1/nmgw/', nmgwRouter);

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
