import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import IRLOGO from "../assets/images/icon/logo-icon.png";
import Paymenimg from "../assets/images/payment-img.svg";
import DashoardIcon from "../assets/images/icon/dashboard-icon.svg";
import PartnerIcon from "../assets/images/icon/partner-icon.png";
import UserIcon from "../assets/images/icon/User-icon.png";
import OprationIcon from "../assets/images/icon/opration-icon.png";
import LogoutImg from "../assets/images/logout white.svg";
import { Link, useNavigate } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { NavLink } from "react-router-dom";

import { LoginService } from "../services/Account/LoginService";
import { ProgressSpinner } from "primereact/progressspinner";

const Sidebar: React.FC<any> = ({ drawerState }) => {
	const navigate = useNavigate();
	const [showdata, showHideData] = useState(true);
	const [displaypopup, setDisplayPopup] = useState(false);
	const [status, setStatus] = useState(0);
	const [loading, setLoading] = useState(false);
	const [logoutConfirmed, setLogoutConfirmed] = useState(false);

	const [isLoggedIn, setIsLoggedIn] = useState(true);
	useEffect(() => {
		// Update the document title using the browser API
		setStatus(Number(sessionStorage.getItem("OnboardingStatus")));
	}, []);
	// const confirm = (e: any) => {
	//   e.preventDefault();
	//   setDisplayPopup(true);
	//   confirm1();
	// }
	const confirm = (e: any) => {
		e.preventDefault();
		setLogoutConfirmed(true);
		setDisplayPopup(false);
		setIsLoggedIn(false);
		confirm1();
	};

	const confirm1 = () => {
		confirmDialog({
			message: (
				<div>
					{loading ? <ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" /> : null}
					<span>{loading ? "Loading..." : "Are you sure you want to logout?"}</span>
				</div>
			),
			icon: "pi pi-info-circle",
			accept: () => {
				handleSubmit();
				confirmDialog({
					message: (
						<div>
							<ProgressSpinner style={{ width: "50px", height: "50px" }} strokeWidth="4" />
						</div>
					),
					footer: <div></div>
				});
			},
			reject
		});
	};

	const handleSubmit = (): void => {
		setLoading(true);
		LoginService.logout()
			.then((response: any) => {
				sessionStorage.clear();
				navigate("/");
				setLoading(false);
				confirmDialog({
					visible: false
				});
			})
			.catch((error) => {
				setLoading(false);
			});
	};

	// const accept = () => {
	//   setTimeout(() => {
	//     navigate("/")
	//   }, 250);
	// }

	const reject = () => {
		setDisplayPopup(false);
	};
	const [operationSubMenuOpen, setOperationSubMenuOpen] = useState(false);

	const toggleOperationSubMenu = () => {
		setOperationSubMenuOpen(!operationSubMenuOpen);
	};

	return (
		<div className={`wrapper ${isLoggedIn ? "sidebar-active" : "sidebar-inactive"}`}>
			{drawerState ? (
				<div className="togle-button">
					<nav id="sidebar">
						<div className="sidebar-header">
							{displaypopup === true ? <ConfirmDialog id="confirm-popup" /> : null}
							<NavLink to="/admin/dashoard" className={({ isActive }) => (isActive ? "active" : "inactive")}>
								<img src={IRLOGO} alt="img" className="logo-white" />
							</NavLink>
						</div>
						<ul className="list-unstyled components">
							<li className="">
								<NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "inactive")}>
									<img src={DashoardIcon} alt="img" className="icon-sidebar dashboard" />
									<span className="sidebar-item">Dashboard</span>
								</NavLink>
							</li>

							<li className="">
								<NavLink to="/admin/partner" className={({ isActive }) => (isActive ? "active" : "inactive")}>
									<img src={PartnerIcon} alt="img" className="icon-sidebar partner" />
									<span className="sidebar-item">Partner</span>
								</NavLink>
							</li>
							<li className="">
								<NavLink to="/admin/usermanagement" className={({ isActive }) => (isActive ? "active" : "inactive")}>
									<img src={UserIcon} alt="img" className="icon-sidebar user" />
									<span className="sidebar-item">User</span>
								</NavLink>
							</li>
							{/* <li className="">
                <NavLink
                  to="/admin/complaince"
                  className={({ isActive }) =>
                    isActive ? "active" : "inactive"
                  }
                >
                  <img src={UserIcon} alt="img" className="icon-sidebar user" />
                  <span className="sidebar-item">Compliance</span>
                </NavLink>
              </li> */}

							<li className="">
								<NavLink to="/admin/compliance" className={({ isActive }) => (isActive ? "active" : "inactive")}>
									<img src={UserIcon} alt="img" className="icon-sidebar user" />
									<span className="sidebar-item">Compliance</span>
								</NavLink>
							</li>

							{/* <li className="">
              <NavLink to="/admin/countymaster" className={({ isActive }) => (isActive ? 'active' : 'inactive')} >
                <img src={UserIcon} alt="img" className="icon-sidebar user" />
                <span  className="sidebar-item">Country Master</span>
              </NavLink>
            </li> */}

							<li className="">
								<div
									onClick={toggleOperationSubMenu}
									className="sidebar-item operations-menu"
									style={{ display: "flex", alignItems: "center", padding: "7px 20px" }}
								>
									<img src={OprationIcon} alt="img" className="icon-sidebar user" />
									<span className="sidebar-item">Operations</span>
								</div>
								{operationSubMenuOpen && (
									<div className="submenu">
										<ul>
											<li className="" style={{ marginTop: 10 }}>
												<NavLink to="/admin/countymaster" className={({ isActive }) => (isActive ? "active" : "inactive")}>
													<span className="sidebar-item">Manage Receive Country</span>
												</NavLink>
											</li>
											<li className="" style={{ marginTop: -10 }}>
												<NavLink to="/admin/agentmaster" className={({ isActive }) => (isActive ? "active" : "inactive")}>
													<span className="sidebar-item">Manage Agent</span>
												</NavLink>
											</li>
											<li className="" style={{ marginTop: -10 }}>
												<NavLink to="/admin/allcountry" className={({ isActive }) => (isActive ? "active" : "inactive")}>
													<span className="sidebar-item">All Country</span>
												</NavLink>
											</li>
										</ul>
									</div>
								)}
							</li>
							<li className="">
								<NavLink onClick={confirm} to="/" className={({ isActive }) => (isActive ? "active" : "inactive")}>
									<img src={LogoutImg} alt="img" className="icon-sidebar logout" />
									<span className="sidebar-item">Logout</span>
									{loading && <ProgressSpinner />}
								</NavLink>
							</li>
						</ul>
					</nav>
				</div>
			) : (
				""
			)}
		</div>
	);
};
export default Sidebar;
