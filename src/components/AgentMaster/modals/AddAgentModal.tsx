import { Dialog } from "primereact/dialog";
import { AutoComplete } from "primereact/autocomplete";
import Scrollbars from "react-custom-scrollbars-2";
import CloseIcon from "../../../assets/images/icon/close-icon.png";
import { Button } from "primereact/button";
import { ButtonGroup, GlobalButton } from "../../comman/GlobalButton.styles";

const AddAgentModal = ({
	displayBasic,
	onHideClick,
	countryName,
	setCountryName,
	agentModel,
	setAgentModel,
	agentCurrencyErrorMessage,
	agentNameErrorMessage,
	partnerIdErrorMessage,
	deliveryTypeErrorMessage,
	filteredpreferredcountryvaluelist,
	filteredpreferredvaluelist,
	searchPreferedCountryValue,
	searchPreferedValue,
	handleCloseForAdd,
	handleSubmit,
	countryIdErrorMessage,
	loading
}: any) => {
	return (
		<Dialog visible={displayBasic} onHide={() => onHideClick()} className=" user-dialog">
			<>
				{" "}
				<Scrollbars
					className="contain-scroll"
					autoHide
					autoHideTimeout={1000}
					autoHideDuration={200}
					autoHeight
					autoHeightMin={100}
					autoHeightMax={600}
					thumbMinSize={30}
					universal={true}
				>
					<button className="close-btn" onClick={onHideClick}>
						<img src={CloseIcon} />
					</button>
					<div className="popup-inner-content">
						Add Agent Details
						<h2></h2>
						<div className="row user-row">
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>
										Country Name<span className="color-red">*</span>
									</span>

									<AutoComplete
										field="countryName"
										dropdown
										forceSelection
										aria-label="Countries"
										dropdownAriaLabel="Payment"
										className="dropdown-acc"
										placeholder="Select Country Name"
										completeMethod={searchPreferedCountryValue}
										suggestions={filteredpreferredcountryvaluelist}
										// value={countryName && countryName}
										value={countryName}
										onChange={(ev) => {
											setAgentModel({
												...agentModel,

												// countryId:  ev.target.value,
												countryId: ev.value.id,
												currency: ev.value.currencyCode
												// countryId: ev.value.name,
											});
											setCountryName(ev.value.countryName);
										}}
									/>
									{countryIdErrorMessage !== null && countryIdErrorMessage.length > 0 ? (
										<span className="login-error-msg">{countryIdErrorMessage}</span>
									) : null}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>
										Currency<span className="color-red">*</span>
									</span>
									<input
										type="text"
										className="form-control"
										id="exampleInputEmail1"
										name="code"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter currency"
										value={agentModel.currency}
										disabled={true}
										onChange={(e) => {
											const value = e.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													currency: value
												});
											}
										}}
									/>
									{agentCurrencyErrorMessage !== null && agentCurrencyErrorMessage.length > 0 ? (
										<span className="login-error-msg">{agentCurrencyErrorMessage}</span>
									) : null}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>
										Agent Name<span className="color-red">*</span>
									</span>
									<input
										type="text"
										autoComplete="nope"
										name="countryName"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter Agent Name"
										value={agentModel.agentName}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													agentName: ev.target.value
												});
											}
										}}
									/>
									{agentNameErrorMessage !== null && agentNameErrorMessage.length > 0 ? (
										<span className="login-error-msg">{agentNameErrorMessage}</span>
									) : null}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>
										Partner Id<span className="color-red">*</span>
									</span>
									<input
										type="text"
										className="form-control"
										id="exampleInputEmail1"
										name="code"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter partner Id"
										value={agentModel.partnerId}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													partnerId: ev.target.value
												});
											}
										}}
									/>

									{partnerIdErrorMessage !== null && partnerIdErrorMessage.length > 0 ? (
										<span className="login-error-msg">{partnerIdErrorMessage}</span>
									) : null}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>
										Delivery Type<span className="color-red">*</span>
									</span>

									<AutoComplete
										field="DeliveryName"
										dropdown
										forceSelection
										aria-label="Countries"
										dropdownAriaLabel="Payment"
										className="dropdown-acc"
										placeholder="Select preferred value"
										suggestions={filteredpreferredvaluelist}
										completeMethod={searchPreferedValue}
										// value={agentModel && agentModel.deliveryType}
										value={agentModel && agentModel.deliveryType ? agentModel.deliveryType : ""}
										// onChange={(e) => setSelectedDeliveryType(e.value)}
										onChange={(e) =>
											setAgentModel({
												...agentModel,
												deliveryType: e.value.DeliveryName
											})
										}
									/>
									{/* <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        name="code"
                        autoComplete="nope"
                        aria-describedby="emailHelp"
                        placeholder="Enter Delivery Type"
                        value={agentModel.deliveryType}


                        
                        onChange={(e) =>
                          setAgentModel({
                            ...agentModel,
                            deliveryType: e.target.value,
                          })
                        }
                      /> */}
									{deliveryTypeErrorMessage !== null && deliveryTypeErrorMessage.length > 0 ? (
										<span className="login-error-msg">{deliveryTypeErrorMessage}</span>
									) : null}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Bank Id</span>
									<input
										type="text"
										className="form-control"
										id="exampleInputEmail1"
										name="bankId"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter bank Id"
										value={agentModel.bankId}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[0-9\s]*$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													bankId: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Agent Id</span>
									<input
										type="text"
										autoComplete="nope"
										name="agentId"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter Agent Id"
										value={agentModel.agentId}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[0-9\s]*$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													agentId: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Bank Branch Id</span>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										name="code"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter code"
										value={agentModel.bankBranchId}
										onChange={(e) => {
											const value = e.target.value;
											const re = /^[0-9\s]*$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													bankBranchId: e.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Location Id</span>
									<input
										type="text"
										autoComplete="nope"
										name="countryName"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter Location Id"
										value={agentModel.locationId}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[0-9\s]*$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													locationId: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Bank Branch State</span>
									<input
										type="email"
										className="form-control"
										id="exampleInputEmail1"
										name="code"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter Bank Branch State"
										value={agentModel.bankBranchState}
										onChange={(e) => {
											const value = e.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													bankBranchState: value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Branch Name</span>
									<input
										type="text"
										autoComplete="nope"
										name="countryName"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter branch Name"
										value={agentModel.branch}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													branch: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Optional Field</span>
									<input
										type="text"
										className="form-control"
										id="exampleInputEmail1"
										name="code"
										autoComplete="nope"
										aria-describedby="emailHelp"
										placeholder="Enter Optional Field"
										value={agentModel.optionalField}
										onChange={(e) => {
											const value = e.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													optionalField: value
												});
											}
										}}
									/>
									{/* {optionalFieldErrorMessage !== null &&
                        optionalFieldErrorMessage.length > 0 ? (
                        <span className="login-error-msg">
                          {optionalFieldErrorMessage}
                        </span>
                      ) : null} */}
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>City Name</span>
									<input
										type="text"
										autoComplete="nope"
										name="countryName"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter city Name"
										value={agentModel.city}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													city: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
							<div className="col-md-6 info-section info-section-border">
								<div className="form-group">
									<span>Address</span>
									<input
										type="text"
										autoComplete="nope"
										name="countryName"
										className="form-control"
										id="exampleInputEmail1"
										placeholder="Enter address"
										value={agentModel.address}
										onChange={(ev) => {
											const value = ev.target.value;
											const re = /^[A-Za-z\d\s{}()@#$%&*_.,"-]+$/;
											if (re.test(value) || value === "") {
												setAgentModel({
													...agentModel,
													address: ev.target.value
												});
											}
										}}
									/>
								</div>
							</div>
						</div>
						<div className="payment-btn-dialog">
							<ButtonGroup>
								<GlobalButton className="secondary" onClick={handleCloseForAdd}>
									Cancel
								</GlobalButton>
								<GlobalButton className="primary" loading={loading} onClick={handleSubmit}>
									Save
								</GlobalButton>
							</ButtonGroup>
						</div>
					</div>
					<br></br>
					<br></br>
				</Scrollbars>
			</>
		</Dialog>
	);
};

export default AddAgentModal;
