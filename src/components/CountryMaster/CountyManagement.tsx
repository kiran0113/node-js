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

import React from "react";

import { InputText } from "primereact/inputtext";

import Scrollbars from "react-custom-scrollbars-2";

import moment from "moment";
import { ManageCountry } from "../../services/CountyMaster/ManageCountry";
import { Input, Table } from "antd";
import { getColumns } from "./columns";
import type { CountryDataType } from "./columns";
import PageWrapper from "../../Layout/PageWrapper";
import { SearchContainer, SearchWrapper, ButtonGroup, TableContainer } from "./CountryMaster.styles";
import { GlobalButton } from "../comman/GlobalButton.styles";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import useDebounce from "../../hooks/useDebounce";
import AddCountryModal from "./modals/AddCountryModal";
import EditCountryModal from "./modals/EditCountryModal";
import DeleteModal from "./modals/DeleteModal";

const CountyManagement: React.FC = () => {
	const [displayBasic, setDisplayBasic] = useState(false);
	const [displayBasicUpdate, setDisplayBasicUpdate] = useState(false);
	const [, setMessage] = React.useState("");
	const navigate = useNavigate();
	const toast = useRef<Toast>(null);
	const [globalFilterValue, setGlobalFilterValue] = useState(null);
	const [userNameErrorMessage, setuserNameErrorMessage] = useState("");
	const [countryNameErrorMessage, setCountryNameErrorMessage] = useState("");
	const [countryCodeErrorMessage, setCountryCodeErrorMessage] = useState("");
	const [currencyCodeErrorMessage, setCurrencyCodeErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [userloading, setUserLoading] = useState(true);
	const [tableLoading, setTableLoading] = useState(false);
	const [countryList, setCountryList] = useState<CountryDataType[]>([]);
	const { partnerid } = useParams();
	const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
	const [buttonLoading, setButtonLoading] = useState(false);
	const [pageloading, setPageLoding] = useState(true);
	const [updatebuttonLoading, setUpdateButtonLoading] = useState(false);
	const [, setcountryErrorMessage] = useState("");
	const [activeStatus, setActiveStatus] = useState(null);
	const [changeStatus, setChangeStatus] = useState(false);
	const [inactiveCountry, setInactiveCountry] = useState(null);
	const [pagesCount, setPagesCount] = useState(1);
	const [rows, setRows] = useState(10);
	const [totalRows, setTotalRows] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	const [countryModel, setCountryModel] = useState({
		id: 0,
		code: "",
		countryName: "",
		currencyCode: "",
		createdBy: 0,
		updatedBy: 0,
		deletedBy: 0,
		roleId: 0
	});

	const setModelEmpty = () => {
		setCountryModel({
			id: 0,
			code: "",
			countryName: "",
			currencyCode: "",
			createdBy: 0,
			updatedBy: 0,
			deletedBy: 0,
			roleId: 0
		});
	};

	const CheckNull = (value: any) => {
		if (value === "" || value === undefined || value === null || value === 0) {
			return true;
		}
		return false;
	};

	const ErrorMessageEmptyModel = () => {
		setcountryErrorMessage("");
		setCountryNameErrorMessage("");
		setCountryCodeErrorMessage("");
		setCurrencyCodeErrorMessage("");
	};

	const isUpdateValidate = (values: any) => {
		ErrorMessageEmptyModel();
		let formIsValid = true;
		if (CheckNull(values.countryName)) {
			setCountryNameErrorMessage("Please enter Country Name.");
			formIsValid = false;
		}

		if (CheckNull(countryModel.code)) {
			setCountryCodeErrorMessage("Country Code already exists in the database.");
			return;
		}
		if (CheckNull(countryModel.countryName)) {
			setCountryNameErrorMessage("Country Name already exists in the database.");
			return;
		}

		return formIsValid;
	};

	const isValidate = (values: any) => {
		let formIsValid = true;
		ErrorMessageEmptyModel();
		if (CheckNull(values.countryName)) {
			setCountryNameErrorMessage("Please Enter Country Name");
			formIsValid = false;
		}
		if (CheckNull(values.code)) {
			setCountryCodeErrorMessage("Please Enter Code");
			formIsValid = false;
		}
		if (CheckNull(values.currencyCode)) {
			setCurrencyCodeErrorMessage("Please Enter Currency Code");
			formIsValid = false;
		}

		return formIsValid;
	};

	const actionBodyStatus = (rowData: any) => {
		if (Number(rowData.isActive) === 1) {
			return <>Active</>;
		} else {
			return <>Inactive</>;
		}
	};

	const debouncedSearchValue = useDebounce(globalFilterValue, 500);

	useEffect(() => {
		getCoutry();
	}, [debouncedSearchValue]);

	const getCoutry = () => {
		setPageLoding(false);
		setTableLoading(true);
		setIsLoading(true);
		ManageCountry.getCoutry()
			.then((response) => {
				const data = response.data;
				setCountryList(data);
				setTotalRows(data.length);
			})
			.catch((error) => {
				if (error?.response?.status === 500) {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: "Something went wrong while fetching countries",
						life: 3000
					});
				} else if (error?.response?.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: "Unauthorized access",
						life: 3000
					});
					Logout(navigate);
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: error.response?.title || "Error while getting country details",
						life: 3000
					});
				}
			})
			.finally(() => {
				setTableLoading(false);
				setUserLoading(false);
				setIsLoading(false);
			});
	};

	const handleSubmit = (event: React.MouseEvent<HTMLElement>): void => {
		event.preventDefault();
		ErrorMessageEmptyModel();
		setButtonLoading(true);
		setIsLoading(true);

		if (isValidate(countryModel)) {
			ManageCountry.addCountry(countryModel)
				.then(() => {
					setDisplayBasic(false);
					getCoutry();
					toast.current?.show({
						severity: "success",
						summary: "Success",
						detail: "Country added successfully",
						life: 3000
					});
				})
				.catch((error) => {
					if (error.response?.status === 409) {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: error.response.data.title,
							life: 3000
						});
					} else if (error.response?.status === 401) {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: "Unauthorized access",
							life: 3000
						});
						Logout(navigate);
					} else if (error.response?.status === 400) {
						if (error.response.data === "Country Name already exists in the database.") {
							setCountryNameErrorMessage(error.response.data);
						}
						if (error.response.data === "Country code already exists in the database.") {
							setCountryCodeErrorMessage(error.response.data);
						}
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: error.response.data.title,
							life: 3000
						});
					} else {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: "An unexpected error occurred. Please try again later.",
							life: 3000
						});
					}
				})
				.finally(() => {
					setButtonLoading(false);
					setIsLoading(false);
				});
		} else {
			setButtonLoading(false);
			setIsLoading(false);
		}
	};

	const onUpdateClick = () => {
		setUpdateButtonLoading(true);
		setIsLoading(true);
		if (isUpdateValidate(countryModel)) {
			ManageCountry.updateCountry(countryModel)
				.then(() => {
					setDisplayBasicUpdate(false);
					getCoutry();
					toast.current?.show({
						severity: "success",
						summary: "Success",
						detail: "Country updated successfully",
						life: 3000
					});
				})
				.catch((error) => {
					console.log(error);
					if (error.response?.status === 401) {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: "Unauthorized access",
							life: 3000
						});
						Logout(navigate);
					} else if (error.response?.status === 400) {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: error.response.data.title,
							life: 3000
						});
					} else {
						toast.current?.show({
							severity: "error",
							summary: "Error",
							detail: "An unexpected error occurred while updating the country",
							life: 3000
						});
					}
				})
				.finally(() => {
					setUpdateButtonLoading(false);
					setIsLoading(false);
				});
		} else {
			setUpdateButtonLoading(false);
			setIsLoading(false);
		}
	};

	const onDeleteClick = (rowData: any) => {
		setUpdateButtonLoading(true);
		setIsLoading(true);
		ManageCountry.deleteCountry(rowData.id)
			.then(() => {
				getCoutry();
				toast.current?.show({
					severity: "success",
					summary: "Success",
					detail: "Country deleted successfully",
					life: 3000
				});
			})
			.catch((error) => {
				if (error.response?.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: "Unauthorized access",
						life: 3000
					});
					Logout(navigate);
				} else if (error.response?.status === 400) {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: error.response.data,
						life: 3000
					});
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error",
						detail: "An unexpected error occurred while deleting the country",
						life: 3000
					});
				}
			})
			.finally(() => {
				setUpdateButtonLoading(false);
				setIsLoading(false);
			});
	};

	const handleCloseForAdd = () => {
		setModelEmpty();
		ErrorMessageEmptyModel();
		setDisplayBasic(false);
	};

	const reloadPage = () => {
		getCoutry();
	};

	const editCountryDetails = (rowData: CountryDataType) => {
		setCountryModel({
			id: rowData.id,
			code: rowData.code,
			countryName: rowData.countryName,
			currencyCode: rowData.currencyCode,
			createdBy: 0,
			updatedBy: 0,
			deletedBy: 0,
			roleId: 0
		});
		setDisplayBasicUpdate(true);
		ErrorMessageEmptyModel();
	};

	const inactiveCountryDetails = (rowData: CountryDataType) => {
		setInactiveCountry(rowData);
		setDisplayDeletePopup(true);
	};

	const onDeleteClickCountry = () => {
		onDeleteClick(inactiveCountry);
		setDisplayDeletePopup(false);
	};

	const reject = () => {
		ErrorMessageEmptyModel();
		setDisplayDeletePopup(false);
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
		<PageWrapper title="Country Management" headerRight={headerRight}>
			<Toast ref={toast} />
			<SearchContainer>
				<SearchWrapper>
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<Input
							type="text"
							placeholder="Search..."
							value={globalFilterValue}
							onInput={(e: any) => setGlobalFilterValue(e.target.value)}
						/>
					</span>
				</SearchWrapper>
				<ButtonGroup>
					<GlobalButton icon={<PlusOutlined />} className="primary" onClick={() => setDisplayBasic(true)}>
						Add Country
					</GlobalButton>
				</ButtonGroup>
			</SearchContainer>

			<TableContainer>
				<Table
					columns={getColumns(editCountryDetails, inactiveCountryDetails)}
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

			{/* Add Country Modal */}
			<AddCountryModal
				isVisible={displayBasic}
				onHide={handleCloseForAdd}
				countryModel={countryModel}
				setCountryModel={setCountryModel}
				countryNameErrorMessage={countryNameErrorMessage}
				countryCodeErrorMessage={countryCodeErrorMessage}
				currencyCodeErrorMessage={currencyCodeErrorMessage}
				handleSubmit={handleSubmit}
				buttonLoading={buttonLoading}
			/>

			{/* Edit Country Modal */}
			<EditCountryModal
				isVisible={displayBasicUpdate}
				onHide={() => setDisplayBasicUpdate(false)}
				countryModel={countryModel}
				setCountryModel={setCountryModel}
				countryNameErrorMessage={countryNameErrorMessage}
				countryCodeErrorMessage={countryCodeErrorMessage}
				currencyCodeErrorMessage={currencyCodeErrorMessage}
				onUpdateClick={onUpdateClick}
				updatebuttonLoading={updatebuttonLoading}
			/>

			{/* Delete Modal */}
			{displaydeletepopup && <DeleteModal onCancel={reject} onConfirm={onDeleteClickCountry} />}
		</PageWrapper>
	);
};

export default CountyManagement;
