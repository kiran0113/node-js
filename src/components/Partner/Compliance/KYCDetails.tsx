import React from "react"
import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAddress } from "../../../models/IAddress";
import { AddressService } from "../../../services/Partner/Address/AddressService";
import ToolTip from "../ToolTipsData/ToolTip";
import { validpostalcode, countryList, } from "../../../utils/utils";
import { Toast } from "primereact/toast";
import { AutoComplete } from "primereact/autocomplete";
import { ProgressSpinner } from "primereact/progressspinner";
import AddressoolTipData from "../../../services/Partner/Address/AddressToolTips";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import { InputSwitch } from "primereact/inputswitch";
import SanctionsProgram from "./SanctionsProgram";
// import MonitoringSanctionProgram from "./MonitoringSanctionProgram";
import MonitoringSanctionProgram from "./MonitoringSanctionProgram";
import ComplianceServices from "../../../services/complaince/ComplianceServices";


interface IState {
    address: IAddress;
}

// const KYCDetails: React.FC<any> = ({buttonLoadingSkip, setOpenPage3,openPage3,setOpenPage2,onSaveAndContinueClick} ) => {
const KYCDetails: React.FC<any> = ({ buttonLoadingSkip, setOpenPage3, openPage3, setOpenPage1, setOpenPage2, onSaveAndContinueClick }) => {

    const { partnerid, type } = useParams();
    const [buttonLoading, setButtonLoading] = useState(false);

    const [postaladdresserrorMessage, setpostaladdressErrorMessage] = useState("");

    const [postaladdress2errorMessage, setpostaladdress2ErrorMessage] = useState("");

    const [physicalpostaladdresserrorMessage, setphysicalpostaladdressErrorMessage,] = useState("");

    const [physicalpostaladdress2errorMessage, setphysicalpostaladdress2ErrorMessage,] = useState("");

    const [postalcodeerrorMessage, setpostalcodeErrorMessage] = useState("");

    const [postalcode2errorMessage, setpostalcode2ErrorMessage] = useState("");

    const [provinceerrorMessage, setprovinceErrorMessage] = useState("");

    const [townnameerrorMessage, settownnameErrorMessage] = useState("");

    const [countryerrorMessage, setcountryErrorMessage] = useState("");

    const [physicalprovinceerrorMessage, setphysicalprovinceErrorMessage] = useState("");

    const [physicaltownnameerrorMessage, setphysicaltownnameErrorMessage] = useState("");

    const [physicalcountryerrorMessage, setphysicalcountryErrorMessage] = useState("");

    const [buildingErrorMessage, setbuildingErrorMessage] = useState("");
    // const { partnerId1, type1 } = useParams();

    const [physicalbuildingErrorMessage, setphysicalbuildingErrorMessage] = useState("");

    const [backButtonLoading, setBackButtonLoading] = useState(false)
    const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);

    const [readonly, setReadOnly] = useState(false);
    // const [openPage1, setOpenPage1] = useState(true);
    // const [openPage2, setOpenPage2] = useState(true);

    // const [openPage4, setOpenPage4] = useState(true);
    const [openPage4, setOpenPage4] = useState(true);
    const [openPage5, setOpenPage5] = useState(true);


    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [checked, setChecked] = useState(false);
    // const id = localStorage.getItem("PartnerId");
    // const [partnerId, setpartnerId] = React.useState(id);
    const [filteredcountrieslist, setFilteredCountryList] = useState<any[]>([]);

    const [countryAutoComplete, setCountryAutoComplete] = useState("");

    const [editReadOnly, setEditReadOnly] = useState(true);
    const onboardStatus = localStorage.getItem("onboardStatus");

    const [physicalcountryAutoComplete, setPhysicalCountryAutoComplete] =
        useState("");
    const [addressToolTipdata,] =
        useState<any>(AddressoolTipData);
    const [updateBtnShow, setUpdateBtnShow] = useState(false);


    const CheckNull = (value: any) => {
        if (value === "" || value === undefined || value === null) {
            return true;
        }
        return false;
    };


    const [complianceComponent, setComplianceComponent] = useState({

        "id": 0,
        "partnerId": Number(partnerid),
        "questionId": "",
        "value": "",
        "Pagenumber": "3"

    })

    const [complianceModel, setComplianceModel] = useState({

        id: 0,
        partnerId: Number(partnerid),

        QuestionId1: "",
        Value1: "",
        QuestionId24: "",
        Value24: "",
        QuestionId25: "",
        Value25: "",
        QuestionId26: "",
        Value26: "",
        QuestionId27_1: "",
        Value27_1: "",
        QuestionId27: "",
        Value27: "",
        QuestionId28: "",
        Value28: "",
        QuestionId29: "",
        Value29: "",
        QuestionId30: "",
        Value30: "",
        QuestionId31: "",
        Value31: "",
        QuestionId32: "",
        Value32: "",
        QuestionId33: "",
        Value33: "",




    })

    const [documentePolicy, setdocumentePolicy] = useState([

        {
            id: 0,
            deliveryType: "Customer Identification",
            checkedoption: false,

        },

        {
            id: 1,
            deliveryType: "Purpose and nature of relationship",
            checkedoption: false,

        },

        {
            id: 2,
            deliveryType: "Ownership structure",
            checkedoption: false,

        },
        {
            id: 3,
            deliveryType: "Product Usage",
            checkedoption: false,

        },

        {
            id: 4,
            deliveryType: "Nature of business/employment",
            checkedoption: false,

        },
        {
            id: 5,
            deliveryType: "Source of wealth",
            checkedoption: false,

        },
        {
            id: 6,
            deliveryType: "Expected Activity",
            checkedoption: false,

        },

        {
            id: 7,
            deliveryType: "Source of funds",
            checkedoption: false,

        },


    ]);


    const [documente, setdocumente] = useState([

        {
            id: 0,
            deliveryType: "Ultimate beneficial ownership",
            checkedoption: false,

        },

        {
            id: 1,
            deliveryType: "Authorised signatories (where applicable)",
            checkedoption: false,

        },
        {
            id: 2,
            deliveryType: "Are ultimate beneficial owners verified?",
            checkedoption: false,

        },

        {
            id: 3,
            deliveryType: "Key controllers",
            checkedoption: false,

        },
        {
            id: 3,
            deliveryType: "Other relevant parties",
            checkedoption: false,

        },

    ])


    const [categories, setcategories] = useState([

        {
            id: 0,
            deliveryType: "Arms, Defence, Military",
            checkedoption: false,

        },
        {
            id: 1,
            deliveryType: "PEPs",
            checkedoption: false,

        },
        {
            id: 2,
            deliveryType: "Extractive industries",
            checkedoption: false,

        },
        {
            id: 3,
            deliveryType: "Precious metals and stone",
            checkedoption: false,

        },

        {
            id: 4,
            deliveryType: "Marijuana-related Entities",
            checkedoption: false,

        },
        {
            id: 5,
            deliveryType: "Shell banks",
            checkedoption: false,

        },
        {
            id: 6,
            deliveryType: "Non-Government Organisations",
            checkedoption: false,

        },
        {
            id: 7,
            deliveryType: "Used Car Dealers",
            checkedoption: false,

        },

        {
            id: 8,
            deliveryType: "Payment Service Providers",
            checkedoption: false,

        },
        {
            id: 9,
            deliveryType: "Embassies/Consulates",
            checkedoption: false,

        },
        {
            id: 10,
            deliveryType: "PEP Related",
            checkedoption: false,

        },
        {
            id: 11,
            deliveryType: "General Trading Companies",
            checkedoption: false,

        },

        {
            id: 12,
            deliveryType: "Regulated charities",
            checkedoption: false,

        },
        {
            id: 13,
            deliveryType: "Non-account customers",
            checkedoption: false,

        },
        {
            id: 14,
            deliveryType: "Non-Government Organisations",
            checkedoption: false,

        },
        {
            id: 15,
            deliveryType: "Unregulated charities",
            checkedoption: false,

        },
        {
            id: 16,
            deliveryType: "Nuclear power",
            checkedoption: false,

        },

        {
            id: 17,
            deliveryType: "Respondent Banks",
            checkedoption: false,

        },
        {
            id: 18,
            deliveryType: "PEPs",
            checkedoption: false,

        },
        {
            id: 19,
            deliveryType: "PEP Close Associates",
            checkedoption: false,

        },
        {
            id: 20,
            deliveryType: "Gambling customers",
            checkedoption: false,

        },

        {
            id: 21,
            deliveryType: "Red light businesses/Adult entertainment",
            checkedoption: false,

        },
        {
            id: 22,
            deliveryType: "MSB/MVTS customers",
            checkedoption: false,

        },
        {
            id: 23,
            deliveryType: "Travel and Tour Companies",
            checkedoption: false,

        },
        {
            id: 24,
            deliveryType: "Non-resident customers",
            checkedoption: false,

        },
        {
            id: 25,
            deliveryType: "Virtual Asset Service Providers",
            checkedoption: false,

        },

    ])

    // const onCheckClickdocument = (event: any) => {
    //     const { name, checked } = event.target;
    //     const updatedDocument = [...documentePolicy];


    //     const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
    //     if (updatedPolicy) {
    //         updatedPolicy.checkedoption = checked;
    //     }

    //     // setdocumentePolicy(updatedDocument);
    //     setdocumentePolicy((prevPolicies) =>
    //         prevPolicies.map((policy) =>
    //           policy.deliveryType === name ? { ...policy, checkedoption: checked } : policy
    //         )
    //       );

    //     setComplianceModel((prevModel) => ({
    //         ...prevModel,
    //         documentePolicy: updatedDocument,
    //         QuestionId26: getSelectedEntity(updatedDocument),
    //     }));

    //     setComplianceComponent((prevModel) => ({
    //         ...prevModel,
    //         documentePolicy: updatedDocument,
    //         "questionId": "26",
    //         value: getSelectedEntity(updatedDocument),
    //         // value: getSelectedEntity.join("/"),
    //       }));
    //       onComplaince();
    // };


    const onCheckClickdocument = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...documentePolicy];


        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);
        // setdocumentePolicy((prevPolicies) =>
        //     prevPolicies.map((policy) =>
        //       policy.deliveryType === name ? { ...policy, checkedoption: checked } : policy
        //     )
        //   );

        setComplianceModel((prevModel) => ({
            ...prevModel,
            documentePolicy: updatedDocument,
            QuestionId26: getSelectedEntity(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({
            ...prevModel,
            documentePolicy: updatedDocument,
            questionId: "26",
            value: getSelectedEntity(updatedDocument),
            // value: getSelectedEntity.join("/"),
        }));
        onComplaince();
    };
    const getSelectedEntity = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");
    };



    const onCheckClickpolicies = (event: any) => {
        const { name, checked } = event.target;
        const updatedOrganization = [...documente];

        const updatedPolicy1 = updatedOrganization.find((policy) => policy.deliveryType === name);
        if (updatedPolicy1) {
            updatedPolicy1.checkedoption = checked;
        }

        // setcomplianceTrainning(updatedOrganization);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            documente: updatedOrganization,
            QuestionId27: getSelectedValuesorganization(updatedOrganization),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            // compliancePolicies: updatedOrganization,
            documente: updatedOrganization,
            "questionId": "27",
            value: getSelectedValuesorganization(updatedOrganization),
        }));
        onComplaince();
    };



    const getSelectedValuesorganization = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");

    };





    const onCheckClickFCC = (event: any) => {
        const { name, checked } = event.target;
        const updatedOrganization1 = [...categories];


        const updatedComplianceTraining = categories.map((policy: any) =>
            policy.deliveryType === name ? { ...policy, checkedoption: checked } : policy
        );

        setcategories(updatedComplianceTraining);



        const selectedValues = getSelectedValuesorganization(updatedComplianceTraining);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            categories: updatedOrganization1,
            QuestionId32: getSelectedValuesorganizationFCC(updatedComplianceTraining),
        }));

        setComplianceComponent((prevModel) => ({
            ...prevModel,
            categories: updatedOrganization1,
            questionId: "32",
            value: getSelectedValuesorganizationFCC(updatedComplianceTraining),
            // value: getSelectedEntity.join("/"),
        }));
        onComplaince();
    };



    const getSelectedValuesorganizationFCC = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");

    };





    const [
        ,
        setBeforeChangeRegisteredaddressModel,
    ] = useState({
        id: 0,
        partnerId: Number(partnerid),
        postalAddressLine1: "",
        postalAddressLine2: "",
        buildingNumber: "",
        postalCode: "",
        province: "",
        townName: "",
        country: "",
        addressType: false,
        createdBy: 0,
        updatedBy: 0,
        deletedBy: 0,
        onboardStatus: localStorage.getItem("onboardingStatus ")

    });

    const [
        ,
        setBeforeChangePhysicaladdressModel,
    ] = useState({
        id: 0,
        partnerId: Number(partnerid),
        postalAddressLine1: "",
        postalAddressLine2: "",
        buildingNumber: "",
        postalCode: "",
        province: "",
        townName: "",
        country: "",
        addressType: true,
        createdBy: 0,
        updatedBy: 0,
        deletedBy: 0,
        onboardStatus: localStorage.getItem("onboardingStatus ")

    });

    const [registeredaddressModel, setRegisteredAddressModel] = useState({
        id: 0,
        partnerId: Number(partnerid),
        postalAddressLine1: "",
        postalAddressLine2: "",
        buildingNumber: "",
        postalCode: "",
        province: "",
        townName: "",
        country: "",
        addressType: false,
        createdBy: 0,
        updatedBy: 0,
        deletedBy: 0,
        onboardStatus: localStorage.getItem("onboardingStatus ")

    });

    const [physicaladdressModel, setPhysicalAddressModel] = useState({
        id: 0,
        partnerId: Number(partnerid),
        postalAddressLine1: "",
        postalAddressLine2: "",
        buildingNumber: "",
        postalCode: "",
        province: "",
        townName: "",
        country: "",
        addressType: true,
        createdBy: 0,
        updatedBy: 0,
        deletedBy: 0,
        onboardStatus: localStorage.getItem("onboardingStatus ")

    });


    const [isOBL, setIsOBL] = useState(complianceModel.Value24 === "true");

    useEffect(() => {
        setIsOBL(complianceModel.Value24 === "true");
    }, [complianceModel.Value24]);


    const handleYesChange = () => {

        setIsOBL(true);
        SendFeesClick();
    }


    const SendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value24: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "24",
            value: "yes",
        }));

        onComplaince();
    };



    const handleNoChange = () => {

        setIsOBL(true);
        RemoveSendFeesClick();
    }


    const RemoveSendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value24: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "24",
            value: "no",
        }));

        onComplaince();
    };


    const [isOBL1, setIsOBL1] = useState(complianceModel.Value25 === "true");

    useEffect(() => {
        setIsOBL1(complianceModel.Value25 === "true");
    }, [complianceModel.Value25]);


    const handleYesChange1 = () => {

        setIsOBL1(true);
        SendFeesClickpolicy();
    }


    const SendFeesClickpolicy = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value25: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "25",
            value: "yes",
        }));

        onComplaince();
    };


    const handleNoChange1 = () => {

        setIsOBL1(false);
        RemoveSendFeesClickpolicy();
    }
    const RemoveSendFeesClickpolicy = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value25: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "25",
            value: "no",
        }));

        onComplaince();
    };


    const [isOBL2, setIsOBL2] = useState(complianceModel.Value28 === "true");

    useEffect(() => {
        setIsOBL2(complianceModel.Value28 === "true");
    }, [complianceModel.Value28]);


    const handleYesChange2 = () => {

        setIsOBL2(true);
        SendFeesClickclassification();
    }

    const SendFeesClickclassification = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value28: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "28",
            value: "yes",
        }));

        onComplaince();
    };

    const handleNoChange2 = () => {

        setIsOBL2(false);
        RemoveSendFeesClickclassification();
    }

    const RemoveSendFeesClickclassification = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value28: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "28",
            value: "no",
        }));

        onComplaince();
    };


    const [isOBL3, setIsOBL3] = useState(complianceModel.Value29 === "true");

    useEffect(() => {
        setIsOBL3(complianceModel.Value29 === "true");
    }, [complianceModel.Value29]);


    const handleYesChange3 = () => {

        setIsOBL3(true);
        SendFeesClickPEP();
    }





    const SendFeesClickPEP = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value29: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "29",
            value: "yes",
        }));

        onComplaince();
    };


    const handlNoChange3 = () => {

        setIsOBL3(false);
        RemoveSendFeesClickPEP();
    }

    const RemoveSendFeesClickPEP = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value29: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "29",
            value: "no",
        }));

        onComplaince();
    };



    const [isOBL4, setIsOBL4] = useState(complianceModel.Value30 === "true");

    useEffect(() => {
        setIsOBL4(complianceModel.Value30 === "true");
    }, [complianceModel.Value30]);


    const handleYesChange4 = () => {

        setIsOBL4(true);
        SendFeesClickPEPpolicies();
    }






    const SendFeesClickPEPpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value30: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "30",
            value: "yes",
        }));

        onComplaince();
    };

    const handleNoChange4 = () => {

        setIsOBL4(false);
        RemoveSendFeesClickPEPpolicies();
    }



    const RemoveSendFeesClickPEPpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value30: "",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "30",
            value: "yes",
        }));

        onComplaince();
    };


    const [isOBL5, setIsOBL5] = useState(complianceModel.Value33 === "true");

    useEffect(() => {
        setIsOBL5(complianceModel.Value33 === "true");
    }, [complianceModel.Value33]);


    const handleYesChange5 = () => {

        setIsOBL5(true);
        SendFeesClickprinciple();
    }




    const SendFeesClickprinciple = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value33: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "33",
            value: "yes",
        }));

        onComplaince();
    };


    const handleNoChange5 = () => {

        setIsOBL5(true);
        RemoveSendFeesClickprinciple();
    }

    const RemoveSendFeesClickprinciple = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            value33: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "33",
            value: "no",
        }));

        onComplaince();
    };

    // const [loading, setLoading] = useState(true);

    const [, setError] = useState(false);
    // useEffect(() => {
    //     // 

    // ({ updateBackBtnShow })
    // }, [updateBackBtnShow])

    const ErrorMessageEmptyModel = () => {
        setpostaladdressErrorMessage("");
        setpostalcodeErrorMessage("");
        setprovinceErrorMessage("");
        settownnameErrorMessage("");
        setbuildingErrorMessage("");
        setcountryErrorMessage("");
        setpostalcode2ErrorMessage("");
        setphysicalprovinceErrorMessage("");
        setphysicalpostaladdressErrorMessage("");
        setphysicalpostaladdress2ErrorMessage("");
        setphysicaltownnameErrorMessage("");
        setphysicalcountryErrorMessage("");
        setphysicalbuildingErrorMessage("");
        setpostaladdress2ErrorMessage("");
    };



    useEffect(() => {

        const pagenumber = "3";
        ComplianceServices.GetComplianceall1(complianceModel.partnerId, pagenumber).then((data: any) => {
            setComplianceModel(data.data);
            if (data.data.length !== 0) {
                const resultArray = [];
                data.data.forEach((item: any) => {
                    resultArray.push(item);
                });
                setComplianceModel(data.data);
                setComplianceComponent(data.data);
                //console.log("dataSet", data.data);
            }
        })
            .catch((error: any) => {
                if (error.response.status === 500) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Something went wrong",
                        life: 3000,
                    });
                } else if (error.response.status === 401) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Unauthorized",
                        life: 3000,
                    });
                    Logout(navigate);
                } else if (error.response.status === 400) {
                    toast.current?.show({
                        severity: "error",
                        summary: error.response.data[0].errorMessage,
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error while saving address details.",
                        life: 3000,
                    });
                }
                setButtonLoading(false);
                setError(false);
            });

    }, [])



    const onComplaince = () => {

        ComplianceServices.addComplince(complianceComponent).then((data: any) => {

            setComplianceComponent(data.data)
            //   if(data.data.length !== 0){
            //    setComplianceComponent(data.data)
            //   }
        })
            .catch((error: any) => {
                if (error.response.status === 500) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Something went wrong",
                        life: 3000,
                    });
                } else if (error.response.status === 401) {
                    toast.current?.show({
                        severity: "error",
                        summary: "Unauthorized",
                        life: 3000,
                    });
                    Logout(navigate);
                } else if (error.response.status === 400) {
                    toast.current?.show({
                        severity: "error",
                        summary: error.response.data[0].errorMessage,
                        life: 3000,
                    });
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error while saving address details.",
                        life: 3000,
                    });
                }
                setButtonLoading(false);
                setError(false);
            });

    }


    const onCheckClick = (e: any) => {
        setTimeout(() => {
            setChecked(!e.target.checked);
        }, 100);

        if (e.target.checked) {
            setReadOnly(true);
            setPhysicalAddressModel({
                ...registeredaddressModel,
                id: physicaladdressModel.id,
                addressType: true,
            });
            setPhysicalCountryAutoComplete(countryAutoComplete);
        } else {
            setReadOnly(false);
            // setPhysicalAddressModel({
            //   ...beforeChangePhysicaladdressModel,
            //   id: physicaladdressModel.id,
            //   addressType: true,
            // });
            //setPhysicalCountryAutoComplete(beforeChangePhysicaladdressModel.country);
        }
    };
    const onCheckClick1 = (e: any) => {
        setTimeout(() => {
            setChecked(!e.target.checked);
        }, 100);

        if (e.target.checked) {
            setReadOnly(true);
            setPhysicalAddressModel({
                ...registeredaddressModel,
                id: physicaladdressModel.id,
                addressType: true,
            });
            setPhysicalCountryAutoComplete(countryAutoComplete);
        } else {
            setReadOnly(false);
            // setPhysicalAddressModel({
            //   ...beforeChangePhysicaladdressModel,
            //   id: physicaladdressModel.id,
            //   addressType: true,
            // });
            //setPhysicalCountryAutoComplete(beforeChangePhysicaladdressModel.country);
        }
    };

    const searchCountry = (event: any) => {
        let query = event.query;
        let _filteredItems: any = [];
        for (let i = 0; i < countryList.length; i++) {
            let item = countryList[i];
            if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
                _filteredItems.push(item);
            }
        }
        setFilteredCountryList(_filteredItems);
    };

    const onCountryChange = (e: any) => {
        if (e.value !== null) {
            setCountryAutoComplete(e.value);
            setRegisteredAddressModel({
                ...registeredaddressModel,
                country: e.value.code,
            });

            if (checked) {
                setPhysicalCountryAutoComplete(e.value);
                setPhysicalAddressModel({
                    ...physicaladdressModel,
                    country: e.value.code,
                    addressType: true,
                });
            }
        }
    };

    const onPhysicalCountryChange = (e: any) => {
        if (e.value !== null) {
            setPhysicalCountryAutoComplete(e.value);
            setPhysicalAddressModel({
                ...physicaladdressModel,
                country: e.value.code,
            });
        }
    };
    const onBackClick = () => {
        setTimeout(() => {
            setOpenPage2(true)
            setOpenPage3(false)
        }, 1000)
    }
    // const onBackClick = () => {

    //     // setBackButtonLoading(true)
    //     setTimeout(() => {
    //     //   onSaveAndContinueClick("B");
    //     //   setUpdateBackBtnShow(true);
    //     //   setReadOnly(false);
    //     setOpenPage2(true)
    //     setOpenPage3(false)
    //     }, 1000)
    //   };
    // const onBackClick = () => {
    //     if (!readonly && isValidate(registeredaddressModel, physicaladdressModel)) {
    //         // setBackButtonLoading(true)
    //         setTimeout(() => {
    //             // onSaveAndContinueClick("B");
    //             setUpdateBackBtnShow(true);
    //             setReadOnly(false);
    //         }, 1000)

    //     }
    //     else {

    //         //console.log("Cannot go back: Form is not ready or data is not valid.");
    //     }
    // };

    const EditDetails = () => {
        // setLoading(true);
        setTimeout(() => {
            // setLoading(false);
            setUpdateBtnShow(true);
            setEditReadOnly(false);
        }, 1000);
    };

    // useEffect(() => {
    //     // setButtonLoadingSkip(false);
    //     {
    //         checked === true ?
    //             setReadOnly(true) : setReadOnly(false)
    //     }
    //     {
    //         type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    //     }
    //     const useroobj = localStorage.getItem("User");
    //     if (useroobj === null || useroobj === undefined) {
    //         Logout(navigate);
    //     }
    //     if (partnerid !== "0") {
    //         getAddressByPartnerId(Number(partnerid));
    //     } else {
    //         setRegisteredAddressModel({
    //             id: 0,
    //             partnerId: Number(partnerid),
    //             postalAddressLine1: "",
    //             postalAddressLine2: "",
    //             buildingNumber: "",
    //             postalCode: "",
    //             province: "",
    //             townName: "",
    //             country: "",
    //             addressType: false,
    //             createdBy: 0,
    //             updatedBy: 0,
    //             deletedBy: 0,
    //             onboardStatus: localStorage.getItem("onboardingStatus ")

    //         });
    //         setPhysicalAddressModel({
    //             id: 0,
    //             partnerId: Number(partnerid),
    //             postalAddressLine1: "",
    //             postalAddressLine2: "",
    //             buildingNumber: "",
    //             postalCode: "",
    //             province: "",
    //             townName: "",
    //             country: "",
    //             addressType: true,
    //             createdBy: 0,
    //             updatedBy: 0,
    //             deletedBy: 0,
    //             onboardStatus: localStorage.getItem("onboardingStatus ")

    //         });
    //         // setLoading(false);
    //     }
    // }, []);



    // const onNextClick = () => {
    //     //console.log('Next button clicked');
    //     setUpdateBtnShow(true); 
    //     setOpenPage3(false);
    //     setOpenPage4(true);

    //     //console.log("setOpenPage3",setOpenPage3);
    //     //console.log("setOpenPage4",setOpenPage4);
    // }
    const onNextClick = () => {
        setUpdateBtnShow(true);
        setOpenPage3(false);
        setOpenPage4(true);
    }
    return (
        <>
            {openPage3 ?


                <>
                    {/* {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : ( */}
                    <Scrollbars
                        className="contain-scroll"
                        autoHide
                        autoHideTimeout={1000}
                        autoHideDuration={200}
                        autoHeight
                        autoHeightMin={100}
                        autoHeightMax={500}
                        thumbMinSize={30}
                        universal={true}
                        style={{ height: '900px' }}
                    >
                        <div className="row">
                            <div className="col-md-6 info-section ">
                                <div className="col-md-12 ">
                                    <span className="text-blue-address">5. KYC, CDD and EDD</span>
                                </div>
                            </div>
                        </div>
                        <div className="edit-content">
                            {/* {onboardStatus === "Ready" && type === "V" ? ( */}
                            <Button

                                style={{ marginTop: "-48px", height: "28px", marginLeft: "-20px" }}
                                className="btn edit-partner"
                                label="Edit"
                                onClick={EditDetails}
                            />
                            {/* // ) : null} */}
                        </div>

                        <div className="row">
                            <div className="col-md-10 info-section" style={{ marginBottom: "10px" }}>
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Does the Entity verify the identity of the customer?
                                        <span className="color-red">*</span>
                                    </span>

                                </div>

                            </div>
                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-35px", marginBottom: "30px", marginTop: "-20px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input

                                                    type="radio"
                                                    id="radio-one"
                                                    name="switch-one"
                                                    value="true"
                                                    checked={isOBL === true}
                                                    onChange={handleYesChange}
                                                />
                                                <label htmlFor={`radio-one`}>Yes</label>
                                                <input

                                                    type="radio"
                                                    id="radio-two"
                                                    name="switch-one"
                                                    value="false"
                                                    checked={isOBL === false}
                                                    onChange={handleNoChange}
                                                />
                                                <label htmlFor={`radio-two`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>




                        </div>

                        <div className="row" style={{ marginTop: "-30px" }}>
                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Do the Entity's policies and procedures set out when CDD must be completed, e.g. at the time of onboarding or within 30 days?
                                        <span className="color-red">*</span>

                                    </span>
                                </div>
                            </div>

                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-36px", marginTop: "-15px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input

                                                    type="radio"
                                                    id="radio-three"
                                                    name="switch-three"
                                                    value="true"
                                                    checked={isOBL1 === true}
                                                    onChange={handleYesChange1}


                                                />
                                                <label htmlFor={`radio-three`}>Yes</label>
                                                <input

                                                    type="radio"
                                                    id="radio-four"
                                                    name="switch-three"
                                                    value="false"
                                                    checked={isOBL1 === false}
                                                    onChange={handleNoChange1}
                                                />
                                                <label htmlFor={`radio-four`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-7 info-section" style={{ marginTop: "-20px" }}>
                            <div className="col-md-12 form-group">
                                <span className="input-label">
                                    Which of the following does the Entity gather and retain when conducting CDD? Select all that apply:
                                    {/* <span className="color-red">*</span> */}
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" style={{ color: 'black' }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="CustomerIdentification1"
                                            //   disabled ={editReadOnly}
                                            style={{ color: 'black' }}
                                            name="Customer Identification"
                                            onChange={onCheckClickdocument}
                                            // checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Customer Identification")?.checkedoption}
                                            // className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Customer Identification")?.checkedoption && "Customer Identification"}
                                            value={complianceModel.Value26}
                                            checked={
                                                (complianceModel.Value26 && complianceModel.Value26.includes("Customer Identification")) ||
                                                documentePolicy.find(policy => policy.deliveryType === "Customer Identification")?.checkedoption || false
                                            }
                                            className={
                                                documentePolicy.find(policy => policy.deliveryType === "Customer Identification")?.checkedoption ? "Customer Identification" : ""
                                            }
                                        />
                                        <span className="form-check-label">
                                            Customer Identification
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            id="ProductUsage1"
                                            style={{ height: "16px", width: "15px" }}
                                            //   disabled ={editReadOnly}
                                            name="Product Usage"
                                            onChange={onCheckClickdocument}
                                            value={complianceModel.Value26}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Product Usage")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Product Usage")?.checkedoption && "Product Usage"}
                                            // />
                                            checked={
                                                (complianceModel.Value26 && complianceModel.Value26.includes("Product Usage")) ||
                                                documentePolicy.find(policy => policy.deliveryType === "Product Usage")?.checkedoption || false
                                            }
                                            className={
                                                documentePolicy.find(policy => policy.deliveryType === "Product Usage")?.checkedoption ? "Product Usage" : ""
                                            }
                                        />

                                        <span className="form-check-label">
                                            Product Usage
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            style={{ height: "16px", width: "15px" }}

                                            id="ExpectedActivity"
                                            //   disabled ={editReadOnly}
                                            name="Expected Activity"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Expected Activity")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Expected Activity")?.checkedoption && "Expected Activity"}
                                        />
                                        <span className="form-check-label">
                                            Expected Activity
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" >
                                        <input
                                            type="checkbox"
                                            id="exampleCheck1"
                                            //   disabled ={editReadOnly}
                                            name="Purpose and nature of relationship"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Purpose and nature of relationship")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Purpose and nature of relationship")?.checkedoption && "Purpose and nature of relationship"}
                                        />
                                        <span className="form-check-label">
                                            Purpose and nature of relationship


                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            id="exampleCheck1"
                                            //   disabled ={editReadOnly}
                                            name="Nature of business/employment"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Nature of business/employment")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Nature of business/employment")?.checkedoption && "Nature of business/employment"}
                                        />
                                        <span className="form-check-label">
                                            Nature of business/employment


                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            id="Sourceoffunds"
                                            //   disabled ={editReadOnly}
                                            name="Source of funds"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Source of funds")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Source of funds")?.checkedoption && "Source of funds"}
                                        />
                                        <span className="form-check-label">
                                            Source of funds

                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" >
                                        <input
                                            type="checkbox"
                                            id="exampleCheck1"
                                            //   disabled ={editReadOnly}
                                            name="Ownership structure"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Ownership structure")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Ownership structure")?.checkedoption && "Ownership structure"}
                                        />
                                        <span className="form-check-label">
                                            Ownership structure

                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            id="exampleCheck1"
                                            //   disabled ={editReadOnly}
                                            name="Source of wealth"
                                            onChange={onCheckClickdocument}
                                            checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Source of wealth")?.checkedoption}
                                            className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Source of wealth")?.checkedoption && "Source of wealth"}
                                        />
                                        <span className="form-check-label">
                                            Source of wealth

                                        </span>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <div className="col-md-7 info-section">
                            <div className="col-md-12 form-group">
                                <span className="input-label">
                                    Are each of the following identified:*
                                    <span className="color-red">*</span>
                                </span>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" style={{ color: 'black' }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="Ultimatebeneficialownership"
                                            //   disabled ={editReadOnly}
                                            style={{ color: 'black' }}

                                            name="Ultimate beneficial ownership"
                                            onChange={onCheckClickpolicies}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Ultimate beneficial ownership")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Ultimate beneficial ownership")?.checkedoption && "Ultimate beneficial ownership"}
                                            // />
                                            value={complianceModel.Value27}
                                            checked={
                                                (complianceModel.Value27 && complianceModel.Value27.includes("Ultimate beneficial ownership")) ||
                                                documente.find(policy => policy.deliveryType === "Ultimate beneficial ownership")?.checkedoption || false
                                            }
                                            className={
                                                documente.find(policy => policy.deliveryType === "Ultimate beneficial ownership")?.checkedoption ? "Ultimate beneficial ownership" : ""
                                            }

                                        />


                                        <span className="form-check-label">
                                            Ultimate beneficial ownership
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address">
                                        <input
                                            type="checkbox"
                                            id="Areultimatebeneficialownersverified"
                                            style={{ height: "16px", width: "15px" }}
                                            //   disabled ={editReadOnly}
                                            name="Are ultimate beneficial owners verified?"
                                            onChange={onCheckClickpolicies}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Are ultimate beneficial owners verified?")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Are ultimate beneficial owners verified?")?.checkedoption && "Are ultimate beneficial owners verified?"}
                                            // />
                                            value={complianceModel.Value27}
                                            checked={
                                                (complianceModel.Value27 && complianceModel.Value27.includes("Are ultimate beneficial owners verified?")) ||
                                                documente.find(policy => policy.deliveryType === "Are ultimate beneficial owners verified?")?.checkedoption || false
                                            }
                                            className={
                                                documente.find(policy => policy.deliveryType === "Are ultimate beneficial owners verified?")?.checkedoption ? "Are ultimate beneficial owners verified?" : ""
                                            }

                                        />
                                        <span className="form-check-label">
                                            Are ultimate beneficial owners verified?
                                        </span>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" style={{ color: 'black' }}
                                    >
                                        <input
                                            type="checkbox"

                                            id="Authorisedsignatorieswhere"
                                            //   disabled ={editReadOnly}
                                            name="Authorised signatories (where applicable)"
                                            onChange={onCheckClickpolicies}
                                            style={{ color: 'black' }}

                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Authorised signatories (where applicable)")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Authorised signatories (where applicable)")?.checkedoption && "Authorised signatories (where applicable)"}
                                            // />
                                            value={complianceModel.Value27}
                                            checked={
                                                (complianceModel.Value27 && complianceModel.Value27.includes("Authorised signatories (where applicable)")) ||
                                                documente.find(policy => policy.deliveryType === "Authorised signatories (where applicable)")?.checkedoption || false
                                            }
                                            className={
                                                documente.find(policy => policy.deliveryType === "Authorised signatories (where applicable)")?.checkedoption ? "Authorised signatories (where applicable)" : ""
                                            }

                                        />
                                        <span className="form-check-label">
                                            Authorised signatories (where applicable)
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4 info-section ">
                                <div className="col-md-6 form-group " >
                                    <div className="register-address" style={{ color: 'black' }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="Keycontrollers"
                                            //   disabled ={editReadOnly}

                                            style={{ color: 'black' }}

                                            name="Key controllers"
                                            onChange={onCheckClickpolicies}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Key controllers")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Key controllers")?.checkedoption && "Key controllers"}
                                            // />
                                            value={complianceModel.Value27}
                                            checked={
                                                (complianceModel.Value27 && complianceModel.Value27.includes("Key controllers")) ||
                                                documente.find(policy => policy.deliveryType === "Key controllers")?.checkedoption || false
                                            }
                                            className={
                                                documente.find(policy => policy.deliveryType === "Key controllers")?.checkedoption ? "Key controllers" : ""
                                            }

                                        />


                                        <span className="form-check-label">
                                            Key controllers
                                        </span>

                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* test */}
                        {/* <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="addressLine1"
                      autoComplete="nope"
                      placeholder="Enter Full Legal Name"
                      value={complianceModel.Value1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i
                        if (re.test(value) || value === '') {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId1: "1",
                            Value1: ev.target.value,
                          });


                          setComplianceComponent({
                            ...complianceComponent,

                            "questionId": "1",
                            "value": ev.target.value,
                          });
                        } */}

                        {/* test */}



                        <div className="row">
                            <div className="col-md-4 info-section ">
                                <div className="col-md-12 form-group " >
                                    <div className="register-address" style={{ color: 'black' }}
                                    >
                                        <input
                                            type="checkbox"
                                            id="Otherrelevantparties"
                                            //   disabled ={editReadOnly}
                                            // onChange={onCheckClick}
                                            style={{ color: 'black' }}
                                            name="Other relevant parties"
                                            onChange={onCheckClickpolicies}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Key controllers")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Key controllers")?.checkedoption && "Key controllers"}
                                            // />

                                            value={complianceModel.Value27}
                                            checked={
                                                (complianceModel.Value27 && complianceModel.Value27.includes("Other relevant parties")) ||
                                                documente.find(policy => policy.deliveryType === "Other relevant parties")?.checkedoption || false
                                            }
                                            className={
                                                documente.find(policy => policy.deliveryType === "Other relevant parties")?.checkedoption ? "Other relevant parties" : ""
                                            }

                                        />


                                        <span className="form-check-label">
                                            Other relevant parties
                                        </span>

                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 info-section " style={{ marginLeft: "-150px" }}>
                                <div className="col-md-6 form-group " >
                                    <input
                                        className="status-check"
                                        name="Receive"
                                        placeholder="Relevant "

                                    />
                                </div>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Does the due diligence process result in customers receiving a risk classification?*
                                        <span className="color-red">*</span>
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-25px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input
                                                    // type="radio"
                                                    // // disabled={readOnly}
                                                    // id={`radio-five`}
                                                    // name={`switch-five`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => SendFeesClickclassification()}


                                                    // onClick={(e: any) => SendFeesClickclassification()}

                                                    type="radio"
                                                    id="radio-five"
                                                    name="switch-five"
                                                    value="true"
                                                    checked={isOBL2 === true}
                                                    onChange={handleYesChange2}
                                                />
                                                <label htmlFor={`radio-five`}>Yes</label>                                                        <input
                                                    // type="radio"
                                                    // defaultChecked={true}
                                                    // id={`radio-six`}
                                                    // name={`switch-five`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => RemoveSendFeesClickclassification()}
                                                    // onClick={(e: any) => RemoveSendFeesClickclassification()}

                                                    type="radio"
                                                    id="radio-six"
                                                    name="switch-handleNoChange2"
                                                    value="false"
                                                    checked={isOBL2 === false}
                                                    onChange={handleNoChange2}
                                                />
                                                <label htmlFor={`radio-six`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        <div className="row">
                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Does the Entity have a risk based approach to screening customers and connected parties to determine whether they are PEPs, or controlled by PEPs?*
                                        {/* <span className="color-red">*</span> */}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-25px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input
                                                    // type="radio"
                                                    // // disabled={readOnly}
                                                    // id={`radio-seven`}
                                                    // name={`switch-seven`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => SendFeesClickPEP()}


                                                    // onClick={(e: any) => SendFeesClickPEP()}

                                                    type="radio"
                                                    id="radio-seven"
                                                    name="switch-seven"
                                                    value="true"
                                                    checked={isOBL3 === true}
                                                    onChange={handleYesChange3}


                                                />
                                                <label htmlFor={`radio-seven`}>Yes</label>                                                        <input
                                                    // type="radio"
                                                    // defaultChecked={true}
                                                    // id={`radio-eight`}
                                                    // name={`switch-seven`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => RemoveSendFeesClickPEP()}
                                                    // onClick={(e: any) => RemoveSendFeesClickPEP()}

                                                    type="radio"
                                                    id="radio-eight"
                                                    name="switch-seven"
                                                    value="false"
                                                    checked={isOBL3 === false}
                                                    onChange={handlNoChange3}
                                                />
                                                <label htmlFor={`radio-eight`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>

                        <div className="row">
                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label" style={{ marginTop: "-10px" }}>
                                        Does the Entity have policies, procedures and processes to review and escalate potential matches from
                                        screening customers and connected parties to determine whether they are PEPs, or controlled by PEPs?

                                        {/* <span className="color-red" >*</span> */}
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-25px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input


                                                    type="radio"
                                                    id="radio-nine"
                                                    name="switch-nine"
                                                    value="true"
                                                    checked={isOBL4 === true}
                                                    onChange={handleYesChange4}
                                                />
                                                <label htmlFor={`radio-nine`}>Yes</label>                                                        <input
                                                    // type="radio"
                                                    // defaultChecked={true}
                                                    // id={`radio-ten`}
                                                    // name={`switch-nine`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => RemoveSendFeesClickPEPpolicies()}
                                                    // onClick={(e: any) => RemoveSendFeesClickPEPpolicies()}

                                                    type="radio"
                                                    id="radio-ten"
                                                    name="switch-nine"
                                                    value="false"
                                                    checked={isOBL4 === false}
                                                    onChange={handleNoChange4}
                                                />
                                                <label htmlFor={`radio-ten`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">

                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Is KYC renewed at defined frequencies based on risk rating (Periodic Reviews)?
                                        <span className="color-red">*</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="row">


                            <div className="col-md-4 info-section ">
                                <div className=" col-md-12 form-group">

                                    <div className="col-md-4 info-section " style={{ marginLeft: "-30px" }}>
                                        <div className="col-md-6 form-group " >
                                            <input
                                                className="status-check"
                                                name="Receive"

                                            />
                                        </div>
                                    </div>


                                </div>
                            </div>
                            <div className="col-md-4 info-section ">
                                <div className=" col-md-12 form-group">

                                    <div className="col-md-4 info-section " style={{ marginLeft: "-80px" }}>
                                        <div className="col-md-6 form-group " >
                                            <input
                                                className="status-check"
                                                name="Receive"

                                            />
                                        </div>
                                    </div>
                                </div>

                                {postaladdresserrorMessage !== null &&
                                    postaladdresserrorMessage.length > 0 && (
                                        <span className="error-msg">
                                            {postaladdresserrorMessage}
                                        </span>
                                    )}
                            </div>
                        </div>



                        <div className="row">

                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        From the list below, which categories of customers or industries are subject to EDD and/or are restricted, or
                                        prohibited by the Entity's FCC programme?
                                    </span>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                // type="checkbox"
                                                // id="ArmsDefenceMilitary"
                                                type="checkbox"
                                                id="ArmsDefenceMilitary"
                                                //   disabled ={editReadOnly}
                                                name="Arms, Defence, Military"
                                                onChange={onCheckClickFCC}
                                                //     checked={complianceModel.find((policy:any) => policy.deliveryType.trim() === "Arms, Defence, Military")?.checkedoption}
                                                //     className={categories.find((policy) => policy.deliveryType.trim() === "Arms, Defence, Military")?.checkedoption && "Arms, Defence, Military"}
                                                // />

                                                // value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Arms, Defence, Military")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Arms, Defence, Military")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Arms, Defence, Military")?.checkedoption ? "Arms, Defence, Military" : ""
                                                }
                                            />

                                            <span className="form-check-label">
                                                Arms, Defence, Military
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 col-md-12 form-group  " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="PaymentServiceProviders"
                                                style={{ height: "16px", width: "15px" }}
                                                //   disabled ={editReadOnly}
                                                name="Payment Service Providers"
                                                onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Payment Service Providers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Payment Service Providers")?.checkedoption && "Payment Service Providers"}
                                                // />
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Payment Service Providers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Payment Service Providers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Payment Service Providers")?.checkedoption ? "Payment Service Providers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Payment Service Providers
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                // type="checkbox"
                                                // id="RespondentBanks"
                                                // name="Respondent Banks"
                                                // style={{ height: "16px", width: "15px" }}
                                                // //   disabled ={editReadOnly}
                                                // onChange={onCheckClickFCC}
                                                type="checkbox"
                                                id="RespondentBanks"
                                                style={{ height: "16px", width: "15px" }}
                                                //   disabled ={editReadOnly}
                                                name="Respondent Banks"
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Respondent Banks  ")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Respondent Banks  ")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Respondent Banks  ")?.checkedoption ? "Respondent Banks  " : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Respondent Banks                                 </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="PEPs "
                                                //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("PEPs")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "PEPs")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "PEPs")?.checkedoption ? "PEPs" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                PEPs                                                                </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Embassies/Consulates"
                                                style={{ height: "16px", width: "15px" }}
                                                name="Embassies/Consulates"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Embassies/Consulates")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Embassies/Consulates")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Embassies/Consulates")?.checkedoption ? "Embassies/Consulates" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Embassies/Consulates
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="PEPCloseAssociates"
                                                style={{ height: "16px", width: "15px" }}
                                                //   disabled ={editReadOnly}
                                                name="PEP Close Associates"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("PEP Close Associates")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "PEP Close Associates")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "PEP Close Associates")?.checkedoption ? "PEP Close Associates" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                PEP Close Associates
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>



                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="Extractiveindustries"
                                                //   disabled ={editReadOnly}
                                                style={{ color: 'black' }}
                                                name="Extractive industries"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Extractive industries")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Extractive industries")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Extractive industries")?.checkedoption ? "Extractive industries" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Extractive industries

                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="PEPRelated"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="PEP Related"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes(" PEP Related")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === " PEP Related")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === " PEP Related")?.checkedoption ? " PEP Related" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                PEP Related
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Gamblingcustomers"
                                                style={{ height: "16px", width: "15px" }}
                                                name="Gambling customers"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Gambling customers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Gambling customers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Gambling customers")?.checkedoption ? "Gambling customers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Gambling customers                                                                                                </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"

                                                id="Preciousmetalsandstone"
                                                //   disabled ={editReadOnly}
                                                style={{ color: 'black' }}
                                                name="Precious metals and stone"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Precious metals and stone")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Precious metals and stone")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Precious metals and stone")?.checkedoption ? "Precious metals and stone" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Precious metals and stone
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="GeneralTradingCompanies"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="General Trading Companies"                                       //   disabled ={editReadOnly}
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("General Trading Companies")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "General Trading Companies")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "General Trading Companies")?.checkedoption ? "General Trading Companies" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                General Trading Companies
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="Redlightbusinesses/Adultentertainment"
                                                style={{ height: "16px", width: "15px" }}
                                                name="Red light businesses/Adult entertainment"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Red light businesses/Adult entertainment")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Red light businesses/Adult entertainment")?.checkedoption && "General Trading CompaniesRed light businesses/Adult entertainment"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Red light businesses/Adult entertainment")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Red light businesses/Adult entertainment")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Red light businesses/Adult entertainment")?.checkedoption ? "Red light businesses/Adult entertainment" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Red light businesses/Adult entertainment
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                //   disabled ={editReadOnly}
                                                style={{ color: 'black' }}
                                                name="Marijuana-relatedEntities"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Marijuana-related Entities")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Marijuana-related Entities")?.checkedoption && "Marijuana-related Entities"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes(" Marijuana-related Entities")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === " Marijuana-related Entities")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === " Marijuana-related Entities")?.checkedoption ? " Marijuana-related Entities" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Marijuana-related Entities
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Regulatedcharities"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="Regulated charities"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Regulated charities")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Regulated charities")?.checkedoption && "Regulated charities"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Regulated charities")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Regulated charities")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Regulated charities")?.checkedoption ? "Regulated charities" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Regulated charities
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="MSB/MVTScustomers"
                                                style={{ height: "16px", width: "15px" }}
                                                //   disabled ={editReadOnly}
                                                name="MSB/MVTS customers"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "MSB/MVTS customers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "MSB/MVTS customers")?.checkedoption && "MSB/MVTS customers"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("MSB/MVTS customers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "MSB/MVTS customers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "MSB/MVTS customers")?.checkedoption ? "MSB/MVTS customers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                MSB/MVTS customers
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="Shellbanks"
                                                //   disabled ={editReadOnly}
                                                style={{ color: 'black' }}
                                                name="Shellbanks"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Shell banks")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Shell banks")?.checkedoption && "Shell banks"}
                                                // />

                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Shell banks")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Shell banks")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Shell banks")?.checkedoption ? "Shell banks" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Shell banks
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Non-accountcustomers"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="Non-account customers"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-account customers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-account customers")?.checkedoption && "Non-account customers"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Non-account customers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-account customers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-account customers")?.checkedoption ? "Non-account customers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Non-account customers
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="form-check-input"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "15px" }}
                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClickFCC}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Travel and Tour Companies")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Travel and Tour Companies")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Travel and Tour Companies")?.checkedoption ? "Travel and Tour Companies" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Travel and Tour Companies
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="Non-GovernmentOrganisations"
                                                //   disabled ={editReadOnly}
                                                style={{ color: 'black' }}
                                                name="Non-Government Organisations"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-Government Organisations")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-Government Organisations")?.checkedoption && "Non-Government Organisations"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Non-Government Organisations ")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-Government Organisations ")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-Government Organisations ")?.checkedoption ? "Non-Government Organisations " : ""
                                                }
                                            />


                                            <span className="form-check-label">
                                                Non-Government Organisations                                    </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Unregulatedcharities"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="Unregulated charities"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Unregulated charities")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Unregulated charities")?.checkedoption && "Unregulated charities"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Unregulated charities")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Unregulated charities")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Unregulated charities")?.checkedoption ? "Unregulated charities" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Unregulated charities
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Non-residentcustomers"
                                                style={{ height: "16px", width: "15px" }}
                                                name="Non-resident customers"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-resident customers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Non-resident customers")?.checkedoption && "Non-resident customers"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Non-resident customers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-resident customers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-resident customers")?.checkedoption ? "Non-resident customers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Non-resident customers
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                style={{ color: 'black' }}
                                                name="Used Car Dealers"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Used Car Dealers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Used Car Dealers")?.checkedoption && "Used Car Dealers"}
                                                // />

                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Used Car Dealers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Used Car Dealers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Used Car Dealers")?.checkedoption ? "Used Car Dealers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Used Car Dealers
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Nuclearpower"
                                                style={{ height: "16px", width: "15px" }}                                        //   disabled ={editReadOnly}
                                                name="Nuclear power"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Nuclear power")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Nuclear power")?.checkedoption && "Nuclear power"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Nuclear power")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Nuclear power")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Nuclear power")?.checkedoption ? "Nuclear power" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Nuclear power
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="VirtualAssetServiceProviders"
                                                style={{ height: "16px", width: "15px" }}
                                                name="Virtual Asset Service Providers"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Virtual Asset Service Providers")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Virtual Asset Service Providers")?.checkedoption && "Virtual Asset Service Providers"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Virtual Asset Service Providers")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Virtual Asset Service Providers")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Virtual Asset Service Providers")?.checkedoption ? "Virtual Asset Service Providers" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Virtual Asset Service Providers
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address" style={{ color: 'black' }}
                                        >
                                            <input
                                                type="checkbox"

                                                id="Other1"
                                                style={{ color: 'black' }}
                                                name="Other"                                       //   disabled ={editReadOnly}
                                                //     onChange={onCheckClickFCC}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Other")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Other")?.checkedoption && "Other"}
                                                // />
                                                onChange={onCheckClickFCC}
                                                value={complianceModel.Value32}
                                                checked={
                                                    (complianceModel.Value32 && complianceModel.Value32.includes("Other (Specify)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Other (Specify)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Other (Specify)")?.checkedoption ? "Other (Specify)" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Other (Specify)
                                            </span>

                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-6 info-section " style={{ marginLeft: "-190px" }}>
                                    <div className="col-md-8 form-group " >
                                        <input
                                            className="status-check"
                                            name="Receive"

                                        />
                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        If EDD or EDD & restricted, does the EDD assessment contain the elements as set out in the Wolfsberg Correspondent Banking Principles 2022?
                                        <span className="color-red">*</span>
                                    </span>
                                </div>
                            </div>

                            <div className="col-md-2 info-section ">
                                <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-25px" }}>
                                    <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                        <div className="Toggle-btn">
                                            <div className="switch-field">
                                                <input
                                                    // type="radio"
                                                    // // disabled={readOnly}
                                                    // id={`radio-eleven`}
                                                    // name={`switch-eleven`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => SendFeesClickprinciple()}


                                                    // onClick={(e: any) => SendFeesClickprinciple()}


                                                    type="radio"
                                                    id="radio-eleven1"
                                                    name="switch-eleven1"
                                                    value="true"
                                                    checked={isOBL5 === true}
                                                    onChange={handleYesChange5}
                                                />
                                                <label htmlFor={`radio-eleven1`}>Yes</label>                                                        <input
                                                    // type="radio"
                                                    // defaultChecked={true}
                                                    // id={`radio-twelve`}
                                                    // name={`switch-eleven`}
                                                    // // onChange={complianceModel.value13}
                                                    // onChange={() => RemoveSendFeesClickprinciple()}
                                                    // onClick={(e: any) => RemoveSendFeesClickprinciple()}

                                                    type="radio"
                                                    id="radio-twelve1"
                                                    name="switch-eleven1"
                                                    value="false"
                                                    checked={isOBL5 === false}
                                                    onChange={handleNoChange5}
                                                />
                                                <label htmlFor={`radio-twelve1`}>No</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="button-section" style={{ marginTop: "-50px" }}>
                            <div className="bottom-btns">
                                <>
                                    {updateBackBtnShow ? (
                                        <Button
                                            type="button"
                                            label="Back"
                                            // loading={backButtonLoading}
                                            className="btn btn-back second-btn"
                                            onClick={onBackClick}
                                        />
                                    ) :
                                        <Button
                                            type="button"
                                            label="Back"
                                            // loading={backButtonLoading}
                                            className="btn btn-back second-btn"
                                            onClick={onBackClick}
                                        />
                                    }

                                    <button
                                        type="button"
                                        // onClick={handleClose}
                                        className="btn btn-cancel second-btn"
                                    >
                                        Cancel
                                    </button>

                                    {updateBtnShow ? (
                                        <Button
                                            iconPos="left"
                                            label={" Save and Continue"}
                                            className="btn btn-continue second-btn"
                                            // loading={buttonLoading}
                                            onClick={onNextClick}
                                        />
                                    ) : (
                                        <Button
                                            iconPos="left"
                                            label="Next"
                                            //   loading={buttonLoadingSkip}
                                            onClick={onNextClick}
                                            className="btn btn-continue btn-next second-btn"
                                        />

                                    )}
                                </>
                            </div>
                        </div>
                        <br></br>
                        <br></br>
                        <br></br>
                        <br></br>

                    </Scrollbars>

                    {/* )} */}
                    {/* </>: openPage4 ?
    
   (
    <MonitoringSanctionProgram setOpenPage4={setOpenPage4} openPage4={openPage4} />
  ) :  ''}
   
     
    </> */}


                </>
                : openPage5 ?
                    <>
                        {/* <MonitoringSanctionProgram  setOpenPage4={setOpenPage4} openPage4={openPage4}/> */}

                        <MonitoringSanctionProgram setOpenPage4={setOpenPage4} openPage4={openPage4} />
                    </> : ''}


        </>
    );
};

export default KYCDetails;
