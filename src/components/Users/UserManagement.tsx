import { useEffect, useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { AutoComplete } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Input } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import CloseIcon from "../../assets/images/icon/close-icon.png";
import { IUserManagement } from "../../models/IUserManagement";
import { UserManagementService } from "../../services/Partner/UserManagement/UserManagementService";
import { Logout } from "../../utils/AccountUtils";
import { statusList, validEmail } from "../../utils/utils";
import PageWrapper from "../../Layout/PageWrapper";
import { getColumns, type UserDataType } from "./columns";
import {
	SearchContainer,
	SearchWrapper,
	ButtonGroup,
	TableContainer,
	PopupOverlay,
	PopupContent,
	PopupButtons,
	FormContainer,
	FormRow,
	FormGroup,
	DialogFooter
} from "./UserManagement.styles";
import { GlobalButton } from "../comman/GlobalButton.styles";

import "react-phone-number-input/style.css";

import React from "react";

import { InputText } from "primereact/inputtext";

import Scrollbars from "react-custom-scrollbars-2";

import moment from "moment";

const UserManagement: React.FC = () => {
	const [displayBasic, setDisplayBasic] = useState(false);
	const [displayBasicUpdate, setDisplayBasicUpdate] = useState(false);
	const navigate = useNavigate();
	const toast = useRef<Toast>(null);
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [userNameErrorMessage, setuserNameErrorMessage] = useState("");
	const [firstNameErrorMessage, setfirstNameErrorMessage] = useState("");
	const [lastNameErrorMessage, setlastNameErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const [userloading, setUserLoading] = useState(true);
	const [tableLoading, setTableLoading] = useState(false);
	const [userList, setUserList] = useState<UserDataType[]>([]);
	const [userrolelist, setUserRoleList] = useState<any[]>([]);
	const [filteredItems, setFilteredItems] = useState<any>(null);
	const [statusfilteredItems, setStatusFilteredItems] = useState<any>(null);
	const [roleAutoComplete, setRoleAutoComplete] = useState("");
	const [statusAutoComplete, setStatusAutoComplete] = useState("");
	const [roleerrorMessage, setroleErrorMessage] = useState("");
	const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
	const [statuserrorMessage] = useState("");
	const [buttonLoading, setButtonLoading] = useState(false);
	const [pageloading, setPageLoding] = useState(true);
	const [updatebuttonLoading, setUpdateButtonLoading] = useState(false);
	const [activeStatus, setActiveStatus] = useState<boolean | null>(null);
	const [changeStatus, setChangeStatus] = useState(false);
	const [inactiveUser, setInactiveUser] = useState<UserDataType | null>(null);
	const [pagesCount, setPagesCount] = useState(1);
	const [rows, setRows] = useState(10);
	const [totalRows, setTotalRows] = useState(0);
	const [confirmLoading, setConfirmLoading] = useState(false);

	const [userModel, setUserModel] = useState({
		id: 0,
		firstName: "",
		lastName: "",
		userName: "",
		roleName: "",
		roleId: 0,
		isActive: true
	});

	const setModelEmpty = () => {
		setUserModel({
			id: 0,
			firstName: "",
			lastName: "",
			userName: "",
			roleName: "",
			roleId: 0,
			isActive: true
		});
	};

	const CheckNull = (value: any) => {
		if (value === "" || value === undefined || value === null || value === 0) {
			return true;
		}
		return false;
	};

	const ErrorMessageEmptyModel = () => {
		setroleErrorMessage("");
		setfirstNameErrorMessage("");
		setlastNameErrorMessage("");
		setuserNameErrorMessage("");
	};

	const isUpdateValidate = (values: any) => {
		ErrorMessageEmptyModel();
		let formIsValid = true;
		if (CheckNull(values.legalFirstName)) {
			formIsValid = false;
		}
		if (!CheckNull(values.firstlegalFirstNameName)) {
			if (values.legalFirstName.trim().length === 0) {
				formIsValid = false;
			}
		}
		if (CheckNull(values.legalLastName)) {
			formIsValid = false;
		}
		if (!CheckNull(values.legalLastName)) {
			if (values.legalLastName.trim().length === 0) {
				formIsValid = false;
			}
		}

		if (CheckNull(values.businessEmail)) {
			formIsValid = false;
		}
		if (!CheckNull(values.businessEmail)) {
			if (values.businessEmail.trim().length === 0) {
				formIsValid = false;
			}
			if (!validEmail.test(values.businessEmail)) {
				formIsValid = false;
			}
		}

		if (CheckNull(values.roleId)) {
			setroleErrorMessage("Please select role.");

			formIsValid = false;
		}
		return formIsValid;
	};

	const isValidate = (values: any) => {
		let formIsValid = true;
		ErrorMessageEmptyModel();
		if (CheckNull(values.firstName)) {
			setfirstNameErrorMessage("Please enter firstname");
			formIsValid = false;
		}

		if (CheckNull(values.lastName)) {
			setlastNameErrorMessage("Please enter lastname");
			formIsValid = false;
		}

		if (CheckNull(values.userName)) {
			setuserNameErrorMessage("Please enter email");
			formIsValid = false;
		}
		if (!CheckNull(values.userName)) {
			if (!validEmail.test(values.userName)) {
				setuserNameErrorMessage("Please enter valid email");
				formIsValid = false;
			}
		}
		if (CheckNull(values.roleId)) {
			setroleErrorMessage("Please select role.");

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

	const getUserById = (rowData: any, userid: any) => {
		setLoading(true);
		UserManagementService.getUserById(rowData.id)
			.then((response) => {
				const data = response.data;
				data.legalFirstName = rowData.firstName;
				data.legalLastName = rowData.lastName;
				data.businessEmail = rowData.userName;
				data.userId = rowData.id;

				setUserModel(data);
				setLoading(false);
				if (data.isActive === true) {
					data.isActive === true ? setStatusAutoComplete("Active") : setStatusAutoComplete("InActive");
				}

				setRoleAutoComplete(data.roleName);
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
				setLoading(false);
			});
	};

	const onUpdateClick = () => {
		setUpdateButtonLoading(true);
		// userModel.partnerId = 0;

		if (isUpdateValidate(userModel)) {
			UserManagementService.updateUserProfile(userModel)
				.then((response) => {
					setUpdateButtonLoading(false);
					setDisplayBasicUpdate(false);
					getUsers();
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
		} else {
			setUpdateButtonLoading(false);
		}
	};

	const onDeleteClick = (rowData: any) => {
		setUpdateButtonLoading(true);
		UserManagementService.updateUserProfileStatus(rowData.id, changeStatus)
			.then(() => {
				setUpdateButtonLoading(false);
				getUsers();
				setDisplayDeletePopup(false);
				toast.current?.show({
					severity: "success",
					summary: `User ${changeStatus ? "activated" : "deactivated"} successfully`,
					life: 3000
				});
			})
			.catch((error) => {
				if (error.response?.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else {
					toast.current?.show({
						severity: "error",
						summary: "Error updating user status",
						life: 3000
					});
				}
			})
			.finally(() => {
				setUpdateButtonLoading(false);
				setConfirmLoading(false);
			});
	};

	const handleCloseForAdd = () => {
		setModelEmpty();
		setDisplayBasic(false);
	};

	const reloadPage = () => {
		getUsers();
		getUserRole();
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setButtonLoading(true);

		if (isValidate(userModel)) {
			UserManagementService.addUser(userModel)
				.then(() => {
					getUsers();
					handleCloseForAdd();
					toast.current?.show({
						severity: "success",
						summary: "User added successfully",
						life: 3000
					});
				})
				.catch((error) => {
					if (error.response?.status === 409) {
						setuserNameErrorMessage(error.response.data);
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
							summary: "Error adding user",
							life: 3000
						});
					}
				})
				.finally(() => {
					setButtonLoading(false);
				});
		} else {
			setButtonLoading(false);
		}
	};

	const getUsers = () => {
		setPageLoding(false);
		setTableLoading(true);
		UserManagementService.getUsers()
			.then((response) => {
				const data = response.data;

				setUserList(data);
				setRoleAutoComplete(data.roleName);
				setTableLoading(false);
				setUserLoading(false);
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
				setTableLoading(false);
				setUserLoading(false);
			});
	};

	const getUserRole = () => {
		UserManagementService.getUserRole()
			.then((response) => {
				const data = response.data;

				setUserRoleList(data);
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
			});
	};

	const searchItems = (event: any) => {
		let query = event.query;
		let _filteredItems: any = [];
		for (let i = 0; i < userrolelist.length; i++) {
			let item = userrolelist[i];

			if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
				_filteredItems.push(item);
			}
		}
		setFilteredItems(_filteredItems);
	};

	const searchStatusItems = (event: any) => {
		let query = event.query;
		let _filteredItems: any = [];
		for (let i = 0; i < statusList.length; i++) {
			let item = statusList[i];

			if (item.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
				_filteredItems.push(item);
			}
		}
		setStatusFilteredItems(_filteredItems);
	};

	const onRoleAddChange = (e: any) => {
		if (e.value !== null) {
			setRoleAutoComplete(e.value);
			setUserModel({
				...userModel,
				roleId: e.value.id
			});
		}
	};

	const onStatusChange = (e: any) => {
		if (e.value !== null) {
			setStatusAutoComplete(e.value);

			setUserModel({
				...userModel,
				isActive: e.value.value
			});
		}
	};

	const ShowHideDialog = () => {
		setModelEmpty();
		setDisplayBasic(true);
	};

	const onHideClick = () => {
		setDisplayBasic(false);
	};

	const onUpdateHideClick = () => {
		setDisplayBasicUpdate(false);
	};

	const actionBodyTemplateFullName = (rowData: any) => {
		return (
			<>
				{rowData.firstName} {rowData.lastName}
			</>
		);
	};

	const editUserDetails = (rowData: any) => {
		setDisplayBasicUpdate(true);
		ErrorMessageEmptyModel();
		getUserById(rowData, rowData.Id);
	};

	const onDeleteClickUser = () => {
		setConfirmLoading(true);
		onDeleteClick(inactiveUser);
	};

	const reject = () => {
		ErrorMessageEmptyModel();
		setDisplayDeletePopup(false);
	};

	const formatDateField = (rowData: any) => {
		return (
			<React.Fragment>
				<span>{moment(rowData.createdDate).format("MM/DD/YYYY H:mm.ss")} </span>
			</React.Fragment>
		);
	};

	useEffect(() => {
		const userobj = sessionStorage.getItem("User");
		if (userobj === null || userobj === undefined) {
			Logout(navigate);
		}

		getUsers();

		getUserRole();
	}, []);

	const inactiveUserDetails = (rowData: UserDataType, value: boolean) => {
		setActiveStatus(rowData.isActive);
		setChangeStatus(value);
		setInactiveUser(rowData);
		setDisplayDeletePopup(true);
	};

	const handleTableChange = (pagination: any) => {
		setPagesCount(pagination.current);
		setRows(pagination.pageSize);
	};

	const headerRight = (
		<ButtonGroup>
			<GlobalButton icon={<PlusOutlined />} className="primary" onClick={ShowHideDialog}>
				Add User
			</GlobalButton>
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
		<PageWrapper title="User Management" headerRight={headerRight}>
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
					columns={getColumns(editUserDetails, inactiveUserDetails)}
					dataSource={userList}
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
				<div className="spinner-class">
					<ProgressSpinner />
				</div>
			) : (
				<Dialog visible={displayBasic} onHide={onHideClick} className="user-dialog">
					<FormContainer>
						<button className="close-btn" onClick={onHideClick}>
							<img src={CloseIcon} alt="close" />
						</button>
						<h2>Add User</h2>

						<FormRow>
							<FormGroup>
								<label>
									First Name <span className="required">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter first name"
									value={userModel.firstName}
									onChange={(e) => {
										const value = e.target.value;
										const re = /^[A-Za-z\s]+$/;
										if (re.test(value) || value === "") {
											setUserModel({
												...userModel,
												firstName: value
											});
										}
									}}
								/>
								{firstNameErrorMessage && <span className="error-message">{firstNameErrorMessage}</span>}
							</FormGroup>

							<FormGroup>
								<label>
									Last Name <span className="required">*</span>
								</label>
								<input
									type="text"
									className="form-control"
									placeholder="Enter last name"
									value={userModel.lastName}
									onChange={(e) =>
										setUserModel({
											...userModel,
											lastName: e.target.value
										})
									}
								/>
								{lastNameErrorMessage && <span className="error-message">{lastNameErrorMessage}</span>}
							</FormGroup>
						</FormRow>

						<FormRow>
							<FormGroup>
								<label>
									Email <span className="required">*</span>
								</label>
								<input
									type="email"
									className="form-control"
									placeholder="Enter email"
									value={userModel.userName}
									onChange={(e) =>
										setUserModel({
											...userModel,
											userName: e.target.value
										})
									}
								/>
								{userNameErrorMessage && <span className="error-message">{userNameErrorMessage}</span>}
							</FormGroup>

							<FormGroup>
								<label>
									Role <span className="required">*</span>
								</label>
								<AutoComplete
									forceSelection
									field="name"
									dropdown
									aria-label="roles"
									minLength={1}
									dropdownAriaLabel="Select Role"
									className="dropdown-acc"
									placeholder="Select role"
									virtualScrollerOptions={{ itemSize: 38 }}
									suggestions={filteredItems}
									completeMethod={searchItems}
									onChange={onRoleAddChange}
									value={roleAutoComplete}
								/>
								{roleerrorMessage && <span className="error-message">{roleerrorMessage}</span>}
							</FormGroup>
						</FormRow>

						<DialogFooter>
							<GlobalButton className="secondary" onClick={handleCloseForAdd}>
								Cancel
							</GlobalButton>
							<GlobalButton className="primary" loading={buttonLoading} onClick={handleSubmit}>
								Save
							</GlobalButton>
						</DialogFooter>
					</FormContainer>
				</Dialog>
			)}

			{loading ? (
				<div className="spinner-class">
					<ProgressSpinner />
				</div>
			) : (
				<Dialog visible={displayBasicUpdate} onHide={onUpdateHideClick} className="user-dialog">
					<FormContainer>
						<button className="close-btn" onClick={onUpdateHideClick}>
							<img src={CloseIcon} alt="close" />
						</button>

						<FormRow>
							<FormGroup>
								<label>
									Legal First Name <span className="required">*</span>
								</label>
								<input
									className="form-control"
									type="text"
									placeholder="Enter legal first name"
									value={userModel.firstName}
									onChange={(e) =>
										setUserModel({
											...userModel,
											firstName: e.target.value
										})
									}
								/>
								{firstNameErrorMessage && <span className="error-message">{firstNameErrorMessage}</span>}
							</FormGroup>

							<FormGroup>
								<label>
									Legal Last Name <span className="required">*</span>
								</label>
								<input
									className="form-control"
									type="text"
									placeholder="Enter legal last name"
									value={userModel.lastName}
									onChange={(e) =>
										setUserModel({
											...userModel,
											lastName: e.target.value
										})
									}
								/>
								{lastNameErrorMessage && <span className="error-message">{lastNameErrorMessage}</span>}
							</FormGroup>
						</FormRow>

						<FormRow>
							<FormGroup>
								<label>
									Business Email <span className="required">*</span>
								</label>
								<input disabled className="form-control" type="text" placeholder="Enter business email" value={userModel.userName} />
								{userNameErrorMessage && <span className="error-message">{userNameErrorMessage}</span>}
							</FormGroup>
						</FormRow>

						<FormRow>
							<FormGroup>
								<label>
									Select role <span className="required">*</span>
								</label>
								<AutoComplete
									forceSelection
									field="name"
									dropdown
									aria-label="roles"
									minLength={1}
									dropdownAriaLabel="Select Role"
									className="dropdown-acc"
									placeholder="Select role"
									virtualScrollerOptions={{ itemSize: 38 }}
									suggestions={filteredItems}
									completeMethod={searchItems}
									onChange={onRoleAddChange}
									value={roleAutoComplete}
								/>
								{roleerrorMessage && <span className="error-message">{roleerrorMessage}</span>}
							</FormGroup>

							<FormGroup>
								<label>
									Select status <span className="required">*</span>
								</label>
								<AutoComplete
									forceSelection
									field="name"
									dropdown
									aria-label="status"
									minLength={1}
									dropdownAriaLabel="Select status"
									className="dropdown-acc"
									placeholder="Select status"
									virtualScrollerOptions={{ itemSize: 38 }}
									suggestions={statusfilteredItems}
									completeMethod={searchStatusItems}
									onChange={onStatusChange}
									value={statusAutoComplete}
								/>
								{statuserrorMessage && <span className="error-message">{statuserrorMessage}</span>}
							</FormGroup>
						</FormRow>

						<DialogFooter>
							<GlobalButton className="secondary" onClick={onUpdateHideClick}>
								Cancel
							</GlobalButton>
							<GlobalButton className="primary" loading={updatebuttonLoading} onClick={onUpdateClick}>
								Save
							</GlobalButton>
						</DialogFooter>
					</FormContainer>
				</Dialog>
			)}

			{displaydeletepopup && (
				<PopupOverlay>
					<PopupContent>
						<div className="awesome-text">
							<h4>
								<i className="pi pi-info-circle"></i>
								Are you sure you want to {activeStatus ? "inactive" : "active"} user?
							</h4>
						</div>
						<PopupButtons>
							<GlobalButton className="secondary" onClick={reject} disabled={confirmLoading}>
								No
							</GlobalButton>
							<GlobalButton className="primary" onClick={onDeleteClickUser} loading={confirmLoading} disabled={confirmLoading}>
								Yes
							</GlobalButton>
						</PopupButtons>
					</PopupContent>
				</PopupOverlay>
			)}
		</PageWrapper>
	);
};

export default UserManagement;
