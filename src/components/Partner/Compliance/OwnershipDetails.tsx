import React from "react";

import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAddress } from "../../../models/IAddress";
import { AddressService } from "../../../services/Partner/Address/AddressService";
// import OwnershipDetailsService from "./OwnershipDetailsService";
import OwnershipDetailsService from "../../../services/complaince/ComplianceServices";
import ComplianceServices from "../../../services/complaince/ComplianceServices";

import ToolTip from "../ToolTipsData/ToolTip";
import {
  validpostalcode,
  countryList,
  // countryList1,
} from "../../../utils/utils";
import { Toast } from "primereact/toast";
import { AutoComplete } from "primereact/autocomplete";
import { ProgressSpinner } from "primereact/progressspinner";
import AddressoolTipData from "../../../services/Partner/Address/AddressToolTips";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import { InputSwitch } from "primereact/inputswitch";
import SanctionsProgram from "./SanctionsProgram";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
// import OwnershipDetailsService from "./OwnershipDetails";

interface IState {
  address: IAddress;
}

// const [legalName, SetlegalName] = useState<any[]>([]);

const OwnershipDetails: React.FC<any> = ({
  onSaveAndContinueClick,
  onButtonChange,
  onBackButtonChange,
  setButtonLoadingSkip,
  buttonLoadingSkip,
}) => {
  const [dirtyfield, setDirtyField] = useState(false);
  const [partnerTypesMultiSelectList, setPartnerTypesMultiSelectList] =
    useState<any[]>([]);
  // const id = localStorage.getItem("PartnerId");
  // const [partnerId, setpartnerId] = React.useState(id);
  const { partnerid, type } = useParams();
  const [subsidiaryNames, setSubsidiaryNames] = useState([
    { id: 1, value: "" },
  ]);

  const [showSaveButton, setShowSaveButton] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  // const [partnerid, setpartnerId] = React.useState(id);
  const [continuebuttonloading, setContinueButtonLoading] = useState(false);

  const [complianceComponent, setComplianceComponent] = useState({
    id: 0,
    partnerId: Number(partnerid),
    questionId: "",
    value: "",
    pagenumber: "1",
  });
  const [partnertypeserrormessage, setPartnerTypesErrorMessage] = useState("");

  const [complianceModel, setComplianceModel] = useState({
    id: 0,
    partnerId: Number(partnerid),
    QuestionId1: "",
    Value1: "",
    QuestionId1_1: "",
    Value1_1: " ",
    QuestionId1_2: "",
    Value1_2: "",
    QuestionId2: "",
    Value2: "",
    QuestionId3: "",
    value3: "",
    QuestionId2_1: "",
    Value2_1: "",
    QuestionId2_2: "",
    Value2_2: "",
    QuestionId2_3: "",
    Value2_3: "",
    QuestionId2_4: "",
    Value2_4: "",
    QuestionId2_5: "",
    Value2_5: "",
    QuestionId2_6: "",
    Value2_6: "",
    QuestionId2_7: "",
    Value2_7: "",
    QuestionId3_1: "",
    Value3_1: "",
    QuestionId3_2: "",
    Value3_2: "",
    QuestionId3_3: "",
    Value3_3: "",
    QuestionId3_4: "",
    Value3_4: "",
    QuestionId3_5: "",
    value3_5: "",
    QuestionId3_6: "",
    Value3_6: "",
    QuestionId3_7: "",
    Value3_7: "",
    QuestionId4: "",
    Value4: "",
    questionId5: "",
    value5: "",
    QuestionId5_1_1: "",
    Value5_1_1: "",
    QuestionId5_1_2: "",
    Value5_1_2: "",
    QuestionId6: "",
    Value6: "",
    QuestionId6_1: "",
    Value6_1: "",
    QuestionId9: "",
    Value9: "",
    QuestionId10: "",
    Value10: "",
    QuestionId11_1: "",
    Value11_1: "",
    QuestionId11_2: "",
    Value11_2: "",
    QuestionId13: "",
    Value13: "",
    QuestionId7: "",
    Value7: "",

    // onboardStatus: localStorage.getItem("onboardingStatus ")
    // createdBy: " ",
    // roleId: "null"
  });
  const countryList12 = ["Afghanistan", "Albania"];

  const [compliancePolicies, setCompliancePolicies] = useState([
    {
      id: 0,
      deliveryType: "AML",
      checkedoption: false,
    },
    {
      id: 1,
      deliveryType: "CTF",
      checkedoption: false,
    },
    {
      id: 2,
      deliveryType: "KYC",
      checkedoption: false,
    },
    {
      id: 3,
      deliveryType: "ABC",
      checkedoption: false,
    },
  ]);

  const [complianceOrganization, setComplianceOrganization] = useState([
    {
      id: 0,
      deliveryType: "RiskAssessmentPolicy",
      checkedoption: false,
    },
    {
      id: 1,
      deliveryType: "RiskManagementPolicy",
      checkedoption: false,
    },
    {
      id: 2,
      deliveryType: "PrivacyPolicy",
      checkedoption: false,
    },

    {
      id: 3,
      deliveryType: "ConsumerComplaintsPolicy",
      checkedoption: false,
    },
  ]);

  //old code

  const [buttonLoading, setButtonLoading] = useState(false);
  // const [buildingErrorMessage, setbuildingErrorMessage] = useState("");
  const [backButtonLoading, setBackButtonLoading] = useState(false);
  const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);
  const [readonly, setReadOnly] = useState(false);
  const [openPage1, setOpenPage1] = useState(true);
  const [openPage2, setOpenPage2] = useState(true);
  const [openPage3, setOpenPage3] = useState(true);

  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [checked, setChecked] = useState(false);
  const [checkedoptionpolicies, setcheckedoptionpolicies] = useState(false);
  const [checkedRegiseter, setCheckedRegiseter] = useState(false);
  const [filteredcountrieslist, setFilteredCountryList] = useState<any[]>([]);
  const [countryAutoComplete, setCountryAutoComplete] = useState("");
  const [editReadOnly, setEditReadOnly] = useState(false);
  const onboardStatus = localStorage.getItem("onboardStatus");
  const [addressToolTipdata] = useState<any>(AddressoolTipData);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  // const [loading, setLoading] = useState(true);

  const [, setError] = useState(false);
  useEffect(() => {
    onBackButtonChange({ updateBackBtnShow });
  }, [updateBackBtnShow]);

  useEffect(() => {
    onButtonChange({ updateBtnShow });
  }, [updateBtnShow]);

  const ErrorMessageEmptyModel = () => {
    // setlegalnameErrorMessage("");
  };
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null || value === 0) {
      return true;
    }
    return false;
  };

  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();
    if (CheckNull(values.value) || values.value.length <= 2) {
      setPartnerTypesErrorMessage("Please enter valid name");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    // if (CheckNull(values.legalName)) {
    //   // setlegalnameErrorMessage("Please enter legal name.");
    //   // setUpdateBtnShow(true);
    //   // setReadOnly(false);
    //   formIsValid = false;
    // }

    return formIsValid;
  };

  useEffect(() => {
    // const pagenumber = "1";

    // console.log("pagenumber?", pagenumber )

    ComplianceServices.GetComplianceall1(
      complianceModel.partnerId,
      // partnerId,
      complianceComponent.pagenumber
    )
      .then((data: any) => {
        //console.log("dataSet", data.data);

        setComplianceModel(data.data);
        if (data.data.length !== 0) {
          const resultArray = [];
          data.data.forEach((item: any) => {
            resultArray.push(item);
          });

          setComplianceModel(data.data);
          setComplianceComponent(data.data);

          //console.log("dataSet on getcomplience", data.data);
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
  }, []);

  useEffect(() => {}, []);

  const onComplainceOk = () => {
    // latestsendfeeNewModel.map((model: any, index: any) => {
    //   model.sendFixedFees = null;
    //   model.sendVariableFees = null;
    // });

    onComplaince();
    
    // getPartnerSendFees();
   
  };




  const onComplaince = () => {
    // useEffect(() => {
    // const timer = setTimeout(() => {

    // if (isValidate(complianceComponent)) {
      ComplianceServices.addComplince(complianceComponent)
        .then((data: any) => {
          //console.log("data>??", data);

          // if (data.data.length !== 0) {
          if (data.status === 200) {
            //console.log("data>??", data);
            setComplianceComponent(data.data);
            setShowSaveButton(false);
            setIsEditMode(false);
            // setOpenPage1(false);
            // setOpenPage2(true);
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
    // }
    //1000);
  };

  // }, [complianceComponent, isValidate]);

  const onCheckClick = (e: any) => {
    const isChecked = e.target.checked;

    setChecked(isChecked);
    setReadOnly(isChecked);

    setComplianceModel({
      ...complianceModel,
      QuestionId1_1: isChecked ? "true" : "false",
    });

    setComplianceComponent({
      ...complianceComponent,
      questionId: isChecked ? "true" : "false",
    });

    onComplaince();
  };

  const onCheckClickpolicies = (event: any) => {
    const { name, checked } = event.target;
    const updatedPolicies = [...compliancePolicies];
    onComplaince();

    {
      /* if(updatedPolicies.checkedoption=== "true") then  
 
  checkedoption == true */
    }

    const updatedPolicy = updatedPolicies.find(
      (policy) => policy.deliveryType === name
    );
    if (updatedPolicy) {
      updatedPolicy.checkedoption = checked;
    }

    //console.log("updatedPolicies", updatedPolicies);

    onComplaince();

    setComplianceModel((prevModel) => ({
      ...prevModel,
      compliancePolicies: updatedPolicies,
      QuestionId9: getSelectedValues(updatedPolicies),
    }));

    setComplianceComponent((prevModel) => ({
      ...prevModel,
      compliancePolicies: updatedPolicies,
      questionId: "9",
      value: getSelectedValues(updatedPolicies),
    }));
    onComplaince();

    setCompliancePolicies((prevPolicies) =>
      prevPolicies.map((policy) =>
        policy.deliveryType === name
          ? { ...policy, checkedoption: checked }
          : policy
      )
    );

    //console.log("compliancePolicies", compliancePolicies);
    onComplaince();
  };

  const getSelectedValues = (policies: any) => {
    return policies
      .filter((policy: any) => policy.checkedoption)
      .map((policy: any) => policy.deliveryType)
      .join("/");
  };
  const onCheckClickorganization = (event: any) => {
    const { name, checked } = event.target;
    const updatedOrganization = [...complianceOrganization];

    const updatedPolicyorganization = updatedOrganization.find(
      (policy) => policy.deliveryType === name
    );
    if (updatedPolicyorganization) {
      updatedPolicyorganization.checkedoption = checked;
    }

    // if(updatedPolicyorganization.deliveryType   === "PrivacyPolicy")

    localStorage.setItem(
      "complianceOrganization",
      JSON.stringify(updatedOrganization)
    );

    //console.log("updatedPolicyorganization", updatedPolicyorganization);
    // setComplianceModel((prevModel) => ({
    setComplianceComponent((prevModel) => ({
      ...prevModel,
      complianceOrganization: updatedOrganization,
      questionId: "10",
      value: getSelectedValuesganization(updatedOrganization),
    }));

    onComplaince();
  };

  const getSelectedValuesganization = (
    policies: { deliveryType: string; checkedoption: boolean }[]
  ) => {
    return policies
      .filter((policy) => policy.checkedoption)
      .map((policy) => policy.deliveryType)
      .join("/");
  };

  const onRegisterCheckClick = (e: any) => {
    const ischeckedRegiseter = e.target.checked;

    setCheckedRegiseter(ischeckedRegiseter);
    setReadOnly(ischeckedRegiseter);

    setComplianceModel({
      ...complianceModel,
      QuestionId3: ischeckedRegiseter ? "true" : "false",
      QuestionId3_1: ischeckedRegiseter ? "3.1" : "",
      Value3_1: ischeckedRegiseter ? complianceModel.Value2_1 : "",

      QuestionId3_2: ischeckedRegiseter ? "3.2" : "",
      Value3_2: ischeckedRegiseter ? complianceModel.Value2_2 : "",

      QuestionId3_3: ischeckedRegiseter ? "3.3" : "",
      Value3_3: ischeckedRegiseter ? complianceModel.Value2_3 : "",

      QuestionId3_4: ischeckedRegiseter ? "3.4" : "",
      Value3_4: ischeckedRegiseter ? complianceModel.Value2_4 : "",

      QuestionId3_5: ischeckedRegiseter ? "3.5" : "",
      value3_5: ischeckedRegiseter ? complianceModel.Value2_5 : "",

      QuestionId3_7: ischeckedRegiseter ? "3.7" : "",
      Value3_7: ischeckedRegiseter ? complianceModel.Value2_7 : "",
      QuestionId3_6: ischeckedRegiseter ? "3.6" : "",
      Value3_6: ischeckedRegiseter ? complianceModel.Value2_6 : "",
    });
  };
  const searchCountry = (event: any) => {
    let query = event.query.toLowerCase();
    let _filteredItems = countryList12.filter((country) =>
      country.toLowerCase().startsWith(query)
    );
    setFilteredCountryList(_filteredItems);
  };

  const onBackClick = () => {
    setBackButtonLoading(true);
    setTimeout(() => {
      onSaveAndContinueClick("B");
      setUpdateBackBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };

  const EditDetails = () => {
    // setLoading(true);
    // setTimeout(() => {
      setIsEditMode(true);

      // setLoading(false);
      // setUpdateBtnShow(true);
      setEditReadOnly(false);


    // }, 1000);
  };
  const onNextClick = () => {
    setOpenPage1(false);
    setOpenPage2(true);
  };

  const [isOBL, setIsOBL] = useState(complianceModel.Value6 === "true");

  useEffect(() => {
    setIsOBL(complianceModel.Value6 === "true");
  }, [complianceModel.Value6]);

  const handleYesChange = () => {
    setIsOBL(true);
    SendFeesClick();
  };

  const handleNoChange = () => {
    setIsOBL(false);
    RemoveSendFeesClick();
  };

  const SendFeesClick = () => {
    setComplianceModel((prevModel) => ({
      ...prevModel,
      Value6: "yes",
    }));
    setComplianceComponent((prevModel) => ({
      ...prevModel,
      questionId: "6",
      value: "yes",
    }));
    onComplaince();
  };

  const RemoveSendFeesClick = () => {
    setComplianceModel((prevModel) => ({
      ...prevModel,
      Value6: "no",
    }));
    setComplianceComponent((prevModel) => ({
      ...prevModel,
      questionId: "6",
      value: "no",
    }));
    onComplaince();
  };

  const [isOBL1, setIsOBL1] = useState(complianceModel.Value7 === "true");

  useEffect(() => {
    setIsOBL1(complianceModel.Value7 === "true");
  }, [complianceModel.Value7]);

  const handleYesChange1 = () => {
    setIsOBL1(true);
    SendBankLicenseClick();
  };

  const handleNoChange1 = () => {
    setIsOBL1(false);
    RemoveSendBankLicenseClick();
  };

  const SendBankLicenseClick = () => {
    setComplianceModel((prevModel1) => ({
      ...prevModel1,
      Value7: "yes",
    }));

    setComplianceComponent((prevModel) => ({
      ...prevModel,
      questionId: "7",
      value: "yes",
    }));

    onComplaince();
  };

  const RemoveSendBankLicenseClick = () => {
    setComplianceModel((prevModel1) => ({
      ...prevModel1,

      Value7: "no",
    }));

    setComplianceComponent((prevModel) => ({
      ...prevModel,
      questionId: "7",
      value: "no",
    }));
    onComplaince();
  };

  const handleAddNew = () => {
    const newSubsidiaryNames = [
      ...subsidiaryNames,
      { id: Date.now(), value: "" },
    ];
    setSubsidiaryNames(newSubsidiaryNames);
  };
  return (
    <>
      {openPage1 ? (
        <>
          {/* {loading ? ( */}
          {/* <div className="spinner-class">
            <ProgressSpinner />
          </div> */}
          {/* ) : ( */}
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
                    <span className="text-blue-address">
                      1. Entity & Ownership
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section ">
                  <div className=" col-md-12 form-group ">
                    <span className="input-label">
                      Full Legal Name <span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="legal_name"
                      autoComplete="nope"
                      placeholder="Enter Full Legal Name"
                      value={complianceModel?.Value1 || ""}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;

                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId1: "1",
                            Value1: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "1",
                            value: value,
                          });
                        }

                        onComplaince();
                      }}
                    />

                    {/[#$&]/.test(complianceModel?.Value1 || "") && (
                      <span className="error-msg">
                        Name should not contain $, #, or &
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 info-section">
                  <div className="col-md-12 physical-address-text">
                    <div
                      className="register-address"
                      style={{ marginTop: "30px" }}
                    >
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        disabled={editReadOnly}
                        checked={checked}
                        onChange={onCheckClick}
                      />
                      <span className="form-check-label">
                        Entity is Subsidiary
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {subsidiaryNames.map((subsidiary, index) => (
                  <div className="row" key={subsidiary.id}>
                    <div className="col-md-6 info-section ">
                      <div className=" col-md-12 form-group ">
                        <span className="input-label">
                          Subsidiary Name List{" "}
                          <span className="color-red">*</span>
                        </span>
                        <input
                          disabled={editReadOnly}
                          className="form-control "
                          type="text"
                          name="Subsidiaryname"
                          autoComplete="nope"
                          placeholder="Enter address line1"
                          value={complianceModel.Value1_2}
                          onChange={(ev) => {
                            const value = ev.target.value;
                            const re = /^[A-Za-z0-9\s\.'-]+$/i;
                            if (re.test(value) || value === "") {
                              setComplianceModel({
                                ...complianceModel,
                                QuestionId1_2: "1.2",
                                Value1_2: ev.target.value,
                              });
                              setComplianceComponent({
                                ...complianceComponent,

                                questionId: "1.2",
                                value: ev.target.value,
                              });
                            }
                            onComplaince();
                          }}
                        />
                        {/[#$&]/.test(complianceModel.Value1_2) && (
                          <span className="error-msg">
                            Name should be speical characters{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-md-6 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div
                      className="register-address"
                      style={{
                        marginTop: "-50px",
                        marginLeft: "650px",
                        width: "-90px",
                      }}
                    >
                      <Button
                        iconPos="left"
                        label={"Add New"}
                        className="btn btn-continue second-btn"
                        //   loading={buttonLoading}
                        onClick={handleAddNew}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section info-section-border">
                  <div className="col-md-12 ">
                    <span className="text-blue-address">
                      Registered Address
                    </span>
                  </div>
                  <div className=" col-md-12 form-group ">
                    <span className="input-label">
                      Address Line 1 <span className="color-red">*</span>
                      <ToolTip props={addressToolTipdata[0]}></ToolTip>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="address"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value2_1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_1: "2.1",
                            Value2_1: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.1",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        {" "}
                        should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className=" col-md-12 form-group ">
                    <span className="input-label">Address Line 2 </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="addressLine2"
                      autoComplete="nope"
                      placeholder="Enter address line2"
                      value={complianceModel.Value2_2}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_2: "2.2",
                            Value2_2: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.2",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Building Number/Street Name/Landmark{" "}
                      <ToolTip props={addressToolTipdata[2]}></ToolTip>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="Buildingnumber"
                      autoComplete="nope"
                      placeholder="Enter address line2"
                      value={complianceModel.Value2_3}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_3: "2.3",
                            Value2_3: value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.3",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Town <span className="color-red">*</span>{" "}
                      <ToolTip props={addressToolTipdata[3]}></ToolTip>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="town1"
                      autoComplete="nope"
                      placeholder="Enter address line2"
                      value={complianceModel.Value2_4}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_4: "2.4",
                            Value2_4: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.4",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Province <span className="color-red">*</span>{" "}
                      <ToolTip props={addressToolTipdata[5]}></ToolTip>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="province1"
                      autoComplete="nope"
                      placeholder="Enter address line2"
                      value={complianceModel.Value2_5}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_5: "2.5",
                            Value2_5: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.5",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
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
                      disabled={editReadOnly}
                      aria-label="Countries"
                      autoComplete="off"
                      dropdownAriaLabel="Select Country"
                      className="dropdown-acc"
                      placeholder="Select country"
                      suggestions={filteredcountrieslist}
                      completeMethod={searchCountry}
                      value={complianceModel.Value2_6}
                      onChange={(e) => {
                        if (e.value !== null) {
                          setCountryAutoComplete(e.value);
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_6: "2.6",
                            Value2_6: e.value.name,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "2.6",
                            value: e.target.value,
                          });
                        }
                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value1_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Postal Code <span className="color-red">*</span>{" "}
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="Postalcode1"
                      autoComplete="nope"
                      placeholder="Enter address line2"
                      value={complianceModel.Value2_7}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        // if (re.test(value) || value === '') {
                        if (/^[0-9]*$/.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId2_7: "2.7",
                            Value2_7: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "2.7",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {!/^[0-9]*$/.test(complianceModel.Value2_7) && (
                      <span className="error-msg">
                        Field should contain only numbers
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
                        id="exampleCheck2"
                        disabled={editReadOnly}
                        checked={checkedRegiseter}
                        onChange={onRegisterCheckClick}
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
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="addlinephysical"
                      placeholder="Enter address line1"
                      value={complianceModel.Value3_1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            Value3_1: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "3.1",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value3_1) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className=" col-md-12 form-group ">
                    <span className="input-label">Address Line 2 </span>
                    <input
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="addressphysical"
                      placeholder="Enter address line2"
                      value={complianceModel.Value3_2}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_2: "3.2",
                            Value3_2: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "3.2",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value3_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Building Number/Street Name/Landmark{" "}
                      <ToolTip props={addressToolTipdata[2]}></ToolTip>
                    </span>
                    <input
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="physicalAddress2"
                      placeholder="Enter address line2"
                      value={complianceModel.Value3_3}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_3: "3.3",
                            Value3_3: value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "3.3",
                            value: ev.target.value,
                          });
                        }
                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value3_3) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group  ">
                    <span className="input-label">
                      Town <span className="color-red">*</span>{" "}
                      <ToolTip props={addressToolTipdata[3]}></ToolTip>
                    </span>
                    <input
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="townname"
                      placeholder="Enter address line2"
                      value={complianceModel.Value3_4}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_4: "3.4",
                            Value3_4: value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "3.4",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value3_4) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Province <span className="color-red">*</span>{" "}
                      <ToolTip props={addressToolTipdata[5]}></ToolTip>
                    </span>
                    <input
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="nameprovince"
                      placeholder="Enter address line2"
                      value={complianceModel.value3_5}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_5: "3.5",
                            value3_5: value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "3.5",
                            value: ev.target.value,
                          });

                          onComplaince();
                        }
                      }}
                    />
                    {/[#$&]/.test(complianceModel.value3_5) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className=" col-md-12 form-group ">
                    <span>
                      Country <span className="color-red">*</span>
                    </span>
                    <AutoComplete
                      field="name"
                      dropdown
                      forceSelection
                      disabled={readonly || editReadOnly}
                      aria-label="Countries"
                      autoComplete="off"
                      dropdownAriaLabel="Select Country"
                      className="dropdown-acc"
                      placeholder="Select country"
                      suggestions={filteredcountrieslist}
                      completeMethod={searchCountry}
                      value={complianceModel.Value3_6}
                      onChange={(e) => {
                        if (e.value !== null) {
                          setCountryAutoComplete(e.value);
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_6: "3.6",
                            Value3_6: e.value.name,
                          });

                          setComplianceComponent({
                            ...complianceComponent,
                            questionId: "3.6",
                            value: e.target.value,
                          });
                        }
                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value3_6) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span>
                      Postal Code <span className="color-red">*</span>
                    </span>
                    <input
                      readOnly={readonly || editReadOnly}
                      className="form-control"
                      type="text"
                      autoComplete="nope"
                      name="postal_code"
                      placeholder="Enter address line2"
                      value={complianceModel.Value3_7}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId3_7: "3.7",
                            Value3_7: value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "3.7",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {!/^[0-9]*$/.test(complianceModel.Value3_7) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section ">
                  <div className=" col-md-12 form-group">
                    <span className="input-label">
                      Date of Entity incorporation/establishment{" "}
                      <span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="nameentity"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value4}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId4: "4",
                            Value4: ev.target.value,
                          });

                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "4",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section ">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Type of ownership<span className="color-red">*</span>
                    </span>
                    <AutoComplete
                      field="name"
                      dropdown
                      forceSelection
                      disabled={editReadOnly}
                      aria-label="Countries"
                      autoComplete="off"
                      dropdownAriaLabel="Select Country"
                      className="dropdown-acc"
                      placeholder="Select country"
                      suggestions={filteredcountrieslist}
                      completeMethod={searchCountry}
                      value={complianceModel.value5}
                      onChange={(e) => {
                        if (e.value !== null) {
                          // setCountryAutoComplete(e.value);
                          setComplianceModel({
                            ...complianceModel,
                            questionId5: "5",
                            value5: e.value.name,
                          });

                          if (checked) {
                            setComplianceModel({
                              ...complianceModel,
                              value5: e.value.name,
                            });
                            setComplianceComponent({
                              ...complianceComponent,

                              questionId: "5",
                              value: e.target.value,
                            });
                          }
                        }
                        onComplaince();
                      }}
                    />
                  </div>
                </div>

                <div className="col-md-3 info-section ">
                  <div className=" col-md-12 form-group">
                    <span className="input-label">
                      Exchange Traded on <span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="trade"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value5_1_1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId5_1_1: "5.1.1",
                            Value5_1_1: ev.target.value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "5.1.1",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3 info-section ">
                  <div className=" col-md-12 form-group">
                    <span className="input-label">
                      Ticker Symbol<span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="ticker_symbol"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value5_1_2}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId5_1_2: "5.1.2",
                            Value5_1_2: ev.target.value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "5.1.2",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Does the Entity, or any of its branches, operate under an
                      Offshore Banking License (OBL)?
                      <span className="color-red">*</span>
                    </span>
                  </div>
                </div>

                <div className="col-md-2 info-section ">
                  <div
                    className="col-md-12 switch-style"
                    style={{ marginLeft: "-40px" }}
                  >
                    <div
                      className="toggle-country "
                      style={{ marginBottom: "15px" }}
                    >
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
              <div className="row" style={{ marginTop: "-20px" }}>
                <div className="col-md-8 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Name of the relevant branch/es which operate under an OBL
                      <span className="color-red">*</span>
                    </span>
                  </div>
                </div>
                <div
                  className="col-md-4 info-section "
                  style={{ marginLeft: "-250px" }}
                >
                  <div className=" col-md-12 form-group ">
                    <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="relevantbrancht"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value6_1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            QuestionId6_1: "6.1",
                            Value6_1: ev.target.value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "6.1",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Does the Bank have a Virtual Bank License or provide
                      <span className="color-red">*</span>
                    </span>
                  </div>
                </div>

                <div className="toggle-country " style={{ marginTop: "-40px" }}>
                  <div className="Toggle-btn">
                    <div className="switch-field">
                      <input
                        // type="radio"
                        // // disabled={readOnly}
                        // id={`radio-three`}
                        // name={`switch-three`}
                        // onChange={() => {
                        //   SendBankLicenseClick()
                        //   onComplaince();
                        // }
                        // }

                        // onClick={(e: any) => {
                        //   SendBankLicenseClick()
                        //   onComplaince();
                        // }
                        // }

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
              <div className="row">
                <div className="col-md-7 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Does the organization have the following compliance
                      policies<span className="color-red">*</span>
                    </span>
                  </div>
                </div>
                <div className="col-md-1 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      {/* if(updatedPolicies.checkedoption=== "true") then  
 
  checkedoption == true */}
                      {/* <input
                        type="checkbox"
                        id="exampleCheckAML"
                        name="AML"
                        disabled={editReadOnly}
                        onChange={onCheckClickpolicies}
                        value={complianceModel.Value9}
                        // checked={((complianceModel.Value9) === "AML")? checked : false}
                        checked={compliancePolicies.find((policy) => policy.deliveryType === "AML")?.checkedoption || false}
                        className={compliancePolicies.find((policy) => policy.deliveryType === "AML")?.checkedoption ? "ALM" : ""}
                      /> */}

                      <input
                        type="checkbox"
                        id="exampleCheckAML"
                        name="AML"
                        disabled={editReadOnly}
                        onChange={onCheckClickpolicies}
                        value={complianceModel.Value9}
                        // checked={complianceModel.Value9 === "AML" ||
                        //   complianceModel.Value9 === "AML/CTF" ||
                        //   complianceModel.Value9 === "AML/CTF/KYC" ||

                        //   compliancePolicies.find(((policy) => policy.deliveryType === "AML"))?.checkedoption || false}

                        //   checked={
                        //     complianceModel.Value9.includes("AML") ||
                        //     compliancePolicies.find(policy => policy.deliveryType === "AML")?.checkedoption || false
                        //   }
                        //   className={compliancePolicies.find(((policy) => policy.deliveryType === "AML") || ((policy) => policy.deliveryType === "AML"))?.checkedoption ? "ALM" : ""}
                        // />
                        checked={
                          (complianceModel.Value9 &&
                            complianceModel.Value9.includes("AML")) ||
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "AML"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "AML"
                          )?.checkedoption
                            ? "AML"
                            : ""
                        }
                      />

                      <span className="form-check-label">AML</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        id="exampleCheckCTF"
                        name="CTF"
                        disabled={editReadOnly}
                        onChange={onCheckClickpolicies}
                        //   checked={complianceModel.Value9 === "CTF" ||
                        //     complianceModel.Value9 === "AML/CTF/KYC" ||
                        //     compliancePolicies.find((policy) => policy.deliveryType === "CTF")?.checkedoption || false}
                        //   className={compliancePolicies.find((policy) => policy.deliveryType === "CTF")?.checkedoption ? "CTF" : ""}

                        // />

                        checked={
                          (complianceModel.Value9 &&
                            complianceModel.Value9.includes("CTF")) ||
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "CTF"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "CTF"
                          )?.checkedoption
                            ? "CTF"
                            : ""
                        }
                      />
                      <span className="form-check-label">CTF</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        // className="form-check-input"
                        id="exampleCheckKYC"
                        disabled={editReadOnly}
                        // checked={checked}
                        onChange={onCheckClickpolicies}
                        name="KYC"
                        value={complianceModel.Value9}
                        //   checked={complianceModel.Value9 === "KYC" ||
                        //     complianceModel.Value9 === "AML/CTF/KYC" ||
                        //     compliancePolicies.find((policy) => policy.deliveryType === "KYC")?.checkedoption || false}

                        //   // value={complianceModel.Value9} checked={compliancePolicies.find((policy) => policy.deliveryType === "KYC")?.checkedoption || false}
                        //   className={compliancePolicies.find((policy) => policy.deliveryType === "KYC")?.checkedoption ? "KYC" : ""}
                        // />

                        checked={
                          (complianceModel.Value9 &&
                            complianceModel.Value9.includes("KYC")) ||
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "KYC"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "KYC"
                          )?.checkedoption
                            ? "KYC"
                            : ""
                        }
                      />
                      <span className="form-check-label">KYC</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-1 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        // className="form-check-input"
                        id="exampleCheck1"
                        disabled={editReadOnly}
                        // checked={checked}
                        onChange={onCheckClickpolicies}
                        name="ABC"
                        value={complianceModel.Value9}
                        //
                        //   checked={complianceModel.Value9 === "ABC" ||
                        //     complianceModel.Value9 === "AML/CTF/KYC/ABC" ||
                        //     compliancePolicies.find((policy) => policy.deliveryType === "ABC")?.checkedoption || false}
                        //   className={compliancePolicies.find((policy) => policy.deliveryType === "ABC")?.checkedoption ? "ABC" : ""}
                        // />

                        checked={
                          (complianceModel.Value9 &&
                            complianceModel.Value9.includes("ABC")) ||
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "ABC"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          compliancePolicies.find(
                            (policy) => policy.deliveryType === "ABC"
                          )?.checkedoption
                            ? "ABC"
                            : ""
                        }
                      />
                      <span className="form-check-label">ABC</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Does the organization have the following policies
                      <span className="color-red">*</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        id="Assessment1"
                        disabled={editReadOnly}
                        onChange={onCheckClickorganization}
                        name="RiskAssessmentPolicy"
                        value={complianceModel.Value10}
                        // className="Risk1"
                        // checked={complianceOrganization.find((policy) => policy.deliveryType === "RiskAssessmentPolicy")?.checkedoption === true}
                        // className={complianceOrganization.find((policy) => policy.deliveryType === "RiskAssessmentPolicy")?.checkedoption ? "RiskAssessmentPolicy checked" : "RiskAssessmentPolicy"}

                        checked={
                          complianceModel.Value10 === "RiskAssessmentPolicy" ||
                          complianceOrganization.find(
                            (policy) =>
                              policy.deliveryType === "RiskAssessmentPolicy"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          complianceOrganization.find(
                            // ((policy) =>
                            //   policy.deliveryType === "RiskAssessmentPolicy") ||
                            //   ((policy) =>
                            //     policy.deliveryType === "RiskAssessmentPolicy")

                            ((policy) =>
                              policy.deliveryType === "RiskAssessmentPolicy" ||
                             
                                policy.deliveryType === "RiskAssessmentPolicy")
                          )?.checkedoption
                            ? "RiskAssessmentPolicy"
                            : ""
                        }
                      />

                      <span className="form-check-label">
                        Risk Assessment Policy
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-3 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        id="Assessment2"
                        disabled={editReadOnly}
                        onChange={onCheckClickorganization}
                        name="RiskManagementPolicy"
                        value={complianceModel.Value10}
                        // checked={complianceOrganization.find((policy) => policy.deliveryType === "RiskManagementPolicy")?.checkedoption || false}
                        // className={complianceOrganization.find((policy) => policy.deliveryType === "RiskManagementPolicy")?.checkedoption ? "RiskManagementPolicy checked" : "RiskManagementPolicy"}

                        checked={
                          complianceModel.Value10 === "RiskManagementPolicy" ||
                          complianceOrganization.find(
                            (policy) =>
                              policy.deliveryType === "RiskManagementPolicy"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          complianceOrganization.find(
                            // ((policy) =>
                            //   policy.deliveryType === "RiskManagementPolicy") ||
                            //   ((policy) =>
                            //     policy.deliveryType === "RiskManagementPolicy")

                            ((policy) =>
                              policy.deliveryType === "RiskManagementPolicy" ||
                            
                                policy.deliveryType === "RiskManagementPolicy")
                          )?.checkedoption
                            ? "RiskManagementPolicy"
                            : ""
                        }
                      />

                      <span className="form-check-label">
                        Risk Management Policy
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        id="Assessment3"
                        disabled={editReadOnly}
                        onChange={onCheckClickorganization}
                        value={complianceModel.Value10}
                        name="PrivacyPolicy"
                        // checked={complianceOrganization.find((policy) => policy.deliveryType === "PrivacyPolicy")?.checkedoption || false}
                        // className={complianceOrganization.find((policy) => policy.deliveryType === "PrivacyPolicy")?.checkedoption ? "PrivacyPolicy checked" : "PrivacyPolicy"}

                        checked={
                          complianceModel.Value10 === "PrivacyPolicy" ||
                          complianceOrganization.find(
                            (policy) => policy.deliveryType === "PrivacyPolicy"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          complianceOrganization.find(
                            // ((policy) =>
                            //   policy.deliveryType === "PrivacyPolicy") ||
                            //   ((policy) =>
                            //     policy.deliveryType === "PrivacyPolicy")

                            ((policy) =>
                              policy.deliveryType === "PrivacyPolicy" ||
                             
                                policy.deliveryType === "PrivacyPolicy")
                          )?.checkedoption
                            ? "PrivacyPolicy"
                            : ""
                        }
                      />

                      <span className="form-check-label">Privacy Policy</span>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 info-section ">
                  <div className="col-md-12 physical-address-text ">
                    <div className="register-address">
                      <input
                        type="checkbox"
                        id="Assessment3"
                        disabled={editReadOnly}
                        onChange={onCheckClickorganization}
                        name="ConsumerComplaintsPolicy"
                        value={complianceModel.Value10}
                        //   checked={complianceOrganization.find((policy) => policy.deliveryType === "ConsumerComplaintsPolicy")?.checkedoption || false}
                        //   className={complianceOrganization.find((policy) => policy.deliveryType === "ConsumerComplaintsPolicy")?.checkedoption ? "ConsumerComplaintsPolicy checked" : "ConsumerComplaintsPolicy"}
                        // />
                        checked={
                          complianceModel.Value10 ===
                            "ConsumerComplaintsPolicy" ||
                          complianceOrganization.find(
                            (policy) =>
                              policy.deliveryType === "ConsumerComplaintsPolicy"
                          )?.checkedoption ||
                          false
                        }
                        className={
                          complianceOrganization.find(
                            // ((policy) =>
                            //   policy.deliveryType ===
                            //   "ConsumerComplaintsPolicy") ||
                            //   ((policy) =>
                            //     policy.deliveryType ===
                            //     "ConsumerComplaintsPolicy")

                            ((policy) =>
                              policy.deliveryType ===
                              "ConsumerComplaintsPolicy" ||
                              
                                policy.deliveryType ===
                                "ConsumerComplaintsPolicy")
                          )?.checkedoption
                            ? "ConsumerComplaintsPolicy"
                            : ""
                        }
                      />
                      <span className="form-check-label">
                        Consumer Complaints Policy
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section">
                  <div className="col-md-12 form-group">
                    <span className="input-label">
                      Does the organization have a designated Compliance Office
                      <span className="color-red">*</span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 info-section ">
                  <div className=" col-md-12 form-group">
                    <span className="input-label">
                      Full Name <span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control "
                      type="text"
                      name="fullname1"
                      autoComplete="nope"
                      placeholder="Enter address line1"
                      value={complianceModel.Value11_1}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            Value11_1: ev.target.value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "11.1",
                            value: ev.target.value,
                          });
                        }

                        onComplaince();
                      }}
                    />
                    {/[#$&]/.test(complianceModel.Value11_1) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6 info-section ">
                  <div className=" col-md-12 form-group">
                    <span className="input-label">
                      Email Address <span className="color-red">*</span>
                    </span>
                    <input
                      disabled={editReadOnly}
                      className="form-control"
                      type="text"
                      name="numEmail"
                      autoComplete="nope"
                      placeholder="Enter email address"
                      value={complianceModel.Value11_2}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[A-Za-z0-9\s\.'-]+$/i;
                        if (re.test(value) || value === "") {
                          setComplianceModel({
                            ...complianceModel,
                            Value11_2: ev.target.value,
                          });
                          setComplianceComponent({
                            ...complianceComponent,

                            questionId: "11.2",
                            value: ev.target.value,
                          });
                        }
                        onComplaince();
                      }}
                    />

                    {/[#$&]/.test(complianceModel.Value11_2) && (
                      <span className="error-msg">
                        Field should be speical characters{" "}
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
                        // loading={backButtonLoading}
                        className="btn btn-back second-btn"
                        onClick={onBackClick}
                      />
                    ) : (
                      <Button
                        type="button"
                        label="Back"
                        // loading={backButtonLoading}
                        className="btn btn-back second-btn"
                        onClick={onBackClick}
                      />
                    )}

                    <button
                      type="button"
                      // onClick={handleClose}
                      className="btn btn-cancel second-btn"
                    >
                      Cancel
                    </button>

                    {/* {updateBtnShow ? ( */}
                    {/* { (updateBtnShow) &&  (showSaveButton) ? ( */}

                    { isEditMode ? (
                      <Button
                        iconPos="left"
                        label={" Save and Continue"}
                        className="btn btn-continue second-btn"
                        // onClick={onComplaince()}
                        onClick={() => onComplainceOk()}
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
              <br /> <br /> <br />
            </div>
          </Scrollbars>
          {/* ) */}
          {/* } */}
        </>
      ) : openPage3 ? (
        <>
          <SanctionsProgram setOpenPage2={setOpenPage2} openPage2={openPage2} />
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default OwnershipDetails;
