import React from "react";
import { ColumnsType } from "antd/es/table";
import { IconButton } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditNoteIcon from "@mui/icons-material/EditNote";
import moment from "moment";

interface DataType {
	paymentId: string;
	partnerName: string;
	sanctionStatus: string;
	actiontaken: number | null;
	actionTakenBy: number | null;
	remark1: string | null;
	remark2: string | null;
	senderSanctiondetailResponse: string;
	paymentStatus: string;
	isExternalComplianceRequired: number;
	creationDate: string;
}

export const getColumns = (
	handleOpenPopup: (paymentId: string) => void,
	handleRejectPopup1: (paymentId: string) => void,
	note1ClickHandler: (rowData: DataType) => void,
	link1ClickHandler: (rowData: DataType) => void,
	link2ClickHandler: (rowData: DataType) => void,
	approvePayments: any[],
	navigate: (path: string) => void
): ColumnsType<DataType> => {
	const columns: ColumnsType<DataType> = [
		{
			title: "Payment ID",
			dataIndex: "paymentId",
			key: "paymentId",
			render: (text: string) => (
				<a
					onClick={() => navigate(`/transaction-details/${text}`)}
					style={{
						color: "var(--purple-light)",
						cursor: "pointer",
						textDecoration: "underline"
					}}
				>
					{text}
				</a>
			)
		},
		{
			title: "Created Date",
			dataIndex: "creationDate",
			key: "creationDate",
			sorter: (a, b) => moment(a.creationDate).unix() - moment(b.creationDate).unix(),
			width: "15%",
			render: (text) => moment(text).format("MM/DD/YYYY H:mm.ss")
		},
		{
			title: "Partner Name",
			dataIndex: "partnerName",
			key: "partnerName",
			sorter: (a: DataType, b: DataType) => a.partnerName.localeCompare(b.partnerName)
		},
		{
			title: "Sanction Status",
			dataIndex: "sanctionStatus",
			key: "sanctionStatus",
			render: (status: string) => {
				let imageSrc = "";
				if (status === "GREEN") {
					imageSrc = require("../../../assets/images/GreenStatus.png");
				} else if (status === "AMBER") {
					imageSrc = require("../../../assets/images/YellowStatus.png");
				} else if (status === "RED") {
					imageSrc = require("../../../assets/images/RedStatus.png");
				}
				return imageSrc ? <img src={imageSrc} alt={status} style={{ width: "20px", height: "20px" }} /> : null;
			}
		},
		{
			title: "Sanction Details",
			key: "sanctionDetails",
			render: (_: any, record: DataType) => (
				<div>
					<a
						className="payment-id-link"
						onClick={() => link1ClickHandler(record)}
						style={{ marginRight: "10px", cursor: "pointer", color: "var(--purple-light)" }}
					>
						Sender Sanction detail Response
					</a>
					<br />
					<a
						className="payment-id-link"
						onClick={() => link2ClickHandler(record)}
						style={{ cursor: "pointer", color: "var(--purple-light)" }}
					>
						Receiver Sanction detail Response
					</a>
				</div>
			)
		},
		{
			title: "Manual Decision",
			key: "manualDecision",
			render: (_: any, record: DataType) => (
				<div className="sactionstyle">
					<IconButton
						color="success"
						disabled={
							(record.actiontaken === null && record.isExternalComplianceRequired === 1) ||
							(record.actiontaken === 0 && record.isExternalComplianceRequired === 0) ||
							(record.actionTakenBy === 0 && record.isExternalComplianceRequired === 1) ||
							(record.actionTakenBy === 0 && record.isExternalComplianceRequired === 0) ||
							(record.actionTakenBy === 1 && record.actiontaken === 0)
						}
						onClick={() => handleOpenPopup(record.paymentId)}
					>
						<CheckIcon />
					</IconButton>
					<IconButton
						sx={{ color: "red" }}
						disabled={
							(record.actiontaken === null && record.isExternalComplianceRequired === 1) ||
							(record.actiontaken === 0 && record.isExternalComplianceRequired === 0) ||
							(record.actionTakenBy === 0 && record.isExternalComplianceRequired === 1) ||
							(record.actionTakenBy === 0 && record.isExternalComplianceRequired === 0) ||
							(record.actionTakenBy === 1 && record.actiontaken === 0)
						}
						onClick={() => handleRejectPopup1(record.paymentId)}
					>
						<CloseIcon />
					</IconButton>
				</div>
			)
		},
		{
			title: "Action Taken",
			dataIndex: "actiontaken",
			key: "actiontaken",
			sorter: (a: DataType, b: DataType) => {
				// Handle null values
				if (a.actiontaken === null && b.actiontaken === null) return 0;
				if (a.actiontaken === null) return -1;
				if (b.actiontaken === null) return 1;
				return a.actiontaken - b.actiontaken;
			},
			render: (action: number | null) => {
				if (action === null) return "Pending";
				return action === 1 ? "Approved" : action === 0 ? "Reject" : "Unknown";
			}
		},
		{
			title: "Notes",
			key: "notes",
			render: (_: any, record: DataType) => (
				<IconButton onClick={() => note1ClickHandler(record)} style={{ marginRight: "10px", display: "flex", alignItems: "center" }}>
					<EditNoteIcon />
				</IconButton>
			)
		}
	];

	return columns;
};
