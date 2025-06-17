import axios from "axios";
import { environment } from "../../environments/environment";
import { ILogin } from "../../models/ILogin";

export class LoginService {
  private static URL: any = environment.authApiUrl;

  public static login(data: ILogin) {
    let UserURL: any = `${this.URL}/Auth/adminlogin`;
    return axios.post<any>(UserURL, data);
  }
  public static logout() {
    let UserURL: any = `${this.URL}/Auth/logout`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }
  public static updatetoken() {
    let UserURL: any = `${this.URL}/Auth/updatetoken`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }
}
