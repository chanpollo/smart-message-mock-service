export type TBody = {
  senderName: string
  destinationNumber:string
  serviceNumber: string
  content: string
}

export type TResponse = {
  resultCode: string
  resultStatus: string
  developerMessage: string
  resultData: { 
    smIdList: string[]
  } 
}