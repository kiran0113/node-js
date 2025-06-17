import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PaymentSettingsServices } from "../../../services/Partner/PaymentSettings/PaymentSettings";
import { Toast } from "primereact/toast";
import { Logout } from "../../../utils/AccountUtils";
function AddReceiverInformationManadatoryFields(
  PartnerId: any,
  Type: any,
  FieldId: any,
  SubCategoryId: any
) {
  return { PartnerId, Type, FieldId, SubCategoryId };
}

const C2BorC2CTransactionLimits: React.FC<any> = ({
  setShowC2BorC2C,
  onC2BorC2CTransactionLimitsAddClick,
  C2BorC2CTransactionLimitsBackClick,
  buttonLoadingSkip,
  buttonLoadingBack,
  setButtonLoadingBack,
  setButtonLoadingSkip,
}) => {

  const [buttonLoading, setButtonLoading] = useState(false);

  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const [namefield, setNameField] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [nameIntegerfield, setNameIntegerfield] = useState([]);
  const [contactFields, setcontactFields] = useState([]);
  const [contactIntegerFields, setContactIntegerFields] = useState([]);
  const [verificationFields, setverificationFields] = useState([]);

  
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  const [verificationIntergerFields, setVerificationIntegerFields] = useState(
    []
  );
  const [complianceFields, setComplianceFields] = useState([]);
  const [complianceIntergerFields, setcomplianceIntegerFields] = useState([]);
  const [popupSkip, setPopupSkip] = useState(false);
  const [dirtyfield, setDirtyField] = useState(false);

  
  const [visible, setVisible] = useState<boolean>(false);


  const [checkedAll, setCheckedAll] = useState(false);

  const [checkAllContactField, setCheckAllContactField] = useState(false);

  const [checkAllVerificationField, setCheckAllVerificationField] = useState(false);

  const [checkAllCompliancefields, setCheckAllCompliancefields] = useState(false);

  const { partnerid, type } = useParams();

  const [readonly, setReadOnly] = useState(true);

  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const [PaymentSettings, setPaymentSettings] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
  });

  const [loading, setLoading] = useState(true);

  /////// Name Fields Checked

  const setnamefield = (data: any) => {
    const state = [...namefield];
    const selectedData = state.map((obj) => {
      if (obj.id === data.id) {
        return { ...obj, IsChecked: !data.IsChecked };
      }
      return obj;
    });

    const trueSelectedData = selectedData
      .filter((data) => data.IsChecked === true)
      .map((x) => x.id);
    setNameIntegerfield(trueSelectedData);
    setNameField(selectedData);
    setDirtyField(true);

    if (checkedAll === true) {
    
      {
        namefield.map((nameFieldsData: any, index) => (
          nameFieldsData = false
        ))
        setCheckedAll(false);
      }
    
    }
  };

  /////// Contcat Fields Checked

  const setContactfield = (data: any) => {
    const state = [...contactFields];
    const selectContactData = state.map((obj2) => {
      if (obj2.id === data.id) {
        return { ...obj2, IsChecked: !data.IsChecked };
      }
      return obj2;
    });
    const trueContactData = selectContactData
      .filter((data) => data.IsChecked === true)
      .map((y) => y.id);
    setContactIntegerFields(trueContactData);
    setcontactFields(selectContactData);
    setDirtyField(true);

    if (checkAllContactField === true) {
    
      {
        contactFields.map((contactIntegerFields: any, index) => (
          contactIntegerFields = false
        ))
      }
      setCheckAllContactField(false);
    }
  };

  /////// verification Fields Checked

  const setVerificationfield = (data: any) => {
    const state = [...verificationFields];
    const selectVerifiacationData = state.map((obj3) => {
      if (obj3.id === data.id) {
        return { ...obj3, IsChecked: !data.IsChecked };
      }
      return obj3;
    });
    const trueVerificationdata = selectVerifiacationData
      .filter((data) => data.IsChecked === true)
      .map((z) => z.id);
    setVerificationIntegerFields(trueVerificationdata);
    setverificationFields(selectVerifiacationData);
    setDirtyField(true);

    
    if (checkAllVerificationField === true) {
    
      {
        verificationFields.map((verificationIntergerFields: any, index) => (
          verificationIntergerFields = false
        ))
        setCheckAllVerificationField(false);
      }
    
    }
  };

  const setCompliancefields = (data: any) => {
    const state = [...complianceFields];
    const selectComplianceFieldsData = state.map((obj4) => {
      if (obj4.id === data.id) {
        return { ...obj4, IsChecked: !data.IsChecked };
      }
      return obj4;
    });

    const trueCompliancedata = selectComplianceFieldsData
      .filter((data) => data.IsChecked === true)
      .map((a) => a.id);
    setcomplianceIntegerFields(trueCompliancedata);
    setComplianceFields(selectComplianceFieldsData);

    
    if (checkAllCompliancefields === true) {
    
      {
        contactFields.map((complianceIntergerFields: any, index) => (
          complianceIntergerFields = false
        ))
        setCheckAllCompliancefields(false);
      }
    
    }
  };

  const senderPaymentFields = () => {
    
    const ids = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    PaymentSettingsServices.SenderPaymentField(ids)
      .then((data: any) => {
        const responsedata = data.data;

        const nameFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Name Field")
          .map((namefield: any) => ({ ...namefield, IsChecked: false }));
        const contactFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Contact Fields")
          .map((contactfield: any) => ({ ...contactfield, IsChecked: false }));

        const verificationFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Verification Fields")
          .map((verificationfields: any) => ({
            ...verificationfields,
            IsChecked: false,
          }));
        const complianceFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Compliance Fields")
          .map((compliancefields: any) => ({
            ...compliancefields,
            IsChecked: false,
          }));

        setNameField(nameFieldsData);
        setcontactFields(contactFieldsData);
        setverificationFields(verificationFieldsData);
        setComplianceFields(complianceFieldsData);

        GetReceiverInfo(
          nameFieldsData,
          contactFieldsData,
          verificationFieldsData,
          complianceFieldsData
        );
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

  const acceptupdate = () => {
    const fieldIds = [
      ...namefield,
      ...contactFields,
      ...verificationFields,
      ...complianceFields,
    ]
      .filter((data: any) => data.IsChecked === true)
      .map((res: any) => res.id);

    const apidata = AddReceiverInformationManadatoryFields(
      partnerid,
      "C2C",
      fieldIds.toString(),
      1
    );

    setButtonLoading(true);
    PaymentSettingsServices.getSenderInformationFields(apidata)
      .then((res) => senderPaymentFields())
      .then(() => {
        setButtonLoading(false);
        onC2BorC2CTransactionLimitsAddClick();
      })
      .catch((error) => {
        setButtonLoading(false);
      });
  };

  const GetReceiverInfo = (
    nameFieldsData: any,
    contactFieldsData: any,
    verificationFieldsData: any,
    complianceFieldsData: any
  ) => {
    setLoading(true);
    PaymentSettingsServices.getSenderInformation(Number(partnerid), "C2C", 1)
      .then((res) => {
        const responseData = res.data;
        setDataLength(responseData.length);

        const newData: any = [];
        const contactData: any = [];
        const verificationData: any = [];
        const complianceData: any = [];

        const start = 0;
        const count = 6;
        const excludeIndices = [6, 7, 8];

        const nameField = nameFieldsData.filter((element: any, index :any) => {
          return !excludeIndices.includes(index);
        }).splice(start, count);


        nameField.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            newData.push({ ...element, IsChecked: true });
            setCheckedAll(true);
          } else {
            newData.push({ ...element, IsChecked: false });
            setCheckedAll(false);
          }

          newData.forEach((element:any) => {
            if(element.IsChecked === false){
              setCheckedAll(false);
            }
          });
        });

        contactFieldsData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            contactData.push({ ...element, IsChecked: true });
            setCheckAllContactField(true);
          } else {
            contactData.push({ ...element, IsChecked: false });
            setCheckAllContactField(false);
          }

          contactData.forEach((element:any) => {
            if(element.IsChecked === false){
              setCheckAllContactField(false);
            }
          });
        });
        verificationFieldsData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            verificationData.push({ ...element, IsChecked: true });
            setCheckAllVerificationField(true);
          } else {
            verificationData.push({ ...element, IsChecked: false });
            setCheckAllVerificationField(false);
          }

          verificationData.forEach((element:any) => {
            if(element.IsChecked === false){
            setCheckAllVerificationField(false);
            }
          });
        });


        complianceFieldsData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            complianceData.push({ ...element, IsChecked: true });
            setCheckAllCompliancefields(true)
          } else {
            complianceData.push({ ...element, IsChecked: false });
            setCheckAllCompliancefields(false);
          }

          complianceData.forEach((element:any) => {
            if(element.IsChecked === false){
              setCheckAllCompliancefields(false);
            }
          });
        });
        setNameField(newData);
        setcontactFields(contactData);
        setverificationFields(verificationData);
        setComplianceFields(complianceData);
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

  const OnPopupClose = () => {
    setPopupSkip(false);
  };

  const OnPopupOk = () => {
    onC2BorC2CTransactionLimitsAddClick();
  };

  const onChildBack = () => {
    C2BorC2CTransactionLimitsBackClick();
  };

  const onNextClick = () => {
    if (dirtyfield === true) {
      setPopupSkip(true);
    } else if (dirtyfield === false) {
      setPopupSkip(false);
      onC2BorC2CTransactionLimitsAddClick();
    }
  };


  //select all name field
  const onSelectall = () => {
    if (checkedAll === false) {
      setCheckedAll(true);
      {
        namefield.map((NameReceive: any, index) => (
          NameReceive.IsChecked = true
        ))
      }
    } else {
      setCheckedAll(false);
      {
        namefield.map((NameReceive: any, index) => (
          NameReceive.IsChecked = false
        )
        )
      }
    }

  };

    //select all contact field
    // const onSelectallContactField = () => {
    //   if(checkAllContactField === false){
    //     setCheckAllContactField(true);
    //      {contactFields.map((ContactReceive: any,) => (
    //       ContactReceive.IsChecked = true
    //      ) ) }
    //    }else{
    //     setCheckAllContactField(false);
       
    //       {contactFields.map((ContactReceive: any, ) => (
      
    //         ContactReceive.IsChecked = false
            
    //       ) ) }
    //    }
    //  }
   //select all contact field
   const onSelectallContactField = () => {
    if (checkAllContactField === false) {
      setCheckAllContactField(true);
      {
        contactFields.map(
          (ContactReceive: any, index) => (ContactReceive.IsChecked = true)
        );
      }

      
    } else {
      setCheckAllContactField(false);
      {
        contactFields.map(
          (ContactReceive: any, index) => (ContactReceive.IsChecked = false)
        );
      }
    }
  };
  
   const onSelectallVerifiactionField = () =>{
    if(checkAllVerificationField === false){
      setCheckAllVerificationField(true);
      {
        verificationFields.map((verificationReceive: any) => (
          verificationReceive.IsChecked = true
        ))
      }
    } else {
      setCheckAllVerificationField(false);

      {
        verificationFields.map((verificationReceive: any) => (

          verificationReceive.IsChecked = false

        ))
      }
    }
  }

  const onSelectallCompliances = () => {

    if (checkAllCompliancefields === false) {
      setCheckAllCompliancefields(true);
      {
        complianceFields.map((complianceReceive: any) => (
          complianceReceive.IsChecked = true
        ))
      }
    } else {
      setCheckAllCompliancefields(false);

      {
        complianceFields.map((complianceReceive: any) => (

          complianceReceive.IsChecked = false

        ))
      }
    }
  }

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
   
    senderPaymentFields();
    setButtonLoadingBack(false);
    setButtonLoadingSkip(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <div className="row ">
            <div className="col-md-11">
              <h2>
             Choose all the information that you require about the consumer “sending” the payment
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
                <th>Name Fields</th>
                <th>Contact Fields</th>
                <th> Verification Fields</th>
                <th> Compliance Fields</th>
              </tr>
            </thead>
            <tbody>
              <tr className="read-only-row">
                <td>
                  <div className="select-all-field">
                    <div className="switch-style">
                      <InputSwitch

                        className="status-check"
                        disabled={readonly}
                        name="Send"
                        checked={checkedAll}
                        onChange={(e) =>onSelectall()}
                      />
                    </div>
                    <div>
                      <p>Select All</p>
                    </div>
                  </div>
                  <div className="form-check yes-check">
                    {namefield.map((NameReceive: any, index) => (
                      <div key={index} className="namefield-border">
                        <input

                          className="form-check-input"
                          type="checkbox"
                          name="name"
                          id="name"
                          disabled={readonly}
                          value={NameReceive.id}
                          checked={NameReceive.IsChecked}
                          onChange={(e) => setnamefield(NameReceive)}
                        />
                        <label className="form-check-label">
                          {NameReceive.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>

                <td>
                  <div className="select-all-field">
                    <div className="switch-style">
                      <InputSwitch

                        className="status-check"
                        name="Send"
                        disabled={readonly}
                        checked={checkAllContactField}
                        onChange={(e) => onSelectallContactField()}
                      />
                    </div>
                    <div>
                      <p>Select All</p>
                    </div>
                  </div>
                  <div className="form-check yes-check">
                    {contactFields.map((ContactReceive: any, index) => (
                      <div key={index} className="namefield-border">
                        <input

                          className="form-check-input"
                          type="checkbox"
                          name="name"
                          disabled={readonly}
                          id="name"
                          value={ContactReceive.id}
                          checked={ContactReceive.IsChecked}
                          onChange={(e) => setContactfield(ContactReceive)}
                        />
                        <label className="form-check-label">
                          {ContactReceive.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>

                <td>
                  <div className="select-all-field">
                    <div className="switch-style">
                      <InputSwitch

                        className="status-check"
                        name="Send"
                        disabled={readonly}
                        checked={checkAllVerificationField}
                        onChange={(e) => onSelectallVerifiactionField()}
                      />
                    </div>
                    <div>
                      <p>Select All</p>
                    </div>
                  </div>
                  <div className="form-check yes-check">
                    {verificationFields.map(
                      (verificationReceive: any, index) => (
                        <div key={index} className="namefield-border">
                          <input

                            disabled={readonly}
                            className="form-check-input"
                            type="checkbox"
                            name="name"
                            id="name"
                            checked={verificationReceive.IsChecked}
                            onChange={(e) =>
                              setVerificationfield(verificationReceive)
                            }
                          />
                          <label className="form-check-label">
                            {verificationReceive.name}
                          </label>
                        </div>
                      )
                    )}
                  </div>
                </td>

                <td>
                  <div className="select-all-field">
                    <div className="switch-style">
                      <InputSwitch

                        className="status-check"
                        name="Send"
                        disabled={readonly}
                        checked={checkAllCompliancefields}
                        onChange={(e) => onSelectallCompliances()}
                      />
                    </div>
                    <div>
                      <p>Select All</p>
                    </div>
                  </div>
                  <div className="form-check yes-check">
                    {complianceFields.map((complianceReceive: any, index) => (
                      <div key={index} className="namefield-border">
                        <input

                          className="form-check-input"
                          type="checkbox"
                          name="name"
                          id="name"
                          disabled={readonly}
                          value={complianceReceive.id}
                          checked={complianceReceive.IsChecked}
                          onChange={(e) =>
                            setCompliancefields(complianceReceive)
                          }
                        />
                        <label className="form-check-label">
                          {complianceReceive.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </td>
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
                ) :   <>
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
        </>
      )}
    </>
  );
};

export default C2BorC2CTransactionLimits;
