export interface IPersonalDetails {
    id: number,
    partnerId?:number,
    legalFirstName: string,
    legalMiddleName: string,
    legalLastName: string,
    maternalLastName: string,
    paternalLastName: string,
    phone: string,
    businessEmail: string,
    dateOfBirth: null,
    addressLine1: string,
    buildingNumber: string,
    addressLine2: string,
    town: string,
    province:string,
    country: string,
    postalCode:string
}