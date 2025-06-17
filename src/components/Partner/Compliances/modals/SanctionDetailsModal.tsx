import React from "react";
import { Modal } from "antd";
import Copy_icon from "../../../../assets/images/copy.svg";

interface SanctionDetailsModalProps {
	isVisible: boolean;
	onHide: () => void;
	content: string;
	onCopy: () => void;
	textareaRef: React.RefObject<HTMLTextAreaElement>;
}

const SanctionDetailsModal: React.FC<SanctionDetailsModalProps> = ({ isVisible, onHide, content, onCopy, textareaRef }) => {
	return (
		<Modal title="Sanction Detail Response" open={isVisible} onCancel={onHide} footer={null} width={800} style={{ top: 20 }}>
			<div style={{ position: "relative" }}>
				<div style={{ marginBottom: "10px" }}>
					<img
						src={Copy_icon}
						alt="Copy Icon"
						className="copyicon-size"
						onClick={onCopy}
						style={{
							position: "absolute",
							right: "10px",
							top: "10px",
							cursor: "pointer"
						}}
					/>
				</div>
				<textarea
					ref={textareaRef}
					value={content}
					readOnly
					style={{
						width: "100%",
						height: "400px",
						padding: "15px",
						marginTop: "30px",
						fontFamily: "monospace",
						fontSize: "14px",
						lineHeight: "1.5",
						whiteSpace: "pre-wrap",
						backgroundColor: "#f5f5f5",
						border: "1px solid #d9d9d9",
						borderRadius: "4px"
					}}
				/>
			</div>
		</Modal>
	);
};

export default SanctionDetailsModal;
