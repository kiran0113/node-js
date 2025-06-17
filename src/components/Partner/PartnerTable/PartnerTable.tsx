import React, { useContext } from "react";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { PartnerListService } from "../../../services/Partner/Partnerlist/PartnerDetailList";
import { useNavigate } from "react-router";
import { Logout } from "../../../utils/AccountUtils";
import { ProgressSpinner } from "primereact/progressspinner";
import { InputSwitch } from "primereact/inputswitch";
import sessionStorageContext from "../../context/LocalStorageContext";
import { Table, Input } from "antd";
import { getColumns, type PartnerDataType } from "./columns";
import PageWrapper from "../../../Layout/PageWrapper";
import { SearchContainer, SearchWrapper, ButtonGroup, TableContainer, PopupOverlay, PopupContent, PopupButtons } from "./PartnerTable.styles";
import { GlobalButton } from "../../comman/GlobalButton.styles";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

const PartnerTable: React.FC = () => {
	const [loading, setLoading] = useState(true);
	const [tableLoading, setTableLoading] = useState(false);
	const [partnerList, setPartnerlist] = useState<PartnerDataType[]>([]);
	const toast = useRef<Toast>(null);
	const context = useContext(sessionStorageContext);
	const navigate = useNavigate();
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [displaydeletepopup, setDisplayDeletePopup] = useState(false);
	const [displaydeletepopupEncrypt, setDisplayDeletePopupEncrypt] = useState(false);
	const [displaydeletepopupcompliance, setdisplaydeletepopupcompliance] = useState(false);
	const [inactivePartner, setInactivePartner] = useState<PartnerDataType | null>(null);
	const [inactivePartnerEn, setInactivePartnerEn] = useState<PartnerDataType | null>(null);
	const [inactivePartnerComp, setInactivePartnerCom] = useState<PartnerDataType | null>(null);
	const [changeStatus, setChangeStatus] = useState(false);
	const [changeStatusEn, setChangeStatusEn] = useState(null);
	const [changeStatusCom, setchangeStatusCom] = useState(null);
	const [activeStatus, setActiveStatus] = useState<boolean | null>(null);
	const [activeStatusEn, setActiveStatusEn] = useState<boolean | null>(null);
	const [activeStatusComp, setActiveStatusComp] = useState<boolean | null>(null);
	const [pagesCount, setPagesCount] = useState(1);
	const [rows, setRows] = useState(10);
	const [totalRows, setTotalRows] = useState(0);

	const getPartner = () => {
		setTableLoading(true);

		PartnerListService.GetPartnerList()
			.then((response) => {
				const data = response.data;
				setPartnerlist(data);
				setTotalRows(data.length);
				setTableLoading(false);
				setLoading(false);
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
						summary: "Error while getting user details.",
						life: 3000
					});
				}
				setTableLoading(false);
				setLoading(false);
			});
	};

	const ViewPartner = (rowData: PartnerDataType) => {
		navigate(`admin/${rowData.id}`);
	};

	const InactivePartnerDetails = (rowData: PartnerDataType, value: boolean) => {
		setActiveStatus(Boolean(rowData.isActive));
		setChangeStatus(value);
		setInactivePartner(rowData);
		setDisplayDeletePopup(true);
	};

	const inactivePartnerIDEncrypt = (rowData: any, value: boolean) => {
		setActiveStatusEn(rowData.isEncryption);
		setChangeStatusEn(value);
		setInactivePartnerEn(rowData);
		setDisplayDeletePopupEncrypt(true);
	};

	const inactivePartnerCompliance = (rowData: any, value: boolean) => {
		setActiveStatusComp(rowData.exComplianceCheck);
		setchangeStatusCom(value);
		setInactivePartnerCom(rowData);
		setdisplaydeletepopupcompliance(true);
	};

	const reject = () => {
		setDisplayDeletePopup(false);
	};

	const onDeleteClickUser = () => {
		if (inactivePartner) {
			onDeleteClick(inactivePartner.id);
			setDisplayDeletePopup(false);
		}
	};

	const rejectEncrypt = () => {
		setDisplayDeletePopupEncrypt(false);
	};

	const rejectCompliance = () => {
		setdisplaydeletepopupcompliance(false);
	};

	const onDeleteClickUserEncrypt = () => {
		if (inactivePartnerEn) {
			onDeleteClickEncrypt(inactivePartnerEn.id);
			setDisplayDeletePopupEncrypt(false);
		}
	};

	const onDeleteClickUserCompliance = () => {
		if (inactivePartnerComp) {
			onDeleteClickCompliance(inactivePartnerComp.id);
			setdisplaydeletepopupcompliance(false);
		}
	};

	const onDeleteClick = (id: number) => {
		setLoading(true);
		PartnerListService.inactivePartnerID(id, changeStatus)
			.then(() => {
				getPartner();
				setLoading(false);
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
						summary: "Error while getting user details.",
						life: 3000
					});
				}
			});
	};

	const onDeleteClickEncrypt = (id: number) => {
		setLoading(true);
		PartnerListService.inactivePartnerIDEncrypt(id, changeStatusEn)
			.then(() => {
				getPartner();
				setLoading(false);
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
						summary: "Error while getting user details.",
						life: 3000
					});
				}
			});
	};

	const onDeleteClickCompliance = (id: number) => {
		setLoading(true);
		PartnerListService.inactivePartnerCompliance(id, changeStatusCom)
			.then(() => {
				getPartner();
				setLoading(false);
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
						summary: "Error while getting user details.",
						life: 3000
					});
				}
			});
	};

	const onAddClick = () => {
		context.updateLogoSrc(null);
		context.updateLegalName(null);
		context.updateDbaName(null);
		navigate(`../partnerdetails/${0}/${"A"}`);
	};

	const onRefreshClick = () => {
		getPartner();
	};

	useEffect(() => {
		const useroobj = sessionStorage.getItem("User");
		if (useroobj === null || useroobj === undefined) {
			Logout(navigate);
		}
		getPartner();
	}, []);

	const handleTableChange = (pagination: any) => {
		setPagesCount(pagination.current);
		setRows(pagination.pageSize);
	};

	const headerRight = (
		<ButtonGroup>
			<GlobalButton icon={<PlusOutlined />} className="primary" onClick={onAddClick}>
				Add Partner
			</GlobalButton>
			<GlobalButton icon={<ReloadOutlined />} className="primary" onClick={onRefreshClick}>
				Refresh
			</GlobalButton>
		</ButtonGroup>
	);

	if (loading) {
		return (
			<div className="spinner-class">
				<ProgressSpinner />
			</div>
		);
	}

	return (
		<PageWrapper title="Partner Management" headerRight={headerRight}>
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
					columns={getColumns(ViewPartner, InactivePartnerDetails, inactivePartnerIDEncrypt, inactivePartnerCompliance)}
					dataSource={partnerList}
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

			{displaydeletepopup && (
				<PopupOverlay>
					<PopupContent>
						<div className="awesome-text">
							<h4>
								<i className="pi pi-info-circle"></i>
								Are you sure you want to {activeStatus ? "inactive" : "active"} partner?
							</h4>
						</div>
						<PopupButtons>
							<GlobalButton className="secondary" onClick={reject}>
								No
							</GlobalButton>
							<GlobalButton className="primary" onClick={onDeleteClickUser}>
								Yes
							</GlobalButton>
						</PopupButtons>
					</PopupContent>
				</PopupOverlay>
			)}

			{displaydeletepopupEncrypt && (
				<PopupOverlay>
					<PopupContent>
						<div className="awesome-text">
							<h4>
								<i className="pi pi-info-circle"></i>
								Are you sure that you want to {activeStatusEn ? "disable" : "enable"} Encryption for partner?
							</h4>
						</div>
						<PopupButtons>
							<GlobalButton className="secondary" onClick={rejectEncrypt}>
								No
							</GlobalButton>
							<GlobalButton className="primary" onClick={onDeleteClickUserEncrypt}>
								Yes
							</GlobalButton>
						</PopupButtons>
					</PopupContent>
				</PopupOverlay>
			)}

			{displaydeletepopupcompliance && (
				<PopupOverlay>
					<PopupContent>
						<div className="awesome-text">
							<h4>
								<i className="pi pi-info-circle"></i>
								Are you sure that you want to {activeStatusComp ? "disable" : "enable"} Compliance for partner?
							</h4>
						</div>
						<PopupButtons>
							<GlobalButton className="secondary" onClick={rejectCompliance}>
								No
							</GlobalButton>
							<GlobalButton className="primary" onClick={onDeleteClickUserCompliance}>
								Yes
							</GlobalButton>
						</PopupButtons>
					</PopupContent>
				</PopupOverlay>
			)}
		</PageWrapper>
	);
};

export default PartnerTable;
