
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DocumentService } from "../../../services/Partner/Documents/DocumentsService";
import DocumentToolTips from "../../../services/Partner/Documents/DocumentToolTips";
import { Logout } from "../../../utils/AccountUtils";
import { brazildocumentList, documentList } from "../../../utils/utils";
import UploadIcon from "../../../assets/images/icon/upload-icon.png";
import Document from "../../../assets/images/icon/file-doc.svg";
import { InputTextarea } from 'primereact/inputtextarea';
import ToolTip from "../ToolTipsData/ToolTip";
import { url } from "inspector";
import { AddressService } from "../../../services/Partner/Address/AddressService";
import DownloadIcon from "../../../assets/images/icon/download-icon.jpg";
import Scrollbars from "react-custom-scrollbars-2";
import { REFUSED } from "dns";
const Documents: React.FC<any> = ({ onSaveAndContinueClick, onNextClick, onButtonChange, onBackButtonChange, setButtonLoadingSkip, buttonLoadingSkip }) => {
  const { partnerid, type } = useParams();
  const toast = useRef<Toast>(null);

  // const companyType = sessionStorage.getItem('companyType');
  const companyType = sessionStorage.getItem('companytype');
  // //console.log('Company Type:', companyType);
  const [status, setstatus] = useState(sessionStorage.getItem("OnboardingStatus"));
  const navigate = useNavigate();
  const [documentTypeAutoComplete, setDocumentTypeAutoComplete] = useState("");
  const [seconddocumentTypeAutoComplete, setSecondDocumentTypeAutoComplete] = useState("");
  const [thirddocumentTypeAutoComplete, setThirdDocumentTypeAutoComplete] = useState("");
  const [forthdocumentTypeAutoComplete, setForthDocumentTypeAutoComplete] = useState("");
  const [fivedocumentTypeAutoComplete, setFiveDocumentTypeAutoComplete] = useState("");
  const [sixdocumentTypeAutoComplete, setSixDocumentTypeAutoComplete] = useState("");
  const [sevendocumentTypeAutoComplete, setSevenDocumentTypeAutoComplete] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSecondName, setFileSecondName] = useState("");
  const [fileThirdName, setThirdSecondName] = useState("");
  const [fileFourthName, setFourthSecondName] = useState("");
  const [fifthName, setFifthSecondName] = useState("");
  const [sixthName, setSixthSecondName] = useState("");
  const [seventhName, setSeventhSecondName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const [doctypeerrorMessage, setdoctypeerrorMessage] = useState("");
  const [backButtonLoading, setBackButtonLoading] = useState(false)
  const [deletedata, SetDeleteData] = useState(null);
  const [seconddoctypeerrorMessage, setseconddoctypeerrorMessage] = useState("");
  const [docfileerrorMessage, setdocfileeerrorMessage] = useState("");
  const [docfileerrorMessage1, setdocfileeerrorMessage1] = useState("");
  const [docfileerrorMessage2, setdocfileeerrorMessage2] = useState("");
  const [docfileerrorMessage3, setdocfileeerrorMessage3] = useState("");
  const [docfileerrorMessage4, setdocfileeerrorMessage4] = useState("");
  const [docfileerrorMessage5, setdocfileeerrorMessage5] = useState("");
  const [docfileerrorMessage6, setdocfileeerrorMessage6] = useState("");
  const [docfileerrorMessage7, setdocfileeerrorMessage7] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [seconddocfileerrorMessage1, setseconddocfileeerrorMessage1] = useState("");
  const [seconddocfileerrorMessage2, setseconddocfileeerrorMessage2] = useState("");
  const [seconddocfileerrorMessage3, setseconddocfileeerrorMessage3] = useState("");
  const [seconddocfileerrorMessage4, setseconddocfileeerrorMessage4] = useState("");
  const [seconddocfileerrorMessage5, setseconddocfileeerrorMessage5] = useState("");
  const [seconddocfileerrorMessage6, setseconddocfileeerrorMessage6] = useState("");
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [firstUploadLoading, setFirstUploadLoading] = useState(false);
  const [secondUploadLoading, setSecondUploadLoading] = useState(false);
  const [thirdUploadLoading, setthirdUploadLoading] = useState(false);
  const [fourthUploadLoading, setfourthUploadLoading] = useState(false);
  const [fifthUploadLoading, setFifthUploadLoading] = useState(false);
  const [sixthUploadLoading, setSixthUploadLoading] = useState(false);
  const [seventhUploadLoading, setSeventhUploadLoading] = useState(false);
  const [seconddocfileerrorMessage, setseconddocfileeerrorMessage] = useState("");
  const [threeDocErrorMessage, setThreeDocErrorMessage] = useState("");
  const [fourDocErrorMessage, setFourDocErrorMessage] = useState("");
  const [fiveDocErrorMessage, setFiveDocErrorMessage] = useState("");
  const [sixDocErrorMessage, setSixDocErrorMessage] = useState("");
  const [sevenDocErrorMessage, setSevenDocErrorMessage] = useState("");
  const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
  const [fileNameShow, setFileNameShow] = useState(false);
  const [secondfileNameShow, setSecondFileNameShow] = useState(false);
  const [thirdfileNameShow, setThirdFileNameShow] = useState(false);
  const [fourthNameShow, setFourthFileNameShow] = useState(false);
  const [fivefileNameShow, setFiveFileNameShow] = useState(false);
  const [sixfileNameShow, setSixFileNameShow] = useState(false);
  const [sevenfileNameShow, setSevenFileNameShow] = useState(false);
  const [businessdescerrorMessage, setbusinessdescerrorMessage] = useState("");
  const [instarailnetworkerrorMessage, setinstarailnetworkerrorMessage] = useState("");
  const [descButtonLoading, setDescButtonLoading] = useState(false);
  const [updateBtnShow, setUpdateBtnShow] = useState(false);
  const [readonly, setReadOnly] = useState(false);
  const [country, setCountry] = useState("");
  const [newdocumentlist, setNewDocumentList] = useState<any[]>([]);
  const [filtereddocumentslist, setFilteredDocumentList] = useState<any[]>([]);
  const [filteredseconddocumentslist, setFilteredSecondDocumentList] = useState< any[] >([]);
  const [documentToolTipsData, setDocumentToolTipData] = useState<any>(DocumentToolTips);
  const [updateBackBtnShow, setUpdateBackBtnShow] = useState(false);

  useEffect(() => {
    const companyType = sessionStorage.getItem('companyType');

  }, []);
  const [documentData, setDocumentData]: any = useState()
  const [documentmodelNew, setDocumentmodelNew]: any = useState({
    id: 0,
    partnerId: Number(partnerid),
    document: [
      {
        id: 0,
        document: "",
        documentType: "Certificate of Incorporation",
        documentTypeId: 1,
      },
      {
        id: 0,
        document: "",
        documentType: "Shareholder registry",
        documentTypeId: 2,
      },
      {
        id: 0,
        document: "",
        documentType: "Certificate of Incumbency",
        documentTypeId: 3,
      },
      {
        id: 0,
        document: "",
        documentType: "Excerpts from the Register",
        documentTypeId: 4,
      },
      {
        id: 0,
        document: "",
        documentType: "List of directors or board members",
        documentTypeId: 5,
      },
      {
        id: 0,
        document: "",
        documentType: "Certificate of Good Standing",
        documentTypeId: 6,
      },
      {
        id: 0,
        document: "",
        documentType: "Government-issued ID",
        documentTypeId: 7,
      },
    ],
    businessDescription: "",
    reasonForJoiningTheInstarailsNetwork: "",
  });




  const [defaultDocumentList, setDefaultDocumentList]: any = useState({
    document: [
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 1,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 2,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 3,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 4,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 5,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 6,
      },
      {
        partnerid: 0,
        document: "",
        documentType: "",
        documentTypeId: 7,
      },
    ],
  });

  const [finalDocumentmodelNew, setFinalDocumentmodelNew]: any = useState({
    id: 0,
    partnerId: Number(partnerid),
    document: [
      {
        id: 0,
        document: "",
        documentType: "Certificate of Incorporation",
        documentTypeId: 1,
      },
      {
        id: 0,
        document: "",
        documentType: "Shareholder registry",
        documentTypeId: 2,
      },
      {
        id: 0,
        document: "",
        documentType: "Certificate of Incumbency",
        documentTypeId: 3,
      },
      {
        id: 0,
        document: "",
        documentType: "Excerpts from the Register",
        documentTypeId: 4,
      },
      {
        id: 0,
        document: "",
        documentType: "List of directors or board members",
        documentTypeId: 5,
      },
      {
        id: 0,
        document: "",
        documentType: "Certificate of Good Standing",
        documentTypeId: 6,
      },
      {
        id: 0,
        document: "",
        documentType: "Government-issued ID",
        documentTypeId: 7,
      },
    ],
    businessDescription: "",
    reasonForJoiningTheInstarailsNetwork: "",
  });

  const [finalDocument, setFinalDocument] = useState()

  useEffect(() => {
    onButtonChange({ updateBtnShow })

  }, [updateBtnShow])

  useEffect(() => {
    onBackButtonChange({ updateBackBtnShow })
  }, [updateBackBtnShow])


  const getDocumentByPartnerId = (id: any) => {
    setLoading(true);
    DocumentService.getDocumentByPartnerId(id)
      .then((response: any) => {
        if (response.data.id === 0) {
          if (isValidate(response.data)) {
            response.data.document.push(defaultDocumentList);
            setDocumentmodelNew(response.data);
            setLoading(false);
          }
        } 
        
        
        else 
        
          if (response.data.document[0].partnerid === 0) {
            const documentData: any = response.data;
            if (isValidate(documentData)) {
              documentData.document = defaultDocumentList.document;
              setDocumentmodelNew(documentData);
            }
          } 
          
         
          
          else {
            const documentData = response.data;

            if (isDelete === true) {
              const updatedDocuments = finalDocumentmodelNew.document.map((doc: any, index: any) => {
                const foundDocument = response.data.document.find(
                  (item: any) => item.documentTypeId === doc.documentTypeId
                );
                if (foundDocument) {
                  return {
                    ...doc,
                    id: foundDocument.id,
                    document: foundDocument.document,
                  };
                }
                return doc;
              });


              setDocumentmodelNew({
                ...finalDocumentmodelNew,
                document: updatedDocuments,
                id: documentData.id,
                reasonForJoiningTheInstarailsNetwork: documentData.reasonForJoiningTheInstarailsNetwork,
                businessDescription: documentData.businessDescription,
              });
              setIsDelete(false)

            }
            else {
              const updatedDocuments = documentmodelNew.document.map((doc: any, index: any) => {
                const foundDocument = response.data.document.find(
                  (item: any) => item.documentTypeId === doc.documentTypeId
                );
                if (foundDocument) {
                  return {
                    ...doc,
                    id: foundDocument.id,
                    document: foundDocument.document,
                  };
                }
                return doc;
              });
              setDocumentmodelNew({
                ...documentmodelNew,
                document: updatedDocuments,
                id: documentData.id,
                reasonForJoiningTheInstarailsNetwork: documentData.reasonForJoiningTheInstarailsNetwork,
                businessDescription: documentData.businessDescription,
              });
            }
          }
          setLoading(false);

        
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  
  const CheckNull = (value: any) => {
    if (value === "" || value === undefined || value === null) {
      return true;
    }
    return false;
  };

  const isValidate = (values: any) => {
    let formIsValid = true;

    if (!values.document[0].document) {
      setdocfileeerrorMessage1("Please upload document file.");
      formIsValid = false;
    }
    if (!values.document[1].document) {
      setdocfileeerrorMessage2("Please upload document file.");
      formIsValid = false;
    }
    if (!values.document[2].document) {
      setdocfileeerrorMessage3("Please upload document file.");
      formIsValid = false;
    }
    if (!values.document[3].document) {
      setdocfileeerrorMessage4("Please upload document file.");
      formIsValid = false;
    }

    if (CheckNull(values.businessDescription)) {
      setbusinessdescerrorMessage("Please enter business description.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (!CheckNull(values.businessDescription)) {
      if (values.businessDescription.trim().length === 0) {
        setbusinessdescerrorMessage("Please enter business description.");
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }
    if (CheckNull(values.reasonForJoiningTheInstarailsNetwork)) {
      setinstarailnetworkerrorMessage(
        "Please enter reason for joining the instarails network."
      );
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }
    if (!CheckNull(values.reasonForJoiningTheInstarailsNetwork)) {
      if (values.reasonForJoiningTheInstarailsNetwork.trim().length === 0) {
        setinstarailnetworkerrorMessage(
          "Please enter reason for joining the instarails network."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }

    if (CheckNull(values.document[0].document)) {
      setdoctypeerrorMessage("Please upload document file.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (CheckNull(values.document[1].document)) {
      setseconddocfileeerrorMessage("Please upload document file.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (CheckNull(values.document[2].document)) {
      setThreeDocErrorMessage("Please upload document file.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }

    if (CheckNull(values.document[3].document)) {
      setFourDocErrorMessage("Please upload document file.");
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
      formIsValid = false;
    }


    if (
      !CheckNull(values.document[0].documentType) &&
      !CheckNull(values.document[1].documentType)
    ) {
      if (values.document[0].documentType === values.document[1].documentType) {
        setseconddoctypeerrorMessage(
          "Document type cannot be the same, please upload a different document type."
        );
        setUpdateBtnShow(true);
        setReadOnly(false);
        setUpdateBackBtnShow(true);
        setReadOnly(false);
        formIsValid = false;
      }
    }

    return formIsValid;
  };

  const onFileChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
    
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setFirstUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[0].document = data.data.logoUrl || "";
            prevState.document[0].documentType = "Certificate of Incorporation";
            prevState.document[0].documentTypeId = 1;
            return {
              ...prevState,

            };
          });
          setFirstUploadLoading(false);
          setFileNameShow(true);
        })
        .catch((error) => {
          setFirstUploadLoading(false);
        });
      setFileName(imagemodel.name);
      setdocfileeerrorMessage1("");
    } else {
      setdocfileeerrorMessage("");
      setdocfileeerrorMessage1(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };

  const onFileSecondChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
  
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setSecondUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[1].document = data.data.logoUrl || "";
            prevState.document[1].documentType = "Shareholder registry";
            prevState.document[1].documentTypeId = 2;

            return {
              ...prevState,
            };
          });
          setSecondUploadLoading(false);
          setSecondFileNameShow(true);
        })
        .catch((error) => {
          setSecondUploadLoading(false);
        });
      setFileSecondName(imagemodel.name);

      setdocfileeerrorMessage2("");
    } else {
      setseconddocfileeerrorMessage("");
      setdocfileeerrorMessage2(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };


  const onFileThreeChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
   
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setthirdUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[2].document = data.data.logoUrl || "";
            prevState.document[2].documentType = "Certificate of Incumbency ";
            prevState.document[2].documentTypeId = 3;
            return {
              ...prevState,
            };
          });
          setthirdUploadLoading(false);
          setThirdFileNameShow(true);
        })
        .catch((error) => {
          setthirdUploadLoading(false);
        });
      setThirdSecondName(imagemodel.name);

      setdocfileeerrorMessage3("");
    } else {
      setseconddocfileeerrorMessage("");
      setdocfileeerrorMessage3(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };


  const onFileFourChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
   
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setfourthUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[3].document = data.data.logoUrl || "";
            prevState.document[3].documentType = "Excerpts from the Register";
            prevState.document[3].documentTypeId = 4;
            return {
              ...prevState,
            };
          });
          setfourthUploadLoading(false);
          setFourthFileNameShow(true);
        })
        .catch((error) => {
          setfourthUploadLoading(false);
        });
      setFourthSecondName(imagemodel.name);
      setdocfileeerrorMessage4("");
    } else {
      setdocfileeerrorMessage("");
      setdocfileeerrorMessage4(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };

  const onFileFiveChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
   
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setFifthUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[4].document = data.data.logoUrl || "";
            prevState.document[4].documentType = "List of directors or board members";
            prevState.document[4].documentTypeId = 5;
            return {
              ...prevState,
            };
          });
          setFifthUploadLoading(false);
          setFiveFileNameShow(true);
        })
        .catch((error) => {
          setFifthUploadLoading(false);
        });
      setFifthSecondName(imagemodel.name);
      setdocfileeerrorMessage5("");
    } else {
      setdocfileeerrorMessage("");
      setdocfileeerrorMessage5(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };
  //test


  const onFileSixChange = (event: any) => {

    const fileObj = event.target.files && event.target.files[0];
    
    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 4 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setSixthUploadLoading(true);
      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[5].document = data.data.logoUrl || "";
            prevState.document[5].documentType = "Certificate of Good Standing";
            prevState.document[5].documentTypeId = 6;
            return {
              ...prevState,
            };
          });
          setSixthUploadLoading(false);
          setSixFileNameShow(true);
        })
        .catch((error) => {
          setSixthUploadLoading(false);
        });
      setSixthSecondName(imagemodel.name);
      setdocfileeerrorMessage6("");
    } else {
      setdocfileeerrorMessage("");
      setdocfileeerrorMessage6(
        "Please select a PDF file with a maximum size of 5MB."
      );
    }
  };
  const onFileSevenChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];


    if (
      (fileObj.type === "application/pdf" || fileObj === "image/tiff") &&
      fileObj.size <= 5 * 1024 * 1024
    ) {
      const imagemodel = event.target.files[0];
      const formData = new FormData();
      formData.append("Document", imagemodel);
      formData.append("PartnerId", Number(partnerid).toString());
      setSeventhUploadLoading(true);

      DocumentService.uploadDocument(formData)
        .then((data: any) => {
          setDocumentmodelNew((prevState: any) => {
            prevState.document[6].document = data.data.logoUrl || "";
            prevState.document[6].documentType = "Government-issued ID";
            prevState.document[6].documentTypeId = 7;
            return {
              ...prevState,
            };
          });
          setSeventhUploadLoading(false);
          setSevenFileNameShow(true);
        })
        .catch((error) => {
          setSeventhUploadLoading(false);
        });

      setSeventhSecondName(imagemodel.name);
      setdocfileeerrorMessage7("");
    } else {
      setdocfileeerrorMessage("");
      setdocfileeerrorMessage7(
        "Please select a PDF  file with a maximum size of 5MB."
      );
    }
  };




  const ClearErrorMessage = () => {
    setbusinessdescerrorMessage("");
    setinstarailnetworkerrorMessage("");
    setdoctypeerrorMessage("");

    setseconddocfileeerrorMessage("");
    setThreeDocErrorMessage("");
    setFourDocErrorMessage("");
    setFiveDocErrorMessage("");
    setSixDocErrorMessage("");
    setSevenDocErrorMessage("");


    setseconddoctypeerrorMessage("");
    setdocfileeerrorMessage("");

    setdocfileeerrorMessage1("");
    setseconddocfileeerrorMessage1("");
  };

  useEffect(() => {
    const filteredDocuments = documentmodelNew.document.filter((doc: any) => doc.document !== "");

    const payload = {
      id: 0,
      partnerId: Number(partnerid),
      document: filteredDocuments,
      businessDescription: documentmodelNew.businessDescription,
      reasonForJoiningTheInstarailsNetwork: documentmodelNew.reasonForJoiningTheInstarailsNetwork,

    };

    setDocumentData(payload);
  }, [documentmodelNew]);


  const onAddClick = () => {
    ClearErrorMessage();
    setButtonLoading(true);
    if (isValidate(documentmodelNew)) {
      DocumentService.addDocument(documentData)
        .then((res) => {
          getDocumentByPartnerId(Number(partnerid));
          setFileName("");
          setFileSecondName("");

          setThirdSecondName("");
          setFourthSecondName("");
          setFifthSecondName("");
          setSixthSecondName("");
          setSeventhSecondName("");
        
          sessionStorage.setItem("StepFlag", "4");
          onSaveAndContinueClick("N");
          // navigate(`../partnerdetails/payment/${partnerid}/${type}`);
          setButtonLoading(false);
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
              summary: "Error while getting partner document.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const onUpdateClick = (val: any) => {
    ClearErrorMessage();
    setButtonLoading(true);
    if (isValidate(documentmodelNew)) {
      DocumentService.updateDocument(documentData)
        .then((res) => {
          getDocumentByPartnerId(Number(partnerid));
          setFileName("");
          setFileSecondName("");
           setThirdSecondName("");
          setFourthSecondName("");
          setFifthSecondName("");
          setSixthSecondName("");
          setSeventhSecondName("");
          sessionStorage.setItem("StepFlag", "4");
          onSaveAndContinueClick("N");
          // navigate(`../partnerdetails/${partnerid}/${type}`);
          setButtonLoading(false);

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
              summary: "Error while getting partner document.",
              life: 3000,
            });
          }
          setButtonLoading(false);
        });
    } else {
      setButtonLoading(false);
    }
  };

  const onBackClick = () => {
    setBackButtonLoading(true)
    setTimeout(() => {
      onSaveAndContinueClick("B");
    }, 1000)
  };

  const searchDocumentType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < documentList.length; i++) {
      let item = documentList[i];
      if (item.type.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredDocumentList(_filteredItems);
  };

  const searchSecondDocumentType = (event: any) => {
    let query = event.query;
    let _filteredItems: any = [];
    for (let i = 0; i < documentList.length; i++) {
      let item = documentList[i];
      if (item.type.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item);
      }
    }
    setFilteredSecondDocumentList(_filteredItems);
  };


  const onDeleteHandleClick = (document: any) => {
    SetDeleteData(document);
    setDisplayDeletePopup(true);
  };

  const onDownloadHandleClick = (document: any) => {

  };

  const downloadDocumentFile = (document1: any) => {
    setLoading(true);
    //  //console.log(document1)
    let id = document1 && document1.id;
    let documentName = document1 && document1.document;
    DocumentService.downloadPdfDetails(id)
      .then((response) => {
        setLoading(false);
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", documentName);
        document.body.appendChild(link);
        link.click();
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
    onDocumentDelete(deletedata.id);
  };

  const onDocumentDelete = (id: any) => {
    setDisplayDeletePopup(false);
    DocumentService.deleteDocument(Number(id))
      .then((data: any) => {
        setIsDelete(true)
        //  sessionStorage.setItem("StepFlag", "4");
        //   // onSaveAndContinueClick("D");
        // setDirtyField(true);
        SetDeleteData(null);


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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while deleting document details.",
            life: 3000,
          });
        }
      });
  };
 
  useEffect(() => {
    if (isDelete === true) {
      getDocumentByPartnerId(partnerid);
    } 
  }, [isDelete])

  const reject = () => {
    setDisplayDeletePopup(false);
  };

  const EditDetails = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setUpdateBtnShow(true);
      setReadOnly(false);
      setUpdateBackBtnShow(true);
      setReadOnly(false);
    }, 1000);
  };



  useEffect(() => {
    setButtonLoadingSkip(false);
    {
      type === "V" ? setUpdateBtnShow(false) : setUpdateBtnShow(true);
    }

    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }
    getDocumentByPartnerId(partnerid);
    getAddressByPartnerId(Number(partnerid));
  }, []);

  const getAddressByPartnerId = (id: number) => {
    setLoading(true);
    AddressService.getAddressByPartnerId(id)
      .then((response: any) => {
        const data = response.data;
        if (
          data.filter((x: any) => x.addressType === false)[0].country === "BRA"
        ) {
          setNewDocumentList(brazildocumentList);
        } else {
          setNewDocumentList(documentList);
        }
        setLoading(false);


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
            summary: "Error while getting the address details",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };




  const setModelEmpty = () => {
    setDocumentmodelNew({
      id: 0,
      partnerId: Number(partnerid),
      document: [
        {
          id: 0,
          document: "",
          documentType: "",
          documentTypeId: 1,
        },
        {
          id: 0,
          document: "",
          documentType: "",
          documentTypeId: 2,
        },
      ],
      businessDescription: "",
      reasonForJoiningTheInstarailsNetwork: "",
    });
    setDefaultDocumentList({
      document: [
        {
          id: 0,
          document: "",
          documentType: "",
          documentTypeId: 1,
        },
        {
          id: 0,
          document: "",
          documentType: "",
          documentTypeId: 2,
        },
      ],
    });
    setDocumentTypeAutoComplete("");
    setSecondDocumentTypeAutoComplete("");
    setThirdDocumentTypeAutoComplete("");
    setForthDocumentTypeAutoComplete("");
    setFiveDocumentTypeAutoComplete("");
    setSixDocumentTypeAutoComplete("");
    setSevenDocumentTypeAutoComplete("");
  };
  const handleClose = () => {
    documentmodelNew.id === 0
      ? setModelEmpty()
      : getDocumentByPartnerId(Number(partnerid));

    ClearErrorMessage();
    setFileNameShow(false);
    setSecondFileNameShow(false);
    if (type === "V") {
      if (updateBtnShow) {
        setUpdateBtnShow(false);
        setReadOnly(true);
      }

      if (type === "V") {
        if (updateBackBtnShow) {
          setUpdateBackBtnShow(false)
          setReadOnly(true);
        }
      }
    };
  };
  return (
    <>
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
          <div className="container-fluid acc-screen document-main-div">
            <div className="edit-content">
              {type === "V" ? (
                <Button
                  className="btn edit-partner"
                  label="Edit"
                  onClick={EditDetails}
                />
              ) : null}
            </div>
            <div className="row ">
              <ConfirmDialog id="confirm-popup" />
              <div className="col-md-12 info-section info-section-border">
                <div className="row text-area-row">
                  <div className="col-md-6  info-section ">
                    <span className="input-label">
                      Business Description <span className="color-red">*</span>
                      {/* <ToolTip props={documentToolTipsData[7]} /> */}
                    </span>
                    <div className="textarea-wrap">
                      <InputTextarea
                        placeholder="Enter business description"
                        className="form-control text-area"
                        name="businessDescription"
                        readOnly={readonly}
                        rows={5} cols={30}
                        value={documentmodelNew && documentmodelNew.businessDescription}
                        onChange={(ev) => {
                          const value = ev.target.value;
                          const re = /^[A-Za-z0-9.,@()\s\(\)-]+$/;
                          if (re.test(value) || value === '') {

                            setDocumentmodelNew({
                              ...documentmodelNew,
                              businessDescription: ev.target.value,
                            })
                          }
                        }}
                      />
                      {businessdescerrorMessage !== null &&
                        businessdescerrorMessage.length > 0 ? (
                        <span className="error-msg">
                          {businessdescerrorMessage}
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="col-md-6 info-section ">
                    <span className="input-label">
                      {" "}
                      Reason for joining the instarails network{" "}
                      <span className="color-red">*</span>
                      {/* <ToolTip props={documentToolTipsData[8]} /> */}
                    </span>
                    <div className="textarea-wrap">
                      <InputTextarea
                        className="form-control text-area"
                        name="reasonForJoiningTheInstarailsNetwork"
                        placeholder="Enter reason for joining the instarails network"
                        rows={5} cols={30}
                        readOnly={readonly}
                        value={ documentmodelNew && documentmodelNew.reasonForJoiningTheInstarailsNetwork}
                        onChange={(ev) => {
                          const value = ev.target.value;
                          const re = /^[A-Za-z0-9.,@()\s\(\)-]+$/;
                          if (re.test(value) || value === '') {


                            setDocumentmodelNew({
                              ...documentmodelNew,
                              reasonForJoiningTheInstarailsNetwork: ev.target.value,
                            })
                          }
                        }}
                      />
                      {instarailnetworkerrorMessage !== null &&
                        instarailnetworkerrorMessage.length > 0 ? (
                        <span className="error-msg">
                          {instarailnetworkerrorMessage}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* *********** Document Type *************/}


                <div className="row">
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className="form-group first-document-upload doc-upload-section">
                        <span className="input-label">Certificate of Incorporation</span>
                        <span className="color-red">*</span>
                        <ToolTip props={documentToolTipsData[0]} />
                        {docfileerrorMessage1 !== null && docfileerrorMessage1.length > 0 ? (
                          <span className="error-msg">{docfileerrorMessage1}</span>
                        ) : null}
                      </div>

                      <div className="col-md-6 info-section">
                        <div className="form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            { documentmodelNew && documentmodelNew.document[0] &&  documentmodelNew.document[0].id === 0 ? (
                              <div className="myfileupload-buttonbar" key={new Date().toString()}>

                                <Button
                                  // hidden={readonly}
                                  disabled={firstUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={firstUploadLoading}
                                >
                                  <img src={UploadIcon} />
                                  <input
                                    disabled={firstUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    value={documentTypeAutoComplete}
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    onChange={(e) => onFileChange(e)}
                                    className="inputdata"
                                  />
                                </Button>
                                {fileNameShow ? (
                                  <label className="myui-button">
                                    <span className="file-name">{fileName}</span>
                                  </label>
                                ) : null}
                              </div>
                            ) : (
                              <div className="file-name-delete">
                                <a
                                  className="pdf-btn"
                                  // href={documentmodelNew.document[0].document}
                                  target="_blank"
                                >
                                  <img
                                    src={Document}
                                    alt="img"
                                    className="doc-img"
                                  />
                                  <p>
                                    {documentmodelNew && documentmodelNew.document[0] && documentmodelNew.document[0].document
                                      .split("/")
                                      .pop()}
                                  </p>
                                </a>

                                <button
                                  className="delete-doc"
                                  hidden={readonly}
                                  title="Delete"
                                >
                                  <i
                                    className="pi pi-trash"
                                    onClick={(e) =>
                                      onDeleteHandleClick(
                                        documentmodelNew.document[0]
                                      )
                                    }
                                  ></i>
                                </button>

                                <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[0].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                              

                              </div>

                            )}
                          </div>
                          {/* {docfileerrorMessage !== null && docfileerrorMessage.length > 0 ? (
                            <span className="error-msg">{docfileerrorMessage}</span>
                          ) : null} */}

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className=" form-group first-document-upload doc-upload-section">
                        <span className="input-label" >Shareholder registry</span>
                        <span className="color-red" >*</span>{" "}
                        <ToolTip props={documentToolTipsData[1]} />
                        {docfileerrorMessage2 !== null && docfileerrorMessage2.length > 0 ? (
                          <div className="error-msg">{docfileerrorMessage2}</div>
                        ) : null}
                      </div>
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            {documentmodelNew && documentmodelNew.document[1] && documentmodelNew.document[1].id === 0 ? (
                              <div
                                className="myfileupload-buttonbar"
                                key={new Date().toString()}
                              >

                                <Button
                                  disabled={secondUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={secondUploadLoading}
                                >
                                  <img src={UploadIcon} />
                                  <input
                                    disabled={secondUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    value={seconddocumentTypeAutoComplete}
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    onChange={(e) => onFileSecondChange(e)}
                                    className="inputdata"
                                  />
                                </Button>
                                {secondfileNameShow ? (
                                  <label className="myui-button ">
                                    <span className="file-name">{fileSecondName}</span>
                                  </label>
                                ) : null}

                              </div>
                            ) : (
                              <div className="file-name-delete">
                                <a
                                  className="pdf-btn"
                                  // href={documentmodelNew.document[0].document}
                                  target="_blank"
                                >
                                  <img
                                    src={Document}
                                    alt="img"
                                    className="doc-img"
                                  />
                                  <p>
                                  {documentmodelNew && documentmodelNew.document[1] && documentmodelNew.document[1].document
                                      .split("/")
                                      .pop()}
                                  </p>
                                </a>

                                <button
                                  className="delete-doc"
                                  hidden={readonly}
                                  title="Delete"
                                >
                                  <i
                                    className="pi pi-trash"
                                    onClick={(e) =>
                                      onDeleteHandleClick(
                                        documentmodelNew.document[1]
                                      )
                                    }
                                  ></i>
                                </button>

                                <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[1].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                              </div>
                            )}
                          </div>

                          {/* {seconddocfileerrorMessage !== null &&
                            seconddocfileerrorMessage.length > 0 ? (
                            <span className="error-msg">{seconddocfileerrorMessage}</span>
                          ) : null}
                          {docfileerrorMessage1 !== null &&
                            docfileerrorMessage1.length > 0 ? (
                            <span className="error-msg">{docfileerrorMessage1}</span>


                          ) : null} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className=" form-group first-document-upload doc-upload-section">
                        <span className="input-label" >Certificate of Incumbency</span>
                        <span className="color-red" >*</span>{" "}
                        <ToolTip props={documentToolTipsData[2]} />
                        {docfileerrorMessage3 !== null &&
                          docfileerrorMessage3.length > 0 ? (
                          <span className="error-msg">{docfileerrorMessage3}</span>
                        ) : null}
                      </div>
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            {documentmodelNew.document[2].id === 0 ? (
                              <div
                                className="myfileupload-buttonbar"
                                key={new Date().toString()}
                              >

                                <Button

                                  disabled={thirdUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={thirdUploadLoading}
                                >
                                  <img src={UploadIcon} />



                                  <input
                                    disabled={thirdUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    onChange={(e) => onFileThreeChange(e)}
                                    className="inputdata"
                                  />
                                </Button>
                                {thirdfileNameShow ? (
                                  <label className="myui-button ">
                                    <span className="file-name">{fileThirdName}</span>
                                  </label>
                                ) : null}

                              </div>
                            ) : (
                              <div className="file-name-delete">
                                <a
                                  // href={documentmodelNew.document[0].document}
                                  target="_blank"
                                  className="pdf-btn"
                                >
                                  {/* <img src={Document} alt="img" className="" /> */}

                                  <img
                                    src={Document}
                                    alt="img"
                                    className="doc-img"
                                  />

                                  <p>
                                    {" "}
                                    {documentmodelNew && documentmodelNew.document[2] &&   documentmodelNew.document[2].document
                                      .split("/")
                                      .pop()}
                                  </p>

                                </a>

                                {/* {updateBtnShow ? */}
                                {/* <button className="delete-doc upldoc" title="Delete"> */}
                                <button
                                  className="delete-doc"
                                  hidden={readonly}
                                  title="Delete"
                                >

                                  <i
                                    className="pi pi-trash"
                                    onClick={(e) =>
                                      onDeleteHandleClick(
                                        documentmodelNew.document[2]
                                      )
                                    }
                                  ></i>
                                </button>
                                {/* : */}
                                <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[2].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                                {/* // } */}
                              </div>
                            )}
                          </div>

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className=" form-group first-document-upload doc-upload-section">
                        <span className="input-label" >Excerpts from the Register</span>
                        <span className="color-red" >*</span>{" "}
                        <ToolTip props={documentToolTipsData[3]} />
                        {docfileerrorMessage4 !== null && docfileerrorMessage4.length > 0 ? (
                          <div className="error-msg" style={{ marginTop: "-700px", display: 'block' }}>{docfileerrorMessage4}</div>
                        ) : null}


                      </div>
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            {documentmodelNew.document[3].id === 0 ? (
                              <div
                                className="myfileupload-buttonbar"
                                key={new Date().toString()}
                              >

                                <Button

                                  disabled={fourthUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={fourthUploadLoading}
                                >
                                  <img src={UploadIcon} />
                                  <input
                                    disabled={fourthUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    onChange={(e) => onFileFourChange(e)}
                                    className="inputdata"
                                  />
                                </Button>
                                {fourthNameShow ? (
                                  <label className="myui-button ">
                                    <span className="file-name">{fileFourthName}</span>
                                  </label>
                                ) : null}
                              </div>
                            ) : (
                              <div className="file-name-delete">
                                <a
                                  // href={documentmodelNew.document[0].document}
                                  target="_blank"
                                  className="pdf-btn"
                                >
                                  <img src={Document} alt="img" className="" />
                                  <p>
                                    {" "}
                                    {documentmodelNew && documentmodelNew.document[3] &&  documentmodelNew.document[3].document
                                      .split("/")
                                      .pop()}
                                  </p>

                                </a>

                                {/* {updateBtnShow ? */}
                                {/* <button className="delete-doc upldoc" title="Delete"> */}
                                <button
                                  className="delete-doc"
                                  hidden={readonly}
                                  title="Delete"
                                >

                                  <i
                                    className="pi pi-trash"
                                    onClick={(e) =>
                                      onDeleteHandleClick(
                                        documentmodelNew.document[3]
                                      )
                                    }
                                  ></i>
                                </button>
                                {/* : */}

                                <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[3].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                                {/* } */}
                              </div>
                            )}
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>

                <div className="row " >
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className=" form-group first-document-upload doc-upload-section">
                        <span className="input-label" >List of directors or board members</span>
                        <ToolTip props={documentToolTipsData[5]} />
                        {docfileerrorMessage5 !== null &&
                          docfileerrorMessage5.length > 0 ? (
                          <span className="error-msg">{docfileerrorMessage5}</span>
                        ) : null}
                      </div>
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            {documentmodelNew.document[4].id === 0 ? (
                              <div
                                className="myfileupload-buttonbar"
                                key={new Date().toString()}
                              >

                                <Button
                                  disabled={fifthUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={fifthUploadLoading}
                                >
                                  <img src={UploadIcon} />
                                  <input
                                    disabled={fifthUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    value={fivedocumentTypeAutoComplete}
                                    onChange={(e) => onFileFiveChange(e)}
                                    className="inputdata"
                                  />
                                </Button>

                                {fivefileNameShow ? (
                                  <label className="myui-button ">
                                    <span className="file-name">{fifthName}</span>
                                  </label>
                                ) : null}
                              </div>
                            ) : (
                              <div className="file-name-delete">
                               
                                  <a
                                    // href={documentmodelNew.document[0].document}
                                    target="_blank"
                                    className="pdf-btn"
                                  >
                                    <img src={Document} alt="img" className="" />
                                    <p>
                                      {" "}
                                      {documentmodelNew && documentmodelNew.document[4] &&   documentmodelNew.document[4].document
                                        .split("/")
                                        .pop()}
                                    </p>

                                  </a>
                            

                                
                                  <>
                                    {/* <button className="delete-doc upldoc" title="Delete" > */}
                                    <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[4].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>

                                  </>
                              
                                
                                  <>
                                    <button className="delete-doc upldoc" title="Download" style={{ marginLeft: "10px" }}>
                                      <i
                                        className="pi pi-download"
                                        onClick={(e) =>
                                          downloadDocumentFile(
                                            documentmodelNew.document[4]
                                          )
                                        }
                                      ></i>
                                    </button>
                                  </>
                              
                              </div>
                            )}
                          </div>
                          {/* {fiveDocErrorMessage !== null &&
                            fiveDocErrorMessage.length > 0 ? (
                            <span className="error-msg">{fiveDocErrorMessage}</span>
                          ) : null} */}

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-md-12 form-group first-document-upload doc-upload-section">
                    <div className="col-md-6 info-section">
                      <div className=" form-group first-document-upload doc-upload-section">
                        <span className="input-label" >Certificate of Good Standing</span>

                        <ToolTip props={documentToolTipsData[6]} />
                        {docfileerrorMessage6 !== null &&
                          docfileerrorMessage6.length > 0 ? (
                          <span className="error-msg">{docfileerrorMessage6}</span>
                        ) : null}
                      </div>
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                            {documentmodelNew && documentmodelNew.document[5].id === 0 ? (
                              <div
                                className="myfileupload-buttonbar"
                                key={new Date().toString()}
                              >

                                <Button
                                  disabled={sixthUploadLoading ? true : false}
                                  className="document-upload"
                                  loading={sixthUploadLoading}
                                >
                                  <img src={UploadIcon} />
                                  <input
                                    disabled={sixthUploadLoading ? true : false}
                                    ref={inputRef}
                                    id="FileUpload1"
                                    name="Name"
                                    accept=".pdf, .tiff, .tif"
                                    type="file"
                                    multiple
                                    value={sixdocumentTypeAutoComplete}
                                    onChange={(e) => onFileSixChange(e)}
                                    className="inputdata"
                                  />
                                </Button>
                                {sixfileNameShow ? (
                                  <label className="myui-button ">
                                    <span className="file-name">{sixthName}</span>
                                  </label>
                                ) : null}
                              </div>
                            ) : (
                              <div className="file-name-delete">
                                <a
                                  // href={documentmodelNew.document[0].document}
                                  target="_blank"
                                  className="pdf-btn"
                                >
                                  <img src={Document} alt="img" className="" />
                                  <p>
                                    {" "}
                                    {documentmodelNew && documentmodelNew.document[5] &&   documentmodelNew.document[5].document
                                      .split("/")
                                      .pop()}
                                  </p>
                                </a>
                               
                                  <>
                                  <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[5].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                                  </>
                                
                                <button className="delete-doc upldoc" title="Download" style={{ marginLeft: "10px" }}>
                                  <i
                                    className="pi pi-download"
                                    onClick={(e) =>
                                      downloadDocumentFile(
                                        documentmodelNew.document[5]
                                      )
                                    }
                                  ></i>
                                </button>
                              </div>
                            )}
                          </div>
                          {/* {sixDocErrorMessage !== null &&
                            sixDocErrorMessage.length > 0 ? (
                            <span className="error-msg">{sixDocErrorMessage}</span>
                          ) : null} */}

                        </div>

                      </div>
                    </div>
                  </div>
                </div>
                {!readonly || companyType !== "Public Company" ? (
                  <div className="row ">
                    <div className="col-md-12 form-group first-document-upload doc-upload-section">
                      <div className="col-md-6 info-section">
                        <div className=" form-group first-document-upload doc-upload-section">
                          <span className="input-label" >Government-issued ID</span>

                          <ToolTip props={documentToolTipsData[4]} />
                          {docfileerrorMessage7 !== null &&
                            docfileerrorMessage7.length > 0 ? (
                            <span className="error-msg">{docfileerrorMessage7}</span>
                          ) : null}
                        </div>
                        <div className="col-md-6 info-section">
                          <div className=" form-group first-document-upload doc-upload-section">
                            <div id="fileupload" style={{ marginLeft: '250px', marginTop: "-50px" }}>
                              {documentmodelNew.document[6].id === 0 ? (
                                <div
                                  className="myfileupload-buttonbar"
                                  key={new Date().toString()}
                                >

                                  <Button
                                    disabled={seventhUploadLoading ? true : false}
                                    className="document-upload"
                                    loading={seventhUploadLoading}
                                  >
                                    <img src={UploadIcon} />
                                    <input
                                      // disabled={seventhUploadLoading ? true : false}

                                      // disabled={seventhUploadLoading ? true : false}
                                      ref={inputRef}
                                      id="FileUpload1"
                                      name="Name"
                                      accept=".pdf, .tiff, .tif"
                                      type="file"
                                      multiple
                                      onChange={(e) => onFileSevenChange(e)}
                                      className="inputdata"
                                    />
                                  </Button>
                                  {sevenfileNameShow ? (
                                    <label className="myui-button ">
                                      <span className="file-name">{seventhName}</span>
                                    </label>
                                  ) : null}
                                </div>
                              ) : (
                                <div className="file-name-delete">
                                  <a
                                    // href={documentmodelNew.document[0].document}
                                    target="_blank"
                                    className="pdf-btn"
                                  >
                                    <img src={Document} alt="img" className="" />
                                    <p>
                                      {" "}
                                      {documentmodelNew && documentmodelNew.document[6] &&   documentmodelNew.document[6].document
                                        .split("/")
                                        .pop()}
                                    </p>

                                  </a>
                                  <button className="delete-doc upldoc" title="Delete" hidden={readonly}>
                                    <i
                                      className="pi pi-trash"
                                      onClick={(e) =>
                                        onDeleteHandleClick(
                                          documentmodelNew.document[6]
                                        )
                                      }
                                    ></i>
                                  </button>
                                  <button   className="delete-doc upldoc"   
                                title="Download"  
                                 style={{ marginLeft: "10px" }} 
                                   onClick={() => { 
                                    window.open(documentmodelNew.document[6].document, '_blank'); 
                                    }} > 
                                       <i className="pi pi-download">
                                        </i></button>
                                </div>
                              )}
                            </div>
                            {/* {sevenDocErrorMessage !== null &&
                              sevenDocErrorMessage.length > 0 ? (
                              <span className="error-msg">{sevenDocErrorMessage}</span>
                            ) : null} */}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="button-section">
                <div className="bottom-btns">
                  <Button
                    type="button"
                    disabled={firstUploadLoading ? true : secondUploadLoading ? true : false}

                    label="Back"
                    loading={backButtonLoading}
                    className="btn btn-back second-btn"
                    onClick={onBackClick}
                  />
                  <>
                    <button
                      type="button"
                      className="btn btn-cancel  second-btn"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    {updateBtnShow ? (
                      <Button
                        // disabled={firstUploadLoading ? true : secondUploadLoading ? true : false}
                        iconPos="left"
                        loading={buttonLoading}
                        label="Save and Continue"
                        className="btn btn-continue  second-btn"
                        onClick={
                          documentmodelNew.id === 0 ? onAddClick : onUpdateClick
                        }
                      />
                    ) : (

                      <Button
                        // disabled={firstUploadLoading ? true : secondUploadLoading ? true : false}

                        type="button"
                        loading={buttonLoadingSkip}
                        onClick={onNextClick}
                        className="btn btn-continue  btn-next second-btn"
                      >
                        Next
                      </Button>
                    )}
                  </>
                </div>
              </div>

              {displaydeletepopup ? (
                <div className="popup-body">
                  <div className="register-popup Payment-screen">
                    <div className="text-center ">
                      <div className="awesome-text">
                        <h4>
                          <i className="pi pi-info-circle"></i> Are you sure you
                          want to Delete?
                        </h4>
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
            </div>
          </div>
          {/* </div> */}
          <br />  <br />  <br />  <br />  <br />
        </Scrollbars>
      )}
    </>
  );
};
export default Documents;


































