import React from "react";



const UpdatePopup = () =>{

    return (
        <>
        <div className="popup-body">
            <div className="register-popup Payment-screen">
              <div className="text-center ">
                <div className="awesome-text">
                  <h4>Are you sure you want to cancel?</h4>
                  <p> All unsaved changes will be lost.</p>
                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                  className="btn btn-cancel second-btn "
                //   onClick={OnPopupClose}
                >
                  {" "}
                  No
                </button>
                <button
                  className="btn btn-continue second-btn yes-btn-popup"
                //   onClick={OnPopupOk}
                >
                  {" "}
                  Yes
                </button>
              </div>
            </div>
          </div>
        </>
    )
};

export  default UpdatePopup;
