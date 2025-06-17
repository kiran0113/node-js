import requiredBlue from "../../../assets/images/required-blue.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IContact } from "../../../models/IContact";
import { validEmail, checkPhoneno } from "../../../utils/utils";
import { ContactService } from "../../../services/Partner/Contact/ContactService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { formatPhoneNumber } from 'react-phone-number-input'
import ContactToolTips from "../../../services/Partner/Contact/ContactToolTips";
import ToolTip from "../ToolTipsData/ToolTip";

import { Logout } from "../../../utils/AccountUtils";

import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import Scrollbars from "react-custom-scrollbars-2";

const excludedCountries = ["CU","IR","SY","KP"];

function filterCountries(country: string) {
  return !excludedCountries.includes(country);
}

const Contact: React.FC<any> = ({ onSaveAndContinueClick, onButtonChange,onBackButtonChange,onNextClick, setButtonLoadingSkip, buttonLoadingSkip }) => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const onboardStatus = sessionStorage.getItem("onboardStatus");

  const filteredCountries = getCountries().filter(filterCountries);

  const [loading, setLoading] = useState(true);
  const [contactloading, setContactloadingLoading] = useState(false);
  const { partnerid, type } = useParams();
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [backButtonLoading, setBackButtonLoading] = useState(false)

  const [readOnly, setReadOnly] = useState(true);
 
  const [contactModel, setContactModel] = useState<IContact>({
    id: 0,
    partnerId: Number(partnerid),
    phoneNumber: "",
    faxNumber: "",
    emailAddress: "",
    onboardStatus : sessionStorage.getItem("onboardingStatus ")
  });

  const setModelEmpty = () => {
    setContactModel({
      id: 0,
      partnerId: Number(partnerid),
      phoneNumber: "",
      faxNumber: "",
      emailAddress: "",
      onboardStatus : sessionStorage.getItem("onboardingStatus ")
    });
  };

  const [phonenoerrorMessage, setphonenoErrorMessage] = useState("");

  const [emailerrorMessage, setemailErrorMessage] = useState("");


  const [faxerrorMessage, setfaxErrorMessage] = useState("");

  const [contactToolTip,] = useState<any>(ContactToolTips);

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };
  const ErrorMessageEmptyModel = () => {
    setphonenoErrorMessage("");
    setemailErrorMessage("");
    setfaxErrorMessage("");
  };

  const partnerContactByPartnerId = (id: number) => {
    setLoading(true);
    ContactService.getContactByPartnerId(id)
      .then((response) => {
        const data = response.data;
        if (isValidate(data)) {
        setContactModel(data);
        setLoading(false);
        }
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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while getting contact details.",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };

  const handleClose = () => {
    contactModel.id === 0
      ? setModelEmpty()
      : partnerContactByPartnerId(Number(partnerid));

    ErrorMessageEmptyModel();
    if (type === "V") {
      if (updateBtnShow) {
        setUpdateBtnShow(false)
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

  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();
    if (CheckNull(values.phoneNumber)) {
      setphonenoErrorMessage("Please enter company phone number.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (!CheckNull(values.phoneNumber)) {
      if (values.phoneNumber.trim().length === 0) {
        setphonenoErrorMessage("Please enter company phone number.");
        setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phoneNumber).trim().length > 15) {
        setphonenoErrorMessage(
          "Please enter valid company phone number." 
        );
        setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phoneNumber).trim().length < 6) {
        setphonenoErrorMessage(
          "Please enter valid company phone number."
        );
        setUpdateBtnShow(true);
      setReadOnly(false);

      setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
      if (checkPhoneno(values.phoneNumber) === false) {
        setphonenoErrorMessage("Please enter valid phone number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (!CheckNull(values.faxNumber)) {
      if (formatPhoneNumber(values.faxNumber).trim().length > 15) {
        setfaxErrorMessage(
          "Please enter valid fax number."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        
        formIsValid = false;
      }
      if (formatPhoneNumber(values.faxNumber).trim().length < 6) {
        setfaxErrorMessage(
          "Please enter valid fax number."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }

    }

    if (!CheckNull(values.emailAddress)) {
      if (!validEmail.test(values.emailAddress)) {
        setemailErrorMessage("Please enter correct company email address.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
      if (values.emailAddress.length > 2048) {
        setemailErrorMessage(
          "Company email address length should not exceed the max length than 2048."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.emailAddress)) {
      setemailErrorMessage("Please enter company email");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    return formIsValid;
  };
  

  useEffect(()=>{
    onButtonChange({updateBtnShow})
  },[updateBtnShow])
  
  useEffect(()=>{
    onBackButtonChange({updateBackBtnShow})
  },[updateBackBtnShow])

  const onAddClick = () => {
    contactModel.partnerId = Number(partnerid);
    ErrorMessageEmptyModel();
    setButtonLoading(true);

    if (isValidate(contactModel)) {
      ContactService.addContact(contactModel)
        .then((response) => {
          sessionStorage.setItem("StepFlag", "3");
          ErrorMessageEmptyModel();
          setButtonLoading(false);
          onSaveAndContinueClick("N");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.current?.show({
              severity: "error",
              summary: "Something went wrong",
              life: 3000,
            });
          } else if (error.response.status === 400) {
            toast.current?.show({
              severity: "error",
              summary: error.response.data[0].errorMessage,
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
              summary: "Error while updating contact details.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const onUpdateClick = () => {
    setButtonLoading(true);
    if (isValidate(contactModel)) {
      ContactService.updateContact(contactModel)
        .then((data: any) => {
          ErrorMessageEmptyModel();
          setButtonLoading(false);
          onSaveAndContinueClick("N");
        })
        .catch((error: any) => {
          if (error.response.status === 500) {
            toast.current?.show({
              severity: "error",
              summary: "Something went wrong",
              life: 3000,
            });
          } else if (error.response.status === 400) {
            toast.current?.show({
              severity: "error",
              summary: error.response.data[0].errorMessage,
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
              summary: "Error while updating contact details.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };




//   const onBackClick = () => {
//     if (!readOnly && isValidate(contactModel))
//      {
//     setBackButtonLoading(true)
//     setTimeout(() => {
//       onSaveAndContinueClick("B");
//       setUpdateBackBtnShow(true);
//       setReadOnly(false);
//     }, 1000)
     
// } 

// else {

//   //console.log("Cannot go back: Form is not ready or data is not valid.");
// }
// };

const onBackClick = () => {
  setBackButtonLoading(true)
  setTimeout(() => {
    onSaveAndContinueClick("B");
  },1000)
};




  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
    }, 1000);
  };

  useEffect(() => {
    setLoading(false)
    setButtonLoadingSkip(false);
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    } 

    // Update the document title using the browser API
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }     
    if (Number(partnerid) !== 0) {
      partnerContactByPartnerId(Number(partnerid));

    }              
  }, []);



  return (
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
        autoHeightMax={100}
        thumbMinSize={30}
        universal={true}
      >
        <div className="container-fluid acc-screen contact-info ">
          <div className="edit-content">
          {onboardStatus === "Ready" && type === "V" ? (
              <Button
                className="btn edit-partner"
                label="Edit"
                onClick={EditDetails}
              />
            ) : null}
          </div>
          <div className="row ">
            <div className="col-md-6 form-group info-section">
              <div className="col-md-12 form-group ">
                <span className="input-label">
                  Company phone number<span className="color-red">*</span>{" "}
                  <ToolTip props={contactToolTip[0]} />
                </span>

                <PhoneInput
                  className="form-control Phone-input"
                  type="text"
                  readOnly={readOnly}
                  initialValueFormat="national"
                  addInternationalOption={false}
                  countryCallingCodeEditable={true}
                  international={false}
                  placeholder="Enter phone number"
                  defaultCountry="US"
                  name="phoneNumber"
                  autoComplete="nope"
                  countries={filteredCountries}
                  countryOptionsOrder={null} 

                  value={contactModel.phoneNumber}
                  onChange={(e) =>
                    setContactModel({
                      ...contactModel,
                      phoneNumber: e!,
                    })
                    
                  }
                 
                />

                {phonenoerrorMessage !== null &&
                  phonenoerrorMessage.length > 0 && (
                    <span className="error-msg">{phonenoerrorMessage}</span>
                  )}
              </div>
              <div className="col-md-12 form-group ">
                <span className="input-label">
                  Company fax number
                  <ToolTip props={contactToolTip[1]} />
                </span>
                <PhoneInput
                  className="form-control Phone-input"
                  type="text"
                  readOnly={readOnly}
                  // initialValueFormat="national"
                  // addInternationalOption={false}
                  // countryCallingCodeEditable={true}
                  // international={false}
                  // placeholder="Enter fax number"
                  // defaultCountry="US"
                  // name="faxNumber"
                  // autoComplete="nope"

                  // countries={filteredCountries}
                  // countryOptionsOrder={null} 
                  
                  // value={contactModel.faxNumber}
                  
                  onChange={(e) =>
                    setContactModel({
                      ...contactModel,
                      faxNumber: e!,
                    })
                  }
                  
                />
                {faxerrorMessage !== null && faxerrorMessage.length > 0 && (
                  <span className="error-msg">{faxerrorMessage}</span>
                )}
              </div>
              <div className="col-md-12 form-group mb-setShowHide2">
                <span className="input-label">
                  Company email address <span className="color-red">*</span>{" "}
                  <ToolTip props={contactToolTip[2]} />
                </span>
                <input

                  className="form-control "
                  type="email"
                  disabled={readOnly}
                  placeholder="Enter email address"
                  name="companyEmailAddress"
                  autoComplete="nope"
                  value={contactModel.emailAddress}
                  onChange={(ev) =>{
                    const re = /^[A-Za-z0-9.,?@()+\s\(\)-]+$/;

                    if (ev.target.value === '' || re.test(ev.target.value)) {
                    setContactModel({
                      ...contactModel,
                      emailAddress: ev.target.value,
                    })
                  }
                 }}
            />
                {emailerrorMessage !== null && emailerrorMessage.length > 0 && (
                  <span className="error-msg">{emailerrorMessage}</span>
                )}
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
                  loading={backButtonLoading}
                  className="btn btn-back second-btn"
                  onClick={onBackClick}
                /> 
             
                ):
                <Button
                    type="button"
                    label="Back"
                    loading={backButtonLoading}
                    className="btn btn-back second-btn"
                    onClick={onBackClick}
                  />
                }
                  
                
             
                &nbsp;&nbsp;
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
                    loading={buttonLoading}
                    onClick={contactModel.id === 0 ? onAddClick : onUpdateClick}
                  />
                ) :
                  <Button
                    iconPos="left"
                    label="Next"
                    loading={buttonLoadingSkip}
                    onClick={onNextClick}
                    className="btn btn-continue btn-next second-btn"
                  />
                }






              </>
            </div>
          </div>
        </div>
        </Scrollbars>
      {/* )} */}
    </>
  );
};

export default Contact;
