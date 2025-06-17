const DeleteModal = ({ activeStatus, reject, onDeleteClickCountry }: any) => {
	return (
		<div className="popup-body">
			<div className="register-popup Payment-screen">
				<div className="text-center ">
					<div className="awesome-text">
						{activeStatus ? (
							<h4>
								{" "}
								<i className="pi pi-info-circle"></i> Are you sure you want to delete Agent?
							</h4>
						) : (
							<h4>
								{" "}
								<i className="pi pi-info-circle"></i> Are you sure you want to delete Agent?
							</h4>
						)}
					</div>
				</div>
				<div className="payment-screen-btn">
					<button className="btn btn-cancel second-btn " onClick={reject}>
						{" "}
						No
					</button>
					<button className="btn btn-continue second-btn yes-btn-popup" onClick={onDeleteClickCountry}>
						{" "}
						Yes
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
