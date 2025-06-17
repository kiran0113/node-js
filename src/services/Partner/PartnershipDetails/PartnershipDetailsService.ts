import axios from "axios";
import { environment } from "../../../environments/environment";
import { IPartnershipDetails } from "../../../models/IPartnershipDetails";

export class PartnershipDetailsService {
  private static URL: any = environment.partnerApiUrl;

  public static getPartnershipDetailsByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerpartnershipdetails/partnershipdetails?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  //updated currencies
  public static getupdatedCountry = () => {
    let UserURL: string = `${this.URL}/country`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addPartnershipDetails(partnershipdetails: any) {
    let UserURL: string = `${this.URL}/partnerpartnershipdetails`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, partnershipdetails, config);
  }

  public static updatePartnershipDetails(partnershipdetails: any) {
    let UserURL: string = `${this.URL}/partnerpartnershipdetails`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, partnershipdetails, config);
  }

  public static updateIsFacilitator(partnershipdetails: any) {
    let UserURL: string = `${this.URL}/partnerpartnershipdetails/checkisfacilitator`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, partnershipdetails, config);
  }
}

