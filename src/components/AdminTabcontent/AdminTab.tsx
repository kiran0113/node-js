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
import Transactions from "../Partner/Transactions/Transactions";
import Report from "../Partner/Report/Report";

const AdminTab: React.FC<any> = () => {
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
  sessionStorage.setItem("isfacilitator", isfacilitator);
  const getBasicInfoByPartnerId = (id: number) => {
    setLoading(true)
    setlOGOLoading(true);
    BasicInfoService.getBasicInfoByPartnerId(Number(partnerid))
      .then((response: any) => {

        setlogoUrl(response.data.logoUrl);
        setDbaName(response.data.dba)
        setPartnerLegalName(response.data.legalName)
        sessionStorage.setItem("PartnerProfileLogo", response.data.logoUrl)
        sessionStorage.setItem("PartnerLegalName", response.data.legalName)
        sessionStorage.setItem("partnerDbaname", response.data.dba)
        sessionStorage.setItem("partnerPaymentID", response.data.roleName)
        sessionStorage.setItem("onboardStatus", response.data.onboardStatus)
        sessionStorage.setItem("PartnerRoleId", response.data.roleId)
        // sessionStorage.setIsFacilitator(response.data.isFacilitator);


        setlOGOLoading(false);
        setlogodisplay(true);

        if (logoUrl == null) {
          setlogodisplay(false);
        }
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
            summary: "Something went wrong",
            life: 3000,
          });
        }
      });
    setlOGOLoading(false);
  };

  const partnershipDetailsByPartnerId = (id: number) => {

    setLoading(true);
    PartnershipDetailsService.getPartnershipDetailsByPartnerId(id)
      .then((response) => {

        const data = response.data;
        setRole(data.partnerPaymentRole);
        setIsFacilitator(data.isFacilitator);
        context.updateFacilitator(data.isFacilitator);

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
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Error while getting partnership details.",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }

    partnershipDetailsByPartnerId(Number(partnerid));

    getBasicInfoByPartnerId(Number(partnerid));


  }, []);

  return (
    <>
      {loading ? (
        <LoadinIcon />
      ) : (
        <>
          <div className="partner-profile-logo">
            <div className="partner-logo-section">
              {logoUrl ? (
                <>
                  {logoLoading ? (
                    <div className="logo-loading">
                      <ProgressSpinner />
                    </div>
                  ) : (
                    <div className="admin-logo">

                   
                    <img src={logoUrl} className="partner-logo" alt="" />
                    </div>
                  )}
                </>
              ) : null}
            </div>
            <div className="Profile-link-text">

              <Link
                // target="_blank"
                className="profile-view"
                to={`../partnerdetails/${partnerid}/${"V"}`}
              >
                Profile{" "}
              </Link>
            </div>
          </div>

          <div className="Admintab-main">
            <div className="tab-logo-wrapper">
              <TabView className="main-tab">
                <TabPanel header="Dashboard">
                  <AdminDashboard />
                </TabPanel>
                {isfacilitator === false ? (
                  role === 1 || role === 3 ? (
                    <TabPanel header="Instarails Fees" className="main-tab">
                      <InstrailsLink />
                    </TabPanel>
                  ) : null
                ) : null}
                <TabPanel header="User Management" className="main-tab">
                  <UserManagement />
                </TabPanel>
                <TabPanel header="Approve" className="main-tab">
                  <Approve />
                </TabPanel>
                <TabPanel header="Facilitator" className="main-tab">
                  <Facilitator />
                </TabPanel>
                {isfacilitator === false ? (
                  role === 2 || role === 3 ? (
                    <TabPanel header="FxRate" className="main-tab">
                      <FxRateLink />
                    </TabPanel>
                  ) : null
                ) : null}

                {isfacilitator === false ? (
                  role === 1 || role === 2 || role === 3 ? (
                    <TabPanel header="Developer Support Hub">
                      <DeveloperResources />
                    </TabPanel>
                  ) : null
                ) : null}

                <TabPanel header="Wallet" className="main-tab">
                  <Deposit />
                </TabPanel>

                <TabPanel header="Transactions" className="main-tab">
                  <Transactions />
                </TabPanel>

                <TabPanel header="Report" className="main-tab">
                  <Report />
                </TabPanel>
              </TabView>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default AdminTab;
