import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
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

const C2CSendFees: React.FC<any> = ({
  onSaveAndContinueClick,
  partnerType,
  // updateBtnShow,
  // setUpdateBtnShow,
  onBackClick,
  partnerPaymentRole,
  setActiveIndex,
  setShowB2B,
  setShowC2C,
  readOnly

}) => {
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const [defaultreceivefeeNewModel, setdefaultreceivefeeNewModel] = useState<any[]>([]);

  const [latestreceivefeeNewModel, setlatestreceivefeeNewModel]: any = useState([]);
  const [fristReceivefeeNewModel, setfristreceivefeeNewModel] = useState<any[]>([]);
  const [FinalReceiveFeeData, setFinalReceiveFeeData] = useState<any>();;
  const [primryreceivefeeNewModel, setprimryreceivefeeNewModel] = useState<any[]>([]);
  const [otherreceivefeeNewModel, setotherreceivefeeNewModel] = useState<any[]>([]);
  const [readonly, setReadOnly] = useState(true);
  const [defaultsendfeeNewModel, setdefaultsendfeeNewModel] = useState<any[]>([]);
  const [sendfeeNewModel, setsendfeeNewModel] = useState<any[]>([]);
  const [editingMode, setEditingMode] = useState(false);
  const [displayCancelPopup, setDisplayCancelPopup] = useState(false);
  // console.log(updateBtnShow)
  const [sendfixedfeeserrorMessage, setsendfixedfeeserrorMessage] =
    useState("");
  const [sendvariablefeeserrorMessage, setsendvariablefeeserrorMessage] =
    useState("");
  const [currency, setCurrency] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const [backbuttonLoading, setBackButtonLoading] = useState(false);
  const { partnerid, type } = useParams();
  const toast = useRef<Toast>(null);
  const [data, setData] = useState(null);

  const [visible, setVisible] = useState<boolean>(false);
  const [updatepopup, setUpdatePopup] = useState(false);
  const onboardStatus = sessionStorage.getItem("onboardStatus");
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [displaypopup, setDisplayPopup] = useState(false);
  const [dirtyfield, setDirtyField] = useState(false);
  const navigate = useNavigate();
  const [feesAmount, setFeesAmount] = useState("");
  const [latestsendfeeNewModel, setlatestsendfeeNewModel]: any = useState([]);
  const [variablefees, setVariblaeFees] = useState("");

  const onNextClick = () => {
    onSaveAndContinueClick("N");
  };

  useEffect(() => {
    if (defaultreceivefeeNewModel && defaultreceivefeeNewModel[0] && defaultreceivefeeNewModel[0].deliveryType === null) {
      const createRecivedFeeForCountry = (countryInfo: any) => {
        const deliveryTypes: string[] = JSON.parse(countryInfo.deliveryTypeNew);
        return deliveryTypes.map(deliveryType => {
          let deliveryTypeNo = 0;
          if (deliveryType === 'RTP') {
            deliveryTypeNo = 1;
          } else if (deliveryType === 'BankAccount') {
            deliveryTypeNo = 2;
          } else if (deliveryType === 'Card') {
            deliveryTypeNo = 3;
          } else if (deliveryType === 'MobileWallet') {
            deliveryTypeNo = 4;
          } else if (deliveryType === 'CashPickup') {
            deliveryTypeNo = 5;
          }
          return {
            ...countryInfo,
            deliveryType,
            deliveryTypeNo
          };
        });
      }
      const newFreeDate: any[] = [];
      defaultreceivefeeNewModel.forEach((countryInfo: any) => {
        const countryInfos = createRecivedFeeForCountry(countryInfo);
        newFreeDate.push(...countryInfos);
      });
      setfristreceivefeeNewModel(newFreeDate);

    } else {

      const updatedModel = defaultreceivefeeNewModel.map((item: any) => {
        let deliveryTypeNo = 0;
        switch (item.deliveryType) {
          case 'RTP':
            deliveryTypeNo = 1;
            break;
          case 'BankAccount':
            deliveryTypeNo = 2;
            break;
          case 'Card':
            deliveryTypeNo = 3;
            break;
          case 'MobileWallet':
            deliveryTypeNo = 4;
            break;
          case 'CashPickup':
            deliveryTypeNo = 5;
            break;
          default:
            deliveryTypeNo = 0;
            break;
        }

        return { ...item, deliveryTypeNo };
      });

      setfristreceivefeeNewModel(updatedModel);


    }
  }, [defaultreceivefeeNewModel]);







  // const onFixedFeeChangePrimary = (e: any, index: number) => {
  //   const updatedModel = [...otherreceivefeeNewModel];
  //   updatedModel[index].receiveFixedFees = e.target.value;
  //   setotherreceivefeeNewModel(updatedModel);
  //   setDirtyField(true);
  // };

  const onFixedFeeChangePrimary = (e: any, index: any) => {
    const newValue = e.target.value;

    // Update the corresponding item in the primryreceivefeeNewModel array
    setprimryreceivefeeNewModel(prevModel => {
      const updatedModel = [...prevModel];
      updatedModel[index] = {
        ...updatedModel[index],
        receiveFixedFees: newValue
      };
      return updatedModel;
    });
  };

  const onFixedFeeChangeOther = (e: any, index: number) => {
    const updatedModel = [...otherreceivefeeNewModel];
    updatedModel[index].receiveFixedFees = e.target.value;
    setotherreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };
  // const onVariableFeeChangePrimary = (e: any, index: number) => {
  //   const updatedModel = [...otherreceivefeeNewModel];
  //   updatedModel[index].receiveVariableFees = e.target.value;
  //   setotherreceivefeeNewModel(updatedModel);
  //   setDirtyField(true);
  // };
  
  const onVariableFeeChangePrimary = (e: any, index: number) => {
    const updatedModel = [...primryreceivefeeNewModel];
    updatedModel[index].receiveVariableFees = e.target.value;
    setprimryreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };
  

 

  const onVariableFeeChangeOther = (e: any, index: number) => {
    const updatedModel = [...otherreceivefeeNewModel];
    updatedModel[index].receiveVariableFees = e.target.value;
    setotherreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };

  const ReceiveFeesClick = (e: any, index: any) => {
    const currentModel = otherreceivefeeNewModel[index];

    if (currentModel) {
      const newArr = otherreceivefeeNewModel.map((item) => {
        if (item === currentModel) {
          const primaryModel = primryreceivefeeNewModel.find(model => model.deliveryType === item.deliveryType);
          if (primaryModel) {
            // Update the current model with values from primaryModel
            return {
              ...item,
              receiveFixedFees: primaryModel.receiveFixedFees,
              receiveVariableFees: primaryModel.receiveVariableFees
            };
          }
        }
        return item;
      });

      setotherreceivefeeNewModel(newArr);
    }
  };

  const RemoveReceiveFeesClick = (
    e: any,
    // id: any,
    index: number) => {
    const currentModel = otherreceivefeeNewModel[index];

    if (currentModel) {
      const newArr = otherreceivefeeNewModel.map((item) => {
        if (item === currentModel) {
          const primaryModel = primryreceivefeeNewModel.find(model => model.deliveryType === item.deliveryType);
          if (primaryModel) {
            // Update the current model with values from primaryModel
            return {
              ...item,
              receiveFixedFees: 0,
              receiveVariableFees: 0
            };
          }
        }
        return item;
      });

      setotherreceivefeeNewModel(newArr);
    }
  };

  const [receiveDataInfoModel, setreceiveDataInfoModel] = useState<any[]>([]);
  useEffect(() => {
    if (otherreceivefeeNewModel) {
      otherreceivefeeNewModel.forEach((item: any) => {
        const matchingItem = fristReceivefeeNewModel.find((frItem: any) => frItem.countryCode === item.countryCode && frItem.deliveryType === item.deliveryType);
        if (matchingItem) {
          matchingItem.receiveFixedFees = item.receiveFixedFees;
          matchingItem.receiveVariableFees = item.receiveVariableFees;
        }
        setreceiveDataInfoModel([...fristReceivefeeNewModel]);
      });

    }
  }, [otherreceivefeeNewModel])

  // useEffect(() => {
  //   const payload = primryreceivefeeNewModel.map(model => ({
  //     id: model.id,
  //     partnerId: model.partnerId,
  //     partnerReceiveFeeType: model.partnerReceiveFeeType,
  //     partnerDeliveryType: parseInt(model.deliveryTypeNo, 10),
  //     countryCode: model.countryCode,
  //     receiveFeeCurrency: model.receiveFeeCurrency,
  //     receiveFixedFees: model.receiveFixedFees ? model.receiveFixedFees : 0,
  //     receiveVariableFees: model.receiveVariableFees ? model.receiveVariableFees : 0,
  //     partnerReceiveFeeTier: null,
  //     createdBy: model.partnerId,
  //     updatedBy: model.partnerId,
  //     deletedBy: 0
  //   }));
  //   setFinalReceiveFeeData(payload);
  // }, [primryreceivefeeNewModel])

  console.log("primryreceivefeeNewModel", primryreceivefeeNewModel)
  console.log("otherreceivefeeNewModel", otherreceivefeeNewModel)
  console.log("FinalReceiveFeeData", FinalReceiveFeeData)

  useEffect(() => {
    const combinedPayload = [
      ...primryreceivefeeNewModel.map((model) => {
        const deliveryType = isNaN(parseInt(model.deliveryTypeNo, 10))
          ? 0
          : parseInt(model.deliveryTypeNo, 10);

        return {

          id: model.id,
          partnerId: model.partnerId,
          partnerReceiveFeeType: model.partnerReceiveFeeType,
          partnerDeliveryType: deliveryType,
          countryCode: model.countryCode,
          receiveFeeCurrency: model.receiveFeeCurrency,
          receiveFixedFees: model.receiveFixedFees || 0,
          receiveVariableFees: model.receiveVariableFees || 0,
          partnerReceiveFeeTier: model.sendVariableFees,
          createdBy: model.partnerId,
          updatedBy: model.partnerId,
          deletedBy: 0,
        };
      }),
      ...otherreceivefeeNewModel.map((model) => {
        const deliveryType = isNaN(parseInt(model.deliveryTypeNo, 10))
          ? 0
          : parseInt(model.deliveryTypeNo, 10);

        return {
          id: model.id,
          partnerId: model.partnerId,
          partnerReceiveFeeType: model.partnerReceiveFeeType,
          partnerDeliveryType: deliveryType,
          countryCode: model.countryCode,
          receiveFeeCurrency: model.receiveFeeCurrency,
          receiveFixedFees: model.receiveFixedFees || 0,
          receiveVariableFees: model.receiveVariableFees || 0,
          partnerReceiveFeeTier: model.sendVariableFees,
          createdBy: model.partnerId,
          updatedBy: model.partnerId,
          deletedBy: 0,
        };
      }),
    ];

    setFinalReceiveFeeData(combinedPayload);

  }, [primryreceivefeeNewModel, otherreceivefeeNewModel]);



  useEffect(() => {
    getReceiveFees();
  }, []);
  const getReceiveFees = () => {
    setLoading(true);
    PartnerFeesDetailsService.getPartnerReceiveFeesByPartnerId(Number(partnerid), "C2C").then((response) => {
      setdefaultreceivefeeNewModel(response.data);
      setLoading(false);
    }).catch((error) => {
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
          summary: "Error while getting partner send fees details.",
          life: 3000,
        });
      }
      // setLoading(false);
    });
  };




  const OnPopupClose = () => {
    setDisplayPopup(false);
  };

  const OnPopupOk = () => {


    onAddClick();

    setDisplayPopup(false);
  };



  const onSaveClickpopup = () => {


    setDisplayPopup(true);
  };
  const onAddClick = () => {

    setButtonLoading(true);
    PartnerFeesDetailsService.addPartnerReceiveFees(FinalReceiveFeeData)
      .then((data) => {
        toast.current?.show({
          severity: "success",
          summary: "Send fees added successfully",
          life: 3000,
        });
        getReceiveFees();
        setButtonLoading(false);
        // onSaveAndContinueClick("N");
      })
    //********************* */

    const filterdata = FinalReceiveFeeData;
    const modifiedFinalData = filterdata.map(
      (item: any, index: any) => ({ ...item, partnerReceiveFeeType: 2 })

    );
    PartnerFeesDetailsService.addPartnerReceiveFees(modifiedFinalData)

      .then((data) => {
        toast.current?.show({
          severity: "success",
          summary: "Send fees added successfully",
          life: 3000,
        });
        getReceiveFees();
        setButtonLoading(false);
        onSaveAndContinueClick("N");
      })

      //******************* */
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
            summary: "Error while adding partner send fees.",
            life: 3000,
          });
        }
        setButtonLoading(false);
      });

  };





  const onVariableFeeChange = (e: any, index: number) => {
    let newArr: any = [...fristReceivefeeNewModel];
    newArr[index][e.target.name] = e.target.value;
    setfristreceivefeeNewModel(newArr);

  };



  const onfixedFeeChange = (e: any, index: number) => {
    let newArr: any = [...fristReceivefeeNewModel];
    newArr[index][e.target.name] = e.target.value;
    setfristreceivefeeNewModel(newArr);

  };


  // const onNextClick = () => {
  //   if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
  //     if (partnerType?.includes("C2C")) {
  //       if (partnerPaymentRole === 1) {
  //         navigate(`/admin/partner/admin/${partnerid}`);
  //       } else {
  //         onSaveAndContinueClick("N");
  //       }
  //     }
  //   } else if (partnerPaymentRole === 3) {
  //     setActiveIndex(1);
  //   }

  // };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
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

          // if (( sendfee.sendFixedFees <  0 ||  CheckNull(sendfee.sendFixedFees) )) {
          //   setsendfixedfeeserrorMessage(
          //     `Please enter send fixed fees for ${sendfee.sendFeeCurrency} `
          //   );
          //   formIsValid = false;
          // }
          // if ((sendfee.sendVariableFees <null0 || CheckNull(sendfee.sendVariableFees) ) ) {

          //   // setsendvariablefeeserrorMessage(
          //   //   `Please enter send variable fees for ${sendfee.sendFeeCurrency} `
          //   // );
          //   formIsValid = false;
          // }
          if (Number(sendfee.sendFixedFees) < 0) {
            setsendfixedfeeserrorMessage(
              `Send fixed fees cannot be negative number for ${sendfee.sendFeeCurrency}`
            );
            formIsValid = false;
          }
          if (Number(sendfee.sendVariableFees) < 0) {
            setsendvariablefeeserrorMessage(
              `Send variable fees cannot be negative number for ${sendfee.sendFeeCurrency}`
            );
            formIsValid = false;
          }
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

  const ErrorMessageEmptyModel = () => {
    setsendfixedfeeserrorMessage("");
    setsendvariablefeeserrorMessage("");
  };




  const reject = () => {
    setDisplayCancelPopup(false);
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



        getReceiveFees();
        setButtonLoading(false);
        if (partnerPaymentRole === 1 || partnerPaymentRole === 2) {
          if (partnerType?.includes("C2C")) {
            if (partnerPaymentRole === 1) {
              navigate(`/admin/partner/admin/${partnerid}`);
            } else {
              onSaveAndContinueClick("N");
            }
          }
        } else if (partnerPaymentRole === 3) {
          setActiveIndex(1);
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
            summary: "Error while adding partner send fees.",
            life: 3000,
          });
        }
        setButtonLoading(false);
      });
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

  const handleClose = () => {
    { type === "A" ? setUpdateBtnShow(true) : setUpdateBtnShow(false); }
    if (dirtyfield === true) {
      setDisplayPopup(true);
    }
    ErrorMessageEmptyModel();
  };




  const onSaveClick = () => {
    // onAddClick();

    setDisplayCancelPopup(false);
  };

  useEffect(() => {

    const filteredPrimaryData = fristReceivefeeNewModel.filter((obj: any) => obj.countryCode === fristReceivefeeNewModel[0]?.countryCode);
    setprimryreceivefeeNewModel(filteredPrimaryData);

    const filteredRemainingData = fristReceivefeeNewModel.filter((obj: any) => obj.countryCode !== fristReceivefeeNewModel[0]?.countryCode);
    setotherreceivefeeNewModel(filteredRemainingData);
  }, [fristReceivefeeNewModel]);


  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditingMode(true);
      setReadOnly(false);
    }, 1000);
  };

  const onCancelEdit = () => {
    setDisplayCancelPopup(true)
  };

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
          autoHeightMin={500}
          autoHeightMax={1000}
          thumbMinSize={30}
          universal={true}
        >
          <>

            <div className="edit-content">

              {/* {onboardStatus === "Ready" && type === "V" ? ( */}
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
                Next let's configure any fees that you want to charge consumers for the receive transactions
              </p>
              {/* testing */}
              <div className="Fees-heading">
                <h2>Consumer Receive Fees</h2>
              </div>
              {primryreceivefeeNewModel.length >= 0 && (
                <div className="Fees-sending-payment">
                  <h4>What do you want to charge your consumers for sending payments?</h4>

                  <div className="Fees-details-card Fees-details-card-1">
                    {primryreceivefeeNewModel ? primryreceivefeeNewModel.map((each, index) => (
                      <div className="inner-card-wrapper" key={index}>
                        <div className="col-2">
                          <div className="fees-card">
                            <p>Country</p>
                            <h3>{each.countryName}</h3>
                          </div>
                        </div>

                        <div className="col-2">
                          <div className="fees-card currency">
                            <p>Currency</p>
                            <h3>{each.receiveFeeCurrency}</h3>
                          </div>
                        </div>

                        <div className="col-2">
                          <div className="fees-card currency">
                            <p>Delivery Type</p>
                            <h3>{each.deliveryType}</h3>
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
                              name="receiveFixedFees"
                              id={`feesAmount-${index}`}
                              className="form-control1"
                              aria-describedby="text"
                              value={each.receiveFixedFees}
                              onChange={(e) => onFixedFeeChangePrimary(e, index)}
                            />
                          </div>
                        </div>


                        
                        {/* <div className="fees-card fixed-fee">
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
                                // Allow only numeric input and a single decimal point with up to 6 decimals
                                if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                  evt.preventDefault();
                                }
                              }}
                              className="form-control"
                              name="receiveVariableFees"
                              value={each.receiveVariableFees}
                              onChange={(e) => onVariableFeeChangePrimary(e, index)}
                              aria-describedby="text"
                            />
                            <span className="feespercent">%</span>
                          </div>
                        </div> */}
   
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

                                    if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                      evt.preventDefault();
                                    }
                                  }}
                                  className="form-control"
                                  name="receiveVariableFees"
                                  // value={currency ? currency.sendVariableFees: 0}
                                  value={each.receiveVariableFees}

                                  // onChange={(e: any) => {
                                  //   onVariableFeeChange(e, index);
                                  //   setDirtyField(true);
                                  // }}
                                  onChange={(e: any) => onVariableFeeChangePrimary(e, index)}
                                  aria-describedby="text"
                                />
                                <span className="feespercent">%</span>
                              </div>
                            </div>


                      </div>
                    )) : null}

                  </div>
                </div>
              )}

              <hr></hr>
              {otherreceivefeeNewModel.length > 1 && (
                <div className="Fees-sending-payment Country-select">
                  <h4>
                    Will the send fees for consumers be the same in the following  countries?
                  </h4>

                  <div className="Fees-details-card  Fees-details-card-2">
                    {otherreceivefeeNewModel ? otherreceivefeeNewModel.map((each: any, index: any) => (
                      <div className="inner-card-wrapper" key={index}>
                        <div className="col-2">
                          <div className="fees-card">
                            <p>Country</p>
                            <h3>{each.countryName}</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="fees-card">
                            <p>Currency</p>
                            <h3>{each.receiveFeeCurrency}</h3>
                          </div>
                        </div>
                        <div className="col-2">
                          <div className="fees-card currency">
                            <p>Delivery Type</p>
                            <h3>{each.deliveryType}</h3>
                          </div>
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
                                  latestreceivefeeNewModel.yescheckedFees
                                }
                                onClick={(e: any) =>
                                  ReceiveFeesClick(e, index)
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
                                  latestreceivefeeNewModel.nocheckedFees
                                  // defaultsendfeeNewModel.nocheckedFees

                                }
                                onClick={(e: any) =>
                                  RemoveReceiveFeesClick(e, index)
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
                              name="receiveFixedFees"
                              id={`feesAmount-${index}`}
                              className="form-control"
                              aria-describedby="text"
                              value={each.receiveFixedFees}

                              // onChange={(e) => {
                              //   onfixedFeeChange(
                              //     e,
                              //     model.id,
                              //     model.typeId,
                              //     model.receiveFeeCurrency,
                              //     model.dt,
                              //     "Primary",
                              //     model.firstModelCurrency

                              //   );

                              // onChange={(e: any) => {
                              //   onfixedFeeChange(e, index);
                              //   setDirtyField(true);
                              // }}
                              onChange={(e: any) => onFixedFeeChangeOther(e, index)}
                            />
                          </div>
                        </div>
                        {/* 
                            } )
                        : ""  } */}

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

                                if (!/^\d*\.?\d{0,6}$/.test(pastedText)) {
                                  evt.preventDefault();
                                }
                              }}
                              className="form-control"
                              name="receiveVariableFees"
                              // value={currency ? currency.sendVariableFees: 0}
                              value={each.receiveVariableFees}

                              // onChange={(e: any) => {
                              //   onVariableFeeChange(e, index);
                              //   setDirtyField(true);
                              // }}
                              onChange={(e: any) => onVariableFeeChangeOther(e, index)}
                              aria-describedby="text"
                            />
                            <span className="feespercent">%</span>
                          </div>
                        </div>
                      </div>
                    )) : null}
                  </div>


                </div>
              )}

              <div className="button-section">
                <div className="bottom-btns">
                  {editingMode ? (
                    <>
                      <Button
                        label="Back"
                        className="btn btn-back second-btn"
                        onClick={onBackClick}
                      />
                      <button
                        type="button"
                        className="btn btn-back second-btn"
                        onClick={onCancelEdit}
                      >
                        Cancel
                      </button>
                      <Button
                        iconPos="left"
                        label=" Save and Continue"
                        loading={buttonLoading}
                        className="btn btn-continue second-btn"
                        onClick={() => onSaveClickpopup()}
                      />
                    </>
                  ) : (
                    <>
                      <Button
                        label="Back"
                        className="btn btn-back second-btn"
                        onClick={onBackClick}
                      />
                      {Number(status) === 8 && (
                        <button
                          type="button"
                          onClick={onNextClick}
                          className="btn btn-next second-btn"
                        >
                          Next
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>



            </div>

          </>
        </Scrollbars>

        // {/* </Scrollbars> */}
      )}
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

export default C2CSendFees;
