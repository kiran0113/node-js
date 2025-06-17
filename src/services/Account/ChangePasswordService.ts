import axios from "axios";
import { environment } from "../../environments/environment";


export class ChangePasswordService {
  private static URL: any = environment.authApiUrl;

  public static changePassword(data:any) {
    let UserURL: string = `${this.URL}/Auth/changepassword`;
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
      };
    return axios.post<any>(UserURL, data, config);
  }
}