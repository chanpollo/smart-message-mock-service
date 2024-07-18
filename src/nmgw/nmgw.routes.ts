import { Router } from 'express';
import { checkCharging, sendSmsController } from './nmgw.controller'
export const nmgwRouter = Router();

nmgwRouter.post('/send-sms', sendSmsController)
nmgwRouter.post('/charging-info', checkCharging)
