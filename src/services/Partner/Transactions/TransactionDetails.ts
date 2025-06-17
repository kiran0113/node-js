import axios from "axios";
import { environment } from "../../../environments/environment";

export class TransactionDetails {
  private static URL: any = environment.partnerApiUrl;

  
  public static getTransactionDetailsByPartnerId(partnerid:any, PageNumber: number, RowsOfPage: number,Key:any) {
    
    let PartnerURL: string = `${this.URL}/paymenttransacation/transaction?PartnerId=${partnerid}&PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&Key=${Key}`;

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);

}
public static getReportsDetails(startDate:any, endDate:any, partnerID: any) {
  let PartnerURL: string = `${this.URL}/report/${partnerID}/${startDate}/${endDate}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(PartnerURL, config);
}



public static downloadReportsDetails(startDate:any, endDate:any, partnerID:any) {
  let PartnerURL: string = `${this.URL}/report/export/${partnerID}/${startDate}/${endDate}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(PartnerURL, config);
}

  // Payment detalils as per payment id 
public static getDetailPaymentId(paymentId: number, partnerId: any) {



let PartnerURL: string = `${this.URL}/paymenttransacation/transaction/${paymentId}/${partnerId}`;

const config = {
headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
};
return axios.get<any>(PartnerURL, config);

}


public static getPaymentLogs = (paymentid: number) => 
{
  let UserURL: string = `${this.URL}/partnersecurity/paymentlogs?paymentId=${paymentid}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(UserURL, config);
};
}
