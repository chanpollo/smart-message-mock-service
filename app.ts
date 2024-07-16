import express from 'express';
import { routers } from './src/router.plugin'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(routers)

app.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
})
