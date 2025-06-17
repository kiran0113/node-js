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
import Signature from "./Signature";
import ComplianceServices from "../../../services/complaince/ComplianceServices";


interface IState {
    address: IAddress;
}

const TrainingProgram: React.FC<any> = ({ openPage5, setOpenPage5 }) => {
    const { partnerid, type } = useParams();
    const [buttonLoading, setButtonLoading] = useState(false);

    const [openPage6, setOpenPage6] = useState(true);
    const [openPage7, setOpenPage7] = useState(true);

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
    const onboardStatus = sessionStorage.getItem("onboardStatus");

    const [physicalcountryAutoComplete, setPhysicalCountryAutoComplete] =
        useState("");
    const [addressToolTipdata,] =
        useState<any>(AddressoolTipData);
    const [updateBtnShow, setUpdateBtnShow] = useState(false);

    // const { partnerId1, type1 } = useParams();

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
        "Pagenumber":"5"

    })


    const [complianceModel, setComplianceModel] = useState({


        id: 0,
        partnerId: Number(partnerid),

        QuestionId47: "",
        Value47: "",
        QuestionId45: "",
        Value45: "",
        QuestionId46: "",
        Value46: "",



    })
    const [categories, setcategories] = useState([

        {
            id: 0,
            deliveryType: "Identification and reporting of transactions to government authorities",
            checkedoption: false,

        },
        {
            id: 1,
            deliveryType: "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered",
            checkedoption: false,

        },
        {
            id: 2,
            deliveryType: "Internal policies for controlling money laundering, terrorist financing and sanctions violations",
            checkedoption: false,

        },
        {
            id: 3,
            deliveryType: "New issues that occur in the market, e.g. significant regulatory actions or new regulations",
            checkedoption: false,

        },

    ])

    const [documentePolicy, setdocumentePolicy] = useState([

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
            id: 3,
            deliveryType: "2nd Line of Defence",
            checkedoption: false,

        },

        {
            id: 4,
            deliveryType: "3rd Line of Defence",
            checkedoption: false,

        },
        {
            id: 5,
            deliveryType: "Third parties to which specific FCC activities have been outsourced",
            checkedoption: false,

        },

        {
            id: 6,
            deliveryType: "Non-employed workers (contractors/consultants)",
            checkedoption: false,

        },
    ])


    const onCheckClickpolicies = (event: any) => {
        const { name, checked } = event.target;
        const updatedOrganization = [...categories];

        const updatedPolicy = updatedOrganization.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setcomplianceTrainning(updatedOrganization);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            categories: updatedOrganization,
            questionId32: getSelectedValuesorganization(updatedOrganization),
        }));
    };



    const getSelectedValuesorganization = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
        return policies
            .filter((policy) => policy.checkedoption)
            .map((policy) => policy.deliveryType)
            .join("/");

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
                QuestionId46: getSelectedValues1(updatedDocument),
            }));
    
            setComplianceComponent((prevModel) => ({
    
    
                ...prevModel,
                compliancePolicies: updatedDocument,
                "questionId": "46",
                value: getSelectedValues1(updatedDocument),
            }));
            onComplaince();
        };
    
        const getSelectedValues1 = (policies: { deliveryType: string; checkedoption: boolean }[]) => {
            return policies
                .filter((policy) => policy.checkedoption)
                .map((policy) => policy.deliveryType)
                .join("/");
        };
    

    const onCheckClickdocument1 = (event: any) => {
        const { name, checked } = event.target;
        const updatedDocument = [...categories];

        const updatedPolicy = updatedDocument.find((policy) => policy.deliveryType === name);
        if (updatedPolicy) {
            updatedPolicy.checkedoption = checked;
        }

        // setdocumentePolicy(updatedDocument);


        setComplianceModel((prevModel) => ({
            ...prevModel,
            categories: updatedDocument,
            QuestionId45: getSelectedValues(updatedDocument),
        }));

        setComplianceComponent((prevModel) => ({


            ...prevModel,
            compliancePolicies: updatedDocument,
            "questionId": "45",
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




    const SendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value47: "yes",
        }));
    };

    const RemoveSendFeesClick = () => {
        setComplianceModel((prevModel) => ({
            ...prevModel,
            Value47: "",
        }));
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
        onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
        onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
        onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
        onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
            onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
            onboardStatus: sessionStorage.getItem("onboardingStatus ")

        });
        setCountryAutoComplete("");
        setPhysicalCountryAutoComplete("");
    };
    const [loading, setLoading] = useState(true);

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

    const isValidate = (values: any) => {
        ErrorMessageEmptyModel();
        let formIsValid = true;
        if (CheckNull(values.postalAddressLine1)) {
            setpostaladdressErrorMessage("Please enter address line 1.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values.postalAddressLine1)) {
            if (values.postalAddressLine1.trim().length === 0) {
                setpostaladdressErrorMessage("Please enter address line 1.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }

            if (values.postalAddressLine1.length > 70) {
                setpostaladdressErrorMessage(
                    "Please enter valid address line 1."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }


        if (!CheckNull(values.postalAddressLine2)) {
            if (values.postalAddressLine2.length > 70) {
                setpostaladdress2ErrorMessage(
                    "Please enter valid address line 2."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (!CheckNull(values.buildingNumber)) {
            if (values.buildingNumber.length > 16) {
                setbuildingErrorMessage(
                    "Please enter valid building number."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values.postalCode)) {
            setpostalcodeErrorMessage("Please enter postal code.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }


        if (!CheckNull(values.postalCode)) {
            if (values.postalCode.trim().length === 0) {
                setpostalcodeErrorMessage("Please enter postal code.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (values.postalCode.length > 16) {
                setpostalcodeErrorMessage(
                    "Postal code should not exceed the max length than 16."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (!validpostalcode.test(values.postalCode)) {
                setpostalcodeErrorMessage("Please enter correct postal code.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values.province)) {
            setprovinceErrorMessage("Please enter province.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values.province)) {
            if (values.province.trim().length === 0) {
                setprovinceErrorMessage("Please enter province.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }

            if (values.province.length > 50) {
                setprovinceErrorMessage(
                    "Please enter valid province."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values.townName)) {
            settownnameErrorMessage("Please enter town.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values.townName)) {
            if (values.townName.trim().length === 0) {
                settownnameErrorMessage("Please enter town.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }

            if (values.townName.length > 50) {
                settownnameErrorMessage(
                    "Please enter valid town."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values.country)) {
            setcountryErrorMessage("Please select country.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }



        return formIsValid;
    };


    useEffect(() => {
        // onButtonChange({ updateBtnShow })
    }, [updateBtnShow])

    const getAddressByPartnerId = (id: number) => {
        setLoading(true);
        AddressService.getAddressByPartnerId(id)
            .then((response: any) => {
                const data = response.data;



                setRegisteredAddressModel(
                    data.filter((x: any) => x.addressType === false)[0]
                );
                setPhysicalAddressModel(
                    data.filter((x: any) => x.addressType === true)[0]
                );

                const registeredaddressData: any = data.filter((x: any) => x.addressType === false)[0];
                const physicaladdressData: any = data.filter((x: any) => x.addressType === true)[0];

                // setTimeout(() => { }, 100);
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
                } else {
                    toast.current?.show({
                        severity: "error",
                        summary: "Error while getting the address details",
                        life: 3000,
                    });
                }
                setLoading(false);
            });
    };

    const handleClose = () => {
        physicaladdressModel.id === 0
            ? setModelEmpty()
            : getAddressByPartnerId(Number(partnerid));

        ErrorMessageEmptyModel();
        if (type === "V") {
            if (updateBtnShow) {
                setUpdateBtnShow(false);
                setReadOnly(true);
            }
        }
        if (type === "V") {
            if (updateBackBtnShow) {
                setUpdateBackBtnShow(false)
                setReadOnly(true);
            }   
        }

    };

    useEffect(() => {

        const pagenumber = "5";
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


            if (data.status === 200) {
                setComplianceComponent(data.data)
                // setShowSaveButton(false);
                // setIsEditMode(false);
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


    // const onAddClick = () => {
    //     // ErrorMessageEmptyModel();
    //     setButtonLoading(true);
    //     ComplianceServices.addComplinceDetails(complianceModel).then((data: any) => {
    //         // ErrorMessageEmptyModel();
    //         setButtonLoading(false);
    //         toast.current?.show({
    //             severity: "success",
    //             summary: "Address details saved successfully.",
    //             life: 3000,
    //         });
    //         sessionStorage.setItem("StepFlag", "2");
    //         // onSaveAndContinueClick("N");
    //     })
    //         .catch((error: any) => {
    //             if (error.response.status === 500) {
    //                 toast.current?.show({
    //                     severity: "error",
    //                     summary: "Something went wrong",
    //                     life: 3000,
    //                 });
    //             } else if (error.response.status === 401) {
    //                 toast.current?.show({
    //                     severity: "error",
    //                     summary: "Unauthorized",
    //                     life: 3000,
    //                 });
    //                 Logout(navigate);
    //             } else if (error.response.status === 400) {
    //                 toast.current?.show({
    //                     severity: "error",
    //                     summary: error.response.data[0].errorMessage,
    //                     life: 3000,
    //                 });
    //             } else {
    //                 toast.current?.show({
    //                     severity: "error",
    //                     summary: "Error while saving address details.",
    //                     life: 3000,
    //                 });
    //             }
    //             // ErrorMessageEmptyModel();
    //             // setButtonLoading(false);
    //             // setError(false);
    //         });
    //         setOpenPage1(false);
    //         setOpenPage2(true);
    // };

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

        setBackButtonLoading(true)
        setTimeout(() => {
            //   onSaveAndContinueClick("B");
            setUpdateBackBtnShow(true);
            setReadOnly(false);
        }, 1000)
    };
    // const onBackClick = () => {
    //     if (!readonly && isValidate(registeredaddressModel, physicaladdressModel)) {
    //         setBackButtonLoading(true)
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
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setUpdateBtnShow(true);
            setEditReadOnly(false);
        }, 1000);
    };

    useEffect(() => {
        // setButtonLoadingSkip(false);
        {
            checked === true ?
                setReadOnly(true) : setReadOnly(false)
        }
        {
            type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
        }
        const useroobj = sessionStorage.getItem("User");
        if (useroobj === null || useroobj === undefined) {
            Logout(navigate);
        }
        if (partnerid !== "0") {
            getAddressByPartnerId(Number(partnerid));
        } else {
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
                onboardStatus: sessionStorage.getItem("onboardingStatus ")

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
                onboardStatus: sessionStorage.getItem("onboardingStatus ")

            });
            setLoading(false);
        }
    }, []);

    const onNextClick = () => {
        setUpdateBtnShow(true);
        setOpenPage5(false);
        setOpenPage6(true);
    }

    return (
        <>
            {openPage5 ?
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
                        autoHeightMax={5000}
                        thumbMinSize={30}
                        universal={true}
                    >


                        <div className="row">
                            <div className="container-fluid acc-screen register-main-div address-main">
                                <div className="edit-content">
                                    {onboardStatus === "Ready" && type === "V" ? (
                                        <Button
                                            className="btn edit-partner"
                                            label="Edit"
                                            onClick={EditDetails}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className="col-md-6 info-section ">
                                <div className="col-md-12 ">
                                    <span className="text-blue-address">9. TRAINING & EDUCATION

                                    </span>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Does the Entity provide mandatory training, which includes:*


                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                            </div>



                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Identificationandreporting"
                                                style={{ height: "16px", width: "20px" }}
                                                name="Identification and reporting of transactions to government authorities"
                                                //     onChange={onCheckClickpolicies}
                                                //     checked={categories.find((policy) => policy.deliveryType.trim() === "Identification and reporting of transactions to government authorities")?.checkedoption}
                                                //     className={categories.find((policy) => policy.deliveryType.trim() === "Identification and reporting of transactions to government authorities")?.checkedoption && "Identification and reporting of transactions to government authorities"}
                                                // />

                                                onChange={onCheckClickdocument1}
                                                value={complianceModel.Value45}

                                                checked={
                                                    (complianceModel.Value45 && complianceModel.Value45.includes("Identification and reporting of transactions to government authorities")) ||
                                                    categories.find(policy => policy.deliveryType === "Identification and reporting of transactions to government authorities")?.checkedoption || false
                                                }
                                                className={
                                                    categories.find(policy => policy.deliveryType === "Identification and reporting of transactions to government authorities")?.checkedoption ? "Identification and reporting of transactions to government authorities" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Identification and reporting of transactions to government authorities
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-12 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="Examplesofdifferentforms"
                                                style={{ height: "16px", width: "20px" }}

                                                name="Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered"
                                                //     onChange={onCheckClickpolicies}
                                                //     checked={categories.find((policy) => policy.deliveryType.trim() === "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered")?.checkedoption}
                                                //     className={categories.find((policy) => policy.deliveryType.trim() === "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered")?.checkedoption && "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered"}
                                                // />
                                                onChange={onCheckClickdocument1}
                                                value={complianceModel.Value45}

                                                checked={
                                                    (complianceModel.Value45 && complianceModel.Value45.includes("Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered")) ||
                                                    categories.find(policy => policy.deliveryType === "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered")?.checkedoption || false
                                                }
                                                className={
                                                    categories.find(policy => policy.deliveryType === "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered")?.checkedoption ? "Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Examples of different forms of money laundering, terrorist financing and sanctions violations relevant for the types of products and services offered
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-12 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="Internalpolicies"
                                                style={{ height: "16px", width: "20px" }}
                                                name="Internal policies for controlling money laundering, terrorist financing and sanctions violations"
                                                //     onChange={onCheckClickpolicies}
                                                //     checked={categories.find((policy) => policy.deliveryType.trim() === "Internal policies for controlling money laundering, terrorist financing and sanctions violations")?.checkedoption}
                                                //     className={categories.find((policy) => policy.deliveryType.trim() === "Internal policies for controlling money laundering, terrorist financing and sanctions violations")?.checkedoption && "Internal policies for controlling money laundering, terrorist financing and sanctions violations"}
                                                // />
                                                onChange={onCheckClickdocument1}
                                                value={complianceModel.Value45}

                                                checked={
                                                    (complianceModel.Value45 && complianceModel.Value45.includes("Internal policies for controlling money laundering, terrorist financing and sanctions violations")) ||
                                                    categories.find(policy => policy.deliveryType === "Internal policies for controlling money laundering, terrorist financing and sanctions violations")?.checkedoption || false
                                                }
                                                className={
                                                    categories.find(policy => policy.deliveryType === "Internal policies for controlling money laundering, terrorist financing and sanctions violations")?.checkedoption ? "Internal policies for controlling money laundering, terrorist financing and sanctions violations" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Internal policies for controlling money laundering, terrorist financing and sanctions violations
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-12 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="exampleCheck1"
                                                style={{ height: "16px", width: "20px" }} name="New issues that occur in the market, e.g. significant regulatory actions or new regulations"
                                                onChange={onCheckClickdocument1}
                                                value={complianceModel.Value45}

                                                checked={
                                                    (complianceModel.Value45 && complianceModel.Value45.includes("New issues that occur in the market, e.g. significant regulatory actions or new regulations")) ||
                                                    categories.find(policy => policy.deliveryType === "New issues that occur in the market, e.g. significant regulatory actions or new regulations")?.checkedoption || false
                                                }
                                                className={
                                                    categories.find(policy => policy.deliveryType === "New issues that occur in the market, e.g. significant regulatory actions or new regulations")?.checkedoption ? "New issues that occur in the market, e.g. significant regulatory actions or new regulations" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                New issues that occur in the market, e.g. significant regulatory actions or new regulations
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            Is the above mandatory training provided to :*


                                            <span className="color-red">*</span>
                                        </span>
                                    </div>
                                </div>
                            </div>


                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="BoardandSeniorCommitteeManagement"
                                                style={{ height: "16px", width: "20px" }}
                                                name="Board and Senior Committee Management"
                                                // ttyy
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("Board and Senior Committee Management")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Board and Senior Committee Management")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Board and Senior Committee Management")?.checkedoption ? "Board and Senior Committee Management" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Board and Senior Committee Management  
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="1stLineofDefence"
                                                style={{ height: "16px", width: "20px" }}
                                                name="1st Line of Defence"
                                                //     onChange={onCheckClickdocument}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "1st Line of Defence")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "1st Line of Defence")?.checkedoption && "1st Line of Defence"}
                                                // />
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("1st Line of Defence")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "1st Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "1st Line of Defence")?.checkedoption ? "1st Line of Defence" : ""
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

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="2ndLineofDefence"
                                                style={{ height: "16px", width: "20px" }}
                                                name="2nd Line of Defence"
                                                //     onChange={onCheckClickdocument}
                                                //     checked={documentePolicy.find((policy) => policy.deliveryType.trim() === "2nd Line of Defence")?.checkedoption}
                                                //     className={documentePolicy.find((policy) => policy.deliveryType.trim() === "2nd Line of Defence")?.checkedoption && "2nd Line of Defence"}
                                                // />
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("2nd Line of Defence")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "2nd Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "2nd Line of Defence")?.checkedoption ? "2nd Line of Defence" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                2nd Line of Defence
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="3rdLineofDefence"
                                                style={{ height: "16px", width: "20px" }}
                                                name="3rd Line of Defence"
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("3rd Line of Defence")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "3rd Line of Defence")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "3rd Line of Defence")?.checkedoption ? "3rd Line of Defence" : ""
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
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"

                                                id="Thirdparties"
                                                style={{ height: "16px", width: "20px" }}
                                                name="Third parties to which specific FCC activities have been outsourced"
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("Third parties to which specific FCC activities have been outsourced")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Third parties to which specific FCC activities have been outsourced")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Third parties to which specific FCC activities have been outsourced")?.checkedoption ? "Third parties to which specific FCC activities have been outsourced" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Third parties to which specific FCC activities have been outsourced
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 form-group " >
                                        <div className="register-address">
                                            <input
                                                type="checkbox"
                                                id="Non-employed"
                                                name="Non-employed workers (contractors/consultants)"
                                                style={{ height: "16px", width: "20px" }} 
                                                onChange={onCheckClickdocument}
                                                value={complianceModel.Value46}

                                                checked={
                                                    (complianceModel.Value46 && complianceModel.Value46.includes("Non-employed workers (contractors/consultants)")) ||
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-employed workers (contractors/consultants)")?.checkedoption || false
                                                }
                                                className={
                                                    documentePolicy.find(policy => policy.deliveryType === "Non-employed workers (contractors/consultants)")?.checkedoption ? "Non-employed workers (contractors/consultants)" : ""
                                                }

                                            />
                                            <span className="form-check-label">
                                                Non-employed workers (contractors/consultants)
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6 info-section ">
                                    <div className="col-md-12 ">
                                        <span className="text-blue-address">10. AUDIT


                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-10 info-section">
                                    <div className="col-md-12 form-group">
                                        <span className="input-label">
                                            In addition to inspections by the government supervisors/regulators, does the Entity have an internal audit
                                            function, a testing function or other independent third party, or both, that assesses FCC AML, CTF, ABC,
                                            Fraud and Sanctions policies and practices on a regular basis?*

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
                                                        type="radio"
                                                        // disabled={readOnly}
                                                        id={`radio-one`}
                                                        name={`switch-one`}
                                                        // onChange={complianceModel.value13}
                                                        onChange={() => SendFeesClick()}


                                                        onClick={(e: any) => SendFeesClick()}
                                                    />
                                                    <label htmlFor={`radio-one`}>Yes</label>
                                                    <input
                                                        type="radio"
                                                        defaultChecked={true}
                                                        id={`radio-two`}
                                                        name={`switch-one`}
                                                        // onChange={complianceModel.value13}
                                                        onChange={() => RemoveSendFeesClick()}
                                                        onClick={(e: any) => RemoveSendFeesClick()}
                                                    />
                                                    <label htmlFor={`radio-two`}>No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="button-section">
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
                                            onClick={handleClose}
                                            className="btn btn-cancel second-btn"
                                        >
                                            Cancel
                                        </button>

                                        {updateBtnShow ? (
                                            <Button
                                                iconPos="left"
                                                label={" Save and Continue"}
                                                className="btn btn-continue second-btn"
                                                //   loading={buttonLoading}
                                                onClick={onNextClick}
                                            />

                                            // <Button
                                            //   iconPos="left"
                                            //   label="Next"
                                            //   // loading={buttonLoadingSkip}
                                            //   onClick={onNextClick}
                                            //   className="btn btn-continue btn-next second-btn"
                                            // />
                                        ) : (
                                            <Button
                                                iconPos="left"
                                                label="Next"
                                                // loading={buttonLoadingSkip}
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
                            < br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>
                            <br></br>

                        </div> </Scrollbars>
                    {/* // )} */}
                </> : openPage7 ?
                    <>
                        <Signature setOpenPage6={setOpenPage6} openPage6={openPage6} />


                    </> : ''}

        </>
    );
};
export default TrainingProgram;
