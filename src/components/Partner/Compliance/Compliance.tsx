import { InputText } from "primereact/inputtext";
import React, { useState, useEffect, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

// import "./Common.css";
const Compliance = () => {
	const [globalFilterValue, setGlobalFilterValue] = useState(null);

	//need to integrate globalFilterValue
	const [startDate, setStartDate]: any = useState(new Date(new Date().setDate(new Date().getDate())));
	const [endDate, setEndDate]: any = useState(new Date());
	const maxDate: Date = new Date();
	const [exportReport, setExportReport] = useState(false);
	const [reportData, setReportData] = useState<any[]>([]);

	const [endDateErrorMessage, setEndDateErrorMessage] = React.useState("");

	const [startDateErrorMessage, setStartDateErrorMessage] = React.useState("");
	const onSubmitClick = () => {
		setReportData(null);
		setExportReport(false);
		// getReportData();
	};

	return (
		<div className="compliance-section">
			<div className="container">
				<p>Need Review</p>
				<div className="col-md-6 data-search-input mb-3">
					<span className="p-input-icon-left">
						<i className="pi pi-search" />
						<InputText type="search" placeholder="Search..." onInput={(e: any) => setGlobalFilterValue(e.target.value)} />
					</span>
				</div>

				<div className="row">
					<div className=" col-md-3 form-group ">
						<span className="input-label">
							Start Date<span className="color-red"></span>
						</span>
						<div className="calendar-style">
							<Calendar
								id="icon"
								showIcon
								className="calendar-style"
								// placeholder="mm/dd/yyyy"
								placeholder="01/06/2023"
								dateFormat="mm/dd/yy"
								name="startDate"
								maxDate={startDate}
								// value={startDate}
								value={"01/06/2023"}
								onChange={(e) => {
									setStartDate(e.target.value);
									setStartDateErrorMessage(null);
									setExportReport(false);
								}}
							/>
							{startDateErrorMessage !== null && startDateErrorMessage.length > 0 ? (
								<span className="error-msg report-error">{startDateErrorMessage}</span>
							) : null}
						</div>
					</div>
					<div className=" col-md-3 form-group ">
						<span className="input-label">
							End Date<span className="color-red"></span>
						</span>
						<div className="calendar-style">
							<Calendar
								id="icon"
								showIcon
								className="calendar-style"
								// placeholder="mm/dd/yyyy"
								placeholder="01/07/2023"
								dateFormat="mm/dd/yy"
								name="endDate"
								maxDate={maxDate}
								// value={endDate}
								value={"01/07/2023"}
								onChange={(e) => {
									setEndDate(e.target.value);
									setEndDateErrorMessage(null);
									setExportReport(false);
								}}
							/>
							{endDateErrorMessage !== null && endDateErrorMessage.length > 0 ? (
								<span className="error-msg report-error">{endDateErrorMessage}</span>
							) : null}
						</div>
					</div>

					<div className="col-md-6 col-12 text-center reportsubmitbtn">
						<Button id="downloadBtn" className="btn btn-continue second-btn" label={"Submit"} onClick={() => onSubmitClick()} />
						{/* {exportReport ? ( */}
						<Button
							id="downloadBtn"
							className="btn btn-continue second-btn"
							label={"Export"}
							// onClick={() => downloadCSVFile()}
						/>
						{/* // ) : null} */}
					</div>
					{/* <div className="col-md-2 col-12 text-center  mt-1">
                  {exportReport ? (
                    <Button
                      id="downloadBtn"
                      className="btn btn-continue second-btn"
                      label={"Export"}
                      onClick={() => downloadCSVFile()}
                    />
                  ) : null}
                </div> */}
				</div>

				<div className="table-responsive">
					<table className="table table-hover">
						<thead>
							<tr>
								<th scope="col">Payment Id</th>
								<th scope="col">Partner Name</th>
								<th scope="col">Match Name</th>
								<th scope="col">Name Score</th>
								<th scope="col">DOB Score</th>
								<th scope="col">List Type</th>
								<th scope="col">Sanction Status</th>
								<th scope="col">Compliance status</th>
								<th scope="col">Payment Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>2ddshfhsdfcdc-adfh-dsdf</td>
								<td>Nomad CTS</td>
								<td>Amir Khan</td>
								<td>100</td>
								<td>100</td>
								<td>US-OFAC:SDN Advanced</td>
								<td>RED</td>
								<td>Declined</td>
								<td>
									<div className="actionstyle">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-check-lg"
											viewBox="0 0 22 22"
										>
											<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
										</svg>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 22 22"
										>
											<path
												fillRule="evenodd"
												d="M1.293 1.293a1 1 0 011.414 0L8 7.586l5.293-6.293a1 1 0 011.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-pencil-square"
											viewBox="0 0 22 22"
										>
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
											<path
												fill-rule="evenodd"
												d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
											/>
										</svg>
									</div>
								</td>
							</tr>
							<tr>
								<td>2ddshfhsdfcdc-adfh-dsdf</td>
								<td>Nomad CTS</td>
								<td>Amir Khan</td>
								<td>100</td>
								<td>100</td>
								<td>US-OFAC:SDN Advanced</td>
								<td>AMBER</td>
								<td>InReiview</td>
								<td>
									<div className="actionstyle">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-check-lg"
											viewBox="0 0 22 22"
										>
											<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 22 22"
										>
											<path
												fillRule="evenodd"
												d="M1.293 1.293a1 1 0 011.414 0L8 7.586l5.293-6.293a1 1 0 011.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-pencil-square"
											viewBox="0 0 22 22"
										>
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
											<path
												fill-rule="evenodd"
												d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
											/>
										</svg>
									</div>
								</td>
							</tr>
							<tr>
								<td>2ddshfhsdfcdc-adfh-dsdf</td>
								<td>Nomad CTS</td>
								<td>Amir Khan</td>
								<td>100</td>
								<td>100</td>
								<td>US-OFAC:SDN Advanced</td>
								<td>GREEN</td>
								<td>Passed</td>
								<td>
									<div className="actionstyle">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-check-lg"
											viewBox="0 0 22 22"
										>
											<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 22 22"
										>
											<path
												fillRule="evenodd"
												d="M1.293 1.293a1 1 0 011.414 0L8 7.586l5.293-6.293a1 1 0 011.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-pencil-square"
											viewBox="0 0 22 22"
										>
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
											<path
												fill-rule="evenodd"
												d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
											/>
										</svg>
									</div>
								</td>
							</tr>
							<tr>
								<td>2ddshfhsdfcdc-adfh-dsdf</td>
								<td>Nomad CTS</td>
								<td>Amir Khan</td>
								<td>100</td>
								<td>100</td>
								<td>US-OFAC:SDN Advanced</td>
								<td>Approve</td>
								<td>Reject</td>
								<td>
									<div className="actionstyle">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-check-lg"
											viewBox="0 0 22 22"
										>
											<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-x"
											viewBox="0 0 22 22"
										>
											<path
												fillRule="evenodd"
												d="M1.293 1.293a1 1 0 011.414 0L8 7.586l5.293-6.293a1 1 0 011.414 1.414L9.414 8l5.293 5.293a1 1 0 01-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 01-1.414-1.414L6.586 8 1.293 2.707a1 1 0 010-1.414z"
											/>
										</svg>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="22"
											height="22"
											fill="currentColor"
											className="bi bi-pencil-square"
											viewBox="0 0 22 22"
										>
											<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
											<path
												fill-rule="evenodd"
												d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
											/>
										</svg>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
export default Compliance;
