import { ProgressSpinner } from "primereact/progressspinner";
import { TabPanel, TabView } from "primereact/tabview";
import { Toast } from "primereact/toast";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PartnershipDetailsService } from "../../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { Logout } from "../../../utils/AccountUtils";

import ReceiveFees from "./FeesTabs/ReceiveFees";
import SendFees from "./FeesTabs/SendFees";

import { getTabActiveIndex } from "../../../utils/utils";
import { Button } from "primereact/button";
import AddFacilitatorFee from "../Facilitator/AddFacilitatorFee";
import AddFacilitator from "../Facilitator/AddFacilitator";
import sessionStorageContext from "../../context/LocalStorageContext";
const Fees: React.FC<any> = ({ onSaveAndContinueClick, setButtonLoadingSkip, buttonLoadingSkip}) => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [partnerPaymentRole, setPartnerPaymentRole] = useState(0);
  const [backbuttonloading , setBackButtonLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const { partnerid, type } = useParams();
  const [partnerDeliveryType, setPartnerDeliveryType] = useState([]);
  const [receiverBackButtonValue, setReceiverBackButtonValue] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [partnerType, setPartnerType] = useState([]);
  const onboardStatus = sessionStorage.getItem("onboardStatus");
const [feesNextLoadind, setFeesNextLoadind] = useState(false)
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const context = useContext(sessionStorageContext);
  const [isfacilitator, setFacilitator] = useState(context.Isfacilitator);
  const [index, setIndex] = useState(0);

  const getPartnershipDetailsByPartnerId = () => {
    // setLoading(true);
    PartnershipDetailsService.getPartnershipDetailsByPartnerId(
      Number(partnerid)
    )
      .then((response) => {
        const data = response.data;
        const index = getTabActiveIndex(
          data.partnerPaymentRole,
          data.partnerTypes,
        );

        if (data.partnerPaymentRole === 2) {
          setActiveIndex(1);
        } else {
          setActiveIndex(0);
        }
        setPartnerPaymentRole(data.partnerPaymentRole);
        setPartnerDeliveryType(data.partnerDeliveryType);
        setPartnerType(data.partnerTypes);
        // setLoading(false);


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
        // setLoading(false);
      });
  };



  const receiverBackButton=(value:boolean)=>{
    setReceiverBackButtonValue(value);
  }
  
  useEffect(()=>{
  },[receiverBackButtonValue]);

  useEffect(() => {

    // Update the document title using the browser API
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate);
    }
    getPartnershipDetailsByPartnerId();

    setFacilitator(context.Isfacilitator);
  }, []);

  const onTabChange = (partnerPaymentRole: any) => {
    setActiveIndex(partnerPaymentRole.index);
  };

  const onFacilitatorTabChange = (e: any) => {
    setIndex(e.index);
  };

  const onFeesBack = () =>{
    setBackButtonLoading(true);
    
    setTimeout(() => {
      onSaveAndContinueClick('B')
    },500)  
  }
  const onNextClick = () => {
    setFeesNextLoadind(true)
    setTimeout(() => {  navigate(`/admin/partner/admin/${partnerid}`)},1000)
  
  }

  return (
    <>
      {isfacilitator === false ? (<>
        {/* {loading ? (
          <div className="spinner-class">
            <ProgressSpinner />
          </div>
        ) : ( */}
          <div className="payment-screen fees-screen">
            <div className="tabview-demo">
              <TabView
                onTabChange={(e) => onTabChange(e)}
                activeIndex={activeIndex}
              >
                {partnerPaymentRole === 1 || partnerPaymentRole === 3 ? (
                  <TabPanel header="Send">
                    <SendFees partnerType={partnerType} partnerPaymentRole={partnerPaymentRole} onSaveAndContinueClick={onSaveAndContinueClick} setActiveIndex={setActiveIndex} 
                       receiverBackButtonValue={receiverBackButtonValue} receiverBackButton={receiverBackButton} key={new Date().setDate(new Date().getDate() + 1).toString()}/>
                  </TabPanel>
                ) : (
                  <TabPanel header="Send" disabled>
                    <SendFees onSaveAndContinueClick={onSaveAndContinueClick} partnerPaymentRole={partnerPaymentRole} setActiveIndex={setActiveIndex} 
                       receiverBackButtonValue={receiverBackButtonValue} receiverBackButton={receiverBackButton} key={new Date().setDate(new Date().getDate() + 2).toString()}/>
                  </TabPanel>
                )}
                {partnerPaymentRole === 2 || partnerPaymentRole === 3 ? (
                  <TabPanel header="Receive">
                    <ReceiveFees
                      partnerDeliveryType={partnerDeliveryType} partnerPaymentRole={partnerPaymentRole}
                      partnerType={partnerType} onSaveAndContinueClick={onSaveAndContinueClick}
                      setActiveIndex={setActiveIndex}
                      receiverBackButtonValue={receiverBackButtonValue} receiverBackButton={receiverBackButton} key={new Date().setDate(new Date().getDate() + 3).toString()}
                    />
                  </TabPanel>
                ) : (
                  <TabPanel header="Receive" disabled>
                    <ReceiveFees
                      partnerDeliveryType={partnerDeliveryType} partnerPaymentRole={partnerPaymentRole}
                      partnerType={partnerType} onSaveAndContinueClick={onSaveAndContinueClick}
                      setActiveIndex={setActiveIndex}
                      receiverBackButtonValue={receiverBackButtonValue} receiverBackButton={receiverBackButton} key={new Date().setDate(new Date().getDate() + 4).toString()}
                    />
                  </TabPanel>
                )}


              </TabView>
            </div>
          </div>
        {/* )} */}
      </>) : (<>
        {/* {loading ? (
          <div className="spinner-class">
            <ProgressSpinner />
          </div> ) : ( */}
        <div className="row payment-section fees-next">
          <div className="user-heading">
            <div className="col-md-6"></div>
            <div className="col-md-6 send-btn">   
           

            {isfacilitator === true ? (
              <>
                <Button 
                  //  loading={backbuttonloading}
                    label="Back"
                        className="btn btn-back"
                       onClick={onFeesBack}
                    />
                <Button
                  // loading={feesNextLoadind}
                  label="Next"
                  className="btn btn-continue"
                  onClick={onNextClick}
                />
              </>

            ) : null}
            </div>

          </div>



          <TabView
            activeIndex={index}
            onTabChange={(e) => onFacilitatorTabChange(e)}
          >
            <TabPanel header="Facilitator Fees">
              <AddFacilitatorFee />
            </TabPanel>

            <TabPanel header="Add Partner" >
              <AddFacilitator />
            </TabPanel>
          </TabView>
        </div>
        {/* )
            } */}

      </>)}
    </>
  );
};

export default Fees;