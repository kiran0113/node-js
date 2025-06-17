import { Button } from "primereact/button";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { Dialog } from "primereact/dialog";
import CloseIcon from "../../assets/images/icon/close-icon.png";
import { DataTable, DataTableFilterMeta } from "primereact/datatable";
import { Column } from "primereact/column";
import { AutoComplete } from "primereact/autocomplete";
import { useNavigate, useParams } from "react-router-dom";
import { Toast } from "primereact/toast";
import { FxRateService } from "../../services/Partner/FxRate/FxRateService";
import { Logout } from "../../utils/AccountUtils";
import { currenciesList } from "../../utils/utils";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
import { FilterMatchMode } from "primereact/api";
import Scrollbars from "react-custom-scrollbars-2";

const FxRate: React.FC = () => {
  const { partnerid } = useParams();

  const toast = useRef<Toast>(null);

  const navigate = useNavigate();

  const [filteredcurrencylist, setFilteredCurrencyList] = React.useState<any[]>([]);
  const [filteredcountrieslist, setFilteredCountryList] = useState<any[]>([]);
  const [sendcountryList, setsendcountryList] = useState<any[]>([]);
  const [sendCountryAutoComplete, setSendCountryAutoComplete] = useState("");


  // //console.log(filteredcurrencylist)
  // const sortedSendCurrency = filteredcurrencylist.slice().sort((a, b) => {
  //   //console.log(a.currency, b.currency);
  //   return a.currency.localeCompare(b.currency, undefined, { sensitivity: 'base' });

  // });


  const [filteredrecievecurrencylist, setFilteredRecieveCurrencyList] =
    React.useState<any[]>([]);
  const sortedRecieveCurrencyList = filteredrecievecurrencylist.slice().sort((a, b) => {
    return a.currency.localeCompare(b.currency);
  });

  const [filteredrecievecountrylist, setFilteredRecieveCountryList] =
    React.useState<any[]>([]);
  const sortedRecieveCountryList = filteredrecievecountrylist.slice().sort((a, b) => {
    return a.country.localeCompare(b.country);
  });

  const [, setTypeAutoComplete] = useState("");

  const [sourcecurrencyAutoComplete, setSourceCurrencyAutoComplete] =
    useState("");

  const [targetcurrencyAutoComplete, setTargetCurrencyAutoComplete] = useState("");
  const [targetcountryAutoComplete, setTargetCountryAutoComplete] = useState("");

  const [loading, setLoading] = useState(false);

  const [pageloading, setPageLoading] = useState(true);
  const [deletedata, setDeleteData] = useState(null);
  // const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);
  const [sendcurrencyList, setsendcurrencyList] = useState<any[]>([]);


  const [displayBasic, setDisplayBasic] = useState(false);

  const [fxrateList, setFxRateList] = React.useState([]);

  const [recievecurrenciesList, setRecieveCurrenciesList] = React.useState([]);

  const [fxrateHistoryList, setFxRateHistoryList] = React.useState([]);

  const [buttonLoading, setButtonLoading] = useState(false);

  const [sourceCurrencyMessage, setsourceCurrencyMessage] = React.useState("");
  const [sourceCountryMessage, setsourceCountryMessage] = React.useState("");

  const [sourceAmountMessage, setsourceAmountMessage] = React.useState("");

  const [targetCurrencyMessage, settargetCurrencyMessage] = React.useState("");
  const [targetCountryMessage, settargetCountryMessage] = React.useState("");

  const [targetAmountMessage, settargetAmountMessage] = React.useState("");

  const [, setMessage] = React.useState("");

  const [, setAmountMessage] = React.useState("");

  const [rateMessage, setRateMessage] = React.useState("");

  const [visible, setVisible] = useState(false);

  //fx rate model
  const [FxRateModel, setFxRateModel] = React.useState({
    id: 0,
    partnerId: partnerid,
    sourceCurrency: "",
    sourceCountry: "",
    sourceAmount: "",
    targetCountry: "",
    targetCurrency: "",
    targetAmount: null,
    amount: null,
    rate: "",
    lastUpdatedTime: new Date(),
  });

  //set filter
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    sourceAmount: { value: null, matchMode: FilterMatchMode.EQUALS },
    sourceCurrency: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    sourceCountry: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    targetCurrency: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    targetCountry: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    updatedBy: { value: null, matchMode: FilterMatchMode.STARTS_WITH },


    rate: { value: null, matchMode: FilterMatchMode.EQUALS },
    targetAmount: { value: null, matchMode: FilterMatchMode.EQUALS },
  });

  //set model empty
  const setModelEmpty = () => {
    setFxRateModel({
      id: 0,
      partnerId: partnerid,
      sourceCurrency: "",
      sourceCountry: "",
      sourceAmount: "",
      targetCurrency: "",
      targetCountry: "",
      targetAmount: null,
      amount: null,
      rate: "",
      lastUpdatedTime: new Date(),
    });
    setTypeAutoComplete("");
    setSourceCurrencyAutoComplete("");
    setTargetCurrencyAutoComplete("");
    setTargetCountryAutoComplete("");
    setSendCountryAutoComplete("");
  };

  //check null
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };

  //error message empty
  const ErrorMessageEmptyModel = () => {
    setsourceCurrencyMessage("");
    setsourceCountryMessage("");
    setsourceAmountMessage("");
    settargetCurrencyMessage("");
    settargetCountryMessage("");
    settargetAmountMessage("");
    setAmountMessage("");
    setRateMessage("");
    setMessage("");
  };

  //validation check
  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();
    if (CheckNull(values.sourceCurrency)) {
      setsourceCurrencyMessage("Please select the send currency.");
      formIsValid = false;
    }
    if (CheckNull(values.sourceCountry)) {
      setsourceCountryMessage("Please select the send country.");
      formIsValid = false;
    }
    if (
      !CheckNull(values.sourceCurrency) &&
      !CheckNull(values.targetCurrency)
    ) {
      // if (values.sourceCurrency === values.targetCurrency) {
      //   settargetCurrencyMessage(
      //     "Send and receive currency cannot be the same."
      //   );
      //   formIsValid = false;
      // }
    }
    if (CheckNull(values.sourceAmount)) {
      setsourceAmountMessage("Please enter the send amount.");
      formIsValid = false;
    }
    if (!CheckNull(values.sourceAmount)) {
      if (values.sourceAmount <= 0) {
        setsourceAmountMessage("Sendamount is not zero or negative.");
        formIsValid = false;
      }
      if (!(values.sourceAmount <= 0)) {
        if (!(values.sourceAmount.toString().match(/^\d{1,16}(\.\d{0,2})?$/))) {
          setsourceAmountMessage('Sendamount valid only upto length(16,2)');
          formIsValid = false;
        }
      }

    }
    if (CheckNull(values.targetCurrency)) {
      settargetCurrencyMessage("Please select the receive fixed currency.");
      formIsValid = false;
    }
    if (CheckNull(values.targetCurrency)) {
      settargetCountryMessage("Please select the receive country.");
      formIsValid = false;
    }
    if (CheckNull(values.targetAmount)) {
      settargetAmountMessage("Please enter target amount.");
      formIsValid = false;
    }
    if (!CheckNull(values.targetAmount)) {
      if (values.targetAmount <= 0) {
        settargetAmountMessage("Targetamount is not zero or negative.");
        formIsValid = false;
      }
      if (!(values.targetAmount <= 0)) {
        if (!(values.targetAmount.toString().match(/^\d{1,16}(\.\d{0,6})?$/))) {
          settargetAmountMessage('Targetamount valid only upto length(16,6)');
          formIsValid = false;
        }
      }
    }

    if (CheckNull(values.rate)) {
      setRateMessage("Please enter rate.");
      return false;
    }
    if (!CheckNull(values.rate)) {
      if (values.rate <= 0) {
        setRateMessage("Rate is not zero or negative.");
        formIsValid = false;
      }
      if (!(values.rate <= 0)) {
        if (!(values.rate.toString().match(/^\d{1,16}(\.\d{0,6})?$/))) {
          setRateMessage('Rate valid only upto length(16,6)');
          formIsValid = false;
        }
      }
    }
    return formIsValid;
  };

  //refresh page
  const refreshPage = () => {
    setLoading(true);
    getRecieveCurrencies(partnerid);
    getFxRatePartnerId(partnerid);
    getFxRateHistoryId(partnerid);
  };

  //get fx rate history by id
  const getFxRateHistoryId = (val: any) => {
    setLoading(true);
    FxRateService.getFxRateHistoryByPartnerId(val)
      .then((data) => {

        setFxRateHistoryList(data.data);
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

        setFxRateHistoryList([]);
        setLoading(false);
      });
  };

  //get fx rate by partner id
  const getFxRatePartnerId = (val: any) => {
    setLoading(true);
    FxRateService.getFxRateByPartnerId(val)
      .then((data) => {

        setFxRateList(data.data);
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

        setFxRateList([]);
        setLoading(false);
      });
  };

  //get receive currencies
  const getRecieveCurrencies = (val: any) => {
    setLoading(true);
    setPageLoading(false)

    FxRateService.getRecieveCurrenciesPartnerId(val)
      .then((data) => {
        setLoading(true);
        setRecieveCurrenciesList(data.data);
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

        setRecieveCurrenciesList([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    getSendCoutry();
  }, [])
  //get send currencies
  const getSendCoutry = () => {

    FxRateService.Getsendcountry()
      .then((response: any) => {
        const data = response.data;
        const data1 = response.data;


        // sessionStorage.setItem('sendCountry', response.data.code);
        sessionStorage.setItem('sourceCountry', response.data.code);



        sessionStorage.setItem('sendCountryList', JSON.stringify(data));


        sessionStorage.setItem('sendCurrency', response.data.currencyCode);

        sessionStorage.setItem('sendCurrencyList', JSON.stringify(data1));

        setsendcountryList(data);
        setsendcurrencyList(data1);
        //console.log("data", data)

        // const countries = response.data[0].countryName;
        // // setFilteredCountryList(countries);
        // setsendcountryList(response);
        // setSendCountryAutoComplete(countries);

      })
      .catch((error: any) => {
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
            summary: "Error while getting user details.",
            life: 3000,
          });
        }

      });
  };
  //on cancel click
  const onCancleClick = () => {
    setModelEmpty();
    setVisible(false);
    FxRateModel.id === 0
      ? setModelEmpty()
      : getFxRatePartnerId(Number(partnerid));
    setDisplayBasic(false);
    ErrorMessageEmptyModel();
  };

  //on add click
  const onAddClick = () => {
    ErrorMessageEmptyModel();
    FxRateModel.partnerId = partnerid;
    FxRateModel.amount = FxRateModel.targetAmount;

    if (isValidate(FxRateModel)) {
      setButtonLoading(true);
      FxRateService.addFxRate(FxRateModel)
        .then((data) => {
          setModelEmpty();
          setButtonLoading(false);
          getFxRatePartnerId(FxRateModel.partnerId);
          onHideClick();
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
            setMessage(error.response.data[0].errorMessage);
          } else if (error.response.status === 409) {
            setVisible(true);
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

  //confirm click
  const onConfirmClick = () => {
    setVisible(false);
    onUpdateClick();
  };

  //on update click
  const onUpdateClick = () => {
    FxRateModel.amount = FxRateModel.targetAmount;
    ErrorMessageEmptyModel();
    setButtonLoading(true);
    if (isValidate(FxRateModel)) {
      FxRateService.updateFxRate(FxRateModel)
        .then((data) => {
          setModelEmpty();
          onHideClick();
          getFxRatePartnerId(FxRateModel.partnerId);
          getFxRateHistoryId(FxRateModel.partnerId);
          setButtonLoading(false);
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
            setMessage(error.response.data[0].errorMessage);
          } else if (error.response.status === 409) {
            setMessage(
              "FxRate with same send countr ,send currency and receive country receive currency already exists."
            );
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

  //form date field
  const formatDateField = (rowData: any) => {
    return (
      <React.Fragment>
        <span>
          {moment(rowData.lastUpdatedTime).format("MM/DD/YY H:mm:ss")}{" "}
        </span>
      </React.Fragment>
    );
  };

  //search currency
  const searchCurrency = (event: any) => {
    let query = event.query;
    let currencySet = new Set();
    let _filteredItems: any = [];
    for (let i = 0; i < sendcurrencyList.length; i++) {
      let item = sendcurrencyList[i];
      if (item.currencyCode.toLowerCase().indexOf(query.toLowerCase()) === 0) {


        if (!currencySet.has(item.currencyCode)) {
          currencySet.add(item.currencyCode);
          _filteredItems.push(item);
        }
      }
    }
    setFilteredCurrencyList(_filteredItems);
  };

  //search country

  const searchCountry = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < sendcountryList.length; i++) {
      let item = sendcountryList[i];
      if (item.code.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    _filteredItems.sort((a: any, b: any) => a.code.localeCompare(b.code));
    setFilteredCountryList(_filteredItems);
  };

  //search recieve currency
  const searchRecieveCurrency = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    let currencySet = new Set();
    for (let i = 0; i < recievecurrenciesList.length; i++) {
      let item = recievecurrenciesList[i];
      if (item.currency.toLowerCase().indexOf(query.toLowerCase()) === 0) {

        if (!currencySet.has(item.currency)) {
          currencySet.add(item.currency);
          _filteredItems.push(item);
        }
      }
      }
      setFilteredRecieveCurrencyList(_filteredItems);
    };

    // search country

    const searchRecieveCountry = (event: any) => {
      let query = event.query;
      let _filteredItems: any = [];
      for (let i = 0; i < recievecurrenciesList.length; i++) {
        let item = recievecurrenciesList[i];
        if (item.country.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          _filteredItems.push(item);
        }
      }
      setFilteredRecieveCountryList(_filteredItems);
    };
    //on source currency change
    const onSourceCurrencyChange = (e: any) => {
      if (e.value !== null) {
        setSourceCurrencyAutoComplete(e.value);
        setFxRateModel({
          ...FxRateModel,
          sourceCurrency: e.value.currencyCode,
        });
      }
    };

    // on send country change

    const onSendingCountryChange = (e: any) => {
      if (e.value !== null) {
        setSendCountryAutoComplete(e.value);

        // setSendCountryAutoComplete(e.value)
        setFxRateModel({
          ...FxRateModel,
          sourceCountry: e.value.code,
        });
      }
    };

    //target currency change
    const onTargetCurrencyChange = (e: any) => {
      if (e.value !== null) {
        setTargetCurrencyAutoComplete(e.value);
        setFxRateModel({
          ...FxRateModel,
          targetCurrency: e.value.currency,
        });
      }
    };

    //target country change
    const onTargetCountryChange = (e: any) => {
      if (e.value !== null) {
        setTargetCountryAutoComplete(e.value);
        setFxRateModel({
          ...FxRateModel,
          targetCountry: e.value.country,
        });
      }
    };

    //edit fx rate row data
    const actionBodyTemplate = (rowData: any) => {
      return (
        <>
          <Button
            icon="pi pi-pencil"
            className="editbtn"
            onClick={() => EditFxRate(rowData)}
            title="Edit"
          />

          <Button
            icon="pi pi-trash"
            className="editbtn"
            onClick={() => onDeleteHandleClick(rowData)}
            title="Delete"
          />
        </>
      );
    };
    const onDeleteHandleClick = (rowData: any) => {
      setDeleteData(rowData);
      setDisplayDeletePopup(true);



    };


    const reject = () => {
      setDeleteData(null); // Clear delete data
      setDisplayDeletePopup(false);
    };



    const onDeleteClick = () => {
      setLoading(true);
      let id = deletedata && deletedata.id;

      FxRateService.deleteFxRate(id)
        .then((data: any) => {
          setLoading(false);
          setDeleteData(null);
          getFxRatePartnerId(partnerid);
        })
        .catch((error) => {
          console.error('Error deleting:', error);

          if (error.response) {
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
            }
          } else {
            toast.current?.show({
              severity: "error",
              summary: "An internal server error occurred.",
              life: 3000,
            });
          }

          setLoading(false);
        });

      setDeleteData(id);
      setDisplayDeletePopup(false);
    };

    //show hide fx model
    const ShowHideDialog = () => {
      setFxRateModel({
        ...FxRateModel,
        sourceAmount: "",
        targetAmount: null,
        rate: "",
        sourceCurrency: "",
        targetCurrency: "",
      });

      ErrorMessageEmptyModel();
      setDisplayBasic(true);
    };

    //on hide click
    const onHideClick = () => {
      setModelEmpty();
      setDisplayBasic(false);
    };

    //edit fx rate
    const EditFxRate = (val: any) => {
      ShowHideDialog();
      setFxRateModel(val);
      setTypeAutoComplete(val.typeName);
      setSourceCurrencyAutoComplete(val.sourceCurrency);
      setTargetCountryAutoComplete(val.targetCountry);
      setTargetCurrencyAutoComplete(val.targetCurrency);
      setSendCountryAutoComplete(val.sourceCountry);
      ErrorMessageEmptyModel();
    };

    //on rate change
    const onRateChange = (e: any) => {
      FxRateModel.targetAmount =
        Number(e.target.value) * Number(FxRateModel.sourceAmount);
      setFxRateModel({
        ...FxRateModel,
        rate: e.target.value,
      });
    };

    //source amount
    const onSourceAmountChange = (e: any) => {
      FxRateModel.targetAmount =
        Number(e.target.value) * Number(FxRateModel.rate);
      setFxRateModel({
        ...FxRateModel,
        sourceAmount: e.target.value,
      });
    };

    const header = (
      <div className="flex flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">Fx Rate History</span>
      </div>
    );

    const footerContent = (
      <div className="samecurrencyPopup">
        <Button
          label="No"
          onClick={() => setVisible(false)}
          className=" btn btn-cancel second-btn nobtnpopup"
        />
        <Button
          label="Yes"
          onClick={() => onConfirmClick()}
          autoFocus
          className="btn btn-continue second-btn save-btn"
        />
      </div>
    );

    useEffect(() => {
      const useroobj = sessionStorage.getItem("User");
      if (useroobj === null || useroobj === undefined) {
        navigate("/");
      }
      // setTimeout(() => {
      getRecieveCurrencies(partnerid);
      getFxRatePartnerId(partnerid);
      getFxRateHistoryId(partnerid);
      //  }, 1000);
    }, []);

    return (
      <>
        {pageloading ? (
          <div className="spinner-class">
            <ProgressSpinner />
          </div>) : (<div className="right-tab-section">
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
              {" "}
              <div className="user-heading heading-section">

                <Button
                  iconPos="left"
                  label="Provide Fx Rate"
                  className="btn btn-continue send-btn"
                  onClick={ShowHideDialog}
                />    <Button
                  iconPos="left"
                  icon="pi pi-refresh"
                  label="Refresh"
                  className="btn btn-continue"
                  onClick={() => refreshPage()}
                />{" "}

              </div>
              {loading ? (
                <div className="spinner-class">
                  <ProgressSpinner />
                </div>
              ) : (
                <div className=" facilitator-main">
                  <div className="datatable-doc-demo adm-insta-fees-table">
                    <div className="user-tab ">
                      <DataTable
                        value={fxrateList}
                        paginator
                        className=""
                        rows={5}
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
                        emptyMessage="No FxRate found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                      >
                        <Column

                          field="lastUpdatedTime"
                          header="Date Time"
                          body={formatDateField}
                          sortable style={{ width: "15%" }}
                        />

                        <Column field="sourceAmount" header="Send Amount" sortable style={{ width: "15%" }} />
                        <Column field="sourceCountry" header="Send Country" sortable style={{ width: "15%" }} />
                        <Column field="sourceCurrency" header="Send Currency" sortable style={{ width: "15%" }} />
                        <Column field="targetCountry" header="Receive Country" sortable style={{ width: "15%" }} />

                        <Column field="targetCurrency" header="Receive Currency" sortable style={{ width: "15%" }} />
                        <Column field="targetAmount" header="Receive Amount" sortable style={{ width: "15%" }} />
                        <Column field="rate" header="Rate" sortable style={{ width: "15%" }} />
                        <Column field="updatedBy" header="Updated By" sortable style={{ width: "15%" }} />

                        <Column header="Action" body={actionBodyTemplate} />
                      </DataTable>
                    </div>
                  </div>

                  <div className="datatable-doc-demo adm-insta-fees-table">
                    <div className="user-tab last-fixrate-table">
                      <DataTable
                        value={fxrateHistoryList}
                        header={header}
                        filters={filters}
                        onFilter={(e) => setFilters(e.filters)}
                        paginator
                        className="filter-table"
                        rows={100}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        rowsPerPageOptions={[10, 25, 50]}
                        dataKey="id"
                        rowHover
                        filterDisplay="row"
                        responsiveLayout="scroll"
                        globalFilterFields={[
                          "sourceCurrency",
                          "targetCurrency",
                          "representative.name",
                          "balance",
                          "status",
                        ]}
                        emptyMessage="No FxRate history found."
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                      >
                        <Column
                          style={{ width: "15%" }}
                          className="fxHistory"
                          field="lastUpdatedTime"
                          header="Date Time"
                          sortable
                          body={formatDateField}
                        />



                        <Column
                          field="sourceAmount"
                          header="Send Amount"
                          filterField="sourceAmount"
                          filter
                          showFilterMenu={false}
                          filterPlaceholder="Filter By Amount"
                          style={{ minWidth: "10%" }}
                        />

                        <Column
                          field="sourceCountry"
                          header="Send Country"
                          filterField="sourceCountry"
                          filter
                          showFilterMenu={false}
                          filterPlaceholder="Filter By Country"
                          // style={{ minWidth: "10%" }}
                          sortable style={{ width: "15%", minWidth: "10%" }}
                        />
                        <Column
                          field="sourceCurrency"
                          header="Send Currency"
                          filterField="sourceCurrency"
                          filter
                          showFilterMenu={false}
                          filterPlaceholder="Filter By Currency"
                          style={{ minWidth: "10%" }}
                        />

                        <Column
                          field="targetCountry"
                          header="Receive Country"
                          filter
                          filterField="targetCountry"
                          filterPlaceholder="Filter By Country"
                          showFilterMenu={false}
                          sortable style={{ width: "15%", minWidth: "10%" }}
                        />
                        <Column
                          field="targetCurrency"
                          header="Receive Currency"
                          filter
                          filterField="targetCurrency"
                          filterPlaceholder="Filter By Currency"
                          showFilterMenu={false}
                          style={{ minWidth: "10%" }}
                        />

                        <Column
                          field="targetAmount"
                          header="Receive Amount"
                          filter
                          filterField="targetAmount"
                          filterPlaceholder="Filter By Amount"
                          showFilterMenu={false}
                          style={{ minWidth: "10%" }}
                        />

                        <Column
                          field="rate"
                          header="Rate"
                          filterField="rate"
                          filter
                          showFilterMenu={false}
                          filterPlaceholder="Filter By Rate"
                          style={{ minWidth: "10%" }}
                        />

                        <Column
                          field="updatedBy"
                          header="Updated By"
                          filter
                          filterField="updatedBy"
                          filterPlaceholder="Filter By updatedBy"
                          showFilterMenu={false}
                          style={{ minWidth: "10%" }}

                        />
                      </DataTable>
                    </div>
                  </div>
                </div>
              )}
            </Scrollbars>
          </div>)}

        <Dialog
          header="Header"
          visible={displayBasic}
          onHide={() => onHideClick()}
          className="user-dialog"
        >
          <div className="FFpopup">
            <button className="close-btn" onClick={onHideClick}>
              <img src={CloseIcon} />
            </button>
            <div className="row popup-inner-content ">
              <div className="col-md-6 form-group" >
                <span className="input-label"

                >
                  Send country <span className="color-red">*</span>
                </span>
                <AutoComplete
                  field="code"
                  dropdown
                  forceSelection
                  aria-label="code"
                  dropdownAriaLabel="IND"
                  className="dropdown-acc"
                  placeholder="Select send country"
                  suggestions={filteredcountrieslist}
                  completeMethod={searchCountry}
                  onChange={(e) => onSendingCountryChange(e)}
                  //  value={sendCountryAutoComplete}
                  value={sendCountryAutoComplete}


                />
                {sourceCountryMessage !== null &&
                  sourceCountryMessage.length > 0 ? (
                  <span className="login-error-msg">{sourceCountryMessage}</span>
                ) : null}
              </div>

              <div className="col-md-6 form-group">
                <span className="input-label">
                  Send currency <span className="color-red">*</span>
                </span>
                <AutoComplete
                  dropdown
                  forceSelection
                  className="dropdown-acc"
                  name="currencyCode"
                  field="currencyCode"
                  suggestions={filteredcurrencylist}
                  completeMethod={searchCurrency}
                  placeholder="Select send currency"
                  value={sourcecurrencyAutoComplete}
                  onChange={(e) => onSourceCurrencyChange(e)}



                />
                {sourceCurrencyMessage !== null &&
                  sourceCurrencyMessage.length > 0 ? (
                  <span className="login-error-msg">{sourceCurrencyMessage}</span>
                ) : null}
              </div>
              {/* <div className="col-md-6 form-group ">
              <span className="input-label">
                Send Amount<span className="color-red">*</span>
              </span>
              <input
                className="form-control "
                type="text"
                onKeyDown={(evt) => {
                  if (!/^\d*\.?\d{0,6}$/.test(evt.key) && evt.key !== "Delete" && evt.key !== "Backspace") {
                    evt.preventDefault();
                  }
                }}
                name="sourceamount"
                placeholder="Enter send amount"
                value={FxRateModel.sourceAmount}
                onChange={(e) => onSourceAmountChange(e)}
              />
              {sourceAmountMessage !== null &&
                sourceAmountMessage.length > 0 ? (
                <span className="login-error-msg">{sourceAmountMessage}</span>
              ) : null}
            </div> */}


              <div className="col-md-6 form-group ">
                <span className="input-label">
                  Receive Country <span className="color-red">*</span>
                </span>
                <AutoComplete
                  dropdown
                  forceSelection
                  className="dropdown-acc"
                  name="country"
                  field="country"
                  suggestions={sortedRecieveCountryList}
                  completeMethod={searchRecieveCountry}
                  placeholder="Select receive country"
                  value={targetcountryAutoComplete}
                  onChange={(e) => onTargetCountryChange(e)}
                />
                {targetCountryMessage !== null &&
                  targetCountryMessage.length > 0 ? (
                  <span className="login-error-msg">{targetCountryMessage}</span>
                ) : null}
              </div>
              <div className="col-md-6 form-group ">
                <span className="input-label">
                  Receive Currency <span className="color-red">*</span>
                </span>
                <AutoComplete
                  dropdown
                  forceSelection
                  className="dropdown-acc"
                  name="sourcecurrency"
                  field="currency"
                  suggestions={sortedRecieveCurrencyList}
                  completeMethod={searchRecieveCurrency}
                  placeholder="Select receive currency"
                  value={targetcurrencyAutoComplete}
                  onChange={(e) => onTargetCurrencyChange(e)}
                />
                {targetCurrencyMessage !== null &&
                  targetCurrencyMessage.length > 0 ? (
                  <span className="login-error-msg">{targetCurrencyMessage}</span>
                ) : null}
              </div>

              <div className="col-md-6 form-group">
                <span className="input-label">
                  Send Amount<span className="color-red">*</span>
                </span>
                <input
                  className="form-control"
                  type="text"
                  onKeyDown={(evt) => {
                    const validKeys = ["Delete", "Backspace", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Tab"];

                    if (
                      !/^\d*\.?\d{0,6}$/.test(evt.key) &&
                      !validKeys.includes(evt.key) &&
                      !evt.ctrlKey && !evt.metaKey
                    ) {
                      evt.preventDefault();
                    }
                  }}
                  name="sourceamount"
                  placeholder="Enter send amount"
                  value={FxRateModel.sourceAmount}
                  onChange={(e) => onSourceAmountChange(e)}
                />
                {sourceAmountMessage !== null && sourceAmountMessage.length > 0 ? (
                  <span className="login-error-msg">{sourceAmountMessage}</span>
                ) : null}
              </div>
              <div className="col-md-6 form-group ">
                <span className="input-label">
                  Rate
                  <span className="color-red">*</span>
                </span>
                <input
                  className="form-control "
                  type="number"
                  placeholder="Enter rate"
                  name="rate"
                  value={FxRateModel.rate}
                  onChange={(e) => onRateChange(e)}
                />
                {rateMessage !== null && rateMessage.length > 0 ? (
                  <span className="login-error-msg">{rateMessage}</span>
                ) : null}
              </div>
              {/* <div className="col-md-6 form-group ">
              <span className="input-label">
                Rate
                <span className="color-red">*</span>
              </span>
              <input
                className="form-control "
                type="number"
                placeholder="Enter rate"
                name="rate"
                value={FxRateModel.rate}
                onChange={(e) => {
                  const value = e.target.value;
                  const re = /^[0-9\s]+$/;

                  if (re.test(value) || value === '') {
                    setFxRateModel({
                      ...FxRateModel,
                      rate: e.target.value,
                    });
                  }
                }}
              />

              {rateMessage !== null && rateMessage.length > 0 ? (
                <span className="login-error-msg">{rateMessage}</span>
              ) : null}
            </div> */}



              <div className="col-md-6 form-group ">
                <span className="input-label">
                  Receive Amount
                  <span className="color-red">*</span>
                </span>
                <input
                  className="form-control "
                  type="number"
                  placeholder="Enter receive amount"
                  name="targetamount"
                  value={FxRateModel.targetAmount}
                // onChange={(ev) => {
                //   const value = ev.target.value;
                //   const re = /^[0-9\s]+$/;

                //   if (re.test(value) || value === '') {
                //     setFxRateModel({
                //       ...FxRateModel,
                //       targetAmount: ev.target.value,
                //     });
                //   }
                // }}
                />
                {targetAmountMessage !== null &&
                  targetAmountMessage.length > 0 ? (
                  <span className="login-error-msg">{targetAmountMessage}</span>
                ) : null}
                {/* {rateMessage !== null && rateMessage.length > 0 ? (
                <span className="login-error-msg">{rateMessage}</span>
              ) : null} */}
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
                  className="btn btn-continue second-btn save-btn"
                  label={"Save"}
                  loading={buttonLoading}
                  onClick={FxRateModel.id === 0 ? onAddClick : onUpdateClick}
                />
              </div>
            </div>
            <div>

            </div>
          </div>
        </Dialog>
        <div className=" ">
          <Dialog
            className="Fxrate-popup"
            header="Confirm dialog box user-dialog"
            visible={visible}

            onHide={() => setVisible(false)}
            footer={footerContent}
          >
            <p>
              FxRate with same send country,send currency and receive country,receive currency alreadyexists. Do you wish to save new record ?
            </p>
          </Dialog>
        </div>

        {displayDeletePopup ? (
          <div className="popup-body">
            <div className="register-popup Payment-screen">
              <div className="text-center ">
                <div className="awesome-text">
                  <h4><i className="pi pi-info-circle"></i> Are you sure you want to delete?</h4>
                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                  className="btn btn-cancel second-btn"
                  onClick={reject}
                >
                  No
                </button>
                <button
                  className="btn btn-continue second-btn yes-btn-popup"
                  onClick={onDeleteClick}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  export default FxRate;
