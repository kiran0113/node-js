import React from "react";
import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { PaymentSettingsServices } from "../../../services/Partner/PaymentSettings/PaymentSettings";
import { InputSwitch } from "primereact/inputswitch";
import { useParams } from "react-router-dom";
import { confirmDialog } from "primereact/confirmdialog";
import {  useNavigate } from "react-router-dom";
import { Logout } from "../../../utils/AccountUtils";

function AddReceiverInformationManadatoryFields(
  PartnerId: any,
  Type: any,
  FieldId: any,
  SubCategoryId: any
) {
  return { PartnerId, Type, FieldId, SubCategoryId };
}

const ReceiveDelivery: React.FC<any> = ({
  onReceiverDeliveryLimits,
  setReceiveDelivery3,
  ReceiveDeliveryBackClick,
  setPartnerDeliveryType,
  buttonLoadingSkip,
  buttonLoadingBack,
  setButtonLoadingBack,
  setButtonLoadingSkip,
}) => {

  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );


  const [dataLength, setDataLength] = useState(0);
  const navigate = useNavigate();
  const [Token, setToken] = useState<any>(sessionStorage.getItem("Token"));

  const toast = useRef<Toast>(null);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  const [realTimePayment, setRealTimePayment] = useState([]);

  const [realTimePaymentInterger, setRealTimePaymentInterger] = useState([]);

  const [mobileWallletField, setMobileWallletField] = useState([]);

  const [readonly, setReadOnly] = useState(true);

  const [mobileWallletFieldInteger, setMobileWallletFieldInteger] = useState(
    []
  );
  const [visible, setVisible] = useState<boolean>(false);
  const { partnerid, type } = useParams();

  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [bankField, setBankField] = useState([]);

  const [bankFieldInteger, setBankFieldInteger] = useState([]);

  const [cashPickupFields, setCashPickupFields] = useState([]);

  const [cashPickupFieldsInterger, setCashPickupFieldsInterger] = useState([]);

  const [popupSkip, setPopupSkip] = useState(false);

  const [dirtyfield, setDirtyField] = useState(false);

  const [rtpallcheck, setRtpAllChecked] = useState(false);

  const [mobileWalletCheckAll, setMobileWalletCheckAll] = useState(false);

  const [bankFieldCheckAll, setBankFielCheckAll] = useState(false);

  const [cashCheckAll, setCashCheckAll] = useState(false);

  const [PaymentSettings, setPaymentSettings] = React.useState({
    id: 0,
    partnerId: Number(),
  });

  const receiverPaymentFields = () => {

    const ids = [4, 5, 6, 7];
    PaymentSettingsServices.ReceivePaymentField(ids)
      .then((data: any) => {
        const responsedata = data.data;

        const realTimePaymentData = responsedata
          .filter((name: any) => name.categoryName == "RealTime Payment Fields")
          .map((realTimePayment: any) => ({
            ...realTimePayment,
            IsChecked: false,
          }));
        const mobileWalletData = responsedata
          .filter((name: any) => name.categoryName === "Mobile Wallet Fields")
          .map((mobileWallletField: any) => ({
            ...mobileWallletField,
            IsChecked: false,
          }));
        const bankData = responsedata
          .filter((name: any) => name.categoryName === "Bank Fields")
          .map((bankField: any) => ({
            ...bankField,
            IsChecked: false,
          }));

        const cashPickupData = responsedata
          .filter((name: any) => name.categoryName === "Cash Pickup Fields")
          .map((cashPickupFields: any) => ({
            ...cashPickupFields,
            IsChecked: false,
          }));
        GetReceiverInfo(
          realTimePaymentData,
          mobileWalletData,
          bankData,
          cashPickupData
        );
        setRealTimePayment(realTimePaymentData);
        setMobileWallletField(mobileWalletData);
        setBankField(bankData);
        setCashPickupFields(cashPickupData);
    // setLoading(false);
      })

      .catch((error) => {
        if (error.response.status === 401) {
          toast.current?.show({
            severity: "error",
            summary: "Unauthorized",
            life: 3000,
          });
          Logout(navigate);
        }
      });
  };

  //// Realtime Payment map check

  const setRealTimePaymentCheck = (data: any) => {
    const state = [...realTimePayment];

    const selectedData = state.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, IsChecked: !data.IsChecked };
      }

      return obj;
    });

    const trueSelectedData = selectedData
      .filter((data) => data.IsChecked === true)
      .map((x) => x.id);
    setRealTimePaymentInterger(trueSelectedData);
    setRealTimePayment(selectedData);
    setDirtyField(true);

    if (rtpallcheck === true) {
    
      {
        realTimePayment.map((realTimePaymentInterger: any, index) => (
          realTimePaymentInterger = false
        ))
        setRtpAllChecked(false);
      }
    
    }
  };

  //// Mobile walet map check
  const setMobileWalletCheck = (data: any) => {
    const state = [...mobileWallletField];
    const selectedData = state.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, IsChecked: !data.IsChecked };
      }

      return obj;
    });

    const trueSelectedData = selectedData
      .filter((data) => data.IsChecked === true)
      .map((x) => x.id);
    setMobileWallletFieldInteger(trueSelectedData);
    setMobileWallletField(selectedData);
    setDirtyField(true);

    if (mobileWalletCheckAll === true) {
    
      {
        mobileWallletField.map((mobileWallletFieldInteger: any, index) => (
          mobileWallletFieldInteger = false
        ))
        setMobileWalletCheckAll(false);
      }
    
    }
  };

  ///Bank Fields map check
  const setBankFieldsCheck = (data: any) => {
    const state = [...bankField];
    const selectedData = state.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, IsChecked: !data.IsChecked };
      }

      return obj;
    });

    const trueSelectedData = selectedData
      .filter((data) => data.IsChecked === true)
      .map((x) => x.id);
    setBankFieldInteger(trueSelectedData);
    setBankField(selectedData);
    setDirtyField(true);

    if (bankFieldCheckAll === true) {
    
      {
        bankField.map((bankFieldInteger: any, index) => (
          bankFieldInteger = false
        ))
        setBankFielCheckAll(false);
      }
    
    }
    
  };

  //// Cash Pickup map check

  const setCashPickupCheck = (data: any) => {
    const state = [...cashPickupFields];
    const selectedData = state.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, IsChecked: !data.IsChecked };
      }

      return obj;
    });

    const trueSelectedData = selectedData
      .filter((data) => data.IsChecked === true)
      .map((x) => x.id);
    setCashPickupFieldsInterger(trueSelectedData);
    setCashPickupFields(selectedData);
    setDirtyField(true);

      if (cashCheckAll === true) {
      
        {
          cashPickupFields.map((cashPickupFieldsInterger: any, index) => (
            cashPickupFieldsInterger = false
          ))
          setCashCheckAll(false);
        }
      
      }
  };

  const GetReceiverInfo = (
    realTimePaymentData: any,
    mobileWalletData: any,
    bankData: any,
    cashPickupData: any
  ) => {
    setLoading(true);
    PaymentSettingsServices.getReceiverInformation(Number(partnerid), "B2B", 2)
      .then((res) => {
        const responseData = res.data;

        setDataLength(responseData.length);

        const isRealtimePaymentData: any = [];
        const isMobileWalletData: any = [];
        const isBankData: any = [];
        const isCashPickupData: any = [];

        realTimePaymentData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            isRealtimePaymentData.push({ ...element, IsChecked: true });
            setRtpAllChecked(true);
          } else {
            isRealtimePaymentData.push({ ...element, IsChecked: false });
            setRtpAllChecked(false);
          }
          isRealtimePaymentData.forEach((element:any) => {
            if(element.IsChecked === false){
            setRtpAllChecked(false);
            }
          });
        });

        mobileWalletData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            isMobileWalletData.push({ ...element, IsChecked: true });
            setMobileWalletCheckAll(true);
          } else {
            isMobileWalletData.push({ ...element, IsChecked: false });
            setMobileWalletCheckAll(false);
          }
          isMobileWalletData.forEach((element:any) => {
            if(element.IsChecked === false){
              setMobileWalletCheckAll(false);
            }
          });
        });

        bankData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            isBankData.push({ ...element, IsChecked: true });
            setBankFielCheckAll(true);
          } else {
            isBankData.push({ ...element, IsChecked: false });
            setBankFielCheckAll(false);
          } 
          isBankData.forEach((element:any) => {
            if(element.IsChecked === false){
            setBankFielCheckAll(false);
            }
          });
        });

        cashPickupData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            isCashPickupData.push({ ...element, IsChecked: true });
            setCashCheckAll(true);
          } else {
            isCashPickupData.push({ ...element, IsChecked: false });
            setCashCheckAll(false);
          }
          isCashPickupData.forEach((element:any) => {
            if(element.IsChecked === false){
            setCashCheckAll(false);
            }
          });
        });

        setRealTimePayment(isRealtimePaymentData);
        setMobileWallletField(isMobileWalletData);
        setBankField(isBankData);
        setCashPickupFields(isCashPickupData);
        setLoading(false);
      })

      .catch((error) => {
        if (error.response.status === 401) {
          toast.current?.show({
            severity: "error",
            summary: "Unauthorized",
            life: 3000,
          });
          Logout(navigate);
        }
      });
  };

  const acceptupdate = () => {
    const fieldIds = [
      ...realTimePayment,
      ...mobileWallletField,
      ...bankField,
      ...cashPickupFields,
    ]
      .filter((data: any) => data.IsChecked === true)
      .map((res: any) => res.id);
    const apidata = AddReceiverInformationManadatoryFields(
      partnerid,
      "B2B",
      fieldIds.toString(),
      2
    );
    setButtonLoading(true);
    PaymentSettingsServices.getReceiverInformationFields(apidata)
      .then((res) => receiverPaymentFields())
      .then((receiverPaymentFields) => {
        onReceiverDeliveryLimits();
        setButtonLoading(false);
      })

      .catch((error) => {

        setButtonLoading(true);
      });
  };

  const OnPopupClose = () => {
    setPopupSkip(false);
  };

  const OnPopupOk = () => {
    onReceiverDeliveryLimits();
  };
  const onNextClick = () => {
    if (dirtyfield === true) {
      setPopupSkip(true);
    } else if (dirtyfield === false) {
      setPopupSkip(false);
      onReceiverDeliveryLimits();
    }
  };

  const onSelectAllRtp = () => {
    if (rtpallcheck === false) {
      setRtpAllChecked(true);
      {
        realTimePayment.map(
          (RealtimePaymentReceive: any) =>
            (RealtimePaymentReceive.IsChecked = true)
        );
      }
    } else {
      setRtpAllChecked(false);

      {
        realTimePayment.map(
          (RealtimePaymentReceive: any) =>
            (RealtimePaymentReceive.IsChecked = false)
        );
      }
    }
  };

  const onSelectallMobileWallet = () => {
    if (mobileWalletCheckAll === false) {
      setMobileWalletCheckAll(true);
      {
        mobileWallletField.map(
          (MobileWallletReceive: any) => (MobileWallletReceive.IsChecked = true)
        );
      }
    } else {
      setMobileWalletCheckAll(false);
      {
        mobileWallletField.map(
          (MobileWallletReceive: any) =>
            (MobileWallletReceive.IsChecked = false)
        );
      }
    }
  };

  const onSelectAllBankField = () => {
    if (bankFieldCheckAll === false) {
      setBankFielCheckAll(true);
      {
        bankField.map((bankReceive: any) => (bankReceive.IsChecked = true));
      }
    } else {
      setBankFielCheckAll(false);

      {
        bankField.map((bankReceive: any) => (bankReceive.IsChecked = false));
      }
    }
  };

  const onSelectallCashPickup = () => {
    if (cashCheckAll === false) {
      setCashCheckAll(true);
      {
        cashPickupFields.map(
          (CashPaymentFileds: any) => (CashPaymentFileds.IsChecked = true)
        );
      }
    } else {
      setCashCheckAll(false);

      {
        cashPickupFields.map(
          (CashPaymentFileds: any) => (CashPaymentFileds.IsChecked = false)
        );
      }
    }
  };


  const handleClose = () => {
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

  const onChildBack = () => {
    ReceiveDeliveryBackClick();
  };
  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); 
      setUpdateBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };
  const onConfirmUpdateClick = (item: any) => {
    confirmDialog({
      message:
        "Are you sure you want to update?",
      icon: "pi pi-info-circle",

      accept: () => acceptupdate(),
      reject,

    });
  };
  const reject = () => {
    setButtonLoading(false);
    setVisible(false)

  };



  const onAddClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    if (type === 'V') {
      event.preventDefault();
      setVisible(true)
      onConfirmUpdateClick(event);
    }
    else if (type === 'A') {
      acceptupdate();
    }

  };

  useEffect(() => {

    receiverPaymentFields();
    setButtonLoadingSkip(false);
    setButtonLoadingBack(false);
  }, []);



  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <div>
          <div className="row ">
            <div className="col-md-11">
              <h2>
              Choose the information required for delivering the payment to the recipient for each delivery type.
              </h2>
            </div>
            <div className="col-md-1 edit-payment">
              {type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />) : null}
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                {setPartnerDeliveryType.includes("RTP") ? (
                  <th>Realtime Payment Fields</th>
                ) : null}
                {setPartnerDeliveryType.includes("MobileWallet") ? (
                  <th>Mobile Wallet Fields</th>
                ) : null}
                {setPartnerDeliveryType.includes("BankAccount") ? (
                  <th>Bank Fields</th>
                ) : null}
                {setPartnerDeliveryType.includes("CashPickup") ? (
                  <th>Cash Pickup Fields</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              <tr className="read-only-row">
                {setPartnerDeliveryType.includes("RTP") ? (
                  <td>
                    <div className="select-all-field">
                      <div className="switch-style">
                        <InputSwitch
                         disabled={readonly}
                          className="status-check"
                          name="Send"
                          checked={rtpallcheck}
                          onChange={onSelectAllRtp}
                        />
                      </div>
                      <div>
                        <p>Select All</p>
                      </div>
                    </div>
                    <div className="form-check yes-check">
                      {realTimePayment.map(
                        (RealtimePaymentReceive: any, index) => (
                          <div
                            key={index}
                            className="namefield-border delivery-type"
                          >
                            <input

                              className="form-check-input"
                              type="checkbox"
                              disabled={readonly}
                              name="name"
                              id="name"
                              value={RealtimePaymentReceive.id}
                              checked={RealtimePaymentReceive.IsChecked}
                              onChange={(e) =>
                                setRealTimePaymentCheck(RealtimePaymentReceive)
                              }
                            />
                            <label className="form-check-label">
                              {RealtimePaymentReceive.name}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                ) : null}
                {setPartnerDeliveryType.includes("MobileWallet") ? (
                  <td>
                    <div className="select-all-field">
                      <div className="switch-style">
                        <InputSwitch

                          className="status-check"
                          disabled={readonly}
                          name="Send"
                          checked={mobileWalletCheckAll}
                          onChange={onSelectallMobileWallet}
                        />
                      </div>
                      <div>
                        <p>Select All</p>
                      </div>
                    </div>
                    <div className="form-check yes-check">
                      {mobileWallletField.map(
                        (MobileWallletReceive: any, index) => (
                          <div
                            key={index}
                            className="namefield-border delivery-type"
                          >
                            <input

                              className="form-check-input"
                              disabled={readonly}
                              type="checkbox"
                              name="name"
                              id="name"
                              value={MobileWallletReceive.id}
                              checked={MobileWallletReceive.IsChecked}
                              onChange={(e) =>
                                setMobileWalletCheck(MobileWallletReceive)
                              }
                            />
                            <label className="form-check-label">
                              {MobileWallletReceive.name}
                            </label>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                ) : null}
                {setPartnerDeliveryType.includes("BankAccount") ? (
                  <td>
                    <div className="select-all-field">
                      <div className="switch-style">
                        <InputSwitch

                          className="status-check"
                          name="Send"
                          disabled={readonly}
                          checked={bankFieldCheckAll}
                          onChange={onSelectAllBankField}
                        />
                      </div>
                      <div>
                        <p>Select All</p>
                      </div>
                    </div>
                    <div className="form-check yes-check">
                      {bankField.map((bankReceive: any, index) => (
                        <div
                          key={index}
                          className="namefield-border delivery-type"
                        >
                          <input

                            className="form-check-input"
                            type="checkbox"
                            disabled={readonly}
                            name="name"
                            id="name"
                            checked={bankReceive.IsChecked}
                            onChange={(e) => setBankFieldsCheck(bankReceive)}
                          />
                          <label className="form-check-label">
                            {bankReceive.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </td>
                ) : null}
                {setPartnerDeliveryType.includes("CashPickup") ? (
                  <td>
                    <div className="select-all-field">
                      <div className="switch-style">
                        <InputSwitch

                          className="status-check"
                          disabled={readonly}
                          name="Send"
                          checked={cashCheckAll}
                          onChange={onSelectallCashPickup}
                        />
                      </div>
                      <div>
                        <p>Select All</p>
                      </div>
                    </div>
                    <div className="form-check yes-check">
                      {cashPickupFields.map((CashPaymentFileds: any, index) => (
                        <div
                          key={index}
                          className="namefield-border delivery-type"
                        >
                          <input

                            className="form-check-input"
                            type="checkbox"
                            disabled={readonly}
                            name="name"
                            id="name"
                            value={CashPaymentFileds.id}
                            checked={CashPaymentFileds.IsChecked}
                            onChange={(e) =>
                              setCashPickupCheck(CashPaymentFileds)
                            }
                          />
                          <label className="form-check-label">
                            {CashPaymentFileds.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </td>
                ) : null}
              </tr>
            </tbody>
          </table>

          <div className="button-section">
            <div className="bottom-btns">
              <>
                <Button
                  iconPos="left"
                  label="Back"
                  loading={buttonLoadingBack}
                  className="btn btn-back second-btn"
                  onClick={onChildBack}
                />
                 {type === 'A' ? ( null ):(  <button
                  type="button"
                  className="btn btn-cancel  second-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>)}
                {updateBtnShow ? (
                  <Button
                    iconPos="left"
                    label="Save and Continue"
                    loading={buttonLoading}
                    className="btn btn-continue second-btn"
                    onClick={onAddClick}
                  />
                ) :  <>
                {type === "A" ? (
                  <Button
                    iconPos="left"
                    label="Save and Continue"
                    loading={buttonLoading}
                    className="btn btn-continue second-btn"
                    onClick={onAddClick}
                  />
                ) : (
                 null
                )}
                 <>
                    <button
                      type="button"
                      onClick={onNextClick}
                      className="btn next-btn "
                    >
                      Next
                    </button>
                  </>
              </>}


              </>
            </div>
          </div>
          {popupSkip ? (
            <div className="popup-body">
              <div className="register-popup Payment-screen">
                <div className="text-center ">
                  <div className="awesome-text">
                    <h4>Are you sure you want to continue?</h4>
                    <p> All unsaved changes will be lost.</p>
                  </div>
                </div>
                <div className="payment-screen-btn">
                  <button
                    className="btn btn-cancel second-btn"
                    onClick={OnPopupClose}
                  >
                    {" "}
                    No
                  </button>

                  <button
                    className="btn btn-continue second-btn yes-btn-popup   "
                    onClick={OnPopupOk}
                  >
                    {" "}
                    Yes
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default ReceiveDelivery;
