import { Router } from 'express';
import { inquiryMpagingSubscriber, inquiryOneTimePassword } from './usmp.controller'
export const usmpRouter = Router();

usmpRouter.post('/inquiryOneTimePassword', inquiryOneTimePassword)
usmpRouter.post('/inquiryMpagingSubscriber', inquiryMpagingSubscriber)
