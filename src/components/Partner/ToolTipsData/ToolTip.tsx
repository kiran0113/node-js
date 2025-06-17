import React from "react";
import requiredBlue from "../../../assets/images/required-blue.svg";


function ToolTip (props:any){




  return (
    <>
     
        <div className="tool-tip-info">  
        <img
                    src={requiredBlue}
                    alt="img"
                    className=" requiredBlue-img"
                  />
                  <div  className="custom-target-icon" dangerouslySetInnerHTML={{__html: props.props.Info}}></div>
        </div>


        {/* <div className="info-popupp">
         <div>
          <h4>{props.props.Info}</h4>
          <ul>
            <li>{props.props.li1}</li>
            <li>{props.props.li2}</li>
            <li>{props.props.li3}</li>
            <li>{props.props.li4}</li>
            <li>{props.props.li5}</li>
            <li>{props.props.li6}</li>
            <li>{props.props.li7}</li>
            <li>{props.props.li8}</li>
          </ul>
         </div>
        </div> */}

    </>
  );
};

export default ToolTip;


