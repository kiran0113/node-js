
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { FacilitatorService } from "../../../services/Partner/Facilitator/FacilitatorService";
import { Logout } from "../../../utils/AccountUtils";
import { ProgressSpinner } from "primereact/progressspinner";
import { validEmail } from "../../../utils/utils";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";

const AddFacilitator: React.FC = () => {
    const { partnerid } = useParams();
    const [facilitatorList, setFacilitatorList] = React.useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [firstNameErrorMessage, setFirstNameErrorMessage] = React.useState("");
    const [lastNameErrorMessage, setLastNameErrorMessage] = React.useState("");
    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [legalNameErrorMessage, setLegalNameErrorMessage] = React.useState("");
    const [facilatorpartnerpopup, setfacilatorpartnerpopup] = useState(false);
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);
    const [displayBasic, setDisplayBasic] = useState(false);


    useEffect(() => {
        const useroobj = sessionStorage.getItem("User");
        if (useroobj === null || useroobj === undefined) {
            navigate("/");
        }
        getAllPartners(partnerid);
    }, []);

    const getAllPartners = (val: any) => {
        setLoading(true);
        FacilitatorService.getFacilitatorPartners(val)
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

    const [FacilitatorPartnerModel, setFacilitatorPartnerModel] = React.useState({
        firstName: "",
        lastName: "",
        facilitatorId: Number(partnerid),
        email: "",
        legalName: "",
        setPasswordToken: ""
    });


    const [FacilitatorPartnerResponseModel, setFacilitatorPartnerResposeModel] = React.useState({
        PartnerId: 0,
        UserId: 0,
        BasicDetailId: 0
    });


    const setModelEmpty = () => {
        setFacilitatorPartnerModel({
            firstName: "",
            lastName: "",
            facilitatorId: Number(partnerid),
            email: "",
            legalName: "",
            setPasswordToken: ""
        });
    };


    const ShowHideDialog = () => {
        ErrorMessageEmptyModel();
        setModelEmpty();
        setDisplayBasic(true);
    };
    const onHideClick = () => {
        setModelEmpty();
        setDisplayBasic(false);
    };

    const ErrorMessageEmptyModel = () => {
        setFirstNameErrorMessage("");
        setLastNameErrorMessage("");
        setEmailErrorMessage("");
        setLegalNameErrorMessage("");
    };

    const CheckNull = (value: any) => {
        if (value === "" || value === undefined || value === null) {
            return true;
        }
        return false;
    };

    const isValidate = (values: any) => {
        let formIsValid = true;
        ErrorMessageEmptyModel();
        if (CheckNull(values.firstName)) {
            setFirstNameErrorMessage("Please enter first name.");
            formIsValid = false;
        }
        if (CheckNull(values.lastName)) {
            setLastNameErrorMessage("Please enter last name.");
            formIsValid = false;
        }
        if (!validEmail.test(values.email)) {
            setEmailErrorMessage("Please enter valid email.");
            formIsValid = false;
        }
        if (CheckNull(values.email)) {
            setEmailErrorMessage("Please enter email.");
            formIsValid = false;
        }
        if (CheckNull(values.legalName)) {
            setLegalNameErrorMessage("Please enter legal name.");
            return false;
        }
        if (!CheckNull(values.legalName)) {
            if (values.legalName.trim().length === 0) {
                setLegalNameErrorMessage("Please enter legal name.");
                formIsValid = false;
            }
            if (values.legalName.length > 100) {
                setLegalNameErrorMessage("Please enter valid legal name.");
                formIsValid = false;
            }
        }



        return formIsValid;
    };

    const onAddOPartnerClick = () => {
        ErrorMessageEmptyModel();
        FacilitatorPartnerModel.facilitatorId = Number(partnerid);
        setButtonLoading(true);
        if (isValidate(FacilitatorPartnerModel)) {
            FacilitatorService.addFacilitatorPartner(FacilitatorPartnerModel)
                .then((data: any) => {
                    setModelEmpty();
                    setButtonLoading(false);
                    setFacilitatorPartnerResposeModel(data);
                    setfacilatorpartnerpopup(false);
                    onHideClick();
                    getAllPartners(partnerid);
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
                    } else if (error.response.status === 409) {
                        setEmailErrorMessage("Business email already exist.")
                    } else if (error.response.status === 410) {
                        setLegalNameErrorMessage("Legal name already exist.")
                    }
                    else {
                        toast.current?.show({
                            severity: "error",
                            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
                            life: 3000,
                        });
                    }
                    setButtonLoading(false);
                });
        }
        
        else {
            setButtonLoading(false);
        }
    };


    const onCancleClick = () => {

        setModelEmpty()
        ErrorMessageEmptyModel();

        setDisplayBasic(false);
    };
    const formatDateField = (rowData: any) => {
        return (
            <React.Fragment>
                <span>{moment(rowData.createdDate).format("MM/DD/YYYY H:mm.ss")} </span>
            </React.Fragment>
        );
    };
    return (
        <>
            {" "}
            <div className="AddFacilitator-div">
                <Toast ref={toast}></Toast>
                <ConfirmDialog id="confirm-popup" />
                <div className="row facilitator-tabs">
                    <div className="col-md-6 text-header-purple "></div>
                    <div className="col-md-6">
                        <div className="button-section addfeesbtn">
                            <Button
                                iconPos="left"
                                label="Add Partner"
                                icon="pi pi-plus"
                                className="btn btn-continue"
                                onClick={ShowHideDialog}
                            />
                        </div>
                    </div>
                </div>

                <div className="facilitator-main">
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
                        <div className="datatable-doc-demo Add-partner-table">
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
                                    emptyMessage="No Partners found."
                                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                                >
                                    <Column field="legalName" header="Partner" sortable style={{ width: "15%" }} />

                                    <Column field="userName" header="Email" sortable style={{ width: "15%" }} />
                                    <Column field="createdDate" body={formatDateField} header="Invited Date" sortable style={{ width: "15%" }} />

                                    <Column field="createdBy" header="Invited By" sortable style={{ width: "15%" }}/>
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
                visible={displayBasic}
                onHide={() => onHideClick()}
                className="user-dialog"
            >
                <div className="popup-inner-content">
                    <button className="close-btn" onClick={onHideClick}>
                        <img src={CloseIcon} />
                    </button>

                    <div className="row user-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <span>
                                    First Name <span className="color-red">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="form-control"
                                    value={FacilitatorPartnerModel.firstName}
                                    onChange={(e) =>
                                        setFacilitatorPartnerModel({
                                            ...FacilitatorPartnerModel,
                                            firstName: e.target.value,
                                        })}
                                    placeholder="Enter first name"
                                />
                                {firstNameErrorMessage !== null &&
                                    firstNameErrorMessage.length > 0 ? (
                                    <span className="login-error-msg ">{firstNameErrorMessage}</span>
                                ) : null}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <span>
                                    Last Name <span className="color-red">*</span>
                                </span>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={FacilitatorPartnerModel.lastName}
                                    onChange={(e) =>
                                        setFacilitatorPartnerModel({
                                            ...FacilitatorPartnerModel,
                                            lastName: e.target.value,
                                        })}
                                    placeholder="Enter last name"
                                />
                                {lastNameErrorMessage !== null &&
                                    lastNameErrorMessage.length > 0 ? (
                                    <span className="login-error-msg ">{lastNameErrorMessage}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="row user-row last-row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <span>
                                    Business Email <span className="color-red">*</span>
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={FacilitatorPartnerModel.email}
                                    
                                    onChange={(e) =>{
                                        const re = /^[A-Za-z0-9.,?@()+\s\(\)-]+$/;

                                        if (e.target.value === '' || re.test(e.target.value)) {
                                        setFacilitatorPartnerModel({
                                            ...FacilitatorPartnerModel,
                                            email: e.target.value,
                                        })
                                    }
                                   }}


                                    placeholder="Enter business email"
                                />
                                {emailErrorMessage !== null &&
                                    emailErrorMessage.length > 0 ? (
                                    <span className="login-error-msg ">{emailErrorMessage}</span>
                                ) : null}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <span>
                                    Legal Name <span className="color-red">*</span>
                                </span>
                                <input
                                    type="legalName"
                                    className="form-control"
                                    value={FacilitatorPartnerModel.legalName}
                                    onChange={(e) =>
                                        setFacilitatorPartnerModel({
                                            ...FacilitatorPartnerModel,
                                            legalName: e.target.value,
                                        })}
                                    placeholder="Enter legal name"
                                />
                                {legalNameErrorMessage !== null &&
                                    legalNameErrorMessage.length > 0 ? (
                                    <span className="login-error-msg">{legalNameErrorMessage}</span>
                                ) : null}
                            </div>
                        </div>
                    </div>

                    <div className="payment-btn-dialog">
                        <button
                            type="button"
                            onClick={onCancleClick}
                            className="btn btn-cancel second-btn"
                        >
                            Cancel
                        </button>
                        <Button
                            iconPos="left"
                            label={"Save"}
                            className="btn btn-continue second-btn"
                            loading={buttonLoading}
                            onClick={onAddOPartnerClick}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddFacilitator;
