import axios from "axios";
import { environment } from "../../../environments/environment";

export class CurrenciesService {
  private static URL: any = environment.partnerApiUrl;

  public static getCurrenciesByPartnerId = (partnerid:any,getdatafor:any) => {
    let PartnerURL: string = `${this.URL}/partnercurrencies/${partnerid}/${getdatafor}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  };

  public static addCurrencies(currencies: any) {
    let PartnerURL: string = `${this.URL}/partnercurrencies`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL, currencies, config);
  }
  
  

  public static updateCurrencies(currencies: any) {
  
    let PartnerURL: string = `${this.URL}/partnercurrencies`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(PartnerURL, currencies, config);
  }
}
