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
import { ButtonGroup, GlobalButton } from "../comman/GlobalButton.styles";
import { ReloadOutlined, PlusOutlined } from "@ant-design/icons";
import PageWrapper from "../../Layout/PageWrapper";
import { Table } from "antd";
import { getColumns } from "./columns";
import type { AgentDataType } from "./columns";
import useDebounce from "../../hooks/useDebounce";
import AddAgentModal from "./modals/AddAgentModal";
import EditAgentModal from "./modals/EditAgentModal";
import DeleteModal from "./modals/DeleteModal";
import { SearchContainer, TableContainer } from "./AgentMaster.styles";
import { SearchWrapper } from "./AgentMaster.styles";
import { Dropdown } from "primereact/dropdown";
import { Select } from "antd";
import { Input } from "antd";

const AgentManagement: React.FC<any> = () => {
	const [displayBasic, setDisplayBasic] = useState(false);

	const [displayBasicUpdate, setDisplayBasicUpdate] = useState(false);

	const navigate = useNavigate();

	const toast = useRef<Toast>(null);

	const [globalFilterValue, setGlobalFilterValue] = useState(null);

	const [userNameErrorMessage, setuserNameErrorMessage] = useState("");

	const [countryIdErrorMessage, setCountryIdErrorMessage] = useState("");

	const [agentNameErrorMessage, setagentNameErrorMessage] = useState("");
	const [agentCurrencyErrorMessage, setagentCurrencyErrorMessage] = useState("");

	const [optionalFieldErrorMessage, setoptionalFieldErrorMessage] = useState("");

	const [partnerIdErrorMessage, setpartnerIdErrorMessage] = useState("");

	const [deliveryTypeErrorMessage, setdeliveryTypeErrorMessage] = useState("");

	const [filteredpreferredvaluelist, setFilteredPreferedValueList] = useState<any[]>([]);
	const [filteredpreferredcountryvaluelist, setFilteredPreferedCountryValueList] = useState<any[]>([]);

	const [loading, setLoading] = useState(false);

	const [userloading, setUserLoading] = useState(true);

	const [tableLoading, setTableLoading] = useState(false);

	const [agentDetails, setAgentDetails] = useState<any[]>([]);

	const [finalTransaction, setFinalTransaction] = useState<any>();

	const [displaydeletepopup, setDisplayDeletePopup] = useState(false);

	const [buttonLoading, setButtonLoading] = useState(false);

	const [pageloading, setPageLoding] = useState(true);

	const [updatebuttonLoading, setUpdateButtonLoading] = useState(false);

	const [countryName, setCountryName] = useState();

	const [, setcountryErrorMessage] = useState("");

	const [activeStatus, setActiveStatus] = useState(null);

	const [inactiveCountry, setInactiveCountry] = useState(null);
	const [pagesCount, setPagesCount] = useState(1);
	const [rows, setRows] = useState(10);
	const [totalRows, setTotalRows] = useState(0);
	// Change this to use a separate search input state
	const [searchInput, setSearchInput] = useState("");
	const debouncedSearchValue = useDebounce(searchInput, 500);
	// State to hold the selected column for search
	const [searchColumn, setSearchColumn] = useState<string | null>(null);

	//user model
	const [agentModel, setAgentModel] = useState({
		id: 0,
		countryId: "0",
		countryName: "",
		currency: "",
		agentId: "",
		bankId: "0",
		agentName: "",
		bankBranchId: "",
		locationId: "",
		bankBranchState: "",
		branch: "",
		optionalField: "",
		city: "",
		partnerId: "0",
		address: "",
		deliveryType: "",
		roleId: 0
	});

	//set user model empty
	const setModelEmpty = () => {
		setAgentModel({
			id: 0,
			countryId: "",
			countryName: "",
			currency: "",
			agentId: "",
			bankId: "",
			agentName: "",
			bankBranchId: "",
			locationId: "",
			bankBranchState: "",
			branch: "",
			optionalField: "",
			city: "",
			partnerId: "",
			address: "",
			deliveryType: "",
			roleId: 0
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
		if (CheckNull(values.countryId)) {
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
		if (CheckNull(values.countryId)) {
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

	//on delete click
	const onDeleteClick = (rowData: any) => {
		setUpdateButtonLoading(true);
		ManageAgent.deleteAgent(rowData.id)
			.then((response) => {
				setUpdateButtonLoading(false);
				getAgent();
			})
			.catch((error) => {
				if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else if (error.response.status === 400) {
					toast.current?.show({
						severity: "error",
						summary: error.response.data[0].errorMessage,
						life: 3000
					});
				} else {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				}

				setUpdateButtonLoading(false);
			});
	};

	//handle close on add
	const handleCloseForAdd = () => {
		setModelEmpty();
		ErrorMessageEmptyModel();
		onHideClick();
	};

	//reload page
	const reloadPage = () => {
		getAgent();
	};

	//handle submit
	const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
		event.preventDefault();

		ErrorMessageEmptyModel();
		setButtonLoading(true);

		if (isValidate(agentModel)) {
			setLoading(true);
			ManageAgent.addAgent(agentModel)
				.then((data) => {
					setButtonLoading(false);
					onUpdateHideClick();
					setLoading(false);
					onHideClick();
					getAgent();
				})
				.catch((error) => {
					if (error.response.status === 409) {
						setuserNameErrorMessage(error.response.data);
					} else if (error.response.status === 401) {
						toast.current?.show({
							severity: "error",
							summary: "Unauthorized",
							life: 3000
						});
						Logout(navigate);
					} else if (error.response.status === 400) {
						toast.current?.show({
							severity: "error",
							summary: error.response.data[0].errorMessage,
							life: 3000
						});
					} else {
						toast.current?.show({
							severity: "error",
							summary:
								"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
							life: 3000
						});
					}
					setButtonLoading(false);
				});
		} else {
			setButtonLoading(false);
		}
	};

	// Update the effect to use debounced value instead of globalFilterValue
	useEffect(() => {
		setGlobalFilterValue(debouncedSearchValue);
	}, [debouncedSearchValue]);

	// Update the useEffect to add a condition for search column changes
	useEffect(() => {
		// Only make API call if:
		// 1. There's a search value, regardless of column selection
		// 2. Pagination changes (pagesCount or rows)
		// Don't make API call if only searchColumn changes with empty search
		if (globalFilterValue || pagesCount !== 1 || rows !== 10) {
			getAgent();
		}
	}, [pagesCount, rows, globalFilterValue, searchColumn]);

	useEffect(() => {
		getAgent();
	}, [globalFilterValue]);

	useEffect(() => {
		const payload = agentDetails.map((model) => ({
			overall_count: model.overall_count
		}));
		setFinalTransaction(payload);
	}, [agentDetails]);

	//get user
	const getAgent = () => {
		setPageLoding(false);
		setTableLoading(true);
		let PageNumber = pagesCount;
		let RowsOfPage = rows;
		let Key = globalFilterValue ? globalFilterValue : "";
		let Column = searchColumn ? searchColumn : null;

		if (Key) {
			PageNumber = 0;
			RowsOfPage = 0;
		}

		ManageAgent.getAgent(PageNumber, RowsOfPage, Key, Column)
			.then((response) => {
				const data = response.data;

				setTotalRows(data.totalRecord);
				setAgentDetails(data.reponseBody);
				//////console.log("what is rsponse?",data.reponseBody)

				if (data.reponseBody == null) {
					toast.current?.show({
						severity: "warn",
						summary: "No Records Found",
						detail: "No records were found matching your search.",
						life: 3000
					});
					setAgentDetails([]);
				}

				setTableLoading(false);
				setPageLoding(false);
			})

			.catch((error) => {
				if (error.response.status === 500) {
					toast.current?.show({
						severity: "error",
						summary: "Something went wrong",
						life: 3000
					});
				} else if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error while getting user details.",
						life: 3000
					});
				}
				setAgentDetails([]);
				setTableLoading(false);
				setUserLoading(false);
			});
	};

	//show hide dialog box
	const ShowHideDialog = () => {
		setModelEmpty();
		ErrorMessageEmptyModel();
		// setDisplayBasicUpdate(true);
		setDisplayBasic(true);
		//////console.log("click")
	};

	//on hide click
	const onHideClick = () => {
		setDisplayBasic(false);
	};

	//on update hide click
	const onUpdateHideClick = () => {
		setDisplayBasicUpdate(false);
	};

	const searchPreferedValue = (event: any) => {
		let query = event.query;
		let _filteredItems: any = [];
		for (let i = 0; i < paymenttypeListType.length; i++) {
			let item = paymenttypeListType[i];
			if (item.DeliveryName.toLowerCase().indexOf(query.toLowerCase()) === 0) {
				_filteredItems.push(item);
			}
		}
		setFilteredPreferedValueList(_filteredItems);
		//////console.log("filteredpreferredvaluelist",filteredpreferredvaluelist)
	};

	const searchPreferedCountryValue = (e: any) => {
		let query = e.query;

		ManageAgent.getCoutry()
			.then((response) => {
				let countryList = response.data;

				let formattedCountryList = countryList.map((item: any) => {
					return {
						...item,
						countryName: formatCountryName(item.countryName)
					};
				});

				let filteredCountryStartsWithQuery = formattedCountryList.filter((item: any) =>
					item.countryName.toLowerCase().startsWith(query.toLowerCase())
				);

				setFilteredPreferedCountryValueList(filteredCountryStartsWithQuery);
			})
			.catch((error) => {
				// console.error('Error fetching country data:', error);
			});
	};

	const formatCountryName = (name: string) => {
		name = name
			.toLowerCase()
			.split(" ")
			.map((word, index, words) => {
				// Capitalize the first letter of each word
				return index > 0 && words[index - 1].endsWith("(")
					? word.charAt(0).toUpperCase() + word.slice(1)
					: word === "the"
						? word
						: word.charAt(0).toUpperCase() + word.slice(1);
			})
			.join(" ");

		// Capitalize the first letter after an opening parenthesis
		name = name.replace(/\(([^)]+)\)/g, (_, match) => {
			return "(" + match.charAt(0).toUpperCase() + match.slice(1) + ")";
		});

		return name;
	};

	//edit user
	const editCountryDetails = (rowData: any) => {
		//  //////console.log(rowData)
		setAgentModel({
			id: rowData && rowData.id,
			countryId: rowData && rowData.countryId,
			// countryId: rowData && rowData.countryId,
			countryName: rowData && rowData.countryname,
			currency: rowData && rowData.currency,
			agentId: rowData && rowData.agentId,
			bankId: rowData && rowData.bankId,
			agentName: rowData && rowData.agentName,
			bankBranchId: rowData && rowData.bankBranchId,
			locationId: rowData && rowData.locationId,
			bankBranchState: rowData && rowData.bankBranchState,
			branch: rowData && rowData.branch,
			optionalField: rowData && rowData.optionalField,
			city: rowData && rowData.city,
			partnerId: rowData && rowData.partnerId,
			address: rowData && rowData.address,
			deliveryType: rowData && rowData.deliveryType,
			roleId: 0
		});
		setCountryName(rowData.countryname);
		setDisplayBasicUpdate(true);
		ErrorMessageEmptyModel();
	};

	const onDeleteClickCountry = () => {
		onDeleteClick(inactiveCountry);
		setDisplayDeletePopup(false);
	};

	const reject = () => {
		ErrorMessageEmptyModel();
		setDisplayDeletePopup(false);
	};

	useEffect(() => {
		const userobj = sessionStorage.getItem("User");
		if (userobj === null || userobj === undefined) {
			Logout(navigate);
		}
	}, []);

	const inactiveCountryDetails = (rowData: any) => {
		setInactiveCountry(rowData);
		setDisplayDeletePopup(true);
	};

	const handleTableChange = (pagination: any) => {
		setPagesCount(pagination.current);
		setRows(pagination.pageSize);
	};

	const columns = getColumns(editCountryDetails, inactiveCountryDetails);

	const columnOptions = columns.map((column) => ({
		label: column.title,
		value: column.key
	}));

	const headerRight = (
		<ButtonGroup>
			<GlobalButton icon={<ReloadOutlined />} className="primary" onClick={() => reloadPage()}>
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

	// Update the search input render function
	const renderSearchInput = () => (
		<div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
			<span className="p-input-icon-left">
				<i className="pi pi-search" />
				<Input
					type="text"
					placeholder="Search..."
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					onClear={() => {
						setSearchInput("");
					}}
					allowClear
				/>
			</span>
			<Select value={searchColumn} onChange={handleColumnChange} placeholder="Filter by Column" style={{ width: "200px" }} allowClear>
				{columnOptions.map((option) => (
					<Select.Option key={option.value.toString()} value={option.value.toString()}>
						{option.label.toString()}
					</Select.Option>
				))}
			</Select>
		</div>
	);

	// Update the Select component's onChange handler
	const handleColumnChange = (value: string | undefined) => {
		setSearchColumn(value);
		// Only trigger search if there's an actual search value
		if (searchInput) {
			getAgent();
		}
	};

	return (
		<PageWrapper title="Agent Management" headerRight={headerRight}>
			<div className="user-tab">
				<SearchContainer>
					<SearchWrapper>{renderSearchInput()}</SearchWrapper>
					<ButtonGroup>
						<GlobalButton icon={<PlusOutlined />} className="primary" onClick={ShowHideDialog}>
							Add Agent
						</GlobalButton>
					</ButtonGroup>
				</SearchContainer>
				<TableContainer>
					<Table
						columns={columns}
						dataSource={agentDetails}
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
						rowKey="paymentId"
					/>
				</TableContainer>
			</div>

			<AddAgentModal
				displayBasic={displayBasic}
				onHideClick={onHideClick}
				countryName={countryName}
				setCountryName={setCountryName}
				agentModel={agentModel}
				setAgentModel={setAgentModel}
				agentCurrencyErrorMessage={agentCurrencyErrorMessage}
				agentNameErrorMessage={agentNameErrorMessage}
				partnerIdErrorMessage={partnerIdErrorMessage}
				deliveryTypeErrorMessage={deliveryTypeErrorMessage}
				filteredpreferredcountryvaluelist={filteredpreferredcountryvaluelist}
				filteredpreferredvaluelist={filteredpreferredvaluelist}
				searchPreferedCountryValue={searchPreferedCountryValue}
				searchPreferedValue={searchPreferedValue}
				handleCloseForAdd={handleCloseForAdd}
				handleSubmit={handleSubmit}
				countryIdErrorMessage={countryIdErrorMessage}
				loading={loading}
			/>

			<EditAgentModal
				displayBasicUpdate={displayBasicUpdate}
				onUpdateHideClick={onUpdateHideClick}
				countryName={countryName}
				setCountryName={setCountryName}
				agentModel={agentModel}
				setAgentModel={setAgentModel}
				agentCurrencyErrorMessage={agentCurrencyErrorMessage}
				agentNameErrorMessage={agentNameErrorMessage}
				partnerIdErrorMessage={partnerIdErrorMessage}
				deliveryTypeErrorMessage={deliveryTypeErrorMessage}
				filteredpreferredcountryvaluelist={filteredpreferredcountryvaluelist}
				filteredpreferredvaluelist={filteredpreferredvaluelist}
				searchPreferedCountryValue={searchPreferedCountryValue}
				searchPreferedValue={searchPreferedValue}
				handleSubmit={handleSubmit}
				countryIdErrorMessage={countryIdErrorMessage}
				loading={loading}
			/>

			{displaydeletepopup ? <DeleteModal activeStatus={activeStatus} reject={reject} onDeleteClickCountry={onDeleteClickCountry} /> : null}
		</PageWrapper>
	);
};

export default AgentManagement;
