import axios from "axios";
import { environment } from "../../../environments/environment";
import { IBasicInfo } from "../../../models/IBasicInfo";

export class BasicInfoService {
  private static URL: any = environment.partnerApiUrl;

  public static getBasicInfoByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerbasciinfo/getbasicinfo?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addBasicInfo(basicinfo: any) {
    let UserURL: string = `${this.URL}/partnerbasciinfo/addbasicinfo`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, basicinfo, config);
  }

  public static updateBasicInfo(basicinfo: any) {
    let UserURL: string = `${this.URL}/partnerbasciinfo/updatebasicinfo`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, basicinfo, config);
  }

  public static updateLogoUrl(request: any) {
    let UserURL: string = `${this.URL}/partnerbasciinfo/UploadLogo`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, request, config);
  }
}
