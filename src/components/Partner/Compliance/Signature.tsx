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
import PersonalDetails from "../PersonalDetails/PersonalDetails";
import ComplianceServices from "../../../services/complaince/ComplianceServices";


interface IState {
    address: IAddress;
}

const Signature: React.FC<any> = ({onNextClick,openPage6, setOpenPage6}) => {
    const { partnerid, type } = useParams();
    // const [buttonLoading, setButtonLoading] = useState(false);
    const id = sessionStorage.getItem("PartnerId");
    const [partnerId, setpartnerId] = React.useState(id);
        const [postaladdresserrorMessage, setpostaladdressErrorMessage] = useState("");

    const [postaladdress2errorMessage, setpostaladdress2ErrorMessage] = useState("");

    const [physicalpostaladdresserrorMessage, setphysicalpostaladdressErrorMessage,] = useState("");
    const [activeTab, setActiveTab] = useState("defaultTab");

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
    const [openPage7, setOpenPage1] = useState(true);
    const [openPage8, setOpenPage2] = useState(true);


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
    const { partnerId1, type1 } = useParams();

    
    const [complianceModel, setComplianceModel] = useState({


        "id": 0,
        "partnerId": Number(partnerid),
        "questionId47": "",
        "value47": "",
         "Pagenumber":"6"
    })
  
    // 
    // const onAddClick = () => {
    //     // ErrorMessageEmptyModel();
    //     // setButtonLoading(true);
    //     ComplianceServices.addComplinceDetails(complianceModel).then((data: any) => {
    //       // ErrorMessageEmptyModel();
    //     //   setButtonLoading(false);
    //       toast.current?.show({
    //         severity: "success",
    //         summary: "Address details saved successfully.",
    //         life: 3000,
    //       });
    //       sessionStorage.setItem("StepFlag", "2");
    //     //   onSaveAndContinueClick("N");
    //     })
    //       .catch((error: any) => {
    //         if (error.response.status === 500) {
    //           toast.current?.show({
    //             severity: "error",
    //             summary: "Something went wrong",
    //             life: 3000,
    //           });
    //         } else if (error.response.status === 401) {
    //           toast.current?.show({
    //             severity: "error",
    //             summary: "Unauthorized",
    //             life: 3000,
    //           });
    //           Logout(navigate);
    //         } else if (error.response.status === 400) {
    //           toast.current?.show({
    //             severity: "error",
    //             summary: error.response.data[0].errorMessage,
    //             life: 3000,
    //           });
    //         } else {
    //           toast.current?.show({
    //             severity: "error",
    //             summary: "Error while saving address details.",
    //             life: 3000,
    //           });
    //         }
    //         // ErrorMessageEmptyModel();
    //         // setButtonLoading(false);
    //         setError(false);
    //       });
    
    //   };
  
    
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

    const isValidate = (values: any, values1: any) => {
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

        if (CheckNull(values1.postalAddressLine1)) {
            setphysicalpostaladdressErrorMessage("Please enter address line 1.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values1.postalAddressLine1)) {
            if (values1.postalAddressLine1.trim().length === 0) {
                setphysicalpostaladdressErrorMessage("Please enter address line 1.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (values1.postalAddressLine1.length > 70) {
                setphysicalpostaladdressErrorMessage(
                    "Please enter valid address line 1."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (!CheckNull(values1.postalAddressLine2)) {
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


        if (!CheckNull(values1.buildingNumber)) {
            if (values1.buildingNumber.length > 16) {
                setphysicalbuildingErrorMessage(
                    "Please enter valid building number."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values1.postalCode)) {
            setpostalcode2ErrorMessage("Please enter postal code.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values1.postalCode)) {
            if (values.postalCode.trim().length === 0) {
                setpostalcode2ErrorMessage("Please enter postal code.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (values1.postalCode.length > 16) {
                setpostalcode2ErrorMessage(
                    "Please enter valid postal code."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (!validpostalcode.test(values1.postalCode)) {
                setpostalcode2ErrorMessage("Please enter correct postal code.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
        }

        if (CheckNull(values1.province)) {
            setphysicalprovinceErrorMessage("Please enter province.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values1.province)) {
            if (values.province.trim().length === 0) {
                setphysicalprovinceErrorMessage("Please enter province.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (values1.province.length > 50) {
                setphysicalprovinceErrorMessage(
                    "Please enter valid province."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            // if (!validAlphabetNumber.test(values.province)) {
            //   setphysicalprovinceErrorMessage(
            //     "Province accepts only alphabet and numbers"
            //   );
            //   physicalformIsValid = false;
            // }
        }

        if (CheckNull(values1.townName)) {
            setphysicaltownnameErrorMessage("Please enter town.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true)
            setReadOnly(false);
            formIsValid = false;
        }

        if (!CheckNull(values1.townName)) {
            if (values.townName.trim().length === 0) {
                setphysicaltownnameErrorMessage("Please enter town.");
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            if (values1.townName.length > 50) {
                setphysicaltownnameErrorMessage(
                    "Please enter valid town."
                );
                setUpdateBtnShow(true);
                setReadOnly(false);
                setUpdateBackBtnShow(true)
                setReadOnly(false);
                formIsValid = false;
            }
            // if (!validAlphabetNumber.test(values.townName)) {
            //   setphysicaltownnameErrorMessage(
            //     "Town name accepts only alphabet and numbers"
            //   );
            //   physicalformIsValid = false;
            // }
        }

        if (CheckNull(values1.country)) {
            setphysicalcountryErrorMessage("Please select country.");
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

   
    const onBackClick = () => {

        // setBackButtonLoading(true)
        setTimeout(() => {
        //   onSaveAndContinueClick("B");
          setUpdateBackBtnShow(true);
          setReadOnly(false);
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
   

   
      return (
        <>
{openPage6 ?
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
                            <span className="text-blue-address">SIGNATURE

                            </span>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-10 info-section">
                        <div className="col-md-12 form-group">
                            <span className="input-label">
                                Wolfsberg Group Financial Crime Compliance Questionnaire


                                {/* <span className="color-red">*</span> */}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row">


                    <div className="col-md-12 info-section " style={{marginLeft:"10px"}}>
                        <div className="col-md-12 form-group " >
                            <input
                                className="status-check"
                                name="Receive"
                                style={{width:"400px", height:"25px"}}

                            />

                            
                           
                            <span className="form-check-label" style={{marginLeft:"10px"}}>
                                    (Financial Institution Name)

                                </span>

                        </div>
                    </div>


                   
                </div>

                <div className="row">
                   

                    <div className="col-md-12 info-section ">
                        <div className="col-md-12 form-group " >
                        <span className="form-check-label" style={{marginRight:"55px" , marginLeft:"20px"}}>
                        I,
                    
                            <input
                                className="status-check"
                                name="Receive"
                                style={{width:"400px", height:"25px", marginLeft:"10px"}}
                            />
                             <span className="form-check-label" style={{marginLeft:"10px"}}>
                                    (Senior Compliance Manager- Second Line representative)

                                </span>
                            </span>
                        </div>
                    </div>


                    {/* <div className="col-md-4 info-section ">
                        <div className="col-md-12 form-group " >
                            <div className="register-address" style={{ color: 'black' }}
                            >

                                <span className="form-check-label">
                                    (Senior Compliance Manager- Second Line representative)

                                </span>

                            </div>
                        </div>
                    </div> */}
                </div>

                <div className="row">
                    <div className="col-md-10 info-section">
                        <div className="col-md-12 form-group">
                            <span className="input-label">
                                certify that I have read and understood this declaration, that the answers provided in this Wolfsberg FCCQ are
                                complete and correct to my honest belief


                                {/* <span className="color-red">*</span> */}
                            </span>
                        </div>
                    </div>
                </div>


                <div className="row">
                    <div className="col-md-4 info-section">
                        <div className="col-md-12 form-group">
                            <span className="input-label">
                                Signature*

                                <span className="color-red">*</span>
                            </span>
                        </div>
                    </div>
                    <div className="col-md-4 info-section "   style={{marginLeft:"-250px", width:"400px", height:"20px"}}
                    
                    >
                        <div className="col-md-6 switch-style" >
                            <input
                                className="status-check"
                                name="Receive1"
                                style={{width:"200px", height:"25px"}}          

                            />
                        </div>
                    </div>
                    <div className="col-md-4 info-section ">
                        <div className="col-md-12 switch-style" style={{ marginLeft: "-150px", width: "25" }}>
                            <input
                                className="status-check"
                                name="Receive"
                                style={{width:"200px", height:"25px"}}


                            />
                        </div>
                    </div>





                    <div className="col-md-4 info-section " style={{ marginLeft: "-280px"}}>
                        <div className="col-md-12 form-group " >
                            <div className="register-address">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="exampleCheck1"
                                    style={{ height: "16px", width: "20px" }}

                                    //   disabled ={editReadOnly}
                                    checked={checked}
                                    // onChange={onCheckClick}
                                />
                                <span className="form-check-label">
                                    By checking this box, I acknowledge that I am digitally
                                    signing this form                                                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="row" style={{marginTop:"-20px"}}>
                    <div className="col-md-4 info-section">
                        <div className="col-md-12 form-group">
                            <span className="input-label">
                                Date
                                <span className="color-red">*</span>
                            </span>
                        </div>
                    </div>


                    <div className="col-md-4 info-section ">
                        <div className="col-md-12 switch-style" style={{ marginLeft: "-250px", width: "25" }}>
                            <input
                                className="status-check"
                                name="Receive"
                                style={{width:"200px", height:"25px"}}


                            />
                        </div>
                    </div>

                </div>
{/* 
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
                            ) :
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
                                    label="Save and Next"
                                    //   loading={buttonLoadingSkip}
                                      onClick={onNextClick}
                                    className="btn btn-continue btn-next second-btn"
                                />
                            )}
                        </>
                    </div>
                </div> */}

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
                  ):
                  <Button
                      type="button"
                      label="Back"
                    //   loading={backButtonLoading}
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
            </Scrollbars>
      {/* )} */}
    </>: openPage8 ?
    <>
     <PersonalDetails />
 

    </>:''}
     
    </>
  );
};

export default Signature;
