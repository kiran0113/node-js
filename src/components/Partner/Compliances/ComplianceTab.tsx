import React, { useState, useEffect, useRef } from "react";
import { IsValidRoute } from "../../../utils/AccountUtils";
import { useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import { Logout } from "../../../utils/AccountUtils";
import Scrollbars from "react-custom-scrollbars-2";
import { ComplainceTabapi } from "./ComplianceTabapi";
import { Dialog } from "primereact/dialog";
import { Table, Modal, message, Input } from "antd";
import { getColumns } from "./columns";
import Copy_icon from "../../../assets/images/copy.svg";
import { UpdateAction } from "./types";
import ApprovalModal from "./modals/ApprovalModal";
import RejectModal from "./modals/RejectModal";
import SanctionDetailsModal from "./modals/SanctionDetailsModal";
import NotesModal from "./modals/NotesModal";
import PageWrapper from "../../../Layout/PageWrapper";
import { ButtonGroup, SearchContainer, SearchWrapper, TableContainer } from "./Comliance.style";
import { GlobalButton } from "../../comman/GlobalButton.styles";
import { ReloadOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@mui/icons-material";

const ComplainceTab: React.FC = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [pageloading, setPageLoading] = useState(true);
	const [reportData, setReportData] = useState<any[]>([]);
	const toast = useRef<Toast>(null);
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const [rows, setRows] = useState(10);
	const [totalRows, setTotalRows] = useState(0);
	const [pagesCount, setPagesCount] = useState(1);

	const [isPopupVisible, setPopupVisible] = useState(false);
	const [popupContent, setPopupContent] = useState("");
	const [popupnoteContent, setPopupnoteContent] = useState("");
	const [isPopupnoteVisible, setPopupnoteVisible] = useState(false);
	const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
	const [isRejectPopupOpen1, setIsRejectPopupOpen1] = useState(false);

	const [actioncomment, setActionComment] = useState("");
	const [actioncomment1, setActionComment1] = useState("");
	const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
	const [approvePayments, setApprovePayments] = useState<string[]>([]);
	const [rejectedPayments, setRejectedPayments] = useState<string[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [filteredData, setFilteredData] = useState([]);

	useEffect(() => {
		IsValidRoute(navigate);
		const useroobj = sessionStorage.getItem("User");
		if (useroobj === null || useroobj === undefined) {
			Logout(navigate);
		}
		getReportData();
	}, []);

	const getReportData = () => {
		setLoading(true);
		ComplainceTabapi.getReportsDetails(sessionStorage.getItem("PartnerId"), pagesCount, rows)
			.then((data: any) => {
				setReportData(data.data.responsePartnerSanction);
				setTotalRows(data.data.totalRows);
				setPageLoading(false);
			})
			.catch((error: any) => {
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
						summary: "Error fetching data",
						life: 3000
					});
				}
				setReportData([]);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleOpenPopup = (paymentId: string) => {
		setSelectedPaymentId(paymentId);
		setIsConfirmPopupOpen(true);
	};

	const handleRejectPopup1 = (paymentId: string) => {
		setSelectedPaymentId(paymentId);
		setIsRejectPopupOpen1(true);
	};

	const handleConfirmApprove = () => {
		if (!selectedPaymentId || actioncomment === "") return;

		setLoading(true);
		ComplainceTabapi.ApproveReject(selectedPaymentId, "APPROVE" satisfies UpdateAction, actioncomment)
			.then(() => {
				setApprovePayments((prev) => [...prev, selectedPaymentId]);
				setIsConfirmPopupOpen(false);
				setActionComment("");
				getReportData();
			})
			.catch((error) => {
				toast.current?.show({
					severity: "error",
					summary: "Error approving payment",
					life: 3000
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const handleConfirmReject = () => {
		if (!selectedPaymentId || actioncomment1 === "") return;

		setLoading(true);
		ComplainceTabapi.ApproveReject(selectedPaymentId, "REJECT" satisfies UpdateAction, actioncomment1)
			.then(() => {
				setRejectedPayments((prev) => [...prev, selectedPaymentId]);
				setIsRejectPopupOpen1(false);
				setActionComment1("");
				getReportData();
			})
			.catch((error) => {
				toast.current?.show({
					severity: "error",
					summary: "Error rejecting payment",
					life: 3000
				});
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const note1ClickHandler = (rowData: any) => {
		const combinedRemarks = `${rowData.remark1 || ""} \n ${rowData.remark2 || ""}`.trim();
		setPopupnoteContent(combinedRemarks);
		setPopupnoteVisible(true);
	};

	const formatSanctionResponse = (jsonString: string) => {
		try {
			const jsonData = JSON.parse(jsonString);
			const data = JSON.stringify(jsonData, null, 2);

			return data;
		} catch (error) {
			return "Error parsing sanction details";
		}
	};

	const link1ClickHandler = (rowData: any) => {
		const formattedContent = formatSanctionResponse(rowData.senderSanctiondetailResponse);
		setPopupContent(formattedContent);
		setPopupVisible(true);
	};

	const link2ClickHandler = (rowData: any) => {
		const formattedContent = formatSanctionResponse(rowData.senderSanctiondetailResponse);
		setPopupContent(formattedContent);
		setPopupVisible(true);
	};

	const copyToClipBoard = async () => {
		if (textareaRef.current) {
			try {
				await navigator.clipboard.writeText(textareaRef.current.value);
				message.success({
					content: "Copied to clipboard!",
					duration: 2,
					style: {
						marginTop: "10px",
						position: "fixed",
						top: "20px",
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: "9999"
					}
				});
			} catch (err) {
				message.error({
					content: "Failed to copy text",
					duration: 2,
					style: {
						marginTop: "10px",
						position: "fixed",
						top: "20px",
						left: "50%",
						transform: "translateX(-50%)",
						zIndex: "9999"
					}
				});
			}
		}
	};

	const columns = getColumns(
		handleOpenPopup,
		handleRejectPopup1,
		note1ClickHandler,
		link1ClickHandler,
		link2ClickHandler,
		approvePayments,
		navigate
	);
	const handleTableChange = (pagination: any) => {
		setPagesCount(pagination);
	};

	useEffect(() => {
		getReportData();
	}, [pagesCount]);

	useEffect(() => {
		setFilteredData(reportData);
	}, [reportData]);

	useEffect(() => {
		const filtered = reportData.filter((item) =>
			Object.values(item).some((value) => String(value).toLowerCase().includes(searchValue.toLowerCase()))
		);
		setFilteredData(filtered);
	}, [searchValue, reportData]);

	const reloadPage = () => {
		getReportData();
	};

	const headerRight = (
		<ButtonGroup>
			<GlobalButton icon={<ReloadOutlined />} className="primary" onClick={reloadPage}>
				Refresh
			</GlobalButton>
		</ButtonGroup>
	);

	const handleApprovalModalHide = () => {
		setIsConfirmPopupOpen(false);
		setActionComment("");
	};

	const handleRejectModalHide = () => {
		setIsRejectPopupOpen1(false);
		setActionComment1("");
	};

	if (pageloading) {
		return (
			<div className="spinner-class">
				<ProgressSpinner />
			</div>
		);
	}

	return (
		<PageWrapper title="Compliance" headerRight={headerRight}>
			<Toast ref={toast} />
			<SearchContainer>
				<SearchWrapper>
					<Input
						placeholder="Search compliance..."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						prefix={<SearchOutlined />}
						allowClear
					/>
				</SearchWrapper>
			</SearchContainer>
			<TableContainer>
				<Table
					columns={columns}
					dataSource={filteredData}
					pagination={{
						current: pagesCount,
						pageSize: rows,
						total: totalRows,
						onChange: handleTableChange,
						showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
					}}
					rowKey="paymentId"
					loading={loading}
					scroll={{ x: "max-content" }}
				/>
			</TableContainer>

			{/* Approval Dialog */}
			<ApprovalModal
				isVisible={isConfirmPopupOpen}
				onHide={handleApprovalModalHide}
				onApprove={handleConfirmApprove}
				comment={actioncomment}
				onCommentChange={(value) => setActionComment(value)}
				loading={loading}
			/>

			{/* Reject Dialog */}
			<RejectModal
				isVisible={isRejectPopupOpen1}
				onHide={handleRejectModalHide}
				onReject={handleConfirmReject}
				comment={actioncomment1}
				onCommentChange={(value) => setActionComment1(value)}
				loading={loading}
			/>

			{/* Sanction Details Modal */}
			<SanctionDetailsModal
				isVisible={isPopupVisible}
				onHide={() => setPopupVisible(false)}
				content={popupContent}
				onCopy={copyToClipBoard}
				textareaRef={textareaRef}
			/>

			{/* Notes Modal */}
			<NotesModal isVisible={isPopupnoteVisible} onHide={() => setPopupnoteVisible(false)} content={popupnoteContent} />
		</PageWrapper>
	);
};

export default ComplainceTab;
