import { Router } from 'express';
import { nmgwRouter } from './nmgw/nmgw.routes'

export const routers = Router();

routers.use('/api/v1/nmgw/', nmgwRouter);
