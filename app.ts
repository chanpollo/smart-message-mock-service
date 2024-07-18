import express from 'express';
import { routers } from './src/router.plugin'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(routers)

const server = app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
})

const handleShutdown = () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);
