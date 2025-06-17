import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { PartnershipDetailsService } from "../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { Button } from "primereact/button";
import { Logout } from "../../../utils/AccountUtils";
import { SLATypeList, validTimeInSeconds } from "../../../utils/utils";
import { AutoComplete } from "primereact/autocomplete";
import Scrollbars from "react-custom-scrollbars-2";
import { TabPanel, TabView } from "primereact/tabview";
import AddFacilitatorFee from "../Facilitator/AddFacilitatorFee";
import AddFacilitator from "../Facilitator/AddFacilitator";
import sessionStorageContext from "../../context/LocalStorageContext";

const PartnershipDetails: React.FC<any> = ({
  onSaveAndContinueClick,
  onBackButtonChange,
  onButtonChange,
  onNextClick,
  setButtonLoadingSkip,
  buttonLoadingSkip,
}) => {
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const { partnerid, type } = useParams();
  const [checkfacilitator, setCheckFacilitator] = useState(false);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const [loading, setLoading] = useState(true);
  const [filteredslatype, setFilteredSLAType] = useState<any>(null);
  const [backButtonLoading, setBackButtonLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [yesfacilitatorvalue, setYesFacilitatorValue] = useState(false);
  const [nofacilitatorvalue, setNoFacilitatorValue] = useState(false);
  const [partnerTypesMultiSelectList, setPartnerTypesMultiSelectList] =
    useState<any[]>([]);
  const context = useContext(sessionStorageContext);
  const [deliveryTypesMultiSelectList, setDeliveryTypesMultiSelectList] =
    useState<any[]>([]);

  const [partnertypeserrormessage, setPartnerTypesErrorMessage] = useState("");
  const [networktypeserrormessage, setNetworkTypesErrorMessage] = useState("");
  const [deliverytypeserrormessage, setDeliveryTypesErrorMessage] =
    useState("");
  const [rtperrormessage, setRTPsErrorMessage] = useState("");
  const [mobilewalleterrormessage, setMobileWalletErrorMessage] = useState("");
  const [bankerrormessage, setBankErrorMessage] = useState("");
  const [cashpickuperrormessage, setCashPickupErrorMessage] = useState("");
  const [dirtyfield, setDirtyField] = useState(false);
  const [rtptypeAutoComplete, setRTPTypeAutoComplete] = useState("Seconds");
  const [mobilewallettypeAutoComplete, setMobileWalletTypeAutoComplete] =
    useState("Seconds");
  const [banktypeAutoComplete, setBankTypeAutoComplete] = useState("Seconds");
  const [cashpickuptypeAutoComplete, setCashPickupTypeAutoComplete] =
    useState("Seconds");
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [errormessage, setErrorMessage] = useState("");
  const [index, setIndex] = useState(0);
  const [readonly, setReadOnly] = useState(true);
  const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);
  const onboardStatus = sessionStorage.getItem("onboardStatus");

  const [partnershipDetailsModel, setPartnershipDetailsModel] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
    isFacilitator: false,
    partnerDeliveryType: "",
    partnerPaymentRole: 0,
    partnerTypes: "",
    facilitator: 0,
    onboardStatus: sessionStorage.getItem("onboardingStatus "),
    deliveryTypeSLA: [
      {
        id: 0,
        deliveryType: "RTP",
        timeInSeconds: "1",
        timeFormat: "Seconds",
        actualTime: "1",
      },
      {
        id: 0,
        deliveryType: "MobileWallet",
        timeInSeconds: "1",
        timeFormat: "Seconds",
        actualTime: "1",
      },
      {
        id: 0,
        deliveryType: "BankAccount",
        timeInSeconds: "1",
        timeFormat: "Seconds",
        actualTime: "1",
      },
      {
        id: 0,
        deliveryType: "CashPickup",
        timeInSeconds: "1",
        timeFormat: "Seconds",
        actualTime: "1",
      },
    ],
  });



  const setModelEmpty = () => {
    setPartnershipDetailsModel({
      id: 0,
      partnerId: Number(partnerid),
      onboardStatus: sessionStorage.getItem("onboardingStatus "),
      isFacilitator: false,
      partnerDeliveryType: "",
      partnerPaymentRole: 0,
      partnerTypes: "",
      facilitator: 0,
      deliveryTypeSLA: [
        {
          id: 0,
          deliveryType: "RTP",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "MobileWallet",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "BankAccount",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "CashPickup",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
      ],
    });
    setRTPTypeAutoComplete("Seconds");
    setMobileWalletTypeAutoComplete("Seconds");
    setBankTypeAutoComplete("Seconds");
    setCashPickupTypeAutoComplete("Seconds");
  };
  const [defaultdeliveryTypeSLAList, setDefaultdeliveryTypeSLAList]: any =
    useState({
      deliveryTypeSLA: [
        {
          id: 0,
          deliveryType: "RTP",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "MobileWallet",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "BankAccount",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
        {
          id: 0,
          deliveryType: "CashPickup",
          timeInSeconds: "1",
          timeFormat: "Seconds",
          actualTime: "1",
        },
      ],
    });

  const ErrorMessageEmptyModel = () => {
    setPartnerTypesErrorMessage("");
    setNetworkTypesErrorMessage("");
    setDeliveryTypesErrorMessage("");
    setRTPsErrorMessage("");
    setMobileWalletErrorMessage("");
    setBankErrorMessage("");
    setCashPickupErrorMessage("");
  };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null || value === 0) {
      return true;
    }
    return false;
  };
  const setData = (Data: any) => {
    if (Data.partnerDeliveryType.includes("RTP")) {
      partnershipDetailsModel.deliveryTypeSLA[0] = Data.deliveryTypeSLA.filter(
        (x: any) => x.deliveryType === 1
      )[0];
    } else {
      partnershipDetailsModel.deliveryTypeSLA[0] =
        defaultdeliveryTypeSLAList.deliveryTypeSLA[0];
    }
    if (Data.partnerDeliveryType.includes("MobileWallet")) {
      partnershipDetailsModel.deliveryTypeSLA[1] = Data.deliveryTypeSLA.filter(
        (x: any) => x.deliveryType === 4
      )[0];
    } else {
      partnershipDetailsModel.deliveryTypeSLA[1] =
        defaultdeliveryTypeSLAList.deliveryTypeSLA[1];
    }
    if (Data.partnerDeliveryType.includes("BankAccount")) {
      partnershipDetailsModel.deliveryTypeSLA[2] = Data.deliveryTypeSLA.filter(
        (x: any) => x.deliveryType === 2
      )[0];
    } else {
      partnershipDetailsModel.deliveryTypeSLA[2] =
        defaultdeliveryTypeSLAList.deliveryTypeSLA[2];
    }
    if (Data.partnerDeliveryType.includes("CashPickup")) {
      partnershipDetailsModel.deliveryTypeSLA[3] = Data.deliveryTypeSLA.filter(
        (x: any) => x.deliveryType === 5
      )[0];
    } else {
      partnershipDetailsModel.deliveryTypeSLA[3] =
        defaultdeliveryTypeSLAList.deliveryTypeSLA[3];
    }

    Data.deliveryTypeSLA = partnershipDetailsModel.deliveryTypeSLA;
    {
      Data.deliveryTypeSLA[0].deliveryType = 1
        ? (Data.deliveryTypeSLA[0].deliveryType = "RTP")
        : null;
    }
    {
      Data.deliveryTypeSLA[1].deliveryType = 4
        ? (Data.deliveryTypeSLA[1].deliveryType = "MobileWallet")
        : null;
    }
    {
      Data.deliveryTypeSLA[2].deliveryType = 2
        ? (Data.deliveryTypeSLA[2].deliveryType = "BankAccount")
        : null;
    }
    {
      Data.deliveryTypeSLA[3].deliveryType = 5
        ? (Data.deliveryTypeSLA[3].deliveryType = "CashPickup")
        : null;
    }

    if (Data.deliveryTypeSLA[0].timeFormat === "Seconds") {
      setRTPTypeAutoComplete("Seconds");
      Data.deliveryTypeSLA[0].timeFormat = "Seconds";
    }
    if (Data.deliveryTypeSLA[1].timeFormat === "Seconds") {
      setMobileWalletTypeAutoComplete("Seconds");
      Data.deliveryTypeSLA[1].timeFormat = "Seconds";
    }
    if (Data.deliveryTypeSLA[2].timeFormat === "Seconds") {
      setBankTypeAutoComplete("Seconds");
      Data.deliveryTypeSLA[2].timeFormat = "Seconds";
    }
    if (Data.deliveryTypeSLA[3].timeFormat === "Seconds") {
      setCashPickupTypeAutoComplete("Seconds");
      Data.deliveryTypeSLA[3].timeFormat = "Seconds";
    }

    if (Data.deliveryTypeSLA[0].timeFormat === "Minutes") {
      Data.deliveryTypeSLA[0].timeInSeconds = (
        Data.deliveryTypeSLA[0].timeInSeconds / 60
      ).toString();
      setRTPTypeAutoComplete("Minutes");
      Data.deliveryTypeSLA[0].timeFormat = "Minutes";
    }
    if (Data.deliveryTypeSLA[1].timeFormat === "Minutes") {
      Data.deliveryTypeSLA[1].timeInSeconds = (
        Data.deliveryTypeSLA[1].timeInSeconds / 60
      ).toString();
      setMobileWalletTypeAutoComplete("Minutes");
      Data.deliveryTypeSLA[1].timeFormat = "Minutes";
    }
    if (Data.deliveryTypeSLA[2].timeFormat === "Minutes") {
      Data.deliveryTypeSLA[2].timeInSeconds = (
        Data.deliveryTypeSLA[2].timeInSeconds / 60
      ).toString();
      setBankTypeAutoComplete("Minutes");
      Data.deliveryTypeSLA[2].timeFormat = "Minutes";
    }
    if (Data.deliveryTypeSLA[3].timeFormat === "Minutes") {
      Data.deliveryTypeSLA[3].timeInSeconds = (
        Data.deliveryTypeSLA[3].timeInSeconds / 60
      ).toString();
      setCashPickupTypeAutoComplete("Minutes");
      Data.deliveryTypeSLA[3].timeFormat = "Minutes";
    }

    if (Data.deliveryTypeSLA[0].timeFormat === "Hours") {
      Data.deliveryTypeSLA[0].timeInSeconds = (
        Data.deliveryTypeSLA[0].timeInSeconds / 3600
      ).toString();
      setRTPTypeAutoComplete("Hours");
      Data.deliveryTypeSLA[0].timeFormat = "Hours";
    }
    if (Data.deliveryTypeSLA[1].timeFormat === "Hours") {
      Data.deliveryTypeSLA[1].timeInSeconds = (
        Data.deliveryTypeSLA[1].timeInSeconds / 3600
      ).toString();
      setMobileWalletTypeAutoComplete("Hours");
      Data.deliveryTypeSLA[1].timeFormat = "Hours";
    }
    if (Data.deliveryTypeSLA[2].timeFormat === "Hours") {
      Data.deliveryTypeSLA[2].timeInSeconds = (
        Data.deliveryTypeSLA[2].timeInSeconds / 3600
      ).toString();
      setBankTypeAutoComplete("Hours");
      Data.deliveryTypeSLA[2].timeFormat = "Hours";
    }
    if (Data.deliveryTypeSLA[3].timeFormat === "Hours") {
      Data.deliveryTypeSLA[3].timeInSeconds = (
        Data.deliveryTypeSLA[3].timeInSeconds / 3600
      ).toString();
      setCashPickupTypeAutoComplete("Hours");
      Data.deliveryTypeSLA[3].timeFormat = "Hours";
    }

    if (Data.deliveryTypeSLA[0].timeFormat === "Days") {
      Data.deliveryTypeSLA[0].timeInSeconds = (
        Data.deliveryTypeSLA[0].timeInSeconds / 86400
      ).toString();
      setRTPTypeAutoComplete("Days");
      Data.deliveryTypeSLA[0].timeFormat = "Days";
    }
    if (Data.deliveryTypeSLA[1].timeFormat === "Days") {
      Data.deliveryTypeSLA[1].timeInSeconds = (
        Data.deliveryTypeSLA[1].timeInSeconds / 86400
      ).toString();
      setMobileWalletTypeAutoComplete("Days");
      Data.deliveryTypeSLA[1].timeFormat = "Days";
    }
    if (Data.deliveryTypeSLA[2].timeFormat === "Days") {
      Data.deliveryTypeSLA[2].timeInSeconds = (
        Data.deliveryTypeSLA[2].timeInSeconds / 86400
      ).toString();
      setBankTypeAutoComplete("Days");
      Data.deliveryTypeSLA[2].timeFormat = "Days";
    }
    if (Data.deliveryTypeSLA[3].timeFormat === "Days") {
      Data.deliveryTypeSLA[3].timeInSeconds = (
        Data.deliveryTypeSLA[3].timeInSeconds / 86400
      ).toString();
      setCashPickupTypeAutoComplete("Days");
      Data.deliveryTypeSLA[3].timeFormat = "Days";
    }

    setPartnershipDetailsModel(Data);
  };

  const partnershipDetailsByPartnerId = (id: any) => {
    ErrorMessageEmptyModel();
    // setModelEmpty();
    PartnershipDetailsService.getPartnershipDetailsByPartnerId(id)
      .then((response) => {
        const data = response.data;
        context.updateRole(data.partnerPaymentRole);
        context.updateFacilitator(data.isFacilitator);
        sessionStorage.setItem("isFacilitator", data.isFacilitator);

        // sessionStorage.setItem("isFacilitator", data.isFacilitator);

       
 
        if (response.data.partnerDeliveryType === null) {
          response.data.deliveryTypeSLA =
            defaultdeliveryTypeSLAList.deliveryTypeSLA;
          setPartnershipDetailsModel(response.data);
          setLoading(false);
          if (data.isFacilitator === true) {
            setCheckFacilitator(true);

            setYesFacilitatorValue(true);
          } else {
            setCheckFacilitator(false);
            setNoFacilitatorValue(true);
          }
        } else if (
          data.deliveryTypeSLA.length === 1 &&
          data.deliveryTypeSLA[0].deliveryType === 0
        ) {
          const Data: any = response.data;

          Data.deliveryTypeSLA = defaultdeliveryTypeSLAList.deliveryTypeSLA;
          if (data.isFacilitator === true) {
            setCheckFacilitator(true);

            setYesFacilitatorValue(true);
          } else {
            setCheckFacilitator(false);
            setNoFacilitatorValue(true);
          }
          setPartnershipDetailsModel(Data);
          setLoading(false);
        } else {
          if (data.deliveryTypeSLA.length < 4) {
            const Data: any = response.data;
            setData(Data);
            if (data.isFacilitator === true) {
              setYesFacilitatorValue(true);

              setCheckFacilitator(true);
            } else {
              setNoFacilitatorValue(true);
              setCheckFacilitator(false);
            }
            setLoading(false);
          } else {
            const Data: any = response.data;
            setData(Data);
            if (data.isFacilitator === true) {
              setYesFacilitatorValue(true);

              setCheckFacilitator(true);
            } else {
              setNoFacilitatorValue(true);
              setCheckFacilitator(false);
            }
            setLoading(false);
          }
        }
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
            summary: "Error while getting partnership details.",
            life: 3000,
          });
        }
        setLoading(false);
      });
      // //console.log("isFacilitator", isFacilitator)

  };

  useEffect(() => {
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
      partnershipDetailsByPartnerId(Number(partnerid));
    }
    if (
      partnershipDetailsModel.partnerPaymentRole === 1 ||
      partnershipDetailsModel.partnerPaymentRole === 0
    ) {
      partnershipDetailsModel.partnerDeliveryType = "";
    }
  }, []);

  const isValidate = (values: any) => {
    let formIsValid = true;

    ErrorMessageEmptyModel();
    if (CheckNull(values.partnerTypes) || values.partnerTypes.length <= 2) {
      setPartnerTypesErrorMessage("Please select type of payments.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (CheckNull(values.partnerPaymentRole)) {
      setNetworkTypesErrorMessage("Please select instarails network.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (values.partnerPaymentRole == 2 || values.partnerPaymentRole == 3) {
      if (
        CheckNull(values.partnerDeliveryType) ||
        values.partnerDeliveryType.length <= 2
      ) {
        setDeliveryTypesErrorMessage("Please select delivery types.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (
        !(
          CheckNull(values.partnerDeliveryType) ||
          values.partnerDeliveryType.length <= 2
        )
      ) {
        if (values.partnerDeliveryType.includes("RTP")) {
          if (
            CheckNull(values.deliveryTypeSLA[0].timeInSeconds) ||
            CheckNull(rtptypeAutoComplete) ||
            !validTimeInSeconds.test(values.deliveryTypeSLA[0].timeInSeconds)
          ) {
            setRTPsErrorMessage("Please enter time for RTP delivery type.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true);
            setReadOnly(false);
            formIsValid = false;
          }
          if (!CheckNull(values.deliveryTypeSLA[0].timeInSeconds)) {
            if (values.deliveryTypeSLA[0].timeInSeconds < 1) {
              setRTPsErrorMessage(
                "Please enter valid time for RTP delivery type."
              );
              setUpdateBtnShow(true);
              setReadOnly(false);
              setUpdateBackBtnShow(true);
              setReadOnly(false);
              formIsValid = false;
            }
          }
        }
        if (values.partnerDeliveryType.includes("MobileWallet")) {
          if (
            CheckNull(values.deliveryTypeSLA[1].timeInSeconds) ||
            CheckNull(mobilewallettypeAutoComplete) ||
            !validTimeInSeconds.test(values.deliveryTypeSLA[1].timeInSeconds)
          ) {
            setMobileWalletErrorMessage(
              "Please enter time for mobile wallet delivery type."
            );
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true);
            setReadOnly(false);
            formIsValid = false;
          }
          if (!CheckNull(values.deliveryTypeSLA[1].timeInSeconds)) {
            if (values.deliveryTypeSLA[1].timeInSeconds < 1) {
              setMobileWalletErrorMessage(
                "Please enter valid time for mobile wallet delivery type."
              );
              setUpdateBtnShow(true);
              setReadOnly(false);
              setUpdateBackBtnShow(true);
              setReadOnly(false);
              formIsValid = false;
            }
          }
        }
        if (values.partnerDeliveryType.includes("BankAccount")) {
          if (
            CheckNull(values.deliveryTypeSLA[2].timeInSeconds) ||
            CheckNull(banktypeAutoComplete) ||
            !validTimeInSeconds.test(values.deliveryTypeSLA[2].timeInSeconds)
          ) {
            setBankErrorMessage("Please enter time for bank delivery type.");
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true);
            setReadOnly(false);
            formIsValid = false;
          }
          if (!CheckNull(values.deliveryTypeSLA[2].timeInSeconds)) {
            if (values.deliveryTypeSLA[2].timeInSeconds < 1) {
              setBankErrorMessage(
                "Please enter valid time for bank delivery type."
              );
              setUpdateBtnShow(true);
              setReadOnly(false);
              setUpdateBackBtnShow(true);
              setReadOnly(false);
              formIsValid = false;
            }
          }
        }
        if (values.partnerDeliveryType.includes("CashPickup")) {
          if (
            CheckNull(values.deliveryTypeSLA[3].timeInSeconds) ||
            CheckNull(cashpickuptypeAutoComplete) ||
            !validTimeInSeconds.test(values.deliveryTypeSLA[3].timeInSeconds)
          ) {
            setCashPickupErrorMessage(
              "Please enter time for cash pickup delivery type."
            );
            setUpdateBtnShow(true);
            setReadOnly(false);
            setUpdateBackBtnShow(true);
            setReadOnly(false);
            formIsValid = false;
          }
          if (!CheckNull(values.deliveryTypeSLA[3].timeInSeconds)) {
            if (values.deliveryTypeSLA[3].timeInSeconds < 1) {
              setCashPickupErrorMessage(
                "Please enter valid time for cash pickup delivery type."
              );
              setUpdateBtnShow(true);
              setReadOnly(false);
              setUpdateBackBtnShow(true);
              setReadOnly(false);
              formIsValid = false;
            }
          }
        }
      }
    }
    return formIsValid;
  };
  const searchSLAType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < SLATypeList.length; i++) {
      let item = SLATypeList[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredSLAType(_filteredItems);
  };
  const handleClose = () => {


    partnershipDetailsByPartnerId(Number(partnerid));

    if (type === "V") {
      setLoading(true);
      if (updateBtnShow) {

        setTimeout(() => {
          setUpdateBtnShow(false);
          setReadOnly(true);
          setLoading(false);
        }, 1000);
      }
    }


    ErrorMessageEmptyModel();
  };
  const onAddClick = () => {
    partnershipDetailsModel.partnerId = Number(partnerid);

    setButtonLoading(true);
    if (isValidate(partnershipDetailsModel)) {
      PartnershipDetailsService.addPartnershipDetails(partnershipDetailsModel)
        .then((response) => {
          // toast.current?.show({
          //   severity: "success",
          //   summary: "Contact details saved successfully.",
          //   life: 3000,
          // });

          sessionStorage.setItem("StepFlag", "6");
          sessionStorage.setItem("OnboardingStatus", "6");

          onSaveAndContinueClick("N");
          setTimeout(() => {
            navigate(`../partnerdetails/payment/${partnerid}/${type}`);
          }, 500);
          setButtonLoading(false);
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
            Logout(navigate);
            toast.current?.show({
              severity: "error",
              summary: "Unauthorized",
              life: 3000,
            });
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error while updating partnership details.",
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

    partnershipDetailsModel.deliveryTypeSLA.forEach((type: any) => {
      if (type.timeFormat === "Minutes") {
        type.actualTime = (type.timeInSeconds * 60).toString();
      }
      if (type.timeFormat === "Hours") {
        type.actualTime = (type.timeInSeconds * 3600).toString();
      }
      if (type.timeFormat === "Days") {
        type.actualTime = (type.timeInSeconds * 86400).toString();
      }
      if (type.timeFormat === "Seconds") {
        type.actualTime = type.timeInSeconds.toString();
      }
    });
    if (isValidate(partnershipDetailsModel)) {
      PartnershipDetailsService.updatePartnershipDetails(
        partnershipDetailsModel
      )
        .then((data: any) => {
          context.updateRole(
            Number(partnershipDetailsModel.partnerPaymentRole)
          );
          context.updateFacilitator(partnershipDetailsModel.isFacilitator);
          sessionStorage.setItem("StepFlag", "6");
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
          } else if (error.response.status === 409) {
            setErrorMessage(
              "Please make sure that the partner withdraws the balance before deactivating the wallet or currency."
            );
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

  // const onBackClick = () => {
  //   if (!readonly && isValidate(partnershipDetailsModel)) {
  //     setBackButtonLoading(true)
  //     setTimeout(() => {
  //       onSaveAndContinueClick("B");
  //       navigate(`../partnerdetails/${partnerid}/${type}`);
  //       setUpdateBackBtnShow(true);
  //       setReadOnly(false);
  //     }, 1000)

  //   } else {

  //     //console.log("Cannot go back: Form is not ready or data is not valid.");
  //   }
  // };

  const onBackClick = () => {
    setBackButtonLoading(true);
    setTimeout(() => {
      onSaveAndContinueClick("B");
      navigate(`../partnerdetails/${partnerid}/${type}`);
    }, 1000);
  };

  const onFacilitatorValueChange = (e: any) => {
    setDirtyField(true);
    if (e.target.value === "Yes") {
      setNoFacilitatorValue(false);
      setYesFacilitatorValue(true);

      setPartnershipDetailsModel({
        ...partnershipDetailsModel,
        isFacilitator: true,
      });
    } else if (e.target.value === "No") {
      setYesFacilitatorValue(false);
      setCheckFacilitator(false);
      setNoFacilitatorValue(true);

      setPartnershipDetailsModel({
        ...partnershipDetailsModel,
        isFacilitator: false,
      });
    }
  };
  const onMultiSelectChange = (e: any) => {
    setDirtyField(true);
    if (
      partnerTypesMultiSelectList
        .map((d: any) => d.name)
        .includes(e.target.value) === false
    ) {
      partnerTypesMultiSelectList.push({ name: e.target.value });
    } else if (
      partnerTypesMultiSelectList
        .map((d: any) => d.name)
        .includes(e.target.value) === true
    ) {
      const index = partnerTypesMultiSelectList
        .map((d: any) => d.name)
        .indexOf(e.target.value);
      if (index > -1) {
        partnerTypesMultiSelectList.splice(index, 1);
      }
    }

    const types = partnerTypesMultiSelectList.map((d: any) => d.name);

    setPartnershipDetailsModel({
      ...partnershipDetailsModel,
      partnerTypes: JSON.stringify(types),
    });
    // setPartnerTypesMultiSelectList(val);
  };
  const onDeliveryTypeChange = (e: any) => {
    setDirtyField(true);
    partnershipDetailsModel.deliveryTypeSLA = 
      defaultdeliveryTypeSLAList.deliveryTypeSLA;
    setRTPTypeAutoComplete("Seconds");
    setMobileWalletTypeAutoComplete("Seconds");
    setBankTypeAutoComplete("Seconds");
    setCashPickupTypeAutoComplete("Seconds");
    if (
      deliveryTypesMultiSelectList
        .map((d: any) => d.name)
        .includes(e.target.value) === false
    ) {
      deliveryTypesMultiSelectList.push({ name: e.target.value });
    } else if (
      deliveryTypesMultiSelectList
        .map((d: any) => d.name)
        .includes(e.target.value) === true
    ) {
      const index = deliveryTypesMultiSelectList
        .map((d: any) => d.name)
        .indexOf(e.target.value);
      if (index > -1) {
        deliveryTypesMultiSelectList.splice(index, 1);
      }
    }

    const deliverytypes = deliveryTypesMultiSelectList.map((d: any) => d.name);

    setPartnershipDetailsModel({
      ...partnershipDetailsModel,
      partnerDeliveryType: JSON.stringify(deliverytypes),
    });
    // setPartnerTypesMultiSelectList(val);
  };
  const onNetworkClick = (e: any) => {
    setDirtyField(true);
    if (e.target.value === "1") {
      partnershipDetailsModel.partnerDeliveryType = "";
    }
    if (partnershipDetailsModel.partnerPaymentRole === e.target.value) {
      setPartnershipDetailsModel({
        ...partnershipDetailsModel,
        partnerPaymentRole: 0,
      });
    } else {
      setPartnershipDetailsModel({
        ...partnershipDetailsModel,
        partnerPaymentRole: e.target.value,
      });
    }
  };

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpdateBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };
  const onTabChange = (e: any) => {
    setIndex(e.index);
  };
  const onRTPTypeChange = (e: any) => {
    if (e.value !== null) {
      setRTPTypeAutoComplete(e.value);
      setPartnershipDetailsModel((item: any) => {
        item.deliveryTypeSLA[0].timeFormat = e.value.name;
        return {
          ...item,
        };
      });
    }
    setDirtyField(true);
  };
  const onMobileWalletTypeChange = (e: any) => {
    if (e.value !== null) {
      setMobileWalletTypeAutoComplete(e.value);
      setPartnershipDetailsModel((item: any) => {
        item.deliveryTypeSLA[1].timeFormat = e.value.name;
        return {
          ...item,
        };
      });
    }
    setDirtyField(true);
  };
  const onBankTypeChange = (e: any) => {
    if (e.value !== null) {
      setBankTypeAutoComplete(e.value);
      setPartnershipDetailsModel((item: any) => {
        item.deliveryTypeSLA[2].timeFormat = e.value.name;
        return {
          ...item,
        };
      });
    }
    setDirtyField(true);
  };
  const onCashPickupTypeChange = (e: any) => {
    if (e.value !== null) {
      setCashPickupTypeAutoComplete(e.value);
      setPartnershipDetailsModel((item: any) => {
        item.deliveryTypeSLA[3].timeFormat = e.value.name;
        return {
          ...item,
        };
      });
    }
    setDirtyField(true);
  };

  const onFacilitatorSave = () => {
    setButtonLoading(true);
    if (partnershipDetailsModel.isFacilitator === true) {
      partnershipDetailsModel.partnerDeliveryType = null;
      partnershipDetailsModel.partnerPaymentRole = null;
      partnershipDetailsModel.partnerTypes = null;
    }
    ErrorMessageEmptyModel();
    PartnershipDetailsService.updateIsFacilitator(partnershipDetailsModel)
      .then((data: any) => {
        onSaveAndContinueClick("N");

        context.updateFacilitator(data.data);
        context.updateRole(0);
        setButtonLoading(false);
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
        } else if (error.response.status === 409) {
          setErrorMessage(
            "Please make sure that the partner withdraws the balance before deactivating the wallet or currency."
          );
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while updating contact details.",
            life: 3000,
          });
        }
        setButtonLoading(false);
      });
  };
  useEffect(() => {
    onButtonChange({ updateBtnShow })

  }, [updateBtnShow])
  useEffect(() => {
    onBackButtonChange({ updateBackBtnShow })
  }, [updateBackBtnShow])
  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="container-fluid acc-screen payment-screen">
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
            <div className="edit-content">
              {onboardStatus === "Ready" && type === "V" ? (
                <Button

                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}
            </div>
            <div className="row payment-section">
              <div className="">
                <h2>
                  Are you a Payment Facilitator for other companies?
                  <span className="color-red">*</span>
                </h2>
              </div>
              <div className=" check-display">
                <div className="form-check yes-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    disabled={readonly}
                    name="exampleRadios"
                    id="exampleRadios1"
                    checked={yesfacilitatorvalue}
                    value="Yes"
                    onClick={(e) => onFacilitatorValueChange(e)}
                  />
                  <label className="form-check-label">Yes</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="exampleRadios"
                    id="exampleRadios1"
                    value="No"
                    disabled={readonly}
                    checked={nofacilitatorvalue}
                    onClick={(e) => onFacilitatorValueChange(e)}
                  />
                  <label className="form-check-label">No</label>
                </div>
              </div>
            </div>
            {yesfacilitatorvalue === false ? (
              <>
                <div className="row payment-section">
                  <div className="">
                    <h2>
                      Describe the type of payments
                      <span className="color-red">*</span>
                    </h2>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerTypes !== null &&
                          partnershipDetailsModel.partnerTypes.length > 0 &&
                          partnershipDetailsModel.partnerTypes.includes("B2B") ===
                          true
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value="B2B"
                      onClick={onMultiSelectChange}
                    >
                      B2B
                    </button>
                    <button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerTypes !== null &&
                          partnershipDetailsModel.partnerTypes.length > 0 &&
                          partnershipDetailsModel.partnerTypes.includes("B2C") ===
                          true
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value="B2C"
                      onClick={onMultiSelectChange}
                    >
                      B2C
                    </button>
                    <button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerTypes !== null &&
                          partnershipDetailsModel.partnerTypes.length > 0 &&
                          partnershipDetailsModel.partnerTypes.includes("C2C") ===
                          true
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value="C2C"
                      onClick={onMultiSelectChange}
                    >
                      C2C
                    </button>
                  </div>
                  {partnertypeserrormessage !== null &&
                    partnertypeserrormessage.length > 0 && (
                      <span className="error-msg">
                        {partnertypeserrormessage}
                      </span>
                    )}
                </div>

                <div className="row payment-section">
                  <div className="">
                    <h2>
                      How will you use Instarails network?
                      <span className="color-red">*</span>
                    </h2>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerPaymentRole == 1
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value={1}
                      onClick={onNetworkClick}
                    >
                      Send Payment
                    </button>
                    <Button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerPaymentRole == 2
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value={2}
                      onClick={onNetworkClick}
                    >
                      Receive Payment
                    </Button>
                    <button
                      type="button"
                      disabled={readonly}
                      className={
                        partnershipDetailsModel.partnerPaymentRole == 3
                          ? "btn btn-payment-selected payment-btns"
                          : "btn btn-payment payment-btns"
                      }
                      value={3}
                      onClick={onNetworkClick}
                    >
                      Both
                    </button>
                  </div>
                  {networktypeserrormessage !== null &&
                    networktypeserrormessage.length > 0 && (
                      <span className="error-msg">
                        {networktypeserrormessage}
                      </span>
                    )}
                </div>
                {partnershipDetailsModel.partnerPaymentRole == 2 ||
                  partnershipDetailsModel.partnerPaymentRole == 3 ? (
                  <>
                    <div className="row payment-section">
                      <div className="">
                        <h2>
                          Select supported delivery types
                          <span className="color-red">*</span>
                        </h2>
                      </div>

                      <div>
                        <button
                          type="button"
                          disabled={readonly}
                          className={
                            partnershipDetailsModel.partnerDeliveryType !==
                              null &&
                              partnershipDetailsModel.partnerDeliveryType.length >
                              0 &&
                              partnershipDetailsModel.partnerDeliveryType.includes(
                                "RTP"
                              ) === true
                              ? "btn btn-payment-selected payment-btns"
                              : "btn btn-payment payment-btns"
                          }
                          value="RTP"
                          onClick={onDeliveryTypeChange}
                        >
                          RTP
                        </button>
                        <button
                          type="button"
                          disabled={readonly}
                          className={
                            partnershipDetailsModel.partnerDeliveryType !==
                              null &&
                              partnershipDetailsModel.partnerDeliveryType.length >
                              0 &&
                              partnershipDetailsModel.partnerDeliveryType.includes(
                                "MobileWallet"
                              ) === true
                              ? "btn btn-payment-selected payment-btns"
                              : "btn btn-payment payment-btns"
                          }
                          value="MobileWallet"
                          onClick={onDeliveryTypeChange}
                        >
                          Mobile Wallet
                        </button>
                        <button
                          disabled={readonly}
                          type="button"
                          className={
                            partnershipDetailsModel.partnerDeliveryType !==
                              null &&
                              partnershipDetailsModel.partnerDeliveryType.length >
                              0 &&
                              partnershipDetailsModel.partnerDeliveryType.includes(
                                "BankAccount"
                              ) === true
                              ? "btn btn-payment-selected payment-btns"
                              : "btn btn-payment payment-btns"
                          }
                          value="BankAccount"
                          onClick={onDeliveryTypeChange}
                        >
                          Bank Account
                        </button>
                        <button
                          type="button"
                          disabled={readonly}
                          className={
                            partnershipDetailsModel.partnerDeliveryType !==
                              null &&
                              partnershipDetailsModel.partnerDeliveryType.length >
                              0 &&
                              partnershipDetailsModel.partnerDeliveryType.includes(
                                "CashPickup"
                              ) === true
                              ? "btn btn-payment-selected payment-btns"
                              : "btn btn-payment payment-btns"
                          }
                          value="CashPickup"
                          onClick={onDeliveryTypeChange}
                        >
                          Cash Pickup
                        </button>
                      </div>
                      {deliverytypeserrormessage !== null &&
                        deliverytypeserrormessage.length > 0 && (
                          <span className="error-msg">
                            {deliverytypeserrormessage}
                          </span>
                        )}
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {partnershipDetailsModel.partnerDeliveryType !== null &&
                  partnershipDetailsModel.partnerDeliveryType.length > 2 ? (
                  <>
                    <hr />

                    <div
                      className="row payment-section "
                      style={{ marginBottom: "15px" }}
                    >
                      <h2>
                        Provide the delivery time SLA for each of the supported
                        delivery types below:{" "}
                        <span className="color-red">*</span>
                      </h2>

                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType.includes(
                          "RTP"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="text"
                              disabled={readonly}
                              className="realtime-payment-inputbox input-with-icon-realtime"
                              value={"RTP"}
                            ></input>
                          </div>
                        </>
                      ) : null}
                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "MobileWallet"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ position: "relative" }}
                          >
                            <input
                              type="text"
                              className="realtime-payment-inputbox input-with-icon-mobilewallet"
                              value={"Mobile Wallet"}
                              disabled={readonly}
                            ></input>
                          </div>
                        </>
                      ) : null}
                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType.includes(
                          "BankAccount"
                        ) === true ? (
                        <>
                          <div className="col-md-2">
                            <input
                              disabled={readonly}
                              type="text"
                              className="realtime-payment-inputbox input-with-icon-bank"
                              id="disabledTextInput"
                              value={"Bank Account"}
                            ></input>
                          </div>
                        </>
                      ) : null}

                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "CashPickup"
                        ) === true ? (
                        <>
                          <div className="col-md-2">
                            <input
                              disabled={readonly}
                              type="text"
                              className="realtime-payment-inputbox input-with-icon-cashpickup"
                              id="disabledTextInput"
                              value={"Cash Pickup"}
                            ></input>
                          </div>
                        </>
                      ) : null}
                    </div>

                    <div
                      className="row payment-section partnership-drop"
                    // style={{ display: "flex" }}
                    >
                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "RTP"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ display: "flex", position: "relative" }}
                          >
                            <input
                              type="number"
                              disabled={readonly}
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              className="form-control partershipdetailsinput"
                              value={
                                partnershipDetailsModel.deliveryTypeSLA[0]
                                  .timeInSeconds
                              }
                              onChange={(e: any) => {
                                setPartnershipDetailsModel((item: any) => {
                                  item.deliveryTypeSLA[0].timeInSeconds =
                                    e.target.value;
                                  return {
                                    ...item,
                                  };
                                });
                              }}
                            />
                            <AutoComplete
                              tabIndex={5}
                              field="name"
                              dropdown
                              disabled={readonly}
                              forceSelection
                              aria-label="Countries"
                              autoComplete="off"
                              dropdownAriaLabel="Select"
                              className="dropdown-acc partner-dropdown"
                              placeholder="Select type"
                              suggestions={filteredslatype}
                              completeMethod={searchSLAType}
                              onChange={(e) => onRTPTypeChange(e)}
                              value={rtptypeAutoComplete}
                            />
                            {rtperrormessage !== null &&
                              rtperrormessage.length > 0 && (
                                <span className="partner-errormsg ">
                                  {rtperrormessage}
                                </span>
                              )}
                          </div>
                        </>
                      ) : null}
                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "MobileWallet"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ display: "flex", position: "relative" }}
                          >
                            <input
                              type="number"
                              disabled={readonly}
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              className="form-control partershipdetailsinput"
                              value={
                                partnershipDetailsModel.deliveryTypeSLA[1]
                                  .timeInSeconds
                              }
                              onChange={(e: any) => {
                                setPartnershipDetailsModel((item: any) => {
                                  item.deliveryTypeSLA[1].timeInSeconds =
                                    e.target.value;
                                  return {
                                    ...item,
                                  };
                                });
                              }}
                            />
                            <AutoComplete
                              tabIndex={5}
                              field="name"
                              dropdown
                              forceSelection
                              disabled={readonly}
                              aria-label="Countries"
                              autoComplete="off"
                              dropdownAriaLabel="Select"
                              className="dropdown-acc partner-dropdown"
                              placeholder="Select type"
                              suggestions={filteredslatype}
                              completeMethod={searchSLAType}
                              onChange={(e) => onMobileWalletTypeChange(e)}
                              value={mobilewallettypeAutoComplete}
                            />
                            {mobilewalleterrormessage !== null &&
                              mobilewalleterrormessage.length > 0 && (
                                <span className="partner-errormsg ">
                                  {mobilewalleterrormessage}
                                </span>
                              )}
                          </div>
                        </>
                      ) : null}
                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "BankAccount"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ display: "flex", position: "relative" }}
                          >
                            <input
                              disabled={readonly}
                              type="number"
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              className="form-control partershipdetailsinput"
                              value={
                                partnershipDetailsModel.deliveryTypeSLA[2]
                                  .timeInSeconds
                              }
                              onChange={(e: any) => {
                                setPartnershipDetailsModel((item: any) => {
                                  item.deliveryTypeSLA[2].timeInSeconds =
                                    e.target.value;
                                  return {
                                    ...item,
                                  };
                                });
                              }}
                            />
                            <AutoComplete
                              tabIndex={5}
                              field="name"
                              dropdown
                              disabled={readonly}
                              forceSelection
                              aria-label="Countries"
                              dropdownAriaLabel="Select"
                              autoComplete="off"
                              className="dropdown-acc partner-dropdown"
                              placeholder="Select type"
                              suggestions={filteredslatype}
                              completeMethod={searchSLAType}
                              onChange={(e) => onBankTypeChange(e)}
                              value={banktypeAutoComplete}
                            />
                            {bankerrormessage !== null &&
                              bankerrormessage.length > 0 && (
                                <span className="partner-errormsg ">
                                  {bankerrormessage}
                                </span>
                              )}
                          </div>
                        </>
                      ) : null}

                      {partnershipDetailsModel.partnerDeliveryType !== null &&
                        partnershipDetailsModel.partnerDeliveryType.length > 0 &&
                        partnershipDetailsModel.partnerDeliveryType?.includes(
                          "CashPickup"
                        ) === true ? (
                        <>
                          <div
                            className="col-md-2"
                            style={{ display: "flex", position: "relative" }}
                          >
                            <input
                              type="number"
                              disabled={readonly}
                              onKeyDown={(evt) =>
                                evt.key === "e" && evt.preventDefault()
                              }
                              className="form-control partershipdetailsinput"
                              value={
                                partnershipDetailsModel.deliveryTypeSLA[3]
                                  .timeInSeconds
                              }
                              onChange={(e: any) => {
                                setPartnershipDetailsModel((item: any) => {
                                  item.deliveryTypeSLA[3].timeInSeconds =
                                    e.target.value;
                                  return {
                                    ...item,
                                  };
                                });
                              }}
                              style={{ width: "24%" }}
                            />
                            <AutoComplete
                              tabIndex={5}
                              field="name"
                              dropdown
                              forceSelection
                              disabled={readonly}
                              aria-label="Countries"
                              dropdownAriaLabel="Select"
                              autoComplete="off"
                              className="dropdown-acc partner-dropdown"
                              placeholder="Select type"
                              suggestions={filteredslatype}
                              completeMethod={searchSLAType}
                              onChange={(e) => onCashPickupTypeChange(e)}
                              value={cashpickuptypeAutoComplete}
                            />
                            {cashpickuperrormessage !== null &&
                              cashpickuperrormessage.length > 0 && (
                                <span className="partner-errormsg ">
                                  {cashpickuperrormessage}
                                </span>
                              )}
                          </div>
                        </>
                      ) : null}
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>{null}</>
            )}
            <div className="row payment-section partnership-drop">
              {errormessage !== null && errormessage.length > 0 && (
                <span className="error-msg">{errormessage}</span>
              )}
            </div>

            <div className="payment-button-section">
              <div className="bottom-btns">
                <>
                  <Button
                    type="button"
                    label="Back"
                    loading={backButtonLoading}
                    className="btn btn-back second-btn"
                    onClick={onBackClick}
                  />



                  <button
                    type="button"
                    className="btn btn-back second-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>

                  {updateBtnShow ? (
                    <Button
                      iconPos="left"
                      label={"Save and Continue"}
                      className="btn btn-continue second-btn"
                      loading={buttonLoading}
                      // onClick={
                      //   yesfacilitatorvalue === true
                      //     ? onFacilitatorSave
                      //     : onUpdateClick
                      // }
                      onClick={
                        partnershipDetailsModel.id === 0 ? onAddClick : onUpdateClick
                      }


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
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default PartnershipDetails;
