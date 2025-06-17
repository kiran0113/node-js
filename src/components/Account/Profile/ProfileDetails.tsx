import moment from "moment";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ConfirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useNavigate } from "react-router-dom";
import { IPersonalDetails } from "../../../models/IPersonalDetails";
import PersonalDetailToolTip from "../../../services/Partner/PartnershipDetails/PartnerShipToolTip";
import { PersonalDetailsService } from "../../../services/Partner/PersonalDetails/PersonalDetails";
import { Logout } from "../../../utils/AccountUtils";
import { formatPhoneNumber } from 'react-phone-number-input'
import {
  checkPhoneno,
  countryList,
  validContact,
  validEmail,
  validpostalcode,
} from "../../../utils/utils";
import ToolTip from "../../Partner/ToolTipsData/ToolTip";
import Scrollbars from "react-custom-scrollbars-2";


import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const excludedCountries = ["CU","IR","SY","KP"];

function filterCountries(country: string) {
  return !excludedCountries.includes(country);
}

const ProfileDetails: React.FC<any> = ({ parentFunction }) => {
  const [filteredcountrylist, setFilteredCountryList] = React.useState<any[]>(
    []
  );
  interface IState {
    personaldetails: IPersonalDetails;
  }

  const filteredCountries = getCountries().filter(filterCountries);
  const navigate = useNavigate();
  const id = sessionStorage.getItem("PartnerId");
  const [partnerid, setpartnerId] = React.useState(id);
  const [userobj, setUserObj] = useState<any>(sessionStorage.getItem("User"));
  const [countryAutoComplete, setCountryAutoComplete] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const [dateofbirthvalue, setDateofbirthvalue] = useState(null);
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
  const [personlDetailToolTip, setPersonalDetailToolTip] = useState<any>(
    PersonalDetailToolTip
  );


  const [personalDetailsModel, setPersonalDetailsModel] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
    userId: JSON.parse(sessionStorage.getItem("User")).id,
    legalFirstName: JSON.parse(sessionStorage.getItem("User")).firstName,
    legalMiddleName: "",
    legalLastName: JSON.parse(sessionStorage.getItem("User")).lastName,
    maternalLastName: "",
    paternalLastName: "",
    phone: "",
    businessEmail: JSON.parse(sessionStorage.getItem("User")).username,
    dateOfBirth: new Date(),
    addressLine1: "",
    buildingNumber: "",
    addressLine2: "",
    town: "",
    province: "",
    country: "",
    postalCode: "",
  });
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
      formIsValid = false;
    }
    if (!CheckNull(values.firstlegalFirstNameName)) {
      if (values.legalFirstName.trim().length === 0) {
        setfirstnameErrorMessage("Please enter first name.");
        formIsValid = false;
      }
    }
    if (CheckNull(values.legalLastName)) {
      setlastnameErrorMessage("Please enter last name.");
      formIsValid = false;
    }
    if (!CheckNull(values.legalLastName)) {
      if (values.legalLastName.trim().length === 0) {
        setlastnameErrorMessage("Please enter last name.");
        formIsValid = false;
      }
    }

    if (CheckNull(values.phone)) {
      setphonenoErrorMessage("Please enter phone number.");
      formIsValid = false;
    }
    if (!CheckNull(values.phone)) {
      if (values.phone.trim().length === 0) {
        setphonenoErrorMessage("Please enter phone number.");
        formIsValid = false;
      }
      if (checkPhoneno(values.phone) === false) {
        setphonenoErrorMessage("Please enter valid phone number.");
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phone).trim().length > 15) {
        setphonenoErrorMessage(
          "Please enter valid phone number."
        );
        formIsValid = false;
      }
      if (formatPhoneNumber(values.phone).trim().length < 6) {
        setphonenoErrorMessage(
          "Please enter valid phone number."
        );
        formIsValid = false;
      }
    }
    if (CheckNull(values.businessEmail)) {
      setemailErrorMessage("Please enter business email.");
      formIsValid = false;
    }
    if (!CheckNull(values.businessEmail)) {
      if (values.businessEmail.trim().length === 0) {
        setemailErrorMessage("Please enter business email.");
        formIsValid = false;
      }
      if (!validEmail.test(values.businessEmail)) {
        setemailErrorMessage("Please enter correct business email.");
        formIsValid = false;
      }
    }

    if (moment(new Date()).diff(moment(dateofbirthvalue), "years") < 18) {
      setDateOfBirthErrorMessage("Age under 18 not allowed");
      formIsValid = false;
    }

    if (
      moment(dateofbirthvalue).format("yyyy-MM-DD").toString() ===
      moment(new Date()).format("yyyy-MM-DD").toString()
    ) {
      setDateOfBirthErrorMessage("Please enter valid date of birth.");
      formIsValid = false;
    }

    if (dateofbirthvalue == "Invalid Date") {
      setDateOfBirthErrorMessage("Please enter valid date of birth.");
      formIsValid = false;
    }
    if (CheckNull(dateofbirthvalue)) {
      setDateOfBirthErrorMessage("Please enter date of birth.");
      formIsValid = false;
    }

    if (CheckNull(values.addressLine1)) {
      setpostaladdressErrorMessage("Please enter address line1.");
      formIsValid = false;
    }
    if (!CheckNull(values.addressLine1)) {
      if (values.addressLine1.trim().length === 0) {
        setpostaladdressErrorMessage("Please enter address line1.");
        formIsValid = false;
      }
      if (values.addressLine1.length > 70) {
        setpostaladdressErrorMessage(
          "Address line1 should not exceed the max length than 70."
        );
        formIsValid = false;
      }
    }
    if (!CheckNull(values.buildingNumber)) {
      if (values.buildingNumber.length > 16) {
        setbuildingnoErrorMessage(
          "Building number should not exceed the max length than 16."
        );
        formIsValid = false;
      }
    }
    if (!CheckNull(values.addressLine2)) {
      if (values.addressLine2.length > 70) {
        setpostaladdress2ErrorMessage(
          "Address line2 should not exceed the max length than 70."
        );
        formIsValid = false;
      }
    }
    if (CheckNull(values.town)) {
      settownnameErrorMessage("Please enter town.");
      formIsValid = false;
    }

    if (!CheckNull(values.town)) {
      if (values.town.trim().length === 0) {
        settownnameErrorMessage("Please enter town.");
        formIsValid = false;
      }

      if (values.town.length > 35) {
        settownnameErrorMessage(
          "Town name should not exceed the max length than 35."
        );
        formIsValid = false;
      }
    }

    if (CheckNull(values.province)) {
      setprovinceErrorMessage("Please enter province.");
      formIsValid = false;
    }
    if (!CheckNull(values.province)) {
      if (values.province.trim().length === 0) {
        setprovinceErrorMessage("Please enter province.");
        formIsValid = false;
      }
      if (values.province.length > 35) {
        setprovinceErrorMessage(
          "Province should not exceed the max length than 35."
        );
        formIsValid = false;
      }
    }
    if (CheckNull(values.country)) {
      setcountryErrorMessage("Please select country.");
      formIsValid = false;
    }
    if (CheckNull(values.postalCode)) {
      setpostalcodeErrorMessage("Please enter postal code.");
      formIsValid = false;
    }
    if (!CheckNull(values.postalCode)) {
      if (values.postalCode.trim().length === 0) {
        setpostalcodeErrorMessage("Please enter postal code.");
        formIsValid = false;
      }
      if (values.postalCode.length > 16) {
        setpostalcodeErrorMessage(
          "Postal code should not exceed the max length than 16."
        );
        formIsValid = false;
      }
      if (!validpostalcode.test(values.postalCode)) {
        setpostalcodeErrorMessage("Please enter correct postal code.");
        formIsValid = false;
      }
    }

    return formIsValid;
  };

  const partnerPersonalDetailsByPartnerId = (partnerid: number, userid: number) => {
    setLoading(true);
    PersonalDetailsService.getPersonalDetailsByPartnerId(partnerid, userid)
      .then((response) => {
        const data = response.data;
        if (data.id === 0) {
          data.dateOfBirth = "";
          data.legalFirstName = JSON.parse(userobj).firstName;
          data.legalLastName = JSON.parse(userobj).lastName;
          data.businessEmail = JSON.parse(userobj).username;
        } else {
          setDateofbirthvalue(new Date(response.data.dateOfBirth));
          setCountryAutoComplete(countryList.find(country => country.code === data.country).name);
        }
        setPersonalDetailsModel(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
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
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };
  useEffect(() => {
    const userobj: any = sessionStorage.getItem("User");

    if (userobj === null || userobj === undefined) {
      Logout(navigate);
    }

    partnerPersonalDetailsByPartnerId(Number(partnerid), personalDetailsModel.userId);
  }, []);

  const onUpdateClick = () => {
    setButtonLoading(true);
    personalDetailsModel.partnerId = Number(partnerid);
    personalDetailsModel.dateOfBirth = new Date(
      moment(dateofbirthvalue).format("yyyy-MM-DD")
    );

    if (isValidate(personalDetailsModel)) {
      PersonalDetailsService.updateProfile(personalDetailsModel)
        .then((response) => {
          setButtonLoading(false);

          parentFunction(1);
          toast.current?.show({
            severity: "success",
            summary: "Profile updated successfully!",
            life: 5000,
          });
        })
        .catch((error) => {
          if (error.response.status === 401) {
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
              summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }

          setButtonLoading(false);
        });
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

  const reject = () => {
    setButtonLoading(false);
  };

  const handleClose = () => {
    partnerPersonalDetailsByPartnerId(Number(partnerid), personalDetailsModel.partnerId);

    ErrorMessageEmptyModel();
  };
  const onCountryChange = (e: any) => {
    if (e.value !== null) {
      setCountryAutoComplete(e.value);
      setPersonalDetailsModel({
        ...personalDetailsModel,
        country: e.value.code,
      })
    }
  };
  return (

    <div className="page-container">
      {/* Scrollbar */}


    <Scrollbars
      className="creatpayment-scroll"
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={100}
      autoHeightMax={400} 
      thumbMinSize={30}
      universal={true}
    >    


    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
   
        <div className="container-fluid acc-screen info-section contact-info personal-details ">
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
                name="legalFirstName"
                placeholder="Enter legal first name"
                value={personalDetailsModel.legalFirstName}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    legalFirstName: e.target.value,
                  })
                }
              />
              {firstnameerrorMessage !== null &&
                firstnameerrorMessage.length > 0 ? (
                <span className="error-msg">{firstnameerrorMessage}</span>
              ) : null}
            </div>
            <div className="col-md-4 form-group ">
              <span className="input-label">
                Legal Middle Name
                <ToolTip props={personlDetailToolTip[1]} />
              </span>

              <input
                className="form-control "
                type="text"
                placeholder="Enter legal middle name"
                name="legalMiddleName"
                value={personalDetailsModel.legalMiddleName}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    legalMiddleName: e.target.value,
                  })
                }
              />
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
                placeholder="Enter legal last name"
                name="legalLastName"
                value={personalDetailsModel.legalLastName}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    legalLastName: e.target.value,
                  })
                }
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
                placeholder="Enter maternal last name"
                name="maternalLastName"
                value={personalDetailsModel.maternalLastName}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    maternalLastName: e.target.value,
                  })
                }
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
                placeholder="Enter paternal last name"
                name="paternalLastName"
                value={personalDetailsModel.paternalLastName}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    paternalLastName: e.target.value,
                  })
                }
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
                countries={filteredCountries}
                countryOptionsOrder={null} 
                name="phone"
                value={personalDetailsModel.phone}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    phone: e!,
                  })
                }
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
                disabled
                className="form-control "
                type="text"
                placeholder="Enter business email"
                name="businessEmail"
                value={personalDetailsModel.businessEmail}
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
                placeholder="mm/dd/yyyy"
                name="dateOfBirth"
                value={dateofbirthvalue}
                onChange={(e) => {
                  setDateofbirthvalue(e.target.value);
                }}
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
                placeholder="Enter address line1"
                name="addressLine1"
                value={personalDetailsModel.addressLine1}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    addressLine1: e.target.value,
                  })
                }
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
                placeholder="Enter building number"
                name="buildingNumber"
                value={personalDetailsModel.buildingNumber}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    buildingNumber: e.target.value,
                  })
                }
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
                placeholder="Enter address line2"
                name="addressLine2"
                value={personalDetailsModel.addressLine2}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    addressLine2: e.target.value,
                  })
                }
              />
              {postaladdress2errorMessage !== null &&
                postaladdress2errorMessage.length > 0 ? (
                <span className="error-msg">{postaladdress2errorMessage}</span>
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
                placeholder="Enter town"
                name="town"
                value={personalDetailsModel.town}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    town: e.target.value,
                  })
                }
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
                placeholder="Enter province"
                name="province"
                value={personalDetailsModel.province}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    province: e.target.value,
                  })
                }
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
                forceSelection
                className="dropdown-acc"
                placeholder="Select country"
                suggestions={filteredcountrylist}
                completeMethod={searchCountry}
                value={countryAutoComplete}
                onChange={(e) => onCountryChange(e)}
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
                className="form-control "
                type="text"
                placeholder="Enter postal code"
                name="postalCode"
                value={personalDetailsModel.postalCode}
                onChange={(e) =>
                  setPersonalDetailsModel({
                    ...personalDetailsModel,
                    postalCode: e.target.value,
                  })
                }
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
                onClick={handleClose}
                className="btn btn-cancel second-btn"
              >
                Cancel
              </button>

              <Button
                iconPos="left"
                label={"Save"}
                className="btn btn-continue second-btn"
                loading={buttonLoading}
                onClick={onUpdateClick}
              />
            </div>
          </div>
        </div>
      
      )}
    </>
    </Scrollbars>
    </div>
  );
};

export default ProfileDetails;
