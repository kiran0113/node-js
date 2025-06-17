import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { ProgressSpinner } from "primereact/progressspinner";
import { Toast } from "primereact/toast";
import React, { useEffect, useRef, useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useNavigate, useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
//import { TransactionDetailsService } from "../../../services/Partner/TransactionDetails/TransactionDetails";
import { Logout } from "../../../utils/AccountUtils";
import moment from "moment";
import { Button } from "primereact/button";
import { TransactionDetails } from "../../../services/Partner/Transactions/TransactionDetails";
import TransactionsPaymentDetails from "./TransactionPaymentDetails";
import { Paginator } from "primereact/paginator";
//import { IsValidRoute } from "../../../utils/AccountUtils";
import { dateFormat } from "../../../utils/utils";
import { Calendar } from "primereact/calendar";

const Transactions: React.FC = () => {
	const dt = useRef(null);

	const toast = useRef<Toast>(null);

	const [loading, setLoading] = useState(false);

	const [pageLoading, setPageLoading] = useState(true);

	const navigate = useNavigate();

	const [globalFilterValue, setGlobalFilterValue] = useState(null);

	const [transactionDetails, setTransactionDetails] = useState<any[]>([]);

	const flag = parseInt(sessionStorage.getItem("PartnerPaymentRole"));
	// const isFacilitator1 = (sessionStorage.getItem("isfacilitator"));
	//facilitator

	const isFacilitator1 = sessionStorage.getItem("isfacilitator");
	const [highlightedPage, setHighlightedPage] = useState(0);
	const [exportReport, setExportReport] = useState(false);

	const { partnerid, type } = useParams();
	const { paymentId, type1 } = useParams();
	const PartnerId = parseInt(sessionStorage.getItem("PartnerId"));
	const [partnerID, setPartnerId] = useState(sessionStorage.getItem("PartnerId"));

	const [showDetails, setShowDetails] = useState(false);
	const [showTransactionDetails, setShowTransactionDetails] = useState(true);
	const [rowInfoData, setRowInfoData] = useState();

	const [startDate, setStartDate]: any = useState(new Date(new Date().setDate(new Date().getDate())));
	const [endDate, setEndDate]: any = useState(new Date());
	const maxDate: Date = new Date();

	const [endDateErrorMessage, setEndDateErrorMessage] = React.useState("");

	const [startDateErrorMessage, setStartDateErrorMessage] = React.useState("");

	const [Key, setKey] = useState("");

	const [first, setFirst] = useState(0);
	const [rows, setRows] = useState(10);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalRows, setTotalRows] = useState(0);
	const [last, setLast] = useState(0);
	const [pagesCount, setPagesCount] = useState(1);

	useEffect(() => {
		transactionDetailsPartnerById();
	}, []);

	const handleGlobalFilterChange = (event: any) => {
		setGlobalFilterValue(event.target.value);
	};

	useEffect(() => {
		transactionDetailsPartnerById();
	}, [first, pagesCount, globalFilterValue]);

	// transaction details by partner id

	const transactionDetailsPartnerById = () => {
		setLoading(true);
		let partnerId = PartnerId;
		let PageNumber = pagesCount;
		let RowsOfPage = rows;
		let Key = globalFilterValue ? globalFilterValue : "";

		TransactionDetails.getTransactionDetailsByPartnerId(partnerid, PageNumber, RowsOfPage, Key)
			.then((data) => {
				setTotalRows(data.data.totalRecord);
				setTransactionDetails(data.data.reponseBody);
				setLoading(false);
				setPageLoading(false);
			})
			.catch((error) => {
				if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else if (error.response.status === 400) {
					toast.current?.show({
						severity: "error",
						summary: error.response.data[0].errorMessage,
						life: 3000
					});
				} else {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				}
				setTransactionDetails([]);
				setLoading(false);
			});
	};
	const isValidate = () => {
		let validData = true;
		setStartDateErrorMessage(null);
		setEndDateErrorMessage(null);

		if (checkNull(startDate)) {
			setStartDateErrorMessage("Please enter start date.");
			validData = false;
		}

		if (checkNull(endDate)) {
			setEndDateErrorMessage("Please enter end date.");
			validData = false;
		}

		if (moment(endDate).diff(moment(startDate), "days") < 0) {
			setEndDateErrorMessage("End Date should be greater than start date.");
			validData = false;
		}

		return validData;
	};
	const checkNull = (value: any) => {
		if (value === "" || value === undefined || value === null) {
			return true;
		}
		return false;
	};

	const getReportData = () => {
		if (isValidate()) {
			setLoading(true);
			TransactionDetails.getReportsDetails(dateFormat(startDate.setHours(0, 0, 0)), dateFormat(endDate.setHours(23, 59, 59)), partnerID)
				.then((data) => {
					setTransactionDetails(data.data);

					if (!(data.data.length === 0)) {
						setExportReport(true);
					}
					setLoading(false);
					setPageLoading(false);
				})
				.catch((error) => {
					if (error.response.status === 401) {
						toast.current?.show({
							severity: "error",
							summary: "Unauthorized",
							life: 3000
						});
						Logout(navigate);
					} else if (error.response.status === 400) {
						toast.current?.show({
							severity: "error",
							summary: error.response.data[0].errorMessage,
							life: 3000
						});
					} else {
						toast.current?.show({
							severity: "error",
							summary:
								"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
							life: 3000
						});
					}
					setTransactionDetails([]);
					setLoading(false);
					setPageLoading(false);
				});
		}
	};

	const onSubmitClick = () => {
		setTransactionDetails(null);
		setExportReport(false);
		getReportData();
	};

	const downloadCSVFile = () => {
		setLoading(true);
		TransactionDetails.downloadReportsDetails(dateFormat(startDate.setHours(0, 0, 0)), dateFormat(endDate.setHours(23, 59, 59)), partnerID)
			.then((response) => {
				setLoading(false);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "IR_Reports.csv");
				document.body.appendChild(link);
				link.click();
			})
			.catch((error) => {
				if (error.response.status === 401) {
					toast.current?.show({
						severity: "error",
						summary: "Unauthorized",
						life: 3000
					});
					Logout(navigate);
				} else if (error.response.status === 400) {
					toast.current?.show({
						severity: "error",
						summary: error.response.data[0].errorMessage,
						life: 3000
					});
				} else {
					toast.current?.show({
						severity: "error",
						summary:
							"These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
						life: 3000
					});
				}
				setTransactionDetails([]);
				setLoading(false);
			});
	};

	const checkreceiverName = (rowData: any) => {
		if (rowData.receiverName === "" || rowData.receiverName === null || rowData.receiverName === undefined) {
			return (
				<React.Fragment>
					<span>{(rowData.receiveAmount = "")} </span>
				</React.Fragment>
			);
		} else {
			return (
				<React.Fragment>
					<span>{rowData.receiveAmount} </span>
				</React.Fragment>
			);
		}
	};

	// date field as per m/d/y
	const formatDateField = (rowData: any) => {
		return (
			<React.Fragment>
				<span>{moment(rowData.creationDate).format("MM/DD/YY H:mm.ss")} </span>
			</React.Fragment>
		);
	};

	const formatUpdatedDateField = (rowData: any) => {
		return (
			<React.Fragment>
				<span>{moment(rowData.updationDateTime).format("MM/DD/YY H:mm.ss")} </span>
			</React.Fragment>
		);
	};

	const actionBodyTemplate = (rowData: any) => {
		const onPaymentId = ({}) => {
			if (rowData.paymentId) {
				setShowDetails(true);
				setShowTransactionDetails(false);
				setRowInfoData(rowData.paymentId);
			}
		};

		return (
			<>
				<a className="payment-id-link" onClick={onPaymentId}>
					{rowData.paymentId}
				</a>
				{/* {showDetails ?   :<></>} */}
			</>
		);
	};

	useEffect(() => {
		// Calculate the last index for the current page
		const newLast = Math.min(rows, totalRows);
		setLast(newLast);
	}, [first, rows, totalRows]);

	const totalPages = Math.ceil(totalRows / rows);

	const onPageChange = (e: any) => {
		if (e && e.first === 0) {
			setFirst(1);
		} else {
			setFirst(e.first);
		}

		setCurrentPage(e.page);
		setPagesCount(e.page + 1);
	};

	const handlePageChange = (event: any) => {
		setFirst(event.first);
		// setPage(event.page)
		setCurrentPage(event.page);
	};

	return (
		<>
			<div>
				{pageLoading ? (
					<div className="spinner-class">
						<ProgressSpinner />
					</div>
				) : (
					<>
						{showTransactionDetails ? (
							<div>
								<div className="dashboard transaction-screen transaction-screen-3">
									{loading ? (
										<div className="spinner-class">
											<ProgressSpinner />
										</div>
									) : (
										<div className="transactionmain">
											<div className=" right-tab-section transaction-tab ">
												<Scrollbars
													className="contain-scroll"
													autoHide
													autoHideTimeout={1000}
													autoHideDuration={200}
													autoHeight
													autoHeightMin={2000}
													autoHeightMax={2000}
													thumbMinSize={30}
													universal={true}
													// style={{ width: '100%', height: '100vh' }}
												>
													<div className="transaction-table-scroll ">
														<div className="datatable-doc-demo">
															<div className="">
																<div
																	className="search-refresh-container"
																	style={{
																		display: "flex",
																		justifyContent: "space-between",
																		alignItems: "center",
																		margin: "10px"
																	}}
																>
																	<div
																		className="search-container"
																		style={{
																			position: "relative"
																		}}
																	>
																		<div
																			style={{
																				position: "absolute",
																				left: "10px",
																				top: "50%",
																				transform: "translateY(-50%)"
																			}}
																		>
																			<i className="pi pi-search" />
																		</div>
																		<input
																			type="text"
																			className="form-control"
																			value={globalFilterValue}
																			onChange={handleGlobalFilterChange}
																			placeholder="Search..."
																			style={{ paddingLeft: "30px" }}
																		/>
																	</div>

																	<Button
																		className="btn btn-continue"
																		// iconPos="left"
																		icon="pi pi-refresh"
																		label={"Refresh"}
																		onClick={() => transactionDetailsPartnerById()}
																	></Button>
																</div>
																<DataTable
																	style={{
																		overflow: "auto",
																		maxHeight: "8000px"
																	}}
																	ref={dt}
																	value={transactionDetails}
																	// paginator
																	className="transactionDetails-table"
																	// rows={50}
																	rows={rows}
																	paginatorTemplate={`CurrentPageReport`}
																	// paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
																	// rowsPerPageOptions={[50, 50, 50]}
																	dataKey="id"
																	loading={loading}
																	scrollDirection="both"
																	filterDisplay="menu"
																	globalFilter={globalFilterValue}
																	filters={globalFilterValue}
																	emptyMessage="No transactions found."
																	responsiveLayout="scroll"
																	// currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
																	sortField="creationDate"
																	sortOrder={-1}
																	onPage={handlePageChange}
																>
																	<Column
																		field="creationDate"
																		header="Date Time"
																		sortable
																		body={formatDateField}
																		style={{ width: "6%" }}
																	/>

																	<Column
																		field="updationDateTime"
																		header="Updated Date Time"
																		sortable
																		body={formatUpdatedDateField}
																		style={{ width: "8%" }}
																	/>
																	<Column
																		className="message-id"
																		field="messageId"
																		// body={actionBodyTemplate1}
																		header="Message Id"
																		sortable
																		style={{ width: "15%" }}
																	/>
																	<Column
																		className="message-id "
																		field="paymentId"
																		body={actionBodyTemplate}
																		header="Payment Id"
																		sortable
																		style={{ width: "15%" }}
																	/>
																	{/* messageId */}

																	<Column
																		className="small-col"
																		field="paymentType"
																		header="Payment Type"
																		sortable
																		style={{ width: "6%" }}
																	/>

																	<Column
																		className="small-col"
																		field="sendAmount"
																		header="Send Amount"
																		sortable
																		style={{ width: "6%" }}
																	/>
																	<Column
																		className="small-col"
																		field="sendCurrency"
																		header="Send Currency"
																		sortable
																		style={{ width: "6%" }}
																	/>
																	<Column
																		className="small-col receive-currency"
																		field="targetCurrency"
																		header="Receive Currency"
																		sortable
																		style={{ width: "6%" }}
																	/>
																	<Column
																		className="small-col"
																		field="receiveAmount"
																		header="Receive Amount"
																		style={{ width: "8%" }}
																		sortable
																		//body={checkreceiverName}
																	/>
																	{isFacilitator1 === "true" ? (
																		<Column
																			field="senderName"
																			header="Child Partner"
																			style={{ width: "9%" }}
																			sortable
																		/>
																	) : null}

																	<Column
																		className="small-col"
																		field="partnerTxID"
																		header="PartnerTxID"
																		sortable
																		style={{ width: "6%" }}
																		body={(rowData) => {
																			if (rowData.partnerTxID === null || rowData.partnerTxID === undefined) {
																				return "-";
																			} else {
																				return rowData.partnerTxID;
																			}
																		}}
																	/>
																	<Column field="description" header="Status" style={{ width: "9%" }} sortable />
																</DataTable>

																<div className="pagination-container">
																	<Paginator
																		// first={first}
																		first={first}
																		rows={rows}
																		totalRecords={totalRows}
																		onPageChange={onPageChange}
																		// className={highlightedPage === 0 ? 'highlighted' : ''}
																	/>

																	{/* style={{color:"var(--purple-dark)"}} */}

																	<div className="pagination-info" style={{ color: "var(--purple-dark)" }}>
																		{/* <div className={`pagination-info ${((currentPage * rows) + 1) === 1 ? 'highlighted' : ''}`}> */}
																		Showing page {currentPage * rows + 1} to{" "}
																		{Math.min((currentPage + 1) * rows, totalRows)} of {totalRows} entries
																	</div>
																</div>
															</div>
														</div>
													</div>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
													<br></br>
												</Scrollbars>
											</div>
										</div>
									)}
								</div>
							</div>
						) : (
							<TransactionsPaymentDetails
								rowInfoData={rowInfoData}
								setShowTransactionDetails={setShowTransactionDetails}
								partnerid={partnerid}
							/>
						)}
					</>
				)}
			</div>
		</>
	);
};

export default Transactions;
