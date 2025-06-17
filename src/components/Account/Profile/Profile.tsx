import { TabPanel, TabView } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import Header from "../../../Layout/Header";
import Sidebar from "../../../Layout/Sidebar";
import { Logout } from "../../../utils/AccountUtils";
import ChangePassword from "./ChangePassword";
import ProfileDetails from "./ProfileDetails";

const Profile: React.FC<any> = () => {
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
    const [status, setstatus] = useState(
        sessionStorage.getItem("OnboardingStatus")
    );
    const parentFunction = (num: number) => {
        setIndex(num);
    };

    const onTabChange = (e: any) => {
        setIndex(e.index);
    };

    useEffect(() => {
        const useroobj: any = sessionStorage.getItem("User");

        if (useroobj === null || useroobj === undefined) {
            Logout(navigate);
        }
        setstatus(sessionStorage.getItem("OnboardingStatus"));
    }, []);

    return (
        <>
            <div
                className="wrapper dashboard profile-main-div"
              
            >
                <div className="togle-button">
                    <Sidebar />
                    <div id="content">
                        <Header pageName="Profile" />
                        <div className="  Admintab-main ">
                            <div className="container-fluid ">
                                {Number(status) < 2 ? (
                                    <>
                                        <TabView>
                                            <TabPanel header="Account Details">
                                                <ChangePassword />
                                            </TabPanel>
                                        </TabView>
                                    </>
                                ) : (
                                    <>
                                        <TabView
                                            activeIndex={index}
                                            onTabChange={(e) => onTabChange(e)}
                                        >
                                            <TabPanel header="Profile Details">
                                                <ProfileDetails parentFunction={parentFunction} />
                                            </TabPanel>

                                            <TabPanel header="Account Details">
                                                <ChangePassword />
                                            </TabPanel>
                                        </TabView>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
