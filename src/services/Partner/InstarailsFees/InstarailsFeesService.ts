import axios from "axios";
import { environment } from "../../../environments/environment";


export class InstarailsFeesService {
  private static URL: any = environment.partnerApiUrl;



  public static addInstarailsFee(fee: any) {
    let UserURL: string = `${this.URL}/partnerinstarailsfees`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, fee, config);
  }

  public static updateInstarailsFee(fee: any) {
    let UserURL: string = `${this.URL}/partnerinstarailsfees`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, fee, config);
  }

  public static getInstarailsFeeByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partner/instarailsfees?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static getInstarailsFeeById = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partner/instarailsfees?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static deleteInstarailsFee(id: number) {
    let UserURL: string = `${this.URL}/partnerinstarailsfees/id?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(UserURL, config);
  }

}
