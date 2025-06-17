import { Button } from "primereact/button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import CloseIcon from "../../assets/images/icon/close-icon.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { InstarailsFeesService } from "../../services/Partner/InstarailsFees/InstarailsFeesService";
import { CommonService } from "../../services/Common/CommonService";
import { Logout } from "../../utils/AccountUtils";
import { instarailsCurrenciesList } from "../../utils/utils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { PartnerTypeList,PartnerTypeList1 } from "../../utils/utils";
import Scrollbars from "react-custom-scrollbars-2";
const InstarailsFees: React.FC = () => {
  const { partnerid } = useParams();
  const [instarailsFeesList, setInstarailsFeesList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [typeerrorMessage, settypeErrorMessage] = React.useState("");
  const [typeAutoComplete, setTypeAutoComplete] = useState("");
  const [fixedcommisionerrorMessage, setfixedcommisionErrorMessage] =
    React.useState("");
  const [variablecommisionerrorMessage, setvariablecommissionErrorMessage] =
    React.useState("");
  const [currencyerrorMessage, setcurrencyErrorMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [minerrorMessage, setminerrorMessage] = React.useState("");
  const [maxerrorMessage, setmaxerrorMessage] = React.useState("");
  const [deletedata, SetDeleteData] = useState(null);
  const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
  const dialogFuncMap = {
    displayBasic: setDisplayBasic,
  };
  const [filteredcurrencylist, setFilteredCurrencyList] = React.useState<any[]>(
    []
  );
  const [currencyAutoComplete, setCurrencyAutoComplete] = useState("");
  const [filteredtypelist, setFilteredTypeList] = React.useState<any[]>([]);
  const [typeList, setTypeList] = React.useState([]);
  const [InstarailsFeesModel, setInstarailsFeesModel] = React.useState({
    id: 0,
    partnerId: partnerid,
    type: null,
    min: null,
    max: null,
    instarailsFixedCommission: null,
    instarailsVariableCommission: null,
    instarailsCommissionCurrency: "",
  });

  const setModelEmpty = () => {
    setInstarailsFeesModel({
      id: 0,
      partnerId: partnerid,
      type: null,
      min: null,
      max: null,
      instarailsFixedCommission: null,
      instarailsVariableCommission: null,
      instarailsCommissionCurrency: "",
    });
    setTypeAutoComplete("");
    setCurrencyAutoComplete("");
  };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };

  const errorMessageEmptyModel = () => {
    settypeErrorMessage("");
    setfixedcommisionErrorMessage("");
    setvariablecommissionErrorMessage("");
    setcurrencyErrorMessage("");
    setminerrorMessage("");
    setmaxerrorMessage("");
    setErrorMessage("");
  };

  const isValidate = (values: any) => {
    let formIsValid = true;
    errorMessageEmptyModel();
    if (CheckNull(values.type)) {
      settypeErrorMessage("Please select type.");
      formIsValid = false;
    }
    if (CheckNull(values.min)) {
      setminerrorMessage("Please enter min.");
      formIsValid = false;
    }

    if (!CheckNull(values.min)) {
      if (values.min < 0) {
        setminerrorMessage("Min can not be negative.");
        formIsValid = false;
      }
      if (!(values.min < 0)) {
        if (!values.min.toString().match(/^\d{1,16}(\.\d{0,2})?$/)) {
          setminerrorMessage("Min value valid only upto length(16,2)");
          formIsValid = false;
        }
      }
    }
    if (CheckNull(values.max)) {
      setmaxerrorMessage("Please enter max.");
      formIsValid = false;
    }

    if (!CheckNull(values.max)) {
      if (values.max < 0) {
        setmaxerrorMessage("Max can not be negative.");
        formIsValid = false;
      }
      if (!(values.max < 0)) {
        if (!values.max.toString().match(/^\d{1,16}(\.\d{0,2})?$/)) {
          setmaxerrorMessage("Max value valid only upto length(16,2)");
          formIsValid = false;
        }
      }
      if (parseFloat(values.min) >= parseFloat(values.max)) {
        setmaxerrorMessage("Please enter max value greater than min value.");
        formIsValid = false;
      }
    }
    if (CheckNull(values.instarailsFixedCommission)) {
      setfixedcommisionErrorMessage("Please enter fixed fee.");
      formIsValid = false;
    }
    if (!CheckNull(values.instarailsFixedCommission)) {
      if (values.instarailsFixedCommission < 0) {
        setfixedcommisionErrorMessage("Fixed fee can not be negative.");
        formIsValid = false;
      }
      if (!(values.instarailsFixedCommission < 0)) {
        if (
          !values.instarailsFixedCommission
            .toString()
            .match(/^\d{1,16}(\.\d{0,2})?$/)
        ) {
          setfixedcommisionErrorMessage(
            "Fixed fee valid only upto length(16,2)"
          );
          formIsValid = false;
        }
      }
    }
    if (CheckNull(values.instarailsVariableCommission)) {
      setvariablecommissionErrorMessage("Please enter variable fee.");
      formIsValid = false;
    }
    if (!CheckNull(values.instarailsVariableCommission)) {
      if (values.instarailsVariableCommission < 0) {
        setvariablecommissionErrorMessage("Variable fee can not be negative.");
        formIsValid = false;
      }
      if (!(values.instarailsVariableCommission < 0)) {
        if (
          !values.instarailsVariableCommission
            .toString()
            .match(/^\d{1,16}(\.\d{0,2})?$/)
        ) {
          setvariablecommissionErrorMessage(
            "Variable fee valid only upto length(16,2)"
          );
          formIsValid = false;
        }
      }
    }
    if (CheckNull(values.instarailsCommissionCurrency)) {
      setcurrencyErrorMessage("Please select currency.");
      return false;
    }
    return formIsValid;
  };

  useEffect(() => {
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      navigate("/");
    }
    getBusinessTypes();
    getInstarailsFeesByPartnerId(partnerid);
  }, []);

  const getBusinessTypes = () => {
    CommonService.getBusinessType()
      .then((data) => {
        setTypeList(data.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setTypeList([]);
      });
  };

  const getInstarailsFeesByPartnerId = (val: any) => {
    setLoading(true);
    InstarailsFeesService.getInstarailsFeeByPartnerId(val)
      .then((data) => {
        setInstarailsFeesList(data.data);
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
        } else if (error.response.status === 400) {
          toast.current?.show({
            severity: "error",
            summary: error.response.data[0].errorMessage,
            life: 3000,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setInstarailsFeesList([]);
        setLoading(false);
      });
  };
  const ShowHideDialog = () => {
    setModelEmpty();
    errorMessageEmptyModel();
    setDisplayBasic(true);
  };
  const onHideClick = () => {
    setDisplayBasic(false);
    setModelEmpty();
  };
  const onCancleClick = () => {
    InstarailsFeesModel.id === 0
      ? setModelEmpty()
      : getInstarailsFeesByPartnerId(Number(partnerid));
    setDisplayBasic(false);
    errorMessageEmptyModel();
  };
  const onAddClick = () => {
    errorMessageEmptyModel();
    InstarailsFeesModel.partnerId = partnerid;
    setButtonLoading(true);
    if (isValidate(InstarailsFeesModel)) {
      InstarailsFeesService.addInstarailsFee(InstarailsFeesModel)
        .then((data) => {
          setModelEmpty();
          setButtonLoading(false);
          onHideClick();
          getInstarailsFeesByPartnerId(InstarailsFeesModel.partnerId);
        })

        // *********************************************************
        let modifiedFinalData = {};
        if (InstarailsFeesModel.type === 1) {
          const item = InstarailsFeesModel;
          modifiedFinalData = { ...item, type: 2 };
        }
        
        InstarailsFeesService.addInstarailsFee(modifiedFinalData)
        .then((data) => {
          setModelEmpty();
          setButtonLoading(false);
          onHideClick();
          getInstarailsFeesByPartnerId(InstarailsFeesModel.partnerId);
        })
      
    

      
        // ********************************************************
        .catch((error) => {
          if (error.response.status === 401) {
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
          } else if (error.response.status === 409) {
            setErrorMessage(error.response.data);
          } else {
            toast.current?.show({
              severity: "error",
              summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };
  const onUpdateClick = () => {
    errorMessageEmptyModel();
    setButtonLoading(true);
    if (isValidate(InstarailsFeesModel)) {
      InstarailsFeesService.updateInstarailsFee(InstarailsFeesModel)
        .then((data) => {
          setModelEmpty();
          setButtonLoading(false);
          onHideClick();
          getInstarailsFeesByPartnerId(InstarailsFeesModel.partnerId);
        })

        .catch((error) => {
          if (error.response.status === 401) {
            toast.current?.show({
              severity: "error",
              summary: "Unauthorized",
              life: 3000,
            });
            Logout(navigate);
          } else if (error.response.status === 400) {
            toast.current?.show({
              severity: "error",
              summary: "Enter with same type and currency already exists",
              life: 3000,
            });
          } else if (error.response.status === 409) {
            setErrorMessage(error.response.data);
          } else {
            toast.current?.show({
              severity: "error",
              summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const deleteInstarailsFees = (id: any) => {
    setLoading(true);
    InstarailsFeesService.deleteInstarailsFee(id)
      .then((data) => {
        setLoading(false);
        SetDeleteData(null);

        getInstarailsFeesByPartnerId(partnerid);
      })
      .catch((error) => {
        if (error.response.status === 401) {
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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };

  const searchCurrency = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < instarailsCurrenciesList.length; i++) {
      let item = instarailsCurrenciesList[i];
      if (item.Name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredCurrencyList(_filteredItems);
  };
  const searchType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < PartnerTypeList.length; i++) {
      let item = PartnerTypeList[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredTypeList(_filteredItems);
  };
  const onTypeChange = (e: any) => {
    if (e.value !== null) {
      setTypeAutoComplete(e.value);
      setInstarailsFeesModel({
        ...InstarailsFeesModel,
        type: e.value.id,
      });
    }
  };
  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        <Button
          icon="pi pi-pencil"
          className="editbtn"
          title="Edit"
          onClick={() => EditInstarailsFee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="editbtn"
          title="Delete"
          onClick={() => onDeleteHandleClick(rowData)}
        />
      </>
    );
  };
  const variablefeeactionBodyTemplate = (rowData: any) => {
    return (
      <>
        {rowData.instarailsVariableCommission} {"%"}
      </>
    );
  };

  const TypeActionBodyTemplate = (rowData: any) => {
    const typename = PartnerTypeList1.filter(
      (data) => data.id === rowData.type
    ).map((x) => x.name);
    return <>{typename}</>;
  };
  const onDeleteHandleClick = (rowData: any) => {
    // confirmDialog({
    //   message: "Are you sure you want to Delete?",
    //   accept: () => deleteInstarailsFees(rowData.id),
    //   reject,
    // });

    SetDeleteData(rowData);
    setDisplayDeletePopup(true);
  };

  const onDeleteClick = () => {
    deleteInstarailsFees(deletedata.id);
    setDisplayDeletePopup(false);
  };

  const reject = () => {
    errorMessageEmptyModel();
    setDisplayDeletePopup(false);
  };

  const EditInstarailsFee = (val: any) => {
    ShowHideDialog();
    setInstarailsFeesModel(val);
    const type = PartnerTypeList.filter((data) => data.id === val.type)[0].name;
    setTypeAutoComplete(type);
    setCurrencyAutoComplete(val.instarailsCommissionCurrency);
    errorMessageEmptyModel();
  };
  const onCurrencyChange = (e: any) => {
    if (e.value !== null) {
      setCurrencyAutoComplete(e.value);
      setInstarailsFeesModel({
        ...InstarailsFeesModel,
        instarailsCommissionCurrency: e.value.Name,
      });
    }
  };

  return (
    <>
    <Scrollbars
            className="contain-scroll"
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={600}
            autoHeightMax={600}
            thumbMinSize={30}
            universal={true}
          >
      <div>
        <div className="">
          <Toast ref={toast}></Toast>

          <div className="user-heading heading-section">
            <Button
              iconPos="left"
              label="Add Fees"
              className="btn btn-continue send-btn"
              onClick={ShowHideDialog}
              icon="pi pi-plus"
            />
            <Button
              iconPos="left"
              icon="pi pi-refresh"
              label="Refresh"
              className="btn btn-continue"
              onClick={() => getInstarailsFeesByPartnerId(partnerid)}
            />
          </div>
          <div className="togle-button">
            <div id="content">
              {loading ? (
                <div className="spinner-class">
                  <ProgressSpinner />
                </div>
              ) : (
                <div className=" facilitator-main">
                  <div className="datatable-doc-demo adm-insta-fees-table">
                    <div className="user-tab">
                      <DataTable
                        value={instarailsFeesList}
                        paginator
                        className=""
                        rows={50}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id"
                        rowHover
                        filterDisplay="menu"
                        responsiveLayout="scroll"
                        globalFilterFields={[
                          "name",
                          "country.name",
                          "representative.name",
                          "balance",
                          "status",
                        ]}
                        emptyMessage="No instarails fees found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                      >
                        <Column
                          header="Type"
                          body={TypeActionBodyTemplate}
                          sortable
                        />
                        <Column
                          field="instarailsCommissionCurrency"
                          header="Currency"
                        />
                        <Column field="min" header="Tier Min Amount" />
                        <Column field="max" header="Tier Max Amount" />
                        <Column
                          field="instarailsFixedCommission"
                          header="Fixed Fee"
                        />
                        <Column
                          header="Variable Fee"
                          body={variablefeeactionBodyTemplate}
                        />
                        <Column header="Action" body={actionBodyTemplate} />
                      </DataTable>

                    
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>
      <Dialog
        visible={displayBasic}
        onHide={() => onHideClick()}
        className="user-dialog"
      >
        <div className="FFpopup">
          <button className="close-btn" onClick={onHideClick}>
            <img src={CloseIcon} />
          </button>
          <div className="row popup-inner-content ">
            <div className="col-md-6 form-group ">
              <span className="input-label">
                Type <span className="color-red">*</span>
              </span>
              <AutoComplete
                field="name"
                dropdown
                forceSelection
                className="dropdown-acc"
                placeholder="Select type"
                suggestions={filteredtypelist}
                completeMethod={searchType}
                value={typeAutoComplete}
                onChange={(e) => onTypeChange(e)}
              />
              {typeerrorMessage !== null && typeerrorMessage.length > 0 ? (
                <span className="login-error-msg">{typeerrorMessage}</span>
              ) : null}
            </div>
            <div className="col-md-6 form-group ">
              <span className="input-label">
                Currency <span className="color-red">*</span>
              </span>
              <AutoComplete
                field="Name"
                dropdown
                forceSelection
                className="dropdown-acc"
                placeholder="Select currency"
                suggestions={filteredcurrencylist}
                completeMethod={searchCurrency}
                value={currencyAutoComplete}
                onChange={(e) => onCurrencyChange(e)}
              />
              {currencyerrorMessage !== null &&
              currencyerrorMessage.length > 0 ? (
                <span className="login-error-msg">{currencyerrorMessage}</span>
              ) : null}
            </div>
            <div className="col-md-6 form-group ">
              <span className="input-label">
              Tier Min Amount <span className="color-red">*</span>
              </span>
              <input
                className="form-control "
                type="text"
                name="Min"
                onKeyDown={(evt) => {
                  if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                    evt.preventDefault();
                  }
                }}
                placeholder="Enter min"
                value={InstarailsFeesModel.min}
                onChange={(e) =>
                  setInstarailsFeesModel({
                    ...InstarailsFeesModel,
                    min: e.target.value,
                  })
                }
              />
              {minerrorMessage !== null && minerrorMessage.length > 10 ? (
                <span className="login-error-msg">{minerrorMessage}</span>
              ) : null}
            </div>
            <div className="col-md-6 form-group ">
              <span className="input-label">
              Tier Max Amount <span className="color-red">*</span>
              </span>
              <input
                className="form-control "
                type="text"
                name="max"
                onKeyDown={(evt) => {
                  if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                    evt.preventDefault();
                  }
                }}
                placeholder="Enter max"
                value={InstarailsFeesModel.max}
                onChange={(e) =>
                  setInstarailsFeesModel({
                    ...InstarailsFeesModel,
                    max: e.target.value,
                  })
                }
              />
              {maxerrorMessage !== null && maxerrorMessage.length > 0 ? (
                <span className="login-error-msg">{maxerrorMessage}</span>
              ) : null}
            </div>
            <div className="col-md-6 form-group ">
              <span className="input-label">
                Instarails fixed fee <span className="color-red">*</span>
              </span>
              <input
                className="form-control "
                type="text"
                onKeyDown={(evt) => {
                  if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                    evt.preventDefault();
                  }
                }}
                name="fixed fee"
                placeholder="Enter instarails fixed fee"
                value={InstarailsFeesModel.instarailsFixedCommission}
                onChange={(e) =>
                  setInstarailsFeesModel({
                    ...InstarailsFeesModel,
                    instarailsFixedCommission: e.target.value,
                  })
                }
              />
              {fixedcommisionerrorMessage !== null &&
              fixedcommisionerrorMessage.length > 0 ? (
                <span className="login-error-msg">
                  {fixedcommisionerrorMessage}
                </span>
              ) : null}
            </div>
            <div className="col-md-6 form-group ">
              <span className="input-label">
                Instarails variable fee
                <span className="color-red">*</span>
              </span>
              <div className=" percent-wrapper ">
                <input
                  className="form-control "
                  type="text"
                  onKeyDown={(evt) => {
                    if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                      evt.preventDefault();
                    }
                  }}
                  placeholder="Enter instarails variable fee"
                  name="variable fee"
                  value={InstarailsFeesModel.instarailsVariableCommission}
                  onChange={(e) =>
                    setInstarailsFeesModel({
                      ...InstarailsFeesModel,
                      instarailsVariableCommission: e.target.value,
                    })
                  }
                />
                <span className="feespercent-variable">%</span>
                {variablecommisionerrorMessage !== null &&
                variablecommisionerrorMessage.length > 0 ? (
                  <span className="login-error-msg">
                    {variablecommisionerrorMessage}
                  </span>
                ) : null}
              </div>
            </div>
            <div>
              <div className="payment-btn-dialog">
                {errorMessage !== null && errorMessage.length > 0 ? (
                  <span className="login-error-msg instafees">
                    {errorMessage}
                  </span>
                ) : null}

                <button
                  type="button"
                  onClick={onCancleClick}
                  className="btn btn-cancel second-btn"
                >
                  Cancel
                </button>
                <Button
                  iconPos="left"
                  className="btn btn-continue second-btn"
                  label={"Save"}
                  loading={buttonLoading}
                  onClick={
                    InstarailsFeesModel.id === 0 ? onAddClick : onUpdateClick
                  }
                />
              </div>
            </div>
          </div>
         
        </div>
      
      
        
      
      </Dialog>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
     

      </Scrollbars>
      {displaydeletepopup ? (
        <div className="popup-body">
          <div className="register-popup Payment-screen">
            <div className="text-center ">
              <div className="awesome-text">
                <h4>
                  <i className="pi pi-info-circle"></i> Are you sure you want to
                  Delete?
                </h4>
              </div>
            </div>
            <div className="payment-screen-btn">
              <button className="btn btn-cancel second-btn " onClick={reject}>
                {" "}
                No
              </button>
              <button
                className="btn btn-continue second-btn yes-btn-popup"
                onClick={onDeleteClick}
              >
                {" "}
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}


     
      
    </>
  );
};

export default InstarailsFees;
