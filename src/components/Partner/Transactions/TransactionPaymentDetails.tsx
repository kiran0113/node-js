import moment from "moment";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";

import { Logout } from "../../../utils/AccountUtils";
import { TransactionDetails } from "../../../services/Partner/Transactions/TransactionDetails";
import { exit } from "process";

const TransactionsPaymentDetails: React.FC<any> = ({ rowInfoData, setShowTransactionDetails, partnerid }) => {
	const toast = useRef<Toast>(null);

	const [loading, setLoading] = useState(true);

	const [userloading, setUserLoading] = useState(false);

	const params = useParams();

	const [valuesArray, SetvaluesArray] = useState<any[]>([]);

	// const { partnerid } = useParams();
	// const { partnerId } = useParams();

	const [receiverPaymentDataModel, setReceiverPaymentDataModel]: any = useState<any[]>([]);
	const [receiverdata, setreceiverData]: any = useState<any[]>([]);

	const [receiverInformation, setreceiverInformation]: any = useState({});
	const [buttonloading, setButtonLoading] = useState(false);

	const navigate = useNavigate();

	const [senderDetail, setSenderDetails]: any = useState({});

	const [receiverDetail, setReceiverDetail]: any = useState({});

	const [paymentInformation, setPaymentInformation]: any = useState({});

	const [show, setShow] = useState(false);

	const [showNotFound, setShowNotFound] = useState(false);

	const [showmoredisplay, setShowMoreDisplay] = useState(true);

	const [transactionDetails, setTransactionDetails] = useState<any[]>([]);

	const [PaymentDetails, setPaymentDetails] = useState({});

	const [readyPopup, setReadyPopup] = useState(false);

	const [transactioninfomodel, setTransactionInfoModel]: any = useState({
		data: "",
		messageid: "",
		description: "",
		fxRate: 0.0,
		fxRateCurrency: "",
		sendFee: 0,
		sendFeeCurrency: "",
		senderFacilitatorFee: 0,
		senderFacilitatorFeeCurrency: 0,
		receiverFee: 0,
		receiverFeeCurrency: "",
		receiverFacilitatorFee: 0,
		receiverFacilitatorFeeCurrency: "",
		deliveryType: "",
		instaRailsFee: 0,
		instaRailsFeeCurrency: ""
	});

	// test
	// get payment detail
	const getPaymentDetails = () => {
		setLoading(true);
		let paymentId = rowInfoData;
		let partnerId = partnerid;
		TransactionDetails.getDetailPaymentId(paymentId, partnerId)
			.then((response: any) => {
				getLogs();
				setPaymentDetails(response.data);
				setSenderDetails(response.data.data.senderInformation);
				setReceiverDetail(response.data.data.receiverInformation);
				setPaymentInformation(response.data.data.paymentInformation);
				setTransactionInfoModel(response.data);

				setreceiverInformation(response.data.data.receiverInformation);
				setReceiverPaymentDataModel(response.data.receiverPaymentDataModel);
				setreceiverData(response.data.receiverdata);
			})
			.catch((error) => {
				if (error.response.status === 500) {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				} else if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else if (error.response.status === 404) {
					toast.current?.show({
						severity: "error",
						summary: "Data Not Found",
						life: 3000
					});
					setShowNotFound(true);
					setShowMoreDisplay(false);
				} else {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				}
				setLoading(false);
				setButtonLoading(false);
			});
	};
	// get logs
	const getLogs = () => {
		let paymentId = rowInfoData;
		TransactionDetails.getPaymentLogs(paymentId)
			.then((response) => {
				const filteredData = response.data.filter((item: any) => item.logMessage.startsWith("Webhook"));
				setTransactionDetails(filteredData);
				setLoading(false);
			})
			.catch((error) => {
				if (error.response.status === 500) {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				} else if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				}
				setLoading(false);
				setButtonLoading(false);
			});
	};

	// form date handle
	const formatDateField = (rowData: any) => {
		return (
			<React.Fragment>
				<span>{moment(rowData.date).format("MM/DD/YY H:mm:ss")} </span>
			</React.Fragment>
		);
	};

	// on back click handle
	const onBackClick = () => {
		setButtonLoading(true);
		setTimeout(() => {
			navigate("/transactions");
		}, 500);
	};

	// on show hide handle
	const OnShowHideClick = () => {
		if (show === true) {
			setShow(false);
		} else if (show === false) {
			setShow(true);
		}
	};

	const CheckNull = (value: any) => {
		if (value === "" || value === undefined || value === null || value === " ") {
			return true;
		}
		return false;
	};

	const actionBodyTemplate = (rowData: any) => {
		if (!(rowData.stackTrace === "" || rowData.stackTrace === null)) {
			return (
				<>
					<Button type="button" className="btn btn-continue" onClick={() => ShowDetails(rowData)}>
						{" "}
						Details{" "}
					</Button>
				</>
			);
		}
	};

	const ShowDetails = (rowData: any) => {
		SetvaluesArray(JSON.parse(rowData.stackTrace));

		setReadyPopup(true);
	};

	const cancelPopup = () => {
		setReadyPopup(false);
	};

	useEffect(() => {
		getPaymentDetails();
		// setTimeout(() => {
		//   getLogs(paymentId);
		// }, 2000);
	}, []);

	return (
		<>
			{loading ? (
				<div className="row loading-icon">
					<div className="spinner-class">
						<ProgressSpinner />
					</div>
				</div>
			) : (
				<>
					<div className="right-tab-section transaction-tab transactiondetails-main">
						<Scrollbars
							className="contain-scroll"
							autoHide
							autoHideTimeout={1000}
							autoHideDuration={200}
							autoHeight
							autoHeightMin={100}
							autoHeightMax={100}
							thumbMinSize={30}
							universal={true}
						>
							<div className="heading-section transaction">
								<div className="">
									<Button
										style={{ float: "left", marginLeft: "5px" }}
										className="btn btn-continue"
										//   iconPos="right"
										//   icon="pi pi-back"
										label={"Back"}
										onClick={() => {
											setShowTransactionDetails(true);
										}}
									></Button>

									<div className="">
										<span className="text-header-purple">Transactions Details</span>
									</div>
								</div>
							</div>
							<div className="transaction-details " style={{ marginTop: "10px" }}>
								<h2>Payment Information</h2>
								<div className="d-flex">
									{!CheckNull(paymentInformation.paymentID) ? (
										<div className="detials-col">
											<h4>Payment ID:</h4>
											<p> {paymentInformation.paymentID}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.sendAmount) ? (
										<div className="detials-col">
											<h4>Send Amount:</h4>
											<p> {paymentInformation.sendAmount}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.requestedDeliveryDate) ? (
										<div className="detials-col">
											<h4> Requested Delivery Date:</h4>
											<p> {paymentInformation.requestedDeliveryDate}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.sendCountry) ? (
										<div className="detials-col">
											<h4>Send Country:</h4>
											<p> {paymentInformation.sendCountry}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.sendCurrency) ? (
										<div className="detials-col">
											<h4>Send Currency:</h4>
											<p> {paymentInformation.sendCurrency}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.receiveCountry) ? (
										<div className="detials-col">
											<h4>Receive Country:</h4>
											<p> {paymentInformation.receiveCountry}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.receiveCurrency) ? (
										<div className="detials-col">
											<h4>Receive Currency:</h4>
											<p> {paymentInformation.receiveCurrency}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.receiveAmount) ? (
										<div className="detials-col">
											<h4>Receive Amount:</h4>
											<p> {paymentInformation.receiveAmount}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.transactionType) ? (
										<div className="detials-col">
											<h4>Transaction Type :</h4>
											<p>{paymentInformation.transactionType}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.paymentType) ? (
										<div className="detials-col">
											<h4>Payment Type:</h4>
											<p> {paymentInformation.paymentType}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.purposeOfTransaction) ? (
										<div className="detials-col">
											<h4>Purpose Of Transaction:</h4>
											<p> {paymentInformation.purposeOfTransaction}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.sourceOfFunds) ? (
										<div className="detials-col">
											<h4>Source of Funds:</h4>
											<p> {paymentInformation.sourceOfFunds}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.relationship) ? (
										<div className="detials-col">
											<h4>Relationship:</h4>
											<p> {paymentInformation.relationship}</p>
										</div>
									) : null}

									<div className="detials-col">
										<h4>Routing Preference:</h4>
										<p>{paymentInformation.routingPreferences?.preferredType}</p>
									</div>

									{paymentInformation.routingPreferences?.preferredType === "SmartPreferredDelivery" ||
									paymentInformation.routingPreferences?.preferredType === "PreferredPaymentProvider" ||
									paymentInformation.routingPreferences?.preferredType === "SmartPreferredDelivery" ? (
										<div className="detials-col">
											<h4>Preferred Value:</h4>
											<p>{paymentInformation.routingPreferences?.preferredValue}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.paymentNotes) ? (
										<div className="detials-col">
											<h4>Payment Notes:</h4>
											<p> {paymentInformation.paymentNotes}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.cancellationDetails) ? (
										<div className="detials-col">
											<h4>Cancellation Details:</h4>
											<p> {paymentInformation.cancellationDetails}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField1) ? (
										<div className="detials-col">
											<h4>Additional Field 1</h4>
											<p> {paymentInformation.additionalField1}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField2) ? (
										<div className="detials-col">
											<h4>Additional Field 2</h4>
											<p> {paymentInformation.additionalField2}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField3) ? (
										<div className="detials-col">
											<h4>Additional Field 3</h4>
											<p> {paymentInformation.additionalField3}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField4) ? (
										<div className="detials-col">
											<h4>Additional Field 4</h4>
											<p> {paymentInformation.additionalField4}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField5) ? (
										<div className="detials-col">
											<h4>Additional Field 5</h4>
											<p> {paymentInformation.additionalField5}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField6) ? (
										<div className="detials-col">
											<h4>Additional Field 6</h4>
											<p> {paymentInformation.additionalField6}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField7) ? (
										<div className="detials-col">
											<h4>Additional Field 7</h4>
											<p> {paymentInformation.additionalField7}</p>
										</div>
									) : null}

									{!CheckNull(paymentInformation.additionalField8) ? (
										<div className="detials-col">
											<h4>Additional Field 8</h4>
											<p> {paymentInformation.additionalField8}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.messageID) ? (
										<div className="detials-col">
											<h4>MessageId: </h4>
											<p> {transactioninfomodel.messageID}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.description) ? (
										<div className="detials-col">
											<h4>Status: </h4>
											<p> {transactioninfomodel.description}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.fxRate) ? (
										<div className="detials-col">
											<h4>FxRate: </h4>
											<p> {transactioninfomodel.fxRate}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.fxRateCurrency) ? (
										<div className="detials-col">
											<h4>FxRateCurrency: </h4>
											<p> {transactioninfomodel.fxRateCurrency}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.sendFee) ? (
										<div className="detials-col">
											<h4>SenderFee:</h4>
											<p> {transactioninfomodel.sendFee}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.sendFeeCurrency) ? (
										<div className="detials-col">
											<h4> SendFeeCurrency:</h4>
											<p> {transactioninfomodel.sendFeeCurrency}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.senderFacilitatorFee) ? (
										// transactioninfomodel.senderFacilitatorFee = 0 ? (
										<div className="detials-col">
											<h4>SenderFacilitatorFee:</h4>
											<p> {transactioninfomodel.senderFacilitatorFee}</p>
										</div>
									) : // )
									// : (null)
									null}

									{!CheckNull(transactioninfomodel.senderFacilitatorFeeCurrency) ? (
										// transactioninfomodel.senderFacilitatorFee == 0 || transactioninfomodel.senderFacilitatorFee == 'null' ?
										// (
										<div className="detials-col">
											<h4>SenderFacilitatorFeeCurrency:</h4>
											<p> {transactioninfomodel.senderFacilitatorFeeCurrency}</p>
										</div>
									) : // ) : (null)
									null}

									{!CheckNull(transactioninfomodel.receiverFee) ? (
										<div className="detials-col">
											<h4>DeliveryFee:</h4>
											<p> {transactioninfomodel.receiverFee}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.receiverFeeCurrency) ? (
										<div className="detials-col">
											<h4>DeliveryFeeCurrency:</h4>
											<p> {transactioninfomodel.receiverFeeCurrency}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.receiverFacilitatorFee) ? (
										// transactioninfomodel.receiverFacilitatorFee = 0 ? (
										<div className="detials-col">
											<h4>ReceiverFacilitatorFee:</h4>
											<p> {transactioninfomodel.receiverFacilitatorFee}</p>
										</div>
									) : // ) : (null)
									null}

									{!CheckNull(transactioninfomodel.receiverFacilitatorFeeCurrency) ? (
										// transactioninfomodel.receiverFacilitatorFeeCurrency == 0 || transactioninfomodel.receiverFacilitatorFeeCurrency == 'null' ?
										//   (
										<div className="detials-col">
											<h4>ReceiverFacilitatorFeeCurrency:</h4>
											<p> {transactioninfomodel.receiverFacilitatorFeeCurrency}</p>
										</div>
									) : // ) : (null)
									null}

									{!CheckNull(transactioninfomodel.sendCurrency) ? (
										<div className="detials-col">
											<h4>SenderCurrency:</h4>
											<p> {transactioninfomodel.sendCurrency}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.deliveryType) ? (
										<div className="detials-col">
											<h4>DeliveryType:</h4>
											<p> {transactioninfomodel.deliveryType}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.instaRailsFee) ? (
										<div className="detials-col">
											<h4>InstarailsFee:</h4>
											<p> {transactioninfomodel.instaRailsFee}</p>
										</div>
									) : null}

									{!CheckNull(transactioninfomodel.instaRailsFeeCurrency) ? (
										<div className="detials-col">
											<h4>InstarailsFeeCurrency:</h4>
											<p> {transactioninfomodel.instaRailsFeeCurrency}</p>
										</div>
									) : null}
								</div>
								<div>
									{show ? (
										<>
											<div className="border-top">
												<h2>Sender Information</h2>
												<div className="d-flex" id="div1" key="index">
													{!CheckNull(senderDetail.firstName) ? (
														<div className="detials-col">
															<h4>First Name:</h4>
															<p>{senderDetail.firstName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.lastName) ? (
														<div className="detials-col">
															<h4>Last Name:</h4>
															<p>{senderDetail.lastName}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.middleName) ? (
														<div className="detials-col">
															<h4>Middle Name:</h4>
															<p>{senderDetail.middleName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.gender) ? (
														<div className="detials-col">
															<h4>Gender:</h4>
															<p>{senderDetail.gender}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.maternalLastName) ? (
														<div className="detials-col">
															<h4>Maternal Last Name:</h4>
															<p>{senderDetail.maternalLastName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.paternalLastName) ? (
														<div className="detials-col">
															<h4>Paternal Last Name:</h4>
															<p>{senderDetail.paternalLastName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.dateOfBirth) ? (
														<div className="detials-col">
															<h4>Date Of Birth:</h4>
															<p>{senderDetail.dateOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.townOfBirth) ? (
														<div className="detials-col">
															<h4>Town Of Birth:</h4>
															<p>{senderDetail.townOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.provinceOfBirth) ? (
														<div className="detials-col">
															<h4>Province Of Birth:</h4>
															<p>{senderDetail.provinceOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.countryOfBirth) ? (
														<div className="detials-col">
															<h4>Country Of Birth:</h4>
															<p>{senderDetail.countryOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.nationalID) ? (
														<div className="detials-col">
															<h4>National ID:</h4>
															<p>{senderDetail.nationalID}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.nationalIDType) ? (
														<div className="detials-col">
															<h4>National ID Type:</h4>
															<p>{senderDetail.nationalIDType}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.businessRegistrationDate) ? (
														<div className="detials-col">
															<h4>Business Registration Date:</h4>
															<p>{senderDetail.businessRegistrationDate}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.nationalIDIssueDate) ? (
														<div className="detials-col">
															<h4>National ID Issue Date:</h4>
															<p>{senderDetail.nationalIDIssueDate}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.occupation) ? (
														<div className="detials-col">
															<h4>Occupation:</h4>
															<p>{senderDetail.occupation}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.nationalIDExpiryDate) ? (
														<div className="detials-col">
															<h4>National ID ExpiryDate:</h4>
															<p>{senderDetail.nationalIDExpiryDate}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.nationalIDIssuingCountry) ? (
														<div className="detials-col">
															<h4>National ID Issuing Country:</h4>
															<p>{senderDetail.nationalIDIssuingCountry}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.phoneNumber) ? (
														<div className="detials-col">
															<h4>Phone Number:</h4>
															<p>{senderDetail.phoneNumber}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.emailAddress) ? (
														<div className="detials-col">
															<h4>Email Address:</h4>
															<p>{senderDetail.emailAddress}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.postalAddressLine) ? (
														<div className="detials-col">
															<h4>Postal Address Line:</h4>
															<p>{senderDetail.postalAddressLine}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.buildingNumber) ? (
														<div className="detials-col">
															<h4>Building Number:</h4>
															<p>{senderDetail.buildingNumber}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.postalCode) ? (
														<div className="detials-col">
															<h4>Postal Code:</h4>
															<p>{senderDetail.postalCode}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.provinceState) ? (
														<div className="detials-col">
															<h4>Province State:</h4>
															<p>{senderDetail.provinceState}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.townCity) ? (
														<div className="detials-col">
															<h4>TownCity:</h4>
															<p>{senderDetail.townCity}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.country) ? (
														<div className="detials-col">
															<h4>Country :</h4>
															<p>{senderDetail.country}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.bankIBAN) ? (
														<div className="detials-col">
															<h4>Bank IBAN :</h4>
															<p>{senderDetail.bankIBAN}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankName) ? (
														<div className="detials-col">
															<h4>Bank Name :</h4>
															<p>{senderDetail.bankName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankBIC) ? (
														<div className="detials-col">
															<h4>Bank BIC :</h4>
															<p>{senderDetail.bankBIC}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankSortCode) ? (
														<div className="detials-col">
															<h4>Bank Sort Code :</h4>
															<p>{senderDetail.bankSortCode}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.bankBranchName) ? (
														<div className="detials-col">
															<h4>Bank Branch Name :</h4>
															<p>{senderDetail.bankBranchName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankBranchNumber) ? (
														<div className="detials-col">
															<h4>Bank Branch Number :</h4>
															<p>{senderDetail.bankBranchNumber}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankBranchAddress) ? (
														<div className="detials-col">
															<h4>Bank Branch Address :</h4>
															<p>{senderDetail.bankBranchAddress}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.bankRoutingNumber) ? (
														<div className="detials-col">
															<h4>Bank Routing Number :</h4>
															<p>{senderDetail.bankRoutingNumber}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.bankAccountNumber) ? (
														<div className="detials-col">
															<h4>Bank Account Number :</h4>
															<p>{senderDetail.bankAccountNumber}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.bankAccountType) ? (
														<div className="detials-col">
															<h4>Bank Account Type :</h4>
															<p>{senderDetail.bankAccountType}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.cardNumber) ? (
														<div className="detials-col">
															<h4>Card Number :</h4>
															<p>{senderDetail.cardNumber}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.referenceNumber) ? (
														<div className="detials-col">
															<h4>Reference Number :</h4>
															<p>{senderDetail.referenceNumber}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.rtpid) ? (
														<div className="detials-col">
															<h4>RTP ID :</h4>
															<p>{senderDetail.rtpid}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.rtpName) ? (
														<div className="detials-col">
															<h4>RTP Name :</h4>
															<p>{senderDetail.rtpName}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.mobileWalletID) ? (
														<div className="detials-col">
															<h4>Mobile Wallet ID :</h4>
															<p>{senderDetail.mobileWalletID}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.mobileWalletName) ? (
														<div className="detials-col">
															<h4>Mobile Wallet Name :</h4>
															<p>{senderDetail.mobileWalletName}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.businessName) ? (
														<div className="detials-col">
															<h4>Business Name :</h4>
															<p>{senderDetail.businessName}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.businessType) ? (
														<div className="detials-col">
															<h4>Business Type :</h4>
															<p>{senderDetail.businessType}</p>
														</div>
													) : null}
													{!CheckNull(senderDetail.businessID) ? (
														<div className="detials-col">
															<h4>Business ID :</h4>
															<p>{senderDetail.businessID}</p>
														</div>
													) : null}

													{!CheckNull(senderDetail.namePrefix) ? (
														<div className="detials-col">
															<h4>Name Prefix :</h4>
															<p>{senderDetail.namePrefix}</p>
														</div>
													) : null}
												</div>
											</div>{" "}
											<div className="border-top">
												<h2>Receiver Information</h2>
												<div className="d-flex" id="div1" key="index">
													{!CheckNull(receiverDetail.firstName) ? (
														<div className="detials-col">
															<h4>First Name:</h4>
															<p>{receiverDetail.firstName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.lastName) ? (
														<div className="detials-col">
															<h4>Last Name:</h4>
															<p>{receiverDetail.lastName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.middleName) ? (
														<div className="detials-col">
															<h4>Middle Name:</h4>
															<p>{receiverDetail.middleName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.gender) ? (
														<div className="detials-col">
															<h4>Gender:</h4>
															<p>{receiverDetail.gender}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.maternalLastName) ? (
														<div className="detials-col">
															<h4>Maternal Last Name:</h4>
															<p>{receiverDetail.maternalLastName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.paternalLastName) ? (
														<div className="detials-col">
															<h4>Paternal Last Name:</h4>
															<p>{receiverDetail.paternalLastName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.dateOfBirth) ? (
														<div className="detials-col">
															<h4>Date Of Birth:</h4>
															<p>{receiverDetail.dateOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.townOfBirth) ? (
														<div className="detials-col">
															<h4>Town Of Birth:</h4>
															<p>{receiverDetail.townOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.provinceOfBirth) ? (
														<div className="detials-col">
															<h4>Province Of Birth:</h4>
															<p>{receiverDetail.provinceOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.countryOfBirth) ? (
														<div className="detials-col">
															<h4>Country Of Birth:</h4>
															<p>{receiverDetail.countryOfBirth}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.nationalID) ? (
														<div className="detials-col">
															<h4>National ID:</h4>
															<p>{receiverDetail.nationalID}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.nationalIDType) ? (
														<div className="detials-col">
															<h4>National ID Type:</h4>
															<p>{receiverDetail.nationalIDType}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.nationalIDIssueDate) ? (
														<div className="detials-col">
															<h4>National ID Issue Date:</h4>
															<p>{receiverDetail.nationalIDIssueDate}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.occupation) ? (
														<div className="detials-col">
															<h4>Occupation:</h4>
															<p>{receiverDetail.occupation}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.nationalIDExpiryDate) ? (
														<div className="detials-col">
															<h4>National ID ExpiryDate:</h4>
															<p>{receiverDetail.nationalIDExpiryDate}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.businessRegistrationDate) ? (
														<div className="detials-col">
															<h4>Business Registration Date:</h4>
															<p>{receiverDetail.businessRegistrationDate}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.nationalIDIssuingCountry) ? (
														<div className="detials-col">
															<h4>National ID Issuing Country:</h4>
															<p>{receiverDetail.nationalIDIssuingCountry}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.phoneNumber) ? (
														<div className="detials-col">
															<h4>Phone Number:</h4>
															<p>{receiverDetail.phoneNumber}</p>
														</div>
													) : null}
													{!CheckNull(receiverDetail.emailAddress) ? (
														<div className="detials-col">
															<h4>Email Address:</h4>
															<p>{receiverDetail.emailAddress}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.postalAddressLine) ? (
														<div className="detials-col">
															<h4>Postal Address Line:</h4>
															<p>{receiverDetail.postalAddressLine}</p>
														</div>
													) : null}
													{!CheckNull(receiverDetail.buildingNumber) ? (
														<div className="detials-col">
															<h4>Building Number:</h4>
															<p>{receiverDetail.buildingNumber}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.postalCode) ? (
														<div className="detials-col">
															<h4>Postal Code:</h4>
															<p>{receiverDetail.postalCode}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.provinceState) ? (
														<div className="detials-col">
															<h4>Province State:</h4>
															<p>{receiverDetail.provinceState}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.townCity) ? (
														<div className="detials-col">
															<h4>TownCity:</h4>
															<p>{receiverDetail.townCity}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.country) ? (
														<div className="detials-col">
															<h4>Country :</h4>
															<p>{receiverDetail.country}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankIBAN) ? (
														<div className="detials-col">
															<h4>Bank IBAN :</h4>
															<p>{receiverDetail.bankIBAN}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankName) ? (
														<div className="detials-col">
															<h4>Bank Name :</h4>
															<p>{receiverDetail.bankName}</p>
														</div>
													) : null}
													{!CheckNull(receiverDetail.bankBIC) ? (
														<div className="detials-col">
															<h4>Bank BIC :</h4>
															<p>{receiverDetail.bankBIC}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankSortCode) ? (
														<div className="detials-col">
															<h4>Bank Sort Code :</h4>
															<p>{receiverDetail.bankSortCode}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankBranchName) ? (
														<div className="detials-col">
															<h4>Bank Branch Name :</h4>
															<p>{receiverDetail.bankBranchName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankBranchNumber) ? (
														<div className="detials-col">
															<h4>Bank Branch Number :</h4>
															<p>{receiverDetail.bankBranchNumber}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankBranchAddress) ? (
														<div className="detials-col">
															<h4>Bank Branch Address :</h4>
															<p>{receiverDetail.bankBranchAddress}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankRoutingNumber) ? (
														<div className="detials-col">
															<h4>Bank Routing Number :</h4>
															<p>{receiverDetail.bankRoutingNumber}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.bankAccountNumber) ? (
														<div className="detials-col">
															<h4>Bank Account Number :</h4>
															<p>{receiverDetail.bankAccountNumber}</p>
														</div>
													) : null}
													{!CheckNull(receiverDetail.bankAccountType) ? (
														<div className="detials-col">
															<h4>Bank Account Type :</h4>
															<p>{receiverDetail.bankAccountType}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.cardNumber) ? (
														<div className="detials-col">
															<h4>Card Number :</h4>
															<p>{receiverDetail.cardNumber}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.referenceNumber) ? (
														<div className="detials-col">
															<h4>Reference Number :</h4>
															<p>{receiverDetail.referenceNumber}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.rtpid) ? (
														<div className="detials-col">
															<h4>RTP ID :</h4>
															<p>{receiverDetail.rtpid}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.rtpName) ? (
														<div className="detials-col">
															<h4>RTP Name :</h4>
															<p>{receiverDetail.rtpName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.mobileWalletID) ? (
														<div className="detials-col">
															<h4>Mobile Wallet ID :</h4>
															<p>{receiverDetail.mobileWalletID}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.mobileWalletName) ? (
														<div className="detials-col">
															<h4>Mobile Wallet Name :</h4>
															<p>{receiverDetail.mobileWalletName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.businessName) ? (
														<div className="detials-col">
															<h4>Business Name :</h4>
															<p>{receiverDetail.businessName}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.businessType) ? (
														<div className="detials-col">
															<h4>Business Type :</h4>
															<p>{receiverDetail.businessType}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.businessID) ? (
														<div className="detials-col">
															<h4>Business ID :</h4>
															<p>{receiverDetail.businessID}</p>
														</div>
													) : null}

													{!CheckNull(receiverDetail.namePrefix) ? (
														<div className="detials-col">
															<h4>Name Prefix :</h4>
															<p>{receiverDetail.namePrefix}</p>
														</div>
													) : null}
												</div>
											</div>{" "}
										</>
									) : (
										<></>
									)}
								</div>
								{showmoredisplay ? (
									<>
										<div className="show-more">
											<button onClick={OnShowHideClick}>
												{show === true ? "Show Less" : "Show More"}
												{show === true ? <i className="pi pi-angle-up"> </i> : <i className="pi pi-angle-down"> </i>}{" "}
											</button>
										</div>
									</>
								) : (
									<></>
								)}
							</div>

							<div className="transaction-details-screen" style={{ alignItems: "center" }}>
								{showNotFound ? (
									<div>
										<span>Data Not Found</span>
									</div>
								) : null}
								<div className="user-heading heading-section" style={{ display: "flex", alignItems: "center" }}>
									<Button
										className="btn btn-continue"
										iconPos="left"
										icon="pi pi-refresh"
										label={"Refresh"}
										onClick={() => {
											getLogs();
											getPaymentDetails();
										}}
									></Button>
								</div>
								<div className="transaction-table-scroll">
									<div className="datatable-doc-demo">
										<DataTable
											value={transactionDetails}
											paginator
											className="transactionDetails-table"
											rows={50}
											paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
											rowsPerPageOptions={[10, 25, 50]}
											dataKey="id"
											filterDisplay="menu"
											loading={loading}
											responsiveLayout="scroll"
											globalFilterFields={["name", "country.name", "representative.name", "balance", "status"]}
											cellSelection
											emptyMessage="Data Not Found."
											currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
										>
											{/* <Column field="Id" sortable header="Id" /> */}
											<Column
												field="date"
												header="DateTime"
												// body={formatDateField}
												style={{ width: "20%" }}
												body={(rowData) => {
													if (rowData.stackTrace === "" || rowData.stackTrace === null) {
														return null;
													}
													return <span>{rowData.date}</span>;
												}}
											/>
											{/* <Column
                        style={{ width: "40%" }}
                        className="message-id"
                        field="logMessage"
                        header="Message "
                        body={(rowData) => {
                          if (rowData.stackTrace === "" || rowData.stackTrace === null) {


                            // <span>{rowData.deleteTableRows}</span>; 

                            // return rowData.remove()
                            return null;
                          }
                          return <span>{rowData.logMessage}</span>;
                        }}
                      /> */}
											<Column
												style={{ width: "40%" }}
												className="message-id"
												field="logMessage"
												header="Message "
												filter
												filterMatchMode="startsWith"
												filterFunction={(value, filter) => {
													return value.startsWith("Webhook");
												}}
											/>

											<Column
												className="message-id transaction-link "
												field="paymentId"
												body={actionBodyTemplate}
												header="Details"
												style={{ width: "10%" }}
											>
												<Button
													className="btn btn-continue"
													iconPos="left"
													icon="pi pi-refresh"
													label={"Details"}
													onClick={onBackClick}
												/>
											</Column>
										</DataTable>
									</div>
									<div className="button-section">
										<div className="bottom-btns">
											<Button
												type="button"
												className="btn btn-back second-btn"
												onClick={onBackClick}
												label="Back"
												loading={buttonloading}
											/>
										</div>
									</div>
								</div>
								&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;
							</div>
						</Scrollbars>
					</div>

					{readyPopup ? (
						<div className="popup-body">
							<div className="regiter-popup confirm-popup " id="confirm-popup">
								<div className="transaction-table-scroll">
									<div className="atatable-doc-demo">
										<DataTable
											value={valuesArray}
											paginator
											className="transactionDetails-table"
											rows={10}
											dataKey="id"
											filterDisplay="menu"
											loading={loading}
											responsiveLayout="scroll"
											cellSelection
											emptyMessage="No records found  found."
										>
											<Column className="message-id" field="StatusCode" header="Status Code " />
											<Column className="message-id" field="Message" header="Message " />
										</DataTable>
									</div>
								</div>

								<div className="popup-btn">
									<button type="button" onClick={cancelPopup} className="btn btn-continue second-btn">
										Ok
									</button>
								</div>
							</div>
						</div>
					) : null}
				</>
			)}
		</>
	);
};

export default TransactionsPaymentDetails;
