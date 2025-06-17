import Header from "../../../Layout/Header";
import Sidebar from "../../../Layout/Sidebar";
import Tabcontent from "../../../Layout/Tabcontent";
import PaymentTabcontent from "../../../Layout/PaymentTabcontent";
import requiredBlue from "../../../assets/images/required-blue.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IContact } from "../../../models/IContact";
import { validContact, validEmail, validFaxNumber } from "../../../utils/utils";
import { ContactService } from "../../../services/Partner/Contact/ContactService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { PaymentSettingsServices } from "../../../services/Partner/PaymentSettings/PaymentSettings";
import React from "react";
import B2BTransactionLimits from "../TransactionLimits/B2BorC2BTransactionLimits";
import Scrollbars from "react-custom-scrollbars-2";

const Paymentsettingread: React.FC<any> = ({  onNextClick, onBackClick, buttonLoadingSkip }) => {

  const [loading, setLoading] = useState(true);

  const [paymentList, setpaymentList] = useState([]);

  const [backButtonLoading , setBackButtonLoading]= useState(false)
  const { partnerid, type } = useParams();

  const [PaymentSettings, setPaymentSettings] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
    Name: "",
    Contact: "",
    Verification: "",

  });

  const getPayment = () => {
   
    PaymentSettingsServices.getPayment()
      .then((data: any) => {
        const responsedata = data.data;
        setpaymentList(responsedata);

        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  useEffect(() => {

    getPayment();
  }, []);

  const onChildNextClick = () => {
 
    onNextClick();
  };

  const onChildBack = () => {
    setBackButtonLoading(true)
    setTimeout(() => {
      onBackClick();
    },1000)
   
  }


  return (
    <>

      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>) : <div>
        <>

          <div className="row ">
            <div className="col-md-12 text-center">
              <h2 className="read-only-heading">
                Here are the default fields in a payment:
              </h2>
            </div>
          </div>
          <table className="table read-only-table">
            <tbody>
              {paymentList
                .sort((a: any, b: any) =>
                  a.PaymentReadOnly > b.PaymentReadOnly ? -1 : 1
                )
                .map((PaymentReadOnly: any, index) => (
                  <tr key={index} className="read-only-row">
                    <td className="read-only">
                      <span> {PaymentReadOnly.name}</span>
                    </td>
                    <td className="read-text">{PaymentReadOnly.description}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div className="button-section">
            <div className="bottom-btns">
     
              <Button
                    type="button"
                    label="Back"
                    loading={backButtonLoading}
                    className="btn btn-back second-btn"
                    onClick={onChildBack}
                  />
              <Button
                        iconPos="left"
                        label="Next"
                        loading={buttonLoadingSkip}
                        onClick={onChildNextClick}
                        className="btn btn-continue btn-next second-btn"
                      />
            </div>
          </div>

        </>

      </div>}

    </>
  );
};

export default Paymentsettingread;


