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
import TrainingProgram from "./TrainingProgram";
import ComplianceServices from "../../../services/complaince/ComplianceServices";



interface IState {
    address: IAddress;
}
const MonitoringSanctionProgram: React.FC<any> = ({ setOpenPage3, setOpenPage4, openPage4, onSaveAndContinueClick, buttonLoadingSkip }) => {
    const { partnerid, type } = useParams();
    const [openPage5, setOpenPage5] = useState(true);
    const [openPage6, setOpenPage6] = useState(true);


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






    // const { partnerId1, type1 } = useParams();

    const [complianceComponent, setComplianceComponent] = useState({

        "id": 0,
        // "partnerId": Number(partnerId1),
        "partnerId": Number(partnerid),

        "questionId": "",
        "value": "",
        "Pagenumber": "4"

    })
    const [complianceModel, setComplianceModel] = useState({
        id: 0,
        // partnerId: Number(partnerId1),
        partnerId: Number(partnerid),


        QuestionId34: "",
        Value34: "",
        QuestionId35_1: "",
        Value35_1: "",
        QuestionId36: "",
        Value36: "",
        QuestionId37: "",
        Value37: "",
        QuestionId38: "",
        Value38: "",

        QuestionId39_1_1: "",
        Value39_1_1: "",
        QuestionId39_1: "",
        Value39_1: "",
        QuestionId39_2: "",
        Value39_2: "",
        QuestionId39_2_1: "",
        Value39_2_1: "",


        QuestionId40: "",
        Value40: "",
        QuestionId41: "",
        Value41: "",
        QuestionId42: "",
        Value42: "",
        QuestionId43: "",
        Value43: "",
        QuestionId44: "",
        Value44: "",
        QuestionId30: "",
        Value30: "",


    })

    const [documentePolicy, setdocumentePolicy] = useState([

        {
            id: 0,
            deliveryType: "Consolidated United Nations Security Council Sanctions List (UN)",
            checkedoption: false,

        },

        {
            id: 1,
            deliveryType: "United States Department of the Treasury's Office of Foreign Assets Control (OFAC)",
            checkedoption: false,

        },
        {
            id: 2,
            deliveryType: "Office of Financial Sanctions Implementation HMT (OFSI)",
            checkedoption: false,

        },
        {
            id: 3,
            deliveryType: "European Union Consolidated List (EU)",
            checkedoption: false,

        },
        {
            id: 4,
            deliveryType: "Lists maintained by other G7 member countries",
            checkedoption: false,

        },
        {
            id: 5,
            deliveryType: "Other(Specify)",
            checkedoption: false,

        },

    ])


    const [Recommendation, setRecommendation] = useState([

        {
            id: 0,
            deliveryType: "FATF Recommendation 16",
            checkedoption: false,

        },



    ])

    const [Recommendation2, setRecommendation2] = useState([



        {
            id: 0,
            deliveryType: "Local Regulations",
            checkedoption: false,

        },

    ])



    const [isOBL, setIsOBL] = useState(complianceModel.Value34 === "true");

    useEffect(() => {
        setIsOBL(complianceModel.Value34 === "true");
    }, [complianceModel.Value34]);


    const handleYesChange = () => {

        setIsOBL(true);
        SendFeesClickReporting();
    }

    const SendFeesClickReporting = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value34: "yes",
        }));

        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "34",
            value: "yes",
        }));

        onComplaince();
    };

    const handleNoChange = () => {
        setIsOBL(false);
        RemoveSendFeesClickReporting();
    }

    const RemoveSendFeesClickReporting = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value34: "",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "34",
            value: "yes",
        }));

        onComplaince();
    };



    const [isOBL1, setIsOBL1] = useState(complianceModel.Value36 === "true");

    useEffect(() => {
        setIsOBL1(complianceModel.Value36 === "true");
    }, [complianceModel.Value36]);


    const handleYesChange1 = () => {
        setIsOBL1(true);
        SendFeesClicktransactions();

    }


    const SendFeesClicktransactions = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value36: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "36",
            value: "yes",
        }));
        onComplaince();
    };


    const handleNoChange1 = () => {
        setIsOBL1(true);
        RemoveSendFeesClicktransactions();

    }

    const RemoveSendFeesClicktransactions = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value36: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "36",
            value: "no",
        }));
        onComplaince();
    };


    const [isOBL3, setIsOBL3] = useState(complianceModel.Value38 === "true");

    useEffect(() => {
        setIsOBL3(complianceModel.Value38 === "true");
    }, [complianceModel.Value38]);


    const handleYesChange3 = () => {
        setIsOBL3(true);
        SendFeesClick1();

    }



    const SendFeesClick1 = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value38: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "38",
            value: "yes",
        }));
        onComplaince();
    };

    const handleNoChange3 = () => {
        setIsOBL3(false);
        RemoveSendFeesClick1();

    }
    const RemoveSendFeesClick1 = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value38: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "38",
            value: "no",
        }));
        onComplaince();
    };


    const [isOBL2, setIsOBL2] = useState(complianceModel.Value37 === "true");

    useEffect(() => {
        setIsOBL2(complianceModel.Value37 === "true");
    }, [complianceModel.Value37]);

    const handleYesChange2 = () => {
        setIsOBL2(true);
        SendFeesClickpolicies();

    }


    const SendFeesClickpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value37: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "37",
            value: "yes",
        }));
        onComplaince();
    };


    const handleNoChange2 = () => {
        setIsOBL2(false);
        RemoveSendFeesClickpolicies();

    }

    const RemoveSendFeesClickpolicies = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value37: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "15",
            value: "no",
        }));
        onComplaince();
    };


    const [isOBL4, setIsOBL4] = useState(complianceModel.Value40 === "true");

    useEffect(() => {
        setIsOBL4(complianceModel.Value40 === "true");
    }, [complianceModel.Value40]);


    const handleYesChange4 = () => {
        setIsOBL4(true);
        SendinstitutionsClick();

    }



    const SendinstitutionsClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value40: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "40",
            value: "yes",
        }));
        onComplaince();

    };

    const handleNoChange4 = () => {
        setIsOBL4(false);
        RemoveSendinstitutionsClick();

    }

    const RemoveSendinstitutionsClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value40: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "40",
            value: "no",
        }));
        onComplaince();

    };



    const [isOBL5, setIsOBL5] = useState(complianceModel.Value42 === "true");

    useEffect(() => {
        setIsOBL5(complianceModel.Value42 === "true");
    }, [complianceModel.Value42]);


    const handleYesChange5 = () => {

        setIsOBL5(true);
        SendSanctionsListsClick();
    }


    const SendSanctionsListsClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value42: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "42",
            value: "yes",
        }));
        onComplaince();
    };

    const handleNoChange5 = () => {

        setIsOBL5(false);
        RemoveSendSanctionsListsClick();
    }


    const RemoveSendSanctionsListsClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value42: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "42",
            value: "no",
        }));
    };


    const [isOBL6, setIsOBL6] = useState(complianceModel.Value41 === "true");

    useEffect(() => {
        setIsOBL6(complianceModel.Value40 === "true");
    }, [complianceModel.Value41]);


    const handleYesChange6 = () => {
        setIsOBL6(true);
        SendResubmissionClick();

    }




    const SendResubmissionClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value41: "yes",
        }));
    };

    const handleNoChange6 = () => {
        setIsOBL6(true);
        RemoveSendResubmissionClick();

    }


    const RemoveSendResubmissionClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value41: "",
        }));
    };


    const [isOBL7, setIsOBL7] = useState(complianceModel.Value44 === "true")

    useEffect(() => {
        setIsOBL7(complianceModel.Value44 === "true");
    }, [complianceModel.Value44])



    const handleYesChange7 = () => {

        setIsOBL7(true);
        PhysicalpresenceClick();
    }



    const PhysicalpresenceClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value44: "yes",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "44",
            value: "yes",
        }));
        onComplaince();
    };


    const handleNoChange7 = () => {

        setIsOBL7(false);
        RemovePhysicalpresenceClick();
    }

    const RemovePhysicalpresenceClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value44: "no",
        }));
        setComplianceComponent((prevComponent) => ({
            ...prevComponent,
            questionId: "44",
            value: "no",
        }));
        onComplaince();
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

    const [, setAddressesModel] = useState([
        registeredaddressModel,
        physicaladdressModel,
    ]);
    const setModelEmpty = () => {
        setRegisteredAddressModel({
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
        setPhysicalAddressModel({
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
        setCountryAutoComplete("");
        setPhysicalCountryAutoComplete("");
    };
    // const [loading, setLoading] = useState(true);

    const [, setError] = useState(false);
    useEffect(() => {
        // onBackButtonChange({ updateBackBtnShow })
    }, [updateBackBtnShow])

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


    // useEffect(() => {
    //     // onButtonChange({ updateBtnShow })
    // }, [updateBtnShow])



    // const handleClose = () => {
    //     physicaladdressModel.id === 0
    //         ? setModelEmpty()
    //         : getAddressByPartnerId(Number(partnerid));

    //     ErrorMessageEmptyModel();
    //     if (type === "V") {
    //         if (updateBtnShow) {
    //             setUpdateBtnShow(false);
    //             setReadOnly(true);
    //         }
    //     }
    //     if (type === "V") {
    //         if (updateBackBtnShow) {
    //             setUpdateBackBtnShow(false)
    //             setReadOnly(true);
    //         }
    //     }

    // };


    useEffect(() => {

        const pagenumber = "4";
        ComplianceServices.GetComplianceall1(complianceModel.partnerId, pagenumber).then((data: any) => {
            setComplianceModel(data.data);
            if (data.data.length !== 0) {
                const resultArray = [];
                data.data.forEach((item: any) => {
                    resultArray.push(item);
                });

                setComplianceModel(data.data);
                setComplianceComponent(data.data);
                //console.log("dataSet test", data.data);
                //console.log("Testing testing", data.data);
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
        //console.log("Page open=>1")
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


    const onCheckClickConsolidated = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...Recommendation2];

        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            Recommendation2: updatedDocument,
            QuestionId39_1: getSelectedValues(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument,
            "questionId": "39_1",
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



    const onCheckClickpolicies = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...Recommendation2];

        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            Recommendation2: updatedDocument,
            QuestionId39_1: getSelectedCheckClick(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument,
            "questionId": "39_1",
            value: getSelectedCheckClick(updatedDocument),
        }));
        onComplaince();
    };

    const getSelectedCheckClick = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");
    };



    const onCheckClickregulations = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...Recommendation2];

        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            Recommendation2: updatedDocument,
            QuestionId39_2: getSelectedregulations(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument,
            "questionId": "39_2",
            value: getSelectedregulations(updatedDocument),
        }));
        onComplaince();
    };

    const getSelectedregulations = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");
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

        // setBackButtonLoading(true)
        setTimeout(() => {
            //   onSaveAndContinueClick("B");
            //   setUpdateBackBtnShow(true);
            //   setReadOnly(false);
            setOpenPage3(true)
            setOpenPage5(false)
        }, 1000)
    };

    const EditDetails = () => {
        // setLoading(true);
        setTimeout(() => {
            // setLoading(false);
            setUpdateBtnShow(true);
            setEditReadOnly(false);
        }, 1000);
    };

    // const onNextClick = () => {
    //     setUpdateBtnShow(true); 
    //     setOpenPage4(false);
    //     setOpenPage5(true);
    // }

    const onNextClick = () => {
        setUpdateBtnShow(true);
        setOpenPage4(false);
        setOpenPage5(true);
    }
    // const onNextClick = () => {
    //     setOpenPage4(false);
    //     setOpenPage5(true);
    // }
    return (
        <>
            {openPage4 ?
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
                        autoHeightMax={2000}
                        thumbMinSize={30}
                        universal={true}
                    >
                        <div className="container-fluid acc-screen register-main-div address-main">

                            <div className="edit-content">
                                {/* {onboardStatus === "Ready" && type === "V" ? ( */}
                                <Button
                                    className="btn edit-partner"
                                    label="Edit"
                                    onClick={EditDetails}
                                />
                                {/* // ) : null} */}
                            </div>
                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">6. MONITORING & REPORTING
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have risk based policies, procedures and monitoring processes for the identification and reporting of suspicious activity?
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
                                                        // id={`radio-one`}
                                                        // name={`switch-one`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendFeesClickReporting()}


                                                        // onClick={(e: any) => SendFeesClickReporting()}

                                                        type="radio"
                                                        id="radio-one"
                                                        name="switch-one"
                                                        value="true"
                                                        checked={isOBL === true}
                                                        onChange={handleYesChange}
                                                    />
                                                    <label htmlFor={`radio-one`}>Yes</label>                                                        <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-two`}
                                                        // name={`switch-one`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendFeesClickReporting()}
                                                        // onClick={(e: any) => RemoveSendFeesClickReporting()}


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

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            What is the method used by the Entity to monitor transactions for suspicious activities?

                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "20px", marginLeft: "-80px", marginRight: "-90px" }}

                                                //   disabled ={editReadOnly}
                                                checked={checked}
                                                onChange={onCheckClick}
                                            />
                                            <span className="form-check-label" style={{ marginRight: "120px" }}>
                                                Manual                                                                   </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-4 info-section " style={{ marginLeft: "-120px" }}>
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">

                                            <span className="form-check-label">
                                                Type of transactions manually monitored
                                            </span>
                                            <span className="color-red">*</span>

                                        </div>


                                    </div>

                                </div>
                                <div className="col-md-4 info-section " style={{ marginLeft: "-80px" }}>
                                    <div className="col-md-12 form-group "  >
                                        {/* <input
                                            className="status-check"
                                            name="Receive"

                                        /> */}
                                        <input
                                            disabled={editReadOnly}
                                            className="form-control "
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Type of transactions manually monitored"
                                            value={complianceModel.Value35_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value;
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i


                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        QuestionId35_1: "35.1",
                                                        Value35_1: value,
                                                    });


                                                    setComplianceComponent({
                                                        ...complianceComponent,

                                                        "questionId": "35.1",
                                                        "value": value,
                                                    });
                                                }

                                                onComplaince();
                                            }}
                                        />


                                    </div>
                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-4 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "20px", marginLeft: "-60px", marginRight: "-90px" }}

                                                //   disabled ={editReadOnly}
                                                checked={checked}
                                                onChange={onCheckClick}
                                            />
                                            <span className="form-check-label" style={{ marginRight: "120px" }}>
                                                Automated                                                                    </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have regulatory requirements to report suspicious transactions?
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
                                                        // id={`radio-three`}
                                                        // name={`switch-three`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendFeesClicktransactions()}


                                                        // onClick={(e: any) => SendFeesClicktransactions()}

                                                        type="radio"
                                                        id="radio-four"
                                                        name="switch-four"
                                                        value="true"
                                                        checked={isOBL1 === true}
                                                        onChange={handleYesChange1}
                                                    />
                                                    <label htmlFor={`radio-four`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-four`}
                                                        // name={`switch-three`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendFeesClicktransactions()}
                                                        // onClick={(e: any) => RemoveSendFeesClicktransactions()}


                                                        type="radio"
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
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <span className="input-label">
                                            Does the Entity have policies, procedures and processes to comply with suspicious
                                            transactions reporting requirements?

                                        </span>
                                    </div>
                                </div>

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-6 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "20px", marginRight: "-20px" }}

                                                //   disabled ={editReadOnly}
                                                checked={checked}
                                                onChange={onCheckClick}
                                            />
                                            <span className="form-check-label">
                                                Yes                                                              </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-6 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "20px", marginLeft: "-520px", marginRight: "-220px" }}

                                                //   disabled ={editReadOnly}
                                                checked={checked}
                                                onChange={onCheckClick}
                                            />
                                            <span className="form-check-label" style={{ marginLeft: "-280px" }}  >
                                                No                                                                   </span>
                                        </div>
                                    </div>

                                </div>
                            </div>




                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have policies, procedures and processes to review and escalate matters arising from the monitoring of customer transactions and activity?
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
                                                        // id={`radio-five`}
                                                        // name={`switch-five`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendFeesClickpolicies()}


                                                        // onClick={(e: any) => SendFeesClickpolicies()}


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
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-six`}
                                                        // name={`switch-five`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendFeesClickpolicies()}
                                                        // onClick={(e: any) => RemoveSendFeesClickpolicies()}

                                                        type="radio"
                                                        // defaultChecked={true}
                                                        id="radio-nine"
                                                        name="switch-eight"
                                                        value="false"
                                                        checked={isOBL2 === false}
                                                        onChange={handleNoChange2}
                                                    />
                                                    <label htmlFor={`radio-nine`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">7. PAYMENT TRANSPARENCY
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity adhere to the Wolfsberg Group Payment Transparency Standards?

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
                                                        // id={`radio-seven`}
                                                        // name={`switch-seven`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendFeesClick1()}


                                                        // onClick={(e: any) => SendFeesClick1()}
                                                        type="radio"
                                                        id="radio-eighteen"
                                                        name="switch-eighteen"
                                                        value="true"
                                                        checked={isOBL3 === true}
                                                        onChange={handleYesChange3}
                                                    />
                                                    <label htmlFor={`radio-eighteen`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-eight`}
                                                        // name={`switch-seven`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendFeesClick1()}
                                                        // onClick={(e: any) => RemoveSendFeesClick1()}
                                                        type="radio"
                                                        id="radio-seventeen"
                                                        name="switch-eighteen"
                                                        value="false"
                                                        checked={isOBL3 === false}
                                                        onChange={handleNoChange3}
                                                    />
                                                    <label htmlFor={`radio-seventeen`}>No</label>
                                                </div>
                                            </div>
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
                                                name="FATF Recommendation 16"
                                                id="FATFRecommendation16"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />


                                                //     onChange={onCheckClickConsolidated}
                                                //     value={complianceModel.Value39_1}
                                                //     checked={
                                                //         (complianceModel.Value39_1 && complianceModel.Value39_1.includes("Lists maintained by other G7 member countries")) ||
                                                //         documentePolicy.find(policy => policy.deliveryType === "Lists maintained by other G7 member countries")?.checkedoption || false
                                                //     }
                                                //     className={
                                                //         documentePolicy.find(policy => policy.deliveryType === "Lists maintained by other G7 member countries")?.checkedoption ? "Lists maintained by other G7 member countries" : ""
                                                //     }

                                                // />

                                                onChange={onCheckClickpolicies}

                                                value={complianceModel.Value39_1}
                                                checked={
                                                    (complianceModel.Value39_1 && complianceModel.Value39_1.includes("FATF Recommendation 16")) ||
                                                    Recommendation2.find(policy => policy.deliveryType === "FATF Recommendation 16")?.checkedoption || false
                                                }
                                                className={
                                                    Recommendation2.find(policy => policy.deliveryType === "FATF Recommendation 16")?.checkedoption ? "FATF Recommendation 16" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                FATF Recommendation 16
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3 info-section " style={{ marginLeft: "-80px" }}>
                                    <div className="col-md-12 form-group "  >


                                        <div className="register-address">

                                            <span className="form-check-label">
                                                Specify Regulation*
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3 inf4-section " style={{ marginLeft: "-80px" }} >
                                    <div className="col-md-12 form-group " >
                                        <input
                                            disabled={editReadOnly}
                                            className="form-control"
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Type of transactions manually monitored"
                                            value={complianceModel.Value39_1_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value;
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        QuestionId39_1_1: "39.1.1",
                                                        Value39_1_1: value,
                                                    });


                                                    setComplianceComponent({
                                                        ...complianceComponent,

                                                        "questionId": "39.1.1",
                                                        "value": value,
                                                    });
                                                }
                                                onComplaince();

                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 info-section " style={{ marginLeft: "20px" }}>
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">

                                            <span className="form-check-label">
                                                Explanations

                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-3 info-section " style={{ marginLeft: "-140px" }}>
                                    <div className="col-md-12 form-group " >
                                        {/* <input
                                            className="status-check"
                                            name="Receive"

                                        /> */}

                                        <input
                                            disabled={editReadOnly}
                                            className="form-control"
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Type of transactions manually monitored"
                                            value={complianceModel.Value39_1_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        QuestionId39_1_1: "39.1.1",
                                                        Value39_1_1: ev.target.value,
                                                    });


                                                    setComplianceComponent({
                                                        ...complianceComponent,

                                                        "questionId": "39.1.1",
                                                        "value": ev.target.value,
                                                    });
                                                }

                                                if (checked) {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        Value39_1_1: ev.target.value,
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>



                            </div>

                            <div className="row">

                                <div className="col-md-3 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="Local Regulations"
                                                id="LocalRegulations"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickregulations}

                                                value={complianceModel.Value39_2}
                                                checked={
                                                    (complianceModel.Value39_2 && complianceModel.Value39_2.includes("Local Regulations")) ||
                                                    Recommendation2.find(policy => policy.deliveryType === "Local Regulations")?.checkedoption || false
                                                }
                                                className={
                                                    Recommendation2.find(policy => policy.deliveryType === "Local Regulations")?.checkedoption ? "Local Regulations" : ""
                                                }
                                            />
                                            <span className="form-check-label">
                                                Local Regulations
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-3 info-section " style={{ marginLeft: "-80px" }}>
                                    <div className="col-md-12 form-group "  >
                                        <div className="register-address">

                                            <span className="form-check-label">
                                                Specify Regulation*


                                            </span>
                                        </div>
                                    </div>

                                </div>


                                <div className="col-md-3 inf4-section " style={{ marginLeft: "-80px" }} >
                                    <div className="col-md-12 form-group " >
                                        {/* <input
                                            className="status-check"
                                            name="Receive"

                                        /> */}

                                        <input
                                            disabled={editReadOnly}
                                            className="form-control"
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Type of transactions manually monitored"
                                            value={complianceModel.Value39_2_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value;
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        QuestionId39_2_1: "39.2.1",
                                                        Value39_2_1: value,
                                                    });


                                                    setComplianceComponent({
                                                        ...complianceComponent,

                                                        "questionId": "39.2.1",
                                                        "value": value,
                                                    });
                                                }

                                                onComplaince();
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3 info-section " style={{ marginLeft: "20px" }}>
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">

                                            <span className="form-check-label">
                                                Explanations*

                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className="col-md-3 info-section " style={{ marginLeft: "-140px" }}>
                                    <div className="col-md-12 form-group " >
                                        {/* <input
                                            className="status-check"
                                            name="Receive"

                                        /> */}

                                        <input
                                            disabled={editReadOnly}
                                            className="form-control "
                                            type="text"
                                            name="addressLine1"
                                            autoComplete="nope"
                                            placeholder="Type of transactions manually monitored"
                                            value={complianceModel.Value39_1_1}
                                            onChange={(ev) => {
                                                const value = ev.target.value
                                                const re = /^[A-Za-z0-9\s\.'-]+$/i
                                                if (re.test(value) || value === '') {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        QuestionId39_2_1: "39.2.1",
                                                        Value39_2_1: ev.target.value,
                                                    });


                                                    setComplianceComponent({
                                                        ...complianceComponent,

                                                        "questionId": "39.2.1",
                                                        "value": ev.target.value,
                                                    });
                                                }

                                                if (checked) {
                                                    setComplianceModel({
                                                        ...complianceModel,
                                                        Value39_2_1: ev.target.value,
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                </div>



                            </div>

                            {/* <div className="row">
<div className="col-md-4 info-section ">
    <div className="col-md-12 form-group " >
        <div className="register-address">
            <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                style={{ height: "16px", width: "20px" }}

                //   disabled ={editReadOnly}
                checked={checked}
                onChange={onCheckClick}
            />
            <span className="form-check-label">
            Local Regulations
                                                                </span>
        </div>
    </div>

</div>

<div className="col-md-4 info-section " >
    <div className="col-md-12 form-group " >
        <div className="register-address">
            
            <span className="form-check-label">
            Specify Regulation*

                                                                 </span>
        </div>

        
    </div>
    </div>

    <div className="col-md-4 info-section "  style={{marginLeft:"-180px"}} > 
                                <div className="col-md-12 form-group " >
                                    <input
                                        className="status-check"
                                        name="Receive"

                                    />
                                </div>
                            </div>

</div> */}

                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">
                                            8. SANCTIONS
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have a Sanctions Policy approved by management regarding compliance with sanctions
                                            law applicable to the Entity, including with respect to its business conducted with, or through accounts
                                            held at foreign financial institutions?

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
                                                        // id={`radio-nine`}
                                                        // name={`switch-nine`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendinstitutionsClick()}
                                                        // onClick={(e: any) => SendinstitutionsClick()}

                                                        type="radio"
                                                        id="radio-thirteen"
                                                        name="switch-thirteen"
                                                        value="true"
                                                        checked={isOBL4 === true}
                                                        onChange={handleYesChange4}
                                                    />
                                                    <label htmlFor={`radio-thirteen`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-ten`}
                                                        // name={`switch-nine`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendinstitutionsClick()}
                                                        // onClick={(e: any) => RemoveSendinstitutionsClick()}

                                                        type="radio"
                                                        id="radio-hundred"
                                                        name="switch-thirteen"
                                                        value="false"
                                                        checked={isOBL4 === false}
                                                        onChange={handleNoChange4}
                                                    />
                                                    <label htmlFor={`radio-hundred`}>No</label>
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
                                            Does the Entity have policies, procedures or other controls reasonably designed to prohibit and/or detect
                                            actions taken to evade applicable sanctions prohibitions, such as stripping, or the resubmission and/or
                                            masking, of sanctions relevant information in cross border transactions?*


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
                                                        // id={`radio-eleven`}
                                                        // name={`switch-eleven`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendResubmissionClick()}


                                                        // onClick={(e: any) => SendResubmissionClick()}

                                                        type="radio"
                                                        id="radio-twenty"
                                                        name="switch-twenty"
                                                        value="true"
                                                        checked={isOBL6 === true}
                                                        onChange={handleYesChange6}
                                                    />
                                                    <label htmlFor={`radio-twenty`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-twelve`}
                                                        // name={`switch-eleven`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendResubmissionClick()}
                                                        // onClick={(e: any) => RemoveSendResubmissionClick()}

                                                        type="radio"
                                                        id="radio-twentyone"
                                                        name="switch-twenty"
                                                        value="false"
                                                        checked={isOBL6 === false}
                                                        onChange={handleYesChange6}
                                                    />
                                                    <label htmlFor={`radio-twentyone`}>No</label>
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
                                            Does the Entity screen its customers, including beneficial ownership information collected by the Entity,
                                            during onboarding and regularly thereafter against Sanctions Lists?


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
                                                        // id={`radio-thirteen`}
                                                        // name={`switch-thirteen`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => SendSanctionsListsClick()}
                                                        // onClick={(e: any) => SendSanctionsListsClick()}

                                                        type="radio"
                                                        id="radio-nineteen"
                                                        name="switch-nineteen"
                                                        value="true"
                                                        checked={isOBL5 === true}
                                                        onChange={handleYesChange5}
                                                    />
                                                    <label htmlFor={`radio-nineteen`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-fourteen`}
                                                        // name={`switch-thirteen`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemoveSendSanctionsListsClick()}
                                                        // onClick={(e: any) => RemoveSendSanctionsListsClick()}

                                                        type="radio"
                                                        id="radio-eightteen"
                                                        name="switch-nineteen"
                                                        value="false"
                                                        checked={isOBL5 === false}
                                                        onChange={handleNoChange5}
                                                    />
                                                    <label htmlFor={`radio-eightteen`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-10 info-section">
                                <div className="col-md-12 form-group">
                                    <span className="input-label">
                                        Select the Sanctions Lists used by the Entity in its sanctions screening processes:*


                                        {/* <span className="color-red">*</span> */}
                                    </span>
                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="ConsolidatedUnited1"
                                                name="Consolidated United Nations Security Council Sanctions List (UN)"

                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}

                                                //     onChange={onCheckClick}
                                                // />



                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "Money Laundering")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "Money Laundering")?.checkedoption && "Money Laundering"}
                                                // />

                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("Consolidated United Nations Security Council Sanctions List (UN)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Consolidated United Nations Security Council Sanctions List (UN)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Consolidated United Nations Security Council Sanctions List (UN)")?.checkedoption ? "Consolidated United Nations Security Council Sanctions List (UN)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Consolidated United Nations Security Council Sanctions List (UN)
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="United States Department of the Treasury's Office of Foreign Assets Control (OFAC)"
                                                id="UnitedStatesDepartment"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("United States Department of the Treasury's Office of Foreign Assets Control (OFAC)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "United States Department of the Treasury's Office of Foreign Assets Control (OFAC)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "United States Department of the Treasury's Office of Foreign Assets Control (OFAC)")?.checkedoption ? "United States Department of the Treasury's Office of Foreign Assets Control (OFAC)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                United States Department of the Treasury's Office of Foreign Assets Control (OFAC)
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="Office of Financial Sanctions Implementation HMT (OFSI)"
                                                id="OfficeofFinancial"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("Office of Financial Sanctions Implementation HMT (OFSI)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Office of Financial Sanctions Implementation HMT (OFSI)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Office of Financial Sanctions Implementation HMT (OFSI)")?.checkedoption ? "Office of Financial Sanctions Implementation HMT (OFSI)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Office of Financial Sanctions Implementation HMT (OFSI)
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="European Union Consolidated List (EU)"
                                                id="EuropeanUnionConsolidated"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("European Union Consolidated List (EU)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "European Union Consolidated List (EU)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "European Union Consolidated List (EU)")?.checkedoption ? "European Union Consolidated List (EU)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                European Union Consolidated List (EU)
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text">
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="Lists maintained by other G7 member countries"
                                                id="Listsmaintained"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("Lists maintained by other G7 member countries")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Lists maintained by other G7 member countries")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Lists maintained by other G7 member countries")?.checkedoption ? "Lists maintained by other G7 member countries" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Lists maintained by other G7 member countries
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 physical-address-text " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                name="Other(Specify)"
                                                id="OtherSpecify01"
                                                style={{ height: "16px", width: "20px" }}

                                                //   disabled ={editReadOnly}
                                                //     checked={checked}
                                                //     onChange={onCheckClick}
                                                // />
                                                onChange={onCheckClickConsolidated}
                                                value={complianceModel.Value43}
                                                checked={
                                                    (complianceModel.Value43 && complianceModel.Value43.includes("Other(Specify)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Other(Specify)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Other(Specify)")?.checkedoption ? "Other(Specify)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Other(Specify)                                                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 info-section " style={{ marginLeft: "-320px" }}>
                                    <div className="col-md-12 form-group " >
                                        <input
                                            className="status-check"
                                            name="Receive"

                                        />
                                    </div>

                                </div>
                            </div>



                            <div className="row">
                                <div className="col-md-10 info-section" style={{ marginTop: "-10px" }}>
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity have a physical presence, e.g. branches, subsidiaries, or representative offices located in
                                            countries/regions against which UN, OFAC, OFSI, EU or G7 member countries have enacted comprehensive
                                            jurisdiction-based Sanctions?*

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
                                                        // id={`radio-fiftheen`}
                                                        // name={`switch-fiftheen`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => PhysicalpresenceClick()}


                                                        // onClick={(e: any) => PhysicalpresenceClick()}

                                                        type="radio"
                                                        id="radio-twentytwo"
                                                        name="switch-twentytwo"
                                                        value="true"
                                                        checked={isOBL7 === true}
                                                        onChange={handleYesChange7}
                                                    />
                                                    <label htmlFor={`radio-twentytwo`}>Yes</label>
                                                    <input
                                                        // type="radio"
                                                        // defaultChecked={true}
                                                        // id={`radio-sixteen`}
                                                        // name={`switch-fiftheen`}
                                                        // // onChange={complianceModel.value13}
                                                        // onChange={() => RemovePhysicalpresenceClick()}
                                                        // onClick={(e: any) => RemovePhysicalpresenceClick()}

                                                        type="radio"
                                                        id="radio-twentythree"
                                                        name="switch-twentytwo"
                                                        value="false"
                                                        checked={isOBL7 === false}
                                                        onChange={handleNoChange7}
                                                    />
                                                    <label htmlFor={`radio-twentythree`}>No</label>
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
                        </div>
                    </Scrollbars>
                    {/* )} */}
                </> : openPage6 ?
                    <>
                        <TrainingProgram setOpenPage5={setOpenPage5} openPage5={openPage5} />

                    </> : ''}

        </>
    );
};
export default MonitoringSanctionProgram;
