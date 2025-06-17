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

const B2BSendFees: React.FC<any> = ({ onSaveAndContinueClick, updateBtnShow, onNextClick }) => {
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );

  const [currency, setCurrency] = useState(null);
  const [showcurrency, setShowCurrency] = useState(null);
  const PartnerTypeStaticValue = "B2B";

  const [sendfixedfeeserrorMessage, setsendfixedfeeserrorMessage] =
    useState("");
  const [sendvariablefeeserrorMessage, setsendvariablefeeserrorMessage] =
    useState("");
  const { partnerid, type } = useParams();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendfeeNewModel, setsendfeeNewModel]: any = useState([
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "INR",
      sendFixedFees: null,
      sendVariableFees: null,
    },

    
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "USD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "BRL",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "CAD",
      sendFixedFees: null,
      sendVariableFees: null,
    },


    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "AUD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "SGD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "JPY",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "KRW",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "NZD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "MYR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "THB",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "VND",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "EGP",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "IDR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "PHP",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "PKR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "INR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "NPR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "BDT",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "LKR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "TRY",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "AED",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "KHR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "HKD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "MNT",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "CNY",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "UGX",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "KWD",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "OMR",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    {
      id: 0,
      partnerId: Number(partnerid),
      partnerSendFeeType: 1,
      partnerSendFeeTier: null,
      sendFeeCurrency: "LBP",
      sendFixedFees: null,
      sendVariableFees: null,
    },
    

   
  ]);

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };

  const ErrorMessageEmptyModel = () => {
    setsendfixedfeeserrorMessage("");
    setsendvariablefeeserrorMessage("");
  };

  const isValidate = () => {
    let formIsValid = true;

    if (currency?.includes("INR") && showcurrency?.includes("INR")) {
      if (CheckNull(sendfeeNewModel[0].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[0].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[0].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[0].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("USD") && showcurrency?.includes("USD")) {
      if (CheckNull(sendfeeNewModel[1].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[1].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[1].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number."
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[1].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number."
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("BRL") && showcurrency?.includes("BRL")) {
      if (CheckNull(sendfeeNewModel[2].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[2].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[2].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number."
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[2].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number."
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("CAD") && showcurrency?.includes("CAD")) {
      if (CheckNull(sendfeeNewModel[3].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[3].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[3].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number."
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[3].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number."
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("AUD") && showcurrency?.includes("AUD")) {
      if (CheckNull(sendfeeNewModel[4].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[4].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[4].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number."
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[4].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number."
        );
        formIsValid = false;
      }
    } 
    if (currency?.includes("SGD") && showcurrency?.includes("SGD")) {
      if (CheckNull(sendfeeNewModel[5].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[5].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[5].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[5].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("JPY") && showcurrency?.includes("JPY")) {
      if (CheckNull(sendfeeNewModel[6].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[6].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[6].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[6].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("KRW") && showcurrency?.includes("KRW")) {
      if (CheckNull(sendfeeNewModel[7].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[7].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[7].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[7].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("NZD") && showcurrency?.includes("NZD")) {
      if (CheckNull(sendfeeNewModel[8].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[8].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[8].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[8].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("MYR") && showcurrency?.includes("MYR")) {
      if (CheckNull(sendfeeNewModel[9].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[9].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[9].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[9].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("THB") && showcurrency?.includes("THB")) {
      if (CheckNull(sendfeeNewModel[10].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[10].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[10].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[10].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("VND") && showcurrency?.includes("VND")) {
      if (CheckNull(sendfeeNewModel[11].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[11].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[11].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[11].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("EGP") && showcurrency?.includes("EGP")) {
      if (CheckNull(sendfeeNewModel[12].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[12].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[12].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[12].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("IDR") && showcurrency?.includes("IDR")) {
      if (CheckNull(sendfeeNewModel[13].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[13].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[13].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[13].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("PHP") && showcurrency?.includes("PHP")) {
      if (CheckNull(sendfeeNewModel[14].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[14].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[14].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[14].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("PKR") && showcurrency?.includes("PKR")) {
      if (CheckNull(sendfeeNewModel[15].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[15].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[15].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[15].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("NPR") && showcurrency?.includes("NPR")) {
      if (CheckNull(sendfeeNewModel[16].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[16].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[16].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[16].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("BDT") && showcurrency?.includes("BDT")) {
      if (CheckNull(sendfeeNewModel[17].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[17].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[17].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[17].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("LKR") && showcurrency?.includes("LKR")) {
      if (CheckNull(sendfeeNewModel[17].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[17].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[17].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[17].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("TRY") && showcurrency?.includes("TRY")) {
      if (CheckNull(sendfeeNewModel[18].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[18].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[18].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[18].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }


    if (currency?.includes("AED") && showcurrency?.includes("AED")) {
      if (CheckNull(sendfeeNewModel[19].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[19].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[19].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[19].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("KHR") && showcurrency?.includes("KHR")) {
      if (CheckNull(sendfeeNewModel[20].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[20].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[20].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[20].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }
    if (currency?.includes("HKD") && showcurrency?.includes("HKD")) {
      if (CheckNull(sendfeeNewModel[21].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[21].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[21].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[21].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("MNT") && showcurrency?.includes("MNT")) {
      if (CheckNull(sendfeeNewModel[22].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[22].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[22].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[22].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("CNY") && showcurrency?.includes("CNY")) {
      if (CheckNull(sendfeeNewModel[23].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[23].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[23].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[23].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }


    if (currency?.includes("UGX") && showcurrency?.includes("UGX")) {
      if (CheckNull(sendfeeNewModel[24].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[24].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[24].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[24].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }

    if (currency?.includes("KWD") && showcurrency?.includes("KWD")) {
      if (CheckNull(sendfeeNewModel[25].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[25].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[25].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[25].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }
    if (currency?.includes("OMR") && showcurrency?.includes("OMR")) {
      if (CheckNull(sendfeeNewModel[26].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[26].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[26].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[26].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }
    if (currency?.includes("LBP") && showcurrency?.includes("LBP")) {
      if (CheckNull(sendfeeNewModel[27].sendFixedFees)) {
        setsendfixedfeeserrorMessage("Please enter send fixed fees.");
        formIsValid = false;
      }
      if (CheckNull(sendfeeNewModel[27].sendVariableFees)) {
        setsendvariablefeeserrorMessage("Please enter send variable fees.");
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[27].sendFixedFees) >= 0)) {
        setsendfixedfeeserrorMessage(
          "Send fixed fees cannot be negative number"
        );
        formIsValid = false;
      }

      if (!(Number(sendfeeNewModel[27].sendVariableFees) >= 0)) {
        setsendvariablefeeserrorMessage(
          "Send variable fees cannot be negative number"
        );
        formIsValid = false;
      }
    }


    return formIsValid;
  };

  // const onBackClick = () => {
  //   onSaveAndContinueClick("B");
  // };

  const getPartnerSendFees = () => {
    setLoading(true);

    PartnerFeesDetailsService.getPartnerSendFeesByPartnerId(
      Number(partnerid),
      PartnerTypeStaticValue
    )
      .then((data) => {
        const feesData = data.data;

        if (feesData.length === 0) {
          setsendfeeNewModel(sendfeeNewModel);
        } else {
          const defaultdata = [...sendfeeNewModel];

          feesData.forEach((feeRecord: any) => {
            if (feeRecord.sendFeeCurrency == "INR") {
              defaultdata[0] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "USD") {
              defaultdata[1] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "BRL") {
              defaultdata[2] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "CAD") {
              defaultdata[3] = feeRecord;
            }

            if (feeRecord.sendFeeCurrency == "AUD") {
              defaultdata[4] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "SGD") {
              defaultdata[5] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "JPY") {
              defaultdata[6] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "KRW") {
              defaultdata[7] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "NZD") {
              defaultdata[8] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "MYR") {
              defaultdata[9] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "THB") {
              defaultdata[10] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "VND") {
              defaultdata[11] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "EGP") {
              defaultdata[12] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "IDR") {
              defaultdata[13] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "PHP") {
              defaultdata[14] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "PKR") {
              defaultdata[15] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "NPR") {
              defaultdata[16] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "BDT") {
              defaultdata[17] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "LKR") {
              defaultdata[18] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "TRY") {
              defaultdata[19] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "AED") {
              defaultdata[20] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "KHR") {
              defaultdata[21] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "HKD") {
              defaultdata[22] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "MNT") {
              defaultdata[23] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "CNY") {
              defaultdata[24] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "UGX") {
              defaultdata[25] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "KWD") {
              defaultdata[26] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "OMR") {
              defaultdata[27] = feeRecord;
            }
            if (feeRecord.sendFeeCurrency == "LBP") {
              defaultdata[28] = feeRecord;
            }
           

          });
          setsendfeeNewModel(defaultdata);
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
            summary: "Error while getting partner send fees details.",
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
              data.partnerPaymentRole === 1 || data.partnerPaymentRole === 3
          )
          .map((currency: any) => currency.currency);
        setShowCurrency(newData);

        const currencies = responsedata.map(
          (currency: any) => currency.currency
        );

        setCurrency(currencies);

        getPartnerSendFees();
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

  useEffect(() => {

    getCurrenciesByPartnerId(Number(partnerid));
  }, []);

  const onAddClick = () => {
    ErrorMessageEmptyModel();
    const sendFeeModel = sendfeeNewModel.filter(
      (send: any) => send.sendFixedFees !== null
    );
   
    setButtonLoading(true);
    if (isValidate()) {
      PartnerFeesDetailsService.addPartnerSendFees(sendFeeModel)
        .then((data) => {
          toast.current?.show({
            severity: "success",
            summary: "Send fees added successfully",
            life: 3000,
          });

          getPartnerSendFees();
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
              summary: "Error while adding partner send fees.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const onhandleChange = (e: any, index: number) => {
    let newArr: any = [...sendfeeNewModel];
    newArr[index][e.target.name] = e.target.value;
    setsendfeeNewModel(newArr);
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
                <th>Send Fixed Fees</th>
                <th>Send Variable Fees</th>
              </tr>
            </thead>
            <tbody>
              {currency?.includes("INR") && showcurrency?.includes("INR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={INDimg} alt="img" className="currency-img" /> */}
                    INR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[0].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 0)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[0].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 0)}
                      />
                    </div>
                  </td>
                </tr>
              )}

              {currency?.includes("USD") && showcurrency?.includes("USD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={USDlogo} alt="img" className="currency-img" /> */}
                    USD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[1].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 1)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[1].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 1)}
                      />
                    </div>
                  </td>
                </tr>
              )}
              {currency?.includes("BRL") && showcurrency?.includes("BRL") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={BRLimg} alt="img" className="currency-img" /> */}
                    BRL
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[2].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 2)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[2].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 2)}
                      />
                    </div>
                  </td>
                </tr>
              )}
              {currency?.includes("CAD") && showcurrency?.includes("CAD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    CAD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[3].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 3)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[3].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 3)}
                      />
                    </div>
                  </td>
                </tr>
              )}

              {currency?.includes("AUD") && showcurrency?.includes("AUD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    AUD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[4].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 4)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[4].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 4)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("SGD") && showcurrency?.includes("SGD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    SGD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[5].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 5)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[5].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 5)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("JPY") && showcurrency?.includes("JPY") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    JPY
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[6].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 6)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[6].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 6)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("KRW") && showcurrency?.includes("KRW") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    KRW
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[7].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 7)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[7].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 7)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("NZD") && showcurrency?.includes("NZD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    NZD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[8].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 8)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[8].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 8)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("MYR") && showcurrency?.includes("MYR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    MYR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[9].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 9)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[9].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 9)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("THB") && showcurrency?.includes("THB") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    THB
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[10].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 10)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[10].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 10)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("VND") && showcurrency?.includes("VND") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    VND
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[11].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 11)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[11].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 11)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("EGP") && showcurrency?.includes("EGP") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    EGP
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[12].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 12)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[12].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 12)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("IDR") && showcurrency?.includes("IDR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    IDR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[13].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 13)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[13].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 13)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("PHP") && showcurrency?.includes("PHP") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    PHP
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[14].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 14)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[14].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 14)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("PKR") && showcurrency?.includes("PKR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    PKR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[15].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 15)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[15].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 15)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("NPR") && showcurrency?.includes("NPR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    NPR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[16].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 16)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[16].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 16)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("BDT") && showcurrency?.includes("BDT") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    BDT
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[17].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 17)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[17].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 17)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("LKR") && showcurrency?.includes("LKR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    LKR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[17].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 17)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[17].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 17)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("TRY") && showcurrency?.includes("TRY") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    TRY
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[18].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 18)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[18].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 18)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("AED") && showcurrency?.includes("AED") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    AED
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[19].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 19)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[19].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 19)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("KHR") && showcurrency?.includes("KHR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    KHR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[20].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 20)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[20].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 20)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("HKD") && showcurrency?.includes("HKD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    HKD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[21].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 21)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[21].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 21)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("MNT") && showcurrency?.includes("MNT") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    MNT
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[22].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 22)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[22].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 22)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("CNY") && showcurrency?.includes("CNY") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    CNY
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[23].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 23)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[23].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 23)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("UGX") && showcurrency?.includes("UGX") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    UGX
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[24].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 24)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[24].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 24)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("KWD") && showcurrency?.includes("KWD") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    KWD
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[25].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 25)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[25].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 25)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("OMR") && showcurrency?.includes("OMR") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    OMR
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[26].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 26)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[26].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 26)}
                      />
                    </div>
                  </td>
                </tr>
              )}
               {currency?.includes("LBP") && showcurrency?.includes("LBP") && (
                <tr>
                  <td className="border-right country-flag">
                    {/* <img src={CANADAimg} alt="img" className="currency-img" /> */}
                    LBP
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        name="sendFixedFees"
                        className="form-control"
                        aria-describedby="text"
                        value={sendfeeNewModel[27].sendFixedFees}
                        onChange={(e: any) => onhandleChange(e, 27)}
                      />
                    </div>
                  </td>
                  <td className="border-right">
                    <div className="form-group">
                      <input

                        type="number"
                        className="form-control"
                        name="sendVariableFees"
                        aria-describedby="text"
                        value={sendfeeNewModel[27].sendVariableFees}
                        onChange={(e: any) => onhandleChange(e, 27)}
                      />
                    </div>
                  </td>
                </tr>
              )}
              

            </tbody>
            <div className="fees-error">
              <div className="col-error">
                {sendfixedfeeserrorMessage !== null &&
                  sendfixedfeeserrorMessage.length > 0 ? (
                  <span className="error-msg">{sendfixedfeeserrorMessage}</span>
                ) : null}
              </div>
              <div className="col-error">
                {sendvariablefeeserrorMessage !== null &&
                  sendvariablefeeserrorMessage.length > 0 ? (
                  <span className="error-msg">
                    {sendvariablefeeserrorMessage}
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
              //  onClick={onBackClick}
              >
                Back
              </button>
              &nbsp;&nbsp;
              {
                updateBtnShow ?


                  <Button
                    iconPos="left"
                    label=" Save and Continue"
                    loading={buttonLoading}
                    className="btn btn-continue second-btn"
                    onClick={onAddClick}
                  />
                  :
                  <button
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

export default B2BSendFees;
