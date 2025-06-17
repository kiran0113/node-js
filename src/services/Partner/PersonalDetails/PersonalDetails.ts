import axios from "axios";
import { environment } from "../../../environments/environment";

export class PersonalDetailsService {
  private static URL: any = environment.partnerApiUrl;

  public static getPersonalDetailsByPartnerId = (partnerid: number,userid:number) => {
    let UserURL: string = `${this.URL}/partnerpersonaldetails?PartnerId=${partnerid}&userId=${userid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addPersonalDetails(personaldetails: any) {
    let UserURL: string = `${this.URL}/partnerpersonaldetails`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, personaldetails, config);
  }

  public static updatePersonalDetails(personaldetails: any) {
    let UserURL: string = `${this.URL}/partnerpersonaldetails`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, personaldetails, config);
  }

  public static updateProfile(personaldetails: any) {
    let UserURL: string = `${this.URL}/partnerpersonaldetails/profile`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, personaldetails, config);
  }

  public static updateUserProfileStatus(Id: any, Status:any, PartnerId:any) {
    let UserURL: string = `${this.URL}/partnerpersonaldetails/inactiveprofile?id=${Id}&status=${Status}&partnerid=${PartnerId}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, Id, config);
  }

  public static addProfile(personaldetails: any) {
    let UserURL: string = `${this.URL}/partnerpersonaldetails/addprofile`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, personaldetails, config);
  }

  public static getPersonalDetailsFromAdminByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerpersonaldetails/GetOnboardingPartnerPersonalDetails?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
}
