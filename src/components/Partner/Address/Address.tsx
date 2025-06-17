import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";import { useNavigate, useParams } from "react-router-dom";
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

interface IState {
  address: IAddress;
}

const Address: React.FC<any> = ({ onSaveAndContinueClick,onButtonChange,onBackButtonChange, onNextClick, setButtonLoadingSkip, buttonLoadingSkip }) => {
  const { partnerid, type } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false);

  const [postaladdresserrorMessage, setpostaladdressErrorMessage] = useState("");

  const [postaladdress2errorMessage, setpostaladdress2ErrorMessage] = useState("");

  const [physicalpostaladdresserrorMessage, setphysicalpostaladdressErrorMessage,] = useState("");
  const [saveClicked, setSaveClicked] = React.useState(false);
  const [registerpostaladdresserrorMessage, setregisterpostaladdressErrorMessage,] = useState("");
  const [physicalpostaladdress2errorMessage, setphysicalpostaladdress2ErrorMessage,] = useState("");

  const [postalcodeerrorMessage, setpostalcodeErrorMessage] = useState("");

  const [postalcode2errorMessage, setpostalcode2ErrorMessage] = useState("");

  const [provinceerrorMessage, setprovinceErrorMessage] = useState("");
  const [physicalprovinceerrorMessage, setphysicalprovinceErrorMessage] = useState("");

  const [townnameerrorMessage, settownnameErrorMessage] = useState("");
  const [townphysicalnameerrorMessage, settownphysicalnameErrorMessage] = useState("");

  const [countryerrorMessage, setcountryErrorMessage] = useState("");

  

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


  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
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
    onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
    onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
    onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
    onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
      onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
      onboardStatus : sessionStorage.getItem("onboardingStatus ")

    });
    setCountryAutoComplete("");
    setPhysicalCountryAutoComplete("");
  };
  const [loading, setLoading] = useState(true);

  const [, setError] = useState(false);
  useEffect(()=>{
    onBackButtonChange({updateBackBtnShow})
  },[updateBackBtnShow])

  const ErrorMessageEmptyModel = () => {
    setpostaladdressErrorMessage("");
    setpostalcodeErrorMessage("");
    setphysicalpostaladdressErrorMessage("");
    setprovinceErrorMessage("");
    setphysicalprovinceErrorMessage("");
    settownnameErrorMessage("");
    settownphysicalnameErrorMessage("");
    setbuildingErrorMessage("");
    setcountryErrorMessage("");
    setpostalcode2ErrorMessage("");
   
    
    setphysicalpostaladdress2ErrorMessage("");
    setphysicaltownnameErrorMessage("");
    setphysicalcountryErrorMessage("");
    setphysicalbuildingErrorMessage("");
    setpostaladdress2ErrorMessage("");
  };

  const isValidate = (values: any, values1: any) => {
    ErrorMessageEmptyModel();
    let formIsValid = true;
    if (saveClicked &&   CheckNull(values.postalAddressLine1)) {
      setpostaladdressErrorMessage("Please enter address line 1.");
      setUpdateBtnShow(true);
      setReadOnly(false);
       setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked &&   CheckNull(values.postalAddressLine1)) {
      setphysicalpostaladdressErrorMessage("Please enter address line 1.");
      setUpdateBtnShow(true);
      setReadOnly(false);
       setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }
   
    


    if (saveClicked &&  CheckNull(values.postalAddressLine2)) {
      
        setpostaladdress2ErrorMessage("Please enter valid address line 2.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      
    }

    if (saveClicked &&  CheckNull(values.postalAddressLine2)) {
     
      setphysicalpostaladdress2ErrorMessage("Please enter valid address line 2.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
      setReadOnly(false);
      formIsValid = false;
    
  }

    if (saveClicked &&  CheckNull(values.buildingNumber)) {
     
        setbuildingErrorMessage("Please enter valid building number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      
    }
    if (saveClicked &&  CheckNull(values.buildingNumber)) {
      setphysicalbuildingErrorMessage("Please enter valid building number.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
      setReadOnly(false);
      formIsValid = false;
    
  }

    if (saveClicked && CheckNull(values.postalCode)) {
      setpostalcodeErrorMessage("Please enter postal code.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values.postalCode)) {
      setpostalcode2ErrorMessage("Please enter postal code.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }



    if (saveClicked && CheckNull(values.province)) {
      setprovinceErrorMessage("Please enter province.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values.province)) {
      setphysicalprovinceErrorMessage("Please enter province.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }



    
    if (saveClicked &&  CheckNull(values.townName)) {
      settownnameErrorMessage("Please enter town.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
      setReadOnly(false);
      formIsValid = false;
    
  }

    if (saveClicked &&  CheckNull(values.townName)) {
      settownphysicalnameErrorMessage("Please enter town.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked &&  CheckNull(values1.townName)) {
      settownnameErrorMessage("Please enter town.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
      setReadOnly(false);
      formIsValid = false;
    
  }

    if (saveClicked &&  CheckNull(values1.townName)) {
      settownphysicalnameErrorMessage("Please enter town.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values.country)) {
      setcountryErrorMessage("Please select country.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values.country)) {
      setphysicalcountryErrorMessage("Please select country.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values1.postalAddressLine1)) {
      setphysicalpostaladdressErrorMessage("Please enter address line 1.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }


    if (saveClicked &&  CheckNull(values1.postalAddressLine2)) {
      if (values1.postalAddressLine2.length > 70) {
        setphysicalpostaladdress2ErrorMessage(
          "Please enter address line 2."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
    }


    if (saveClicked && CheckNull(values1.buildingNumber)) {
     
        setphysicalbuildingErrorMessage("Please enter valid building number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      
    }

    if (saveClicked && CheckNull(values1.postalCode)) {
      setpostalcode2ErrorMessage("Please enter postal code.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

    if (saveClicked && CheckNull(values1.postalCode)) {
      if (values.postalCode.trim().length === 0) {
        setpostalcode2ErrorMessage("Please enter postal code.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true)
        setReadOnly(false);
        formIsValid = false;
      }
      
      
      // if (!validpostalcode.test(values1.postalCode)) {
      //   setpostalcode2ErrorMessage("Please enter correct postal code.");
      //   setUpdateBtnShow(true);
      //   setReadOnly(false);
      //   setUpdateBackBtnShow(true)
      //   setReadOnly(false);
      //   formIsValid = false;
      // }
    }

    if (saveClicked && CheckNull(values1.province)) {
      setphysicalprovinceErrorMessage("Please enter province.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true)
        setReadOnly(false);
      formIsValid = false;
    }

   
      
      
      
    

    // if (saveClicked && CheckNull(values1.townName)) {
    //   setphysicaltownnameErrorMessage("Please enter town.");
    //   setUpdateBtnShow(true);
    //   setReadOnly(false);
    //   setUpdateBackBtnShow(true)
    //   setReadOnly(false);
    //   formIsValid = false;
    // }

   
    if (saveClicked && CheckNull(values1.country)) {
      setphysicalcountryErrorMessage("Please select country.");
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

        if (isValidate(registeredaddressData, physicaladdressData)) {
        if (
          countryList.find(
            (country) =>
              country.code ===
              data.filter((x: any) => x.addressType === false)[0].country
          ) !== undefined
        ) {
          setCountryAutoComplete(
            countryList.find(
              (country) =>
                country.code ===
                data.filter((x: any) => x.addressType === false)[0].country
            ).name
          );
        }
       
        if (
          countryList.find(
            (country) =>
              country.code ===
              data.filter((x: any) => x.addressType === true)[0].country
          ) !== undefined
        ) {
          setPhysicalCountryAutoComplete(
            countryList.find(
              (country) =>
                country.code ===
                data.filter((x: any) => x.addressType === true)[0].country
            ).name
          );
        }

        setBeforeChangeRegisteredaddressModel(
          data.filter((x: any) => x.addressType === false)[0]
        );
        setBeforeChangePhysicaladdressModel(
          data.filter((x: any) => x.addressType === true)[0]
        );
        setLoading(false);
        }
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
  const onAddClick = () => {
    setSaveClicked(true);
    ErrorMessageEmptyModel();
    setPhysicalAddressModel({ ...physicaladdressModel, addressType: true });

    setRegisteredAddressModel({
      ...registeredaddressModel,
      addressType: false,
    });

    setAddressesModel([registeredaddressModel, physicaladdressModel]);

    if (registeredaddressModel.id === 0 && physicaladdressModel.id === 0) {
      if (isValidate(registeredaddressModel, physicaladdressModel)) {
        setButtonLoading(true);

        AddressService.addAddress([
          registeredaddressModel,
          physicaladdressModel,
        ])
          .then((data: any) => {
            ErrorMessageEmptyModel();
            setButtonLoading(false);

            toast.current?.show({
              severity: "success",
              summary: "Address details saved successfully.",
              life: 3000,
            });
            sessionStorage.setItem("StepFlag", "2");
            onSaveAndContinueClick("N");
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
            ErrorMessageEmptyModel();
            setButtonLoading(false);
            setError(false);
          });
      } else {
        setButtonLoading(false);
      }
    } else if (registeredaddressModel.id > 0 || physicaladdressModel.id > 0) {
      if (isValidate(registeredaddressModel, physicaladdressModel)) {
        setButtonLoading(true);
        AddressService.updateAddress([
          registeredaddressModel,
          physicaladdressModel,
        ])
          .then((data) => {
            toast.current?.show({
              severity: "success",
              summary: "Address details updated successfully!",
              life: 3000,
            });
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
                summary: "Error while updating address details.",
                life: 3000,
              });

              ErrorMessageEmptyModel();
            }
            setButtonLoading(false);
            setError(false);
          });
      } else {
        setButtonLoading(false);
      }
    }
  };

  const onCheckClick = (e: any) => {
    setTimeout(() => {
      setChecked(!e.target.checked);
    }, 100);
  
    if (e.target.checked) {
      setReadOnly(true);
      setPhysicalAddressModel({
        ...registeredaddressModel,
        addressType: true,
      });
      setPhysicalCountryAutoComplete(countryAutoComplete);
    } else {
      setReadOnly(false);
      setPhysicalAddressModel({
        ...registeredaddressModel, 
        postalAddressLine1: "",
        postalAddressLine2: "",
        partnerId: 0,
        buildingNumber: "",
        postalCode: "",
        province: "",
        townName: "",
        country: null, 
        createdBy: 0,
        updatedBy: 0,
        deletedBy: 0,
        onboardStatus: "",
      });
      setPhysicalCountryAutoComplete("");
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
    if (!readonly && isValidate(registeredaddressModel, physicaladdressModel))
     {
    setBackButtonLoading(true)
    setTimeout(() => {
      onSaveAndContinueClick("B");
      setUpdateBackBtnShow(true);
      setReadOnly(false);
    }, 1000)
     
}
 else {
}

};

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      setUpdateBtnShow(true);
      setEditReadOnly(false);
    }, 1000);
  };

  useEffect(() => {
    setButtonLoadingSkip(false);
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
        onboardStatus : sessionStorage.getItem("onboardingStatus ")

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
        onboardStatus : sessionStorage.getItem("onboardingStatus ")

      });
      setLoading(false);
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

            <div className="row">
              <div className="col-md-6 info-section info-section-border">
                <div className="col-md-12 ">
                  <span className="text-blue-address">Registered Address</span>
                </div>
                <div className=" col-md-12 form-group ">
                  <span className="input-label">
                    Address Line 1 <span className="color-red">*</span>
                    <ToolTip props={addressToolTipdata[0]}></ToolTip>
                  </span>
                  <input
                  // disabled={editReadOnly}
                    // //disabled ={editReadOnly}
                    className="form-control "
                    type="text"
                    name="postalAddressLine1"
                    autoComplete="nope"
                    placeholder="Enter address line1"
                    value={registeredaddressModel.postalAddressLine1}
                     onChange={(ev) => {
                          const value =ev.target.value;
                          const re = /^[A-Za-z0-9\s\.'-]+$/i
                          if (re.test(value) || value === '') {
                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        postalAddressLine1: ev.target.value,
                      });
                    }

                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          postalAddressLine1: ev.target.value,
                          addressType: true,
                        });
                      }
                    }}
                  />

                  {saveClicked && postaladdresserrorMessage !== null &&
                    postaladdresserrorMessage.length > 0 && (
                      <span className="error-msg">
                        {postaladdresserrorMessage}
                      </span>
                    )}
                </div>
                <div className=" col-md-12 form-group ">
                  <span className="input-label">Address Line 2 </span>
                  <input

                    className="form-control "
                    type="text"
                    //disabled ={editReadOnly}
                    autoComplete="nope"
                    name="postalAddressLine2"
                    placeholder="Enter address line2"
                    value={registeredaddressModel.postalAddressLine2}
                    onChange={(ev) => {

                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9\s\.'-]+$/i
                      if (re.test(value) || value === '') {

                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        postalAddressLine2: ev.target.value,
                      });
                    }
                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          postalAddressLine2: ev.target.value,
                          addressType: true,
                        });
                      }

                    }}
                  />

                  {saveClicked &&  postaladdress2errorMessage !== null &&
                    postaladdress2errorMessage.length > 0 && (
                      <span className="error-msg">
                        {postaladdress2errorMessage}
                      </span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Building Number/Street Name/Landmark{" "}
                    <ToolTip props={addressToolTipdata[2]}></ToolTip>
                  </span>
                  <input

                    className="form-control"
                    type="text"
                    //disabled ={editReadOnly}
                    autoComplete="nope"
                    name="buildingNumber"
                    placeholder="Enter building number/street name/landmark"
                    value={registeredaddressModel.buildingNumber}
                    onChange={(ev) => {

                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9.\s\(\)/-]+$/;

                      if (re.test(value) || value === '') {
                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        buildingNumber: ev.target.value,
                      });
                    }
                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          buildingNumber: ev.target.value,
                          addressType: true,
                        });
                      }
                    }}
                  />
                  {saveClicked &&  buildingErrorMessage !== null &&
                    buildingErrorMessage.length > 0 && (
                      <span className="error-msg">{buildingErrorMessage}</span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Town <span className="color-red">*</span>{" "}
                    <ToolTip props={addressToolTipdata[3]}></ToolTip>
                  </span>
                  <input

                    className="form-control"
                    type="text"
                    //disabled ={editReadOnly}
                    autoComplete="nope"
                    name="town"
                    placeholder="Enter town"
                    value={registeredaddressModel.townName}
                    onChange={(ev) => {
                      const value =ev.target.value;
                      const re = /^[A-Za-z\s]+$/;
                      if (re.test(value) || value === '') {

                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        townName: ev.target.value,
                      });
                    }

                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          townName: ev.target.value,
                          addressType: true,
                        });
                      }
                    }}
                  />
                  {saveClicked &&  townnameerrorMessage !== null &&
                    townnameerrorMessage.length > 0 && (
                      <span className="error-msg">{townnameerrorMessage}</span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Province <span className="color-red">*</span>{" "}
                    <ToolTip props={addressToolTipdata[5]}></ToolTip>
                  </span>
                  <input

                    className="form-control"
                    type="text"
                    //disabled ={editReadOnly}
                    name="province"
                    autoComplete="nope"
                    placeholder="Enter province"
                    value={registeredaddressModel.province}
                    onChange={(ev) => {
                      const value =ev.target.value;
                      const re = /^[A-Za-z\s]+$/;
                      if (re.test(value) || value === '') {
                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        province: ev.target.value,
                      });
                    }
                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          province: ev.target.value,
                          addressType: true,
                        });
                      }
                    }}
                  />
                  {saveClicked &&  provinceerrorMessage !== null &&
                    provinceerrorMessage.length > 0 && (
                      <span className="error-msg">{provinceerrorMessage}</span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Country <span className="color-red">*</span>
                  </span>

                  <AutoComplete

                    field="name"
                    dropdown
                    forceSelection
                    //disabled ={editReadOnly}
                    aria-label="Countries"
                    autoComplete="off"
                    dropdownAriaLabel="Select Country"
                    className="dropdown-acc"
                    placeholder="Select country"
                    suggestions={filteredcountrieslist}
                    completeMethod={searchCountry}
                    onChange={(e) =>
                       onCountryChange(e)}
                    value={countryAutoComplete}
                  />
                  {saveClicked &&  countryerrorMessage !== null &&
                    countryerrorMessage.length > 0 && (
                      <span className="error-msg">{countryerrorMessage}</span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Postal Code <span className="color-red">*</span>{" "}
                  </span>
                  <input

                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="postalCode"
                    //disabled ={editReadOnly}
                    placeholder="Enter postal code"
                    value={registeredaddressModel.postalCode}
                    onChange={(ev) => {
                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9\s]*$/ ;
                          if (re.test(value) || value === '') {
                      setRegisteredAddressModel({
                        ...registeredaddressModel,
                        postalCode: ev.target.value,
                      });
                    }

                      if (checked) {
                        setPhysicalAddressModel({
                          ...physicaladdressModel,
                          postalCode: ev.target.value,
                          addressType: true,
                        });
                      }
                    }}
                  />
                  {saveClicked &&  postalcodeerrorMessage !== null &&
                    postalcodeerrorMessage.length > 0 && (
                      <span className="error-msg">
                        {postalcodeerrorMessage}
                      </span>
                    )}
                </div>
              </div>
              <div className="col-md-6 info-section-second">
                <div className="col-md-12 physical-address-text ">
                  <span className="text-blue-address ">Physical Address</span>
                  <div className="register-address">
                    <input

                      type="checkbox"
                      className="form-check-input"
                      id="exampleCheck1"
                      //disabled ={editReadOnly}
                      checked={checked}
                      onChange={onCheckClick}
                    />
                    <span className="form-check-label">
                      Same as registered address    
                    </span>
                  </div>
                </div>

                <div className=" col-md-12 form-group ">
                  <span className="input-label">
                    Address Line 1 <span className="color-red">*</span>{" "}
                    <ToolTip props={addressToolTipdata[0]}></ToolTip>
                  </span>
                  <input
                    ////                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="physicalAddressLine1"
                    placeholder="Enter address line1"
                    value={physicaladdressModel.postalAddressLine1}
                    onChange={(ev) =>{
                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9\s\.'-]+$/i
                          if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        postalAddressLine1: ev.target.value,
                      })
                    }
                   }}
              />
              
                  {saveClicked &&  physicalpostaladdresserrorMessage !== null &&
                    physicalpostaladdresserrorMessage.length > 0 && (
                      <span className="error-msg">
                        {physicalpostaladdresserrorMessage}
                      </span>
                    )}
                </div>
                <div className=" col-md-12 form-group ">
                  <span className="input-label">Address Line 2 </span>
                  <input
                    //                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="physicalAddressLine2"
                    placeholder="Enter address line2"
                    value={physicaladdressModel.postalAddressLine2}
                    onChange={(ev) =>{
                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9\s\.'-]+$/i
                      if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        postalAddressLine2: ev.target.value,
                      })
                    }
                   }}
              />
                  {saveClicked && physicalpostaladdress2errorMessage !== null &&
                    physicalpostaladdress2errorMessage.length > 0 && (
                      <span className="error-msg">
                        {physicalpostaladdress2errorMessage}
                      </span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Building Number/Street Name/Landmark{" "}
                    <ToolTip props={addressToolTipdata[2]}></ToolTip>
                  </span>
                  <input
                   //                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    name="physicalBuildingNumber"
                    autoComplete="nope"
                    placeholder="Enter building number/street name/landmark"
                    value={physicaladdressModel.buildingNumber}
                    onChange={(ev) => {
                        const value =ev.target.value;
                        const re = /^[A-Za-z0-9.\s\(\)/-]+$/;
                        if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        buildingNumber: ev.target.value,
                      })
                    }
                   }}
              />
                  {saveClicked &&  physicalbuildingErrorMessage !== null &&
                    physicalbuildingErrorMessage.length > 0 && (
                      <span className="error-msg">{physicalbuildingErrorMessage}</span>
                    )}
                </div>
                <div className="col-md-12 form-group  ">
                  <span className="input-label">
                    Town <span className="color-red">*</span>{" "}
                    <ToolTip props={addressToolTipdata[3]}></ToolTip>
                  </span>
                  <input
                   //                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="physicalTown"
                    placeholder="Enter town"
                    value={physicaladdressModel.townName}
                    onChange={(ev) =>
                      {
                        const value =ev.target.value;
                      const re = /^[A-Za-z\s]+$/;
                      if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        townName: ev.target.value,
                      })
                    }
                   }}
              />
                  {saveClicked &&  townphysicalnameerrorMessage !== null &&
                    townphysicalnameerrorMessage.length > 0 && (
                      <span className="error-msg">
                        {townphysicalnameerrorMessage}
                      </span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span className="input-label">
                    Province <span className="color-red">*</span>{" "}
                    <ToolTip props={addressToolTipdata[5]}></ToolTip>
                  </span>
                  <input
                    //                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="physicalProvince"
                    placeholder="Enter province"
                    value={physicaladdressModel.province}
                    onChange={(ev) =>{
                      const value =ev.target.value;
                          const re = /^[A-Za-z\s]+$/;
                          if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        province: ev.target.value,
                      })
                    }
                  }}
                  />
                  {saveClicked &&  physicalprovinceerrorMessage !== null &&
                    physicalprovinceerrorMessage.length > 0 && (
                      <span className="error-msg">
                        {physicalprovinceerrorMessage}
                      </span>
                    )}
                </div>
                <div className=" col-md-12 form-group ">
                  <span>
                    Country <span className="color-red">*</span>
                  </span>
                  <AutoComplete
                    // disabled={readonly || editReadOnly}
                    field="name"
                    dropdown
                    forceSelection
                    aria-label="Countries"
                    autoComplete="off"
                    dropdownAriaLabel="Select Country"
                    className="dropdown-acc"
                    placeholder="Select country"
                    suggestions={filteredcountrieslist}
                    completeMethod={searchCountry}
                    onChange={(e) => 
                      
                      onPhysicalCountryChange(e)}
                    value={physicalcountryAutoComplete}
                  />

                  {saveClicked &&  physicalcountryerrorMessage !== null &&
                    physicalcountryerrorMessage.length > 0 && (
                      <span className="error-msg">
                        {physicalcountryerrorMessage}
                      </span>
                    )}
                </div>
                <div className="col-md-12 form-group ">
                  <span>
                    Postal Code <span className="color-red">*</span>
                  </span>
                  <input
                    //                    // readOnly={readonly || editReadOnly}
                    className="form-control"
                    type="text"
                    autoComplete="nope"
                    name="physicalPostalCode"
                    placeholder="Enter postal code"
                    value={physicaladdressModel.postalCode}
                    onChange={(ev) =>{
                      const value =ev.target.value;
                      const re = /^[A-Za-z0-9\s]*$/ ;
                          if (re.test(value) || value === '') {
                      setPhysicalAddressModel({
                        ...physicaladdressModel,
                        postalCode: ev.target.value,
                      })
                    }
                   }}
              />
                  {saveClicked &&  postalcode2errorMessage !== null &&
                    postalcode2errorMessage.length > 0 && (
                      <span className="error-msg">
                        {postalcode2errorMessage}
                      </span>
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
                      onClick={onAddClick}
                    />
                  ) : (
                    <Button
                      iconPos="left"
                      label="Next"
                      loading={buttonLoadingSkip}
                      onClick={onNextClick}
                      className="btn btn-continue btn-next second-btn"
                    />
                  )}
                </>
              </div>
            </div>
          </div>
        </Scrollbars>
      {/* )} */}
    </>
  );
};

export default Address;
