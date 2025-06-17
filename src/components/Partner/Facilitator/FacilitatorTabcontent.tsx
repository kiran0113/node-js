import { TabPanel, TabView } from "primereact/tabview";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { Logout } from "../../../utils/AccountUtils";
import AddFacilitatorFee from "./AddFacilitatorFee";
import AddFacilitator from "./AddFacilitator";
import Scrollbars from "react-custom-scrollbars-2";

const FacilitatorTabContent: React.FC<any> = () => {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);

    const [status, setstatus] = useState(
        sessionStorage.getItem("OnboardingStatus")
    );

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


            <div className="right-tab-section">
                <div className="container-fluid  facilitator-screen">
                    <>
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
                        <TabView
                            activeIndex={index}
                            onTabChange={(e) => onTabChange(e)}
                            >
                            <TabPanel header="Facilitator Fees">
                                <AddFacilitatorFee />
                            </TabPanel>

                            <TabPanel header="Add Partner">
                                <AddFacilitator />
                            </TabPanel>
                        </TabView>
                        </Scrollbars>
                    </>
                </div>
            </div>


        </>
    );
};

export default FacilitatorTabContent;
