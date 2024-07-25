import { Router } from 'express';
import { internalProfile, newPartnerProfile, sendMsg } from './nmgw.controller'
export const nmgwRouter = Router();

nmgwRouter.post('/api/v3/sendmsg.json', sendMsg)
nmgwRouter.post('/api/v3/bulksms/profile/internal_profile', internalProfile)
nmgwRouter.post('/new-profile', newPartnerProfile)
