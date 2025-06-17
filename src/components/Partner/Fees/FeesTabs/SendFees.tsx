import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate, useParams } from "react-router-dom";
import BRLimg from "../../../../assets/images/BRLimg.svg";
import CANADAimg from "../../../../assets/images/canada-flag.svg";
import INDimg from "../../../../assets/images/india.svg";
import USDlogo from "../../../../assets/images/USDImg.svg";
import AUTimg from "../../../../assets/images/AUTimg.svg";

import { CurrenciesService } from "../../../../services/Partner/Currencies/Currencies";
import { PartnerFeesDetailsService } from "../../../../services/Partner/Fees/Fees";
import { PartnershipDetailsService } from "../../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { Logout } from "../../../../utils/AccountUtils";
import C2CSendFees from "./C2CSendFee";
import ReceiveFees from "./ReceiveFees";
const onboardStatus = sessionStorage.getItem("onboardStatus");

const SendFees: React.FC<any> = ({
  onSaveAndContinueClick,
  partnerType,
  partnerPaymentRole,
  setActiveIndex,
  receiverBackButtonValue,


  


}) => {
  const { partnerid, type } = useParams();
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const [displaypopup, setDisplayPopup] = useState(false);
  const [displayCancelpopup1, setdisplayCancelpopup1] = useState(false);
  const [dirtyfield, setDirtyField] = useState(true);
  const [currency, setCurrency] = useState(null);
  const [data, setData] = useState(null);
  const [showcurrency, setShowCurrency] = useState(null);
  const [backbuttonLoading, setBackButtonLoading] = useState(false);
  const onboardStatus = sessionStorage.getItem("onboardStatus");
  const [displayCancelPopup, setDisplayCancelPopup] = useState(false);
  const [displaySavePopup, setDisplaySavePopup] = useState(false);
  const [sendfixedfeeserrorMessage, setsendfixedfeeserrorMessage] =
    useState("");
  const [readonly, setReadOnly] = useState(true);
  const [sendfirstfixedfeeserrorMessage, setsendfirstfixedfeeserrorMessage] =
    useState("");
  const [visible, setVisible] = useState<boolean>(false);
  const [sendvariablefeeserrorMessage, setsendvariablefeeserrorMessage] =
    useState("");

  const [editingMode, setEditingMode] = useState(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [showB2B, setShowB2B] = useState(false);

  const [showC2C, setShowC2C] = useState(false);

  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [updatepopup, setUpdatePopup] = useState(false);

  const [feesAmount, setFeesAmount] = useState("");
  const [updated, setUpdated] = useState(feesAmount);
  const [addClickCalled, setAddClickCalled] = useState(false);

  const [variablefees, setVariblaeFees] = useState("");
  const [updatedVariableFee, setUpdatedVariableFee] = useState(variablefees);

  const [latestsendfeeNewModel, setlatestsendfeeNewModel]: any = useState([]);

  const [feesnextloading, setFeesNextloading] = useState(false);
  const [defaultsendfeeNewModel, setdefaultsendfeeNewModel] = useState<any[]>([]);
  const [sendfeeNewModel, setsendfeeNewModel] = useState<any[]>([]);
  const [finalSendFeeData, setFinalSendFeeData] = useState<any>();;

 




  const onVariableFeeChange = (e: any, index: number) => {
    const newValue = e.target.value.trim();

    const updatedValue = newValue === "" || newValue === null ? "" : newValue;

    let newArr: any = [...defaultsendfeeNewModel];
    newArr[index][e.target.name] = updatedValue;
    setdefaultsendfeeNewModel(newArr);
    setVariblaeFees(updatedValue);
  };



  const onfixedFeeChange
  
  
  = (e: any, index: number) => {
    const newValue = e.target.value.trim();

    const updatedValue = newValue === "" || newValue === null ? "" : newValue;

    setFeesAmount(updatedValue);
    let newArr: any = [...defaultsendfeeNewModel];
    newArr[index][e.target.name] = updatedValue;
    setdefaultsendfeeNewModel(newArr);
  };
  const SendFeesClick = (event: any, index: any) => {
    let newArr: any = [...defaultsendfeeNewModel];

    newArr[index]["sendFixedFees"] = defaultsendfeeNewModel[0].sendFixedFees;
    newArr[index]["sendVariableFees"] = defaultsendfeeNewModel[0].sendVariableFees;

    setdefaultsendfeeNewModel(newArr);
  };

  const RemoveSendFeesClick = (e: any, index: number) => {
    let newArr: any = [...defaultsendfeeNewModel];
    newArr[index]["sendFixedFees"] = "";
    newArr[index]["sendVariableFees"] = "";
    setdefaultsendfeeNewModel(newArr);
  };
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };


  const ErrorMessageEmptyModel = () => {
    setsendfixedfeeserrorMessage("");
    setsendvariablefeeserrorMessage("");
    setsendfirstfixedfeeserrorMessage("");
  };

  const isValidate = (sendfees: any) => {
    let formIsValid = true;

    if (sendfees.length === 0) {
      // setsendfixedfeeserrorMessage("Please enter send fees");
      // setsendfirstfixedfeeserrorMessage("Please enter send fees");
      formIsValid = true;
    }

    else {
      sendfees
        .slice()
        .reverse()
        .forEach((sendfee: any) => {


          if (
            !(Number(sendfee.sendFixedFees) < 0) &&
            !CheckNull(sendfee.sendFixedFees)
          ) {
            if (
              !sendfee.sendFixedFees.toString().match(/^\d{1,16}(\.\d{0,2})?$/)
            ) {
              setsendfixedfeeserrorMessage(
                `Send fixed fees valid only upto length(16,2) for ${sendfee.sendFeeCurrency}.`
              );
              formIsValid = false;
            }
          }
          if (
            !(Number(sendfee.sendVariableFees) < 0) &&
            !CheckNull(sendfee.sendVariableFees)
          ) {
            if (
              !sendfee.sendVariableFees
                .toString()
                .match(/^\d{1,16}(\.\d{0,2})?$/)
            ) {
              setsendvariablefeeserrorMessage(
                `Send variable fees valid only upto length(16,2) for ${sendfee.sendFeeCurrency}.`
              );
              formIsValid = false;
            }
          }
          if (
            Number(sendfee.sendFixedFees) < 0 ||
            Object.is(Number(sendfee.sendFixedFees), -0)
          ) {
            setsendfixedfeeserrorMessage(
              `Send fixed fees cannot be negative number for ${sendfee.sendFeeCurrency}.`
            );
            formIsValid = false;
          }
          if (
            Number(sendfee.sendVariableFees) < 0 ||
            Object.is(Number(sendfee.sendVariableFees), -0)
          ) {
            setsendvariablefeeserrorMessage(
              `Send variable fees cannot be negative number for ${sendfee.sendFeeCurrency}.`
            );
            formIsValid = false;
          }
        });
    }

    return formIsValid;
  };

  const [checkSendFeeNewModel, setCheckSendFeeNewModel]: any = useState([]);

  useEffect(() => {
    getPartnerSendFees();
  }, []);

  var PartnerSendFeeType = 0;
  const getPartnerSendFees = () => {
    setLoading(true);
    PartnerFeesDetailsService.getPartnerSendFeesByPartnerId(Number(partnerid), "B2B").then((response) => {
      if (response && response.data !== null) {
        // //console.log("response", response.data)
        setdefaultsendfeeNewModel(response.data)
        setLoading(false);
      }
    })
      .catch((error) => {
        if (error.response) {
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
          }
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while getting partner send fees details.",
            life: 3000,
          });
        }
        setLoading(false);
      });

  };
  // onAddClick
  const onNextClick = () => {
    

    if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
      if (partnerType?.includes("C2C")) {

        setShowB2B(false);
        setShowC2C(true);
      } 
      else {
        onSaveAndContinueClick("N");
      }


    } 
    else if (partnerPaymentRole === 3) {
      if (partnerType?.includes("C2C")) {
        // onAddClick();
        setShowB2B(false);
        setShowC2C(true);
      } 
      
      // else   if (partnerType?.includes("B2B")) {
      //     onAddClick();
      //     setShowB2B(false);
      //     setShowC2C(true);
      //   } 
      
      else {
        setActiveIndex(1);
      }
    }
  };



  const onBackClick = () => {
    setBackButtonLoading(true);
    setTimeout(() => {
      onSaveAndContinueClick("B");
    }, 1000);
  };

  const acceptupdate = (data: any) => {
    setVisible(false);


    setButtonLoading(true);
    PartnerFeesDetailsService.addPartnerSendFees(data)
      .then((data) => {
        toast.current?.show({
          severity: "success",
          summary: "Send fees added successfully",
          life: 3000,
        });

        getPartnerSendFees();
        setButtonLoading(false);

        if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
          if (partnerType?.includes("C2C")) {
            onNextClick();
          } else {
            if (partnerPaymentRole === 1) {
              navigate(`/admin/partner/admin/${partnerid}`);
            } else {
              onSaveAndContinueClick("N");
            }
          }
        } else if (partnerPaymentRole === 3) {
          if (partnerType?.includes("C2C")) {
            onNextClick();
          } else {
            setActiveIndex(1);
          }
        }
      })


       // **************************************************************************

       const filterdata = data 
       const modifiedFinalData = filterdata.map(
         (item: any, index: any) => ({...item,partnerSendFeeType: 2})
       );
       PartnerFeesDetailsService.addPartnerSendFees(modifiedFinalData)
       .then((data) => {
         toast.current?.show({
           severity: "success",
           summary: "Send fees added successfully",
           life: 3000,
         });

         getPartnerSendFees();
         setButtonLoading(false);

         if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
           if (partnerType?.includes("C2C")) {
             onNextClick();
           } else {
             if (partnerPaymentRole === 1) {
               navigate(`/admin/partner/admin/${partnerid}`);
             } else {
               onSaveAndContinueClick("N");
             }
           }
         } else if (partnerPaymentRole === 3) {
           if (partnerType?.includes("C2C")) {
             onNextClick();
           } else {
             setActiveIndex(1);
           }
         }
       })
  // **********************************************************************
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
        } else if (error.response.status === 404) {
          // setsendfixedfeeserrorMessage("Please select send fees");
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while adding partner send fees.",
            life: 3000,
          });
        }
        setButtonLoading(false);
      });
  };
  

  
  const handleClosePopup = () => {
    setShowPopup(false);
    
  };



  
const handleCancelClick = () => {
  setDisplayCancelPopup(true);
};

const handleSaveClick = () => {
  setDisplaySavePopup(true);
};

  const onClosePopup = () => {
   
    setUpdatePopup(false);
  };


  useEffect(() => {
    const payload = defaultsendfeeNewModel.map(model => ({
      id: model.id,
      partnerId: model.partnerId,
      partnerSendFeeType: model.partnerSendFeeType,
      sendFeeCurrency: model.currencyCode,
      countryCode:model.countryCode,
      sendFixedFees:model.sendFixedFees ? model.sendFixedFees :0,
      sendVariableFees: model.sendVariableFees ? model.sendVariableFees :0,
      partnerSendFeeTier: null,
      createdBy: model.partnerId,
      updatedBy: model.partnerId,
      deletedBy: 0
    }));
    setFinalSendFeeData(payload);
  }, [defaultsendfeeNewModel])




  const onAddClick = () => {
    setButtonLoading(true);
    PartnerFeesDetailsService.addPartnerSendFees(finalSendFeeData).then(() => {
      toast.current?.show({
        severity: "success",
        summary: "Send fees added successfully",
        life: 3000,
      });
      getPartnerSendFees();
      setButtonLoading(false);
      if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
        if (partnerType?.includes("C2C")) {
          onNextClick();
        } else {
          onSaveAndContinueClick("N");
        }
      } else if (partnerPaymentRole === 3) {
        if (partnerType?.includes("C2C")) {
          onNextClick();
        } else {
          setActiveIndex(1);
        }
      }

      const filterdata = finalSendFeeData;
      const modifiedFinalData = filterdata.map(
        (item: any, index: any) => ({ ...item, partnerSendFeeType: 2 })
      );
      PartnerFeesDetailsService.addPartnerSendFees(modifiedFinalData).then((response) => {
        toast.current?.show({
          severity: "success",
          summary: "Send fees added successfully",
          life: 3000,
        });
        getPartnerSendFees();
        setButtonLoading(false);
        if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
          if (partnerType?.includes("C2C")) {
            onNextClick();
          } else {
            onSaveAndContinueClick("N");
          }
        } else if (partnerPaymentRole === 3) {
          if (partnerType?.includes("C2C")) {
            onNextClick();
          } else {
            setActiveIndex(1);
          }
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
          } else if (error.response.status === 404) {
            setsendfixedfeeserrorMessage("Please select send fees");
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error while adding partner send fees.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    })
      .catch((error) => {
        console.error("Error while adding partner send fees:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error while adding partner send fees.",
          life: 3000,
        });
        setButtonLoading(false);
      });
  };


 
  const handleClose = () => {
    {
      type === "A" ? setUpdateBtnShow(true) : setUpdateBtnShow(false);
    }
    if (dirtyfield === true) {
      setDisplayPopup(true);
    }
    ErrorMessageEmptyModel();
  };

  const onSaveClick = () => {
    //  onAddClick();
  
    setDisplayCancelPopup(false);
    getPartnerSendFees();

    // window.location.reload();
  };
  const reject = () => {
   setDisplayCancelPopup(false);
  };



  const OnPopupClose = () => {
    setDisplayPopup(false);
  };

  const OnPopupOk = () => {
    // latestsendfeeNewModel.map((model: any, index: any) => {
    //   model.sendFixedFees = null;
    //   model.sendVariableFees = null;
    // });

    onAddClick();
    
    // getPartnerSendFees();
    setDisplayPopup(false); 
  };

  const Next = () => {
    // latestsendfeeNewModel.map((model: any, index: any) => {
    //   model.sendFixedFees = null;
    //   model.sendVariableFees = null;
    // });

    onAddClick();
    
  };



  
  const onPartnerDeliveryChange = () => {
    if (partnerType?.includes("C2C")) {
      setShowC2C(true);
      setShowB2B(false);
    }
    if (partnerType?.includes("B2B")) {
      setShowB2B(true);
      setShowC2C(false);
    }
    if (partnerType?.includes("B2C")) {
      setShowB2B(true);
      setShowC2C(false);
    }
    if (partnerType?.includes("B2B") && partnerType?.includes("C2C")) {
      setShowB2B(true);
      setShowC2C(false);
    }
    if (partnerType?.includes("B2B") && partnerType?.includes("B2B")) {
      setShowB2B(true);
      setShowC2C(false);
    }
    if (partnerType?.includes("B2C") && partnerType?.includes("C2C")) {
      setShowB2B(true);
      setShowC2C(false);
    }
  };

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditingMode(true);
      setReadOnly(false);
    }, 1000);
  };

  const onCancelEdit = () => {
    getPartnerSendFees();

    setDisplayCancelPopup(true)

  };

  const onSaveClickpopup = () => {
    setDisplayPopup(true);
  };

  useEffect(() => {
    if (receiverBackButtonValue) {
      setShowB2B(false);
      setShowC2C(true);
      {
        type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
      }
      // getCurrenciesByPartnerId(Number(partnerid));
    } else {
      {
        type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
      }
      onPartnerDeliveryChange();
      // getCurrenciesByPartnerId(Number(partnerid));
    }
  }, []);

  return (
    <>
      <Scrollbars
        className="contain-scroll"
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        autoHeight
        autoHeightMin={500}
        autoHeightMax={1000}
        thumbMinSize={30}
        universal={true}
      >
        {loading ? (
          <div className="spinner-class">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            <div className="edit-content">

              {!showC2C && onboardStatus === "Ready" && type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}

            </div>


            {showB2B ?
              <div className="Fees-container">
                <p className="fees-discription">
                  First lets configure any fees that you want to charge businesses for the send transactions
                </p>
                {/* testing */}
                <div className="Fees-heading">
                  <h2>Business Send Fees </h2>
                </div>
                {defaultsendfeeNewModel.length >= 0 && (
                  <div className="Fees-sending-payment">
                    <h4>
                      What do you want to charge your business customers for sending payments?
                    </h4>
                    <div className="Fees-details-card  Fees-details-card-1">
                      {defaultsendfeeNewModel.map((each: any, index: any) => {
                        if (index == 0) {
                          return (
                            <div className="inner-card-wrapper" key={index}>
                              <div className="fees-card">
                                <p>Country</p>
                                <h3>{each.countryName}</h3>
                              </div>
                              <div className="fees-card currency">
                                <p>Currency</p>
                                <h3>{each.currencyCode}</h3>
                              </div>
                              <div className="fees-card fixed-fee">
                                <p>Fixed Fees</p>
                                <div className="fees-card-inupt">
                                  <input
                                    type="text"
                                    onKeyPress={(evt) => {
                                      if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                        evt.preventDefault();
                                      }
                                    }}
                                    onPaste={(evt) => {
                                      const pastedText = evt.clipboardData.getData('text/plain');
                                      if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                        evt.preventDefault();
                                      }
                                    }}

                                    disabled={readonly}
                                    name="sendFixedFees"
                                    id={`feesAmount-${index}`}
                                    className="form-control"
                                    aria-describedby="text"
                                    value={each.sendFixedFees}
                                    onChange={(e: any) => {
                                      onfixedFeeChange(e, index);
                                      setDirtyField(true);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="fees-card fixed-fee">
                                <p>Variable Fees</p>
                                <div className="percent-wrapper">
                                  <input

                                    type="text"
                                    disabled={readonly}
                                    id={`variablefees-${index}`}
                                    onKeyPress={(evt) => {
                                      if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                        evt.preventDefault();
                                      }
                                    }}
                                    onPaste={(evt) => {
                                      const pastedText = evt.clipboardData.getData('text/plain');

                                      if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                        evt.preventDefault();
                                      }
                                    }}
                                    className="form-control"
                                    name="sendVariableFees"
                                    // value={currency ? currency.sendVariableFees: 0}
                                    value={each.sendVariableFees}

                                    onChange={(e: any) => {
                                      onVariableFeeChange(e, index);
                                      setDirtyField(true);
                                    }}
                                    aria-describedby="text"
                                  />
                                  <span className="feespercent">%</span>
                                </div>
                              </div>
                            </div>
                          );
                        }

                      })}
                    </div>
                  </div>
                )}
                <hr />
                <>
                  {defaultsendfeeNewModel.length > 1 && (
                    <div className="Fees-sending-payment Country-select">
                      <h4>
                        Will the send fees for businesses be the same in the following countries?
                      </h4>
                      <div className="Fees-details-card  Fees-details-card-2">
                        {defaultsendfeeNewModel.map((each: any, index: any) => {
                          if (index != 0) {
                            return (
                              <div className="inner-card-wrapper" key={index}>
                                <div className="fees-card" style={{ width: '150px', marginRight: '20px' }}>
                                  <p>Country</p>
                                  <h3>{each.countryName}</h3>
                                </div>
                                <div className="fees-card" style={{ width: '100px', marginRight: '20px' }}>
                                  <p>Currency</p>
                                  <h3>{each.currencyCode}</h3>
                                </div>

                                <div className="toggle-country ">
                                  <div className="Toggle-btn">
                                    <div className="switch-field">
                                      <input
                                        readOnly={readonly}
                                        disabled={readonly}
                                        type="radio"
                                        id={`radio-one-${index}`}
                                        name={`switch-one${index}`}
                                        onChange={
                                          latestsendfeeNewModel.yescheckedFees
                                        }
                                        onClick={(e: any) =>
                                          SendFeesClick(e, index)
                                        }
                                      />
                                      <label htmlFor={`radio-one-${index}`}>
                                        Yes
                                      </label>
                                      <input
                                        readOnly={readonly}
                                        disabled={readonly}
                                        type="radio"
                                        id={`radio-two-${index}`}
                                        name={`switch-one${index}`}
                                        defaultChecked={true}
                                        onChange={
                                          latestsendfeeNewModel.nocheckedFees
                                          // defaultsendfeeNewModel.nocheckedFees

                                        }
                                        onClick={(e: any) =>
                                          RemoveSendFeesClick(e, index)
                                        }
                                      />
                                      <label htmlFor={`radio-two-${index}`}>
                                        No
                                      </label>
                                    </div>
                                  </div>
                                </div>

                                <div className="fees-card fixed-fee">
                                  <p>Fixed Fees</p>
                                  <div className="fees-card-input">
                                    <input
                                      type="text"
                                      onKeyPress={(evt) => {
                                        if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                          evt.preventDefault();
                                        }      
                                      }}
                                      onPaste={(evt) => {
                                        const pastedText = evt.clipboardData.getData('text/plain');
                                        if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                          evt.preventDefault();
                                        }
                                      }}
                                      name="sendFixedFees"
                                      disabled={readonly}
                                      id={`feesAmount-${index}`}
                                      className="form-control"
                                      aria-describedby="text"
                                      value={each.sendFixedFees}
                                      onChange={(e: any) => {
                                        onfixedFeeChange(e, index);
                                        setDirtyField(true);
                                      }}

                                    // value={fixedFeesData[index]}
                                    />
                                  </div>
                                </div>
                                <div className="fees-card fixed-fee">
                                  <p>Variable Fees</p>
                                  <div className="percent-wrapper">
                                    <input
                                      type="text"
                                      disabled={readonly}
                                      id={`variablefees-${index}`}
                                      onKeyPress={(evt) => {
                                        if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                          evt.preventDefault();
                                        }
                                      }}
                                      onPaste={(evt) => {
                                        const pastedText = evt.clipboardData.getData('text/plain');

                                        if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                          evt.preventDefault();
                                        }
                                      }}
                                      className="form-control"
                                      name="sendVariableFees"
                                      value={each.sendVariableFees}
                                      onChange={(e: any) => {
                                        onVariableFeeChange(e, index);
                                        setDirtyField(true);
                                      }}
                                      aria-describedby="text"
                                    />
                                    <span className="feespercent">%</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  )}
                </>
                <div className="button-section">
                  <div className="bottom-btns">
                    {editingMode ? (
                      <>
                        <Button
                          label="Back"
                          className="btn btn-back second-btn"
                          loading={backbuttonLoading}
                          onClick={onBackClick}
                        />
                        <button
                          type="button"
                          className="btn btn-back second-btn"
                        
                          onClick={() => onCancelEdit()}
                          
                        >
                          Cancel
                        </button>
                        <Button
                          iconPos="left"
                          label=" Save and Continue"
                          loading={buttonLoading}
                          className="btn btn-continue second-btn"
                          // onClick={() => onAddClick()}
                          // onClick={() => inactiveCountryDetails()}
                          onClick={() => onSaveClickpopup()}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          label="Back"
                          className="btn btn-back second-btn"
                          loading={backbuttonLoading}
                          onClick={onBackClick}
                        />
                        {Number(status) === 8 && (
                          <button
                            type="button"
                            // onClick={onNextClick}
                            onClick={Next}
                            className="btn btn-next second-btn"

                          
                          >
                            Next
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </div>



              </div> : ""}

            {showC2C ? (
              <C2CSendFees
                partnerPaymentRole={partnerPaymentRole}
                partnerType={partnerType}
                onBackClick={onBackClick}
                onSaveAndContinueClick={onSaveAndContinueClick}
                setActiveIndex={setActiveIndex}
                setShowC2C={setShowC2C}
              />
            ) : null}
          </>
        )
        
        }
      </Scrollbars>


      {displaypopup ? (
        <>
          <div className="popup-body">
            <div className="register-popup Payment-screen">
              <div className="text-center ">
                <div className="awesome-text">
                  {/* <h4>Are you sure you want to cancel?</h4>
                  <p> All unsaved changes will be lost.</p> */}
                  <h4>
                  <i className="pi pi-info-circle"></i>Are you sure you want to update?
                </h4>
                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                disabled={readonly}
                  className="btn btn-cancel second-btn "
                  onClick={OnPopupClose}
                >
                  {" "}
                  No
                </button>
                <button
                 disabled={readonly}
                  className="btn btn-continue second-btn yes-btn-popup"
                  onClick={OnPopupOk}
                >
                  {" "}
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    {displayCancelPopup ? (    
        <div className="popup-body">
          <div className="register-popup Payment-screen">  
            <div className="text-center ">
              <div className="awesome-text">  
              <h4>Are you sure you want to cancel?</h4> 
                  <p> All unsaved changes will be lost.</p> 
              </div>
            </div>
            <div className="payment-screen-btn">
              <button className="btn btn-cancel second-btn " onClick={reject}>
                {" "}
                No
              </button>
              <button
                className="btn btn-continue second-btn yes-btn-popup"
                onClick={onSaveClick}
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

export default SendFees;
