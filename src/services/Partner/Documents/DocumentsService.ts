import axios from "axios";
import { environment } from "../../../environments/environment";

export class DocumentService {
  private static URL: any = environment.partnerApiUrl;

  public static getDocumentByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partnerdocument/document?id=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };


  
  public static addDocument(document: any) {
    let UserURL: string = `${this.URL}/partnerdocument/document`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, document, config);
  }

  public static updateDocument(document: any) {
    let UserURL: string = `${this.URL}/partnerdocument/document`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, document, config);
  }

  public static deleteDocument(id: number) {
  
    let UserURL: string = `${this.URL}/partnerdocument/delete?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.delete<any>(UserURL, config);
  }

  public static getDocumentDetailsByPartnerId = (partnerid: number) => {
    let UserURL: string = `${this.URL}/partner/documentdescription?PartnerId=${partnerid}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(UserURL, config);
  };

  public static addDocumentDescription(data: any) {
    let UserURL: string = `${this.URL}/partnerdocumentdescription`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, data, config);
  }

  public static updateDocumentDescription(data: any) {
    let UserURL: string = `${this.URL}/partnerdocumentdescription`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, data, config);
  }

  public static uploadDocument(data: any) {
    let UserURL: string = `${this.URL}/partnerdocument/uploaddocument`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.put<any>(UserURL, data, config);
  }

  public static downloadPdfDetails(id: any) {
    let PartnerURL: string = `${this.URL}/partnerdocument/download?id=${id}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
}
}
