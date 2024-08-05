import { Request, Response } from 'express';
import { TBody, TResponse } from './nmgw.interface';
import { logger } from './tps.logger';
import { ParsedQs } from 'qs';

let startTime = Date.now();
let lastLogTime = Date.now();
let requestCount = 0;
let totalRequests = 0;
let maxTPS = 0;
let tpsValues: number[] = [];
let logInterval: NodeJS.Timeout | null = null;
let stopLoggingTimeout: NodeJS.Timeout | null = null;

const calculateTPS = () => {
  const currentTime = Date.now();
  const elapsedTimeInSeconds = (currentTime - lastLogTime) / 1000;
  const cRequest = requestCount

  if (elapsedTimeInSeconds === 0) return;

  const tps = Math.floor(cRequest / elapsedTimeInSeconds);

  if (cRequest > 0) {
    tpsValues.push(tps);
    totalRequests += cRequest;
    maxTPS = Math.max(maxTPS, tps);
  }

  const nonZeroTPSValues = tpsValues.filter(value => value > 0);
  const avgTPS = nonZeroTPSValues.length > 0
    ? nonZeroTPSValues.reduce((acc, val) => acc + val, 0) / nonZeroTPSValues.length
    : 0;

  const logMessage = `TPS: ${tps.toFixed(2)}, Avg TPS: ${avgTPS.toFixed(2)}, Max TPS: ${maxTPS.toFixed(2)}, Total Msg: ${totalRequests}`;

  logger.info(logMessage);

  requestCount = 0;
  lastLogTime = currentTime;
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
    // Reset counts
    requestCount = 0;
    totalRequests = 0;
    maxTPS = 0;
    tpsValues = [];
    startTime = Date.now();
    lastLogTime = Date.now();
  }
};

const resetStopLoggingTimeout = () => {
  if (stopLoggingTimeout) {
    clearTimeout(stopLoggingTimeout);
  }
  stopLoggingTimeout = setTimeout(stopLogging, 5000);
};

export const sendMsg = (req: Request, res: Response) => {
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
  };

  const body = req.body as TBody;
  if (!body.content) return res.status(400).send('missing or invalid content');

  if (body.content.includes('flag=1,')) {
    ret.resultData.smIdList = generateSmIds(1);
  } else if (body.content.includes('flag=2,')) {
    ret.resultData.smIdList = generateSmIds(2);
  } else if (body.content.includes('flag=3,')) {
    ret.resultData.smIdList = generateSmIds(3);
  } else {
    ret.resultData.smIdList = generateSmIds(1);
  }

  return res.json(ret);
};

export const internalProfile = (req: Request, res: Response) => {
  const ret = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success",
    resultData: { profileList: [ { serviceInfo: { suspended: false } } ] }
  };
  return res.json(ret);
};

export const newPartnerProfile = (req: Request, res: Response) => {
  const response = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success"
  };
  return res.status(201).json(response);
};

export const getPartnerProfile = (req: Request, res: Response) => {
  const filter = req.query.filter || "";
  if (!filter) {
    const response = {
      resultCode: "40402",
      resultStatus: "Data not found",
      developerMessage: "Data not found"
    };
    return res.status(500).send(response);
  }
  const extractChargeNumber = (filter: string | string[] | ParsedQs | ParsedQs[]): string | null => {
    if (typeof filter === 'string') {
      const chargeNumberMatch = filter.match(/service\.charge\.chargeNumber=(\d+)/);
      return chargeNumberMatch ? chargeNumberMatch[1] : null;
    }
    return null;
  };

  const chargeNumber = extractChargeNumber(filter);
  if (!chargeNumber) {
    const response = {
      resultCode: "40401",
      resultStatus: "Data not found",
      developerMessage: "Data not found"
    };
    return res.status(500).send(response);
  }

  const path = req.path; 
  const pathSegments = path.split('/').filter(segment => segment);
  let system = "";
  let activeFlag = true;
  if (pathSegments.length >= 3) {
    const part1 = pathSegments[2]; // 'bizlive'
    const part2 = pathSegments[4]; // 'stg_profile'
    system = part1;
  }
  // condition bizlive 1-4 // stg_profile 4-8 // 9 = not fond
  // condition 2/5 = in active
  
  const response = {
    resultCode: "20000",
    resultStatus: "Success",
    developerMessage: "Success",
    resultData : {}
  };
  const lastNumber = Number(chargeNumber.charAt(chargeNumber.length - 1));
  if (lastNumber == 2 || lastNumber == 5){
    activeFlag = false
  }
  if (lastNumber == 9) {
    const response = {
      resultCode: "40401",
      resultStatus: "Data not found",
      developerMessage: "Data not found"
    };
    return res.status(500).send(response);
  } else {
    if (system == "bizlive" && lastNumber <= 4) {
      response.resultData = {
        "profileList": [
          { 
            "profileId": "bizlive_AIS_TEST01",
              "serviceInfo": { 
                "serviceModel" : "111", 
                "cpName" : "AIS", 
                "suspended" : false,
                "deleteDate": "2024-05-09T19:00:00.000+0700",
                "active" : activeFlag,
                "charge":{
                  "ntypeNumber" :"7",
                  "ntypeName" : "3PO",
                }
              }
          },
          { 
            "profileId": "bizlive_AIS_TEST02",
              "serviceInfo": { 
                "serviceModel" : "111", 
                "cpName" : "AIS", 
                "suspended" : false,
                "deleteDate": "",
                "active" : activeFlag,
                "charge":{
                  "ntypeNumber" :"7",
                  "ntypeName" : "3PO",
                }
              }
          }
        ] 
      }
    } else if (system == "bulksms" && lastNumber >= 4) {
      response.resultData = {
        "profileList": [
          { 
            "profileId": "bulksms_AIS_TEST03",
              "serviceInfo": { 
                "serviceModel" : "113", 
                "cpName" : "AIS", 
                "suspended" : false,
                "deleteDate": "",
                "active" : activeFlag,
                "charge":{
                  "ntypeNumber" :"7",
                  "ntypeName" : "3PO",
                }
              }
          },
          { 
            "profileId": "bulksms_AIS_TEST04",
              "serviceInfo": { 
                "serviceModel" : "114", 
                "cpName" : "AIS", 
                "suspended" : false,
                "deleteDate": "",
                "active" : activeFlag,
                "charge":{
                  "ntypeNumber" :"7",
                  "ntypeName" : "3PO",
                }
              }
          }
        ] 
      }
    } else {
      const response = {
        resultCode: "40401",
        resultStatus: "Data not found",
        developerMessage: "Data not found"
      };
      return res.status(500).send(response);
    }
  }
  return res.status(200).json(response);
};

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
