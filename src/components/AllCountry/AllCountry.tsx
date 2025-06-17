import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CloseIcon from "../../assets/images/icon/close-icon.png";
import { IUserManagement } from "../../models/IUserManagement";
import { UserManagementService } from "../../services/Partner/UserManagement/UserManagementService";
import { Logout } from "../../utils/AccountUtils";
import { statusList, validEmail } from "../../utils/utils";
import { InputSwitch } from "primereact/inputswitch";
import "react-phone-number-input/style.css";
import { paymenttypeList } from "../../utils/utils";

import React from "react";

import { InputText } from "primereact/inputtext";

import Scrollbars from "react-custom-scrollbars-2";
import { Paginator } from "primereact/paginator";

import { paymenttypeListType } from "../../utils/utils";
import moment from "moment";
import { ManageCountry } from "../../services/CountyMaster/ManageCountry";
import { ManageAgent } from "../../services/AgentMaster/ManageAgent";
import { Input, Table } from "antd";
import { getColumns } from "./columns";
import type { CountryDataType } from "./columns";
import PageWrapper from "../../Layout/PageWrapper";
import { SearchContainer, SearchWrapper, ButtonGroup, TableContainer } from "./AllCountry.styles";
import { GlobalButton } from "../comman/GlobalButton.styles";
import { ReloadOutlined } from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce";

const AllCountry: React.FC = () => {
	const [displayBasic, setDisplayBasic] = useState(false);

	const [displayBasicUpdate, setDisplayBasicUpdate] = useState(false);

	const navigate = useNavigate();

	const toast = useRef<Toast>(null);

	const [globalFilterValue, setGlobalFilterValue] = useState("");

	const [userNameErrorMessage, setuserNameErrorMessage] = useState("");

	const [countryIdErrorMessage, setCountryIdErrorMessage] = useState("");
	const [selectedDeliveryType, setSelectedDeliveryType] = useState(null);

	const [agentNameErrorMessage, setagentNameErrorMessage] = useState("");
	const [agentCurrencyErrorMessage, setagentCurrencyErrorMessage] = useState("");

	const [optionalFieldErrorMessage, setoptionalFieldErrorMessage] = useState("");

	const [partnerIdErrorMessage, setpartnerIdErrorMessage] = useState("");

	const [deliveryTypeErrorMessage, setdeliveryTypeErrorMessage] = useState("");
	const dt = useRef(null);

	const [filteredpreferredvaluelist, setFilteredPreferedValueList] = useState<any[]>([]);
	const [filteredpreferredcountryvaluelist, setFilteredPreferedCountryValueList] = useState<any[]>([]);

	const [preferredvalueAutoComplete, setPreferredValueAutoComplete] = useState("");
	const [loading, setLoading] = useState(false);

	const [userloading, setUserLoading] = useState(true);

	//   const [tableLoading, setTableLoading] = useState(false);

	const [agentList, setAgentList] = useState<any[]>([]);
	const [Key, setKey] = useState("");
	// const [agentDetails, setAgentDetails] = useState<any[]>([]);
	const [agentDetails, setAgentDetails] = useState();

	const [tableLoading, setTableLoading] = useState(true);

	const [finalTransaction, setFinalTransaction] = useState<any>();

	const { partnerid } = useParams();

	const [displaydeletepopup, setDisplayDeletePopup] = useState(false);

	const [buttonLoading, setButtonLoading] = useState(false);

	const [pageloading, setPageLoding] = useState(true);

	const [updatebuttonLoading, setUpdateButtonLoading] = useState(false);

	const [countryModel, setCountryModel] = useState({
		// Your other countryModel properties
		selectedCountryId: null
	});

	const [countryName, setCountryName] = useState();

	const [filteredCountryList, setFilteredCountryList] = useState([]);

	const [, setcountryErrorMessage] = useState("");

	const [activeStatus, setActiveStatus] = useState(null);

	const [changeStatus, setChangeStatus] = useState(false);

	const [inactiveCountry, setInactiveCountry] = useState(null);
	const [countryList, setCountryList] = useState<CountryDataType[]>([]);
	const [pagesCount, setPagesCount] = useState(1);
	const PartnerId = parseInt(sessionStorage.getItem("PartnerId"));
	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalRows, setTotalRows] = useState(0);
	const [last, setLast] = useState(0);

	const [activeStatusEn, setActiveStatusEn] = useState();
	const [changeStatusEn, setChangeStatusEn] = useState(false);
	const [displaydeletepopupEncrypt, setDisplayDeletePopupEncrypt] = useState(false);

	const [inactivePartner, setInactivePartner] = useState(null);
	const [inactivePartnerEn, setInactivePartnerEn] = useState(null);
	//user model
	const [agentModel, setAgentModel] = useState({
		id: 0,
		countryName: ""
	});

	//set user model empty
	const setModelEmpty = () => {
		setAgentModel({
			id: 0,
			countryName: ""
		});
		setCountryName(null);
	};

	//check null
	const CheckNull = (value: any) => {
		if (value === "" || value === undefined || value === null || value === 0) {
			return true;
		}
		return false;
	};

	//error message model emp
	const ErrorMessageEmptyModel = () => {
		setcountryErrorMessage("");
		setCountryIdErrorMessage("");
		setagentNameErrorMessage("");
		setagentCurrencyErrorMessage("");
		setoptionalFieldErrorMessage("");
		setpartnerIdErrorMessage("");
		setdeliveryTypeErrorMessage("");
	};

	//update values
	const isUpdateValidate = (values: any) => {
		ErrorMessageEmptyModel();
		let formIsValid = true;
		if (CheckNull(values.countryName)) {
			setCountryIdErrorMessage("Please enter country Name");
			formIsValid = false;
		}
		if (CheckNull(values.agentName)) {
			setagentNameErrorMessage("Please agent Name");
			formIsValid = false;
		}

		if (CheckNull(values.currency)) {
			setagentCurrencyErrorMessage("Please currency");
			formIsValid = false;
		}

		// if (CheckNull(values.optionalField)) {
		//   setoptionalFieldErrorMessage("Please enter optional Field");
		//   formIsValid = false;
		// }
		if (CheckNull(values.partnerId)) {
			setpartnerIdErrorMessage("Please enter partner Id");
			formIsValid = false;
		}
		if (CheckNull(values.deliveryType)) {
			setdeliveryTypeErrorMessage("Please enter delivery Type");
			formIsValid = false;
		}

		return formIsValid;
	};

	//validate user
	const isValidate = (values: any) => {
		let formIsValid = true;
		ErrorMessageEmptyModel();
		if (CheckNull(values.countryName)) {
			setCountryIdErrorMessage("Please enter country Name");
			formIsValid = false;
		}
		if (CheckNull(values.agentName)) {
			setagentNameErrorMessage("Please agent Name");
			formIsValid = false;
		}

		if (CheckNull(values.currency)) {
			setagentCurrencyErrorMessage("Please enter currency");
			formIsValid = false;
		}

		// if (CheckNull(values.optionalField)) {
		//   setoptionalFieldErrorMessage("Please enter optional Field");
		//   formIsValid = false;
		// }
		if (CheckNull(values.partnerId)) {
			setpartnerIdErrorMessage("Please enter partner Id");
			formIsValid = false;
		}
		if (CheckNull(values.deliveryType)) {
			setdeliveryTypeErrorMessage("Please enter delivery Type");
			formIsValid = false;
		}

		return formIsValid;
	};

	const rejectEncrypt = () => {
		setDisplayDeletePopupEncrypt(false);
	};

	const onDeleteClickUserEncrypt = () => {
		// onDeleteClickEncrypt(inactivePartnerEn.id);
		setDisplayDeletePopupEncrypt(true);
	};

	const reject = () => {
		setDisplayDeletePopup(false);
	};

	// const onDeleteClickUser = () => {

	//     const newActiveStatus = !activeStatus;
	//     onDeleteClick(inactivePartner.id);
	//     setDisplayDeletePopup(true);
	//     setActiveStatus(newActiveStatus);
	// };

	const onDeleteToggle = (rowData: CountryDataType, isChecked: boolean) => {
		setLoading(true);
		const isDeletedValue = isChecked ? "false" : "true";

		ManageAgent.getAllCountryDeleted(rowData.id, isDeletedValue)
			.then(() => {
				getCountries();
				toast.current?.show({
					severity: "success",
					summary: "Success",
					detail: `Country ${isChecked ? "activated" : "deactivated"} successfully`,
					life: 3000
				});
			})
			.catch((error) => {
				toast.current?.show({
					severity: "error",
					summary: "Error",
					detail: "Error updating country status",
					life: 3000
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	// const onDeleteClick = (rowData : any) => {
	//     setUpdateButtonLoading(true);

	//     const isDeletedValue = rowData.isDeleted === "N" ? "false" : "true";

	//     ManageAgent.getAllCountryDeleted(rowData.id, isDeletedValue)
	//         .then((response) => {
	//             setDisplayDeletePopup(true);
	//         })
	//         .catch((error) => {
	//             console.error('Error deleting:', error);
	//         })
	//         .finally(() => {
	//             setUpdateButtonLoading(false);
	//         });
	// };

	const reloadPage = () => {
		getCountries();
	};

	// const debouncedSearchValue = useDebounce(globalFilterValue, 500);

	useEffect(() => {
		if (globalFilterValue) {
			setTableLoading(true);
			const filteredData = countryList.filter((item) => item.countryName.toLowerCase().includes(globalFilterValue.toLowerCase()));
			setTotalRows(filteredData.length);
			setCountryList(filteredData);
			setTableLoading(false);
		} else {
			// When search is cleared, fetch all countries again
			getCountries();
		}
	}, [globalFilterValue]);

	useEffect(() => {
		getCountries();
	}, []);

	const getCountries = () => {
		setPageLoding(false);
		setTableLoading(true);
		let PageNumber = pagesCount;
		let RowsOfPage = rows;
		let Key = globalFilterValue || "";

		if (Key) {
			PageNumber = 0;
			RowsOfPage = 0;
		}

		ManageAgent.getAllCountry()
			.then((response) => {
				const data = response.data;
				setTotalRows(data.totalRecord);
				setCountryList(data);

				// if (data.reponseBody == null) {
				// 	toast.current?.show({
				// 		severity: "warn",
				// 		summary: "No Records Found",
				// 		detail: "No records were found matching your search.",
				// 		life: 3000
				// 	});
				// }
			})
			.catch((error) => {
				if (error.response?.status === 500) {
					toast.current?.show({
						severity: "error",
						summary: "Something went wrong",
						life: 3000
					});
				} else if (error.response?.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error while getting country details.",
						life: 3000
					});
				}
				setCountryList([]);
			})
			.finally(() => {
				setTableLoading(false);
				setLoading(false);
			});
	};

	useEffect(() => {
		// Calculate the last index for the current page
		const newLast = Math.min(rows, totalRows);
		setLast(newLast);
	}, [first, rows, totalRows]);

	const totalPages = Math.ceil(totalRows / rows);

	//show hide dialog box

	//on hide click
	const onHideClick = () => {
		setDisplayBasic(true);
	};

	//on update hide click
	const onUpdateHideClick = () => {
		setDisplayBasicUpdate(false);
	};

	const handleTableChange = (pagination: any) => {
		setPagesCount(pagination.current);
		setRows(pagination.pageSize);
	};

	const headerRight = (
		<ButtonGroup>
			<GlobalButton icon={<ReloadOutlined />} className="primary" onClick={reloadPage}>
				Refresh
			</GlobalButton>
		</ButtonGroup>
	);

	if (pageloading) {
		return (
			<div className="spinner-class">
				<ProgressSpinner />
			</div>
		);
	}

	return (
		<PageWrapper title="All Countries" headerRight={headerRight}>
			<Toast ref={toast} />
			<SearchContainer>
				<SearchWrapper>
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<Input
							type="text"
							placeholder="Search..."
							value={globalFilterValue}
							onChange={(e) => setGlobalFilterValue(e.target.value)}
							allowClear
						/>
					</span>
				</SearchWrapper>
			</SearchContainer>

			<TableContainer>
				<Table
					columns={getColumns(onDeleteToggle)}
					dataSource={countryList}
					loading={tableLoading}
					pagination={{
						total: totalRows,
						current: pagesCount,
						pageSize: rows,
						showSizeChanger: true,
						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
					}}
					onChange={handleTableChange}
					scroll={{ x: "max-content" }}
					rowKey="id"
				/>
			</TableContainer>

			{userloading ? (
				<div className="spinner-class">{/* <ProgressSpinner /> */}</div>
			) : (
				<Dialog visible={displayBasic} onHide={() => onHideClick()} className=" user-dialog">
					<>
						{" "}
						<Scrollbars
							className="contain-scroll"
							autoHide
							autoHideTimeout={1000}
							autoHideDuration={200}
							autoHeight
							autoHeightMin={100}
							autoHeightMax={600}
							thumbMinSize={30}
							universal={true}
						>
							<button className="close-btn" onClick={onHideClick}>
								<img src={CloseIcon} />
							</button>

							<br></br>
							<br></br>
						</Scrollbars>
					</>
				</Dialog>
			)}

			{loading ? (
				<div className="spinner-class">
					<ProgressSpinner />
				</div>
			) : (
				<Dialog visible={displayBasicUpdate} onHide={() => onUpdateHideClick()} className="acc-screen contact-info user-dialog  ">
					<Scrollbars
						className="contain-scroll"
						autoHide
						autoHideTimeout={1000}
						autoHideDuration={200}
						autoHeight
						autoHeightMin={100}
						autoHeightMax={600}
						thumbMinSize={30}
						universal={true}
					>
						<button className="close-btn" onClick={onUpdateHideClick}>
							<img src={CloseIcon} />
						</button>

						<br></br>
						<br></br>
						{displaydeletepopup ? (
							<div className="popup-body inactivepartner">
								<div className="register-popup Payment-screen">
									<div className="text-center ">
										<div className="awesome-text">
											{activeStatus ? (
												<h4>
													{" "}
													<i className="pi pi-info-circle"></i> Are you sure you want to inactive partner?
												</h4>
											) : (
												<h4>
													{" "}
													<i className="pi pi-info-circle"></i> Are you sure you want to active partner?
												</h4>
											)}
										</div>
									</div>
									<div className="payment-screen-btn">
										<button className="btn btn-cancel second-btn " onClick={reject}>
											{" "}
											No
										</button>
										<button
											className="btn btn-continue second-btn yes-btn-popup"
											// onClick={onDeleteClickUser}
										>
											{" "}
											Yes
										</button>
									</div>
								</div>
							</div>
						) : null}

						{displaydeletepopupEncrypt ? (
							<div className="popup-body inactivepartner">
								<div className="register-popup Payment-screen">
									<div className="text-center ">
										<div className="awesome-text">
											{activeStatusEn === "Y" ? (
												<h4>
													<i className="pi pi-info-circle"></i>
													Are you sure that you want to disable Encryption for partner?
												</h4>
											) : (
												<h4>
													<i className="pi pi-info-circle"></i>
													Are you sure that you want to enable Encryption for partner?
												</h4>
											)}
										</div>
									</div>
									<div className="payment-screen-btn">
										<button className="btn btn-cancel second-btn " onClick={rejectEncrypt}>
											No
										</button>
										<button className="btn btn-continue second-btn yes-btn-popup" onClick={onDeleteClickUserEncrypt}>
											Yes
										</button>
									</div>
								</div>
							</div>
						) : null}
					</Scrollbars>
				</Dialog>
			)}
		</PageWrapper>
	);
};

export default AllCountry;
