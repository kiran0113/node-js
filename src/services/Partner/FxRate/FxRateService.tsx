import axios from "axios";
import { environment } from "../../../environments/environment";

export class FxRateService {
  private static URL: any = environment.partnerApiUrl;

  public static addFxRate(fxrate: any) {
    let UserURL: string = `${this.URL}/partnerfxrate`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, fxrate, config);
  }



  public static Getsendcountry = () => {
  
    let UserURL: string = `${this.URL}/Country/Getsendcountry`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
  public static getFxRateByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerfxrate/${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static updateFxRate(fxrate: any) {
    let UserURL: string = `${this.URL}/partnerfxrate`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, fxrate, config);
  }

//https://localhost:61422/api/partnerfxrate/id?id=340

  public static deleteFxRate(id: number) {
    let UserURL: string = `${this.URL}/partnerfxrate/id?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(UserURL, config);
  }


  public static getFxRateHistoryByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerfxrate/fxhistory/${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };



  public static getRecieveCurrenciesPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerfxrate/receivecurrencies?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
}