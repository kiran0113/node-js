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

const B2CorB2BTransactionLimits: React.FC<any> = ({

  onB2CorB2BTransactionLimitsAddClick,
  B2CorB2BTransactionLimitsBackClick,
  buttonLoadingSkip,
  buttonLoadingBack,
  setButtonLoadingBack,
  setButtonLoadingSkip,
}) => {

  const { partnerid, type } = useParams();

  const [updateBtnShow, setUpdateBtnShow] = useState(false);

  const [status, setstatus] = useState(sessionStorage.getItem("OnboardingStatus"));
  const [namefield, setNameField] = useState([]);
  const [nameIntegerfield, setNameIntegerfield] = useState([]);
  const [contactFields, setcontactFields] = useState([]);
  const [contactIntegerFields, setContactIntegerFields] = useState([]);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [verificationFields, setverificationFields] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [visible, setVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [verificationIntergerFields, setVerificationIntegerFields] = useState(
    []
  );
  const [PaymentSettings, setPaymentSettings] = React.useState({
    id: 0,
    partnerId: Number(partnerid),
  });

  const [loading, setLoading] = useState(true);


  const [popupSkip, setPopupSkip] = useState(false);

  const [dirtyfield, setDirtyField] = useState(false);

  const [checkedAllname, setCheckedAllName] = useState(false);

  const [checkAllContactField, setCheckAllContactField] = useState(false);

  const [readonly, setReadOnly] = useState(true);

  const [checkAllVerificationField, setCheckAllVerificationField] = useState(false);


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


    if (checkedAllname === true) {

      {
        namefield.map((nameFieldsData: any, index) => (
          nameFieldsData = false
        ))
        setCheckedAllName(false);
      }

    }

  };

  /////// Contcat Fields Checked

  // const setContactfield = (data: any) => {
  //   const state = [...contactFields];
  //   const selectContactData = state.map((obj2) => {
  //     if (obj2.id === data.id) {
  //       return { ...obj2, IsChecked: !data.IsChecked };
  //     }
  //     return obj2;
  //   });
  //   const trueContactData = selectContactData
  //     .filter((data) => data.IsChecked === true)
  //     .map((y) => y.id);
  //   setContactIntegerFields(trueContactData);
  //   setcontactFields(selectContactData);
  //   setDirtyField(true);

  //   if (checkAllContactField === true) {

  //     {
  //       contactFields.map((contactIntegerFields: any, index) => (
  //         contactIntegerFields = false
  //       ))
  //     }
  //     setCheckAllContactField(false);
  //   }
  // };


  // const setContactField = (data: any) => {
  //   const updatedFields = contactFields.map((field) => {
  //     if (field.id === data.id) {
  //       return { ...field, IsChecked: !field.IsChecked }; // Toggle checked state
  //     }
  //     return field;
  //   });

  //   const selectedIds = updatedFields
  //     .filter((field) => field.IsChecked)
  //     .map((field) => field.id);

  //   setcontactFields(updatedFields); // Update state with new fields
  //   //console.log("updatedFields",updatedFields)
  //   setContactIntegerFields(selectedIds); // Assuming this is for some other state
  //   setDirtyField(true);

  //   // Handle "check all" logic
  //   const allChecked = updatedFields.every((field) => field.IsChecked);
  //   setCheckAllContactField(allChecked);
  // };


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
        verificationFields.map((verificationIntergerFields: any, index) => (
          verificationIntergerFields = false
        ))
        setCheckAllVerificationField(false);
      }

    }
  };

  const receiverPaymentFields = () => {
    setLoading(true);
    const ids = [1, 2, 3, 4];
    PaymentSettingsServices.SenderPaymentField(ids)
      .then((data: any) => {
        const responsedata = data.data;
        //console.log("nameFieldsData responsedata",responsedata)

        const nameFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Name Field")
          .map((namefield: any) => ({ ...namefield, IsChecked: false }));

        const contactFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Contact Fields")
          // .filter((name: any) =>
          //   name.categoryName === "Contact Fields" ||  name.categoryId === 3 &&
          //   name.sortOrder === 10 || name.sortOrder === 11
          // )
          .map((contactfield: any) => ({ ...contactfield, IsChecked: false }));

          

        const verificationFieldsData = responsedata
          .filter((name: any) => name.categoryName === "Verification Fields"  && name.sortOrder === 10 || name.sortOrder === 11 )
          .map((verificationfields: any) => ({
            ...verificationfields,
            IsChecked: false,
          }));

        setNameField(nameFieldsData);
        setcontactFields(contactFieldsData);
        setverificationFields(verificationFieldsData);

        //console.log("contactFieldsData", contactFieldsData)

        GetReceiverInfo(
          nameFieldsData,
          contactFieldsData,
          verificationFieldsData
        );
        //setLoading(false);
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

    const fieldIds = [...namefield, ...contactFields, ...verificationFields]
      .filter((data: any) => data.IsChecked === true)
      .map((res: any) => res.id);

    const apidata = AddReceiverInformationManadatoryFields(
      partnerid,
      "B2C",
      fieldIds.toString(),
      1
    );


    //console.log("apidata",apidata)
    setButtonLoading(true);
    PaymentSettingsServices.getSenderInformationFields(apidata)

      .then((res) => receiverPaymentFields())
      .then((receiverPaymentFields) => {
        onB2CorB2BTransactionLimitsAddClick();
        setButtonLoading(false);
      })
      .catch((error) => {

        setButtonLoading(false);
      });
  };

  const GetReceiverInfo = (
    nameFieldsData: any,
    contactFieldsData: any,
    verificationFieldsData: any
  ) => {
    setLoading(true);
    PaymentSettingsServices.getSenderInformation(Number(partnerid), "B2C", 1)
      .then((res) => {
        const responseData = res.data;

        const newData: any = [];
        const contactData: any = [];
        const verificationData: any = [];
        setDataLength(responseData.length);

        const start = 0;
        const count = 9;
        const excludeIndices = [0, 1, 2, 3, 4, 5,10];

        const nameField = nameFieldsData.filter((element: any, index: any) => {
          return !excludeIndices.includes(index);
        }).splice(start, count);

        nameField.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            newData.push({ ...element, IsChecked: true });
            setCheckedAllName(true);
          } else {
            newData.push({ ...element, IsChecked: false });
            setCheckedAllName(false);
          }

          newData.forEach((element: any) => {
            if (element.IsChecked === false) {
              setCheckedAllName(false);
            }
          });
        });


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
  
        // contactFieldsData.forEach((element: any) => {
        //   if (responseData.some((x: any) => x.fieldId == element.id)) {
        //     contactData.push({ ...element, IsChecked: true });
        //     setCheckAllContactField(true);
        //   } else {
        //     contactData.push({ ...element, IsChecked: false });
        //     setCheckAllContactField(false);
        //   }

        //   // contactData.forEach((element: any) => {
        //   //   if (element.IsChecked === false) {
        //   //     setCheckAllContactField(false);
        //   //   }
        //   // });
        // });

        // const allContactChecked = contactData.every((element: any) => element.IsChecked);
        // setCheckAllContactField(allContactChecked); // Set check all state for contacts

        verificationFieldsData.forEach((element: any) => {
          if (responseData.some((x: any) => x.fieldId == element.id)) {
            verificationData.push({ ...element, IsChecked: true });
            setCheckAllVerificationField(true);
          } else {
            verificationData.push({ ...element, IsChecked: false });
            setCheckAllVerificationField(false);
          }

          verificationData.forEach((element: any) => {
            if (element.IsChecked === false) {
              setCheckAllVerificationField(false);
            }
          });
        });

        setNameField(newData);
        setcontactFields(contactData);
        setverificationFields(verificationData);
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

  const onChildBack = () => {
    B2CorB2BTransactionLimitsBackClick();
  };

  const OnPopupClose = () => {
    setPopupSkip(false);
  }

  const onNextClick = () => {
    if (dirtyfield === true) {
      setPopupSkip(true);
    }
    else if (dirtyfield === false) {
      setPopupSkip(false);
      onB2CorB2BTransactionLimitsAddClick();
    }

  };

  const OnPopupOk = () => {
    onB2CorB2BTransactionLimitsAddClick();
  };



  //select all name field
  const onSelectall = () => {
    if (checkedAllname === false) {
      setCheckedAllName(true);
      {
        namefield.map((NameReceive: any, index) => (
          NameReceive.IsChecked = true
        ))
      }
    } else {
      setCheckedAllName(false);

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
  //   if (checkAllContactField === false) {
  //     setCheckAllContactField(true);
  //     {
  //       contactFields.map((ContactReceive: any, index) => (
  //         ContactReceive.IsChecked = true
  //       ))
  //     }
  //   } else {
  //     setCheckAllContactField(false);

  //     {
  //       contactFields.map((ContactReceive: any, index) => (

  //         ContactReceive.IsChecked = false

  //       ))
  //     }
  //   }
  // }
  //select all contact field
  //  const onSelectallContactField = () => {
  //   if (checkAllContactField === false) {
  //     setCheckAllContactField(true);
  //     {
  //       contactFields.map(
  //         (ContactReceive: any, index) => (ContactReceive.IsChecked = true)
  //       );
  //     }
  //   } else {
  //     setCheckAllContactField(false);
  //     {
  //       contactFields.map(
  //         (ContactReceive: any, index) => (ContactReceive.IsChecked = false)
  //       );
  //     }
  //   }
  // };

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

  const reject = () => {
    setButtonLoading(false);
    setVisible(false)

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
        <>
          <div className="row ">
            <div className="col-md-11">
              <h2>
                Choose all the information that you require about the business “sending” the payment
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
                <th>Verification Fields</th>
                {/* <th> Verification Fields</th> */}
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
                        checked={checkedAllname}
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
                  {/* <div className="form-check yes-check">
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
                  </div> */}
                  <div className="form-check yes-check">
                    {contactFields.map((contact, index) => (
                      <div key={contact.id} className="namefield-border">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="name"
                          id={`name-${contact.id}`} // Unique ID for each checkbox
                          disabled={readonly}
                          checked={contact.IsChecked} // Use IsChecked for controlled checkbox
                          onChange={() => setContactfield(contact)} // Pass the current contact

                          
                        />
                        <label className="form-check-label" htmlFor={`name-${contact.id}`}>
                          {contact.name}
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
                {type === 'A' ? (null) : (<button
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
                ) : <>
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

export default B2CorB2BTransactionLimits;
