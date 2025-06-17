import axios from "axios";
import { environment } from "../../../environments/environment";

export class PartnerFeesDetailsService {
  private static URL: any = environment.partnerApiUrl;

  public static getPartnerSendFeesByPartnerId(id: any, type: string) {
    let UserURL: string = `${this.URL}/partnerfees/sendfees?PartnerId=${id}&Type=${type}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

  public static getPartnerReceiveFeesByPartnerId(id: any, type: string) {
    let UserURL: string = `${this.URL}/partnerfees/receivefees?PartnerId=${id}&Type=${type}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

  public static addPartnerSendFees(fees: any) {
    let UserURL: string = `${this.URL}/partnerfees/sendfees`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, fees, config);
  }

  public static addPartnerReceiveFees(fees: any) {
    let UserURL: string = `${this.URL}/partnerfees/receivefees`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, fees, config);
  }
}
