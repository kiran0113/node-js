import axios from "axios";
import { environment } from "../../../environments/environment";


export class PaymentSettingsServices {
  private static URL:any = environment.partnerApiUrl;



  public static getPayment() {
    let PartnerURL: string = `${this.URL}/paymentfields`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  }

  public static ReceivePaymentField(categoriesId: any ){
  
    let PartnerURL: string = `${this.URL}/paymentfields/receiverfields`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL,categoriesId, config);
  }


  
  public static getReceiverInformationFields= (data:any) => {
    let PartnerURL: string = `${this.URL}/paymentfields/receiverinformationmanadatoryfields`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL,data, config);
  };




  public static getReceiverInformation = (partnerid: number,type:string, subCategoryId :number) => {
   
    let PartnerURL: string = `${this.URL}/paymentfields/getreceiverinformation?partnerid=${partnerid}&type=${type}&subcategoryId=${subCategoryId}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  };


  
  
  
  public static SenderPaymentField(categoriesId: any ){
    
    let PartnerURL: string = `${this.URL}/paymentfields/senderfields`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL,categoriesId, config);
  }


  public static getSenderInformationFields= (data:any) => {
    let PartnerURL: string = `${this.URL}/paymentfields/senderinformationmanadatoryfields`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.post<any>(PartnerURL,data, config);
  };




  public static getSenderInformation = (partnerid: number,type:string, subCategoryId :number) => {
   
    let PartnerURL: string = `${this.URL}/paymentfields/senderinformationfields?partnerid=${partnerid}&type=${type}&subcategoryId=${subCategoryId}`;
    const config = {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("Token")}` },
    };
    return axios.get<any>(PartnerURL, config);
  };


  }
  
  