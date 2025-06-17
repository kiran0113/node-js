import React from "react";

const isFacilitator1 = (sessionStorage.getItem("isFacilitator"));
const Dashboard: React.FC = () => {
  return (
    <>
      {" "}
      <div>
        <div className="wrapper dashboard">
          {/* <Toast ref={toast}></Toast> */}
          
              <div className="heading-section">
                <span className="text-header-purple">
                  Dashboard
                </span>

              </div>
            </div>
        
      </div>{" "}
    </>
  );
};

export default Dashboard;
