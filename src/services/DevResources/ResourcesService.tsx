import axios from "axios";
import { environment } from "../../environments/environment";

export class ResourceService {
  private static URL: any = environment.partnerApiUrl;

  public static getResourcesByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnersecurity/security?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static RegenerateResources(security: any) {
    let UserURL: string = `${this.URL}/partnersecurity/Regenerate`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, security, config);
  }

  public static getWebhooksByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnersecurity/getwebhooks?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
  public static saveWebhookURLs(security: any) {
    let UserURL: string = `${this.URL}/partnersecurity/savewebhooks`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, security, config);
  }
  public static getReceiveEndPointsByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnersecurity/getreceivepoints?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
  public static saveReceiveURLs(security: any) {
    let UserURL: string = `${this.URL}/partnersecurity/savereceiveendpoints`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, security, config);
  }
  public static getSendEndPointsByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnersecurity/getsendpoints?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static getResponseEndPointsByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnersecurity/getresponseendpoint?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
}