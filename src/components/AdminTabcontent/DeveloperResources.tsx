import React, { useEffect, useRef, useState } from "react";
import Copy_icon from "../../assets/images/copy.svg"
import { useNavigate, useParams } from "react-router-dom";
import { ResourceService } from "../../services/DevResources/ResourcesService";
import { Logout } from "../../utils/AccountUtils";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { ProgressSpinner } from "primereact/progressspinner";
import Scrollbars from "react-custom-scrollbars-2";
import ToolTip from "../Partner/ToolTipsData/ToolTip";
import DeveloperInfoToolTipData from "./DeveloperInfoToolTip";


const DeveloperResources: React.FC = () => {

  const navigate = useNavigate();

  const { partnerid } = useParams();

  const [loading, setLoading] = React.useState(true);

  const [generateloading, setgenerateloading] = React.useState(false);

  const [webhookloading, setwebhookloading] = React.useState(false);

  const [receiveloading, setreceiveloading] = React.useState(false);

  const [keyList, setKeyList] = React.useState([]);

  const [webhookList, setWebhookList] = React.useState([]);

  const [devkey, setdevkey] = React.useState("");

  const [stagekey, setstagekey] = React.useState("");

  const [prodkey, setprodkey] = React.useState("");

  const [webhookdevkey, setwebhookdevkey] = React.useState("");

  const [webhookstagekey, setwebhookstagekey] = React.useState("");

  const [webhookprodkey, setwebhookprodkey] = React.useState("");

  const [webhookdevkeyErrorMessage, setwebhookdevkeyErrorMessage] = React.useState("");

  const [webhookstagekeyErrorMessage, setwebhookstagekeyErrorMessage] = React.useState("");

  const [webhookprodkeyErrorMessage, setwebhookprodkeyErrorMessage] = React.useState("");

  const [apikeymessage, setAPIKeyMessage] = React.useState("");

  const [webhookmessage, setWebhookMessage] = React.useState("");

  const [apireceivemessage, setAPIReceiveMessage] = React.useState("");

  const [devReceiveUrl, setdevReceiveUrl] = React.useState("");

  const [stageReceiveUrl, setstageReceiveUrl] = React.useState("");

  const [prodReceiveUrl, setprodReceiveUrl] = React.useState("");

  const [devReceiveUrlErrorMessage, setdevReceiveUrlErrorMessage] = React.useState("");

  const [stageReceiveUrlErrorMessage, setstageReceiveUrlErrorMessage] = React.useState("");

  const [prodReceiveUrlErrorMessage, setprodReceiveUrlErrorMessage] = React.useState("");
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false);
  const [displayApiSavePopup, setdisplayApiSavePopup] = useState(false);



  const [devSendUrl, setdevSendUrl] = React.useState("");

  const [stageSendUrl, setstageSendUrl] = React.useState("");

  const [prodSendUrl, setprodSendUrl] = React.useState("");

  const [devResponseUrl, setdevResponseUrl] = React.useState("");

  const [stageResponseUrl, setstageResponseUrl] = React.useState("");

  const [prodResponseUrl, setprodResponseUrl] = React.useState("");

  const [developerInfoToolTipdata] = useState<any>(DeveloperInfoToolTipData);
  const [displaySavePopup, setdisplaySavePopup] = useState(false);

  const toast = useRef<Toast>(null);

  const partnerRoleid = sessionStorage.getItem("partnerPaymentID");

  const Env1 = sessionStorage.getItem("Env");

  const EnvValue = Env1?.replace(/"/g, '');

  const [SecurityKeyModel,] = React.useState({
    Id: 0,
    PartnerId: partnerid,
    Environment: "",
    CreatedBy: 0,
    Flag: 0
  });



  useEffect(() => {
    const useroobj = sessionStorage.getItem("User");
    if (useroobj === null || useroobj === undefined) {
      navigate("/");
    }
    setwebhookdevkeyErrorMessage("");
    setwebhookstagekeyErrorMessage("");
    setwebhookprodkeyErrorMessage("");
    setdevReceiveUrlErrorMessage("");
    setstageReceiveUrlErrorMessage("");
    setprodReceiveUrlErrorMessage("");

    getAllSecuritKeys(partnerid);
    getAllWebhookKeys(partnerid);
    getAllReceiveEndPoints(partnerid);
    getAllSendEndPoints(partnerid);
    getAllResponseEndPoints(partnerid)

  }, []);

  const reloadPage = () => {
    getAllSecuritKeys(partnerid);
    getAllWebhookKeys(partnerid);
    getAllReceiveEndPoints(partnerid);
    getAllSendEndPoints(partnerid);
    getAllResponseEndPoints(partnerid)

  }

  const isValidURLFormat = (val: string) => {

    var res = val.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
  }

  //get sercurity key
  const getAllSecuritKeys = (val: any, flag: boolean = false) => {
    if (flag)
      setgenerateloading(true);
    else setLoading(true);
    ResourceService.getResourcesByPartnerId(val)
      .then((data: any) => {
        setKeyList(data.data);
        if (data.data.length > 0) {
          let keys = data.data;
          keys.forEach((k: any) => {
            if (k.environment == 'Dev') {
              setdevkey(k.apI_Key);
            }
            if (k.environment == 'Stage') {
              setstagekey(k.apI_Key);
            }
            if (k.environment == 'Prod') {
              setprodkey(k.apI_Key);
            }
          });

        }
        if (flag) setgenerateloading(false);
        else setLoading(false);
      })
      .catch((error: any) => {
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
        setKeyList([]);
        if (flag) setgenerateloading(false);
        else
          setLoading(false);
      });
  };

  //generate key
  const generateKeys = () => {
    setgenerateloading(true);
    ResourceService.RegenerateResources(SecurityKeyModel)
      .then((data: any) => {
        setgenerateloading(false);
        getAllSecuritKeys(partnerid, true);
        setAPIKeyMessage("API keys regenerated successfully!")
        setTimeout(() => {
          setAPIKeyMessage("")
        }, 3000);

      })
      .catch((error: any) => {
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
        } else if (error.response.status === 409) {
          toast.current?.show({
            severity: "error",
            summary: error.response.data,
            life: 3000,
          });
        } else {
          toast.current?.show({
            severity: "error",
            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
            life: 3000,
          });
        }
        setgenerateloading(false);
      });

    // setTimeout(() => {
    //     setLoading(false);
    // }, 3000);

  }

  //get webhooks url
  const getAllWebhookKeys = (val: any) => {
    // setwebhookloading(true);
    ResourceService.getWebhooksByPartnerId(val)
      .then((data: any) => {
        if (data.data != null) {
          let keys = data.data;
          keys.forEach((k: any) => {
            if (k.environment == 'Dev') {
              setwebhookdevkey(k.webhookURL);
            }
            if (k.environment == 'Stage') {
              setwebhookstagekey(k.webhookURL);
            }
            if (k.environment == 'Prod') {
              setwebhookprodkey(k.webhookURL);
            }
          });

        }
        setwebhookloading(false);
      })
      .catch((error: any) => {
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
        setWebhookList([]);
        setwebhookloading(false);
      });
  };

  //get all receive end points  
  const getAllReceiveEndPoints = (val: any) => {
    // setwebhookloading(true);
    ResourceService.getReceiveEndPointsByPartnerId(val)
      .then((data: any) => {
        if (data.data != null) {
          let keys = data.data;
          keys.forEach((k: any) => {
            if (k.environment == 'Dev') {
              setdevReceiveUrl(k.endpointURL);
            }
            if (k.environment == 'Stage') {
              setstageReceiveUrl(k.endpointURL);
            }
            if (k.environment == 'Prod') {
              setprodReceiveUrl(k.endpointURL);
            }
          });

        }
        setwebhookloading(false);
      })
      .catch((error: any) => {
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
        setWebhookList([]);
        setwebhookloading(false);
      });
  };

  //get all send end points 
  const getAllSendEndPoints = (val: any) => {
    // setwebhookloading(true);
    ResourceService.getSendEndPointsByPartnerId(val)
      .then((data: any) => {

        if (data.data != null) {
          let keys = data.data;
          keys.forEach((k: any) => {
            if (k.environment == 'Dev') {
              setdevSendUrl(k.endpointURL);
            }
            if (k.environment == 'Stage') {
              setstageSendUrl(k.endpointURL);
            }
            if (k.environment == 'Prod') {
              setprodSendUrl(k.endpointURL);
            }
          });

        }
        setwebhookloading(false);
      })
      .catch((error: any) => {
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
        setWebhookList([]);
        setwebhookloading(false);
      });
  };

  //get all response end points 
  const getAllResponseEndPoints = (val: any) => {
    // setwebhookloading(true);
    ResourceService.getResponseEndPointsByPartnerId(val)
      .then((data: any) => {

        if (data.data != null) {
          let keys = data.data;
          keys.forEach((k: any) => {
            if (k.environment == 'Dev') {
              setdevResponseUrl(k.endpointURL);
            }
            if (k.environment == 'Stage') {
              setstageResponseUrl(k.endpointURL);
            }
            if (k.environment == 'Prod') {
              setprodResponseUrl(k.endpointURL);
            }
          });

        }
        setwebhookloading(false);
      })
      .catch((error: any) => {
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
        setWebhookList([]);
        setwebhookloading(false);
      });
  };

  //valid webhook url check
  const isValidWebhookUrls = () => {
    let formIsValid = true;
    if (webhookdevkey != "") {
      if (!isValidURLFormat(webhookdevkey)) {
        setwebhookdevkeyErrorMessage("Please enter valid dev webhook url.");
        formIsValid = false;
      }
    }

    if (webhookstagekey != "") {
      if (!isValidURLFormat(webhookstagekey)) {
        setwebhookstagekeyErrorMessage("Please enter valid sandbox webhook url.");
        formIsValid = false;
      }
    }

    if (webhookprodkey != "") {
      if (!isValidURLFormat(webhookprodkey)) {
        setwebhookprodkeyErrorMessage("Please enter valid production webhook url.");
        formIsValid = false;
      }
    }

    return formIsValid;
  }

  //copy click board
  const copyToClipBoardClicked = (input: any, resource: any) => {
    if (input != "" && input != null && input != undefined) {
      if (resource === 3) {
        if (isValidURLFormat(input)) {
          navigator.clipboard.writeText(input);
          showClipboard();
        }
      } else {
        navigator.clipboard.writeText(input);
        showClipboard();
      }
    }
  }

  //is valid receoveUrl  
  const isValidReceiveUrls = () => {
    let formIsValid = true;
    if (devReceiveUrl != "") {
      if (!isValidURLFormat(devReceiveUrl)) {
        setdevReceiveUrlErrorMessage("Please enter valid dev receive url.");
        formIsValid = false;
      }
    }

    if (stageReceiveUrl != "") {
      if (!isValidURLFormat(stageReceiveUrl)) {
        setstageReceiveUrlErrorMessage("Please enter valid sandbox receive url.");
        formIsValid = false;
      }
    }

    if (prodReceiveUrl != "") {
      if (!isValidURLFormat(prodReceiveUrl)) {
        setprodReceiveUrlErrorMessage("Please enter valid production receive url.");
        formIsValid = false;
      }
    }

    return formIsValid;
  }



  //add webhook url
  const addWebhookKeys = () => {
    setwebhookloading(true);
    if (isValidWebhookUrls()) {
      let webhookModel = {
        Id: 0,
        PartnerId: partnerid,
        DevWebhookURL: webhookdevkey,
        StageWebhookURL: webhookstagekey,
        ProdWebhookURL: webhookprodkey,
        CreatedBy: 0
      }
      // setTimeout(() => {
      //     setwebhookloading(false);
      // }, 3000);
      ResourceService.saveWebhookURLs(webhookModel)
        .then((data: any) => {
          setwebhookloading(false);

          getAllWebhookKeys(partnerid);
          setWebhookMessage("Saved successfully!");
          setTimeout(() => {
            setWebhookMessage("")
          }, 3000);

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
          } else if (error.response.status === 409) {
            toast.current?.show({
              severity: "error",
              summary: error.response.data,
              life: 3000,
            });
          } else {
            toast.current?.show({
              severity: "error",
              summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }
          setwebhookloading(false);
        });
    }
    else {
      setwebhookloading(false);
    }
  }

  //save receive points 
  const savereceivepoints = () => {
    setreceiveloading(true);
    if (isValidReceiveUrls()) {
      let webhookModel = {
        Id: 0,
        PartnerId: partnerid,
        DevEndpointURL: devReceiveUrl,
        StageEndpointURL: stageReceiveUrl,
        ProdEndpointURL: prodReceiveUrl,
        CreatedBy: 0
      }
      // setTimeout(() => {
      //     setwebhookloading(false);
      // }, 3000);
      ResourceService.saveReceiveURLs(webhookModel)
        .then((data: any) => {
          setreceiveloading(false);

          getAllReceiveEndPoints(partnerid);
          setAPIReceiveMessage("Saved successfully!");
          setTimeout(() => {
            setAPIReceiveMessage("")
          }, 3000);

        })
        .catch((error: any) => {
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
          } else if (error.response.status === 409) {
            toast.current?.show({
              severity: "error",
              summary: error.response.data,
              life: 3000,
            });
          } else {
            toast.current?.show({
              severity: "error",
              summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
              life: 3000,
            });
          }
          setreceiveloading(false);
        });
    }
    else {
      setreceiveloading(false);
    }
  }

  //show clip borad points  
  const showClipboard = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success message",
      detail: "Copied to clipboard.",
      life: 3000,
    });
  }



  return (
    <>




      <div>
        <div className="dashboard right-tab-section">
          <Toast ref={toast}></Toast>



          <div className="developer-resource">


            <div className="user-heading heading-section">
              <Button
                iconPos="left"
                icon="pi pi-refresh"
                label="Refresh"
                className="btn btn-continue"

                onClick={() => reloadPage()}
              />


            </div>
            <span className="developer-header-color" style={{ color: 'Black', textAlign: "center" }}> <h1>Partner Id - {partnerid} </h1></span>
            <div className="container-fluid acc-screen developer-resorce-Screen">
              {
                loading ?

                  <div className="spinner-class">
                    <ProgressSpinner />
                  </div>
                  :


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


                    <div className="row hub-cards" >


                      <div className="col-md-6  developer-screen-section info-section-border">
                        <div className="col-md-12">
                          <div className="card">
                            <ToolTip props={developerInfoToolTipdata[0]} data-placement="right"></ToolTip>
                            <div className="card-body">
                              <h1>API Key</h1>

                              <p className="text-center">This is your unique API key for authentication.</p>
                              <p className="text-center">It will also be used for AES 256 GCM encryption and decryption of messages.</p>
                              <div className="row">
                                {EnvValue && EnvValue == "Dev" ?
                                  <div className=" col-md-12 form-group ">
                                    <span className="input-label">
                                      Dev{" "}
                                    </span>
                                    <input
                                      readOnly
                                      className="form-control "
                                      type="text"
                                      value={devkey}
                                    />
                                    <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(devkey, 1)}
                                      style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                  </div> : EnvValue && EnvValue == "Stage" ?
                                    <div className=" col-md-12 form-group ">
                                      <span className="input-label">
                                        SandBox{" "}
                                      </span>
                                      <input
                                        readOnly
                                        className="form-control "
                                        type="text"
                                        value={stagekey}
                                      />
                                      <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(stagekey, 1)}
                                        style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                    </div> : EnvValue && EnvValue == "Prod" ?
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">
                                          Production{" "}
                                        </span>
                                        <input
                                          readOnly
                                          className="form-control "
                                          type="text"
                                          value={prodkey}
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(prodkey, 1)}
                                          style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                      </div> : <></>}
                              </div>
                              {apikeymessage !== null &&
                                apikeymessage.length > 0 ? (
                                <span className="resource-success-msg">
                                  {apikeymessage}
                                </span>
                              ) : null}

                            </div>

                            <div className="" style={{ textAlign: "end" }}>
                              <Button
                                iconPos="left"
                                label="Regenerate"
                                className="btn btn-continue developer-save-btn"
                                // onClick={generateKeys} 


                                onClick={() =>
                                  setDisplayDeletePopup(true)}

                                style={{ marginBottom: "10px", marginTop: "-15px", marginRight: "20px" }}
                                loading={generateloading}
                              />
                            </div>
                          </div>

                        </div>
                        <div className="col-md-12">
                          {partnerRoleid === "Send" || partnerRoleid === "SendReceive" ?
                            <>
                              <div className="card">
                                <ToolTip props={developerInfoToolTipdata[2]} data-placement="right"></ToolTip>
                                <div className="card-body">
                                  <h1>Webhook Callback URL</h1>
                                  <p className="text-center" >  This is the endpoint where we will submit any payment notifications.</p>
                                  {EnvValue && EnvValue == "Dev" ?
                                    <div className="row" style={{ marginTop: "20px" }}>
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">

                                          Dev{" "}
                                        </span>
                                        <input

                                          className="form-control "
                                          type="text"
                                          value={webhookdevkey}
                                          onChange={(e) => {
                                            setwebhookdevkey(e.target.value);
                                            setwebhookdevkeyErrorMessage("");

                                          }
                                          }
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(webhookdevkey, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                        {webhookdevkeyErrorMessage !== null &&
                                          webhookdevkeyErrorMessage.length > 0 ? (
                                          <span className="login-error-msg">{webhookdevkeyErrorMessage}</span>
                                        ) : null}
                                      </div>

                                    </div> : EnvValue && EnvValue == "Stage" ?
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">

                                          SandBox{" "}
                                        </span>
                                        <input
                                          className="form-control "
                                          type="text"
                                          onChange={(e) => {
                                            setwebhookstagekey(e.target.value);
                                            setwebhookstagekeyErrorMessage("");

                                          }}
                                          value={webhookstagekey}
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(webhookstagekey, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />

                                        {webhookstagekeyErrorMessage !== null &&
                                          webhookstagekeyErrorMessage.length > 0 ? (
                                          <span className="login-error-msg">{webhookstagekeyErrorMessage}</span>
                                        ) : null}

                                      </div> : EnvValue && EnvValue == "Prod" ?
                                        <div className=" col-md-12 form-group ">
                                          <span className="input-label">
                                            Production{" "}
                                          </span>
                                          <input

                                            className="form-control "
                                            type="text"
                                            value={webhookprodkey}
                                            onChange={(e) => {
                                              setwebhookprodkey(e.target.value);
                                              setwebhookprodkeyErrorMessage("");
                                            }}
                                          />
                                          <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(webhookprodkey, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />

                                          {webhookprodkeyErrorMessage !== null &&
                                            webhookprodkeyErrorMessage.length > 0 ? (
                                            <span className="login-error-msg">{webhookprodkeyErrorMessage}</span>
                                          ) : null}
                                        </div> : <></>}
                                  {webhookmessage !== null &&
                                    webhookmessage.length > 0 ? (
                                    <span className="resource-success-msg">
                                      {webhookmessage}
                                    </span>
                                  ) : null}
                                </div>
                                <div className="" style={{ textAlign: "end" }}>
                                  <Button
                                    iconPos="left"
                                    label="Save"
                                    className="btn btn-continue developer-save-btn"
                                    // onClick={addWebhookKeys}
                                    onClick={() => setdisplaySavePopup(true)}
                                    style={{ marginBottom: "10px", marginTop: "-15px", marginRight: "20px" }}
                                    loading={webhookloading}
                                  />
                                </div>
                              </div>
                            </> : <></>}
                          {partnerRoleid === "Receive" || partnerRoleid === "SendReceive" ?
                            <>
                              <div className="card">
                                <ToolTip props={developerInfoToolTipdata[5]} data-placement="right"></ToolTip>
                                <div className="card-body">
                                  <h1>API Response Receive Endpoint</h1>
                                  <p className="text-center">This is the endpoint where you may submit payment responses.</p>
                                  <p className="text-center"> Instarails platform will process your responses in real-time.</p>
                                  <div className="row">
                                    {EnvValue && EnvValue == "Dev" ?
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">
                                          Dev{" "}
                                        </span>
                                        <input
                                          className="form-control "
                                          type="text"
                                          value={devResponseUrl}
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(devResponseUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />

                                      </div> : EnvValue && EnvValue == "Stage" ?
                                        <div className=" col-md-12 form-group ">
                                          <span className="input-label">
                                            Sandbox{" "}
                                          </span>
                                          <input
                                            className="form-control "
                                            type="text"
                                            value={stageResponseUrl}
                                          />
                                          <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(stageResponseUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />

                                        </div> : EnvValue && EnvValue == "Prod" ?
                                          <div className=" col-md-12 form-group ">
                                            <span className="input-label">
                                              Production{" "}
                                            </span>
                                            <input
                                              className="form-control "
                                              type="text"
                                              value={prodResponseUrl}
                                            />
                                            <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(prodResponseUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                          </div> : <></>}
                                  </div>
                                </div>

                              </div>
                            </> : ""}
                        </div>
                      </div>
                      <div className="col-md-6 developer-screen-section" >
                        {partnerRoleid === "Send" || partnerRoleid === "SendReceive" ?
                          <>
                            <div className="card" style={{ height: 230 }}>
                              <ToolTip props={developerInfoToolTipdata[1]} data-placement="right"></ToolTip>
                              <div className="card-body">
                                <h1>API Send Endpoint</h1>
                                <p className="text-center">This is the endpoint where you may submit any payment
                                  API requests.</p>
                                <p className="text-center">Instarails platform will process your request in
                                  real-time.</p>
                                <div className="row">
                                  {EnvValue && EnvValue == "Dev" ?
                                    <div className=" col-md-12 form-group ">
                                      <span className="input-label">
                                        Dev{" "}
                                      </span>
                                      <input
                                        readOnly
                                        className="form-control "
                                        type="text"
                                        value={devSendUrl}
                                      />
                                      <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(devSendUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                    </div> : EnvValue && EnvValue == "Stage" ?
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">
                                          Sandbox{" "}
                                        </span>
                                        <input
                                          readOnly
                                          className="form-control "
                                          type="text"
                                          value={stageSendUrl}
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(stageSendUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                      </div> : EnvValue && EnvValue == "Prod" ?
                                        <div className=" col-md-12 form-group ">
                                          <span className="input-label">
                                            Production{" "}
                                          </span>
                                          <input
                                            readOnly
                                            className="form-control "
                                            type="text"
                                            value={prodSendUrl}
                                          />
                                          <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(prodSendUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                        </div> : <></>}
                                </div>

                              </div>
                            </div>
                          </> : ""}
                        {partnerRoleid === "Receive" || partnerRoleid === "SendReceive" ?
                          <>
                            <div className="card" style={{ height: 225 }}>
                              <ToolTip props={developerInfoToolTipdata[3]} data-placement="right"></ToolTip>
                              <div className="card-body">
                                <h1>API Receive Endpoint</h1>
                                <p className="text-center">This is the endpoint where we will submit any
                                  Payment API requests.</p>
                                <p className="text-center"> Our request will contain the callback URL for
                                  receiving the API response.</p>
                                <div className="row">
                                  {EnvValue && EnvValue == "Dev" ?
                                    <div className=" col-md-12 form-group ">
                                      <span className="input-label">
                                        Dev{" "}
                                      </span>
                                      <input

                                        className="form-control"
                                        type="text"
                                        value={devReceiveUrl}
                                        onChange={(e) => {
                                          setdevReceiveUrl(e.target.value);
                                          setdevReceiveUrlErrorMessage("");
                                        }}
                                      />
                                      <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(devReceiveUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                      {devReceiveUrlErrorMessage !== null &&
                                        devReceiveUrlErrorMessage.length > 0 ? (
                                        <span className="login-error-msg">{devReceiveUrlErrorMessage}</span>
                                      ) : null}
                                    </div> : EnvValue && EnvValue == "Stage" ?
                                      <div className=" col-md-12 form-group ">
                                        <span className="input-label">
                                          Sandbox{" "}
                                        </span>
                                        <input

                                          className="form-control "
                                          type="text"
                                          value={stageReceiveUrl}
                                          onChange={(e) => {
                                            setstageReceiveUrl(e.target.value);
                                            setstageReceiveUrlErrorMessage("");
                                          }}
                                        />
                                        <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(stageReceiveUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                        {stageReceiveUrlErrorMessage !== null &&
                                          stageReceiveUrlErrorMessage.length > 0 ? (
                                          <span className="login-error-msg">{stageReceiveUrlErrorMessage}</span>
                                        ) : null}
                                      </div> : EnvValue && EnvValue == "Prod" ?
                                        <div className=" col-md-12 form-group ">
                                          <span className="input-label">
                                            Production{" "}
                                          </span>
                                          <input

                                            className="form-control "
                                            type="text"
                                            value={prodReceiveUrl}
                                            onChange={(e) => {
                                              setprodReceiveUrl(e.target.value);
                                              setprodReceiveUrlErrorMessage("");
                                            }}
                                          />
                                          <img src={Copy_icon} alt="" className="copyicon-size" onClick={() => copyToClipBoardClicked(prodReceiveUrl, 3)} style={{ position: 'absolute', right: '20px', top: '38px', cursor: 'pointer' }} />
                                          {prodReceiveUrlErrorMessage !== null &&
                                            prodReceiveUrlErrorMessage.length > 0 ? (
                                            <span className="login-error-msg">{prodReceiveUrlErrorMessage}</span>
                                          ) : null}
                                        </div> : <></>}
                                </div>

                                {apireceivemessage !== null &&
                                  apireceivemessage.length > 0 ? (
                                  <span className="resource-success-msg">
                                    {apireceivemessage}
                                  </span>
                                ) : null}
                              </div>
                              <div className="" style={{ textAlign: "end" }}>
                                <Button
                                  iconPos="left"
                                  label="Save"
                                  className="btn btn-continue developer-save-btn"
                                  onClick={() => setdisplayApiSavePopup(true)}
                                  // onClick={savereceivepoints}
                                  style={{ marginBottom: "10px", marginTop: "-15px", marginRight: "20px" }}
                                  loading={receiveloading}
                                />
                              </div>
                            </div>
                          </> : ""}



                      </div>
                    </div>
                  </Scrollbars>
              }
            </div>

          </div>
        </div>
      </div>



     
      {displayDeletePopup ? (
        <>
          <div className="popup-body"  style={{ borderRadius: '10px' }}>
            <div className="Cancel-popup" style={{ width: '350px',  backgroundColor:'white',padding:'10px', borderRadius: '10px' }}>
              <div className="text-center " >
                <div className="awesome-text" >

                  <h4 >
                    <i className="pi pi-info-circle"></i>
                    Are you sure you want to regenerate the API Key? This will impact the partner environment configurations and cause interruptions. </h4>

                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                  className="btn btn-cancel second-btn"
                  onClick={() => setDisplayDeletePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-continue second-btn yes-btn-popup"
                  onClick={() => {
                    generateKeys();
                    setDisplayDeletePopup(false);
                  }}
                // style={{ marginRight: '10px', paddingRight: '10px', paddingLeft: '5px' }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}




      {/* //display save popup */}

      {displaySavePopup ? (
        <>
          <div className="popup-body"  style={{ borderRadius: '10px' }}>
            <div className="Cancel-popup" style={{ width: '390px',  backgroundColor:'white',padding:'13px', borderRadius: '10px' }}>
              <div className="text-center " >
                <div className="awesome-text" >

                  <h4>

                    <i className="pi pi-info-circle"></i>
                    Are you sure you want to update the send partner's Webhook receive endpoint?</h4>
                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                  className="btn btn-cancel second-btn"
                  onClick={() => setdisplaySavePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-continue second-btn yes-btn-popup"
                  onClick={() => {
                    addWebhookKeys();
                    setdisplaySavePopup(false);
                  }}
                // style={{ marginRight: '10px', paddingRight: '10px', paddingLeft: '5px' }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}



      {displayApiSavePopup ? (
        <>

<div className="popup-body"  style={{ borderRadius: '10px' }}>
            <div className="Cancel-popup" style={{ width: '410px',  backgroundColor:'white',padding:'12px', borderRadius: '10px' }}>
              <div className="text-center " >
                <div className="awesome-text" >

                  <h4>

                    <i className="pi pi-info-circle"></i>
                    Are you sure you want to update the Receiving Partner's Receive Endpoint? </h4>
                </div>
              </div>
              <div className="payment-screen-btn">
                <button
                  className="btn btn-cancel second-btn"
                  onClick={() => setdisplayApiSavePopup(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-continue second-btn yes-btn-popup"
                  onClick={() => {
                    savereceivepoints();
                    setdisplayApiSavePopup(false);
                  }}
                  // style={{ marginRight: '10px', paddingRight: '10px', paddingLeft: '5px' }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DeveloperResources;
