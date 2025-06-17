import { useEffect, useRef, useState } from "react";
import React from "react";
import { Toast } from "primereact/toast";
import { FacilitatorService } from "../../services/Partner/Facilitator/FacilitatorService";
import { Logout } from "../../utils/AccountUtils";
import { useNavigate, useParams } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const Facilitator: React.FC = () => {
  const navigate = useNavigate();
  const { partnerid } = useParams();
  const [facilitatorList, setFacilitatorList] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      navigate("/");
    }
    getFacilitatorPartnerId(partnerid);
  }, []);

  const [facilitatormodel, setFacilitatorModel] = React.useState({
    partnerId: partnerid,
    legalname: "",
    userName: "",
  });

  const setModelEmpty = () => {
    setFacilitatorModel({
      partnerId: partnerid,
      legalname: "",
      userName: "",
    });
  };

  const getFacilitatorPartnerId = (val: any) => {
    setLoading(true);
    FacilitatorService.GetFacilitatorByPartnerId(val)
      .then((data) => {
        setFacilitatorList(data.data);
        setModelEmpty();
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.current?.show({
            severity: "error",
            summary: "Unauthorized",
            life: 3000,
          });
          Logout(navigate);
        } else if (error.response.status === 400) {
          toast.current?.show({
            severity: "error",
            summary: error.response.data[0].errorMessage,
            life: 3000,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setFacilitatorList([]);
        setLoading(false);
      });
  };

  return loading ? (
    <div className="spinner-class">
      <ProgressSpinner />
    </div>
  ) : (
    <div className="datatable-doc-demo">
      <div className="card facilitator-card">
        <div className="card-body">
          <div className="spinner-class-security">
            <label>Facilitator</label>
            {facilitatorList.map((facilitator) => {
              return (
                <>
                  <li>{facilitator.legalname}</li>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Facilitator;
