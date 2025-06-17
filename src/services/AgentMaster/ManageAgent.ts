import axios from "axios";
import { environment } from "../../environments/environment";

export class ManageAgent {
  private static URL: any = environment.partnerApiUrl;

 
 
  public static addAgent(data: any) {
    let UserURL: string = `${this.URL}/bankagent/addbankagent`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, data, config);
  }

  public static updateAgent(data: any) {
    let UserURL: string = `${this.URL}/bankagent/updatebankagent`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, data, config);
  }

  public static getAgent = ( PageNumber: number, RowsOfPage: number,Key:any,Column:any) => {
    let UserURL: string = `${this.URL}/bankagent/getbankagent?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&Slug=${Key}&Column=${Column}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };




public static deleteCountry(id: number) {
  let UserURL: string = `${this.URL}/country/id?id=${id}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.delete<any>(UserURL, config);
}


public static deleteAgent(id: number) {
  let UserURL: string = `${this.URL}/bankagent/id?id=${id}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.delete<any>(UserURL, config);
}


public static getCoutry = () => {
  let UserURL: string = `${this.URL}/country`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(UserURL, config);
};


public static getAllCountry = () => {
  let UserURL: string = `${this.URL}/country/AllCountry`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(UserURL, config);
};




public static getAllCountryDeleted(id: any, isDeleted: any) {
  // ////console.log(isEncryption);
  let PartnerURL: string = `${this.URL}/country/Countryid?id=${id}&IsDeleted=${isDeleted}`;

  // let PartnerURL: string = `${this.URL}/partner/id?id=${id}&status=${changeStatusEn}&encryption=${null}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.delete<any>(PartnerURL, config);
}




}
