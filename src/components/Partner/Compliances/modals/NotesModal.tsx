import React from "react";
import { Modal } from "antd";

interface NotesModalProps {
	isVisible: boolean;
	onHide: () => void;
	content: string;
}

const NotesModal: React.FC<NotesModalProps> = ({ isVisible, onHide, content }) => {
	return (
		<Modal title="Notes" open={isVisible} onCancel={onHide} footer={null} width={600}>
			<textarea
				value={content}
				readOnly
				style={{
					width: "100%",
					height: "200px",
					padding: "10px",
					fontSize: "14px",
					border: "1px solid #ccc",
					borderRadius: "5px",
					resize: "none"
				}}
			/>
		</Modal>
	);
};

export default NotesModal;
