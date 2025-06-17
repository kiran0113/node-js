import React from "react";

interface DeleteModalProps {
	onCancel: () => void;
	onConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onCancel, onConfirm }) => {
	return (
		<div className="popup-body">
			<div className="register-popup Payment-screen">
				<div className="text-center">
					<div className="awesome-text">
						<h4>
							<i className="pi pi-info-circle"></i> Are you sure you want to delete Country?
						</h4>
					</div>
				</div>
				<div className="payment-screen-btn">
					<button className="btn btn-cancel second-btn" onClick={onCancel}>
						No
					</button>
					<button className="btn btn-continue second-btn yes-btn-popup" onClick={onConfirm}>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
