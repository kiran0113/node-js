import axios from "axios";
import { environment } from "../../environments/environment";

export class CommonService {
  private static URL: any = environment.partnerApiUrl;

  public static basicinfoDropdown(partnerid: number) {
    let UserURL: string = `${this.URL}/partnerdropdown/basicinfoDropdown/${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

  public static getBusinessType() {
    let UserURL: string = `${this.URL}/partnerdropdown/transactiontype`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

}
