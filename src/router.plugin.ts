import { Router } from 'express';
import { nmgwRouter } from './nmgw/nmgw.routes'
import { usmpRouter } from './usmp/usmp.routes'

export const routers = Router();

routers.use('/api/v1/nmgw/', nmgwRouter);
routers.use('/api/usmp/', usmpRouter);
