import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";
import Tabcontent from "../../../Layout/Tabcontent";
import requiredBlue from "../../assets/images/required-blue.svg";
import { AutoComplete } from "primereact/autocomplete";
import { Calendar } from "primereact/calendar";
import {
  checkPhoneno,
  countrycodeList,
  countryList,
} from "../../../utils/utils";
import { useNavigate, useParams } from "react-router-dom";
import { IPersonalDetails } from "../../../models/IPersonalDetails";
import { PersonalDetailsService } from "../../../services/Partner/PersonalDetails/PersonalDetails";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import RegisterSuccess from "../../../assets/images/tick.svg";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import PersonalDetailToolTip from "../../../services/Partner/PartnershipDetails/PartnerShipToolTip";
import ToolTip from "../ToolTipsData/ToolTip";
import { formatPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

import {
  validpostalcode,
  validAlphabetNumber,
  validAlphabetOnly,
  validEmail,
  validContact,
} from "../../../utils/utils";
import { Toast } from "primereact/toast";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";
import { isAutoAccessorPropertyDeclaration } from "typescript";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";


const excludedCountries = ["CU","IR","SY","KP"];

function filterCountries(country: string) {
  return !excludedCountries.includes(country);
}


const PersonalDetails: React.FC<any> = ({  
  onSaveAndContinueClick,
  onBackButtonChange,
  onButtonChange,
  onNextClick,
  setButtonLoadingSkip,
  buttonLoadingSkip,}) => {
  const [filteredcountrylist, setFilteredCountryList] = React.useState<any[]>(
    []
  );
  interface IState {
    personaldetails: IPersonalDetails;
  }
  const [displayBasic, setDisplayBasic] = useState(false);
  const [backButtonLoading, setBackButtonLoading] = useState(false)
  

  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  
  const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);

  const filteredCountries = getCountries().filter(filterCountries);
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const navigate = useNavigate();
  const { partnerid, type } = useParams();

  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const toast = useRef<Toast>(null);
  const [firstnameerrorMessage, setfirstnameErrorMessage] = React.useState("");
  const [lastnameerrorMessage, setlastnameErrorMessage] = React.useState("");
  const [phonenoerrorMessage, setphonenoErrorMessage] = React.useState("");
  const [emailerrorMessage, setemailErrorMessage] = React.useState("");
  const [dateofbirtherrorMessage, setDateOfBirthErrorMessage] =
    React.useState("");
  const [postaladdresserrorMessage, setpostaladdressErrorMessage] =
    React.useState("");
  const [postaladdress2errorMessage, setpostaladdress2ErrorMessage] =
    React.useState("");
  const [buildingnoerrorMessage, setbuildingnoErrorMessage] =
    React.useState("");
  const [postalcodeerrorMessage, setpostalcodeErrorMessage] =
    React.useState("");
  const [provinceerrorMessage, setprovinceErrorMessage] = React.useState("");
  const [townnameerrorMessage, settownnameErrorMessage] = React.useState("");
  const [countryerrorMessage, setcountryErrorMessage] = React.useState("");
  const [onSuccessRegistration, setOnSuccessRegistration] = useState(false);
  const [userobj, setUserObj] = useState<any>(sessionStorage.getItem("User"));
  // const [buttonLoadingSkip, setButtonLoadingSkip] = useState(false);
  const [personlDetailToolTip, setPersonalDetailToolTip] = useState<any>(
    PersonalDetailToolTip
  );
  const [countryAutoComplete, setCountryAutoComplete] = useState("");
  const [currentStatus, setcurrentStatus] = React.useState(0);
  useEffect(()=>{
    onButtonChange({updateBtnShow})
  
  },[updateBtnShow])

  // useEffect(()=>{
  //   onBackButtonChange({updateBackBtnShow})
  // },[updateBackBtnShow])

  const onboardStatus = sessionStorage.getItem("onboardStatus");
  // if (onboardingStatus !== null) {
  //   setcurrentStatus(parseInt(onboardingStatus));
  // }

  
  const [readonly, setReadOnly] = useState(true);
  const [personalDetailsModel, setPersonalDetailsModel] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
    userId: 0,
    legalFirstName: "",
    legalMiddleName: "",
    legalLastName: "",
    maternalLastName: "",
    paternalLastName: "",
    phone: "",
    businessEmail: "",
    dateOfBirth: null,
    addressLine1: "",
    buildingNumber: "",
    addressLine2: "",
    town: "",
    province: "",
    country: "",
    postalCode: "",
        onboardStatus : sessionStorage.getItem("onboardingStatus ")

    // onboardingStatus : JSON.parse(sessionStorage.getItem("onboardingStatus "))?.onboardingStatus 
  });
  const setModelEmpty = () => {
    setPersonalDetailsModel({
      id: 0,
      partnerId: Number(partnerid),
      userId: 0,
      legalFirstName: "",
      legalMiddleName: "",
      legalLastName: "",
      maternalLastName: "",
      paternalLastName: "",
      phone: "",
      businessEmail: "",
      dateOfBirth: null,
      addressLine1: "",
      buildingNumber: "",
      addressLine2: "",
      town: "",
      province: "",
      country: "",
      postalCode: "",
      onboardStatus:"",
        // onboardingStatus : JSON.parse(sessionStorage.getItem("onboardingStatus "))
            // onboardingStatus : sessionStorage.getItem("onboardingStatus ")


    });
    setCountryAutoComplete("");
  };
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };
  const ErrorMessageEmptyModel = () => {
    setpostaladdressErrorMessage("");
    setbuildingnoErrorMessage("");
    setpostalcodeErrorMessage("");
    setprovinceErrorMessage("");
    settownnameErrorMessage("");
    setcountryErrorMessage("");
    setfirstnameErrorMessage("");
    setlastnameErrorMessage("");
    setphonenoErrorMessage("");
    setemailErrorMessage("");
    setDateOfBirthErrorMessage("");
  };
  const isValidate = (values: any) => {
    ErrorMessageEmptyModel();
    let formIsValid = true;
    if (CheckNull(values.legalFirstName)) {
      setfirstnameErrorMessage("Please enter first name.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.firstlegalFirstNameName)) {
      if (values.legalFirstName.trim().length === 0) {
        setfirstnameErrorMessage("Please enter first name.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.legalLastName)) {
      setlastnameErrorMessage("Please enter last name.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.legalLastName)) {
      if (values.legalLastName.trim().length === 0) {
        setlastnameErrorMessage("Please enter last name.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }

    if (CheckNull(values.phone)) {
      setphonenoErrorMessage("Please enter phone number.");
      setUpdateBtnShow(true)
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.phone)) {
      if (values.phone.trim().length === 0) {
        setphonenoErrorMessage("Please enter phone number.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
      if (checkPhoneno(values.phone) === false) {
        setphonenoErrorMessage("Please enter valid phone number.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phone).trim().length > 15) {
        setphonenoErrorMessage("Please enter valid phone number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phone).trim().length < 6) {
        setphonenoErrorMessage("Please enter valid phone number.");
        setUpdateBtnShow(true)
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.businessEmail)) {
      setemailErrorMessage("Please enter business email.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.businessEmail)) {
      if (values.businessEmail.trim().length === 0) {
        setemailErrorMessage("Please enter business email.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (!validEmail.test(values.businessEmail)) {
        setemailErrorMessage("Please enter correct business email.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }

    if (moment(new Date()).diff(moment(values.dateOfBirth), "years") < 18) {
      setDateOfBirthErrorMessage("Age under 18 not allowed");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }

    if (
      moment(values.dateOfBirth).format("yyyy-MM-DD").toString() ===
      moment(new Date()).format("yyyy-MM-DD").toString()
    ) {
      setDateOfBirthErrorMessage("Please enter valid date of birth.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (values.dateOfBirth == "Invalid Date") {
      setDateOfBirthErrorMessage("Please enter valid date of birth.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (CheckNull(values.dateOfBirth)) {
      setDateOfBirthErrorMessage("Please enter date of birth.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (CheckNull(values.addressLine1)) {
      setpostaladdressErrorMessage("Please enter address line1.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.addressLine1)) {
      if (values.addressLine1.trim().length === 0) {
        setpostaladdressErrorMessage("Please enter address line1.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
      if (values.addressLine1.length > 70) {
        setpostaladdressErrorMessage(
          "Address line1 should not exceed the max length than 70."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (!CheckNull(values.buildingNumber)) {
      if (values.buildingNumber.length > 16) {
        setbuildingnoErrorMessage(
          "Building number should not exceed the max length than 16."
        );
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }
    if (!CheckNull(values.addressLine2)) {
      if (values.addressLine2.length > 70) {
        setpostaladdress2ErrorMessage(
          "Address line2 should not exceed the max length than 70."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.town)) {
      settownnameErrorMessage("Please enter town.");
      setUpdateBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }

    if (!CheckNull(values.town)) {
      if (values.town.trim().length === 0) {
        settownnameErrorMessage("Please enter town.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }

      if (values.town.length > 35) {
        settownnameErrorMessage(
          "Town name should not exceed the max length than 35."
        );
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }

    if (CheckNull(values.province)) {
      setprovinceErrorMessage("Please enter province.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.province)) {
      if (values.province.trim().length === 0) {
        setprovinceErrorMessage("Please enter province.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }

      if (values.province.length > 35) {
        setprovinceErrorMessage(
          "Province should not exceed the max length than 35."
        );
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.country)) {
      setcountryErrorMessage("Please select country.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (CheckNull(values.postalCode)) {
      setpostalcodeErrorMessage("Please enter postal code.");
      setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.postalCode)) {
      if (values.postalCode.trim().length === 0) {
        setpostalcodeErrorMessage("Please enter postal code.");
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
      if (values.postalCode.length > 20) {
        setpostalcodeErrorMessage(
          "Postal code should not exceed the max length than 20."
        );
        setUpdateBtnShow(true);
     setReadOnly(false);
     setUpdateBackBtnShow(true);
     setReadOnly(false);
        formIsValid = false;
      }
    //   if (!validpostalcode.test(values.postalCode)) {
    //     setpostalcodeErrorMessage("Please enter correct postal code.");
    //    setUpdateBtnShow(true);
    //  setReadOnly(false);
    //  setUpdateBackBtnShow(true);
    //  setReadOnly(false);
    //     formIsValid = false;
    //   }
    }

    return formIsValid;
  };
  const partnerPersonalDetailsByPartnerId = (id: number) => {
    PersonalDetailsService.getPersonalDetailsFromAdminByPartnerId(id)
      .then((response) => {
        const data = response.data;
        if (data.id === 0) {
          data.dateOfBirth = "";
        } else {
          data.dateOfBirth = new Date(response.data.dateOfBirth);
          setCountryAutoComplete(
            countryList.find((country) => country.code === data.country).name
          );
        }

        setPersonalDetailsModel(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 500) {
        } else if (error.response.status === 401) {
          Logout(navigate);
        } else {
        }
        setLoading(false);
      });
  };

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      setUpdateBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };

  useEffect(() => {
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    }

    const useroobj: any = sessionStorage.getItem("User");

    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }
    if (Number(partnerid) !== 0) {
      partnerPersonalDetailsByPartnerId(Number(partnerid));
    }
  }, []);

  const accept = () => {
    PersonalDetailsService.addPersonalDetails(personalDetailsModel)
      .then((response: any) => {
        sessionStorage.setItem("StepFlag", "5");

        onSaveAndContinueClick("N");

        setButtonLoading(false);
      })
      .catch((error) => {
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
            summary: "Error while saving personal details.",
            life: 3000,
          });
        }

        setButtonLoading(false);
      });
  };

  const acceptupdate = () => {
    PersonalDetailsService.updatePersonalDetails(personalDetailsModel)
      .then((response) => {
        setButtonLoading(false);
        onSaveAndContinueClick("N");
      // setTimeout(() => {
      //   navigate(`../partnerdetails/${partnerid}/${type}`);
      // }, 500);
      })
      .catch((error) => {
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
            summary: "Error while updating personal details.",
            life: 3000,
          });
        }

        setButtonLoading(false);
      });
  };

  const onConfirmClick = (item: any) => {
    confirmDialog({
      message:
        "Are you sure you want to submit? Once you submit, you will not be able to undo your changes.",

      accept: () => accept(),
      reject,
    });
  };

  const onConfirmUpdateClick = (item: any) => {
    confirmDialog({
      message:
        "Are you sure you want to submit? Once you submit, you will not be able to undo your changes.",

      accept: () => acceptupdate(),
      reject,
    });
  };

  const onAddClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    personalDetailsModel.partnerId = Number(partnerid);
    personalDetailsModel.dateOfBirth = new Date(
      moment(personalDetailsModel.dateOfBirth).format("yyyy-MM-DD")
    );
    setButtonLoading(true);

    if (isValidate(personalDetailsModel)) {
      setButtonLoading(true);
      accept();
      setTimeout(() => {
        navigate(`../partnerdetails/payment/${partnerid}/${type}`);
      }, 500);
      setButtonLoading(false);
    }
  };

  const onUpdateClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setButtonLoading(true);
    personalDetailsModel.partnerId = Number(partnerid);
    personalDetailsModel.dateOfBirth = new Date(
      moment(personalDetailsModel.dateOfBirth).format("yyyy-MM-DD")
    );

    if (isValidate(personalDetailsModel)) {
      setButtonLoading(true);
      acceptupdate();
      
    } else {
      setButtonLoading(false);
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

  const onDateOfBirthValueChange = (event: any) => {
    setPersonalDetailsModel({
      ...personalDetailsModel,
      dateOfBirth: event.value,
    });
  };

  const onBussinessValueChage = (event: any) => {
    setPersonalDetailsModel({
      ...personalDetailsModel,
      businessEmail: event.target.value,
    });
  };

  // const onBackClick = () => {
    
  //   onSaveAndContinueClick("B");
  // };
  

  // const onBackClick = () => {
    
  //   onSaveAndContinueClick("B");
  // };
  

//   const onBackClick = () => {
//     if (!readonly && isValidate(personalDetailsModel)) {
//     setBackButtonLoading(true)
//     setTimeout(() => {
//       onSaveAndContinueClick("B");
//       setUpdateBackBtnShow(true);
//       setReadOnly(false);
//     }, 1000)
  
// } else {

//   //console.log("Cannot go back: Form is not ready or data is not valid.");
// }
// };

const onBackClick = () => {
  setBackButtonLoading(true)
  setTimeout(() => {
    onSaveAndContinueClick("B");
  },1000)
};




  const reject = () => {
    setButtonLoading(false);
  };
 

  const handleClose = () => {
    personalDetailsModel.id === 0
      ? setModelEmpty()
      : partnerPersonalDetailsByPartnerId(Number(partnerid));

    ErrorMessageEmptyModel();
    
    if (type === "V") {
     
      if (updateBtnShow) {
        setUpdateBtnShow(false);
        setReadOnly(true);
      }
    }
  };

  // const onNextClick = () => {
  //   setButtonLoadingSkip(true);

  //   setTimeout(() => {
  //     navigate(`../partnerdetails/${partnerid}/${type}`);
  //   }, 500);
  // };

  const onCountryChange = (e: any) => {
    if (e.value !== null) {
      setCountryAutoComplete(e.value);
      setPersonalDetailsModel({
        ...personalDetailsModel,
        country: e.value.code,
      });
    }
  };

  // //console.log(personalDetailsModel.businessEmail);
  // //console.log(personalDetailsModel);
  // //console.log(personalDetailsModel.businessEmail !== null);
  // //console.log(personalDetailsModel.businessEmail !== "null");
  // //console.log(personalDetailsModel.businessEmail === "");
  // //console.log(personalDetailsModel.businessEmail === "");
  // //console.log(personalDetailsModel.businessEmail === null);

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <Scrollbars
          className="contain-scroll"
          autoHide
          autoHideTimeout={1000}
          autoHideDuration={200}
          autoHeight
          autoHeightMin={100}
          autoHeightMax={100}
          thumbMinSize={30}
          universal={true}
        >



             <div className="edit-content">
             {onboardStatus === "Ready" && type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
   
              ): null}
            </div>
          <div className="container-fluid  info-section contact-info acc-screen personal-details">
         
            <Toast ref={toast}></Toast>
            <ConfirmDialog id="confirm-popup" />
            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Legal First Name <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[0]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  name="legalFirstName"
                  placeholder="Enter legal first name"
                  value={personalDetailsModel.legalFirstName}
                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      legalFirstName: ev.target.value,
                    })
                  }
                 }}
            />
                {firstnameerrorMessage !== null &&
                firstnameerrorMessage.length > 0 ? (
                  <span className="error-msg">{firstnameerrorMessage}</span>
                ) : null}
              </div>


              <div className="col-md-4 form-group ">
                <span className="input-label">
                
                Legal Middle Name <span className="color-red">*</span>
                <ToolTip props={personlDetailToolTip[1]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  name="legalMiddleName"
                  placeholder="Enter legal middle name"
                  value={personalDetailsModel.legalMiddleName}
                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                        ...personalDetailsModel,
                        legalMiddleName: ev.target.value,
                      })
                    }
                   }}
              />



              {/* <div className="col-md-4 form-group ">
                <span className="input-label">
                  Legal Middle Name
                  <ToolTip props={personlDetailToolTip[1]} />
                </span>

                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter legal middle name"
                  name="legalMiddleName"
                  value={personalDetailsModel.legalMiddleName}

                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[0-9]*$/;

                    if (re.test(value) || value === '') {

                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      legalMiddleName: ev.target.value,
                    })
                  }
                 }}
          /> */}

                  {/* onChange={(ev) =>{
                    const value =ev.target.value;
                          const re = /^[A-Za-z]+$/;
                          if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      legalMiddleName: ev.target.value,
                    })
                  }
                 }}
            /> */}
               
                <span className="error-msg"></span>
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Legal Last Name <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[2]} />
                </span>
                <input
                  className="form-control  "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter legal last name"
                  name="legalLastName"
                  value={personalDetailsModel.legalLastName}
                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      legalLastName: ev.target.value,
                    })
                  }
                 }}
            />
                {lastnameerrorMessage !== null &&
                lastnameerrorMessage.length > 0 ? (
                  <span className="error-msg">{lastnameerrorMessage}</span>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Maternal Last Name
                  <ToolTip props={personlDetailToolTip[3]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter maternal last name"
                  name="maternalLastName"
                  value={personalDetailsModel.maternalLastName}
                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      maternalLastName: ev.target.value,
                    })
                  }
                 }}
            />
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Paternal Last Name
                  <ToolTip props={personlDetailToolTip[4]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter paternal last name"
                  name="paternalLastName"
                  value={personalDetailsModel.paternalLastName}
                  onChange={(ev) => {
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      paternalLastName: ev.target.value,
                    })
                  }
                 }}
            />
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Phone <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[5]} />
                </span>
                

                <PhoneInput
                  className="form-control Phone-input  PhoneInput--focus"
                  type="text"
                  rules={{ required: true }}
                  initialValueFormat="national"
                  addInternationalOption={false}
                  countryCallingCodeEditable={true}
                  international={false}
                  placeholder="Enter phone number"
                  defaultCountry="US"
                  name="phone"
                  readOnly={readonly}
                  countries={filteredCountries}
                  countryOptionsOrder={null} 
                  value={personalDetailsModel.phone}
                 
                    onChange={(newPhoneNumber) =>{
                      // const value =ev.target.value;           
                    
                      // const re = /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/i;
                      // if (re.test(value) || value === '') 
                      {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      phone: newPhoneNumber,
                    })
                  }
                }}
              
                />

                {phonenoerrorMessage !== null &&
                phonenoerrorMessage.length > 0 ? (
                  <span className="error-msg">{phonenoerrorMessage}</span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Business Email<span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[6]} />
                </span>
                <input
                  className="form-control "
                  type="email"
                  readOnly={readonly}
                  placeholder="Enter business email"
                  name="businessEmail"
                  value={personalDetailsModel.businessEmail}
                  onChange={(ev) =>{
                    const re = /^[A-Za-z0-9.,?@()+\s\(\)-]+$/;

                    if (ev.target.value === '' || re.test(ev.target.value)) {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      businessEmail: ev.target.value,
                    })
                  }
                 }}
            />
                {emailerrorMessage !== null && emailerrorMessage.length > 0 ? (
                  <span className="error-msg">{emailerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Date of Birth <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[7]} />
                </span>
                <Calendar
                  id="icon"
                  showIcon
                  disabled={readonly}
                  placeholder="mm/dd/yyyy"
                  name="dateOfBirth"
                  value={personalDetailsModel.dateOfBirth}
                  onChange={onDateOfBirthValueChange}
                />
                {dateofbirtherrorMessage !== null &&
                dateofbirtherrorMessage.length > 0 ? (
                  <span className="error-msg">{dateofbirtherrorMessage}</span>
                ) : null}
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Address Line 1 <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[8]} />
                </span>

                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter address line1"
                  name="addressLine1"
                  value={personalDetailsModel.addressLine1}
                  onChange={(ev) =>{
                    const value =ev.target.value;
                    const re = /^[A-Za-z0-9.,()\s\(\)-]+$/;
                          if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      addressLine1: ev.target.value,
                    })
                  }
                 }}
            />
                {postaladdresserrorMessage !== null &&
                postaladdresserrorMessage.length > 0 ? (
                  <span className="error-msg">{postaladdresserrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Building Number
                  <ToolTip props={personlDetailToolTip[9]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter building number"
                  name="buildingNumber"
                  value={personalDetailsModel.buildingNumber}
                  onChange={(ev) =>{
                    const value =ev.target.value;
                    // const re = /^[0-9\s]*$/;
                    const re = /^[0-9\s]*$/;

                          if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      buildingNumber: ev.target.value,
                    })
                  }
                 }}
            />
                {buildingnoerrorMessage !== null &&
                buildingnoerrorMessage.length > 0 ? (
                  <span className="error-msg">{buildingnoerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Address Line 2
                  <ToolTip props={personlDetailToolTip[10]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter address line2"
                  name="addressLine2"
                  value={personalDetailsModel.addressLine2}
                  onChange={(ev) =>{
                     const value =ev.target.value;
                     const re = /^[A-Za-z0-9.,()\s\(\)-]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      addressLine2: ev.target.value,
                    })
                  }
                 }}
            />


                {postaladdress2errorMessage !== null &&
                postaladdress2errorMessage.length > 0 ? (
                  <span className="error-msg">
                    {postaladdress2errorMessage}
                  </span>
                ) : null}
                <p></p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Town
                  <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[11]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter town"
                  name="town"
                  value={personalDetailsModel.town}
                  onChange={(ev) =>{
                    const value =ev.target.value;
                          const re = /^[A-Za-z\s]+$/;
                          if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      town: ev.target.value,
                    })
                  }
                 }}
            />
                {townnameerrorMessage !== null &&
                townnameerrorMessage.length > 0 ? (
                  <span className="error-msg">{townnameerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Province<span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[12]} />
                </span>
                <input
                  className="form-control "
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter province"
                  name="province"
                  value={personalDetailsModel.province}
                  onChange={(ev) =>{
                    const value =ev.target.value;
                    const re = /^[A-Za-z\s]+$/;
                    if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      province: ev.target.value,
                    })
                  }
                 }}
            />
                {provinceerrorMessage !== null &&
                provinceerrorMessage.length > 0 ? (
                  <span className="error-msg">{provinceerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Country <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[13]} />
                </span>
                <AutoComplete
                  field="name"
                  dropdown
                  disabled={readonly}
                  forceSelection
                  className="dropdown-acc"
                  placeholder="Enter province"
                  suggestions={filteredcountrylist}
                  completeMethod={searchCountry}
                  onChange={(e) => onCountryChange(e)}
                  value={countryAutoComplete}
                />
                {countryerrorMessage !== null &&
                countryerrorMessage.length > 0 ? (
                  <span className="error-msg">{countryerrorMessage}</span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Postal code
                  <span className="color-red">*</span>
                  <ToolTip props={personlDetailToolTip[14]} />
                </span>
                <input
                  className="form-control"
                  type="text"
                  readOnly={readonly}
                  placeholder="Enter postal code"
                  name="postalCode"
                  value={personalDetailsModel.postalCode}
                  onChange={(ev) =>{
                    const value =ev.target.value;
                    const re = /^[A-Za-z0-9\s]*$/ ;

                          if (re.test(value) || value === '') {
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      postalCode: ev.target.value,
                    })
                  }
                 }}
            />
                {postalcodeerrorMessage !== null &&
                postalcodeerrorMessage.length > 0 ? (
                  <span className="error-msg">{postalcodeerrorMessage}</span>
                ) : null}
              </div>
            </div>
            <div className="button-section">
              <div className="bottom-btns">
                <button
                  type="button"
                  className="btn btn-back second-btn"
                  onClick={onBackClick}
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-cancel second-btn"
                >
                  Cancel
                </button>
                {/* {(updateBtnShow && personalDetailsModel.id !== 0) ? ( */}
                  {updateBtnShow ? (

                  <Button
                    iconPos="left"
                    label={"Save and Continue"}

                    // label={
                    //   personalDetailsModel.id === 0
                    //     ? " Save and Continue"
                    //     : "Save and Continue"
                    // }
                    className="btn btn-continue second-btn"
                    loading={buttonLoading}
                    onClick={
                      personalDetailsModel.id === 0 ? onAddClick : onUpdateClick
                    }
                  />
                ) : (
                  <Button
                      iconPos="left"
                      label="Next"
                      loading={buttonLoadingSkip}
                      onClick={onNextClick}
                      className="btn btn-continue btn-next second-btn"
                    />
                  // <Button
                  //   iconPos="left"
                  //   type="button"
                  //   loading={buttonLoadingSkip}
                  //   onClick={onNextClick}
                  //   className="btn btn-continue  btn-next second-btn"
                  // >
                  //   Next
                  // </Button>
                )}
              </div>
            </div>
          </div>
        </Scrollbars>
      )}
    </>
  );
};

export default PersonalDetails;
