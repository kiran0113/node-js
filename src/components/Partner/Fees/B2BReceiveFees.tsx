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

const B2BReceiveFees: React.FC<any> = ({ partnerDeliveryType, updateBtnShow, onNextClick }) => {
  const [currency, setCurrency] = useState(null);
  const [showcurrency, setShowCurrency] = useState(null);
  const { partnerid, type } = useParams();
  const PartnerTypeStaticValue = "B2B";
  const [receivefixedfeeserrorMessage, setreceivefixedfeeserrorMessage] =
    useState("");
  const [receivevariablefeeserrorMessage, setreceivevariablefeeserrorMessage] =
    useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );


  const [rtpreceivefeeModel, setrtpreceivefeeModel] = useState([
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "INR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "IND",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "USD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "USA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "BRL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CAD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "CAN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AUD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "AUS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "SGD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "SGP",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "JPY",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "JPN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KRW",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "KOR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NZD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "NZL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MYR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "MYS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "THB",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "THA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "VND",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "VNM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "EGP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "EGY",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "IDR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "IDN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PHP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "PHL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "PAK",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NPR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "NPL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BDT",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "BGD",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "LKA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "TRY",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "TUR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AED",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "ARE",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "BRA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KHR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "KHM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "HKD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "HKG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MNT",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "MNG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CNY",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "CHN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "UGX",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "UGA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KWD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "KWT",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "OMR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "OMN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LBP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 1,
      countryCode: "LBN",
    },
    


  ]);

  const [cashreceivefeeModel, setcashreceivefeeModel] = useState([
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "INR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 5,
      countryCode: "IND",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "USD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 5,
      countryCode: "USA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 5,
      countryCode: "BRL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CAD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 5,
      countryCode: "CAN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AUD",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "AUS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "SGD",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "SGP",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "JPY",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "JPN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KRW",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "KOR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NZD",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "NZL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MYR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "MYS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "THB",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "THA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "VND",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "VNM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "EGP",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "EGY",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "IDR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "IDN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PHP",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "PHL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "PAK",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NPR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "NPL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BDT",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "BGD",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "LKA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "TRY",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "TUR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AED",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "ARE",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "BRA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KHR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "KHM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "HKD",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "HKG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MNT",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "MNG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CNY",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "CHN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "UGX",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "UGA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KWD",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "KWT",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "OMR",
      receiveFixedFees: null,
      receiveVariableFees: null,
       partnerDeliveryType: 5,
      countryCode: "OMN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LBP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 5,
      countryCode: "LBN",
    },
    


  ]);

  const [mobilereceivefeeModel, setmobilereceivefeeModel] = useState([
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "INR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 4,
      countryCode: "IND",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "USD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 4,
      countryCode: "USA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 4,
      countryCode: "BRL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CAD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 4,
      countryCode: "CAN",
    },


    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AUD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "AUS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "SGD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "SGP",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "JPY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "JPN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KRW",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "KOR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NZD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "NZL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MYR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "MYS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "THB",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "THA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "VND",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "VNM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "EGP",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "EGY",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "IDR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "IDN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PHP",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "PHL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "PAK",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NPR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "NPL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BDT",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "BGD",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "LKA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "TRY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "TUR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AED",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "ARE",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "BRA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KHR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "KHM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "HKD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "HKG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MNT",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "MNG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CNY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "CHN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "UGX",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "UGA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KWD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "KWT",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "OMR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 4,
      countryCode: "OMN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LBP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 4,
      countryCode: "LBN",
    },
    

    
  ]);

  const [bankreceivefeeModel, setbankreceivefeeModel] = useState([
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "INR",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 2,
      countryCode: "IND",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "USD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 2,
      countryCode: "USA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 2,
      countryCode: "BRL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CAD",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 2,
      countryCode: "CAN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AUD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "AUS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "SGD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "SGP",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "JPY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "JPN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KRW",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "KOR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NZD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "NZL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MYR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "MYS",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "THB",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "THA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "VND",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "VNM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "EGP",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "EGY",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "IDR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "IDN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PHP",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "PHL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "PKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "PAK",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "NPR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "NPL",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BDT",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "BGD",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LKR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "LKA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "TRY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "TUR",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "AED",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "ARE",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "BRL",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "BRA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KHR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "KHM",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "HKD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "HKG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "MNT",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "MNG",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "CNY",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "CHN",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "UGX",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "UGA",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "KWD",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "KWT",
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "OMR",
      receiveFixedFees: null,
      receiveVariableFees: null,
        partnerDeliveryType: 2,
      countryCode: "OMN",
    },

    {
      id: 0,
      partnerId: Number(partnerid),
      partnerReceiveFeeType: 1,
      partnerReceiveFeeTier: null,
      receiveFeeCurrency: "LBP",
      receiveFixedFees: null,
      receiveVariableFees: null,
      partnerDeliveryType: 2,
      countryCode: "LBN",
    },
    
  ]);

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

  const isValidate = () => {
    let formIsValid = true;

    if (currency?.includes("INR") && showcurrency?.includes("INR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[0].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[0].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[0].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[0].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[0].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[0].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[0].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[0].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[0].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[0].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[0].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[0].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[0].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[0].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[0].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[0].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("USD") && showcurrency?.includes("USD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[1].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[1].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[1].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[1].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[1].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[1].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[1].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[1].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[1].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[1].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[1].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[1].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[1].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[1].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[1].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[1].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("BRL") && showcurrency?.includes("BRL")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[2].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[2].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[2].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[2].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[2].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[2].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[2].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[2].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[2].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[2].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[2].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[2].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[2].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[2].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[2].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[2].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("CAD") && showcurrency?.includes("CAD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[3].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[3].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[3].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[3].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[3].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[3].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[3].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[3].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[3].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[3].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[3].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[3].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[3].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[3].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[3].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[3].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("AUD") && showcurrency?.includes("AUD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[4].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[4].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[4].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[4].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[4].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[4].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[4].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[4].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[4].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[4].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[4].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[4].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[4].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[4].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[4].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[4].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("SGD") && showcurrency?.includes("SGD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[5].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[5].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[5].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[5].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[5].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[4].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[5].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[5].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[5].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[5].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[5].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[5].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[5].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[5].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[5].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[5].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("JPY") && showcurrency?.includes("JPY")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[6].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[6].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[6].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[6].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[6].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[6].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[6].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[6].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[6].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[6].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[6].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[6].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[6].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[6].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[6].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[6].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("KRW") && showcurrency?.includes("KRW")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[7].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[7].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[7].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[7].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[7].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[7].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[7].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[7].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[7].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[7].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[7].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[7].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[7].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[7].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[7].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[7].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
     if (currency?.includes("NZD") && showcurrency?.includes("NZD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[8].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[8].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[8].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[8].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[8].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[8].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[8].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[8].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[8].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[8].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[8].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[8].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[8].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[8].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[8].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[8].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("MYR") && showcurrency?.includes("MYR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[9].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[9].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[9].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[9].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[9].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[9].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[9].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[9].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[9].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[9].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[9].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[9].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[9].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[9].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[9].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[9].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("THB") && showcurrency?.includes("THB")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[10].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[10].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[10].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[10].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[10].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[10].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[10].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[10].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[10].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[10].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[10].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[10].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[10].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[10].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[10].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[10].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("VND") && showcurrency?.includes("VND")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[11].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[11].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[11].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[11].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[11].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[11].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[11].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[11].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[11].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[11].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[11].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[11].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[11].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[11].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[11].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[11].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("EGP") && showcurrency?.includes("EGP")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[12].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[12].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[12].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[12].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[12].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[12].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[12].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[12].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[12].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[12].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[12].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[12].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[12].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[12].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[12].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[12].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("IDR") && showcurrency?.includes("IDR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[13].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[13].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[13].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[13].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[13].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[13].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[13].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[13].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[13].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[13].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[13].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[13].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[13].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[13].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[13].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[13].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("PHP") && showcurrency?.includes("PHP")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[14].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[14].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[14].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[14].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[14].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[14].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[14].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[14].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[14].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[14].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[14].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[14].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[14].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[14].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[14].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[14].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("PKR") && showcurrency?.includes("PKR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[15].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[15].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[15].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[15].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[15].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[15].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[15].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[15].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[15].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[15].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[15].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[15].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[15].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[15].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[15].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[15].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("NPR") && showcurrency?.includes("NPR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[16].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[16].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[16].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[16].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[16].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[16].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[16].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[16].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[16].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[16].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[16].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[16].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[16].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[16].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[16].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[16].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("BDT") && showcurrency?.includes("BDT")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[17].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[17].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[17].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[17].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[17].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[17].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[17].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[17].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[17].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[17].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[17].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[17].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[17].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[17].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[17].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[17].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("LKR") && showcurrency?.includes("LKR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[18].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[18].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[18].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[18].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[18].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[18].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[18].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[18].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[18].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[18].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[18].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[18].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[18].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[18].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[18].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[18].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("TRY") && showcurrency?.includes("TRY")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[19].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[19].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[19].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[19].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[19].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[19].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[19].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[19].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[19].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[19].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[19].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[19].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[19].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[19].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[19].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[19].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("AED") && showcurrency?.includes("AED")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[20].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[20].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[20].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[20].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[20].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[20].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[20].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[20].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[20].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[20].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[20].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[20].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[20].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[20].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[20].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[20].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("KHR") && showcurrency?.includes("KHR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[21].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[21].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[21].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[21].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[21].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[21].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[21].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[21].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[21].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[21].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[21].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[21].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[21].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[21].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[21].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[21].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("HKD") && showcurrency?.includes("HKD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[22].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[22].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[22].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[22].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[22].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[22].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[22].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[22].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[22].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[22].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[22].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[22].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[22].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[22].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[22].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[22].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("MNT") && showcurrency?.includes("MNT")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[23].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[23].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[23].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[23].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[23].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[23].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[23].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[23].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[23].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[23].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[23].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[23].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[23].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[23].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[23].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[23].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("CNY") && showcurrency?.includes("CNY")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[24].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[24].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[24].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[24].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[24].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[24].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[24].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[24].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[24].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[24].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[24].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[24].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[24].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[24].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[24].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[24].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }


    if (currency?.includes("UGX") && showcurrency?.includes("UGX")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[25].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[25].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be null"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[25].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[25].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[25].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[25].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[25].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[25].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  fixed  fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[25].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[25].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[25].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[25].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[25].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[25].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[25].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[25].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }
    if (currency?.includes("KWD") && showcurrency?.includes("KWD")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[26].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[26].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[26].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[26].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[26].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[26].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[26].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[26].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[26].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[26].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[26].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[26].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[26].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[26].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[26].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[26].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("OMR") && showcurrency?.includes("OMR")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[27].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[27].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[27].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[27].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[27].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[27].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[27].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[27].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[27].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[27].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[27].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[27].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[27].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[27].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[27].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[27].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

    if (currency?.includes("LBP") && showcurrency?.includes("LBP")) {
      if (partnerDeliveryType.includes("RTP")) {
        if (CheckNull(rtpreceivefeeModel[28].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(rtpreceivefeeModel[28].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[28].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed  fees cannot be negative number"
          );
          formIsValid = false;
        }
        if (!(Number(rtpreceivefeeModel[28].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive  variable  fees cannot be negative number"
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("CashPickup")) {
        if (CheckNull(cashreceivefeeModel[28].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(cashreceivefeeModel[28].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[28].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive  fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(cashreceivefeeModel[28].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("MobileWallet")) {
        if (CheckNull(mobilereceivefeeModel[28].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(mobilereceivefeeModel[28].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[28].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(mobilereceivefeeModel[28].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
      if (partnerDeliveryType.includes("BankAccount")) {
        if (CheckNull(bankreceivefeeModel[28].receiveFixedFees)) {
          setreceivefixedfeeserrorMessage("Please enter Receive fixed fees.");
          formIsValid = false;
        }
        if (CheckNull(bankreceivefeeModel[28].receiveVariableFees)) {
          setreceivevariablefeeserrorMessage(
            "Please enter Receive variable fees."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[28].receiveFixedFees) >= 0)) {
          setreceivefixedfeeserrorMessage(
            "Receive fixed fees cannot be negative number."
          );
          formIsValid = false;
        }
        if (!(Number(bankreceivefeeModel[28].receiveVariableFees) >= 0)) {
          setreceivevariablefeeserrorMessage(
            "Receive variable fees cannot be negative number."
          );
          formIsValid = false;
        }
      }
    }

   

    return formIsValid;
  };


  const getPartnerReceiveFees = () => {
    setLoading(true);
    PartnerFeesDetailsService.getPartnerReceiveFeesByPartnerId(
      Number(partnerid),
      PartnerTypeStaticValue
    )
      .then((data) => {
        const receiveB2Bdata = data.data;
        if (receiveB2Bdata.length === 0) {
          setrtpreceivefeeModel(rtpreceivefeeModel);
          setcashreceivefeeModel(cashreceivefeeModel);
          setmobilereceivefeeModel(mobilereceivefeeModel);
          setbankreceivefeeModel(bankreceivefeeModel);
        } else {
          const defaultRtpdata = [...rtpreceivefeeModel];
          const defaultCashdata = [...cashreceivefeeModel];
          const defaultMobiledata = [...mobilereceivefeeModel];
          const defaultBankdata = [...bankreceivefeeModel];

          const rtpreceivefeeModelData = receiveB2Bdata.filter(
            (receive: any) => receive.partnerDeliveryType === 1
          );
          const cashreceivefeeModelData = receiveB2Bdata.filter(
            (receive: any) => receive.partnerDeliveryType === 5
          );
          const mobilereceivefeeModelData = receiveB2Bdata.filter(
            (receive: any) => receive.partnerDeliveryType === 4
          );
          const bankreceivefeeModelData = receiveB2Bdata.filter(
            (receive: any) => receive.partnerDeliveryType === 2
          );

          // rtp data
          rtpreceivefeeModelData.forEach((feeRecord: any) => {
            if (feeRecord.receiveFeeCurrency == "INR") {
              defaultRtpdata[0] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "USD") {
              defaultRtpdata[1] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BRL") {
              defaultRtpdata[2] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CAD") {
              defaultRtpdata[3] = feeRecord;
            }


            if (feeRecord.receiveFeeCurrency == "AUD") {
              defaultRtpdata[4] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "SGD") {
              defaultRtpdata[5] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "JPY") {
              defaultRtpdata[6] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KRW") {
              defaultRtpdata[7] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NZD") {
              defaultRtpdata[8] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MYR") {
              defaultRtpdata[9] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "THB") {
              defaultRtpdata[10] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "VND") {
              defaultRtpdata[11] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "EGP") {
              defaultRtpdata[12] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "IDR") {
              defaultRtpdata[13] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PHP") {
              defaultRtpdata[14] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PKR") {
              defaultRtpdata[15] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NPR") {
              defaultRtpdata[16] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BDT") {
              defaultRtpdata[17] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LKR") {
              defaultRtpdata[18] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "TRY") {
              defaultRtpdata[19] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "AED") {
              defaultRtpdata[21] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KHR") {
              defaultRtpdata[22] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "HKD") {
              defaultRtpdata[23] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MNT") {
              defaultRtpdata[24] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CNY") {
              defaultRtpdata[25] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "UGX") {
              defaultRtpdata[26] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KWD") {
              defaultRtpdata[27] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "OMR") {
              defaultRtpdata[28] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LBP") {
              defaultRtpdata[29] = feeRecord;
            }
            
          });
          setrtpreceivefeeModel(defaultRtpdata);

          // cash data
          cashreceivefeeModelData.forEach((feeRecord: any) => {
            if (feeRecord.receiveFeeCurrency == "INR") {
              defaultCashdata[0] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "USD") {
              defaultCashdata[1] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BRL") {
              defaultCashdata[2] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CAD") {
              defaultCashdata[3] = feeRecord;
            }

            if (feeRecord.receiveFeeCurrency == "AUD") {
              defaultCashdata[4] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "SGD") {
              defaultCashdata[5] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "JPY") {
              defaultCashdata[6] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KRW") {
              defaultCashdata[7] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NZD") {
              defaultCashdata[8] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MYR") {
              defaultCashdata[9] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "THB") {
              defaultCashdata[10] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "VND") {
              defaultCashdata[11] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "EGP") {
              defaultCashdata[12] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "IDR") {
              defaultCashdata[13] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PHP") {
              defaultCashdata[14] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PKR") {
              defaultCashdata[15] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NPR") {
              defaultCashdata[16] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BDT") {
              defaultCashdata[17] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LKR") {
              defaultCashdata[18] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "TRY") {
              defaultCashdata[19] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "AED") {
              defaultCashdata[21] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KHR") {
              defaultCashdata[22] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "HKD") {
              defaultCashdata[23] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MNT") {
              defaultCashdata[24] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CNY") {
              defaultCashdata[25] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "UGX") {
              defaultCashdata[26] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KWD") {
              defaultCashdata[27] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "OMR") {
              defaultCashdata[28] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LBP") {
              defaultCashdata[29] = feeRecord;
            }
            
          });
          setcashreceivefeeModel(defaultCashdata);

          // mobile data
          mobilereceivefeeModelData.forEach((feeRecord: any) => {
            if (feeRecord.receiveFeeCurrency == "INR") {
              defaultMobiledata[0] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "USD") {
              defaultMobiledata[1] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BRL") {
              defaultMobiledata[2] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CAD") {
              defaultMobiledata[3] = feeRecord;
            }

            if (feeRecord.receiveFeeCurrency == "AUD") {
              defaultMobiledata[4] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "SGD") {
              defaultMobiledata[5] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "JPY") {
              defaultMobiledata[6] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KRW") {
              defaultMobiledata[7] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NZD") {
              defaultMobiledata[8] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MYR") {
              defaultMobiledata[9] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "THB") {
              defaultMobiledata[10] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "VND") {
              defaultMobiledata[11] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "EGP") {
              defaultMobiledata[12] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "IDR") {
              defaultMobiledata[13] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PHP") {
              defaultMobiledata[14] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PKR") {
              defaultMobiledata[15] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NPR") {
              defaultMobiledata[16] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BDT") {
              defaultMobiledata[17] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LKR") {
              defaultMobiledata[18] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "TRY") {
              defaultMobiledata[19] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "AED") {
              defaultMobiledata[21] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KHR") {
              defaultMobiledata[22] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "HKD") {
              defaultMobiledata[23] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MNT") {
              defaultMobiledata[24] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CNY") {
              defaultMobiledata[25] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "UGX") {
              defaultMobiledata[26] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KWD") {
              defaultMobiledata[27] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "OMR") {
              defaultMobiledata[28] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LBP") {
              defaultMobiledata[29] = feeRecord;
            }
          });
          setmobilereceivefeeModel(defaultMobiledata);

          // bank data
          bankreceivefeeModelData.forEach((feeRecord: any) => {
            if (feeRecord.receiveFeeCurrency == "INR") {
              defaultBankdata[0] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "USD") {
              defaultBankdata[1] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BRL") {
              defaultBankdata[2] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CAD") {
              defaultBankdata[3] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "AUD") {
              defaultBankdata[4] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "SGD") {
              defaultBankdata[5] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "JPY") {
              defaultBankdata[6] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KRW") {
              defaultBankdata[7] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NZD") {
              defaultBankdata[8] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MYR") {
              defaultBankdata[9] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "THB") {
              defaultBankdata[10] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "VND") {
              defaultBankdata[11] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "EGP") {
              defaultBankdata[12] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "IDR") {
              defaultBankdata[13] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PHP") {
              defaultBankdata[14] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "PKR") {
              defaultBankdata[15] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "NPR") {
              defaultBankdata[16] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "BDT") {
              defaultBankdata[17] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LKR") {
              defaultBankdata[18] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "TRY") {
              defaultBankdata[19] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "AED") {
              defaultBankdata[21] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KHR") {
              defaultBankdata[22] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "HKD") {
              defaultBankdata[23] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "MNT") {
              defaultBankdata[24] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "CNY") {
              defaultBankdata[25] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "UGX") {
              defaultBankdata[26] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "KWD") {
              defaultBankdata[27] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "OMR") {
              defaultBankdata[28] = feeRecord;
            }
            if (feeRecord.receiveFeeCurrency == "LBP") {
              defaultBankdata[29] = feeRecord;
            }
            

          });
          setbankreceivefeeModel(defaultBankdata);
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
            summary: "Something went wrong",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };

  const getCurrenciesByPartnerId = (partnerid: any) => {
    setLoading(true);
    let getdatafor = 'currencies'
    CurrenciesService.getCurrenciesByPartnerId(partnerid,getdatafor)

      .then((data: any) => {
        const responsedata = data.data;

        const newData = responsedata
          .filter(
            (data: any) =>
              data.partnerPaymentRole === 2 || data.partnerPaymentRole === 3
          )
          .map((currency: any) => currency.currency);
        setShowCurrency(newData);
        const currencies = responsedata.map(
          (currency: any) => currency.currency
        );

        setCurrency(currencies);

        getPartnerReceiveFees();
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
  };

  const onAddClick = (e: any) => {
    e.preventDefault();
    ErrorMessageEmptyModel();
    const rtpreceivefeesapimodel = rtpreceivefeeModel.filter(
      (receive) =>
        receive.receiveFixedFees !== null && receive.receiveVariableFees
    );
    const casheceivefeesapimodel = cashreceivefeeModel.filter(
      (receive) =>
        receive.receiveFixedFees !== null && receive.receiveVariableFees
    );
    const mobilereceivefeesapimodel = mobilereceivefeeModel.filter(
      (receive) =>
        receive.receiveFixedFees !== null && receive.receiveVariableFees
    );
    const bankreceivefeesapimodel = bankreceivefeeModel.filter(
      (receive) =>
        receive.receiveFixedFees !== null && receive.receiveVariableFees
    );

    const finalApiData = [
      ...rtpreceivefeesapimodel,
      ...casheceivefeesapimodel,
      ...mobilereceivefeesapimodel,
      ...bankreceivefeesapimodel,
    ];
    setButtonLoading(true);
    if (isValidate()) {
      PartnerFeesDetailsService.addPartnerReceiveFees(finalApiData)
        .then((data) => {
          toast.current?.show({
            severity: "success",
            summary: "Receive fees added succesfully",
            life: 3000,
          });

          getPartnerReceiveFees();
          setButtonLoading(false);
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
              summary: "Error while adding partner receive fees.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  useEffect(() => {

    getCurrenciesByPartnerId(Number(partnerid));
  }, []);

  const onRTPhandleChange = (e: any, index: number) => {
    let newArr: any = [...rtpreceivefeeModel];
    newArr[index][e.target.name] = e.target.value;
    setrtpreceivefeeModel(newArr);
  };

  const onCashhandleChange = (e: any, index: number) => {
    let newArr: any = [...cashreceivefeeModel];
    newArr[index][e.target.name] = e.target.value;
    setcashreceivefeeModel(newArr);
  };

  const onMobilehandleChange = (e: any, index: number) => {
    let newArr: any = [...mobilereceivefeeModel];
    newArr[index][e.target.name] = e.target.value;
    setmobilereceivefeeModel(newArr);
  };

  const onBankhandleChange = (e: any, index: number) => {
    let newArr: any = [...bankreceivefeeModel];
    newArr[index][e.target.name] = e.target.value;
    setbankreceivefeeModel(newArr);
  };

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <table className="table fees-table">
            <Toast ref={toast}></Toast>
            <thead>
              <tr className="">
                <th>Currency</th>
                {partnerDeliveryType.includes("RTP") && (
                  <>
                    {" "}
                    <th>RTP Fixed Fees</th>
                    <th>RTP Variable Fees</th>
                  </>
                )}
                {partnerDeliveryType.includes("CashPickup") && (
                  <>
                    <th>Cash Fixed Fees</th>
                    <th>Cash Variable Fees</th>
                  </>
                )}
                {partnerDeliveryType.includes("MobileWallet") && (
                  <>
                    <th>Mobile Fixed Fees</th>
                    <th>Mobile Variable Fees</th>
                  </>
                )}
                {partnerDeliveryType.includes("BankAccount") && (
                  <>
                    <th>Bank Fixed Fees</th>
                    <th>Bank Variable Fees</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              <>
              {currency?.includes("INR") && showcurrency?.includes("INR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={INDimg} alt="img" className="currency-img" /> */}
                      INR
                    </td>
                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[0].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[0].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[0].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[0].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[0].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 0)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[0].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 0)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[0].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[0].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 0)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("USD") && showcurrency?.includes("USD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={USDlogo} alt="img" className="currency-img" /> */}
                      USD
                    </td>
                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[1].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[1].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[1].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[1].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[1].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 1)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[1].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 1)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[1].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[1].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 1)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("BRL") && showcurrency?.includes("BRL") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={BRLimg} alt="img" className="currency-img" /> */}
                      BRL
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        {" "}
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[2].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[2].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        {" "}
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[2].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[2].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[2].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 2)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[2].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 2)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[2].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[2].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 2)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("CAD") && showcurrency?.includes("CAD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      CAD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[3].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[3].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[3].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[3].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[3].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 3)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[3].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 3)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[3].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[3].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 3)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("AUD") && showcurrency?.includes("AUD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      AUD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[4].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[4].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[4].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[4].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[4].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 4)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[4].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 4)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[4].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[4].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 4)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("SGD") && showcurrency?.includes("SGD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      SGD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[5].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[5].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[5].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[5].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[5].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 5)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[5].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 5)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[5].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[5].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 5)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("JPY") && showcurrency?.includes("JPY") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      SGD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[6].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[6].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[6].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[6].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[6].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 6)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[6].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 6)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[6].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[6].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 6)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("KRW") && showcurrency?.includes("KRW") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      KRW
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[7].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[7].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[7].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[7].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[7].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 7)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[7].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 7)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[7].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[7].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 7)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("NZD") && showcurrency?.includes("NZD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      NZD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[8].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[8].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[8].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[8].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[8].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 8)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[8].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 8)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[8].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[8].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 8)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("MYR") && showcurrency?.includes("MYR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      MYR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[9].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[9].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[9].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[9].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[9].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 9)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[9].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 9)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[9].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[9].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 9)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("THB") && showcurrency?.includes("THB") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      THB
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[10].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[10].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[10].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[10].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[10].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 10)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[10].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 10)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[10].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[10].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 10)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("VND") && showcurrency?.includes("VND") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      VND
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[11].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[11].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[11].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[11].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[11].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 11)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[11].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 11)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[11].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[11].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 11)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("EGP") && showcurrency?.includes("EGP") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      EGP
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[12].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[12].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[12].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[12].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[12].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 12)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[12].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 12)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[12].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[12].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 12)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("IDR") && showcurrency?.includes("IDR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      IDR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[13].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[13].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[13].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[13].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[13].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 13)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[13].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 13)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[13].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[13].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 13)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("PHP") && showcurrency?.includes("PHP") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      PHP
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[14].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[14].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[14].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[14].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[14].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 14)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[14].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 14)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[14].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[14].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 14)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("PKR") && showcurrency?.includes("PKR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      PKR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[15].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[15].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[15].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[15].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[15].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 15)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[15].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 15)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[15].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[15].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 15)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("NPR") && showcurrency?.includes("NPR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      NPR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[16].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[16].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[16].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[16].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[16].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 16)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[16].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 16)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[16].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[16].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 16)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("BDT") && showcurrency?.includes("BDT") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      BDT
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[17].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[17].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[17].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[17].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[17].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 17)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[17].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 17)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[17].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[17].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 17)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("LKR") && showcurrency?.includes("LKR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      LKR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[18].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[18].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[18].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[18].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[18].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 18)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[18].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 18)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[18].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[18].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 18)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("TRY") && showcurrency?.includes("TRY") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      TRY
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[19].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[19].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[19].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[19].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[19].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 19)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[19].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 19)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[19].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[19].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 19)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("AED") && showcurrency?.includes("AED") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      AED
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[20].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[20].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[20].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[20].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[20].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 20)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[20].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 20)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[20].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[20].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 20)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("KHR") && showcurrency?.includes("KHR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      KHR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[21].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[21].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[21].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[21].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[21].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 21)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[21].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 21)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[21].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[21].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 21)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("HKD") && showcurrency?.includes("HKD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      HKD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[22].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[22].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[22].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[22].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[22].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 22)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[22].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 22)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[22].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[22].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 22)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("MNT") && showcurrency?.includes("MNT") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      MNT
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[23].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[23].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[23].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[23].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[23].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 23)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[23].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 23)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[23].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[23].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 23)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("CNY") && showcurrency?.includes("CNY") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      CNY
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[24].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[24].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[24].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[24].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[24].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 24)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[24].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 24)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[24].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[24].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 24)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("UGX") && showcurrency?.includes("UGX") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      CNY
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[25].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[25].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[25].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[25].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[25].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 25)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[25].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 25)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[25].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[25].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 25)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("KWD") && showcurrency?.includes("KWD") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      KWD
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[26].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[26].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[26].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[26].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[26].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 26)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[26].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 26)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[26].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[26].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 26)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )}

                {currency?.includes("OMR") && showcurrency?.includes("OMR") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      OMR
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[27].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[27].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[27].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[27].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[27].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 27)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[27].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 27)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[27].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[27].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 27)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )} 

                {currency?.includes("LBP") && showcurrency?.includes("LBP") && (
                  <tr>
                    <td className="border-right country-flag">
                      {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                      LBP
                    </td>

                    {partnerDeliveryType.includes("RTP") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[28].receiveFixedFees}
                              onChange={(e: any) => onRTPhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={rtpreceivefeeModel[28].receiveVariableFees}
                              onChange={(e: any) => onRTPhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("CashPickup") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={cashreceivefeeModel[28].receiveFixedFees}
                              onChange={(e: any) => onCashhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={cashreceivefeeModel[28].receiveVariableFees}
                              onChange={(e: any) => onCashhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("MobileWallet") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={mobilereceivefeeModel[28].receiveFixedFees}
                              onChange={(e: any) => onMobilehandleChange(e, 28)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={
                                mobilereceivefeeModel[28].receiveVariableFees
                              }
                              onChange={(e: any) => onMobilehandleChange(e, 28)}
                            />
                          </div>
                        </td>
                      </>
                    )}

                    {partnerDeliveryType.includes("BankAccount") && (
                      <>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              name="receiveFixedFees"
                              className="form-control"
                              aria-describedby="text"
                              value={bankreceivefeeModel[28].receiveFixedFees}
                              onChange={(e: any) => onBankhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                        <td className="border-right">
                          <div className="form-group">
                            <input

                              type="number"
                              className="form-control"
                              name="receiveVariableFees"
                              aria-describedby="text"
                              value={bankreceivefeeModel[28].receiveVariableFees}
                              onChange={(e: any) => onBankhandleChange(e, 28)}
                            />
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                )} 
              </>
            </tbody>
            <div className="fees-error">
              <div className="col-error">
                {receivefixedfeeserrorMessage !== null &&
                  receivefixedfeeserrorMessage.length > 0 ? (
                  <span className="error-msg">
                    {receivefixedfeeserrorMessage}
                  </span>
                ) : null}
              </div>
              <div className="col-error">
                {receivevariablefeeserrorMessage !== null &&
                  receivevariablefeeserrorMessage.length > 0 ? (
                  <span className="error-msg">
                    {receivevariablefeeserrorMessage}
                  </span>
                ) : null}
              </div>
            </div>
          </table>

          <div className="button-section">
            <div className="bottom-btns">

              <button
                type="button"
                className="btn btn-back second-btn"
              // onClick={onBackClick}
              >
                Back
              </button>
              &nbsp;&nbsp;
              {
                updateBtnShow ?

                  <Button
                    iconPos="left"
                    label=" Save and Continue"
                    className="btn btn-continue second-btn"
                    loading={buttonLoading}
                    onClick={(e) => onAddClick(e)}
                  /> : <button
                    type="button"
                    onClick={onNextClick}
                    className="p-button next-btn  "
                  >
                    Next
                  </button>
              }


            </div>
          </div>
        </>
      )}
    </>
  );
};

export default B2BReceiveFees;
