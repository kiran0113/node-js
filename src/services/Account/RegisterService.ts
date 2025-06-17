import axios from "axios";
import { environment } from "../../environments/environment";
import { IRegister } from "../../models/IRegister";

export class RegisterService {
  private static URL: any = environment.authApiUrl;

  public static register(data: IRegister) {
    let UserURL: string = `${this.URL}/Auth/register`;
    return axios.post<any>(UserURL, data);
  }
}
