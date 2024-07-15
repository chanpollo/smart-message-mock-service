import { Router, Request, Response, json } from 'express';

export const nmgwRouter = Router();

type TBody = {
  senderName: string
  destinationNumber:string
  serviceNumber: string
  content: string
}

type TResponse = {
  resultCode: string
  resultStatus: string
  developerMessage: string
  resultData: { 
    smIdList: string[]
  } 
}

nmgwRouter.post('/send-sms', (req: Request, res: Response) => {
  const ret: TResponse = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success",
    resultData: { 
      smIdList: []
    } 
}
  const body = req.body as TBody
  if (!body.content) return res.status(400).send('missing or invalid content')

  if (body.content.includes('flag=1,')) {
    ret.resultData.smIdList = generateSmIds(1)
  } else if (body.content.includes('flag=2,')) {
    ret.resultData.smIdList = generateSmIds(2)
  } else if (body.content.includes('flag=3,')) {
    ret.resultData.smIdList = generateSmIds(3)
  } else {
    res.status(400).send('missing or invalid content must have flag')
  }

  return res.json(ret)
});

function generateSmIds(n: number): string[] {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const length = 15;
  const smIds: Set<string> = new Set();

  while (smIds.size < n) {
    let smId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      smId += characters[randomIndex];
    }
    smIds.add(smId);
  }

  return Array.from(smIds);
}
