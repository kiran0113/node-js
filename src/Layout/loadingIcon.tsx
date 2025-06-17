import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

const LoadinIcon: React.FC<any> = ({ onSaveAndContinueClick }) => {
  
  return (
    <>
      {" "}
      <div className="spinner-class">
        <ProgressSpinner />
      </div>
    </>
  );
};

export default LoadinIcon;
