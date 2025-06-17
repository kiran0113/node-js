import { Button } from "primereact/button";
import { confirmDialog } from "primereact/confirmdialog";
import { InputSwitch } from "primereact/inputswitch";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Logout } from "../../../utils/AccountUtils";

import { PaymentSettingsServices } from "../../../services/Partner/PaymentSettings/PaymentSettings";

function AddReceiverInformationManadatoryFields(
  PartnerId: any,
  Type: any,
  FieldId: any,
  SubCategoryId: any
) {
  return { PartnerId, Type, FieldId, SubCategoryId };
}

const B2BorC2BTransactionLimits: React.FC<any> = ({
  onB2BorC2BTransactionLimitsAddClick,
  buttonLoadingSkip,
  buttonLoadingBack,
  setButtonLoadingBack,
  setButtonLoadingSkip,
  B2BorC2BTransactionLimitsBackClick,
}) => {
  const [loading, setLoading] = useState(true);

  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );

  const [namefield, setNameField] = useState([]);
  const { partnerid, type } = useParams();
  const [visible, setVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [nameIntegerfield, setNameIntegerfield] = useState([]);
  const toast = useRef<Toast>(null);

  const [contactFields, setcontactFields] = useState([]);

  const [contactIntegerFields, setContactIntegerFields] = useState([]);

  const [verificationFields, setverificationFields] = useState([]);

  const [verificationIntergerFields, setVerificationIntegerFields] = useState(
    []
  );

  const [dataLength, setDataLength] = useState(0);

  const [popupSkip, setPopupSkip] = useState(false);

  const [dirtyfield, setDirtyField] = useState(false);


  const [buttonLoading, setButtonLoading] = useState(false);

  const [readonly, setReadOnly] = useState(true);

  const [checkedAll, setCheckedAll] = useState(false);

  const [checkAllContactField, setCheckAllContactField] = useState(false);

  const [checkAllVerificationField, setCheckAllVerificationField] =
    useState(false);

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
        namefield.map((nameFieldsData: any, index) => (nameFieldsData = false));
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
        contactFields.map(
          (contactIntegerFields: any, index) => (contactIntegerFields = false)
        );
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
    const trueVerificationata = selectVerifiacationData
      .filter((data) => data.IsChecked === true)
      .map((z) => z.id);
    setVerificationIntegerFields(trueVerificationata);
    setverificationFields(selectVerifiacationData);
    setDirtyField(true);

    if (checkAllVerificationField === true) {
      {
        verificationFields.map(
          (verificationIntergerFields: any, index) =>
            (verificationIntergerFields = false)
        );
        setCheckAllVerificationField(false);
      }
    }
  };

  // receiver payment fiedls
  const receiverPaymentFields = () => {
    setLoading(true);
    const ids = [1, 2, 3, 4];
    PaymentSettingsServices.ReceivePaymentField(ids)
      .then((data: any) => {
        const responsedata = data.data;
        const nameFieldsData = responsedata

          .filter((name: any) => name.categoryName === "Name Field")
          .map((namefield: any) => ({ ...namefield, IsChecked: false }));

        const contactFieldsData = responsedata
          // .filter((name: any) => name.categoryName === "Contact Fields")
          .filter((name: any) => name.categoryName === "Contact Fields")
          
          // ||name.categoryId === 3 &&
          //   name.sortOrder === 10 || name.sortOrder === 11
          // )
          .map((contactfield: any) => ({ ...contactfield, IsChecked: false }));
          

        const verificationFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Verification Fields")
          // .filter((name: any) => name.categoryName === "Verification Fields"  && name.sortOrder === 10 || name.sortOrder === 11 )

          .map((verificationfields: any) => ({  ...verificationfields, IsChecked: false,  }));


        setNameField(nameFieldsData);
        setcontactFields(contactFieldsData);
        setverificationFields(verificationFieldsData);
        GetReceiverInfo(
          nameFieldsData,
          contactFieldsData,
          verificationFieldsData
        );
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

  // get receiver info
  // const GetReceiverInfo = (
  //   nameFieldsData: any,
  //   contactFieldsData: any,
  //   verificationFieldsData: any
  // ) => {
  //   setLoading(true);

  //   PaymentSettingsServices.getReceiverInformation(Number(partnerid), "B2B", 1)
  //     .then((res) => {
  //       const responseData = res.data;
  //       const newData: any = [];
  //       const contactData: any = [];
  //       const verificationData: any = [];
  //       setDataLength(responseData.length);
  //       // //console.log("nameFieldsData",nameFieldsData)

  //       const start = 0;
  //       const count = 9;
  //       const excludeIndices = [0, 1, 2, 3, 4, 5];

  //       const nameField = nameFieldsData.filter((element: any, index: any) => {
  //         return !excludeIndices.includes(index);
  //       }).splice(start, count);


  //       nameField.forEach((element: any) => {
  //         if (responseData.some((x: any) => x.fieldId == element.id)) {
  //           newData.push({ ...element, IsChecked: true });
  //           // //console.log("newData....1",newData)

  //           setCheckedAll(true);
  //         } else {
  //           newData.push({ ...element, IsChecked: false });
  //           setCheckedAll(false);
  //           // //console.log("newData....2",newData)
  //         }
  //         newData.forEach((element: any) => {
  //           if (element.IsChecked === false) {
  //             setCheckedAll(false);
  //             // newData.push({ ...element, IsChecked: false });
  //             // //console.log("newDelementata",element)
  //           }
  //         });
  //       });
  //       // //console.log("newData",newData)


  //       contactFieldsData.forEach((element: any) => {
  //         if (responseData.some((x: any) => x.fieldId == element.id)) {
  //           contactData.push({ ...element, IsChecked: true });
  //           //console.log("IsChecked",element.IsChecked)
  //           setCheckAllContactField(true);
  //         } else {
  //           contactData.push({ ...element, IsChecked: false });
  //           setCheckAllContactField(false);
  //         }

  //         contactData.forEach((element: any) => {
  //           if (element.IsChecked === false) {
  //             //console.log("IsChecked",element.IsChecked)
  //             setCheckAllContactField(false);
  //           }
  //         });
  //       });

  //       verificationFieldsData.forEach((element: any) => {
  //         if (responseData.some((x: any) => x.fieldId == element.id)) {
  //           verificationData.push({ ...element, IsChecked: true });
  //           setCheckAllVerificationField(true);
  //         } else {
  //           verificationData.push({ ...element, IsChecked: false });
  //           setCheckAllVerificationField(false);
  //         }

  //         verificationData.forEach((element: any) => {
  //           if (element.IsChecked === false) {
  //             setCheckAllVerificationField(false);
  //           }
  //         });
  //       });

  //       setNameField(newData);
  //       setcontactFields(contactData);
  //       setverificationFields(verificationData);
  //       setLoading(false);
  //     })

  //     .catch((error) => {
  //       if (error.response.status === 401) {
  //         toast.current?.show({
  //           severity: "error",
  //           summary: "Unauthorized",
  //           life: 3000,
  //         });
  //         Logout(navigate);
  //       }
  //     });
  // };

  const GetReceiverInfo = (
    nameFieldsData: any,
    contactFieldsData: any,
    verificationFieldsData: any
  ) => {
    setLoading(true);
  
    PaymentSettingsServices.getReceiverInformation(Number(partnerid), "B2B", 1)
      .then((res) => {
        const responseData = res.data;
        const newData : any  = [];
        const contactData: any  = [];
        const verificationData: any  = [];
        setDataLength(responseData.length);
  
        const start = 0;
        const count = 9;
        const excludeIndices = [0, 1, 2, 3, 4, 5];
        // const includeIndices = [44,42]

        const start1 = 0;
        const count1 = 14;
        const includeIndices = [9,10]
  
        // const nameField = nameFieldsData.filter((element: any, index: any) => {
        //           return !excludeIndices.includes(index);
        //         }).splice(start, count);


        const nameField = nameFieldsData.filter((_:any, index: any ) => !excludeIndices.includes(index)).splice(start, count);
  
        nameField.forEach((element: any ) => {
          const isChecked = responseData.some((x: any ) => x.fieldId === element.id);
          newData.push({ ...element, IsChecked: isChecked });
          setCheckedAll((prev) => prev && isChecked); // Check if all are checked
        });
  
        // contactFieldsData.forEach((element: any ) => {
        //   const isChecked = responseData.some((x: any ) => x.fieldId === element.id);
        //   contactData.push({ ...element, IsChecked: isChecked });
        // });
        contactFieldsData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            contactData.push({ ...element, IsChecked: true });
            setCheckAllContactField(true);
          } else {
            contactData.push({ ...element, IsChecked: false });
            setCheckAllContactField(false)
          }
          contactData.forEach((element:any) => {
            if(element.IsChecked === false){
              setCheckAllContactField(false);
            }
          });
        });

  
        const allContactChecked = contactData.every((element: any ) => element.IsChecked);
        setCheckAllContactField(allContactChecked); // Set check all state for contacts
  





             
        const verificationFieldsData1 = verificationFieldsData.filter((_:any, index: any ) => includeIndices.includes(index)).splice(start1, count1);

        // const verificationFieldsData1 = verificationFieldsData.filter((_:any,index:any) => includeIndices.includes(index));

        verificationFieldsData1.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            verificationData.push({ ...element, IsChecked: true });
            setCheckAllVerificationField(true);
          } else {
            verificationData.push({ ...element, IsChecked: false });
            setCheckAllVerificationField(false)
          }
          verificationData.forEach((element:any) => {
            if(element.IsChecked === false){
              setCheckAllVerificationField(false);
            }
          });
        });

  
        const allverificationData = verificationData.every((element: any ) => element.IsChecked);
        setCheckAllContactField(allverificationData); // Set check all state for contacts

        


        //verificationData
        // verificationFieldsData.forEach((element: any ) => {
        //   const isChecked = responseData.some((x: any ) => x.fieldId === element.id);
        //   verificationData.push({ ...element, IsChecked: isChecked });
        // });
  
        // const allVerificationChecked = verificationData.every((element: any ) => element.IsChecked);
        // setCheckAllVerificationField(allVerificationChecked); // Set check all state for verification


       
  
        setNameField(newData);
        setcontactFields(contactData);
        setverificationFields(verificationData);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          toast.current?.show({
            severity: "error",
            summary: "Unauthorized",
            life: 3000,
          });
          Logout(navigate);
        }
      });
  };
  

  //on save click
  const acceptupdate = () => {
    setVisible(false);

    const fieldIds = [...namefield, ...contactFields, ...verificationFields]
      .filter((data: any) => data.IsChecked === true)
      .map((res: any) => res.id);

    const apidata = AddReceiverInformationManadatoryFields(
      partnerid,
      "B2B",
      fieldIds.toString(),
      1
    );

    setButtonLoading(true);

    PaymentSettingsServices.getReceiverInformationFields(apidata)
      .then((res) => receiverPaymentFields())
      .then((receiverPaymentFields) => {
        onB2BorC2BTransactionLimitsAddClick();
        setButtonLoading(false);
      })

      .catch((error) => {
        setButtonLoading(true);
      });
  };

  //on back click
  const onChildBack = () => {
    setButtonLoadingBack(true);
    B2BorC2BTransactionLimitsBackClick();
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
  // on next click
  const onNextClick = () => {
    if (dirtyfield === true) {
      setPopupSkip(true);
    } else if (dirtyfield === false) {
      setPopupSkip(false);
      onB2BorC2BTransactionLimitsAddClick();
    }
  };

  const OnPopupClose = () => {
    setPopupSkip(false);
  };

  const OnPopupOk = () => {
    onB2BorC2BTransactionLimitsAddClick();
  };

  //select all name field
  const onSelectall = () => {
    if (checkedAll === false) {
      setCheckedAll(true);
      {
        namefield.map(
          (NameReceive: any, index) => (NameReceive.IsChecked = true)
        );
      }
    } else {
      setCheckedAll(false);
      {
        namefield.map(
          (NameReceive: any, index) => (NameReceive.IsChecked = false)
        );
      }
    }
  };

  //select all contact field
  const onSelectallContactField = () => {
    if (checkAllContactField === false) {
      setCheckAllContactField(true);
      {
        contactFields.map(
          (ContactReceive: any, index) => (ContactReceive.IsChecked = true)
        );
        //console.log("ContactReceive1=>",checkAllContactField)
      }

      
    } else {
      setCheckAllContactField(false);
      {
        contactFields.map(
          (ContactReceive: any, index) => (ContactReceive.IsChecked = false)
        );
        //console.log("ContactReceive2=>",checkAllContactField)
      }
    }
  };

  const onSelectallVerifiactionField = () => {
    if (checkAllVerificationField === false) {
      setCheckAllVerificationField(true);
      {
        verificationFields.map(
          (verificationReceive: any) => (verificationReceive.IsChecked = true)
        );
      }
    } else {
      setCheckAllVerificationField(false);

      {
        verificationFields.map(
          (verificationReceive: any) => (verificationReceive.IsChecked = false)
        );
      }
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
  const onConfirmUpdateClick = (item: any) => {
    confirmDialog({
      message: "Are you sure you want to update?",
      icon: "pi pi-info-circle",

      accept: () => acceptupdate(),
      reject,
    });
  };
  const reject = () => {
    setButtonLoading(false);
    setVisible(false);
  };

  const onAddClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    if (type === "V") {
      event.preventDefault();
      setVisible(true);
      onConfirmUpdateClick(event);
    } else if (type === "A") {
      acceptupdate();
    }
  };
  useEffect(() => {
    receiverPaymentFields();
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
        <div>
          <div className="row ">
            <div className="col-md-11">
              <h2>
                Choose all the information that you require about the business “receiving” the payment
              </h2>
            </div>
            <div className="col-md-1 edit-payment">
              {type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name Fields</th>
                <th>Contact Fields</th>
                <th> Verification Fields</th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="read-only-row">
                <td>
                  <div className="select-all-field">
                    <div className="switch-style">
                      <InputSwitch
                        className="status-check"
                        name="Send"
                        disabled={readonly}
                        checked={checkedAll}
                        onChange={onSelectall}
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
                          disabled={readonly}
                          id="name"
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
                          id="name"
                          disabled={readonly}
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
                            className="form-check-input"
                            type="checkbox"
                            name="name"
                            id="name"
                            disabled={readonly}
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

                {type === "A" ? null : (
                  <button
                    type="button"
                    className="btn btn-cancel  second-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                )}

                {updateBtnShow ? (
                  <Button
                    iconPos="left"
                    label="Save and Continue"
                    loading={buttonLoading}
                    className="btn btn-continue second-btn"
                    onClick={onAddClick}
                  />

                ) : (
                  <>
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
                  </>

                )}
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
                    className="btn btn-cancel second-btn "
                    onClick={OnPopupClose}
                  >
                    {" "}
                    No
                  </button>

                  <button
                    className="btn btn-continue second-btn yes-btn-popup"
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

export default B2BorC2BTransactionLimits;
