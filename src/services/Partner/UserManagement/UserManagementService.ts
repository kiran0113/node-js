import axios from "axios";
import { environment } from "../../../environments/environment";
import { IUserManagement } from "../../../models/IUserManagement";

export class UserManagementService {
  private static URL: any = environment.userApiUrl;

  public static getUserByPartnerId = (partnerid:any) => {
    let UserURL: string = `${this.URL}/user/getpartnerusers?partnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static getUserById = (id:any) => {
    let UserURL: string = `${this.URL}/user/getbyid?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addUser(user: any) {
    let UserURL: string = `${this.URL}/user`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, user, config);
  }

  public static updateUser(user: any) {
    let UserURL: string = `${this.URL}/user`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, user, config);
  }

  public static getUserRole() {
    let UserURL: string = `${this.URL}/common/role`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  }

  public static nextUser() {
    let UserURL: string = `${this.URL}/user/updatestep`;
    const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, '', config);
}

public static getUsers = () => {
  let UserURL: string = `${this.URL}/user/getusers`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.get<any>(UserURL, config);
};

public static updateUserProfile(user: any) {
  let UserURL: string = `${this.URL}/user/updateuser`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.post<any>(UserURL, user, config);
}

public static updateUserProfileStatus(Id: any, Status:any) {
  let UserURL: string = `${this.URL}/user/id?id=${Id}&status=${Status}`;
  const config = {
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  };
  return axios.put<any>(UserURL, Id, config);
}


}
