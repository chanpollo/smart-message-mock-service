import { Router } from 'express';
import { nmgwRouter } from './nmgw/nmgw.routes'
import { usmpRouter } from './usmp/usmp.routes'

export const routers = Router();
routers.use('/nmgw/', nmgwRouter);
routers.use('/api/usmp/', usmpRouter);
