import { Request, Response } from 'express';

export const inquiryOneTimePassword = (req: Request, res: Response) => {
  const response = `
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        <InquiryOneTimePasswordResponse xmlns="http://vsmp.ais.co.th/webservices/subscriber/">
            <InquiryOneTimePasswordResult>
                <OperationStatus>
                    <IsSuccess>true</IsSuccess>
                    <Code>VSMP-00000000</Code>
                    <Description>OK.</Description>
                    <TransactionID>20060822152151624547091</TransactionID>
                    <OrderRef>1234567890</OrderRef>
                </OperationStatus>
                <OneTimePasswordinfo>
                    <Msisdn>66923898199</Msisdn>
                    <OneTimePassword>123456789</OneTimePassword>
                    <Cos>xxx</Cos>
                    <State>0</State>
                    <SpName>ais</SpName>
                    <Chm>1</Chm>
                    <MobileLocation>RTBS</MobileLocation>
                </OneTimePasswordinfo>
            </InquiryOneTimePasswordResult>
        </InquiryOneTimePasswordResponse>
    </soap:Body>
</soap:Envelope>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response);
}

export const inquiryMpagingSubscriber = (req: Request, res: Response) => {
  const response = `
    <soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <soap:Body>
        <InquiryMpagingSubscriberResponse xmlns="http://vsmp.ais.co.th/webservices/subscriber/">
            <InquiryMpagingSubscriberResult>
                <OperationStatus>
                    <IsSuccess>true</IsSuccess>
                    <Code>VSMP-00000000</Code>
                    <Description>OK.</Description>
                    <TransactionID/>
                    <OrderRef/>
                </OperationStatus>
                <Subscriber>
                    <Msisdn>66923898119</Msisdn>
                    <CustomerID>669171968725822</CustomerID>
                    <Cos>601</Cos>
                    <Time>2024-06-11T14:35:01.4372594+07:00</Time>
                    <Lang>1</Lang>
                    <Model/>
                    <State/>
                    <VscpState>1</VscpState>
                    <Hack>0</Hack>
                    <Gtcf>0</Gtcf>
                    <Bso>BIZLIVE</Bso>
                    <NumImsi>0</NumImsi>
                    <PrepaidFlag/>
                    <VirtualFlag/>
                    <AltPrefixFlag/>
                    <AltPrefixCos/>
                    <ServiceLocation>OCCBF202</ServiceLocation>
                    <HasOneTimePassword>false</HasOneTimePassword>
                    <HasPassword>false</HasPassword>
                    <ToggleF/>
                    <ToggleState/>
                    <spName>awn</spName>
                    <brandID>3g-prepaid</brandID>
                    <ToggleCos/>
                    <nwt>AWN</nwt>
                    <chm>1</chm>
                    <cfAddress>OCCBF202</cfAddress>
                    <mobileLocation>RTBS</mobileLocation>
                    <imsi/>
                    <ImsiArray>
                        <imsixsi:nil="true"/>
                        <imsiS1xsi:nil="true"/>
                        <msisdnS1xsi:nil="true"/>
                        <imsiS2xsi:nil="true"/>
                        <msisdnS2xsi:nil="true"/>
                        <imsiS3xsi:nil="true"/>
                        <msisdnS3xsi:nil="true"/>
                        <imsiS4xsi:nil="true"/>
                        <msisdnS4xsi:nil="true"/>
                        <imsiXxsi:nil="true"/>
                        <msisdnImsiXxsi:nil="true"/>
                        <imsiFlagxsi:nil="true"/>
                    </ImsiArray>
                </Subscriber>
            </InquiryMpagingSubscriberResult>
        </InquiryMpagingSubscriberResponse>
    </soap:Body>
</soap:Envelope>
  `;

  res.setHeader('Content-Type', 'text/xml');
  res.status(200).send(response);
}

