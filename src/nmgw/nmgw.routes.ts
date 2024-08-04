import { Router } from 'express';
import { getPartnerProfile, internalProfile, newPartnerProfile, sendMsg } from './nmgw.controller'
export const nmgwRouter = Router();

nmgwRouter.post('/api/v3/sendmsg.json', sendMsg)
nmgwRouter.post('/api/v3/bulksms/profile/internal_profile', internalProfile)

nmgwRouter.post('/new-profile', newPartnerProfile)
nmgwRouter.get('/api/v3/bulksms/profile/stg_profile', getPartnerProfile)
nmgwRouter.get('/api/v3/bizlive/profile/stg_profile', getPartnerProfile)