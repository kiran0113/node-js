import axios from "axios";
import { environment } from "../../environments/environment";
import { ISetPassword } from "../../models/ISetPassword";

export class SetPasswordService {
  private static URL: any = environment.authApiUrl;

  public static setUserPassword(data: ISetPassword) {
    let UserURL: string = `${this.URL}/Auth/setpassword`;
    return axios.post<any>(UserURL, data);
  }

  public static getUserByToken(token: string | undefined) {
    let UserURL: string = `${this.URL}/Auth/setpasswordtoken?token=${token}`;
    return axios.get<any>(UserURL);
  }

  public static forgotPassword(userName: string) {
    let UserURL: string = `${this.URL}/Auth/forgotpassword?userName=${userName}`;
    return axios.post<any>(UserURL, userName);
  }

  public static getUserByForgotPasswordToken(token: string | undefined) {
    let UserURL: string = `${this.URL}/Auth/forgotpasswordtoken?token=${token}`;
    return axios.get<any>(UserURL);
  }

  public static resetUserPassword(data: ISetPassword) {
    let UserURL: string = `${this.URL}/Auth/resetpassword`;
    return axios.post<any>(UserURL, data);
  }
}
