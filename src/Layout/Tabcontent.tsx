import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Address from "../components/Partner/Address/Address";
import BasicInfo from "../components/Partner/BasicInfo/BasicInfo";
import Contact from "../components/Partner/Contact/Contact";
import Documents from "../components/Partner/Documents/Documents";
import PersonalDetails from "../components/Partner/PersonalDetails/PersonalDetails";
import "./Tabcontent.css";
import Currencies from "../components/Partner/Currencies/Currencies";
import Fees from "../components/Partner/Fees/Fees";
import PartnershipDetails from "../components/Partner/PartnershipDetails/PartnershipDetails";
import PaymentTabChange from "../components/Partner/PaymetTabs/PaymentTabChange";
import UserManagement from "../components/Partner/UserManagement/UserManagement";
import Wallet from "../components/Partner/Wallet/Wallet";
import "./Tabcontent.css";
import sessionStorageContext from "../components/context/LocalStorageContext";
import { BasicInfoService } from "../services/Partner/BasicInfo/BasicInfoService";
import { Toast } from "primereact/toast";
import { Logout } from "../utils/AccountUtils";
import ComplianceTab from "../components/AdminTabcontent/ComplianceTab";


const Tabcontent = () => {
  const { partnerid, type } = useParams();
  const [stepFlag, setStepFlag] = useState<any>(
    0
  );
  const context = useContext(sessionStorageContext);
  const [value, setValue] = useState(parseInt(stepFlag) + 1);
  const [buttonLoadingSkip, setButtonLoadingSkip] = useState(false)
  const [buttonLoadingBack, setButtonLoadingBack] = useState(false)

  const [buttonValue, setButtonValue] = useState(false);

  const onSaveAndContinueClick = (flag: string) => {
    const number = 1;
    if (flag === "N") {
      setValue(value + number);
      setStepFlag(sessionStorage.getItem("StepFlag"));
    } else {
      setValue(value - number);
    }
  };

  const onNextClick = () => {
    if (buttonValue == false) {
      setButtonLoadingSkip(true);
      setTimeout(() => {

        const number = 1;
        setValue(value + number);
      }, 1000);

    }

  };

  const onStepClick = (val: any) => {
    if (buttonValue == false) {
      setValue(val);
    }
  };

  const onBackbtn = () => {
    setButtonLoadingBack(true)
    setTimeout(() => {
      const number = 1;
      setValue(value + number);
    }, 1000);
  }

  if (value == 11) {
    setValue(1);
  }

  return (
    <>
      <div className="tab-content" id="pills-tabContent">
        <ul className="tab-pane active" id="myTab" role="tablist">
          <div className="payment-steps">
            <ul className="steps">
              <li className="step">
                <span
                  className={
                    value === 1 ? "payment-count active" : "payment-count"
                  }
                  onClick={() => onStepClick(1)}
                >
                  1
                </span>
                <span className="pl-8 step-title text-blue">Basic Info</span>
                <span className="payment-line" />
              </li>
              <li className="step">
                <span
                  className={
                    value === 2 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(2)
                  }
                >
                  2
                </span>
                <span className="pl-8 step-title text-blue">Address</span>
                <span className="payment-line" />
              </li>
              <li className="step">
                <span
                  className={
                    value === 3 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(3)
                  }
                >
                  3
                </span>
                <span className="pl-8 step-title text-blue">Contact Info</span>
                <span className="payment-line" />
              </li>
              <li className="step">
                <span
                  className={
                    value === 4 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(4)
                  }
                >
                  4
                </span>
                <span className="pl-8 step-title text-blue">Compliance</span>

                {type === "V" ?
                  <span className="payment-line" />
                  : null}
              </li>
              <li className="step">
                <span
                  className={
                    value === 5 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(5)
                  }
                >
                  5
                </span>
                <span className="pl-8 step-title text-blue">Personal Details</span>

                {type === "V" ?
                  <span className="payment-line" />
                  : null}
              </li>
              {/* {type === "V" ?
                <li className="step">
                  <span
                    className={
                      value === 5 ? "payment-count active" : "payment-count"
                    }
                    onClick={() =>
                      onStepClick(5)
                    }
                  >
                    5
                  </span>
                  <span className="pl-8 step-title text-blue">Personal Details</span>
                  <span className="payment-line" />

                </li>
                : null} */}

              <li className="step">
                <span
                  className={
                    value === 6 ? "payment-count active" : "payment-count"
                  }
                  onClick={() => onStepClick(6)}
                >
                  6
                </span>
                <span className="pl-8 step-title text-blue">
                  Partnership Details
                </span>


                <span className="payment-line" />

              </li>

              <li className="step">
                <span
                  className={
                    value === 7 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(7)
                  }
                >
                  7
                </span>
                <span className="pl-8 step-title text-blue">Countries</span>
                <span className="payment-line" />
              </li>
              <li className="step">
                <span
                  className={
                    value === 8 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(8)
                  }
                >
                  8
                </span>
                <span className="pl-8 step-title text-blue">Wallet</span>

                <span className="payment-line" />

              </li>

              <li className="step">
                <span
                  className={
                    value === 9 ? "payment-count active" : "payment-count"
                  }
                  onClick={() =>
                    onStepClick(9)
                  }
                >
                  9
                </span>
                <span className="pl-8 step-title text-blue">Fees</span>
                {context.Isfacilitator === false ? (
                  <>

                    {context.role === 1 || context.role === 0 ? null : (

                      <span className="payment-line" />
                    )}
                  </>

                ) : (null)}

              </li>

              {context.Isfacilitator === false ? (<>
                {/* partnerPaymentRole */}
                {context.role === 1 || context.role === 0 ? null : (
                  <li className="step">
                    <span
                      className={
                        value === 10 ? "payment-count active" : "payment-count"
                      }
                      onClick={
                        () => onStepClick(10)

                      }
                    >
                      10
                    </span>
                    <span className="pl-8 step-title text-blue">
                      Payment Settings
                    </span>

                  </li>
                )}

              </>) : (null)}

            </ul>

          </div>
        </ul>
      </div>

      {value === 1 && (
        <BasicInfo
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}
        />
      )}
      {value === 2 && (
        <Address
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}
          onBackButtonChange={({ updateBackBtnShow }: { updateBackBtnShow: any }) => {
            setButtonValue(updateBackBtnShow)
          }}
        />
      )}
      {value === 3 && (
        <Contact
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}

          onBackButtonChange={({ updateBackBtnShow }: { updateBackBtnShow: any }) => {
            setButtonValue(updateBackBtnShow)
          }}
        />
      )}
      {value === 4 && (
        //   <Documents

        //   onSaveAndContinueClick={onSaveAndContinueClick}
        //   onNextClick={onNextClick}
        //   buttonLoadingSkip={buttonLoadingSkip}
        //   setButtonLoadingSkip={setButtonLoadingSkip}
        //   onBackbtn={onBackbtn}
        //   buttonLoadingBack={buttonLoadingBack}
        //   setButtonLoadingBack={setButtonLoadingBack}
        // // onBackClickPartnershipDetails={onBackClickPartnershipDetails}
        // onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
        //   setButtonValue(updateBtnShow)
        // }}
        // onBackButtonChange={({    updateBackBtnShow }: {    updateBackBtnShow: any }) => {
        //   setButtonValue(   updateBackBtnShow)
        // }}

        //   />
        <ComplianceTab
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onBackbtn={onBackbtn}
          buttonLoadingBack={buttonLoadingBack}
          setButtonLoadingBack={setButtonLoadingBack}
          // onBackClickPartnershipDetails={onBackClickPartnershipDetails}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}
          onBackButtonChange={({ updateBackBtnShow }: { updateBackBtnShow: any }) => {
            setButtonValue(updateBackBtnShow)
          }} />
      )}
      {value === 5 && (
        // <PersonalDetails
        //   onSaveAndContinueClick={onSaveAndContinueClick}

        //   onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
        //     setButtonValue(updateBtnShow)
        //   }}
        //   onBackButtonChange={({    updateBackBtnShow }: {    updateBackBtnShow: any }) => {
        //     setButtonValue(   updateBackBtnShow)
        //   }}

        // />
        <PersonalDetails
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onBackbtn={onBackbtn}
          buttonLoadingBack={buttonLoadingBack}
          setButtonLoadingBack={setButtonLoadingBack}
          // onBackClickPartnershipDetails={onBackClickPartnershipDetails}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}

          onBackButtonChange={({ updateBackBtnShow }: { updateBackBtnShow: any }) => {
            setButtonValue(updateBackBtnShow)
          }}
        />
      )}
      {value === 6 && (
        <PartnershipDetails
          onSaveAndContinueClick={onSaveAndContinueClick}
          onNextClick={onNextClick}
          buttonLoadingSkip={buttonLoadingSkip}
          setButtonLoadingSkip={setButtonLoadingSkip}
          onBackbtn={onBackbtn}
          buttonLoadingBack={buttonLoadingBack}
          setButtonLoadingBack={setButtonLoadingBack}
          // onBackClickPartnershipDetails={onBackClickPartnershipDetails}
          onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
            setButtonValue(updateBtnShow)
          }}
          onBackButtonChange={({ updateBackBtnShow }: { updateBackBtnShow: any }) => {
            setButtonValue(updateBackBtnShow)
          }}
        />
      )}
      {
        value === 7 && (
          <Currencies
            onSaveAndContinueClick={onSaveAndContinueClick}
            onNextClick={onNextClick}
            buttonLoadingSkip={buttonLoadingSkip}
            setButtonLoadingSkip={setButtonLoadingSkip}
            onBackbtn={onBackbtn}
            buttonLoadingBack={buttonLoadingBack}
            setButtonLoadingBack={setButtonLoadingBack}
            onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
              setButtonValue(updateBtnShow)
            }}
          />
        )
      }
      {
        value === 8 && (
          <Wallet
            onSaveAndContinueClick={onSaveAndContinueClick}
            onNextClick={onNextClick}

            buttonLoadingSkip={buttonLoadingSkip}
            setButtonLoadingSkip={setButtonLoadingSkip}

            onBackbtn={onBackbtn}
            buttonLoadingBack={buttonLoadingBack}
            setButtonLoadingBack={setButtonLoadingBack}
            onButtonChange={({ updateBtnShow }: { updateBtnShow: any }) => {
              setButtonValue(updateBtnShow)
            }}
          />
        )
      }
      {
        value === 9 && (
          <Fees
            onSaveAndContinueClick={onSaveAndContinueClick}
            onNextClick={onNextClick}
            buttonLoadingSkip={buttonLoadingSkip}
            setButtonLoadingSkip={setButtonLoadingSkip}
            onBackbtn={onBackbtn}
            buttonLoadingBack={buttonLoadingBack}
            setButtonLoadingBack={setButtonLoadingBack}

          />
        )
      }

      {
        value === 10 && (
          <PaymentTabChange
            onSaveAndContinueClick={onSaveAndContinueClick}
            onNextClick={onNextClick}
            buttonLoadingSkip={buttonLoadingSkip}
            setButtonLoadingSkip={setButtonLoadingSkip}
            onBackbtn={onBackbtn}
            buttonLoadingBack={buttonLoadingBack}
            setButtonLoadingBack={setButtonLoadingBack}
          />
        )
      }
    </>
  );
};
export default Tabcontent;
