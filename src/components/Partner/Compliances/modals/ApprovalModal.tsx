import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "antd";

interface ApprovalModalProps {
	isVisible: boolean;
	onHide: () => void;
	onApprove: () => void;
	comment: string;
	onCommentChange: (value: string) => void;
	loading: boolean;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({ isVisible, onHide, onApprove, comment, onCommentChange, loading }) => {
	return (
		<Dialog
			header="Approve Payment"
			visible={isVisible}
			onHide={onHide}
			modal
			footer={null}
			style={{ width: "500px" }}
			contentStyle={{ padding: "20px" }}
		>
			<div className="modal-content">
				<p
					style={{
						fontSize: "16px",
						marginBottom: "20px",
						color: "var(--purple-dark)",
						fontWeight: "500"
					}}
				>
					Are you sure you want to approve this payment?
				</p>
				<div className="textarea-container" style={{ marginBottom: "25px" }}>
					<textarea
						value={comment}
						onChange={(e) => onCommentChange(e.target.value)}
						placeholder="Enter your notes here"
						style={{
							width: "100%",
							height: "120px",
							padding: "12px",
							fontSize: "14px",
							border: "1px solid #d9d9d9",
							borderRadius: "4px",
							resize: "none",
							fontFamily: "Inter"
						}}
					/>
				</div>
				<div
					style={{
						display: "flex",
						justifyContent: "flex-end",
						gap: "12px"
					}}
				>
					<button
						onClick={onHide}
						style={{
							width: "80px",
							height: "32px",
							backgroundColor: "#fff",
							border: "1px solid var(--purple-dark)",
							borderRadius: "4px",
							color: "var(--purple-dark)",
							cursor: "pointer"
						}}
					>
						Cancel
					</button>
					<Button
						type="primary"
						onClick={onApprove}
						loading={loading}
						disabled={!comment}
						style={{
							width: "100px",
							height: "32px",
							backgroundColor: "var(--purple-dark)",
							border: "none"
						}}
						icon={loading ? <span /> : null}
					>
						Approve
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default ApprovalModal;
