import { TabPanel, TabView } from "primereact/tabview";
import React, { useContext, useEffect, useRef, useState } from "react";
import UserManagement from "../Partner/UserManagement/UserManagement";
import AdminDashboard from "./AdminDashboard";
import Approve from "./Approve";
import InstrailsLink from "./InstrailsFees";
import FxRateLink from "./FxRate";
import Facilitator from "./Facilitator";
import DeveloperResources from "./DeveloperResources";
import Deposit from "./Deposit";
import { Toast } from "primereact/toast";
import { PartnershipDetailsService } from "../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { Logout } from "../../utils/AccountUtils";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { CommonService } from "../../services/Common/CommonService";
import { BasicInfoService } from "../../services/Partner/BasicInfo/BasicInfoService";
import Scrollbars from "react-custom-scrollbars-2";
import LoadinIcon from "../../Layout/loadingIcon";
import sessionStorageContext from "../context/LocalStorageContext";
// import Transactions from "../Partner/Transactions/Transactions";
import Documents from "../Partner/Documents/Documents";
// import OwnershipDetails from "../Partner/Compliance/OwnershipDetails";
import SanctionsProgram from "../Partner/Compliance/SanctionsProgram";
import KYCDetails from "../Partner/Compliance/KYCDetails";
import MonitoringSanctionProgram from "../Partner/Compliance/MonitoringSanctionProgram";
import TrainingProgram from "../Partner/Compliance/TrainingProgram";
import Signature from "../Partner/Compliance/Signature";
import OwnershipDetails from "../Partner/Compliance/OwnershipDetails";

const ComplianceTab: React.FC<any> = ({ onSaveAndContinueClick, onNextClick, onButtonChange, onBackButtonChange, setButtonLoadingSkip, buttonLoadingSkip }) => {
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [logoLoading, setlOGOLoading] = useState(false);
  const [role, setRole] = useState();
  const [isfacilitator, setIsFacilitator] = useState();
  const [logoUrl, setlogoUrl] = useState("");
  const [, setPartnerLegalName] = useState("");
  const [dba, setDbaName] = useState("");
  const [logodisplay, setlogodisplay] = useState(false);
  const { partnerid, type } = useParams();
  const context = useContext(sessionStorageContext);
  const onboardStatus = sessionStorage.getItem("onboardStatus");

  const [openPage1, setOpenPage1] = useState(true);
  const [openPage2, setOpenPage2] = useState(true);


  return (
    <>
      <div className="partner-profile-logo">
        <div className="Admintab-main" >
          <div className="tab-logo-wrapper">
            <TabView className="main-tab" >
              <TabPanel header="Documents">
                <Documents
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}
                />
              </TabPanel>
              <TabPanel header="Wolfsberg Group Financial Crime Compliance Questionnaire">

                {/* <Signature
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}  
                /> */}


                {/* <TrainingProgram
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}  
                /> */}

                {/* <MonitoringSanctionProgram
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}  
                /> */}

                {/* <KYCDetails
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}  
                /> */}

                
                <OwnershipDetails
                  onSaveAndContinueClick={onSaveAndContinueClick}
                  onNextClick={onNextClick}
                  onButtonChange={onButtonChange}
                  onBackButtonChange={onBackButtonChange}
                  setButtonLoadingSkip={setButtonLoadingSkip}
                  buttonLoadingSkip={buttonLoadingSkip}  
                />

              
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>



    </>
  );
};
export default ComplianceTab;
