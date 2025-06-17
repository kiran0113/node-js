import axios from "axios";
import { environment } from "../../../environments/environment";

export class PartnerDepositService {
  private static URL: any = environment.partnerApiUrl;
  public static getDepositeTransactions(partnerid: any, accountId:any,PageNumber:any, RowsOfPage:any, SearchKey:any) {
    let PartnerURL: string = `${this.URL}/partnerdeposit/gettransactions?partnerId=${partnerid}&accountId=${accountId}&PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&SearchKey=${SearchKey}`;    
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  }

  public static getTotalBalance(partnerid: any, accountId:any) {
    let PartnerURL: string = `${this.URL}/partnerdeposit/gettotalbalance?partnerId=${partnerid}&accountId=${accountId}`;    
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  }
  public static depositeAmount(deposit: any) {
    let PartnerURL: string = `${this.URL}/partnerdeposit/depositamount`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL, deposit,config);
  }


  public static withdrawAmount(deposit: any) {
    let PartnerURL: string = `${this.URL}/partnerwithdraw/withdrawamount`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL, deposit,config);
  }
}
