import { Request, Response } from 'express';
import { TBody, TResponse } from './nmgw.interface';
import { logger } from './tps.logger';

let startTime = Date.now();
let requestCount = 1;
let totalRequests = 0;
let maxTPS = 0;
let minTPS = Infinity;
let tpsValues: number[] = [];
let logInterval: NodeJS.Timeout | null = null;
let stopLoggingTimeout: NodeJS.Timeout | null = null;

const calculateTPS = () => {
  const currentTime = Date.now();
  const elapsedTimeInSeconds = (currentTime - startTime) / 1000;
  const tps = Math.floor(requestCount / elapsedTimeInSeconds)

  if (tps > 0) {
    tpsValues.push(tps);
    totalRequests += requestCount;
    maxTPS = Math.max(maxTPS, tps);
    minTPS = Math.min(minTPS, tps);
  }

  const nonZeroTPSValues = tpsValues.filter(value => value > 0);
  const avgTPS = nonZeroTPSValues.reduce((acc, val) => acc + val, 0) / nonZeroTPSValues.length;
  const logMessage = `TPS: ${tps.toFixed(2)}, Avg TPS: ${avgTPS.toFixed(2)}, Max TPS: ${maxTPS.toFixed(2)}, Min TPS: ${minTPS === Infinity ? 0 : minTPS.toFixed(2)}, Total Msg: ${totalRequests}`;

  logger.info(logMessage);

  requestCount = 0;
  startTime = currentTime;
};

const startLogging = () => {
  if (!logInterval) {
    logInterval = setInterval(calculateTPS, 1000);
    console.log("Logging started.");
  }
};

const stopLogging = () => {
  if (logInterval) {
    clearInterval(logInterval);
    logInterval = null;
    console.log("Logging stopped due to inactivity and reset counting.");
    requestCount = 0;
    totalRequests = 0;
    maxTPS = 0;
    minTPS = Infinity;
    tpsValues = [];
  }
};

const resetStopLoggingTimeout = () => {
  if (stopLoggingTimeout) {
    clearTimeout(stopLoggingTimeout);
  }
  stopLoggingTimeout = setTimeout(stopLogging, 10000);
};

export const sendSmsController = (req: Request, res: Response) => {
  requestCount++;

  if (!logInterval) {
    startLogging();
  }
  resetStopLoggingTimeout();

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
    res.status(400).send('missing or invalid content must have flag or flag allow 1, 2, 3')
  }

  return res.json(ret)
}

export const checkCharging = (req: Request, res: Response) => {
  const ret = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success",
    resultData: { 
      chargeNumber: '',
      status: 'Active'
    }
  }
  return res.json(ret)
}

export const newPartnerProfile = (req: Request, res: Response) => {
  const response = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success"
  }
  return res.status(201).json(response)
}

function generateSmIds(n: number): string[] {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const length = 15
  const smIds: Set<string> = new Set()

  while (smIds.size < n) {
    let smId = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      smId += characters[randomIndex]
    }
    smIds.add(smId)
  }

  return Array.from(smIds)
}
