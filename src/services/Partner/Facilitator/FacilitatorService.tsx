import axios from "axios";
import { environment } from "../../../environments/environment";

export class FacilitatorService {
  private static URL: any = environment.partnerApiUrl;

  public static GetFacilitatorByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerfacilitator/getfacilitatorname/${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };
  public static addFacilitatorPartner(partner: any) {
    let UserURL: string = `${this.URL}/partnerfacilitator/facilitator/partner/add`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, partner, config);
  }

  public static getFacilitatorPartners(id: any) {
    let UserURL: string = `${this.URL}/partnerfacilitator/facilitator/partners?partnerId=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

  public static addFacilitatorFee(fee: any) {
    let UserURL: string = `${this.URL}/partnerfacilitator`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, fee, config);
  }

  public static updateFacilitatorFee(fee: any) {
    let UserURL: string = `${this.URL}/partnerfacilitator`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, fee, config);
  }

  public static getFacilitatorFeeByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerfacilitator/facilitator?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static deleteFacilitatorFee(id: number) {
    let UserURL: string = `${this.URL}/partnerfacilitator/id?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(UserURL, config);
  }
}