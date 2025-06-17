import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { ButtonGroup, GlobalButton } from "../../comman/GlobalButton.styles";

interface AddCountryModalProps {
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
	handleSubmit: (event: React.MouseEvent<HTMLElement>) => void;
	buttonLoading: boolean;
}

const AddCountryModal: React.FC<AddCountryModalProps> = ({
	isVisible,
	onHide,
	countryModel,
	setCountryModel,
	countryNameErrorMessage,
	countryCodeErrorMessage,
	currencyCodeErrorMessage,
	handleSubmit,
	buttonLoading
}) => {
	return (
		<Dialog visible={isVisible} onHide={onHide} className="user-dialog">
			<button className="close-btn" onClick={onHide}>
				<img src={CloseIcon} alt="close" />
			</button>
			<div className="popup-inner-content">
				<h2>Add Country to Country Master</h2>
				<div className="row user-row">
					<div className="col-md-6">
						<div className="form-group">
							<div>
								Country Name <span className="color-red">*</span>
							</div>
							<input
								type="text"
								autoComplete="nope"
								name="countryName"
								className="form-control"
								placeholder="Enter Country Name"
								value={countryModel.countryName}
								onChange={(ev) => {
									const value = ev.target.value;
									const re = /^[A-Za-z\s]+$/;
									if (re.test(value) || value === "") {
										setCountryModel({
											...countryModel,
											countryName: ev.target.value
										});
									}
								}}
							/>
							{countryNameErrorMessage && <span className="login-error-msg">{countryNameErrorMessage}</span>}
						</div>
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<span>
								Country Code<span className="color-red">*</span>
							</span>
							<input
								type="text"
								className="form-control"
								name="code"
								autoComplete="nope"
								placeholder="Enter code"
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
					</div>
					<div className="col-md-6">
						<div className="form-group">
							<span>
								Currency Code<span className="color-red">*</span>
							</span>
							<input
								type="text"
								className="form-control"
								name="currencyCode"
								autoComplete="nope"
								placeholder="Enter Currency Code"
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
							<GlobalButton className="primary" onClick={handleSubmit} loading={buttonLoading}>
								Save
							</GlobalButton>
						</ButtonGroup>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export default AddCountryModal;
