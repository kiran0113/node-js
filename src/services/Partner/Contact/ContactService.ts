import axios from "axios";
import { environment } from "../../../environments/environment";

export class ContactService {
  private static URL: any = environment.partnerApiUrl;

  public static getContactByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/contact?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addContact(contact: any) {
    let UserURL: string = `${this.URL}/contact`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, contact, config);
  }

  public static updateContact(contact: any) {
    let UserURL: string = `${this.URL}/contact`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, contact, config);
  }
}
