import React, { useRef, useState,useEffect } from "react";

import profileimg from "../assets/images/profile-img.png";
import notification from "../assets/images/notification-img.png";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";

const PaymentInfo: React.FC = () => {
  
    return (
        <>
            {" "}
            <div>
                <div className="wrapper dashboard">
                    {/* <Toast ref={toast}></Toast> */}
                    <div className="togle-button">
                        <Sidebar />
                        <div id="content">
                            <Header pageName="Payment"/>
                            <div className="heading-section">
                                <span className="text-header-purple">
                                    Payment
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>{" "}
        </>
    );
};

export default PaymentInfo;
