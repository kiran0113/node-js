// ownership.tsx   

import React from 'react';

import { environment } from '../../environments/environment';
import axios from 'axios';


export class ComplianceServices {
  private static URL: any = environment.partnerApiUrl;

  // public static addComplinceDetails(data: any) {
  //   let UserURL: string = `${this.URL}/complince`;
  //   //  let UserURL: string = `${this.URL}/complince/addcompliance`;


  //   const config = {
  //       headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
  //   };
  //     return axios.post<any>(UserURL, data, config);
  //   };


  public static addComplince(data: any) {
    // let UserURL: string = `${this.URL}/complince`;
    let UserURL: string = `${this.URL}/complince/addcompliance`;


    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(UserURL, data, config);
  };



  // public static GetComplianceall (data: any) {
  public static GetComplianceall(partnerid: number, data: any) {

    // let UserURL: string = `${this.URL}/complince`;
    //  let UserURL: string = `${this.URL}/complince/GetComplianceall `;
    let UserURL: string = `${this.URL}/complince/GetComplianceall?PartnerId=${partnerid} `;

    // let UserURL: string = `${this.URL}/complince/GetComplianceall?PartnerId=${partnerid}&Pagenumber=${pagenumber}`;


    // GetComplianceall?PartnerId=408&Pagenumber=1

    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    // return axios.get<any>(UserURL, data, config);
    return axios.get<any>(UserURL, config);
  };


  

  // public static GetComplianceall (data: any) {
    public static GetComplianceall1(partnerid: number,pagenumber:any) {

      // let UserURL: string = `${this.URL}/complince`;
      //  let UserURL: string = `${this.URL}/complince/GetComplianceall `;
      // let UserURL: string = `${this.URL}/complince/GetComplianceall?PartnerId=${partnerid} `;
  
      let UserURL: string = `${this.URL}/complince/GetComplianceall?PartnerId=${partnerid}&Pagenumber=${pagenumber}`;
  
  
      // GetComplianceall?PartnerId=408&Pagenumber=1
  
      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
      };
      // return axios.get<any>(UserURL, data, config);
      return axios.get<any>(UserURL, config);
    };
}





export default ComplianceServices;
