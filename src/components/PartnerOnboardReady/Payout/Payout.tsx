import React from "react";
import profileimg from "../assets/images/profile-img.png";
import notification from "../assets/images/notification-img.png";
import Sidebar from "../../../Layout/Sidebar";
import Header from "../../../Layout/Header";

const Payout: React.FC = () => {
    return (
        <>
            {" "}
            <div>
                <div className="wrapper dashboard">
                    {/* <Toast ref={toast}></Toast> */}
                    <div className="togle-button">
                        <Sidebar />
                        <div id="content">
                        <Header pageName="Payout"/>
                            <div className="heading-section">
                                <span className="text-header-purple">
                                    Payout
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>{" "}
        </>
    );
};

export default Payout;
