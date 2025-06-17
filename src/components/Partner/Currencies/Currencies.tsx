import { Button } from "primereact/button";
import React, { useEffect, useRef, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useNavigate, useParams } from "react-router-dom";
import BRLimg from "../../../assets/images/BRLimg.svg";
import CANADAimg from "../../../assets/images/canada-flag.svg";
import INDimg from "../../../assets/images/india.svg";
import USDlogo from "../../../assets/images/USDImg.svg";
import AUTimg from "../../../assets/images/AUTimg.svg";
import { CurrenciesService } from "../../../services/Partner/Currencies/Currencies";
import { PartnershipDetailsService } from "../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import {
  currenciesPaymentList,
  defaultCurrenciesPaymentList,
} from "../../../utils/utils";

function addPartnerCurrenciesData(
  Id: Number,
  Code: null,
  PartnerId: Number,
  Country: String,
  // countryName: String,
  Currency: String,
  PartnerPaymentRole: Number,
  WalletId: null
) {
  return {
    Id,
    Code,
    PartnerId,
    Country,
    // countryName,
    Currency,
    PartnerPaymentRole,
    WalletId,
  };
}


//testing

const Currencies: React.FC<any> = ({ onSaveAndContinueClick, onButtonChange, onNextClick, setButtonLoadingSkip, buttonLoadingSkip }) => {
  const [currencyerrorMessage, setcurrencyerrorMessage] = React.useState("");

  const [status] = useState(sessionStorage.getItem("OnboardingStatus"));
  const { partnerid, type } = useParams();
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [backButtonLoading, setBackButtonLoading] = useState(false)
  const [, setDataLength] = useState(0);
  const [currenciesList, setCurrenciesList] = useState(currenciesPaymentList);
  const [freshCurrenciesList] = useState(defaultCurrenciesPaymentList);
  const [partnerPaymentRole, setPartnerPaymentRole] = useState(0);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [readonly, setReadOnly] = useState(true);
  const onboardStatus = sessionStorage.getItem("onboardStatus");
  const [countryInfo, setCountryInfo] = useState<any[]>([]);

  const getReceiveCountry = () => {
    setLoading(true);
    PartnershipDetailsService.getupdatedCountry()
      .then((data: any) => {
        const responsedata = data.data;
        setCountryInfo(responsedata);
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
    getReceiveCountry();
  }, []);
  //end county api integration for dynamic

  const [defaultHardcodedCurrenciesList, setDefaultHardcodedCurrenciesList] = useState<any[]>([]);

  useEffect(() => {
    setDefaultHardcodedCurrenciesList(countryInfo.map((country: any) => ({
      Id: 0,
      Country: country.code,
      countryName: country.countryName,
      Currency: country.currencyCode,
      Send: false,
      Receive: false,
      WalletId: '',
      Code: '',
      onboardStatus: sessionStorage.getItem("onboardingStatus"),
    })));
  }, [countryInfo]);



  const onSendChange = (e: any, index: number) => {

    const newList = [...currenciesList];
    const name = e.target.name;
    newList[index].Send = e.value;
    setCurrenciesList([...newList]);
  };
  useEffect(() => {
    onButtonChange({ updateBtnShow })

  }, [updateBtnShow])

  const isValidate = (currencies: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();
    if (currencies.length === 0) {
      setcurrencyerrorMessage("Please select currency");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    
    return formIsValid;
  };




  //updated county api integration for dynamic







  const onReceiveChange = (e: any, index: number) => {
    const newList = [...currenciesList];
    const name = e.target.name;
    newList[index].Receive = e.value;
    // newList[index].Send = e.value; 
    setCurrenciesList([...newList]);
  };

  const getCurrenciesByPartnerId = (partnerid: any) => {
    setLoading(true);
    let getdatafor = 'currencies'
    CurrenciesService.getCurrenciesByPartnerId(partnerid,getdatafor)
      .then((data: any) => {
        const responsedata = data.data;
        if (responsedata.length === 0) {
          setDataLength(0);
          setCurrenciesList(defaultHardcodedCurrenciesList);
          setLoading(false);
        } else {
          setDataLength(1);
          const sendReceiveData = responsedata.filter((response: any) =>
            response.partnerPaymentRole === 3)
            .map((sendreceive: any) => ({
              Id: sendreceive.id,
              Country: sendreceive.country,
              countryName: sendreceive.countryName,
              Code: sendreceive.code,
              Currency: sendreceive.currency,
              Send: true,
              Receive: true,
              WalletId: sendreceive.walletId,
            }));
          const sendData = responsedata
            .filter((response: any) => response.partnerPaymentRole === 1)
            .map((sendreceive: any) => ({
              Id: sendreceive.id,
              countryName: sendreceive.countryName,
              Country: sendreceive.country,
              Code: sendreceive.code,
              Currency: sendreceive.currency,
              Send: true,
              Receive: false,
              WalletId: sendreceive.walletId,
            }));
          const receiveData = responsedata
            .filter((response: any) => response.partnerPaymentRole == 2)
            .map((sendreceive: any) => ({
              Id: sendreceive.id,
              countryName: sendreceive.countryName,
              Country: sendreceive.country,
              Code: sendreceive.code,
              Currency: sendreceive.currency,
              Send: false,
              Receive: true,
              WalletId: sendreceive.walletId,
            }));
          const currencyData = [   ...sendReceiveData,    ...sendData, ...receiveData,  ];

          const uniqueData = defaultHardcodedCurrenciesList.filter((x: any) => {
            return !currencyData.find(  (choice) => choice.Country === x.Country );  });



          // setCurrenciesList([ ...currencyData,...uniqueData,]);


          const concatenatedData = [...currencyData, ...uniqueData];
          const sortedData = concatenatedData.sort((a, b) => {
            if (a.countryName < b.countryName) return -1;
            if (a.countryName > b.countryName) return 1;
            return 0;
          });

          setCurrenciesList(sortedData);

          setLoading(false);
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
            summary: "Something went wrong",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };
  const ErrorMessageEmptyModel = () => {
    setcurrencyerrorMessage("");
  };

  const getPartnershipDetailsByPartnerId = () => {
    setLoading(true);
    PartnershipDetailsService.getPartnershipDetailsByPartnerId(
      Number(partnerid)
    )
      .then((response) => {
        const data = response.data;
        setPartnerPaymentRole(data.partnerPaymentRole);

       
        getCurrenciesByPartnerId(Number(partnerid));

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
  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpdateBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };

  useEffect(() => {
    setButtonLoadingSkip(false);
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    }
    if (defaultHardcodedCurrenciesList && defaultHardcodedCurrenciesList.length > 0) {
      getPartnershipDetailsByPartnerId();
    }

  }, [defaultHardcodedCurrenciesList]);

  const onAddClick = (data: any) => {
    setButtonLoading(true);
    CurrenciesService.addCurrencies(data)
      .then((data) => {
        setButtonLoading(false);
        sessionStorage.setItem("StepFlag", "7");
        getCurrenciesByPartnerId(Number(partnerid));
        onSaveAndContinueClick("N");
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
        } else if (error.response.status === 400) {
          toast.current?.show({
            severity: "error",
            summary: error.response.data[0].errorMessage,
            life: 3000,
          });
        } else if (error.response.status === 404) {
          setcurrencyerrorMessage("Please select atleast one currency");
        } else if (error.response.status === 409) {
          setcurrencyerrorMessage("Cant update currencies since amount was deposited into ledger.")
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while adding currencies info details.",
            life: 3000,
          });
        }
        setButtonLoading(false);
      });
  };

  const onSaveClick = () => {
    ErrorMessageEmptyModel();
    if (isValidate(currenciesList)) {
      const SendReceiveData = currenciesList
        .filter(
          (currency, index) =>
            currency.Send === true && currency.Receive === true
        )
        .map((currency) =>
          addPartnerCurrenciesData(
            currency.Id,
            null,
            Number(partnerid),
            //currency.countryName,
            currency.Country,
            currency.Currency,
            3,
            null
          )
        );
      const SendData = currenciesList
        .filter(
          (currency, index) =>
            currency.Send === true && currency.Receive === false
        )
        .map((currency) =>
          addPartnerCurrenciesData(
            currency.Id,
            null,
            Number(partnerid),
            //currency.countryName,
            currency.Country,
            currency.Currency,
            1,
            null
          )
        );
      const ReceiveData = currenciesList
        .filter(
          (currency, index) =>
            currency.Send === false && currency.Receive === true
        )
        .map((currency) =>
          addPartnerCurrenciesData(
            currency.Id,
            null,
            Number(partnerid),
            //currency.countryName,
            currency.Country,
            currency.Currency,
            2,
            null
          )
        );

      const currenciesListData = [
        ...SendReceiveData,
        ...SendData,
        ...ReceiveData,
      ];
      onAddClick(currenciesListData);
    }
  };

  const onBackClick = () => {
    setBackButtonLoading(true)
    setTimeout(() => {
      onSaveAndContinueClick("B");
    }, 1000)
  };

  const handleClose = () => {
    ErrorMessageEmptyModel();
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
  };

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="container-fluid acc-screen currency-screen">

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

            <Toast ref={toast}></Toast>
            <div className="recevie-currency">
              {partnerPaymentRole === 1 && <h3>Choose your send currencies</h3>}
              {partnerPaymentRole === 2 && (
                <h3>Choose your receive currencies</h3>
              )}
              {partnerPaymentRole === 3 && (
                <h3>Choose your send and receive countries and currencies</h3>
              )}
              {partnerPaymentRole === 0 && (
                <h3>Choose your send and receive countries and currencies</h3>
              )}
              <div className="currency-details">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Country Name</th>
                      <th>Country Code</th>
                      <th>Currency</th>
                      {(partnerPaymentRole === 1 || partnerPaymentRole === 3 || partnerPaymentRole === 0) && (
                        <th>Send</th>
                      )}
                      {(partnerPaymentRole === 2 || partnerPaymentRole === 3 || partnerPaymentRole === 0) && (
                        <th>Receive</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {currenciesList && currenciesList.map((currency, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{currency.countryName}</td>
                        <td>{currency.Country}</td>

                        <td className="border-right country-flag">
                          {/* {(() => {
                            if (currency.Currency === "INR") {
                              return (
                                <img
                                  src={INDimg}
                                  alt="img"
                                  className="currency-img"
                                />
                              );
                            } else if (currency.Currency === "BRL") {
                              return (
                                <img
                                  src={BRLimg}
                                  alt="img"
                                  className="currency-img"
                                />
                              );
                            } else if (currency.Currency === "CAD") {
                              return (
                                <img
                                  src={CANADAimg}
                                  alt="img"
                                  className="currency-img"
                                />
                              );
                            } else if (currency.Currency === "EUR") {
                              return (
                                <img
                                  src={AUTimg}
                                  alt="img"
                                  className="currency-img"
                                />
                              );
                            } else {
                              return (
                                <img
                                  src={USDlogo}
                                  alt="img"
                                  className="currency-img"
                                />
                              );
                            }
                          })()} */}

                          {currency.Currency}
                        </td>
                        {(partnerPaymentRole === 1 ||
                          partnerPaymentRole === 3 || partnerPaymentRole === 0) && (
                            <td className="switch-style">
                              {/* <input type="checkbox" className="currenecy-check"/> */}
                              <InputSwitch
                                disabled={readonly}
                                className="status-check"
                                name="Send"
                                checked={currency.Send}
                                onChange={(e) => onSendChange(e, index)}
                              />
                            </td>
                          )}

                        {(partnerPaymentRole === 2 ||
                          partnerPaymentRole === 3 || partnerPaymentRole === 0) && (
                            <td className="switch-style">
                              <InputSwitch
                                disabled={readonly}
                                className="status-check"
                                name="Receive"
                                checked={currency.Receive}
                                onChange={(e) => onReceiveChange(e, index)}
                              />
                            </td>
                          )}
                      </tr>
                    ))}
                  </tbody>
                </table>


                <div className="fees-error">
                  <span className="error-msg">{currencyerrorMessage}</span>
                </div>
              </div>
            </div>
            <div className="payment-button-section" style={{ marginTop: "-15px" }}>
              <div className="bottom-btns">
                <Button
                  type="button"
                  label="Back"
                  loading={backButtonLoading}
                  className="btn btn-back second-btn"
                  onClick={onBackClick}
                />
                &nbsp;&nbsp;
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn btn-cancel second-btn"
                >
                  Cancel
                </button>

                {updateBtnShow ? (


                  <>
                    <Button
                      iconPos="left"
                      label=" Save and Continue"
                      className=" btn btn-continue second-btn"
                      loading={buttonLoading}
                      onClick={() => onSaveClick()}
                    />
                  </>

                ) : (
                  <Button
                    iconPos="left"
                    label="Next"
                    loading={buttonLoadingSkip}
                    onClick={onNextClick}
                    className="btn btn-continue btn-next second-btn"
                  />
                )}

              </div>
            </div>
            <br /> <br /> <br /> <br /><br /> <br /> <br />
          </Scrollbars>

        </div>
      )}
    </>
  );
};

export default Currencies;
