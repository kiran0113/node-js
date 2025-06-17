import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "antd";

interface RejectModalProps {
	isVisible: boolean;
	onHide: () => void;
	onReject: () => void;
	comment: string;
	onCommentChange: (value: string) => void;
	loading: boolean;
}

const RejectModal: React.FC<RejectModalProps> = ({ isVisible, onHide, onReject, comment, onCommentChange, loading }) => {
	return (
		<Dialog
			header="Reject Payment"
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
					Are you sure you want to reject this payment?
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
					<Button
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
					</Button>
					<Button
						type="primary"
						onClick={onReject}
						style={{
							width: "80px",
							height: "32px",
							backgroundColor: "var(--purple-dark)",
							border: "none",
							borderRadius: "4px",
							color: "white",
							cursor: "pointer",
						}}
						loading={loading}
						disabled={!comment}
					>
						Reject
					</Button>
				</div>
			</div>
		</Dialog>
	);
};

export default RejectModal;
