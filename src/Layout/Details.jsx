import { Toast } from "primereact/toast";
import React, { useState } from "react";
import Address from "../components/Partner/Address/Address";
import BasicInfo from "../components/Partner/BasicInfo/BasicInfo";
import Contact from "../components/Partner/Contact/Contact";
import Documents from "../components/Partner/Documents/Documents";
import PersonalDetails from "../components/Partner/PersonalDetails/PersonalDetails";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Tabcontent from "./Tabcontent";
import "./Tabcontent.css";

const Details = () => {
  return (
    <>
      {" "}
      <div className="right-tab-section">
        <div className="heading-section">
          <span className="text-header-purple">
          View Business Account
                    </span>
        </div>
        <Tabcontent />
      </div>
    </>
  );
};
export default Details;
