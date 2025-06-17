import React, { useRef, useState, useEffect, useContext } from "react";
import profileimg from "../assets/images/profile-img.png";
import notification from "../assets/images/notification-img.png";
import { Menu } from "primereact/menu";
import "./Header.css";
import { useNavigate, useParams } from "react-router";
import { Button } from "primereact/button";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import sessionStorageContext from "../components/context/LocalStorageContext";
import path from "path";
import { LoginService } from "../services/Account/LoginService";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { Logout } from "../utils/AccountUtils";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";


const Header: React.FC<any> = ({ pageName, setDrawerState, drawerState }) => {
  const menu = useRef<Menu>(null);
  const navigate = useNavigate();
  const [status, setstatus] = useState(
    sessionStorage.getItem("OnboardingStatus")
  );
  const [pageName1, setPageName1] = useState("");
  const [notificationPopup, setNotificationPopup] = React.useState(false);
  const [showlogo, setshowLogo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [displaypopup, setDisplayPopup] = useState(false);
  const toast = useRef<Toast>(null);
  const { partnerid, type } = useParams();

  function OnNotificationClick() {
    setNotificationPopup((notificationPopup) => !notificationPopup);
  }
  const context = useContext(sessionStorageContext);

  //  let path = window.location.pathname;

  // const setLogo = () => {

  //   if (window.location.pathname === "/") {
  //     sessionStorage.removeItem("PartnerProfileLogo")
  //   }
  // };
  useEffect(() => {
    setPageName1(pageName);
    //  setLogo();
  }, []);

  const confirm1 = () => {
    confirmDialog({
      message: (
        <div>
          {loading ? (
            <ProgressSpinner
              style={{ width: "50px", height: "50px" }}
              strokeWidth="4"
            />
          ) : null}
          <span>
            {loading ? "Loading..." : "Are you sure you want to logout?"}
          </span>
        </div>
      ),
      icon: "pi pi-info-circle",
      accept: () => {
        setLoading(true);
        // setConfirmationPopup(true);
        setDisplayPopup(true);
        handleSubmit();
        confirmDialog({
          message: (
            <div>
              <ProgressSpinner
                style={{ width: "50px", height: "50px" }}
                strokeWidth="4"
              />
            </div>
          ),
          footer: <div></div>,
        });
      },
      reject,
    });
  };

  // const handleSubmit = (): void => {
  //   setLoading(true);
  //     LoginService.logout().then((response: any) => {
  //       sessionStorage.clear();

  //       navigate("/");
  //         setLoading(false);
  //       })
  //       .catch((error) => {

  //         setLoading(false);
  //       });
  //   };

  const handleSubmit = (): void => {
    setLoading(true);
    LoginService.logout()
      .then((response: any) => {
        sessionStorage.clear();
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.current?.show({
            severity: "error",
            summary: "Something went wrong",
            life: 3000,
          });
        } else if (error.response.status === 401) {
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
            summary: "Error while getting updated token.",
            life: 3000,
          });
        }
        setLoading(false);
      });
  };

  const items = [
    {
      items: [
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/profile");
          },
        },
        {
          label: "Logout",

          icon: "pi pi-lock",
          command: () => {
            confirm1();
          },
        },
      ],
    },
  ];
  const items1 = [
    {
      items: [
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          command: () => {
            navigate("/profile");
          },
        },
        {
          label: "Logout",

          icon: "pi pi-lock",
          command: () => {
            confirm1();
          },
        },
      ],
    },
  ];
  const accept = () => {
    navigate("/");
  };

  const reject = () => { };
  const handleChange = () => {
    setDrawerState(!drawerState);
  };
  return (
    <>
      {loading ? (
        <div className="spinner-class">
          <ProgressSpinner />
        </div>
      ) : (
        <>
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="header-section">
             


              <div className="">
                <MenuOpenIcon
                  onClick={() => {
                    handleChange();
                  }}
                  style={{ margin: "0px 10px", cursor: "pointer" }}
                />
              </div>
              {context.logoSrc === null ||
                context.logoSrc === "" ||
                context.logoSrc === undefined ? (
                <div className=""></div>
              ) : (
                <>
                  {/* {type !== "V" ? null : (
                    <div className="logo-section">
                      <div className="partner-logo-bg">
                        <img
                          src={context.logoSrc}
                          className="partner-logo"
                          id="header-img"
                        />
                      </div>
                    </div>
                  )} */}

                  {type !== "A" ? null : (
                    <div className="logo-section">
                      <div className="partner-logo-bg">
                        <img
                          src={context.logoSrc}
                          className="partner-logo"
                          id="header-img"
                        />
                      </div>
                    </div>
                  )}
                </>
              )}

              <div
                className="collapse navbar-collapse justify-content-end"
                id="navbarSupportedContent"
              >

                {type !== "V" ? null : (
                  <div className="logo-section">
                    <div className="partner-logo-bg">
                      <img
                        src={context.logoSrc}
                        className="partner-logo"
                        id="header-img"
                      />
                    </div>
                  </div>
                )}




                <ConfirmDialog id="confirm-popup" />
                {/* <Menubar model={items} start={start} /> */}
                {type !== "V" ? (
                  <>
                    <p className="partner-name"></p>
                  </>
                ) : (
                  <>
                    {context.dbaName === null ||
                      context.dbaName === "" ||
                      context.dbaName === undefined ? (
                      <p className="partner-name">{context.partnerLegalName}</p>
                    ) : (
                      <p className="partner-name">{context.dbaName}</p>
                    )}
                  </>
                )}{" "}
                {type === "A" ? (
                  <>
                    {context.dbaName === null ||
                      context.dbaName === "" ||
                      context.dbaName === undefined ? (
                      <p className="partner-name">{context.partnerLegalName}</p>
                    ) : (
                      <p className="partner-name">{context.dbaName}</p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="partner-name"></p>
                  </>
                )}
                <span className="notification-bar">
                  {/* <p className="notification-count"> 1</p> */}
                  <Button
                    className="notification-icon"
                    icon="pi pi-bell"
                    onClick={OnNotificationClick}
                  />
                </span>
                <div className="profileimg-mr">
                  <Menu
                    model={Number(status) === 8 ? items : items1}
                    popup
                    ref={menu}
                    id="popup_menu"
                  />
                  <button
                    title="Profile"
                    onClick={(event) => menu.current.toggle(event)}
                  >
                    <img
                      src={profileimg}
                      aria-controls="popup_menu"
                      aria-haspopup
                    />
                  </button>
                </div>
              </div>

              {notificationPopup ? (
                <div className="notification-dropdown"></div>
              ) : null}
            </div>
          </nav>
        </>
      )}
    </>
  );
};

export default Header;
