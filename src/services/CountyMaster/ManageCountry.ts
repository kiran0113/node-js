import axios from "axios";
import { environment } from "../../environments/environment";

export class ManageCountry {
  private static URL: any = environment.partnerApiUrl;

 
 
  public static addCountry(data: any) {
    let UserURL: string = `${this.URL}/country/addcountry`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, data, config);
  }

  public static updateCountry(data: any) {
    let UserURL: string = `${this.URL}/country`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, data, config);
  }

 

public static getCoutry = () => {
  let UserURL: string = `${this.URL}/country`;
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


}
