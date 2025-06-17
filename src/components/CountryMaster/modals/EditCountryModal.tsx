import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { GlobalButton } from "../../comman/GlobalButton.styles";
import { ButtonGroup } from "../../comman/GlobalButton.styles";

interface EditCountryModalProps {
	isVisible: boolean;
	onHide: () => void;
	countryModel: {
		countryName: string;
		code: string;
		currencyCode: string;
	};
	setCountryModel: (model: any) => void;
	countryNameErrorMessage: string;
	countryCodeErrorMessage: string;
	currencyCodeErrorMessage: string;
	onUpdateClick: () => void;
	updatebuttonLoading: boolean;
}

const EditCountryModal: React.FC<EditCountryModalProps> = ({
	isVisible,
	onHide,
	countryModel,
	setCountryModel,
	countryNameErrorMessage,
	countryCodeErrorMessage,
	currencyCodeErrorMessage,
	onUpdateClick,
	updatebuttonLoading
}) => {
	return (
		<Dialog visible={isVisible} onHide={onHide} className="user-dialog">
			<button className="close-btn" onClick={onHide}>
				<img src={CloseIcon} alt="close" />
			</button>
			<div className="popup-inner-content">
				<h2>Edit Country</h2>
				<div className="row">
					<div className="col-md-6 form-group">
						<span className="input-label">
							Country Name<span className="color-red">*</span>
						</span>
						<input
							className="form-control"
							type="text"
							name="countryName"
							autoComplete="nope"
							placeholder="Enter Country Name"
							value={countryModel.countryName}
							onChange={(e) =>
								setCountryModel({
									...countryModel,
									countryName: e.target.value
								})
							}
						/>
						{countryNameErrorMessage && <span className="login-error-msg">{countryNameErrorMessage}</span>}
					</div>

					<div className="col-md-6 form-group">
						<span className="input-label">
							Country code <span className="color-red">*</span>
						</span>
						<input
							className="form-control"
							type="text"
							autoComplete="nope"
							placeholder="Enter Country code"
							name="code"
							value={countryModel.code}
							onChange={(e) =>
								setCountryModel({
									...countryModel,
									code: e.target.value
								})
							}
						/>
						{countryCodeErrorMessage && <span className="login-error-msg">{countryCodeErrorMessage}</span>}
					</div>

					<div className="col-md-6 form-group">
						<span className="input-label">
							Currency Code <span className="color-red">*</span>
						</span>
						<input
							className="form-control"
							type="text"
							autoComplete="nope"
							placeholder="Enter Currency Code"
							name="currencyCode"
							value={countryModel.currencyCode}
							onChange={(e) =>
								setCountryModel({
									...countryModel,
									currencyCode: e.target.value
								})
							}
						/>
						{currencyCodeErrorMessage && <span className="login-error-msg">{currencyCodeErrorMessage}</span>}
					</div>
				</div>

				<div className="payment-btn-dialog my-4">
					<ButtonGroup>
						<GlobalButton className="secondary" onClick={onHide}>
							Cancel
						</GlobalButton>
						<GlobalButton className="primary" onClick={onUpdateClick} loading={updatebuttonLoading}>
							Save
						</GlobalButton>
					</ButtonGroup>
				</div>
			</div>
		</Dialog>
	);
};

export default EditCountryModal;
