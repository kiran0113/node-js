import { AutoComplete } from "primereact/autocomplete";
import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { IUserManagement } from "../../../models/IUserManagement";
import { UserManagementService } from "../../../services/Partner/UserManagement/UserManagementService";
import { Logout } from "../../../utils/AccountUtils";
import Approve from "../../AdminTabcontent/Approve";
import { formatPhoneNumber } from 'react-phone-number-input'
import {
  checkPhoneno,
  countryList,
  statusList,
  validContact,
  validEmail,
  validpostalcode,
} from "../../../utils/utils";
import { Calendar } from "primereact/calendar";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { PersonalDetailsService } from "../../../services/Partner/PersonalDetails/PersonalDetails";
import React from "react";
import { PartnershipDetailsService } from "../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import LoadinIcon from "../../../Layout/loadingIcon";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";

import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const excludedCountries = ["CU","IR","SY","KP"];

function filterCountries(country: string) {
  return !excludedCountries.includes(country);
}



const UserManagement: React.FC<any> = () => {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [displayBasicUpdate, setDisplayBasicUpdate] = useState(false);
  const filteredCountries = getCountries().filter(filterCountries);
  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [dateofbirthvalue, setDateofbirthvalue] = useState(null);

  const [Isfacilitator, setIsFacilitator] = useState(false);

  const [userNameErrorMessage, setuserNameErrorMessage] = useState("");

  const [firstNameErrorMessage, setfirstNameErrorMessage] = useState("");

  const [lastNameErrorMessage, setlastNameErrorMessage] = useState("");

  const [loading, setLoading] = useState(true);

  const [userloading, setUserLoading] = useState(false);

  const [userlist, setUserList] = useState<any[]>([]);

  const [userrolelist, setUserRoleList] = useState<any[]>([]);

  const [filteredItems, setFilteredItems] = useState<any>(null);

  const [statusfilteredItems, setStatusFilteredItems] = useState<any>(null);

  const [roleAutoComplete, setRoleAutoComplete] = useState("");

  const [statusAutoComplete, setStatusAutoComplete] = useState("");

  const { partnerid } = useParams();

  const [roleerrorMessage, setroleErrorMessage] = useState("");

  const [statuserrorMessage,] = useState("");

  const [buttonLoading, setButtonLoading] = useState(false);

  const [updatebuttonLoading, setUpdateButtonLoading] = useState(false);

  const [phonenoerrorMessage, setphonenoErrorMessage] = useState("");

  const [emailerrorMessage, setemailErrorMessage] = useState("");

  const [displaydeletepopup, setDisplayDeletePopup] = useState(false);

  const [dateofbirtherrorMessage, setDateOfBirthErrorMessage] = useState("");

  const [postaladdresserrorMessage, setpostaladdressErrorMessage] =
    useState("");

  const [postaladdress2errorMessage, setpostaladdress2ErrorMessage] =
    useState("");

  const [buildingnoerrorMessage, setbuildingnoErrorMessage] = useState("");

  const [postalcodeerrorMessage, setpostalcodeErrorMessage] = useState("");

  const [provinceerrorMessage, setprovinceErrorMessage] = useState("");

  const [townnameerrorMessage, settownnameErrorMessage] = useState("");

  const [countryerrorMessage, setcountryErrorMessage] = useState("");

  const [filteredcountrylist, setFilteredCountryList] = useState<any[]>([]);

  const [activeStatus, setActiveStatus] = useState(null);

  const [changeStatus, setChangeStatus] = useState(false);

  const [inactiveUser, setInactiveUser] = useState(null);

  const [countryAutoComplete, setCountryAutoComplete] = useState("");

  const [globalFilterValue, setGlobalFilterValue] = useState(null);
  const [userprloding,setUserPrtnerIdLoding]=useState(false);

  //personal detail model
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
    roleId: 0,
    isActive: true,
  });

  //user model
  const [userModel, setUserModel] = useState<IUserManagement>({
    id: 0,
    partnerId: Number(partnerid),
    firstName: "",
    userName: "",
    lastName: "",
    roleId: 0,
    isActive: true,
  });

  //set user model empty
  const setModelEmpty = () => {
    setUserModel({
      id: 0,
      partnerId: Number(partnerid),
      firstName: "",
      userName: "",
      lastName: "",
      roleId: 0,
      isActive: true,
    });
    setRoleAutoComplete("");
  };

  //check null
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null || value === 0) {
      return true;
    }
    return false;
  };

  //error message empty
  const ErrorMessageEmptyModel = () => {
    setpostaladdressErrorMessage("");
    setbuildingnoErrorMessage("");
    setpostalcodeErrorMessage("");
    setprovinceErrorMessage("");
    settownnameErrorMessage("");
    setcountryErrorMessage("");
    setfirstNameErrorMessage("");
    setlastNameErrorMessage("");
    setphonenoErrorMessage("");
    setuserNameErrorMessage("");
    setemailErrorMessage("");
    setDateOfBirthErrorMessage("");
    setroleErrorMessage("");
    setpostaladdress2ErrorMessage("");
  };

  //update field validation 
  const isUpdateValidate = (values: any) => {

    ErrorMessageEmptyModel();
    let formIsValid = true;
    if (CheckNull(values.legalFirstName)) {
      setfirstNameErrorMessage("Please enter first name.");
      formIsValid = false;
    }
    if (!CheckNull(values.firstlegalFirstNameName)) {
      if (values.legalFirstName.trim().length === 0) {
        setfirstNameErrorMessage("Please enter first name.");
        formIsValid = false;
      }
    }
    if (CheckNull(values.legalLastName)) {
      setlastNameErrorMessage("Please enter last name.");
      formIsValid = false;
    }
    if (!CheckNull(values.legalLastName)) {
      if (values.legalLastName.trim().length === 0) {
        setlastNameErrorMessage("Please enter last name.");
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
      setpostaladdressErrorMessage("Please enter address line 1.");
      formIsValid = false;
    }
    if (!CheckNull(values.addressLine1)) {
      if (values.addressLine1.trim().length === 0) {
        setpostaladdressErrorMessage("Please enter address line 1.");
        formIsValid = false;
      }
      if (values.addressLine1.length > 70) {
        setpostaladdressErrorMessage(
          "Please enter valid address line 1."
        );
        formIsValid = false;
      }
    }
    if (!CheckNull(values.buildingNumber)) {
      if (values.buildingNumber.length > 16) {
        setbuildingnoErrorMessage(
          "Please enter valid building number."
        );
        formIsValid = false;
      }
    }
    if (!CheckNull(values.addressLine2)) {
      if (values.addressLine2.length > 70) {
        setpostaladdress2ErrorMessage(
          "Please enter valid address line 2."
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
          "Please enter valid town name."
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
          "Please enter valid province."
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
          "Please enter valid postalcode."
        );
        formIsValid = false;
      }
      if (!validpostalcode.test(values.postalCode)) {
        setpostalcodeErrorMessage("Please enter correct postal code.");
        formIsValid = false;
      }
    }
    if (CheckNull(values.roleId)) {
      setroleErrorMessage("Please select role.");

      formIsValid = false;
    }
    return formIsValid;
  };

  //validation check
  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();

    if (CheckNull(values.firstName)) {
      setfirstNameErrorMessage("Please enter firstname");
      formIsValid = false;
    }

    if (CheckNull(values.lastName)) {
      setlastNameErrorMessage("Please enter lastname");
      formIsValid = false;
    }

    if (CheckNull(values.userName)) {
      setuserNameErrorMessage("Please enter email");
      formIsValid = false;
    }
    if (!CheckNull(values.userName)) {
      if (!validEmail.test(values.userName)) {
        setuserNameErrorMessage("Please enter valid email");
        formIsValid = false;
      }
    }
    if (CheckNull(values.roleId)) {
      setroleErrorMessage("Please select role.");

      formIsValid = false;
    }
    return formIsValid;
  };

  //partner personal details by id
  const partnerPersonalDetailsByPartnerId = (rowData: any, userid: any) => {
    setLoading(false)
    PersonalDetailsService.getPersonalDetailsByPartnerId(
      rowData.partnerId,
      rowData.id
    )
      .then((response) => {
        const data = response.data;
        if (response.data.dateOfBirth === "0001-01-01T00:00:00") {
          setDateofbirthvalue("");
          setShowCalendar(true);
          data.dateOfBirth = "";
        } else {
          setDateofbirthvalue(new Date(response.data.dateOfBirth));
          setShowCalendar(false);
        }

        if (data.country === null || data.country === " ") {
          setCountryAutoComplete("");
        } else {
          setCountryAutoComplete(
            countryList.find((country) => country.code === data.country).name
          );
        }
        setPersonalDetailsModel(data);
        setLoading(false);
        if (data.isActive === true) {
          data.isActive === true
            ? setStatusAutoComplete("Active")
            : setStatusAutoComplete("InActive");
        }

        setRoleAutoComplete(data.roleName);
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

  //on add click
  const onAddClick = () => {
    setUpdateButtonLoading(true);
    personalDetailsModel.partnerId = Number(partnerid);

    personalDetailsModel.dateOfBirth =
      moment(dateofbirthvalue).format("yyyy-MM-DD");

    if (isUpdateValidate(personalDetailsModel)) {
      PersonalDetailsService.addProfile(personalDetailsModel)
        .then((response) => {
          setUpdateButtonLoading(false);
          setDisplayBasicUpdate(false);
          userByPartnerId(Number(partnerid));
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

          setUpdateButtonLoading(false);
        });
    } else {
      setUpdateButtonLoading(false);
    }
  };

  const actionBodyStatus = (rowData: any) => {
    if (Number(rowData.isActive) === 1) {
      return <>Active</>;
    } else {
      return <>Inactive</>;
    }
  };

  //on update click
  const onUpdateClick = () => {

    personalDetailsModel.partnerId = Number(partnerid);
    personalDetailsModel.dateOfBirth =
      moment(dateofbirthvalue).format("yyyy-MM-DD");

    if (isUpdateValidate(personalDetailsModel)) {
      setUpdateButtonLoading(true);
      PersonalDetailsService.updateProfile(personalDetailsModel)
        .then((response) => {
          setUpdateButtonLoading(false);
          setDisplayBasicUpdate(false);
          userByPartnerId(Number(partnerid));
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

          setUpdateButtonLoading(false);
        });
    } else {
      setUpdateButtonLoading(false);
    }
  };

  //search country 
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

  //Model handle close
  const handleCloseForAdd = () => {
    setModelEmpty();
    ErrorMessageEmptyModel();
    onHideClick();
  };

  useEffect(() => {
    // Update the document title using the browser API
    const userobj = sessionStorage.getItem("User");
    if (userobj === null || userobj === undefined) {
      Logout(navigate);
    }
    if (Number(partnerid) !== 0) {
      userByPartnerId(Number(partnerid));
    }
    getPartnershipDetailsByPartnerId();

  }, []);

  //get partner details by partner id
  const getPartnershipDetailsByPartnerId = () => {
    setUserLoading(true);
  
    PartnershipDetailsService.getPartnershipDetailsByPartnerId(
      Number(partnerid)
    )
      .then((response) => {
        const data = response.data;
        setIsFacilitator(response.data.isFacilitator);
        setUserLoading(false);
        

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
            summary: "Error while getting partnership details.",
            life: 3000,
          });
        }
        setUserLoading(false);
        setLoading(false)
      });
  };

  //add user handle submit
  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {

    ErrorMessageEmptyModel();
    userModel.partnerId = Number(partnerid);
    setButtonLoading(true);
    if (isValidate(userModel)) {

      UserManagementService.addUser(userModel)
        .then((data) => {
          setButtonLoading(false);

          onHideClick();
          userByPartnerId(partnerid);

        })
        .catch((error) => {
          if (error.response.status === 409) {
            setuserNameErrorMessage(error.response.data);
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

  const onEditClick = () => {
    setShowCalendar(true);
    setDateofbirthvalue(null);
  }

  //user by partner id
  const userByPartnerId = (partnerid: any) => {

    setUserPrtnerIdLoding(true);
     setLoading(true);
    
    UserManagementService.getUserByPartnerId(partnerid)
      .then((response) => {
        const data = response.data;
        setUserList(data);
        setUserPrtnerIdLoding(false);
      // setUserLoading(false);      
        setRoleAutoComplete(data.roleName);
        setLoading(false);
       
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
            summary: "Error while getting user details.",
            life: 3000,
          });
        }
        setUserPrtnerIdLoding(false);
        setLoading(false)

      });
  };

  //get user role
  const getUserRole = () => {
    UserManagementService.getUserRole()
      .then((response) => {
        const data = response.data;
        if (Isfacilitator === false) {
          setUserRoleList(data.filter((item: any) => item.id !== 5));
        } else if (Isfacilitator === true) {
          setUserRoleList(data);
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
            summary: "Error while getting user details.",
            life: 3000,
          });
        }
      });
  };

  //search item
  const searchItems = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < userrolelist.length; i++) {
      let item = userrolelist[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredItems(_filteredItems);
  };

  //search status item
  const searchStatusItems = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < statusList.length; i++) {
      let item = statusList[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setStatusFilteredItems(_filteredItems);
  };

  //on role change
  const onRoleChange = (e: any) => {
    if (e.value !== null) {
      setRoleAutoComplete(e.value);
      setPersonalDetailsModel({
        ...personalDetailsModel,
        roleId: e.value.id,
      });
    }
  };

  //add role
  const onRoleAddChange = (e: any) => {
    if (e.value !== null) {
      setRoleAutoComplete(e.value);
      setUserModel({
        ...userModel,
        roleId: e.value.id,
      });
    }
  };

  //on status change
  const onStatusChange = (e: any) => {
    if (e.value !== null) {
      setStatusAutoComplete(e.value);

      setPersonalDetailsModel({
        ...personalDetailsModel,
        isActive: e.value.value,
      });
    }
  };

  //show hide dialog box
  const ShowHideDialog = () => {

    setModelEmpty();
    ErrorMessageEmptyModel();
    setDisplayBasic(true);
    getUserRole();
  };

  //on hide click
  const onHideClick = () => {
    setDisplayBasic(false);
    //refresh comp.
  };

  //on update basic dialoge box hide
  const onUpdateHideClick = () => {
    setDisplayBasicUpdate(false);
    //refresh comp.
  };

  //show full name in table
  const actionBodyTemplateFullName = (rowData: any) => {
    return (
      <>
        {rowData.firstName} {rowData.lastName}
      </>
    );
  };

  //edit user details
  const editUserDetails = (rowData: any) => {

    setDisplayBasicUpdate(true);
    ErrorMessageEmptyModel();
    partnerPersonalDetailsByPartnerId(rowData, rowData);
    getUserRole();
  };

  //edit user details
  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
      
{/* 
      className={`editbtn ${status !== "incomplete" ? 'disabled' : ''}`}
  onClick={() => {
    if (status === "incomplete") {
      editUserDetails(rowData);

    } else {
      //console.log("Cannot edit user details for non-incomplete status.");
    }
  }} */} 

{/* <Button */}

{/* // currentstatulist.filter((x) => x.id === rowData.status)[0]
// className={`editbtn ${currentstatulist !== "incomplete" ? 'disabled' : ''}`} */}
{/* title="Edit"
  onClick={() => {
    if ( currentstatulist ! === "incomplete") {
      editUserDetails(rowData);

    } else {
      //console.log("Cannot edit user details for non-incomplete status.");
    }
  }}

/> */}
    

        <Button
          icon="pi pi-pencil"
          className="editbtn "
          onClick={() => editUserDetails(rowData)}
          title="Edit"
        />

        <span className="switch-style ">
          <InputSwitch
            className="status-check activeinput"
            name="Send"
            checked={Boolean(rowData.isActive)}
            onChange={(e) => inactiveUserDetails(rowData, e)}
          />
        </span>
      </>
    );
  };

  const inactiveUserDetails = (rowData: any, e: any) => {
    setActiveStatus(Boolean(rowData.isActive));
    setChangeStatus(e.target.value);
    setInactiveUser(rowData);
    setDisplayDeletePopup(true);
  };


  //on delete click user
  const onDeleteClickUser = () => {
    onDeleteClick(inactiveUser);
    setDisplayDeletePopup(false);
  };

  //on reject popup hide
  const reject = () => {
    ErrorMessageEmptyModel();
    setDisplayDeletePopup(false);
  };

  //on delete click
  const onDeleteClick = (rowData: any) => {
    setUpdateButtonLoading(true);
    personalDetailsModel.partnerId = Number(partnerid);
    PersonalDetailsService.updateUserProfileStatus(rowData.id, changeStatus, Number(partnerid))
      .then((response) => {
        setUpdateButtonLoading(false);
        userByPartnerId(partnerid);

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
        setUpdateButtonLoading(false);
      });
  };

  const formatDateField = (rowData: any) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.createdDate).format("MM/DD/YYYY H:mm.ss")} </span>
      </React.Fragment>
    );
  };


  //on country change 
  const onCountryChange = (e: any) => {
    if (e.value !== null) {
      setCountryAutoComplete(e.value);
      setPersonalDetailsModel({
        ...personalDetailsModel,
        country: e.value.code,
      });
    }
  };


  return (
    <>
      {loading ? (<LoadinIcon />) :

        (<div className="table-screen add-user-screen wrapper">
          <div className="container-fluid acc-screen adm-insta-fees-table info-section usermange">
            <div className="user-tab " >
              <div className="user-heading heading-section"  >

           
                  <div className="col-md-6 data-search-input">
                    <span className="p-input-icon-left">
                      <i className="pi pi-search" />
                      <InputText
                        type="search"
                        placeholder="Search..."
                        onInput={(e: any) =>
                          setGlobalFilterValue(e.target.value)
                        }
                      />
                    </span>
                  </div>
                  <div className="col-md-6 user-heading  ">
                    <button
                      type="button"
                      className="btn btn-continue send-btn"
                      onClick={ShowHideDialog}
                    >
                      <i className="pi pi-plus"></i> Add User
                    </button>

                    <Button
                      iconPos="left"
                      icon="pi pi-refresh"
                      label="Refresh"
                      className="btn btn-continue"
                      onClick={() => getPartnershipDetailsByPartnerId()}
                    />
                  </div>

              </div>
              {userloading ? (<LoadinIcon />) : <>
                <div className="datatable-doc-demo">
                  <div className="">
                    <DataTable
                      value={userlist}
                      paginator
                      className="p-datatable-customers"
                      rows={10}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      rowsPerPageOptions={[10, 25, 50]}
                      dataKey="id"
                      rowHover
                      filterDisplay="menu"
                     
                      responsiveLayout="scroll"
                      globalFilter={globalFilterValue}
                      filters={globalFilterValue}
                      globalFilterFields={[
                        "firstName",
                        "roleName",
                        "userName",
                      ]}
                      emptyMessage="No Users found."
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                      <Column
                        field="firstName"
                        header="User"
                        sortable
                        body={actionBodyTemplateFullName}
                        style={{ width: "15%" }}
                      />
                      <Column
                        field="roleName"
                        header="Role"
                        style={{ width: "15%" }}
                      />
                      <Column
                        field="userName"
                        header="Email"
                        style={{ width: "15%" }}
                      />

                      <Column field="createdDate"  body={formatDateField} header="Invited Date" sortable  style={{ width: "15%" }}/>

                      <Column field="createdBy" header="Invited By" sortable  style={{ width: "15%" }}/>

                      <Column
                          field="isActive"
                          header="Status"
                          sortable
                          body={actionBodyStatus}
                          style={{ width: "10%" }}
                        />

                      <Column
                        header="Action"
                        body={actionBodyTemplate}
                        style={{ width: "20%" }}
                      />
                    </DataTable>
                  </div>
                </div>
              </>}
            </div>
          </div>
        </div>
        )}


      <Dialog
        visible={displayBasic}
        onHide={() => onHideClick()}
        className=" acc-screen contact-info  user-dialog  user-add-popupuser-dialog"
      >


        {userloading ? (
          <LoadinIcon />
        ) : (
          <>


            <button className="close-btn" onClick={onHideClick}>
              <img src={CloseIcon} />
            </button>
            <div className="popup-inner-content">
              <h2>Invite your team member to help manage your account</h2>

              <div className="row user-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <span>
                      First Name <span className="color-red">*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="firstname"
                      autoComplete="nope"
                      placeholder="Enter first name"
                      value={userModel.firstName}
                      onChange={(ev) =>
                        {
                        const value =ev.target.value;
                        // const re = /^[A-Za-z]+$/;
                        const re = /^[A-Za-z\s]+$/;

                        if (re.test(value) || value === '') {
                        setUserModel({
                          ...userModel,
                          firstName: ev.target.value,
                        })
                      }
                     }}
                />
                    {firstNameErrorMessage !== null &&
                      firstNameErrorMessage.length > 0 ? (
                      <span className="login-error-msg">
                        {firstNameErrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <span>
                      Last Name <span className="color-red">*</span>
                    </span>
                    <input
                      type="text"
                      name="lastName"
                      autoComplete="nope"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter last name"
                      value={userModel.lastName}
                      onChange={(ev) => {
                        const value =ev.target.value;
                        const re = /^[A-Za-z\s]+$/;
                        if (re.test(value) || value === '') {
                        setUserModel({
                          ...userModel,
                          lastName: ev.target.value,
                        })
                      }
                     }}
                />
                    {lastNameErrorMessage !== null &&
                      lastNameErrorMessage.length > 0 ? (
                      <span className="login-error-msg">
                        {lastNameErrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="row user-row last-row">
                <div className="col-md-6">
                  <div className="form-group">
                    <span>
                      Business Email <span className="color-red">*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      name="businessEmail"
                      autoComplete="nope"
                      aria-describedby="emailHelp"
                      placeholder="Enter business email"
                      value={userModel.userName}
                      onChange={(ev) => {
                        const value =ev.target.value;
                        const re = /^[A-Za-z\d\s{}()@#$%&*_+.,"-]+$/;
                        if (re.test(value) || value === '') {
                        setUserModel({
                          ...userModel,
                          userName: ev.target.value,
                        })
                      }
                     }}
                />
                    {userNameErrorMessage !== null &&
                      userNameErrorMessage.length > 0 ? (
                      <span className="login-error-msg">
                        {userNameErrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <span>
                      Role <span className="color-red">*</span>
                    </span>
                    <AutoComplete
                      forceSelection
                      field="name"
                      dropdown
                      aria-label="roles"
                      minLength={1}
                      dropdownAriaLabel="Select Role"
                      className="dropdown-acc"
                      placeholder="Select role"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredItems}
                      completeMethod={searchItems}
                      onChange={(e) => onRoleAddChange(e)}
                      value={roleAutoComplete}
                    />
                    {roleerrorMessage !== null &&
                      roleerrorMessage.length > 0 ? (
                      <span className="login-error-msg">
                        {roleerrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="payment-btn-dialog">
                <button
                  type="button"
                  onClick={handleCloseForAdd}
                  className="btn btn-cancel second-btn"
                >
                  Cancel
                </button>
                <Button
                  iconPos="left"
                  label={"Save"}
                  className="btn btn-continue second-btn"
                  loading={buttonLoading}
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </>
        )}

      </Dialog>
      {loading ? (
        <div className="spinner-class">
          <LoadinIcon />
        </div>
      ) : (
        <Dialog
          visible={displayBasicUpdate}
          onHide={() => onUpdateHideClick()}
          className="acc-screen contact-info user-dialog user-edit  edit-user-popup"
        >
          <button className="close-btn" onClick={onUpdateHideClick}>
            <img src={CloseIcon} />
          </button>

       
            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Legal First Name <span className="color-red">*</span>
                </span>
                <input
                  className="form-control "
                  type="text"
                  name="legalFirstName"
                  autoComplete="off"
                  placeholder="Enter legal first name"
                  value={personalDetailsModel.legalFirstName}
                  onChange={(e) =>
                    setPersonalDetailsModel({
                      ...personalDetailsModel,
                      legalFirstName: e.target.value,
                    })
                  }
                />
                {firstNameErrorMessage !== null &&
                  firstNameErrorMessage.length > 0 ? (
                  <span className="error-msg">{firstNameErrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">Legal Middle Name</span>

                <input
                  className="form-control "
                  type="text"
                  placeholder="Enter legal middle name"
                  name="legalMiddleName"
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

                {/* //   onChange={(e) => */}
                {/* //     setPersonalDetailsModel({ */}
                {/* //       ...personalDetailsModel,
                //       legalMiddleName: e.target.value, */}
                {/* //     })
                //   }
                // /> */}

                <span className="error-msg"></span>
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Legal Last Name <span className="color-red">*</span>
                </span>
                <input
                  className="form-control  "
                  type="text"
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

                {/* //   onChange={(e) => */}
                {/* //     setPersonalDetailsModel({ */}
                {/* //       ...personalDetailsModel,
                //       legalLastName: e.target.value,
                //     })
                //   }
                // /> */}
                {lastNameErrorMessage !== null &&
                  lastNameErrorMessage.length > 0 ? (
                  <span className="error-msg">{lastNameErrorMessage}</span>
                ) : null}
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 form-group ">
                <span className="input-label">Maternal Last Name</span>
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
                <span className="input-label">Paternal Last Name</span>
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
                </span>

                <PhoneInput
                  className="form-control Phone-input  PhoneInput--focus"
                  type="text"
                  autoComplete="nope"
                  rules={{ required: true }}
                  initialValueFormat="national"
                  addInternationalOption={false}
                  countryCallingCodeEditable={true}
                  international={false}

                  countries={filteredCountries}
                countryOptionsOrder={null} 
                  placeholder="Enter phone number"
                  defaultCountry="US"

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
                </span>
                {showCalendar ?
                  <Calendar
                    id="icon"
                    showIcon
                    placeholder="mm/dd/yyyy"
                    dateFormat="mm/dd/yy"
                    name="dateOfBirth"

                    value={dateofbirthvalue}
                    onChange={(e) => setDateofbirthvalue(e.target.value)}
                  />
                  :
                  <>
                    <div className="row">
                      <div className="col-md-4 form-group ">
                        <span className="input-label">
                          **/**/****
                        </span>
                      </div>

                      <div className="col-md-4 form-group calendar">
                        <button
                          type="button"
                          onClick={onEditClick}
                          className="btn btn-edit"
                        >


                          Edit
                        </button>
                      </div>
                    </div>
                  </>
                }

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
                </span>

                <input
                  className="form-control "
                  type="text"
                  placeholder="Enter address line1"
                  name="addressLine1"
                  autoComplete="nope"
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
                <span className="input-label">Building Number</span>
                <input
                  className="form-control "
                  type="text"
                  autoComplete="nope"
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
                <span className="input-label">Address Line 2</span>
                <input
                  className="form-control "
                  type="text"
                  autoComplete="nope"
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
                </span>
                <input
                  className="form-control "
                  type="text"
                  autoComplete="nope"
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
                </span>
                <input
                  className="form-control "
                  type="text"
                  placeholder="Enter province"
                  name="province"
                  autoComplete="nope"
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

                {/* //   onChange={(e) => */}
                {/* //     setPersonalDetailsModel({ */}
                {/* //       ...personalDetailsModel,
                //       province: e.target.value, */}
                {/* //     })
                //   }
                // /> */}
                {provinceerrorMessage !== null &&
                  provinceerrorMessage.length > 0 ? (
                  <span className="error-msg">{provinceerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group ">
                <span className="input-label">
                  Country <span className="color-red">*</span>
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
                </span>
                <input
                  className="form-control "
                  type="text"
                  placeholder="Enter postal code"
                  name="postalCode"
                  autoComplete="nope"
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
              <div className="col-md-4 form-group">
                <span>
                  Role <span className="color-red">*</span>
                </span>
                <AutoComplete
                  forceSelection
                  field="name"
                  dropdown
                  aria-label="roles"
                  minLength={1}
                  dropdownAriaLabel="Select Role"
                  className="dropdown-acc"
                  placeholder="Select role"
                  virtualScrollerOptions={{ itemSize: 38 }}
                  suggestions={filteredItems}
                  completeMethod={searchItems}
                  onChange={(e) => onRoleChange(e)}
                  value={roleAutoComplete}
                />
                {roleerrorMessage !== null && roleerrorMessage.length > 0 ? (
                  <span className="error-msg">{roleerrorMessage}</span>
                ) : null}
              </div>
              <div className="col-md-4 form-group">
                <span>
                  Select status <span className="color-red">*</span>
                </span>
                <AutoComplete
                  forceSelection
                  field="name"
                  dropdown
                  aria-label="status"
                  minLength={1}
                  dropdownAriaLabel="Select status"
                  className="dropdown-acc"
                  placeholder="Select status"
                  virtualScrollerOptions={{ itemSize: 38 }}
                  suggestions={statusfilteredItems}
                  completeMethod={searchStatusItems}
                  onChange={(e) => onStatusChange(e)}
                  value={statusAutoComplete}
                />
                {statuserrorMessage !== null &&
                  statuserrorMessage.length > 0 ? (
                  <span className="error-msg">{statuserrorMessage}</span>
                ) : null}
              </div>
            </div>

            <div className="payment-btn-dialog">
              <button
                type="button"
                className="btn btn-back second-btn"
                onClick={onUpdateHideClick}
              >
                Cancel
              </button>
              <Button
                iconPos="left"
                label={"Save"}
                className="btn btn-continue  second-btn"
                loading={updatebuttonLoading}
                onClick={
                  personalDetailsModel.id === 0 ? onAddClick : onUpdateClick
                }
              />
            </div>
      
        </Dialog>
      )}
      {displaydeletepopup ? (
        <div className="popup-body">
          <div className="register-popup Payment-screen">
            <div className="text-center ">
              <div className="awesome-text">
                {activeStatus ? (
                  <h4>
                    {" "}
                    <i className="pi pi-info-circle"></i> Are you sure you want
                    to inactive user?
                  </h4>
                ) : (
                  <h4>
                    {" "}
                    <i className="pi pi-info-circle"></i> Are you sure you want
                    to active user?
                  </h4>
                )}
              </div>
            </div>
            <div className="payment-screen-btn">
              <button className="btn btn-cancel second-btn " onClick={reject}>
                {" "}
                No
              </button>
              <button
                className="btn btn-continue second-btn yes-btn-popup"
                onClick={onDeleteClickUser}
              >
                {" "}
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserManagement;
