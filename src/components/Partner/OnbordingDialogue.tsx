
import group from "../../assets/images/Group.png"
import line from "../../assets/images/Line 122.svg"
import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import Sidebar from "../../Layout/Sidebar";
import { Toast } from "primereact/toast";
import Header from "../../Layout/Header";
import { ProgressSpinner } from "primereact/progressspinner";
import { PartnershipDetailsService } from "../../services/Partner/PartnershipDetails/PartnershipDetailsService";
import { PartnerStatusUpdateService } from "../../services/Partner/PartnerStatusUpdate/PartnerStatusUpdateService";
import "./Common.css"
import { Logout } from "../../utils/AccountUtils";

const OnboardingDialogue: React.FC<any> = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<any>(sessionStorage.getItem('OnboardingStatus'));
    const [value, setValue] = useState(parseInt(status));
    const [role, setRole] = useState<any>();
    const [loading, setLoading] = useState(false);
    const {partnerid} = useParams();
    const [buttonLoading, setButtonLoading] = useState(false);
    const toast = useRef<Toast>(null);
    const onHideClick = () => {


    };
    useEffect(() => {
        getPartnershipDetailsByPartnerId();
        //getCurrenciesByPartnerId();
    }, []);

    const getPartnershipDetailsByPartnerId = () => {
        setLoading(true);
        PartnershipDetailsService.getPartnershipDetailsByPartnerId(
            Number(partnerid)
        )
            .then((response) => {
                const data = response.data;
                setRole(data.partnerPaymentRole);

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
                        summary: "Error while getting partnership details Role.",
                        life: 3000,
                    });
                }
                //setLoading(false);
            });
    };
    const onSetStateReady = () => {


        setButtonLoading(true);
        PartnerStatusUpdateService.updatestatus()
            .then((response: any) => {
                setButtonLoading(false);
                sessionStorage.setItem("OnboardingStatus", "8");

                navigate('/partner');
            })
            .catch((error) => {
                setButtonLoading(false);
            });

    }

    return (
        <>
            {loading ? (
                <div className="spinner-class">
                    <ProgressSpinner />
                </div>
            ) : (
                <div>
                 
                    <div className="wrapper">
                        {/* <Toast ref={toast}></Toast> */}
                        <div className="togle-button">
                            <Sidebar />
                            <div id="content">
                                <Header />
                                {value != 7 ? (<>
                                    <Dialog
                                        visible={true}
                                        className="popup-screen review-screen"
                                        onHide={onHideClick}
                                    >
                                        <div className="text-center  ">
                                            <img src={group} alt="img" className="popup-img" />{" "}
                                            {value === 2 ? (<><p className="awesome-text" >
                                                Your application is being <b style={{ color: "orange" }}>reviewed</b> <br />
                                                by our compliance team
                                            </p></>) : (<>
                                                {value === 5 ? (<>
                                                    <p className="awesome-text " style={{ color: 'red' }}>
                                                        Your application is <b style={{ color: "red" }}>rejected</b> <br />
                                                        by our compliance team
                                                    </p></>) : (<>
                                                        {value === 4 ? (<> <p className="awesome-text " style={{ color: 'green' }}>
                                                            Your application is <b style={{ color: "green" }}>approved</b> <br />
                                                            by our compliance team
                                                        </p></>) : (<></>)}
                                                    </>)}

                                            </>)}


                                        </div>
                                        {value === 2 ? (<>  <p className="text-center">
                                            "It takes less time to do<br /> things right, than to explain <br />why you did it wrong".<br />
                                            - Henry Wadsworth
                                            <br />

                                        </p>
                                            <Button
                                                iconPos="left"
                                                label="Ok"
                                                className="btn btn-register-ok"
                                                onClick={() => Logout(navigate)}
                                            /></>) : (<>
                                                {value === 4 ? (<> <div className="text-center">
                                                    <p> Congratulations! Your Instarails </p>
                                                    <p> account has been approved!</p>
                                                    <p> You can now follow these steps </p>
                                                    <p> to complete your account settings. </p>

                                                </div>
                                                    <Button
                                                        iconPos="left"
                                                        label="Ok"
                                                        className="btn btn-register-ok"
                                                        onClick={() => navigate("/payment")}
                                                    />
                                                </>) : (<>
                                                    {value === 5 ? (<>



                                                        <Button
                                                            iconPos="left"
                                                            label="Ok"
                                                            className="btn  btn-register-ok"
                                                            onClick={() => Logout(navigate)}
                                                        />
                                                    </>) : (<></>)}
                                                </>)}

                                            </>)}

                                    </Dialog>
                                </>) : (<>
                                    {value === 7 ? (<>
                                        <Dialog
                                            visible={true}
                                            className="popup-screen review-screen"
                                            onHide={onHideClick}
                                        >

                                            {role === 1 ? (<>
                                                <div className="text-center">
                                                    <p className="awesome-text"> You are incredible! </p>
                                                    <p> You have almost completed setting up your account.</p>
                                                    <p> Go ahead and deposit funds to get ready to send transactions </p>
                                                    <p> Please come back here to view your balance and <br />
                                                        transaction details or update your profile settings.</p>

                                                </div>
                                                <Button
                                                    iconPos="left"
                                                    label="Ok"
                                                    loading={buttonLoading}
                                                    className="btn btn-register-ok"
                                                    onClick={() => onSetStateReady()}
                                                />
                                            </>) : (<>
                                                {role === 2 ? (<><div className="text-center">
                                                    <p className="awesome-text"> You are incredible! </p>
                                                    <p> You have completed setting up your account,woo hoo!</p>
                                                    <p> You are all set to start receiving payments ('$') from our <br />customers</p>
                                                    <p> Please come back here to view your transaction details <br />or update your profile settings. </p>

                                                </div>
                                                    <Button
                                                        iconPos="left"
                                                        label="Ok"
                                                        loading={buttonLoading}
                                                        className="btn btn-register-ok"
                                                        onClick={() => onSetStateReady()}
                                                    /></>) : (<>
                                                        {role === 3 ? (<><div className="text-center">
                                                            <p className="awesome-text"> You are incredible! </p>
                                                            <p> You have almost completed setting up your account.</p>
                                                            <p> Go ahead and deposit funds to get ready to send transactions </p>
                                                            <p> You are all set to start receiving payments ('$') from our customers.</p>
                                                            <p> Please come back here to view your balance and transaction details or update your profile settings. </p>
                                                        </div>
                                                            <Button
                                                                iconPos="left"
                                                                label="Ok"
                                                                loading={buttonLoading}
                                                                className="btn btn-register-ok"
                                                                onClick={() => onSetStateReady()}
                                                            /></>) : (<></>)}
                                                    </>)}
                                            </>)}

                                        </Dialog>
                                    </>) : (<></>)}
                                </>)}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};
export default OnboardingDialogue;

function useParams(): { partnerid: any; } {
    throw new Error("Function not implemented.");
}
