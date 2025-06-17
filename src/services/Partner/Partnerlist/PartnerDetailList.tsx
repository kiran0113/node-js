import axios from "axios";
import { environment } from "../../../environments/environment";

export class PartnerListService {
  private static URL: any = environment.partnerApiUrl;
  
  public static GetPartnerList() {
    let PartnerURL: string = `${this.URL}/partner`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  }


  public static inactivePartnerID(id: any,changeStatus :any) {
    let PartnerURL: string = `${this.URL}/partner/id?id=${id}&status=${changeStatus}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(PartnerURL, config);
  }

  public static inactivePartnerIDEncrypt(id: any, isEncryption: any) {
    // //console.log(isEncryption);
    let PartnerURL: string = `${this.URL}/partner/id?id=${id}&encryption=${isEncryption}`;

    // let PartnerURL: string = `${this.URL}/partner/id?id=${id}&status=${changeStatusEn}&encryption=${null}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(PartnerURL, config);
  }

  public static inactivePartnerCompliance(id: any, complianceExternal: any) {
    // //console.log(isEncryption);
    let PartnerURL: string = `${this.URL}/partner/id?id=${id}&complianceExternal=${complianceExternal}`;

    // let PartnerURL: string = `${this.URL}/partner/id?id=${id}&status=${changeStatusEn}&encryption=${null}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(PartnerURL, config);
  }





  public static GetOnBoardingStatus(partnerid: any) {
    let PartnerURL: string = `${this.URL}/partner/getonboardingstatus/${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  }

  public static UpdateOnboardingStatus(status: any) {
    let PartnerURL: string = `${this.URL}/partner/status`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(PartnerURL, status, config);
  }

}