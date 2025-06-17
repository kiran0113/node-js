import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CurrenciesService } from "../../../../services/Partner/Currencies/Currencies";
import { Logout } from "../../../../utils/AccountUtils";
import BRLimg from "../../../../assets/images/BRLimg.svg";
import CANADAimg from "../../../../assets/images/canada-flag.svg";
import INDimg from "../../../../assets/images/india.svg";
import USDlogo from "../../../../assets/images/USDImg.svg";

import AUTimg from "../../../../assets/images/AUTimg.svg";
import BELimg from "../../../../assets/images/BELimg.svg";
import CYPimg from "../../../../assets/images/CYPimg.svg";
import ESTimg from "../../../../assets/images/ESTimg.svg";
import FINimg from "../../../../assets/images/FINimg.svg";
import { PartnershipDetailsService } from "../../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { getTabActiveIndex } from "../../../../utils/utils";
import { ProgressSpinner } from "primereact/progressspinner";
import { PartnerFeesDetailsService } from "../../../../services/Partner/Fees/Fees";
import { Button } from "primereact/button";
import Scrollbars from "react-custom-scrollbars-2";
import C2CReceiveFees from "./C2CReceiveFee";
import { confirmDialog } from "primereact/confirmdialog";

function IsValidateObject(formIsValid: boolean, finalData: any) {
  return { formIsValid, finalData };
}
const ReceiveFees: React.FC<any> = ({
  onSaveAndContinueClick,
  partnerDeliveryType,
  partnerType,
  receiverBackButton,
  receiverBackButtonValue,
  setActiveIndex,
  partnerPaymentRole,
}) => {
  const [currency, setCurrency] = useState(null);
  const [visible, setVisible] = useState<boolean>(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const onboardStatus = sessionStorage.getItem("onboardStatus");
  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const { partnerid, type } = useParams();

  const [showB2B, setShowB2B] = useState(false);

  const [showBelowGrid, setShowBelowGrid] = useState(false);

  const [showC2C, setShowC2C] = useState(false);

  const [backbuttonLoading, setBackButtonLoading] = useState(false);
  const [showB2C, setShowB2C] = useState(false);

  const [feesAmount, setFeesAmount] = useState("");

  const [updated, setUpdated] = useState(feesAmount);

  const [data, setData] = useState(null);

  const [updatepopup, setUpdatePopup] = useState(false);

  const [displaypopup, setDisplayPopup] = useState(false);
  const [displayCancelPopup, setDisplayCancelPopup] = useState(false);
  const [dirtyfield, setDirtyField] = useState(false);

  const [receivefixedfeeserrorMessage, setreceivefixedfeeserrorMessage] =
    useState("");
  const [receivevariablefeeserrorMessage, setreceivevariablefeeserrorMessage] =
    useState("");

  const [firstModelCurrency, setfirstModelCurrency] = useState("");
  const [countryInfo, setCountryInfo] = useState<any[]>([]);

  const [sendCurrencyFees, setSendCurrencyFees] = useState("");

  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [latestreceivefeeNewModel, setlatestreceivefeeNewModel]: any = useState(
    []
  );

  const [latestReceiveFeeModel, setlatestReceiveFeeModel]: any = useState([]);

  const [deliveyTypes, setdeliveyTypes]: any = useState([]);

  // const [readonly, setReadOnly] = useState(true);
  const [readonly, setReadOnly] = useState(false);


  const [defaultreceivefeeNewModel, setdefaultreceivefeeNewModel] = useState<any[]>([]);
  const [fristReceivefeeNewModel, setfristreceivefeeNewModel] = useState<any[]>([]);
  const [primryreceivefeeNewModel, setprimryreceivefeeNewModel] = useState<any[]>([]);
  const [otherreceivefeeNewModel, setotherreceivefeeNewModel] = useState<any[]>([]);
  const [finalReceiveFeeData, setfinalReceiveFeeData] = useState<any>();;
  const [editingMode, setEditingMode] = useState(false);
  const [defaultHardcodedCurrenciesList, setDefaultHardcodedCurrenciesList] = useState<any[]>([]);
  const [variablefees, setVariblaeFees] = useState("");
  const [updatedVariableFee, setUpdatedVariableFee] = useState(variablefees);
  const [FinalReceiveFeeData, setFinalReceiveFeeData] = useState<any>();;





  const onFixedFeeChangePrimary = (e: any, index: number) => {
    const updatedModel = [...primryreceivefeeNewModel];
    updatedModel[index].receiveFixedFees = e.target.value;
    setprimryreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };

  const onVariableFeeChangePrimary = (e: any, index: number) => {
    const updatedModel = [...primryreceivefeeNewModel];
    updatedModel[index].receiveVariableFees = e.target.value;
    setprimryreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };
  

  const onFixedFeeChangeOther = (e: any, index: number) => {
    const updatedModel = [...otherreceivefeeNewModel];
    updatedModel[index].receiveFixedFees = e.target.value;
    setotherreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };


  const onVariableFeeChangeOther = (e: any, index: number) => {
    const updatedModel = [...otherreceivefeeNewModel];
    updatedModel[index].receiveVariableFees = e.target.value;
    setotherreceivefeeNewModel(updatedModel);
    setDirtyField(true);
  };




  // fristReceivefeeNewModel ? fristReceivefeeNewModel.map((each: any, index: any) => {
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
  //dynamic country integration end

  const SendFeesClick = (
    e: any,
    id: any,
    typeId: any,
    receiveFeeCurrency: string,
    modelDt: string
  ) => {
    let newArr: any = [...latestReceiveFeeModel];

    var valueToAssignObject: any;

    newArr.forEach((x: any) => {
      if (
        x.id == id &&
        x.typeId == typeId &&
        x.receiveFeeCurrency == latestReceiveFeeModel[0].receiveFeeCurrency &&
        x.dt == modelDt
      ) {
        valueToAssignObject = x;
        return;
      }
    });

    newArr.forEach((x: any, index: any) => {
      if (
        x.id == id &&
        x.typeId == typeId &&
        x.receiveFeeCurrency == receiveFeeCurrency &&
        x.dt == modelDt
      ) {
        x.receiveFixedFees = valueToAssignObject.receiveFixedFees;
        x.receiveVariableFees = valueToAssignObject.receiveVariableFees;
      }
    });

    setlatestreceivefeeNewModel(newArr);
  };
  const RemoveSendFeesClick = (
    e: any,
    id: any,
    typeId: any,
    receiveFeeCurrency: string,
    modelDt: string
  ) => {
    let newArr: any = [...latestreceivefeeNewModel];

    newArr.forEach((x: any, index: any) => {
      if (
        x.id == id &&
        x.typeId == typeId &&
        x.receiveFeeCurrency == receiveFeeCurrency &&
        x.dt == modelDt
      ) {
        x.receiveFixedFees = "";
        x.receiveVariableFees = "";
      }

    });


    setlatestreceivefeeNewModel(newArr);
  };

  const ErrorMessageEmptyModel = () => {
    setreceivefixedfeeserrorMessage("");
    setreceivevariablefeeserrorMessage("");
  };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };


  const [receiveDataInfoModel, setreceiveDataInfoModel] = useState<any[]>([]);
  useEffect(() => {
    if (primryreceivefeeNewModel) {
      primryreceivefeeNewModel.forEach((item: any) => {
        const matchingItem = fristReceivefeeNewModel.find((frItem: any) => frItem.countryCode === item.countryCode && frItem.deliveryType === item.deliveryType);
        if (matchingItem) {
          matchingItem.receiveFixedFees = item.receiveFixedFees;
          matchingItem.receiveVariableFees = item.receiveVariableFees;
        }
        setreceiveDataInfoModel([...fristReceivefeeNewModel]);
      });

    }
  }, [primryreceivefeeNewModel])

  console.log("fristReceivefeeNewModel", fristReceivefeeNewModel)

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


  console.log("primryreceivefeeNewModel",primryreceivefeeNewModel)
  console.log("otherreceivefeeNewModel",otherreceivefeeNewModel)
  console.log("FinalReceiveFeeData",FinalReceiveFeeData)
  
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
  //     partnerReceiveFeeTier: model.sendVariableFees,
  //     createdBy: model.partnerId,
  //     updatedBy: model.partnerId,
  //     deletedBy: 0
  //   }));
  //   setFinalReceiveFeeData(payload);

  // }, [primryreceivefeeNewModel])

  useEffect(() => {
    // Combine both the primary and other receive fee models
    const combinedPayload = [
      ...primryreceivefeeNewModel.map((model) => {
        // Ensure partnerDeliveryType is a valid integer for both models
        const deliveryType = isNaN(parseInt(model.deliveryTypeNo, 10))
          ? 0 // default to 0 if not a valid number
          : parseInt(model.deliveryTypeNo, 10);
  
        return {
          id: model.id,
          partnerId: model.partnerId,
          partnerReceiveFeeType: model.partnerReceiveFeeType,
          partnerDeliveryType: deliveryType,
          countryCode: model.countryCode,
          receiveFeeCurrency: model.receiveFeeCurrency,
          receiveFixedFees: model.receiveFixedFees || 0,  // Default to 0 if undefined
          receiveVariableFees: model.receiveVariableFees || 0,  // Default to 0 if undefined
          partnerReceiveFeeTier: model.sendVariableFees,
          createdBy: model.partnerId,
          updatedBy: model.partnerId,
          deletedBy: 0,
        };
      }),
      ...otherreceivefeeNewModel.map((model) => {
        // Ensure partnerDeliveryType is a valid integer for both models
        const deliveryType = isNaN(parseInt(model.deliveryTypeNo, 10))
          ? 0 // default to 0 if not a valid number
          : parseInt(model.deliveryTypeNo, 10);
  
        return {
          id: model.id,
          partnerId: model.partnerId,
          partnerReceiveFeeType: model.partnerReceiveFeeType,
          partnerDeliveryType: deliveryType,
          countryCode: model.countryCode,
          receiveFeeCurrency: model.receiveFeeCurrency,
          receiveFixedFees: model.receiveFixedFees || 0,  // Default to 0 if undefined
          receiveVariableFees: model.receiveVariableFees || 0,  // Default to 0 if undefined
          partnerReceiveFeeTier: model.sendVariableFees,
          createdBy: model.partnerId,
          updatedBy: model.partnerId,
          deletedBy: 0,
        };
      }),
    ];
  
    // Set the final data to the state after combining the primary and other models
    setFinalReceiveFeeData(combinedPayload);
  
  }, [primryreceivefeeNewModel, otherreceivefeeNewModel]);  // Run effect whenever either model changes
  

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
    console.log("FinalReceiveFeeData===>", FinalReceiveFeeData)
    PartnerFeesDetailsService.addPartnerReceiveFees(FinalReceiveFeeData).then((data) => {


      toast.current?.show({
        severity: "success",
        summary: "Send fees added successfully",
        life: 3000,
      });

      getReceiveFees();
      setButtonLoading(false);

      if (
        (partnerPaymentRole === 2 &&
          partnerType?.includes("B2B") &&
          partnerType?.includes("B2C")) ||
        (partnerPaymentRole === 3 &&
          partnerType?.includes("B2B") &&
          partnerType?.includes("B2C"))
      ) {
        setShowB2B(false);
        setShowC2C(true);
        setShowB2C(true);
      } else if (partnerPaymentRole === 3 && partnerType?.includes("B2C")) {
        setShowB2B(false);
        setShowC2C(true);
        setShowB2C(true);
      } else if (partnerType?.includes("C2C")) {
        onNextClick();
      } else {
        onSaveAndContinueClick("N");
      }

      // if (partnerType?.includes("C2C")) {
      //   onNextClick();
      // } else {
      //   onSaveAndContinueClick("N");
      // }
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

  // };

  const onSaveClick = () => {
    // onAddClick();

    setDisplayCancelPopup(false);
  };
  const reject = () => {
    setDisplayCancelPopup(false);
  };

  useEffect(() => {
    getReceiveFees();
  }, []);
  const getReceiveFees = () => {
    setLoading(true);
    PartnerFeesDetailsService.getPartnerReceiveFeesByPartnerId(Number(partnerid), "B2B").then((response) => {
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
  const onNextClick = () => {
    if (
      (partnerPaymentRole === 2 &&
        partnerType?.includes("B2B") &&
        partnerType?.includes("B2C")) ||
      (partnerPaymentRole === 3 &&
        partnerType?.includes("B2B") &&
        partnerType?.includes("B2C"))
    ) {
      setShowB2B(false);
      setShowC2C(true);
    } else if (partnerPaymentRole === 3 && partnerType?.includes("B2C")) {
      setShowB2B(false);
      setShowC2C(true);
    } else if (partnerType?.includes("C2C")) {
      setShowB2B(false);
      setShowC2C(true);
    } else {
      onSaveAndContinueClick("N");
    }

  };


  const onBackClick = () => {
    setBackButtonLoading(true);
    setTimeout(() => {
      onSaveAndContinueClick("B");
    }, 1000);
  };

  const onBussineScreenBack = () => {
    setBackButtonLoading(true);
    if (partnerPaymentRole === 3) {
      if (partnerType?.includes("C2C")) {
        setTimeout(() => {
          setActiveIndex(0);
          receiverBackButton(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setActiveIndex(0);
          receiverBackButton(false);
        }, 1000);
      }
    } else {
      setTimeout(() => {
        onSaveAndContinueClick("B");
      }, 1000);
    }
  };

  const onPartnerDeliveryChange = () => {
    if (partnerType?.includes("C2C")) {
      setShowC2C(true);
      setShowB2C(true);
      setShowB2B(false);
    }
    if (partnerType?.includes("B2B")) {
      setShowB2B(true);
      setShowC2C(false);
      setShowB2C(false);
    }
    if (partnerType?.includes("B2C")) {
      setShowB2B(false);
      setShowC2C(true);
      setShowB2C(true);
    }
    if (partnerType?.includes("B2B")) {
      setShowB2B(true);
      setShowC2C(false);
      setShowB2C(false);
    }
    if (partnerPaymentRole === 2) {
      setShowB2B(false);
      setShowC2C(true);
      setShowB2C(true);
    }
    if (
      partnerPaymentRole === 2 &&
      // partnerType?.includes("B2B") & partnerType?.includes("B2C")
      partnerType?.includes("B2B")

    ) {
      setShowB2B(true);
      setShowC2C(false);
      setShowB2C(false);
    }

    if (partnerType?.includes("B2C")) {
      setShowB2B(false);
      setShowC2C(true);
      setShowB2C(true);
    }
    if (
      partnerType?.includes("B2B")
    ) {
      setShowB2B(true);
      setShowC2C(false);
      setShowB2C(false);
    }
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

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setEditingMode(true);
      setEditingMode(true);
      setReadOnly(false);
    }, 1000);
  };

  const onCancelEdit = () => {
    setDisplayCancelPopup(true)
  };
  useEffect(() => {
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    }
    onPartnerDeliveryChange();
    // getCurrenciesByPartnerId(Number(partnerid));
  }, []);
  //  console.log("testft",latestreceivefeeNewModel)




  useEffect(() => {
    const filteredPrimaryData = fristReceivefeeNewModel.filter((obj: any) => obj.countryCode === fristReceivefeeNewModel[0]?.countryCode);
    setprimryreceivefeeNewModel(filteredPrimaryData);

    const filteredRemainingData = fristReceivefeeNewModel.filter((obj: any) => obj.countryCode !== fristReceivefeeNewModel[0]?.countryCode);
    setotherreceivefeeNewModel(filteredRemainingData);
  }, [fristReceivefeeNewModel]);

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

              {!showC2C && onboardStatus === "Ready" && type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}

            </div>

            {/* {showB2B ? ( */}
            {showB2B && !showC2C && !showB2C ? (
              <div className="Fees-container">
                <p className="fees-discription">
                  First lets configure any fees that you want to charge businesses for the receive transactions
                </p>

                <div className="Fees-heading">
                  <h2>Business Receive Fees </h2>
                </div>
                {/* testing */}
                {primryreceivefeeNewModel.length >= 0 && (
                  <div className="Fees-sending-payment">
                    <h4>
                      What do you want to charge your business customers for receving payments?
                    </h4>


                    <div className="Fees-details-card  Fees-details-card-1">

                      {primryreceivefeeNewModel ? primryreceivefeeNewModel.map((each: any, index: any) => {
                        // if (index !== 0) {
                        return (
                          <div className="inner-card-wrapper" key={index}>

                            <div className="col-2">
                              <div className="fees-card fixed-fee" >
                                <p>Country</p>
                                <h3>{each.countryName}</h3>
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="fees-card currency"  >
                                <p>Currency</p>
                                <h3>{each.receiveFeeCurrency}</h3>
                              </div>
                            </div>
                            <div className="col-2">
                              <div className="fees-card currency" >
                                <p>Delivery Type</p>
                                <h3>{each.deliveryType}</h3>
                              </div>
                            </div>
                            {/* {  fristReceivefeeNewModel ? fristReceivefeeNewModel.map((each: any, index: any) => { */}

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

                                  onChange={(e: any) => onFixedFeeChangePrimary(e, index)}
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
                                  onChange={(e: any) => onVariableFeeChangePrimary(e, index)}
                                  aria-describedby="text"
                                />
                                <span className="feespercent">%</span>
                              </div>
                            </div>
                          </div>
                        )
                        // };
                      }) : null}

                    </div>
                  </div>
                )}

                <hr></hr>
                <>

                  {otherreceivefeeNewModel.length > 1 && (

                    <div className="Fees-sending-payment Country-select">
                      <h4>
                        Will the delivery fees be the same for the following countries and delivery type?
                      </h4>

                      <>
                        <div className="Fees-details-card  Fees-details-card-2">
                          {otherreceivefeeNewModel ? otherreceivefeeNewModel.map((each: any, index: any) => {
                            // if (index == 0) {
                            return (
                              <div className="inner-card-wrapper" key={index}>
                                <div className="col-2">
                                  <div className="fees-card" >
                                    <p>Country</p>
                                    <h3>{each.countryName}</h3>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="fees-card" >
                                    <p>Currency</p>
                                    <h3>{each.receiveFeeCurrency}</h3>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <div className="fees-card currency" >
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
                            )
                            // };


                          }) : null}
                        </div>
                      </>
                    </div>
                  )}

                </>

                <div className="button-section">
                  <div className="bottom-btns">
                    <Button
                      label="Back"
                      // loading={backbuttonLoading}
                      className="btn btn-back second-btn"
                      // onClick={onBussineScreenBack}
                      onClick={onBackClick}
                    />
                    {/* {Number(status) === 8 ? ( */}
                    {editingMode ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-back second-btn"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>

                        <Button
                          iconPos="left"
                          label=" Save and Continue"
                          loading={buttonLoading}
                          className="btn btn-continue second-btn"
                          onClick={() => onAddClick()}
                        />
                      </>
                    ) : (

                      <>
                        <button
                          type="button"
                          onClick={onNextClick}
                          className="btn btn-next second-btn "
                        >
                          Next
                        </button>
                      </>




                    )}
                  </div>
                </div>
              </div>
            ) : null}



            {/* {showC2C ? ( */}
            {((showC2C) || (showB2C)) ? (
              <C2CReceiveFees

                partnerPaymentRole={partnerPaymentRole}
                partnerType={partnerType}
                onBackClick={onBackClick}
                onSaveAndContinueClick={onSaveAndContinueClick}
                setActiveIndex={setActiveIndex}
                setShowC2C={setShowC2C}
                setShowB2C={setShowB2C}
              />
            ) : null}
          </>
        </Scrollbars>
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

export default ReceiveFees;
