import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../assets/images/icon/close-icon.png";
import { Logout } from "../../utils/AccountUtils";
import { PartnerListService } from "../../services/Partner/Partnerlist/PartnerDetailList";
import "react-phone-number-input/style.css";
import React from "react";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import moment from "moment";
import Scrollbars from "react-custom-scrollbars-2";

const Approve: React.FC<any> = ({ onSaveAndContinueClick }) => {
  const { partnerid } = useParams();
  const [displayBasic, setDisplayBasic] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [filteredtypelist, setFilteredTypeList] = React.useState<any[]>([]);
  const [currentStatus, setcurrentStatus] = React.useState(0);
  const [onboardingStatusMessage, setonboardingStatusMessage] =
    React.useState("");
  const [typeAutoComplete, setTypeAutoComplete] = useState("");
  const [commenterrorMessage, setCommentErrorMessage] = React.useState("");
  const [comment, setComment] = useState("");
  const toast = useRef<Toast>(null);
  const [showrrormessage, setShowErrorMessage] = useState(false);

  // const onboardStatus = sessionStorage.getItem("onboardStatus");
  // if (onboardStatus !== null) {
  //   setcurrentStatus(parseInt(onboardStatus));
  // }
  // const onboardingStatus = sessionStorage.getItem("onboardingStatus");
  // if (onboardingStatus !== null) {
  //   setcurrentStatus(parseInt(onboardingStatus));
  // }

  const [statusModel, setStatusModel] = React.useState({
    partnerId: partnerid,
    onboardingStatus: 0,
    comment: "",
    updatedBy: 0,
    stepFlag: 0,
  });

  const [statusHistoryModel, setStatusHistoryModel] = React.useState([
    {
      id: 0,
      date: "",
      comment: "",
      status: 0,
      complianceUserID: "",
      createdBy: "",
    },
  ]);

  const [statustypelist, setstatusTypeList] = React.useState([
    { id: 2, name: "Pending approval", description: null },
    { id: 4, name: "Approve", description: null },
    { id: 5, name: "Reject", description: null },
    { id: 3, name: "Information Needed", description: null },
    { id: 8, name: "Ready", description: null },
    { id: 9, name: "Blocked", description: null },
  ]);

  const [currentstatulist, setcurrentstatusList] = React.useState([
    { id: 2, name: "Pending approval", description: null },
    { id: 4, name: "Approved", description: null },
    { id: 5, name: "Rejected", description: null },
    { id: 1, name: "Incomplete", description: null },
    { id: 3, name: "Information Needed", description: null },
    { id: 6, name: "ApprovedUserInProgress", description: null },
    { id: 7, name: "ApprovedUserComplete", description: null },
    { id: 8, name: "Ready", description: null },
    { id: 9, name: "Blocked", description: null },
  ]);

  useEffect(() => {
    // Update the document title using the browser API
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }
    getOnBoardingStatus(partnerid);
  }, []);

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null || value === 0) {
      return true;
    }
    return false;
  };

  const ErrorMessageEmptyModel = () => {
    setonboardingStatusMessage("");
    setCommentErrorMessage("");
  };

  const handleClose = () => {
    ErrorMessageEmptyModel();
    setModelEmpty();
    onHideClick();
  };

  const setModelEmpty = () => {
    setStatusModel({
      partnerId: partnerid,
      onboardingStatus: 0,
      comment: "",
      updatedBy: 0,
      stepFlag: 0,
    });
    setTypeAutoComplete("");
  };

  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();

    if (CheckNull(values.onboardingStatus)) {
      formIsValid = false;
      setonboardingStatusMessage("Please select status.");
    }
    if (CheckNull(values.comment)) {
      formIsValid = false;
      setCommentErrorMessage("Please enter comment.");
    }
    if (!CheckNull(values.comment)) {
      if (values.comment.trim().length === 0) {
        setCommentErrorMessage("Please enter comment.");
        formIsValid = false;
      }
    }

    return formIsValid;
  };

  const getOnBoardingStatus = (partnerid: any) => {
    setLoading(true);
    PartnerListService.GetOnBoardingStatus(partnerid)
      .then((data: any) => {
        setStatusModel({
          ...statusModel,
          onboardingStatus: data.data.onboardingStatus,
          comment: data.data.comment,
        });
        setStatusHistoryModel(data.data.history);
        setcurrentStatus(data.data.onboardingStatus);

        setLoading(false);
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
        } else {
          toast.current?.show({
            severity: "error",
            summary:
              "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setButtonLoading(false);
        setLoading(false);
      });
  };

  const showHideDialog = () => {
    setDisplayBasic(true);
    setModelEmpty();
    ErrorMessageEmptyModel();
  };

  const onAddClick = () => {
    ErrorMessageEmptyModel();
    setButtonLoading(true);
    if (isValidate(statusModel)) {
      PartnerListService.UpdateOnboardingStatus(statusModel)
        .then((data) => {
          setModelEmpty();
          getOnBoardingStatus(partnerid);
          setButtonLoading(false);
          setDisplayBasic(false);
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
              summary: "This opration is not valid for this partner",
              life: 3000,
            });
            showErrorMessage();
          } else {
            toast.current?.show({
              severity: "error",
              summary:
                "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const showErrorMessage = () => {
    setShowErrorMessage(true);
  };

  const cancelPopup = () => {
    setShowErrorMessage(false);
    setDisplayBasic(false);
  };

  const onHideClick = () => {
    setDisplayBasic(false);
  };

  const searchType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < statustypelist.length; i++) {
      let item = statustypelist[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredTypeList(_filteredItems);
  };

  const onTypeChange = (e: any) => {
    if (e.value !== null) {
      setTypeAutoComplete(e.value);
      if (e.value != null) {
        setStatusModel((statusModel) => ({
          ...statusModel,
          onboardingStatus: e.value.id,
        }));
      }
    }
  };

  const actionBodyTemplate = (rowData: any) => {
    return (
      <>
        {currentstatulist.filter((x) => x.id === rowData.status)[0] !==
        undefined
          ? currentstatulist.filter((x) => x.id === rowData.status)[0].name
          : "Pending approval"}{" "}
      </>
    );
  };

  const formatDateField = (rowData: any) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.date).format("MM/DD/YY H:mm:ss")} </span>
      </React.Fragment>
    );
  };
  const formatComment = (rowData: any) => {
    return (
      <React.Fragment>
        <div dangerouslySetInnerHTML={{ __html: rowData.comment }} />
      </React.Fragment>
    );
  };

  return (
    <Scrollbars
      className="creatpayment-scroll"
      autoHide
      autoHideTimeout={1000}
      autoHideDuration={200}
      autoHeight
      autoHeightMin={100}
      autoHeightMax={400}
      thumbMinSize={30}
      universal={true}
    >
      {" "}
      <>
        <>
          <div className="user-heading heading-section">
            <Button
              iconPos="left"
              label="Manage Approval"
              className="btn btn-continue send-btn"
              onClick={showHideDialog}
            />
            <Button
              iconPos="left"
              icon="pi pi-refresh"
              label="Refresh"
              className="btn btn-continue"
              onClick={() => getOnBoardingStatus(partnerid)}
            />
          </div>
        </>
        {loading ? (
          <div className="spinner-class">
            <ProgressSpinner />
          </div>
        ) : (
          <div>
            <div className="container-fluid wrapper adm-insta-fees-table acc-screen info-section">
              <div className="user-tab ">
                {/* <Toast ref={toast}></Toast> */}

                <div className="datatable-doc-demo approvetable">
                  <div className="">
                    <DataTable
                      value={statusHistoryModel}
                      paginator
                      className="p-datatable-customers"
                      rows={10}
                      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                      rowsPerPageOptions={[10, 25, 50]}
                      dataKey="id"
                      rowHover
                      filterDisplay="menu"
                      responsiveLayout="scroll"
                      scrollable
                      globalFilterFields={[
                        "name",
                        "country.name",
                        "representative.name",
                        "balance",
                        "status",
                      ]}
                      emptyMessage="Please click above button for manage approval."
                      currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                    >
                      <Column
                        field="date"
                        header="Date Time"
                        body={formatDateField}
                        style={{ width: "25%" }}
                      />

                      <Column
                        field="Status"
                        header="Status"
                        body={actionBodyTemplate}
                        style={{ width: "25%" }}
                      />
                      <Column
                        field="comment"
                        header="Comment"
                        body={formatComment}
                        style={{ width: "25%" }}
                      />
                      <Column
                        field="complianceUserID"
                        header="Created By"
                        style={{ width: "25%" }}
                      />
                    </DataTable>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <Dialog
          visible={displayBasic}
          onHide={() => onHideClick()}
          className="acc-screen contact-info user-dialog  user-add-popup "
        >
          {loading ? (
            <div className="spinner-class">
              <ProgressSpinner />
            </div>
          ) : (
            <div className="">
              <button className="close-btn" onClick={onHideClick}>
                <img src={CloseIcon} />
              </button>
              <div className="popup-inner-content">
                <div className="form-group ">
                  <span className="input-label">
                    Status (Current Status:{" "}
                    <b>
                      {" "}
                      {currentstatulist.filter(
                        (x) => x.id === currentStatus
                      )[0] !== undefined
                        ? currentstatulist.filter(
                            (x) => x.id === currentStatus
                          )[0].name
                        : "Pending approval"}
                      )
                    </b>
                    <span className="color-red">*</span>
                  </span>
                  <AutoComplete
                    field="name"
                    dropdown
                    forceSelection
                    className="dropdown-acc"
                    placeholder="Select status"
                    suggestions={filteredtypelist}
                    completeMethod={searchType}
                    onChange={(e) => onTypeChange(e)}
                    value={typeAutoComplete}
                  />
                  {onboardingStatusMessage !== null &&
                  onboardingStatusMessage.length > 0 ? (
                    <span className="login-error-msg">
                      {onboardingStatusMessage}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="popup-inner-content2">
                <div className="form-group ">
                  <span className="input-label">
                    Comment <span className="color-red">*</span>
                  </span>

                  <Editor
                    placeholder="Please enter comment "
                    style={{ height: "200px" }}
                    value={comment}
                    type="text"
                    onTextChange={(e) =>
                      setStatusModel((statusModel) => ({
                        ...statusModel,
                        ...{
                          comment: e.htmlValue,
                        },
                      }))
                    }
                  />

                  {commenterrorMessage !== null &&
                  commenterrorMessage.length > 0 ? (
                    <span className="login-error-msg ">
                      {commenterrorMessage}
                    </span>
                  ) : null}
                </div>
                <div className="payment-btn-dialog">
                  <button
                    type="button"
                    className="btn btn-back second-btn"
                    onClick={handleClose}
                  >
                    Cancel
                  </button>
                  <Button
                    iconPos="left"
                    label={"Save"}
                    className="btn btn-continue second-btn save-btn"
                    loading={buttonLoading}
                    onClick={onAddClick}
                  />
                </div>
              </div>
            </div>
          )}
          {showrrormessage ? (
            <div className="popup-body">
              <div className="register-popup  manage-approve-popup">
                <div className="popup-text">
                  <p>
                    <i className="pi pi-info-circle"></i> This operation is not
                    valid for this partner
                  </p>
                  <div className="popup-btn">
                    <button
                      type="button"
                      onClick={cancelPopup}
                      className="btn btn-continue second-btn"
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </Dialog>

        <br></br>
        <br></br>
      </>
    </Scrollbars>
  );
};

export default Approve;
