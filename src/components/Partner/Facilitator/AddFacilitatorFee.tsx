import { Button } from "primereact/button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { FacilitatorService } from "../../../services/Partner/Facilitator/FacilitatorService";
import { CommonService } from "../../../services/Common/CommonService";
import { Logout } from "../../../utils/AccountUtils";
import { currenciesList } from "../../../utils/utils";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { PartnerTypeList ,PartnerTypeList1,PartnerTypeList2} from "../../../utils/utils";
import Scrollbars from "react-custom-scrollbars-2";

const AddFacilitatorFee: React.FC = () => {
    const { partnerid } = useParams();
    const [facilitatorList, setFacilitatorList] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [facilatorfeepopup, setfacilatorfeepopup] = useState(false);
    const [deletepopup, setDeletepopup] = useState(false);
    const [typeerrorMessage, settypeErrorMessage] = React.useState("");
    const [typeAutoComplete, setTypeAutoComplete] = useState("");
    const [fixedcommisionerrorMessage, setfixedcommisionErrorMessage] =
        React.useState("");
    const [variablecommisionerrorMessage, setvariablecommissionErrorMessage] =
        React.useState("");
    const [currencyerrorMessage, setcurrencyErrorMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [filteredcurrencylist, setFilteredCurrencyList] = React.useState<any[]>(
        []
    );
    const [readOnly, setReadOnly] = React.useState(false);
    const [filteredtypelist, setFilteredTypeList] = React.useState<any[]>([]);
    const [typeList, setTypeList] = React.useState([]);
    const [currencyAutoComplete, setCurrencyAutoComplete] = useState("");
    const [deletedata, setDeleteData] = useState(null);
    const [displaydeletepopup, setDisplayDeletePopup] = useState(false);

    const [FacilitatorFeeModel, setFacilitatorFeeModel] = React.useState({
        id: 0,
        type: "",
        partnerId: Number(partnerid),
        facilitatorFixedCommission: "",
        facilitatorVariableCommission: "",
        facilitatorCommissionCurrency: "",
    });
    const setModelEmpty = () => {
        setFacilitatorFeeModel({
            id: 0,
            type: "",
            partnerId: Number(partnerid),
            facilitatorFixedCommission: "",
            facilitatorVariableCommission: "",
            facilitatorCommissionCurrency: "",
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
    const ErrorMessageEmptyModel = () => {
        settypeErrorMessage("");
        setfixedcommisionErrorMessage("");
        setvariablecommissionErrorMessage("");
        setcurrencyErrorMessage("");
        setErrorMessage("");
    };

    const isValidate = (values: any) => {
        let formIsValid = true;
        ErrorMessageEmptyModel();
        if (CheckNull(values.type)) {
            settypeErrorMessage("Please select type.");
            formIsValid = false;
        }
        if (CheckNull(values.facilitatorFixedCommission)) {
            setfixedcommisionErrorMessage("Please enter fixed fee.");
            formIsValid = false;
        }
        if (!CheckNull(values.facilitatorFixedCommission)) {
            if (values.facilitatorFixedCommission < 0) {
                setfixedcommisionErrorMessage('Fixed fee can not be negative.');
                formIsValid = false;
            }
            if (!(values.facilitatorFixedCommission < 0)) {
                if (!(values.facilitatorFixedCommission.toString().match(/^\d{1,16}(\.\d{0,2})?$/))) {
                    setfixedcommisionErrorMessage('Fixed fee valid only upto length(16,2)');
                    formIsValid = false;
                }
            }
        }
        if (CheckNull(values.facilitatorVariableCommission)) {
            setvariablecommissionErrorMessage("Please enter variable fee.");
            formIsValid = false;
        }
        if (!CheckNull(values.facilitatorVariableCommission)) {
            if (values.facilitatorVariableCommission < 0) {
                setvariablecommissionErrorMessage('Variable fee can not be negative.');
                formIsValid = false;
            }
            if (!(values.facilitatorVariableCommission < 0)) {
                if (!(values.facilitatorVariableCommission.toString().match(/^\d{1,16}(\.\d{0,2})?$/))) {
                    setvariablecommissionErrorMessage('Variable fee valid only upto length(16,2)');
                    formIsValid = false;
                }
            }
        }
        if (CheckNull(values.facilitatorCommissionCurrency)) {
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
        getFacilitatorByPartnerId(partnerid);
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

    const getFacilitatorByPartnerId = (val: any) => {
        setLoading(true);
        FacilitatorService.getFacilitatorFeeByPartnerId(val)
            .then((data: any) => {
                setFacilitatorList(data.data);
                setLoading(false);
            })
            .catch((error: any) => {
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
                setFacilitatorList([]);
                setLoading(false);
            });
    };

    const ShowHideDialogfee = () => {
        setfacilatorfeepopup(true);
    };
    const onHideClickfee = () => {
        setfacilatorfeepopup(false);
        setReadOnly(false);
    };
    const onAddClick = () => {
        ErrorMessageEmptyModel();
        FacilitatorFeeModel.partnerId = Number(partnerid);
        setButtonLoading(true);
        if (isValidate(FacilitatorFeeModel)) {
            if(FacilitatorFeeModel && Number(FacilitatorFeeModel.type) === 1){
                FacilitatorService.addFacilitatorFee(FacilitatorFeeModel)
                .then((data: any) => {
                    setModelEmpty();
                    setButtonLoading(false);
                    getFacilitatorByPartnerId(FacilitatorFeeModel.partnerId);
                    setfacilatorfeepopup(false);
                })
                // ***************************************************************
                const item = FacilitatorFeeModel 
                const modifiedFinalData =  ({...item,type: 2})
                FacilitatorService.addFacilitatorFee(modifiedFinalData)
                .then((data: any) => {
                    setModelEmpty();
                    setButtonLoading(false);
                    getFacilitatorByPartnerId(FacilitatorFeeModel.partnerId);
                    setfacilatorfeepopup(false);
                })
                // *****************************************************************
                .catch((error: any) => {
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
            }else{
                FacilitatorService.addFacilitatorFee(FacilitatorFeeModel)
                .then((data: any) => {
                    setModelEmpty();
                    setButtonLoading(false);
                    getFacilitatorByPartnerId(FacilitatorFeeModel.partnerId);
                    setfacilatorfeepopup(false);
                }).catch((error: any) => {
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
            }

           
        } else {
            setButtonLoading(false);
        }
    };
    const onUpdateClick = () => {
        ErrorMessageEmptyModel();
        setButtonLoading(true);
        if (isValidate(FacilitatorFeeModel)) {
            FacilitatorService.updateFacilitatorFee(FacilitatorFeeModel)
                .then((data: any) => {
                    setModelEmpty();
                    setButtonLoading(false);
                    getFacilitatorByPartnerId(FacilitatorFeeModel.partnerId);
                    setfacilatorfeepopup(false);
                    setReadOnly(false);
                })

                .catch((error: any) => {
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

    const deleteFacilitator = (id: any) => {
        setLoading(true);
        FacilitatorService.deleteFacilitatorFee(id)
            .then((data: any) => {
                setLoading(false);
                setDeleteData(null);

                getFacilitatorByPartnerId(partnerid);
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

    const onDeleteClick = () => {
        deleteFacilitator(deletedata.id);
        setDisplayDeletePopup(false)
    }

    const onCancleClick = () => {
        FacilitatorFeeModel.id === 0
            ? setModelEmpty()
            : getFacilitatorByPartnerId(Number(partnerid));
        setfacilatorfeepopup(false);
        setReadOnly(false);
        ErrorMessageEmptyModel();
    };
    const searchCurrency = (event: any) => {
        let query = event.query;
        let _filteredItems: any = [];
        for (let i = 0; i < currenciesList.length; i++) {
            let item = currenciesList[i];
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
            setFacilitatorFeeModel({
                ...FacilitatorFeeModel,
                type: e.value.id,
            });
        }
    };

    const [openDialog, handleDisplay] = React.useState(false);

   const handleClose = () => {
      handleDisplay(false);
   };

   const openDialogBox = () => {
      handleDisplay(true);
   };
   const buttonStyle = {
      width: "10rem",
      fontsize: "1.5rem",
      height: "2rem",
      padding: "5px",
      borderRadius: "10px",
      backgroundColor: "green",
      color: "White",
      border: "2px solid yellow",
   };
   const divStyle = {
      display: "flex",
      felxDirection: "row",
      position: "absolute",
      right: "0px",
      bottom: "0px",
      // padding: "1rem",
   };
   const confirmButtonStyle = {
      width: "5rem",
      height: "1.5rem",
      fontsize: "1rem",
      backgroundColor: "grey",
      color: "black",
      margin: "5px",
      borderRadius: "10px",
      border: "1px solid black",
   };

    const variablefeeactionBodyTemplate = (rowData: any) => {
        return (
            <>
                {rowData.facilitatorVariableCommission} {"%"}
            </>
        )
    }
    const actionBodyTemplate = (rowData: any) => {
        return (
            <>
                < Button
                    icon="pi pi-pencil"
                    className="editbtn"
                    onClick={() => EditFacilitatorFee(rowData)}
                    title="Edit"
                />
                <Button
                    icon="pi pi-trash"
                    className="editbtn"
                    onClick={() => onDeleteHandleClick(rowData)}
                    title="Delete"

                    // style = {buttonStyle} 
                />


            </>
        );
    };
    const onDeleteHandleClick = (rowData: any) => {
        setDeleteData(rowData);
        setDisplayDeletePopup(true);
    };
    const reject = () => {
        ErrorMessageEmptyModel();
        setDisplayDeletePopup(false);
    };


    
    const onFeeAddClick = () => {
        setModelEmpty();
        ErrorMessageEmptyModel();
        ShowHideDialogfee();
    };
    const EditFacilitatorFee = (val: any) => {
        setReadOnly(true);
        setfacilatorfeepopup(true);
        setFacilitatorFeeModel(val);
        const type = PartnerTypeList2.filter((data) => data.id === val.type)[0].name ;
        setTypeAutoComplete(type);
        setCurrencyAutoComplete(val.facilitatorCommissionCurrency);
        ErrorMessageEmptyModel();
    };
    const onCurrencyChange = (e: any) => {
        if (e.value !== null) {
            setCurrencyAutoComplete(e.value);
            setFacilitatorFeeModel({
                ...FacilitatorFeeModel,
                facilitatorCommissionCurrency: e.value.Name,
            })
        }
    };
    const TypeActionBodyTemplate = (rowData: any) => {
        const typename = PartnerTypeList1
            .filter((data) => data.id === rowData.type)
            .map((x) => x.name);
        return (
            <>
                {typename}
            </>
        )

    }
    return (
        <>
            {" "}
            <div className="F-Fee-main">
                <Toast ref={toast}></Toast>
                <ConfirmDialog id="confirm-popup" />
                <div className="row facilitator-tabs">
                    <div className="col-md-6 text-header-purple "></div>
                    <div className="col-md-6">
                        <div className="button-section addfeesbtn">
                            <Button
                                iconPos="left"
                                label="Add Fees"
                                icon="pi pi-plus"
                                className="btn btn-continue"
                                onClick={onFeeAddClick}
                            />
                        </div>
                    </div>
                </div>

                <div className="facilitator-main facilitator-fee">
                    {loading ? (
                        <div className="spinner-class">
                            <ProgressSpinner />
                        </div>
                    ) : (
                      
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
                        <div className="datatable-doc-demo">
                            <div className="">
                                <DataTable
                                    value={facilitatorList}
                                    paginator
                                    className="p-datatable-customers"
                                    rows={10}
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
                                    emptyMessage="No facilitator fees found."
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                >
                                    <Column header="Type" sortable body={TypeActionBodyTemplate}

                                   style={{ width: "15%" }}

                                    />
                                    <Column
                                        field="facilitatorCommissionCurrency"
                                        header="Currency"
                                        sortable   style={{ width: "15%" }}
                                    />
                                    <Column
                                        field="facilitatorFixedCommission"
                                        header="Fixed Fee"
                                        sortable   style={{ width: "15%" }}
                                    />
                                    <Column
                                        body={variablefeeactionBodyTemplate}
                                        header="Variable Fee"
                                        sortable   style={{ width: "15%" }}
                                    />
                                    <Column header="Action" body={actionBodyTemplate} />
                                </DataTable>
                            </div>
                        </div>
                        <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/> <br/>
                        </Scrollbars>
                    )}
                </div>
            </div>{" "}
            <Dialog
                header="Header"
                visible={facilatorfeepopup}
                onHide={() => onHideClickfee()}
                className="user-dialog"
            >
                <div className="popup-inner-content">
                    <button className="close-btn" onClick={onHideClickfee}>
                        <img src={CloseIcon} />
                    </button>
                    <div className="row user-row">
                        <div className="col-md-6 form-group ">
                            <span className="input-label">
                                Type <span className="color-red">*</span>
                            </span>
                            <AutoComplete
                                readOnly={readOnly}
                                disabled={readOnly}
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
                                <span className="login-error-msg ">{typeerrorMessage}</span>
                            ) : null}
                        </div>
                        <div className="col-md-6 form-group ">
                            <span className="input-label">
                                Currency <span className="color-red">*</span>
                            </span>
                            <AutoComplete
                                readOnly={readOnly}
                                disabled={readOnly}
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
                                <span className="login-error-msg ">{currencyerrorMessage}</span>
                            ) : null}
                        </div>
                        <div className="col-md-6 form-group ">
                            <span className="input-label">
                                Facilitator fixed fee <span className="color-red">*</span>
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
                                placeholder="Enter facilitator fixed fee"
                                value={FacilitatorFeeModel.facilitatorFixedCommission}
                                onChange={(e) =>
                                    setFacilitatorFeeModel({
                                        ...FacilitatorFeeModel,
                                        facilitatorFixedCommission: e.target.value,
                                    })
                                }
                            />
                            {fixedcommisionerrorMessage !== null &&
                                fixedcommisionerrorMessage.length > 0 ? (
                                <span className="login-error-msg ">{fixedcommisionerrorMessage}</span>
                            ) : null}
                        </div>
                        <div className="col-md-6 form-group ">
                            <span className="input-label">
                                Facilitator variable fee
                                <span className="color-red">*</span>
                            </span>
                            <div className="fees-tabs">
                                <input
                                    className="form-control "
                                    type="text"
                                    onKeyDown={(evt) => {
                                        if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                                          evt.preventDefault();
                                        }
                                      }}
                                    placeholder="Enter facilitator variable fee"
                                    name="variable fee"
                                    value={FacilitatorFeeModel.facilitatorVariableCommission}
                                    onChange={(e) =>
                                        setFacilitatorFeeModel({
                                            ...FacilitatorFeeModel,
                                            facilitatorVariableCommission: e.target.value,
                                        })
                                    }
                                />
                                <span className="feespercent">%</span>
                                {variablecommisionerrorMessage !== null &&
                                    variablecommisionerrorMessage.length > 0 ? (
                                    <span className="login-error-msg ">
                                        {variablecommisionerrorMessage}
                                    </span>
                                ) : null}
                            </div>

                        </div>
                    </div>
                    <div className="">
                        {errorMessage !== null &&
                            errorMessage.length > 0 ? (
                                <div style={{ display: 'flex', justifyContent: 'center' }}>

                            <span className="login-error-msg " >{errorMessage}</span>
                            </div>
                        ) : null}
                        {/* <br></br> */}
                        <div className="payment-btn-dialog" style={{marginTop:'10px'}}>
                            
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
                                    FacilitatorFeeModel.id === 0 ? onAddClick : onUpdateClick
                                }
                            />
                        </div>
                    </div>
                </div>
            </Dialog>


            {displaydeletepopup ? (
                <div className="popup-body">
                    <div className="register-popup Payment-screen">
                        <div className="text-center ">
                            <div className="awesome-text">
                                <h4><i className="pi pi-info-circle"></i> Are you sure you want to delete?</h4>
                            </div>
                        </div>
                        <div className="payment-screen-btn">
                            <button
                                className="btn btn-cancel second-btn "
                                onClick={reject}
                            >
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

export default AddFacilitatorFee;
