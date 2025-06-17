import React from "react";
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
import KYCDetails from "./KYCDetails";
import ComplianceServices from "../../../services/complaince/ComplianceServices";


interface IState {
    address: IAddress;
}
const SanctionsProgram: React.FC<any> = ({ onSaveAndContinueClick, onButtonChange, onBackButtonChange, openPage1, setOpenPage2, openPage2 }) => {


    const { partnerid, type } = useParams();

    const [buttonLoading, setButtonLoading] = useState(false);
    const [openPage31, setOpenPage1] = useState(true);

    const [openPage3, setOpenPage3] = useState(true);
    const [openPage4, setOpenPage4] = useState(true);
    // const history = useHistory();

    const [showSaveButton, setShowSaveButton] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    //updated code


    // const { partnerId1, type1 } = useParams();
    const [complianceComponent, setComplianceComponent] = useState({

        "id": 0,
        "partnerId": Number(partnerid),
        "questionId": "",
        "value": "",
        "Pagenumber": "2"

    })
    const [complianceModel, setComplianceModel] = useState({


        id: 0,
        partnerId: Number(partnerid),

        QuestionId1: "",
        Value1: "",
        QuestionId6: "",
        Value6: "",
        QuestionId13: "",
        Value13: "",
        QuestionId14: "",
        Value14: "",
        QuestionId15_1: "",
        Value15_1: "",
        QuestionId15: "",
        Value15: "",
        QuestionId16: "",
        Value16: "",
        QuestionId17: "",
        Value17: "",
        QuestionId18: "",
        Value18: "",
        QuestionId19: "",
        Value19: "",
        QuestionId20: "",
        Value20: "",
        QuestionId21: "",
        Value21: "",
        QuestionId22: "",
        Value22: "",
        QuestionId23: "",
        Value23: "",
        QuestionId23_1: "",
        Value23_1: "",

    });

    const [complianceTrainning, setcomplianceTrainning] = useState([

        {
            id: 0,
            deliveryType: "Board and Senior Committee Management",
            checkedoption: false,

        },
        {
            id: 1,
            deliveryType: "1st Line of Defence",
            checkedoption: false,
        },
        {
            id: 2,
            deliveryType: "2nd Line of Defence",
            checkedoption: false,
        },
        {
            id: 3,
            deliveryType: "3rd Line of Defence",
            checkedoption: false,
        },
        {
            id: 4,
            deliveryType: "Third parties to which specific compliance activities subject ABC risk have been outsourced",
            checkedoption: false,
        },
        {
            id: 5,
            deliveryType: "Non-employed workers as appropriate (contractors/consultants)",
            checkedoption: false,
        }


    ]);


    const [documentePolicy, setdocumentePolicy] = useState([

        {
            id: 0,
            deliveryType: "Money Laundering",
            checkedoption: false,

        },

        {
            id: 1,
            deliveryType: "Terrorist Financing",
            checkedoption: false,

        },

        {
            id: 2,
            deliveryType: "Sanctions Evasion",
            checkedoption: false,

        },


    ]);

    const [documenteEntity, setdocumenteEntity] = useState([

        {
            id: 0,
            deliveryType: "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI",
            checkedoption: false,

        },

        {
            id: 1,
            deliveryType: "Prohibit dealing with other entities that provide banking services to unlicensed banks",
            checkedoption: false,

        },
        {
            id: 2,
            deliveryType: "Prohibit accounts/relationships with shell banks",
            checkedoption: false,

        },

        {
            id: 3,
            deliveryType: "Prohibit dealing with another Entity that provides services to shell banks",
            checkedoption: false,

        },
        {
            id: 4,
            deliveryType: "Prohibit opening and keeping of accounts for Section 311 designated entities",
            checkedoption: false,

        },

        {
            id: 5,
            deliveryType: "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses, casa de cambio, bureaux de change or money transfer agents",
            checkedoption: false,

        },
        {
            id: 6,
            deliveryType: "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates",
            checkedoption: false,

        },

        {
            id: 7,
            deliveryType: "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees",
            checkedoption: false,

        },
        {
            id: 8,
            deliveryType: "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News",
            checkedoption: false,

        },

    ]);








    // const onCheckClickpolicies = (event: any) => {
    //     const { name, checked } = event.target;
    //     const updatedOrganization = [...complianceTrainning];

    //     const updatedPolicy = updatedOrganization.find((policy) => policy.deliveryType === name);
    //     if (updatedPolicy) {
    //         updatedPolicy.checkedoption = checked;
    //     }

    //     // setcomplianceTrainning(updatedOrganization);


    //     setComplianceModel((prevModel) => ({
    //         ...prevModel,
    //         complianceTrainning: updatedOrganization, 
    //         QuestionId19: getSelectedValuesorganization(updatedOrganization),
    //     }));


    //     setComplianceComponent((prevModel) => ({


    //         ...prevModel,
    //         complianceTrainning: updatedOrganization,
    //         "questionId": "19",
    //         value: getSelectedValuesorganization(updatedOrganization),

    //     }));
    //     onComplaince();
    // };



    // const getSelectedValuesorganization = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
    //     return policies
    //         .filter((policy) => policy.checkedoption)
    //         .map((policy) => policy.deliveryType)
    //         .join("/");



    // };

    const onCheckClickpolicies = (event: any) => {
        const { name, checked } = event.target;
        const updatedComplianceTraining = complianceTrainning.map((policy) =>
            policy.deliveryType === name ? { ...policy, checkedoption: checked } : policy
        );

        setcomplianceTrainning(updatedComplianceTraining);

        const selectedValues = getSelectedValuesorganization(updatedComplianceTraining);


        
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value19: selectedValues,
        }));

        setComplianceComponent((prevModel) => ({
            ...prevModel,
            complianceTrainning: updatedComplianceTraining,
            questionId: "19",
            value: selectedValues.join("/"),
        }));

        onComplaince();
    };

    const getSelectedValuesorganization = (policies: any) => {
        return policies
            .filter((policy: any) => policy.checkedoption)
            .map((policy: any) => policy.deliveryType);
    };


    const onCheckClickdocument = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...documentePolicy];

        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            documentePolicy: updatedDocument,
            QuestionId20: getSelectedValues(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument,
            "questionId": "20",
            value: getSelectedValues(updatedDocument),
        }));
        onComplaince();
    };

    const getSelectedValues = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");
    };


    const onCheckClickEntity = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument1 = [...documenteEntity];

        const updatedEntity1 = updatedDocument1.find((policy) => policy.deliveryType === name);
        if (updatedEntity1) {
            updatedEntity1.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);

        

        setComplianceModel((prevModel) => ({
            ...prevModel,
            documenteEntity: updatedDocument1,
            QuestionId21: getSelectedEntity(updatedDocument1),
        }));
        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument1,
            "questionId": "21",
            value: getSelectedValues(updatedDocument1),
          }));
          onComplaince();
          
    };

    const getSelectedEntity = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");
    };














    //updated code
    //old

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

    const [physicalbuildingErrorMessage, setphysicalbuildingErrorMessage] = useState("");

    const [backButtonLoading, setBackButtonLoading] = useState(false)
    const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);

    const [readonly, setReadOnly] = useState(false);

    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [checked, setChecked] = useState(false);

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




    // const [loading, setLoading] = useState(true);

    const [, setError] = useState(false);


    //     useEffect(() => {
    //         onBackButtonChange({ updateBackBtnShow })
    //       }, [updateBackBtnShow])


    //   useEffect(() => {
    //     onButtonChange({ updateBtnShow })
    //   }, [updateBtnShow])

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

        const pagenumber = "2";
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


    // useEffect(() => {

    const onComplaince = () => {

        ComplianceServices.addComplince(complianceComponent).then((data: any) => {


            if (data.status === 200) {
                setComplianceComponent(data.data)
                setShowSaveButton(false);
                setIsEditMode(false);
            }
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

    // , [complianceComponent])



    const onCheckClick = (e: any) => {
        setTimeout(() => {
            setChecked(!e.target.checked);
        }, 100);

        if (e.target.checked) {
            setReadOnly(true);
            setComplianceModel({
                ...complianceModel,
                id: complianceModel.id,

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
    // const onBackClick = () => {
    //     // setUpdateBackBtnShow(true);
    //     setOpenPage1(true);
    //    setOpenPage2(false);
    //    setOpenPage3(false);


    //   };

    const goToPage1 = () => {

        setOpenPage1(true);
        setOpenPage2(false);

    }
    // const onBackClick = () => {
    //     if (openPage1 > 1) {
    //         setOpenPage1(openPage1 - 1);
    //     } else {
    //       // Use window.history for basic navigation
    //     //   history.back();
    //     }
    //   };
    // const onBackClick = () => {

    //     // setBackButtonLoading(true)
    //     setTimeout(() => {
    //     //   onSaveAndContinueClick("B");
    //     //   setUpdateBackBtnShow(true);
    //     //   setReadOnly(false);
    //     setOpenPage1(true)
    //     setOpenPage2(false)
    //     }, 1000)
    //   };


    const EditDetails = () => {
        // setLoading(true);
        setTimeout(() => {
            setIsEditMode(true);
            // setLoading(false);
            setUpdateBtnShow(true);
            setEditReadOnly(false);
        }, 1000);
    };

    const onBackClick1 = () => {

        setOpenPage2(false);
        setOpenPage1(true);
    }

    const onNextClick = () => {
        setOpenPage2(false);
        setOpenPage3(true);
    }


    const [isOBL, setIsOBL] = useState(complianceModel.Value13 === "true");

    useEffect(() => {
        setIsOBL(complianceModel.Value13 === "true");
    }, [complianceModel.Value13]);


    const handleYesChange = () => {

        setIsOBL(true);
        SendFeesClick();
    }

    const SendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value13: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "13",
            value: "yes",
        }));

        onComplaince();
    };

    const handleNoChange = () => {
        setIsOBL(false);
        RemoveSendFeesClick();
    }

    const RemoveSendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value13: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "13",
            value: "no",
        }));

        onComplaince();
    };






    const [isOBL1, setIsOBL1] = useState(complianceModel.Value14 === "true");

    useEffect(() => {
        setIsOBL1(complianceModel.Value14 === "true");
    }, [complianceModel.Value14]);


    const handleYesChange1 = () => {
        setIsOBL1(true);
        SendFeesClickpolicy();

    }

    const SendFeesClickpolicy = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value14: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "14",
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
            Value14: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "14",
            value: "no",
        }));
        onComplaince();
    };


    const [isOBL2, setIsOBL2] = useState(complianceModel.Value15 === "true");

    useEffect(() => {
        setIsOBL2(complianceModel.Value15 === "true");
    }, [complianceModel.Value15]);


    const handleYesChange2 = () => {

        setIsOBL2(true);
        SendFeesClickSanctions();
    }



    const SendFeesClickSanctions = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value15: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "15",
            value: "yes",
        }));
        onComplaince();
    };



    const handleNoChange2 = () => {
        setIsOBL2(false);
        RemoveSendFeesClickSanctions();
    }

    const RemoveSendFeesClickSanctions = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value15: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "15",
            value: "no",
        }));
        onComplaince();
    };


    const [isOBL3, setIsOBL3] = useState(complianceModel.Value16 === "true");

    useEffect(() => {
        setIsOBL3(complianceModel.Value16 === "true");
    }, [complianceModel.Value16]);


    const handleYesChange3 = () => {

        setIsOBL3(true);
        SendFeesClickwhistleblower();
    }




    const SendFeesClickwhistleblower = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value16: "yes",
        }));


        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "16",
            value: "yes",
        }));
        onComplaince();

    };


    const handleNoChange3 = () => {

        setIsOBL3(false);
        RemoveSendFeesClickwhistleblower();
    }


    const RemoveSendFeesClickwhistleblower = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value16: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "16",
            value: "no",
        }));
        onComplaince();

    };



    const [isOBL4, setIsOBL4] = useState(complianceModel.Value17 === "true");

    useEffect(() => {
        setIsOBL4(complianceModel.Value17 === "true");
    }, [complianceModel.Value17]);


    const handleYesChange4 = () => {

        setIsOBL4(true);
        SendFeesClickdocumentedpolicies();
    }




    const SendFeesClickdocumentedpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value17: "yes",
        }));


        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "17",
            value: "yes",
        }));
        onComplaince();

    };

    const handleNoChange4 = () => {

        setIsOBL4(true);
        RemoveSendFeesClickdocumentedpolicies();
    }


    const RemoveSendFeesClickdocumentedpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value17: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "17",
            value: "no",
        }));
    };

    const [isOBL5, setIsOBL5] = useState(complianceModel.Value18 === "true");

    useEffect(() => {
        setIsOBL5(complianceModel.Value18 === "true");
    }, [complianceModel.Value18]);


    const handleYesChange5 = () => {

        setIsOBL5(true);
        SendFeesClickProcedures();
    }

    const SendFeesClickProcedures = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value18: "yes",
        }));


        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "18",
            value: "yes",
        }));
        onComplaince();
    };


    const handleNoChange5 = () => {

        setIsOBL5(false);
        RemoveSendFeesClickProcedures();
    }


    const RemoveSendFeesClickProcedures = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value18: "no",
        }));


        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "18",
            value: "no",
        }));
        onComplaince();
    };



    const [isOBL6, setIsOBL6] = useState(complianceModel.Value22 === "true");

    useEffect(() => {
        setIsOBL6(complianceModel.Value22 === "true");
    }, [complianceModel.Value22]);


    const handleYesChange6 = () => {

        setIsOBL6(true);
        SendFeesClickriskTolerance();
    }

    const SendFeesClickriskTolerance = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value22: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "22",
            value: "yes",
        }));
        onComplaince();
    };


    const handleNoChange6 = () => {

        setIsOBL6(false);
        RemoveSendFeesClickriskTolerance();
    }

    const RemoveSendFeesClickriskTolerance = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value22: "no",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "22",
            value: "no",
        }));
        onComplaince();
    };





    const [isOBL7, setIsOBL7] = useState(complianceModel.Value23 === "true")

    useEffect(() => {
        setIsOBL7(complianceModel.Value23 === "true");
    }, [complianceModel.Value22])



    const handleYesChange7 = () => {

        setIsOBL7(true);
        SendFeesClickApplicablelaws();
    }



    const SendFeesClickApplicablelaws = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value23: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "23",
            value: "yes",
        }));
        onComplaince();

    };

    const handleNoChange7 = () => {

        setIsOBL7(false);
        RemoveSendFeesClickApplicablelaws();
    }


    const RemoveSendFeesClickApplicablelaws = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value23: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "23",
            value: "no",
        }));
        onComplaince();
    };


    return (
        <>
            {openPage2 ?
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
                        <div className="container-fluid acc-screen register-main-div address-main">
                            <div className="edit-content">
                                {/* {onboardStatus === "Ready" && type === "V" ? ( */}
                                <Button
                                    className="btn edit-partner"
                                    label="Edit"
                                    onClick={EditDetails}
                                />
                                {/* ) : null} */}
                            </div>
                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">2. AML, CTF & SANCTIONS PROGRAMME</span>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-10 info-section" >
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have a programme that sets minimum AML, CTF and Sanctions standards?*

                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-2 info-section">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-25px" }}>
                                        <div className="toggle-country" style={{ marginBottom: "15px" }}>
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
                                                    <label htmlFor="radio-one">Yes</label>
                                                    <input
                                                        type="radio"
                                                        // defaultChecked={true}
                                                        id="radio-two"
                                                        name="switch-one"
                                                        value="false"
                                                        checked={isOBL === false}
                                                        onChange={handleNoChange}

                                                    />
                                                    <label htmlFor="radio-two">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div></div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "-10px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Is the Entity's AML, CTF & Sanctions policy approved at least annually by the Board or equivalent Senior?<span className="color-red">*</span>
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
                                                        id="radio-four"
                                                        name="switch-four"
                                                        value="true"
                                                        checked={isOBL1 === true}
                                                        onChange={handleYesChange1}

                                                    />
                                                    <label htmlFor={`radio-four`}>Yes</label>
                                                    <input
                                                        type="radio"
                                                        // defaultChecked={true}
                                                        id="radio-five"
                                                        name="switch-four"
                                                        value="false"
                                                        checked={isOBL1 === false}
                                                        onChange={handleNoChange1}
                                                    />
                                                    <label htmlFor={`radio-five`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "-5px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity use third parties to carry out any components of its AML, CTF & Sanctions programme?
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
                                                        // disabled={readOnly}

                                                        // onChange={complianceModel.Value13}
                                                        // onChange={() => SendFeesClickSanctions()}


                                                        // onClick={(e: any) => SendFeesClickSanctions()}


                                                        type="radio"
                                                        // defaultChecked={true}
                                                        id="radio-eight"
                                                        name="switch-eight"
                                                        value="true"
                                                        checked={isOBL2 === true}
                                                        onChange={handleYesChange2}
                                                    />
                                                    <label htmlFor={`radio-eight`}>Yes</label>
                                                    <input

                                                        // onChange={complianceModel.Value13}
                                                        // onChange={() => RemoveSendFeesClickSanctions()}
                                                        // onClick={(e: any) => RemoveSendFeesClickSanctions()}

                                                        type="radio"
                                                        // defaultChecked={true}
                                                        id="radio-nine"
                                                        name="switch-eight"
                                                        value="false"
                                                        checked={isOBL2 === false}
                                                        onChange={handleNoChange2}
                                                    />
                                                    <label htmlFor={`radio-eight`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>




                            {/* <div className="row">
                                    <div className="col-md-8 info-section" style={{ marginTop: "-10px" }}>
                                        <div className="col-md-12 form-group">
                                            <span className="input-label">
                                                Third party entity details
                                                <span className="color-red">*</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 info-section " style={{}}>
                                        <div className="col-md-12 switch-style" style={{ marginLeft: "-500px", marginBottom: "-170px", width: "25" }}>
                                            <input
                                                className="status-check"
                                                name="Receive"

                                            />
                                        </div>
                                    </div>
                                </div> */}

                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-8 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Third party entity details
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section " style={{ marginLeft: "-350px" }}>
                                    <div className=" col-md-12 form-group ">

                                        <input
                                            disabled={editReadOnly}
                                            className="form-control "
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Third party entity details"

                                            value={complianceModel.Value15_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value;
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        Value15_1: ev.target.value,
                                                    });
                                                    setComplianceComponent({
                                                        ...complianceComponent,
                                                        questionId: "15.1",
                                                        value: value,
                                                    });

                                                }
                                                onComplaince();


                                            }}
                                        />
                                        {/[#$&]/.test(complianceModel.Value15_1) && (
                                            <span className="error-msg">Field should be speical characters </span>
                                        )}
                                        {/* {postaladdresserrorMessage !== null &&
                        postaladdresserrorMessage.length > 0 && (
                          <span className="error-msg">
                            {postaladdresserrorMessage}
                          </span>
                        )} */}
                                    </div>
                                </div>

                            </div>


                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "20px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the entity have a whistleblower policy?
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 info-section ">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-15px" }}>
                                        <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                            <div className="Toggle-btn">
                                                <div className="switch-field">
                                                    <input
                                                        type="radio"


                                                        // onChange={complianceModel.Value13}
                                                        // onChange={() => SendFeesClickwhistleblower()}

                                                        id="radio-thirteen"
                                                        name="switch-thirteen"
                                                        value="true"
                                                        checked={isOBL3 === true}
                                                        onChange={handleYesChange3}
                                                    />
                                                    <label htmlFor={`radio-thirteen`}>Yes</label>
                                                    <input

                                                        // onChange={() => RemoveSendFeesClickwhistleblower()}
                                                        // onClick={(e: any) => RemoveSendFeesClickwhistleblower()}

                                                        id="radio-fourteen"
                                                        name="switch-thirteen"
                                                        value="false"
                                                        checked={isOBL3 === false}
                                                        onChange={handleNoChange3}


                                                        type="radio"
                                                    // defaultChecked={true}
                                                    // id="radio-nine"
                                                    // name="switch-eight"
                                                    // value="false"
                                                    // checked={isOBL2 === false}
                                                    // onChange={handleNoChange2}
                                                    />
                                                    <label htmlFor={`radio-fourteen`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">3. ANTI BRIBERY & CORRUPTION</span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Has the Entity documented policies and procedures consistent with applicable ABC regulations and requirements to reasonably prevent, detect and report?

                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 info-section ">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-15px" }}>
                                        <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                            <div className="Toggle-btn">
                                                <div className="switch-field">
                                                    <input

                                                        type="radio"
                                                        id="radio-fifteen"
                                                        name="switch-fifteen"
                                                        value="true"
                                                        checked={isOBL4 === true}
                                                        onChange={handleYesChange4}
                                                    />
                                                    <label htmlFor={`radio-fifteen`}>Yes</label>
                                                    <input

                                                        type="radio"
                                                        id="radio-sixteen"
                                                        name="switch-fifteen"
                                                        value="false"
                                                        checked={isOBL4 === false}
                                                        onChange={handleNoChange4}


                                                    />
                                                    <label htmlFor={`radio-sixteen`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "-10px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity's internal audit function or other independent third party cover ABC Policies and Procedures?
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 info-section ">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-15px" }}>
                                        <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                            <div className="Toggle-btn">
                                                <div className="switch-field">
                                                    <input
                                                        // type="radio"
                                                        // // disabled={readOnly}
                                                        // id={`radio-eleven`}
                                                        // name={`switch-eleven`}
                                                        // // onChange={complianceModel.Value13}
                                                        // onChange={() => SendFeesClickProcedures()}


                                                        // onClick={(e: any) => SendFeesClickProcedures()}


                                                        type="radio"
                                                        id="radio-seventeen"
                                                        name="switch-seventeen"
                                                        value="true"
                                                        checked={isOBL5 === true}
                                                        onChange={handleYesChange5}
                                                    />
                                                    <label htmlFor={`radio-seventeen`}>Yes</label>                                                        <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-twele`}
                                                        // name={`switch-eleven`}
                                                        // // onChange={complianceModel.Value13}
                                                        // onChange={() => RemoveSendFeesClickProcedures()}
                                                        // onClick={(e: any) => RemoveSendFeesClickProcedures()}

                                                        type="radio"
                                                        id="radio-eighteen"
                                                        name="switch-seventeen"
                                                        value="false"
                                                        checked={isOBL5 === false}
                                                        onChange={handleNoChange5}
                                                    />
                                                    <label htmlFor={`radio-eighteen`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className="row">
                                <div className="col-md-12 info-section " style={{ marginBottom: "20px" }}>
                                    <div className="col-md-12 ">
                                        <span >
                                            Does the Entity provide mandatory ABC training to
                                        </span>
                                    </div>
                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="examplencommitee"
                                                name="Board and Senior Committee Management"
                                                // disabled={editReadOnly}
                                                onChange={onCheckClickpolicies}
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType.trim() === "BoardandSeniorCommitteeManagement")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType.trim() === "BoardandSeniorCommitteeManagement")?.checkedoption ? "BoardandSeniorCommitteeManagement" : ""}
                                                // />
                                                value={complianceModel.Value19}

                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("Board and Senior Committee Management")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "Board and Senior Committee Management")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "Board and Senior Committee Management")?.checkedoption ? "Board and Senior Committee Management" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Board and Senior Committee Management
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">




                                            <input
                                                // style={{ height: "15px", width: "36px",  marginRight:"-550px"}}
                                                style={{ height: "15px", width: "36px", marginLeft: "-490px" }}

                                                type="checkbox"
                                                id="exampleCheck1"
                                                name="Third parties to which specific compliance activities subject ABC risk have been outsourced"
                                                // disabled={editReadOnly}
                                                onChange={onCheckClickpolicies}
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType === "ThirdpartiestowhichspecificcomplianceactivitiessubjectABCriskhavebeenoutsourced")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType === "ThirdpartiestowhichspecificcomplianceactivitiessubjectABCriskhavebeenoutsourced")?.checkedoption ? "ThirdpartiestowhichspecificcomplianceactivitiessubjectABCriskhavebeenoutsourced" : ""}
                                                // />

                                                value={complianceModel.Value19}

                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("Third parties to which specific compliance activities subject ABC risk have been outsourced")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "Third parties to which specific compliance activities subject ABC risk have been outsourced")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "Third parties to which specific compliance activities subject ABC risk have been outsourced")?.checkedoption ? "Third parties to which specific compliance activities subject ABC risk have been outsourced" : ""
                                                }
                                            />
                                            <span className="form-check-label" style={{ marginLeft: "-260px" }} >
                                                Third parties to which specific compliance activities subject ABC risk have been outsourced
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="exampleCheck2"
                                                //   disabled ={editReadOnly}
                                                name="1st Line of Defence"
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType === "1st Line of Defence")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType === " 1st Line of Defence")?.checkedoption ? " 1st Line of Defence" : ""}
                                                // />
                                                onChange={onCheckClickpolicies}
                                                value={complianceModel.Value19}
                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("1st Line of Defence")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "1st Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "1st Line of Defence")?.checkedoption ? "1st Line of Defence" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                1st Line of Defence
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="exampleCheckLine"
                                                name="2nd Line of Defence"
                                                onChange={onCheckClickpolicies}
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType === "2nd Line of Defence")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType === "2nd Line of Defence")?.checkedoption ? " 2nd Line of Defence" : ""}
                                                // />

                                                value={complianceModel.Value19}
                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("2nd Line of Defence")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "2nd Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "2nd Line of Defence")?.checkedoption ? "2nd Line of Defence" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                2nd Line of Defence

                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="exampleCheck4"
                                                style={{ height: "16px", width: "20px", marginLeft: "-200px" }}

                                                name="Non-employed workers as appropriate (contractors/consultants)"
                                                onChange={onCheckClickpolicies}
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType === "Non-employedworkersasappropriate(contractors/consultants)")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType === "Non-employedworkersasappropriate(contractors/consultants)")?.checkedoption ? "Non-employedworkersasappropriate(contractors/consultants)" : ""}
                                                // />

                                                value={complianceModel.Value19}
                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("Non-employed workers as appropriate (contractors/consultants)")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "Non-employed workers as appropriate (contractors/consultants)")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "Non-employed workers as appropriate (contractors/consultants)")?.checkedoption ? "Non-employed workers as appropriate (contractors/consultants)" : ""
                                                }
                                            />
                                            <span className="form-check-label" style={{ marginLeft: "-270px" }} >
                                                Non-employed workers as appropriate (contractors/consultants)
                                            </span>
                                        </div>
                                    </div>

                                </div>


                            </div>
                            <div className="row">

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="exampleCheck5"
                                                //   disabled ={editReadOnly}
                                                name="3rd Line of Defence"
                                                onChange={onCheckClickpolicies}
                                                //     checked={complianceTrainning.find((policy) => policy.deliveryType === "3rd Line of Defence")?.checkedoption || false}
                                                //     className={complianceTrainning.find((policy) => policy.deliveryType === "3rd Line of Defence")?.checkedoption ? "3rd Line of Defence" : ""}
                                                // />
                                                value={complianceModel.Value19}
                                                checked={
                                                    (complianceModel.Value19 && complianceModel.Value19.includes("3rd Line of Defence")) ||
                                                    complianceTrainning.find(policy => policy.deliveryType === "3rd Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    complianceTrainning.find(policy => policy.deliveryType === "3rd Line of Defence")?.checkedoption ? "3rd Line of Defence" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                3rd Line of Defence
                                            </span>
                                        </div>
                                    </div>

                                </div>

                            </div>








                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">4. AML, CTF & SANCTIONS POLICIES & PROCEDURES
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 info-section ">
                                    <div className="col-md-12 ">
                                        <span >
                                            Has the Entity documented policies and procedures consistent with applicable AML, CTF & Sanctions regulations and
                                            requirements to reasonably prevent, detect and report:*
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="example4"
                                                name="Money Laundering"
                                                onChange={onCheckClickdocument}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Money Laundering")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Money Laundering")?.checkedoption && "Money Laundering"}
                                                // />
                                                
                                                value={complianceModel.Value20}
                                                checked={
                                                    (complianceModel.Value20 && complianceModel.Value20.includes("Money Laundering")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Money Laundering")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Money Laundering")?.checkedoption ? "Money Laundering" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Money Laundering
                                            </span>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px", color: "black", borderBlockColor: "black" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                //   disabled ={editReadOnly}
                                                name="Terrorist Financing"
                                                onChange={onCheckClickdocument}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Terrorist Financing")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Terrorist Financing")?.checkedoption && "Terrorist Financing"}
                                                // />

                                                value={complianceModel.Value20}
                                                checked={
                                                    (complianceModel.Value20 && complianceModel.Value20.includes("Terrorist Financing")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Terrorist Financing")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Terrorist Financing")?.checkedoption ? "Terrorist Financing" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Terrorist Financing
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheckdoc"
                                                name="Sanctions Evasion"
                                                onChange={onCheckClickdocument}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Sanctions Evasion")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Sanctions Evasion")?.checkedoption && "Sanctions Evasion"}
                                                // />

                                                value={complianceModel.Value20}
                                                checked={
                                                    (complianceModel.Value20 && complianceModel.Value20.includes("Sanctions Evasion")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Sanctions Evasion")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Sanctions Evasion")?.checkedoption ? "Sanctions Evasion" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Sanctions Evasion
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12 info-section " style={{ marginBottom: "20px" }}>
                                    <div className="col-md-12 ">
                                        <span >
                                            Does the Entity have policies and procedures that:
                                        </span>
                                    </div>
                                </div>
                            </div>



                            <div className="row">

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleProhibit"
                                                //   disabled ={editReadOnly}
                                                name="Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI"
                                                onChange={onCheckClickEntity}
                                                value={complianceModel.Value21}

                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI")?.checkedoption && "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI"}
                                                // />
                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI")?.checkedoption ? "Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Prohibit the opening and keeping of accounts for unlicensed banks and/or NBFI

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheck21"
                                                //   disabled ={editReadOnly}
                                                style={{ height: "16px", width: "15px" }}
                                                name="Prohibit dealing with other entities that provide banking services to unlicensed banks"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit dealing with other entities that provide banking services to unlicensed banks")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit dealing with other entities that provide banking services to unlicensed banks")?.checkedoption && "Prohibit dealing with other entities that provide banking services to unlicensed banks"}
                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit dealing with other entities that provide banking services to unlicensed banks")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit dealing with other entities that provide banking services to unlicensed banks")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit dealing with other entities that provide banking services to unlicensed banks")?.checkedoption ? "Prohibit dealing with other entities that provide banking services to unlicensed banks" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Prohibit dealing with other entities that provide banking services to unlicensed banks
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>



                            <div className="row">

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleC"
                                                //   disabled ={editReadOnly}
                                                name="Prohibit accounts/relationships with shell banks"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit accounts/relationships with shell banks")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit accounts/relationships with shell banks")?.checkedoption && "Prohibit accounts/relationships with shell banks"}

                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit accounts/relationships with shell banks")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit accounts/relationships with shell banks")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit accounts/relationships with shell banks")?.checkedoption ? "Prohibit accounts/relationships with shell banks" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Prohibit accounts/relationships with shell banks

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCh"
                                                //   disabled ={editReadOnly}
                                                name="Prohibit dealing with another Entity that provides services to shell banks"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit dealing with another Entity that provides services to shell banks")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit dealing with another Entity that provides services to shell banks")?.checkedoption && "Prohibit dealing with another Entity that provides services to shell banks"}

                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit dealing with another Entity that provides services to shell banks")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit dealing with another Entity that provides services to shell banks")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit dealing with another Entity that provides services to shell banks")?.checkedoption ? "Prohibit dealing with another Entity that provides services to shell banks" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Prohibit dealing with another Entity that provides services to shell banks
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="example31"
                                                //   disabled ={editReadOnly}
                                                name="Prohibit opening and keeping of accounts for Section 311 designated entities"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption && "Prohibit opening and keeping of accounts for Section 311 designated entities"}

                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit opening and keeping of accounts for Section 311 designated entities")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption ? "Prohibit opening and keeping of accounts for Section 311 designated entities" : ""
                                                }
                                            />
                                            <span className="form-check-label">

                                                Prohibit opening and keeping of accounts for Section 311 designated entities
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <div className="row">
                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "25px" }}
                                                name="Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses,casa de cambio, bureaux de change or money transfer agents"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses,casa de cambio, bureaux de change or money transfer agents")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses,casa de cambio, bureaux de change or money transfer agents")?.checkedoption && "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses,casa de cambio, bureaux de change or money transfer agents"}

                                                // />
                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses, casa de cambio, bureaux de change or money transfer agents")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses, casa de cambio, bureaux de change or money transfer agents")?.checkedoption ? "Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses, casa de cambio, bureaux de change or money transfer agents" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Prohibit opening and keeping of accounts for any of unlicensed/unregulated remittance agents, exchanges houses, casa de cambio, bureaux de change or money transfer agents
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"

                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "15px" }}

                                                //   disabled ={editReadOnly}
                                                name="Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates")?.checkedoption && "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates"}

                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Prohibit opening and keeping of accounts for Section 311 designated entities")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates")?.checkedoption ? "Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Assess the risks of relationships with domestic and foreign PEPs, including their family and close associates

                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "15px" }}

                                                name="Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees"
                                                onChange={onCheckClickEntity}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees")?.checkedoption && "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees"}

                                                // />

                                                checked={
                                                    (complianceModel.Value21 && complianceModel.Value21.includes("Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees")) ||
                                                    documenteEntity.find(policy => policy.deliveryType === "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees")?.checkedoption || false
                                                }
                                                className={
                                                    documenteEntity.find(policy => policy.deliveryType === "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees")?.checkedoption ? "Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Define the process for escalating financial crime risk issues/potentially suspicious activity identified by employees
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-8 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address" style={{ marginTop: "10px" }}>
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                //   disabled ={editReadOnly}
                                                style={{ height: "16px", width: "15px" }}

                                                name="Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News"
                                                onChange={onCheckClickEntity}
                                            //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News")?.checkedoption}
                                            //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News")?.checkedoption && "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News"}

                                            // />
                                            checked={
                                                (complianceModel.Value21 && complianceModel.Value21.includes("Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News")) ||
                                                documenteEntity.find(policy => policy.deliveryType === "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News")?.checkedoption || false
                                            }
                                            className={
                                                documenteEntity.find(policy => policy.deliveryType === "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News")?.checkedoption ? "Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News" : ""
                                            }
                                        />
                                            <span className="form-check-label">
                                                Outline the processes regarding screening for sanctions, PEPs and Adverse Media/Negative News
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section" >
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Has the Entity defined a risk tolerance statement or similar document which defines a risk boundary around their business?
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 info-section ">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-15px" }}>
                                        <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                            <div className="Toggle-btn">
                                                <div className="switch-field">
                                                    <input
                                                        type="radio"
                                                        id="radio-nineteen"
                                                        name="switch-nineteen"
                                                        value="true"
                                                        checked={isOBL6 === true}
                                                        onChange={handleYesChange6}
                                                    />
                                                    <label htmlFor={`radio-nineteen`}>Yes</label>
                                                    <input
                                                        type="radio"
                                                        id="radio-twenty"
                                                        name="switch-nineteen"
                                                        value="false"
                                                        checked={isOBL6 === false}
                                                        onChange={handleNoChange6}
                                                    />
                                                    <label htmlFor={`radio-twenty`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "-10px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have record retention procedures that comply with applicable laws?
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-2 info-section ">
                                    <div className="col-md-12 switch-style" style={{ marginLeft: "-40px", marginTop: "-15px" }}>
                                        <div className="toggle-country " style={{ marginBottom: "15px" }}>
                                            <div className="Toggle-btn">
                                                <div className="switch-field">
                                                    <input
                                                        // type="radio"
                                                        // // disabled={readOnly}
                                                        // id={`radio-nine2`}
                                                        // name={`switch-nine2`}
                                                        // // onChange={complianceModel.Value13}
                                                        // onChange={() => SendFeesClickApplicablelaws()}


                                                        // onClick={(e: any) => SendFeesClickApplicablelaws()}

                                                        type="radio"
                                                        id="radio-twentyone"
                                                        name="switch-twentyone"
                                                        value="true"
                                                        checked={isOBL7 === true}
                                                        onChange={handleYesChange7}
                                                    />
                                                    <label htmlFor={`radio-twentyone`}>Yes</label>                                                        <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-ten2`}
                                                        // name={`switch-nine2`}
                                                        // // onChange={complianceModel.Value13}
                                                        // onChange={() => RemoveSendFeesClickApplicablelaws()}
                                                        // onClick={(e: any) => RemoveSendFeesClickApplicablelaws()}
                                                        type="radio"
                                                        id="radio-twentytwo"
                                                        name="switch-twentyone"
                                                        value="false"
                                                        checked={isOBL7 === false}
                                                        onChange={handleNoChange7}
                                                    />
                                                    <label htmlFor={`radio-twentytwo`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="row" style={{ marginTop: "-20px" }}>
                                <div className="col-md-8 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Retention Period
                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section " style={{ marginLeft: "-350px" }}>
                                    <div className=" col-md-12 form-group ">

                                        <input
                                            disabled={editReadOnly}
                                            className="form-control "
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Retention Period"

                                            value={complianceModel.Value23_1}




                                            onChange={(ev) => {
                                                const value = ev.target.value;
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        Value23_1: ev.target.value,
                                                    });
                                                }

                                                setComplianceComponent({
                                                    ...complianceComponent,
                                                    questionId: "23.1",
                                                    value: value,
                                                });
                                                onComplaince();
                                            }}






                                        />

                                        {/* {postaladdresserrorMessage !== null &&
                        postaladdresserrorMessage.length > 0 && (
                          <span className="error-msg">
                            {postaladdresserrorMessage}
                          </span>
                        )} */}
                                    </div>
                                </div>

                            </div>

                            {/* <div className="row">
                                    <div className="col-md-8 info-section">
                                        <div className="col-md-12 form-group">
                                            <span className="input-label">
                                                Retention Period
                                                <span className="color-red">*</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-4 info-section ">
                                        <div className="col-md-12 switch-style" style={{ marginLeft: "-590px", width: "25" }}>
                                            <input
                                                className="status-check"
                                                name="Receive"

                                            />
                                        </div>
                                    </div>

                                </div> */}

                            <div className="row">
                                <div className="button-section">
                                    <div className="bottom-btns">
                                        <>
                                            {updateBackBtnShow ? (
                                                <Button
                                                    type="button"
                                                    label="Back"
                                                    // loading={backButtonLoading}
                                                    className="btn btn-back second-btn"
                                                    onClick={onBackClick1}
                                                />
                                            ) :
                                                <Button
                                                    type="button"
                                                    label="Back"
                                                    // loading={backButtonLoading}
                                                    className="btn btn-back second-btn"
                                                    onClick={onBackClick1}
                                                />
                                            }

                                            <button
                                                type="button"
                                                // onClick={handleClose}
                                                className="btn btn-cancel second-btn"
                                            >
                                                Cancel
                                            </button>

                                            {/* {updateBtnShow ? ( */}
                                            {showSaveButton && isEditMode ? (




                                                <Button
                                                    iconPos="left"
                                                    label={" Save and Continue"}
                                                    className="btn btn-continue second-btn"
                                                    onClick={onComplaince}
                                                />
                                            ) : (
                                                <Button
                                                    iconPos="left"
                                                    label="Next"
                                                    onClick={onNextClick}
                                                    className="btn btn-continue btn-next second-btn"
                                                />
                                            )}
                                        </>
                                    </div>
                                </div>
                            </div>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>


                        </div>
                    </Scrollbars>

                </>
                : openPage4 ?
                    <>
                        <KYCDetails setOpenPage3={setOpenPage3} openPage3={openPage3} />
                    </> : ''}


        </>
    );
};
export default SanctionsProgram;
