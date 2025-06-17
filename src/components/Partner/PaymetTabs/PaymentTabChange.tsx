import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PartnershipDetailsService } from "../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import Paymentsettingread from "../PaymentReadonly/Paymentsettingread";
import B2BorC2BTransactionLimits from "../TransactionLimits/B2BorC2BTransactionLimits";
import B2CorB2BTransactionLimits from "../TransactionLimits/B2CorB2BTransaction";
import B2CorC2CTransactionLimits from "../TransactionLimits/B2CorC2CTransactionLimits";
import C2BorC2CTransactionLimits from "../TransactionLimits/C2BorC2CTransactionLimit";
import ReceiveDelivery from "../TransactionLimits/ReceiveDelivery";
import { getTabActiveIndex } from "../../../utils/utils";
import SenderDelivery from "../TransactionLimits/SenderDelivery";
import Scrollbars from "react-custom-scrollbars-2";

const PaymentTabChange: React.FC<any> = ({ onSaveAndContinueClick }) => {
  const [showB2B1, setShowB2B1] = React.useState(false);
  const [showB2C2, setShowB2C2] = React.useState(false);
  const [showB2CorB2B4, setshowB2CorB2B4] = React.useState(false);
  const [showC2BorC2C5, setShowC2BorC2C5] = React.useState(false);
  const [receiveDelivery3, setReceiveDelivery3] = React.useState(false);
  const [senderDelivery6, setSenderDelivery6] = React.useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [partnerType, setPartnerType]: any = useState([]);

  const [buttonLoadingSkip, setButtonLoadingSkip] = useState(false);
  const [buttonLoadingBack, setButtonLoadingBack] = useState(false);

  const [partnerDeliveryType, setPartnerDeliveryType]: any = useState([]);
  const { partnerid, type } = useParams();
  const [paymentRead, setPaymentRead] = React.useState(false);

  const [showB2BorC2BTransactionLimits1, setShowB2BorC2BTransactionLimits1] =
    React.useState(false);
  const [showB2CorC2CTransactionLimits2, setShowB2CorC2CTransactionLimits2] =
    React.useState(false);
  const [showB2CorB2BTransactionLimits4, setShowB2CorB2BTransactionLimits4] =
    React.useState(false);
  const [showC2BorC2CTransactionLimits5, setShowC2BorC2CTransactionLimits5] =
    React.useState(false);
  const [showReceiverDeliveryLimits3, setReceiverDeliveryLimits3] =
    React.useState(false);

  const [showSenderDeliveryLimits6, setSenderDeliveryLimits6] =
    React.useState(false);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );

  const onNextClick = () => {
    setPaymentRead(true);
    const partnerTypeLength = JSON.parse(partnerType).length;

    if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
      setShowB2B1(true);
    }
    if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
      setShowB2C2(true);
    }
    if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
      setShowB2C2(true);
    }
    if (
      partnerTypeLength === 2 &&
      partnerType.includes("B2B") &&
      partnerType.includes("B2C")
    ) {
      setShowB2B1(true);
    }
    if (
      partnerTypeLength === 2 &&
      partnerType.includes("B2C") &&
      partnerType.includes("C2C")
    ) {
      setShowB2C2(true);
  
    }
    if (
      partnerTypeLength === 2 &&
      partnerType.includes("B2B") &&
      partnerType.includes("C2C")
    ) {
      setShowB2B1(true);
    }
    if (
      partnerTypeLength === 3 &&
      partnerType.includes("B2B") &&
      partnerType.includes("B2C") &&
      partnerType.includes("C2C")
    ) {
      setShowB2B1(true);
    }
  };

  const onBackClick = () => {
    onSaveAndContinueClick("B");
  };
  const onSendNextClick = () => {
    setButtonLoadingSkip(true);
    setTimeout(() => {
      onSaveAndContinueClick("N");
    }, 100);
  };


  const onB2BorC2BTransactionLimitsAddClick = () => {
    setButtonLoadingSkip(true);

    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;

      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setShowB2B1(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setShowB2B1(false);
        setShowB2C2(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setShowB2B1(false);
        setShowB2C2(true);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowB2B1(false);
        setShowB2C2(true);
      }
    }, 100);
  };

  const onB2CorC2CTransactionLimitsAddClick = () => {
    setButtonLoadingSkip(true);

    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }

      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }

      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowB2C2(false);
        setReceiveDelivery3(true);
      }
    }, 100);
  };

  const onC2BorC2CTransactionLimitsAddClick = () => {
    setButtonLoadingSkip(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
        setShowC2BorC2C5(false);
        setSenderDelivery6(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(false);
        setSenderDelivery6(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(false);
        setSenderDelivery6(true);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(false);
        setSenderDelivery6(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setShowC2BorC2C5(false);
        setSenderDelivery6(true);
      }
    }, 100);
  };

  const onB2CorB2BTransactionLimitsAddClick = () => {
    
    setButtonLoadingSkip(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setshowB2CorB2B4(false);
        setSenderDelivery6(true);
      }
      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
        setshowB2CorB2B4(false);
        setSenderDelivery6(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
     
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true)
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
     
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true)
      }
    }, 100);
  };

  const onReceiverDeliveryLimits = () => {
    setButtonLoadingSkip(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setReceiveDelivery3(false);
        setshowB2CorB2B4(true);
      }

      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
        setReceiveDelivery3(false);
        setshowB2CorB2B4(true);
      }

      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
        setReceiveDelivery3(false);
        setShowC2BorC2C5(true);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(false);
        setshowB2CorB2B4(true);
      }


      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(false);
        setshowB2CorB2B4(true);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(false);
        setshowB2CorB2B4(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
     
     setReceiveDelivery3(false);
     setshowB2CorB2B4(true);

      }
    }, 100);
  };

  const onSenderDeliveryLimits = () => {
    setButtonLoadingSkip(true);

    setSenderDeliveryLimits6(true);
  };

  const B2BorC2BTransactionLimitsBackClick = () => {
    setButtonLoadingBack(true);

    setTimeout(() => {
      setShowB2B1(false);
      setPaymentRead(false);
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setShowB2B1(false);
        setPaymentRead(false);
      }

      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowB2B1(false);
        setPaymentRead(false);
      }
   
    }, 1000);
  };

  const B2CTransactionLimitsBackClick = () => {
 
    setButtonLoadingBack(true);

    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
      
        setShowB2C2(false);
        setPaymentRead(false);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
       
        setShowB2C2(false);
        setShowB2B1(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
       
        setShowB2C2(false);
        setShowB2B1(true);
      }
      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
       
        setShowB2C2(false);
        setPaymentRead(false);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        
        setShowB2C2(false);
        setShowB2B1(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
     
        setShowB2C2(false);
        setPaymentRead(false);
      }
    }, 1000);
  };


  const ReceiveDeliveryBackClick = () => {
    setButtonLoadingBack(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;

      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(false);
        setShowB2C2(true);
      }
      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
        setReceiveDelivery3(false);
        setShowB2C2(true);
      }
      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setReceiveDelivery3(false);
        setShowB2B1(true);
      }

      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
        setReceiveDelivery3(false);
        setShowB2C2(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(false);
        setShowB2C2(true);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setReceiveDelivery3(false);
        setShowB2C2(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
       
        setReceiveDelivery3(false);
      
        setShowB2C2(true);
      }
    }, 1000);
  };

  const B2CorB2BTransactionLimitsBackClick = () => {
    setButtonLoadingBack(true);

    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("B2C")) {
        setshowB2CorB2B4(false);
        setReceiveDelivery3(true);
      }

      if (partnerTypeLength === 1 && partnerType.includes("B2B")) {
        setshowB2CorB2B4(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setReceiveDelivery3(true);
        setshowB2CorB2B4(false);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setshowB2CorB2B4(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setReceiveDelivery3(true);
        setshowB2CorB2B4(false);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("B2C")
      ) {
     
        setshowB2CorB2B4(false);
       setReceiveDelivery3(true)
      }
    }, 1000);
  };

  const C2BorC2CTransactionLimitsBackClick = () => {
    setButtonLoadingBack(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerTypeLength === 1 && partnerType.includes("C2C")) {
        setShowC2BorC2C5(false);
        setReceiveDelivery3(true);
      }
      if (
        partnerTypeLength === 3 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(false);
        setshowB2CorB2B4(true);
        setReceiveDelivery3(false);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(false);
        setshowB2CorB2B4(true);
        setReceiveDelivery3(false);
      }

      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2C") &&
        partnerType.includes("C2C")
      ) {
 
        setShowC2BorC2C5(false);
        setshowB2CorB2B4(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
        
      ) {
 
        setShowC2BorC2C5(false);
 
        setshowB2CorB2B4(true);
      }
    }, 1000);
  };

  const SenderDeliveryBackClick = () => {
    setButtonLoadingBack(true);
    setTimeout(() => {
      const partnerTypeLength = JSON.parse(partnerType).length;
      if (partnerType.includes("B2C")) {
        setshowB2CorB2B4(true);
        setSenderDelivery6(false);
      }
      if (partnerType.includes("B2B")) {
        setshowB2CorB2B4(true);
        setSenderDelivery6(false);
      }

      if (partnerType.includes("C2C")) {
        setSenderDelivery6(false);
        setShowC2BorC2C5(true);
      }
      if (partnerType.includes("B2C") && partnerType.includes("C2C")) {
        setSenderDelivery6(false);
        setshowB2CorB2B4(false);
        setShowC2BorC2C5(true);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("C2C")
      ) {
        setShowC2BorC2C5(true);
        setshowB2CorB2B4(false);
      }
      if (
        partnerTypeLength === 2 &&
        partnerType.includes("B2B") &&
        partnerType.includes("B2C")
      ) {
        setShowC2BorC2C5(true);
        setshowB2CorB2B4(false);
      }
    }, 1000);
  };




  const getPartnershipDetailsByPartnerId = () => {
    setLoading(true);

    PartnershipDetailsService.getPartnershipDetailsByPartnerId(
      Number(partnerid)
    ).then((response) => {
      const data = response.data;
      const index = getTabActiveIndex(
        data.partnerPaymentRole,
        data.partnerTypes
      );
      setActiveIndex(index);
      setPartnerType(data.partnerTypes);
      setPartnerDeliveryType(data.partnerDeliveryType);
      setLoading(false);
    });

    setLoading(false);
  };
  useEffect(() => {
    getPartnershipDetailsByPartnerId();
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <Scrollbars
            className="contain-scroll"
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            thumbMinSize={30}
            universal={true}
          >
            <div className="container-fluid acc-screen paymentsetting-readscreen acccount-seeting-screen">
              <div className="user-tab">
                {!paymentRead && (
                  <Paymentsettingread
                    onNextClick={onNextClick}
                    onBackClick={onBackClick}
                  />
                )}
                <>
                  {showB2B1 && (
                    <B2BorC2BTransactionLimits
                      setShowB2B1={setShowB2B1}
                      onB2BorC2BTransactionLimitsAddClick={
                        onB2BorC2BTransactionLimitsAddClick
                      }
                      B2BorC2BTransactionLimitsBackClick={
                        B2BorC2BTransactionLimitsBackClick
                      }
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>

                <>
                  {showB2C2 && (
                    <B2CorC2CTransactionLimits
                      setShowB2C2={setShowB2C2}
                      onB2CorC2CTransactionLimitsAddClick={
                        onB2CorC2CTransactionLimitsAddClick
                      }
                      B2CTransactionLimitsBackClick={
                        B2CTransactionLimitsBackClick
                      }
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>

                <>
                  {receiveDelivery3 && (
                    <ReceiveDelivery
                      setReceiveDelivery3={setReceiveDelivery3}
                      onReceiverDeliveryLimits={onReceiverDeliveryLimits}
                      ReceiveDeliveryBackClick={ReceiveDeliveryBackClick}
                      setPartnerDeliveryType={partnerDeliveryType}
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>

                <>
                  {showC2BorC2C5 && (
                    <C2BorC2CTransactionLimits
                      setShowC2BorC2C5={setShowC2BorC2C5}
                      onC2BorC2CTransactionLimitsAddClick={
                        onC2BorC2CTransactionLimitsAddClick
                      }
                      C2BorC2CTransactionLimitsBackClick={
                        C2BorC2CTransactionLimitsBackClick
                      }
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>

                <>
                  {showB2CorB2B4 && (
                    <B2CorB2BTransactionLimits
                      setshowB2CorB2B4={setshowB2CorB2B4}
                      onB2CorB2BTransactionLimitsAddClick={
                        onB2CorB2BTransactionLimitsAddClick
                      }
                      B2CorB2BTransactionLimitsBackClick={
                        B2CorB2BTransactionLimitsBackClick
                      }
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>
                <>
                  {senderDelivery6 && (
                    <SenderDelivery
                      onSendNextClick={onSendNextClick}
                      setSenderDelivery6={setSenderDelivery6}
                      onSenderDeliveryLimits={onSenderDeliveryLimits}
                      SenderDeliveryBackClick={SenderDeliveryBackClick}
                      setPartnerDeliveryType={partnerDeliveryType}
                      buttonLoadingBack={buttonLoadingBack}
                      buttonLoadingSkip={buttonLoadingSkip}
                      setButtonLoadingBack={setButtonLoadingBack}
                      setButtonLoadingSkip={setButtonLoadingSkip}
                    />
                  )}
                </>
              </div>
            </div>
          </Scrollbars>
        </>
      )}
    </>
  );
                  };

export default PaymentTabChange;
