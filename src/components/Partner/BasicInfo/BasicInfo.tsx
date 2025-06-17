import { AutoComplete } from "primereact/autocomplete";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CommonService } from "../../../services/Common/CommonService";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import ToolTip from "../ToolTipsData/ToolTip";
import UploadIcon from "../../../assets/images/icon/upload-icon.png";
import {
  currenciesList,
  industryList,
  validWebsite,
  checkEIN,
  checkITIN,
  checkSSN,
  checkLEI,
  checkTIN,
} from "../../../utils/utils";

import { Button } from "primereact/button";
import { BasicInfoService } from "../../../services/Partner/BasicInfo/BasicInfoService";
import "./BasicInfo.css";
import { LoginService } from "../../../services/Account/LoginService";
import BasicInfoToolTipData from "../../../services/Partner/BasicInfo/BasicInfoToolTips";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import sessionStorageContext from "../../context/LocalStorageContext";

const BasicInfo: React.FC<any> = ({
  onSaveAndContinueClick,
  onButtonChange,
  onNextClick,
  getPartner,
  updateLogoSrc,
  setButtonLoadingSkip,
  buttonLoadingSkip,
}) => {
  const { partnerid, type } = useParams();
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [legalnameerrorMessage, setlegalnameErrorMessage] = React.useState("");

  const [, setPartnerTypesMultiSelectList] = useState(null);

  const navigate = useNavigate();

  const toast = useRef<Toast>(null);

  const [basicInfoToolTipdata] = useState<any>(BasicInfoToolTipData);

  const [filteredtaxidtype, setFilteredTaxIdType] = useState<any>(null);

  const [filteredcompanytype, setFilteredCompanyType] = useState<any>(null);

  const [filteredentitytype, setFilteredEntityType] = useState<any>(null);

  const [paymentrole, SetPaymentrole] = useState<any[]>([]);

  const [taxidtypelist, SetTaxIdTypeList] = useState<any[]>([]);

  const [documenttypelist, setFilteredDocumentType] = useState<any[]>([]);

  const [filteredcurrencieslist, setFilteredCurrencyList] = useState<any[]>([]);

  const [filteredindustrieslist, setFilteredIndustryList] = useState<any[]>([]);

  const [companytype, SetCompanyType] = useState<any[]>([]);

  const [entitytype, SetEntityType] = useState<any[]>([]);

  const [documenttype, setCompanyDocumentType] = useState<any[]>([]);

  const [dbaerrorMessage, setDBAErrorMessage] = React.useState("");

  const [regnoerrorMessage, setregnoErrorMessage] = React.useState("");

  const [websiteerrorMessage, setwebsiteErrorMessage] = React.useState("");

  const context = useContext(sessionStorageContext);

  const [taxnoerrorMessage, settaxnoErrorMessage] = React.useState("");

  const [taxidtypeerrorMessage, settaxidtypeErrorMessage] = React.useState("");

  const [companytypeerrorMessage, setcompanytypeErrorMessage] =
    React.useState("");

  const [entitytypeerrorMessage, setentitytypeErrorMessage] =
    React.useState("");

  const [sizeofbusinesserrorMessage, setsizeofbusinessErrorMessage] =
    React.useState("");

  const [dirtyfield, setDirtyField] = useState(false);

  const [natureofbusinesserrorMessage, setnatureofbusinessErrorMessage] =
    React.useState("");

  const [logoErrorMessage, setlogoErrorMessage] = React.useState("");
  const [logoErrorMessage1, setlogoErrorMessage1] = React.useState("");

  const ITEM_HEIGHT = 48;

  const ITEM_PADDING_TOP = 8;

  const partperTypes = ["B2B", "B2C", "C2C"];

  const [, setpartperTypeName] = React.useState([]);
  const [taxidtypeAutoComplete, setTaxIdTypeAutoComplete] = useState("");
  const [, setRoleAutoComplete] = useState("");

  const [companytypeAutoComplete, setCompanyTypeAutoComplete] = useState("");

  const [entitytypeAutoComplete, setEntityTypeAutoComplete] = useState("");
  const [sizeofbusinessAutoComplete, setSizeOfBusinessAutoComplete] =
    useState("");

  const [taxCurrencyAutoComplete, setTaxCurrencyAutoComplete] = useState("");
  const onboardStatus = sessionStorage.getItem("onboardStatus");

  const [industryAutoComplete, setIndustryAutoComplete] = useState("");

  const [, setFacilitatorAutoComplete] = useState("");

  const [loading, setLoading] = useState(true);

  const [continuebuttonloading, setContinueButtonLoading] = useState(false);

  const [uploadButtonloading, setuploadButtonloading] = useState(false);

  const [readOnly, setReadOnly] = useState(true);

  const [logoUrl, setlogoUrl] = useState("");

  const [legalName, setPartnerLegalName] = useState("");
  const [dbaName, setdbaName] = useState("");

  const [dba, setDbaName] = useState("");

  const [otherindustryerrorMessage, setotherindustryerrorMessage] =
    React.useState("");

  const [basicInfoModel, setBasicInfoModel] = useState({
    id: 0,
    partnerId: Number(partnerid),
    legalName: "",
    dbaName: "",
    roleName: "",
    dba: "",
    registrationNumber: "",
    website: "https://",
    taxIdType: 0,
    taxCurrency: "",
    taxNumber: "",
    industry: "",
    companyTypeId: 0,
    sizeOfBusinessId: 0,
    otherIndustry: "",
    entityTypeId: 0,
    facilitatorId: 1,
    logoUrl: "",
    onboardStatus: sessionStorage.getItem("onboardingStatus "),
  });

  const setModelEmpty = () => {
    setBasicInfoModel({
      id: 0,
      partnerId: Number(partnerid),
      legalName: "",
      roleName: "",
      dbaName: "",
      dba: "",
      registrationNumber: "",
      website: "",
      taxIdType: 0,
      taxCurrency: "",
      taxNumber: "",
      industry: "",
      companyTypeId: 0,
      sizeOfBusinessId: 0,
      otherIndustry: "",
      entityTypeId: 0,
      facilitatorId: 1,
      logoUrl: "",
      onboardStatus: sessionStorage.getItem("onboardingStatus "),
    });
    setTaxIdTypeAutoComplete("");
    setTaxCurrencyAutoComplete("");
    setCompanyTypeAutoComplete("");
    setSizeOfBusinessAutoComplete("");
    setEntityTypeAutoComplete("");
    setIndustryAutoComplete("");
    setlogoUrl(null);
  };
  const [saveClicked, setSaveClicked] = React.useState(false);

  useEffect(() => {
    setButtonLoadingSkip(false);
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    }
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }
    if (Number(partnerid) === 0) {
      getDropdownValues();
    } else {
      getBasicInfoByPartnerId(Number(partnerid));
    }
  }, []);

  const getDropdownValues = () => {
    CommonService.basicinfoDropdown(Number(partnerid))
      .then((response: any) => {
        SetPaymentrole(response.data.paymentrole);
        SetTaxIdTypeList(response.data.taxidtype);
        SetCompanyType(response.data.businesstype);
        SetEntityType(response.data.companytype);
        setCompanyDocumentType(response.data.DocumentType);
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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Oops! Something went wrong",
            life: 3000,
          });
        }
      });
  };

  const getBasicInfoByPartnerId = (id: number) => {
    setLoading(true);
    CommonService.basicinfoDropdown(Number(partnerid))
      .then((response: any) => {
        SetPaymentrole(response.data.paymentrole);
        SetTaxIdTypeList(response.data.taxidtype);
        SetCompanyType(response.data.businesstype);
        SetEntityType(response.data.companytype);
        setCompanyDocumentType(response.data.DocumentType);

        BasicInfoService.getBasicInfoByPartnerId(Number(partnerid))
          .then((response: any) => {
            const BasicData: any = response.data;
            if (isValidate(BasicData)) {
              setBasicInfoModel(BasicData);
              const typesdata = JSON.parse(response.data.partnerTypes) || [];
              var finaltypesdata = typesdata.map((type: any) => ({
                name: type,
                code: type,
              }));
              setPartnerTypesMultiSelectList(finaltypesdata);
              setRoleAutoComplete(response.data.roleName);
              setTaxIdTypeAutoComplete(response.data.taxType);
              setCompanyTypeAutoComplete(response.data.companyType);
              setEntityTypeAutoComplete(response.data.entityType);
              setSizeOfBusinessAutoComplete(response.data.sizeOfBusiness);

              setTaxCurrencyAutoComplete(response.data.taxCurrency);
              setIndustryAutoComplete(response.data.industry);

              if (response.data.partnerTypes !== null) {
                setpartperTypeName(JSON.parse(response.data.partnerTypes));
              }
              setlogoUrl(response.data.logoUrl);
              setPartnerLegalName(response.data.legalName);
              setDbaName(response.data.dbaName);
              setLoading(false);
              context.updateLogoSrc(response.data.logoUrl);
              context.updateLegalName(response.data.legalName);
              context.updateDbaName(response.data.dba);
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              toast.current?.show({
                severity: "error",
                summary: "Unauthorized",
                life: 3000,
              });
              Logout(navigate);
            } else {
              toast.current?.show({
                severity: "error",
                summary: "Oops! Something went wrong",
                life: 3000,
              });
            }
          });
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
  const searchTaxIDType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < taxidtypelist.length; i++) {
      let item = taxidtypelist[i];

      if (item.description.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredTaxIdType(_filteredItems);
  };

  const searchCompanyType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < companytype.length; i++) {
      let item = companytype[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredCompanyType(_filteredItems);
  };

  const searchEntityType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < entitytype.length; i++) {
      let item = entitytype[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredEntityType(_filteredItems);
  };

  const searchDocumentType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < documenttype.length; i++) {
      let item = documenttype[i];

      if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredDocumentType(_filteredItems);
  };

  const searchTaxCurrency = (event: any) => {
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

  const searchIndustry = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < industryList.length; i++) {
      let item = industryList[i];

      if (item.Name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredIndustryList(_filteredItems);
  };

  const ErrorMessageEmptyModel = () => {
    setlegalnameErrorMessage("");
    setDBAErrorMessage("");
    setregnoErrorMessage("");
    setwebsiteErrorMessage("");
    settaxnoErrorMessage("");
    settaxidtypeErrorMessage("");
    setcompanytypeErrorMessage("");
    setentitytypeErrorMessage("");
    setsizeofbusinessErrorMessage("");
    setnatureofbusinessErrorMessage("");
    setotherindustryerrorMessage("");
    setlogoErrorMessage("");
    setlogoErrorMessage1("");
  };

  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null || value === 0) {
      return true;
    }
    return false;
  };

  const isValidate = (values: any) => {
    let formIsValid = true;
    ErrorMessageEmptyModel();

    if (saveClicked && CheckNull(values.legalName)) {
      setlegalnameErrorMessage("Please enter legal name.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (CheckNull(values.legalName)) {
      setlegalnameErrorMessage("Please enter legal name.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.legalName)) {
      if (values.legalName.trim().length === 0) {
        setlegalnameErrorMessage("Please enter legal name.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }

      if (values.legalName.length > 100) {
        setlegalnameErrorMessage("Please enter valid legal name.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }

    // if (CheckNull(values.dba)) {
    //   if (values.dba.trim().length === 0) {
    //     setDBAErrorMessage("Please enter valid Doing Business As name.");
    //     setUpdateBtnShow(true);
    //     setReadOnly(false);
    //     formIsValid = false;
    //   }
    //   if (values.dba.length > 50) {
    //     setDBAErrorMessage("Please enter valid Doing Business As name.");
    //     setUpdateBtnShow(true);
    //     setReadOnly(false);
    //     formIsValid = false;
    //   }
    // }

    if (saveClicked && CheckNull(values.registrationNumber)) {
      setregnoErrorMessage("Please enter registration number.");
      setUpdateBtnShow(true);
      setReadOnly(false);

      formIsValid = false;
    }
    if (!CheckNull(values.registrationNumber)) {
      if (values.registrationNumber.trim().length === 0) {
        setregnoErrorMessage("Please enter registration number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (values.registrationNumber.length > 50) {
        setregnoErrorMessage("Please enter valid registration number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (saveClicked && !CheckNull(values.website)) {
      if (values.website.trim().length === 0) {
        setwebsiteErrorMessage("Please enter website.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (!validWebsite.test(values.website)) {
        setwebsiteErrorMessage("Please enter correct website.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
      if (values.website.length > 100) {
        setwebsiteErrorMessage("Please enter valid website.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.website)) {
      setwebsiteErrorMessage("Please enter website.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (
      (saveClicked && CheckNull(values.taxIdType)) ||
      values.taxIdType === 0
    ) {
      settaxidtypeErrorMessage("Please select Tax ID type.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (saveClicked && CheckNull(values.taxNumber)) {
      settaxnoErrorMessage("Please enter Tax ID number.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (!CheckNull(values.taxNumber)) {
      if (values.taxNumber.trim().length === 0) {
        settaxnoErrorMessage("Please enter Tax ID number.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }

    if (dirtyfield) {
      if (formIsValid) {
        const taxType = taxidtypelist.filter(
          (t) => t.id === values.taxIdType
        )[0].type;
        switch (taxType) {
          case "LEI":
            if (checkLEI(values.taxNumber) === false) {
              formIsValid = false;
              settaxnoErrorMessage(
                "Please provide a valid LEI that is 20 characters long."
              );
            }
            break;
          case "EIN":
            if (checkEIN(values.taxNumber) === false) {
              formIsValid = false;

              settaxnoErrorMessage(
                "EIN is a nine-digit number in the given format: XX-XXXXXXX"
              );
            }

            break;
          case "TIN":
            if (
              checkTIN(values.taxNumber) === false ||
              values.taxNumber === 111111111 ||
              values.taxNumber === 222222222 ||
              values.taxNumber === 333333333 ||
              values.taxNumber === 666666666 ||
              values.taxNumber === 123456789
            ) {
              formIsValid = false;
              settaxnoErrorMessage(
                "Please provide valid TIN in given format: XXX-XX-XXXX"
              );
            }
            break;
          case "ITIN":
            if (checkITIN(values.taxNumber) === false) {
              formIsValid = false;
              settaxnoErrorMessage(
                "ITIN is a nine-digit number in the given format: 9XX-XX-XXXX"
              );
            }
            break;
          case "SSN":
            if (checkSSN(values.taxNumber) === false) {
              formIsValid = false;
              settaxnoErrorMessage(
                "SSN is a nine-digit number in the given format: XXX-XX-XXXX"
              );
            }
            break;
          case "GIIN":
            if (values.taxNumber === 0) {
              formIsValid = false;
              settaxnoErrorMessage("Please provide GIIN");
            }
            break;
          case "GLEI":
            if (
              values.taxNumber === 0 ||
              values.taxNumber === 111111111 ||
              values.taxNumber === 222222222 ||
              values.taxNumber === 333333333 ||
              values.taxNumber === 666666666 ||
              values.taxNumber === 123456789
            ) {
              formIsValid = false;
              settaxnoErrorMessage("Please provide valid GLEI");
            }
            break;
          case "LEI":
            if (
              values.taxNumber === 0 ||
              values.taxNumber === 111111111 ||
              values.taxNumber === 222222222 ||
              values.taxNumber === 333333333 ||
              values.taxNumber === 666666666 ||
              values.taxNumber === 123456789
            ) {
              formIsValid = false;
              settaxnoErrorMessage("Please provide valid LEI");
            }
            break;
          default:
          // code block
        }
      }
    }
    if (saveClicked && CheckNull(values.companyTypeId)) {
      setcompanytypeErrorMessage("Please select company type.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (
      (saveClicked && CheckNull(values.entityTypeId)) ||
      values.entityTypeId === 0
    ) {
      setentitytypeErrorMessage("Please select entity type.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (saveClicked && CheckNull(values.sizeOfBusinessId)) {
      setsizeofbusinessErrorMessage("Please select size of business.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (saveClicked && CheckNull(values.industry)) {
      setnatureofbusinessErrorMessage("Please select nature of business.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (values.industry === "Other") {
      if (CheckNull(values.otherIndustry)) {
        setotherindustryerrorMessage("Please enter other industry.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (saveClicked && CheckNull(values.logoUrl)) {
      setlogoErrorMessage("Please upload logo.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    return formIsValid;
  };

  const updatetoken = () => {
    LoginService.updatetoken()
      .then((response) => {
        sessionStorage.setItem("User", JSON.stringify(response.data));
        sessionStorage.setItem(
          "PartnerId",
          JSON.stringify(response.data.partnerId)
        );
        sessionStorage.setItem("Token", JSON.stringify(response.data.jwtToken));
        sessionStorage.setItem("StepFlag", "1");
        sessionStorage.setItem("OnboardingStatus", "1");
        onSaveAndContinueClick("N");

        setContinueButtonLoading(false);
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
            summary: "Error while getting updated token.",
            life: 3000,
          });
        }
      });
  };

  const onAddClick = (event: React.FormEvent<HTMLButtonElement>): void => {
    setSaveClicked(true);
    ErrorMessageEmptyModel();
    setContinueButtonLoading(true);
    ErrorMessageEmptyModel();
    setContinueButtonLoading(true);
    basicInfoModel.logoUrl = logoUrl;
    if (!CheckNull(basicInfoModel.website)) {
      if (
        !basicInfoModel.website.startsWith("https://") &&
        !basicInfoModel.website.startsWith("http://")
      ) {
        basicInfoModel.website = "https://" + basicInfoModel.website;
      }
    }

    if (isValidate(basicInfoModel)) {
      basicInfoModel.legalName = basicInfoModel.legalName.trim();
      BasicInfoService.addBasicInfo(basicInfoModel)
        .then((response: any) => {
          context.updateLogoSrc(logoUrl);
          context.updateLegalName(basicInfoModel.legalName);
          context.updateDbaName(basicInfoModel.dba);
          // updatetoken();
          // navigate(`../partnerdetails/${response.data}/${type}`);
          setTimeout(() => {
            navigate(
              `../partnerdetails/payment/${JSON.stringify(
                response.data
              )}/${type}`
            );
          }, 500);
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
              summary: error.response.data[0]?.errorMessage,
              life: 3000,
            });
          } else if (error.response.status === 409) {
            setlegalnameErrorMessage(error.response.data);
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error while saving basic info details.",
              life: 3000,
            });
          }
          setContinueButtonLoading(false);
        });
    } else {
      setContinueButtonLoading(false);
    }
  };

  const onUpdateClick = () => {
    ErrorMessageEmptyModel();
    if (!CheckNull(basicInfoModel.website)) {
      if (
        !basicInfoModel.website.startsWith("https://") &&
        !basicInfoModel.website.startsWith("http://")
      ) {
        basicInfoModel.website = "https://" + basicInfoModel.website;
      }
    }
    setContinueButtonLoading(true);

    basicInfoModel.partnerId = Number(partnerid);
    basicInfoModel.logoUrl = logoUrl;

    if (isValidate(basicInfoModel)) {
      basicInfoModel.legalName = basicInfoModel.legalName.trim();
      BasicInfoService.updateBasicInfo(basicInfoModel)
        .then((response) => {
          setContinueButtonLoading(false);
          onSaveAndContinueClick("N");
          context.updateLogoSrc(basicInfoModel.logoUrl);
          context.updateLegalName(basicInfoModel.legalName);
          context.updateDbaName(basicInfoModel.dba);
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
          } else if (error.response.status === 409) {
            setlegalnameErrorMessage(error.response.data);
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error while saving basic info details.",
              life: 3000,
            });
          }
          setContinueButtonLoading(false);
        });
    } else {
      setContinueButtonLoading(false);
    }
  };
  const onTaxIDTypeChange = (e: any) => {
    if (e.value !== null) {
      setTaxIdTypeAutoComplete(e.value);
      setBasicInfoModel({
        ...basicInfoModel,
        taxIdType: e.value.id,
      });
    }
  };

  // const onTaxIDTypeChange1 = (ev: any) => {
  //   const value = ev.target.value;
  //   const re = /^[A-Za-z]+$/;
  //   if (re.test(value) || value === '') {
  //     setTaxIdTypeAutoComplete(ev.value);
  //     setBasicInfoModel({
  //       ...basicInfoModel,
  //       taxIdType: ev.value.id,
  //     });
  //   }
  // };

  const onCompanyTypeChange = (e: any) => {
    const selectedCompanyType = e.value;

    if (e.value !== null) {
      setCompanyTypeAutoComplete(selectedCompanyType);
      setBasicInfoModel({
        ...basicInfoModel,
        companyTypeId: selectedCompanyType.id,
      });

      sessionStorage.setItem("companytype", selectedCompanyType.name);
    }
  };

  // useEffect(() => {
  //   const storedCompanyType = sessionStorage.getItem("companyType");
  //   if (storedCompanyType) {

  //     //console.log("Stored Company Type:", storedCompanyType);
  //   }
  // },[]);

  const onEntityTypeChange = (e: any) => {
    if (e.value !== null) {
      setEntityTypeAutoComplete(e.value);
      setBasicInfoModel({
        ...basicInfoModel,
        entityTypeId: e.value.id,
      });
    }
  };

  const onSizeOfBusinessChange = (e: any) => {
    if (e.value !== null) {
      setSizeOfBusinessAutoComplete(e.value);
      setBasicInfoModel({
        ...basicInfoModel,
        sizeOfBusinessId: e.value.id,
      });
    }
  };

  const onTaxCurrencyChange = (e: any) => {
    if (e.value !== null) {
      setTaxCurrencyAutoComplete(e.value);
      setBasicInfoModel({
        ...basicInfoModel,
        taxCurrency: e.value.Name,
      });
    }
  };

  const onIndustryChange = (e: any) => {
    if (e.value !== null) {
      setIndustryAutoComplete(e.value);
      setBasicInfoModel({
        ...basicInfoModel,
        industry: e.value.Name,
      });
    }
  };

  const handleClose = () => {
    basicInfoModel.partnerId === 0
      ? setModelEmpty()
      : getBasicInfoByPartnerId(Number(partnerid));

    ErrorMessageEmptyModel();
    if (type === "V") {
      if (updateBtnShow) {
        setUpdateBtnShow(false);
        setReadOnly(true);
      }
    }
  };

  const onFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setuploadButtonloading(true);
    if (
      (fileObj.type === "image/jpeg" ||
        fileObj.type === "image/jpg" ||
        fileObj.type === "image/png" ||
        fileObj.type === "image/svg+xml") &&
      fileObj.size <= 4 * 720 * 720
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("PartnerId", Number(partnerid).toString());
      formData.append("Logo", imagemodel);
      BasicInfoService.updateLogoUrl(formData).then((res: any) => {
        setlogoUrl(res.data.logoUrl);

        setuploadButtonloading(false);
      });
    } else {
      setlogoErrorMessage("");
      setuploadButtonloading(false);
      setlogoErrorMessage1(
        "Only JPG/JPEG/PNG/SVG images are allowed upto size 20 KB."
      );
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

  useEffect(() => {
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }

    getBasicInfoByPartnerId(Number(partnerid));
  }, []);
  useEffect(() => {
    onButtonChange({ updateBtnShow });
  }, [updateBtnShow]);

  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <div className="container">
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
            <div className="container-fluid acc-screen">
              <div className="edit-content">
                {onboardStatus === "Ready" && type === "V" ? (
                  <>
                    <Button
                      className="btn edit-partner"
                      label="Edit"
                      onClick={EditDetails}
                    />
                  </>
                ) : null}
              </div>
              <div className="row basic-info-row">
                <div className="col-md-6 info-section-border">
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Entity Legal Name <span className="color-red">*</span>
                      <ToolTip props={basicInfoToolTipdata[0]}></ToolTip>
                    </span>
                    <input
                      tabIndex={1}
                      className="form-control"
                      type="text"
                      name="legalName"
                      readOnly={readOnly}
                      // autoComplete="nope"
                      autoComplete="off"
                      placeholder="Enter legal name"
                      value={basicInfoModel.legalName}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        // const re = /^[A-Za-z]+$/;
                        const re = /^[A-Za-z0-9.,?\/\-_()%$#&*\s]+$/;

                        if (re.test(value) || value === "") {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            legalName: ev.target.value,
                          });
                        }
                      }}
                    />

                    {saveClicked &&
                    legalnameerrorMessage !== null &&
                    legalnameerrorMessage.length > 0 ? (
                      <span className="error-msg">{legalnameerrorMessage}</span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Website <span className="color-red">*</span>
                      <ToolTip props={basicInfoToolTipdata[1]}></ToolTip>
                    </span>

                    <input
                      tabIndex={1}
                      className="form-control"
                      type="text"
                      name="website"
                      // readOnly={readOnly}
                      readOnly={false}
                      // autoComplete="nope"
                      autoComplete="off"
                      placeholder="Enter legal name"
                      value={basicInfoModel.website}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        // const re = /^[A-Za-z]+$/;
                        // const re = /^[A-Za-z\s@]+$/;
                        // const re = /^(https:\/\/)?[A-Za-z\s@]+$/;
                        const re = /^https:\/\/.*$/;

                        // const re = /^http:\/\/www\.[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

                        // const re = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

                        // const re = /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[/\w .-]*/;
                        if (re.test(value) || value === "") {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            website: ev.target.value,
                          });
                        }
                      }}
                    />

                    {saveClicked &&
                    websiteerrorMessage !== null &&
                    websiteerrorMessage.length > 0 ? (
                      <span className="error-msg">{websiteerrorMessage}</span>
                    ) : null}
                  </div>{" "}
                  <div className="col-md-12 form-group  ">
                    <span className="input-label">
                      Tax ID Type <span className="color-red">*</span>{" "}
                      <ToolTip props={basicInfoToolTipdata[2]}></ToolTip>
                    </span>
                    {/* <AutoComplete
                      disabled={readOnly}
                      tabIndex={5}
                      field="name"
                      dropdown
                      aria-label="roles"
                      autoComplete="off"
                      dropdownAriaLabel="Select tax id type"
                      className="dropdown-acc"
                      placeholder="Select Tax ID type"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredtaxidtype}
                      completeMethod={searchTaxIDType}
                      onChange={(e) => onTaxIDTypeChange(e)}
                      value={taxidtypeAutoComplete}
                      forceSelection
                    /> */}
                    <AutoComplete
                      tabIndex={5}
                      field="description"
                      dropdown
                      disabled={readOnly}
                      aria-label="roles"
                      autoComplete="off"
                      dropdownAriaLabel="Select tax id type"
                      className="dropdown-acc"
                      placeholder="Select Tax ID type"
                      // value={basicInfoModel.website}
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredtaxidtype}
                      completeMethod={searchTaxIDType}
                      onChange={(e) => onTaxIDTypeChange(e)}
                      value={taxidtypeAutoComplete}
                      forceSelection
                    />
                    {saveClicked &&
                    taxidtypeerrorMessage !== null &&
                    taxidtypeerrorMessage.length > 0 ? (
                      <span className="error-msg">{taxidtypeerrorMessage}</span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group  form-group ">
                    <span className="input-label">
                      Size of Business <span className="color-red">*</span>
                      <ToolTip props={basicInfoToolTipdata[4]}></ToolTip>
                    </span>
                    <AutoComplete
                      disabled={readOnly}
                      tabIndex={7}
                      field="name"
                      dropdown
                      aria-label="roles"
                      autoComplete="off"
                      dropdownAriaLabel="Select size of business"
                      className="dropdown-acc"
                      placeholder="Select size of business"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={documenttypelist}
                      completeMethod={searchDocumentType}
                      onChange={(e) => onSizeOfBusinessChange(e)}
                      value={sizeofbusinessAutoComplete}
                      forceSelection
                    />
                    {saveClicked &&
                    sizeofbusinesserrorMessage !== null &&
                    sizeofbusinesserrorMessage.length > 0 ? (
                      <span className="error-msg">
                        {sizeofbusinesserrorMessage}
                      </span>
                    ) : null}
                  </div>{" "}
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Nature of Business <span className="color-red">*</span>{" "}
                      <ToolTip props={basicInfoToolTipdata[5]}></ToolTip>
                    </span>
                    <AutoComplete
                      tabIndex={9}
                      field="Name"
                      dropdown
                      disabled={readOnly}
                      aria-label="roles"
                      autoComplete="off"
                      dropdownAriaLabel="Select nature of business"
                      className="dropdown-acc"
                      placeholder="Select nature of business"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredindustrieslist}
                      completeMethod={searchIndustry}
                      onChange={(e) => onIndustryChange(e)}
                      value={industryAutoComplete}
                      forceSelection
                    />
                    {saveClicked &&
                    natureofbusinesserrorMessage !== null &&
                    natureofbusinesserrorMessage.length > 0 ? (
                      <span className="error-msg">
                        {natureofbusinesserrorMessage}
                      </span>
                    ) : null}
                  </div>{" "}
                  {basicInfoModel.industry === "Other" ? (
                    <div className="col-md-12 form-group ">
                      <span className="input-label">
                        Other Industry <span className="color-red">*</span>
                        <ToolTip props={basicInfoToolTipdata[5]}></ToolTip>
                      </span>
                      <input
                        disabled={readOnly}
                        tabIndex={11}
                        className="form-control"
                        type="text"
                        autoComplete="off"
                        name="otherIndustry"
                        placeholder="Enter other industry"
                        value={basicInfoModel.otherIndustry}
                        onChange={(e) => {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            otherIndustry: e.target.value,
                          });
                        }}
                      />
                      {otherindustryerrorMessage !== null &&
                      otherindustryerrorMessage.length > 0 ? (
                        <span className="error-msg">
                          {otherindustryerrorMessage}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>
                <div className="col-md-6">
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Doing Business As{" "}
                      <ToolTip props={basicInfoToolTipdata[6]}></ToolTip>
                    </span>{" "}
                    <input
                      tabIndex={2}
                      disabled={readOnly}
                      className="form-control"
                      type="text"
                      autoComplete="off"
                      name="doingBusinessAs"
                      placeholder="Enter doing business as"
                      value={basicInfoModel.dba}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        // const re = /^[A-Za-z]+$/;

                        const re = /^[A-Za-z\s]+$/;
                        if (re.test(value) || value === "") {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            dba: ev.target.value,
                          });
                        }
                      }}
                    />
                    {/* {saveClicked && dbaerrorMessage !== null && dbaerrorMessage.length > 0 ? (
                    
                      <span className="error-msg">{dbaerrorMessage}</span>
                   
                    ):null} */}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Registration Number <span className="color-red">*</span>{" "}
                      <ToolTip props={basicInfoToolTipdata[7]}></ToolTip>
                    </span>
                    <input
                      tabIndex={4}
                      className="form-control"
                      type="text"
                      readOnly={readOnly}
                      autoComplete="off"
                      name="registrationNumber"
                      placeholder="Enter registration number"
                      value={basicInfoModel.registrationNumber}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[0-9\s]*$/;
                        if (re.test(value) || value === "") {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            registrationNumber: ev.target.value,
                          });
                        }
                      }}
                    />
                    {saveClicked &&
                    regnoerrorMessage !== null &&
                    regnoerrorMessage.length > 0 ? (
                      <span className="error-msg">{regnoerrorMessage}</span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group  ">
                    <span className="input-label">
                      Tax ID Number <span className="color-red">*</span>
                      <ToolTip props={basicInfoToolTipdata[8]}></ToolTip>
                    </span>
                    <input
                      tabIndex={6}
                      className="form-control"
                      type="text"
                      readOnly={readOnly}
                      autoComplete="off"
                      name="taxIdNumber"
                      placeholder="Enter Tax ID number"
                      value={basicInfoModel.taxNumber}
                      onChange={(ev) => {
                        const value = ev.target.value;
                        const re = /^[0-9\s-]*$/;
                        if (re.test(value) || value === "") {
                          setBasicInfoModel({
                            ...basicInfoModel,
                            taxNumber: ev.target.value,
                          });
                          setDirtyField(true);
                        }
                      }}
                    />
                    {saveClicked &&
                    taxnoerrorMessage !== null &&
                    taxnoerrorMessage.length > 0 ? (
                      <span className="error-msg">{taxnoerrorMessage}</span>
                    ) : null}
                  </div>{" "}
                  <div className="col-md-12 form-group  ">
                    <span className="input-label">
                      Company Type <span className="color-red">*</span>
                      <ToolTip props={basicInfoToolTipdata[9]}></ToolTip>
                    </span>
                    <AutoComplete
                      tabIndex={8}
                      field="name"
                      dropdown
                      autoComplete="off"
                      disabled={readOnly}
                      aria-label="roles"
                      dropdownAriaLabel="Select company type"
                      className="dropdown-acc"
                      placeholder="Select company type"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredcompanytype}
                      completeMethod={searchCompanyType}
                      onChange={(e) => onCompanyTypeChange(e)}
                      value={companytypeAutoComplete}
                      forceSelection
                    />
                    {saveClicked &&
                    companytypeerrorMessage !== null &&
                    companytypeerrorMessage.length > 0 ? (
                      <span className="error-msg">
                        {companytypeerrorMessage}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group  ">
                    <span className="input-label">
                      Entity Type <span className="color-red">*</span>{" "}
                      <ToolTip props={basicInfoToolTipdata[10]}></ToolTip>
                    </span>
                    <AutoComplete
                      tabIndex={10}
                      field="name"
                      dropdown
                      disabled={readOnly}
                      aria-label="roles"
                      autoComplete="off"
                      dropdownAriaLabel="Select entity type"
                      className="dropdown-acc"
                      placeholder="Select entity type"
                      virtualScrollerOptions={{ itemSize: 38 }}
                      suggestions={filteredentitytype}
                      completeMethod={searchEntityType}
                      onChange={(e) => onEntityTypeChange(e)}
                      value={entitytypeAutoComplete}
                      forceSelection
                    />
                    {saveClicked &&
                    entitytypeerrorMessage !== null &&
                    entitytypeerrorMessage.length > 0 ? (
                      <span className="error-msg">
                        {entitytypeerrorMessage}
                      </span>
                    ) : null}
                  </div>
                  <div className="col-md-12 form-group ">
                    <span className="input-label">
                      Upload Logo <span className="color-red">*</span>{" "}
                      <ToolTip props={basicInfoToolTipdata[11]}></ToolTip>
                    </span>
                    <div className="Imgupload-buttonbar myfileupload-buttonbar ">
                      <div className="col-md-6 ">
                        {" "}
                        <Button
                          className="document-upload "
                          loading={uploadButtonloading}
                        >
                          <img src={UploadIcon} alt="upload-icon" />
                          <input
                            name="Name"
                            accept=".jpg,.png,.jpeg,.svg"
                            type="file"
                            multiple
                            disabled={readOnly}
                            onChange={(e) => onFileChange(e)}
                            className="inputdata "
                          />
                        </Button>
                        {logoUrl == null ||
                        logoUrl == "" ||
                        logoUrl == undefined ? null : (
                          <div className="Logo-wrappper">
                            {" "}
                            <img
                              src={logoUrl}
                              alt="PartnerImage"
                              id="PartnerImage"
                              className="uploadimg"
                            />{" "}
                          </div>
                        )}
                        {saveClicked &&
                        logoErrorMessage !== null &&
                        logoErrorMessage.length > 0 ? (
                          <span
                            className={
                              logoUrl !== null
                                ? "error-msg"
                                : "error-msg error-msg-upload"
                            }
                          >
                            {logoErrorMessage}
                          </span>
                        ) : null}
                        {saveClicked &&
                        logoErrorMessage1 !== null &&
                        logoErrorMessage1.length > 0 ? (
                          <span
                            className={
                              logoUrl !== null
                                ? "error-msg  error-msg errormsg-limit "
                                : "error-msg errormsg-limit "
                            }
                          >
                            {logoErrorMessage1}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-section">
                <div className=" bottom-btns ">
                  <>
                    <>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn btn-cancel second-btn "
                      >
                        Cancel
                      </button>
                      {updateBtnShow ? (
                        <Button
                          disabled={uploadButtonloading ? true : false}
                          iconPos="left"
                          label={" Save and Continue"}
                          className="btn btn-continue second-btn"
                          loading={continuebuttonloading}
                          onClick={
                            basicInfoModel.partnerId === 0
                              ? onAddClick
                              : onUpdateClick
                          }
                        />
                      ) : (
                        <Button
                          iconPos="left"
                          label="Next"
                          loading={buttonLoadingSkip}
                          onClick={onNextClick}
                          className="btn btn-continue btn-next second-btn"
                        />
                      )}
                    </>
                  </>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>
      )}
    </>
  );
};

export default BasicInfo;
