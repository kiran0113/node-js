import axios from "axios";

import { environment } from "../../../environments/environment";


export class ReportsService {


private static URL: any = environment.partnerApiUrl;

  public static getReportsDetails(startDate:any, endDate:any, partnerID: any, PageNumber: any , RowOfPage: any) {
  let PartnerURL: string = `${this.URL}/report/${partnerID}/${startDate}/${endDate}?PageNumber=${PageNumber}&RowOfPage=${RowOfPage}`;

const config = {
  headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
};
return axios.get<any>(PartnerURL, config);

}

    public static downloadReportsDetails(startDate:any, endDate:any, partnerID:any) {
    let PartnerURL: string = `${this.URL}/report/export/${partnerID}/${startDate}/${endDate}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
}

}