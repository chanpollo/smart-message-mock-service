import { Router } from 'express';
import { getPartnerProfile, internalProfile, newPartnerProfile, sendMsg } from './nmgw.controller'
export const nmgwRouter = Router();

nmgwRouter.post('/api/v3/sendmsg.json', sendMsg)

nmgwRouter.post('/api/v3/bulksms/profile/*', internalProfile)
nmgwRouter.post('/api/v3/bizlive/profile/*', newPartnerProfile)

nmgwRouter.get('/api/v3/bulksms/profile/*', getPartnerProfile)
nmgwRouter.get('/api/v3/bizlive/profile/*', getPartnerProfile)