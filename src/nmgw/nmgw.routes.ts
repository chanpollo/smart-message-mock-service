import { Router } from 'express';
import { sendSmsController } from './nmgw.controller'
export const nmgwRouter = Router();

nmgwRouter.post('/send-sms', sendSmsController)
