import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BRLimg from "../../../assets/images/BRLimg.svg";
import CANADAimg from "../../../assets/images/canada-flag.svg";
import INDimg from "../../../assets/images/india.svg";
import USDlogo from "../../../assets/images/USDImg.svg";
import { CurrenciesService } from "../../../services/Partner/Currencies/Currencies";
import { PartnerFeesDetailsService } from "../../../services/Partner/Fees/Fees";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";

const C2CSendFees: React.FC<any> = ({ 
  // updateBtnShow,
    setActiveIndex,
  setShowB2B,
  setShowC2C,onSaveAndContinueClick,  
   partnerPaymentRole,partnerType }) => {
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const [dirtyfield, setDirtyField] = useState(false);
  const onboardStatus = sessionStorage.getItem("onboardStatus");

  const [currency, setCurrency] = useState(null);
  const [showcurrency, setShowCurrency] = useState(null);
  const PartnerTypeStaticValue = "C2C";
  const { partnerid, type } = useParams();
  const [sendfixedfeeserrorMessage, setsendfixedfeeserrorMessage] =
    useState("");
  const [sendvariablefeeserrorMessage, setsendvariablefeeserrorMessage] =
    useState("");
    const [readonly, setReadOnly] = useState(false);

  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [defaultsendfeeNewModel, setdefaultsendfeeNewModel] = useState<any[]>([]);
  const [finalSendFeeData, setFinalSendFeeData] = useState<any>();;
  const [variablefees, setVariblaeFees] = useState("");
  const [feesAmount, setFeesAmount] = useState("");
  const [latestsendfeeNewModel, setlatestsendfeeNewModel]: any = useState([]);
  const [displaypopup, setDisplayPopup] = useState(false);
  const [backbuttonLoading, setBackButtonLoading] = useState(false);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const ErrorMessageEmptyModel = () => {
    setsendfixedfeeserrorMessage("");
    setsendvariablefeeserrorMessage("");
  };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };

  const handleClose = () => {
    if (dirtyfield === true) {
      setDisplayPopup(true);
    }
  };
  const OnPopupClose = () => {
    setDisplayPopup(false);
  };
  const OnPopupOk = () => {
    latestsendfeeNewModel.map((model: any, index: any) => {
      model.sendFixedFees = null;
      model.sendVariableFees = null;
    });

    getPartnerSendFees();
    setDisplayPopup(false);
    setDirtyField(false);
    ErrorMessageEmptyModel();
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


  const onVariableFeeChange = (e: any, index: number) => {
    let newArr: any = [...defaultsendfeeNewModel];
    newArr[index][e.target.name] = e.target.value;
    setdefaultsendfeeNewModel(newArr);
    setVariblaeFees(e.target.value);
  };

  const onfixedFeeChange = (e: any, index: number) => {
    setFeesAmount(e.target.value);
    let newArr: any = [...defaultsendfeeNewModel];
    newArr[index][e.target.name] = e.target.value;
    setdefaultsendfeeNewModel(newArr);
  };
  const onNextClick = () => {
    if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
      if (partnerType?.includes("C2C")) {
        onSaveAndContinueClick("N");
      }
    } else if (partnerPaymentRole === 3) {
      setActiveIndex(1);
    }
  };

  const onBackOkClick = () => {
    if (partnerPaymentRole === 1 || partnerPaymentRole === 3) {
      setBackButtonLoading(true)
      if (partnerType?.includes("C2C")) {
        setBackButtonLoading(true);

        setTimeout(() => {
          setShowB2B(true);
          setShowC2C(false);
        }, 1000);
      } else {
        setTimeout(() => {
          onSaveAndContinueClick("B");
        }, 1000);
      }


    }
  };
  
  const isValidate = (sendfees: any) => {
    let formIsValid = true;

    if (sendfees.length === 0) {
      setsendfixedfeeserrorMessage("Please select send fees");
      formIsValid = false;
    } else {
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
                `Send fixed fees valid only upto length(16,2) for ${sendfee.sendFeeCurrency}`
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
                `Send variable fees valid only upto length(16,2) for ${sendfee.sendFeeCurrency}`
              );
              formIsValid = false;
            }
          }

          if (Number(sendfee.sendFixedFees) < 0 || Object.is(Number(sendfee.sendFixedFees), -0)) {
            setsendfixedfeeserrorMessage(
              `Send fixed fees cannot be negative number for ${sendfee.sendFeeCurrency}. `
            );
            formIsValid = false;
          }
          if (Number(sendfee.sendVariableFees) < 0 || Object.is(Number(sendfee.sendVariableFees), -0)) {
            setsendvariablefeeserrorMessage(
              `Send variable fees cannot be negative number for ${sendfee.sendFeeCurrency}. `
            );
            formIsValid = false;
          }
        });
    }

    return formIsValid;
  };

  useEffect(() => {
    getPartnerSendFees();
  }, []);
  var PartnerSendFeeType = 0;
  const getPartnerSendFees = () => {
    setLoading(true);
    PartnerFeesDetailsService.getPartnerSendFeesByPartnerId(
      Number(partnerid),
      "C2C"
    )
      .then((response) => {

        setdefaultsendfeeNewModel(response.data);


        setLoading(false);
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
  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      setUpdateBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };

  return (
    <>

      {loading ? (
        <div className="spinner-class" style={{ display: "flex" }}>
          <ProgressSpinner />
            {/* testing */}
        </div>
      ) : (
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


<div className="edit-content">
            {onboardStatus === "Ready" && type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}
            </div>
          <div className="Fees-container">
            <p className="fees-discription">
              Next lets configure any fees that you want to charge consumers for the send transactions
            </p>

            <div className="Fees-heading">
              <h2>Consumer Send Fees</h2>
            </div>
            {defaultsendfeeNewModel.length >= 0 && (
              <div className="Fees-sending-payment">
                <h4>
                  What do you want to charge your consumers for sending payments?
                </h4>
                <div className="Fees-details-card-1 Fees-details-card">
                  {defaultsendfeeNewModel.map((each: any, index: any) => {
                    if (index == 0) {
                      return (
                        <div className="inner-card-wrapper" >
                          <div className="col-4">
                            <div className="fees-card">
                              <p>Country</p>
                              <h3>{each.countryName}</h3>
                            </div>
                          </div>

                          <div className="col-3">
                            <div className="fees-card currency">
                              <p>Currency</p>
                              <h3>{each.currencyCode}</h3>
                            </div>
                          </div>


                          <div className="fees-card fixed-fee">
                            <p>Fixed Fees</p>
                            <div className="fees-card-inupt">
                              <input
                                type="text"
                                onKeyPress={(evt) => {
                                  const isValidInput = /^\d*\.?\d{0,6}$/.test(evt.key) || evt.key === "Delete" || evt.key === "Backspace";
                                  if (!isValidInput) {
                                    evt.preventDefault();
                                  }
                                }}
                                onPaste={(evt) => {
                                  const pastedText = evt.clipboardData.getData('text/plain');
                                  const isValidInput = /^\d*\.?\d{0,6}$/.test(pastedText);
                                  if (!isValidInput) {
                                    evt.preventDefault();
                                  }
                                }}
                                name="sendFixedFees"
                                id={`feesAmount-${index}`}
                                className="form-control"
                                aria-describedby="text"
                                value={each.sendFixedFees}
                                onChange={(e) => {
                                  onfixedFeeChange(e, index);
                                  setDirtyField(true);
                                }}
                              />
                            </div>
                          </div>


                          <div className="fees-card fixed-fee">
                            <p>Variable Fees</p>
                            <div className="fees-card-inupt">
                              <input
                                type="text"
                                onKeyPress={(evt) => {
                                  const isValidInput = /^\d*\.?\d{0,6}$/.test(evt.key) || evt.key === "Delete" || evt.key === "Backspace";
                                  if (!isValidInput) {
                                    evt.preventDefault();
                                  }
                                }}
                                onPaste={(evt) => {
                                  const pastedText = evt.clipboardData.getData('text/plain');
                                  const isValidInput = /^\d*\.?\d{0,6}$/.test(pastedText);
                                  if (!isValidInput) {
                                    evt.preventDefault();
                                  }
                                }}
                                name="sendVariableFees"
                                id={`feesAmount-${index}`}
                                className="form-control"
                                aria-describedby="text"
                                value={each.sendVariableFees}
                                onChange={(e) => {
                                  onVariableFeeChange(e, index);
                                  setDirtyField(true);
                                }}
                              />
                            </div>
                          </div>


                        </div>

                      );
                    }
                  })}

                  {latestsendfeeNewModel.length >= 2 ? null : (<div className="error-card-3 ">
                    <div className="error-message-col">
                      {sendfixedfeeserrorMessage !== null &&
                        sendfixedfeeserrorMessage.length > 0 && (
                          <span className="error-msg">
                            {sendfixedfeeserrorMessage}
                          </span>
                        )}
                    </div>

                    <div className="error-message-col">
                      {sendvariablefeeserrorMessage !== null &&
                        sendvariablefeeserrorMessage.length > 0 && (
                          <span className="error-msg">
                            {sendvariablefeeserrorMessage}
                          </span>
                        )}
                    </div>
                  </div>)}

                </div>
              </div>
            )}

            <hr></hr>

            <>
              {defaultsendfeeNewModel.length > 1 && (

                <div className="Fees-sending-payment Country-select">
                  <h4>
                    Will the send fees for consumers be the same in the following
                    countries?
                  </h4>
                  <div className="Fees-details-card  Fees-details-card-2" >
                    {defaultsendfeeNewModel.map((each: any, index: any) => {
                      if (index != 0) {
                        return (

                          <div className="inner-card-wrapper" key={index} >
                            <div className="fees-card" style={{ width: '150px', marginRight: '20px' }}>
                              <p>Country</p>
                              <h3>{each.countryName}</h3>
                            </div>
                            <div className="fees-card" style={{ width: '150px', marginRight: '20px' }}>
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
                                  name="sendFixedFees"
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
                                  id={`variablefees-${index}`}
                                  onKeyPress={(evt) => {
                                    if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                      evt.preventDefault();
                                    }
                                  }}
                                  onPaste={(evt) => {
                                    const pastedText = evt.clipboardData.getData('text/plain');
                                    const isValidInput = /^\d*\.?\d{0,6}$/.test(pastedText);
                                    if (!isValidInput) {
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
                                // aria-describedby="text"
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

            {/* onclick cancel button popup */}
            {displaypopup ? (
              <>
                <div className="popup-body">
                  <div className="Cancel-popup">
                    <div className="text-center ">
                      <div className="awesome-text">
                        <h4>Are you sure you want to cancel?</h4>
                        <p> All unsaved changes will be lost.</p>
                      </div>
                    </div>
                    <div className="payment-screen-btn">
                      <button
                        className="btn btn-cancel second-btn "
                        onClick={OnPopupClose}
                      >
                        {" "}
                        No
                      </button>
                      <button
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

            <div className="button-section">
              <div className="bottom-btns">
                <Button
                  label="Back"
                  loading={backbuttonLoading}
                  className="btn btn-back second-btn"
                  onClick={onBackOkClick}
                />
                {Number(status) === 8 ? (
                  <>
                    {/* <button
                      type="button"
                      onClick={onNextClick}
                      className="btn btn-next second-btn "
                    >
                      Next
                    </button> */}
                    <Button
                      iconPos="left"
                      label=" Save and Continue"
                      loading={buttonLoading}
                      className="btn btn-continue second-btn"
                      onClick={onAddClick}
                    />
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn btn-back second-btn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>


                    <button
                      type="button"
                      onClick={onNextClick}
                      className="btn btn-next second-btn "
                    >
                      Next
                    </button>
                    {/* <Button
                      iconPos="left"
                      label=" Save and Continue"
                      loading={buttonLoading}
                      className="btn btn-continue second-btn"
                      onClick={onAddClick}
                    /> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </Scrollbars>
      )}
    </>
  );
};

export default C2CSendFees;
