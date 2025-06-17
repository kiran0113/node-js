import axios from "axios";
import { environment } from "../../../environments/environment";
import { IAddress } from "../../../models/IAddress";

export class AddressService {
  private static URL: any = environment.partnerApiUrl;

  public static getAddressByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/address?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addAddress(address: any) {
    let UserURL: string = `${this.URL}/address`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, address, config);
  }

  public static updateAddress(address: any) {
    let UserURL: string = `${this.URL}/address`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, address, config);
  }
}
