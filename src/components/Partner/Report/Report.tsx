import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Toast } from 'primereact/toast'
import React, { useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useNavigate, useParams } from 'react-router-dom'
import { InputText } from 'primereact/inputtext'
//import { TransactionDetailsService } from "../../../services/Partner/TransactionDetails/TransactionDetails";
import { Logout } from '../../../utils/AccountUtils'
import moment from 'moment'
import { Button } from 'primereact/button'
import { TransactionDetails } from '../../../services/Partner/Transactions/TransactionDetails'

import TransactionsPaymentDetails from '../Transactions/TransactionPaymentDetails'
import { Paginator } from 'primereact/paginator'
import { IsValidRoute } from '../../../utils/AccountUtils'

import { dateFormat } from '../../../utils/utils'
import { Calendar } from 'primereact/calendar'
import { ReportsService } from '../../../services/Partner/Reports/Reports'

const Report: React.FC = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [exportReport, setExportReport] = useState(false)
  const { partnerid } = useParams()
  // const [partnerID, setPartnerId] = useState(sessionStorage.getItem("partnerid"));
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(50)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalRows, setTotalRows] = useState(0)
  const [last, setLast] = useState(0)

  const [pagesCount, setPagesCount] = useState(1)
  const [startDate, setStartDate]: any = useState(
    new Date(new Date().setDate(new Date().getDate()))
  )
  const [endDate, setEndDate]: any = useState(new Date())
  const maxDate: Date = new Date()

  const [endDateErrorMessage, setEndDateErrorMessage] = React.useState('')

  const [startDateErrorMessage, setStartDateErrorMessage] = React.useState('')

  const [pageloading, setPageLoading] = useState(false)
  const dt = useRef(null)
  const [reportData, setReportData] = useState<any[]>([])
  const toast = useRef<Toast>(null)

  // useEffect(() => {
  //   IsValidRoute(navigate);
  //   const useroobj =sessionStorage.getItem("User");
  //   if (useroobj === null || useroobj === undefined) {
  //     Logout(navigate);
  //   }
  //   onSubmitClick();
  // }, []);

  const formatReceiveAmount = (receiveAmount: any) => {
    if (receiveAmount != null) {
      const amountString = receiveAmount.toString()

      if (amountString.includes('.')) {
        const [integerPart, decimalPart] = amountString.split('.')

        const trimmedDecimalPart = decimalPart.replace(/0+$/, '')

        if (trimmedDecimalPart.length === 0) {
          return integerPart
        } else {
          return `${integerPart}.${trimmedDecimalPart}`
        }
      }

      return amountString
    }

    return ''
  }

  const formatSendAmount = (sendAmount: any) => {
    if (sendAmount != null) {
      const amountString = sendAmount.toString()

      if (amountString.includes('.')) {
        const [integerPart, decimalPart] = amountString.split('.')

        const trimmedDecimalPart = decimalPart.replace(/0+$/, '')

        if (trimmedDecimalPart.length === 0) {
          return integerPart
        } else {
          return `${integerPart}.${trimmedDecimalPart}`
        }
      }

      return amountString
    }

    return ''
  }

  useEffect(() => {
    // Calculate the last index for the current page
    const newLast = Math.min(rows, totalRows)
    setLast(newLast)
  }, [first, rows, totalRows])

  const totalPages = Math.ceil(totalRows / rows)

  useEffect(() => {
    getReportData()
  }, [first, pagesCount])

  const getReportData = () => {
    let PageNumber = pagesCount
    let RowOfPage = rows

    if (isValidate()) {
      setLoading(true)
      // setPageLoading(true)

      ReportsService.getReportsDetails(
        dateFormat(startDate.setHours(0, 0, 0)),
        dateFormat(endDate.setHours(23, 59, 59)),
        partnerid,
        PageNumber,
        RowOfPage
      )
        .then((data) => {
          setReportData(data.data.reponseBody)
          setTotalRows(data.data.totalRecord)
          setLoading(true)
          setPageLoading(true)

          if (!(data.data.length === 0)) {
            setExportReport(true)
          } else {
            setExportReport(false)
          }
          setLoading(false)
          // setPageLoading(false)
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.current?.show({
              severity: 'error',
              summary: 'Unauthorized',
              life: 3000,
            })
            Logout(navigate)
          } else if (error.response.status === 400) {
            toast.current?.show({
              severity: 'error',
              summary: error.response.data[0].errorMessage,
              life: 3000,
            })
          } else {
            toast.current?.show({
              severity: 'error',
              summary:
                'These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io',
              life: 3000,
            })
          }
          setReportData([])
          setLoading(false)
          setPageLoading(false)
        })
    }
  }

  const onSubmitClick = () => {
    setReportData(null)

    getReportData()
  }

  const downloadCSVFile = () => {
    setLoading(true)
    ReportsService.downloadReportsDetails(
      dateFormat(startDate.setHours(0, 0, 0)),
      dateFormat(endDate.setHours(23, 59, 59)),
      partnerid
    )

      .then((response) => {
        setLoading(false)
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'IR_Reports.csv')
        document.body.appendChild(link)
        link.click()
      })

      .catch((error) => {
        if (error.response.status === 401) {
          toast.current?.show({
            severity: 'error',
            summary: 'Unauthorized',
            life: 3000,
          })
        } else if (error.response.status === 400) {
          toast.current?.show({
            severity: 'error',
            summary: error.response.data[0].errorMessage,
            life: 3000,
          })
        } else {
          toast.current?.show({
            severity: 'error',
            summary:
              'These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io',
            life: 3000,
          })
        }

        setReportData([])
        setLoading(false)
      })
  }

  const isValidate = () => {
    let validData = true
    setStartDateErrorMessage(null)
    setEndDateErrorMessage(null)

    if (checkNull(startDate)) {
      setStartDateErrorMessage('Please enter start date.')
      validData = false
    }

    if (checkNull(endDate)) {
      setEndDateErrorMessage('Please enter end date.')
      validData = false
    }

    if (moment(endDate).diff(moment(startDate), 'days') < 0) {
      setEndDateErrorMessage('End Date should be greater than start date.')
      validData = false
    }

    return validData
  }

  const checkNull = (value: any) => {
    if (value === '' || value === undefined || value === null) {
      return true
    }
    return false
  }

  const onPageChange = (e: any) => {
    if (e && e.first === 0) {
      setFirst(1)
    } else {
      setFirst(e.first)
    }

    setCurrentPage(e.page)
    setPagesCount(e.page + 1)
  }

  const handlePageChange = (event: any) => {
    setFirst(event.first)
    // setPage(event.page)
    setCurrentPage(event.page)
  }

  return (
    <>
      {loading ? (
        <div className='spinner-class'>
          <ProgressSpinner />
        </div>
      ) : (
        <div className=' right-tab-section transaction-tab '>
          <Scrollbars
            className='contain-scroll'
            autoHide
            autoHideTimeout={1000}
            autoHideDuration={200}
            autoHeight
            autoHeightMin={100}
            autoHeightMax={100}
            thumbMinSize={30}
            universal={true}
          >
            <div className='heading-section'>
              <span className='text-header-purple'>Reports</span>
            </div>
            <div className='container-fluid acc-screen info-section reportpage'>
              <div className='row'>
                <div className=' col-md-4 form-group '>
                  <span className='input-label'>
                    Start Date<span className='color-red'></span>
                  </span>
                  <div className='calendar-style'>
                    <Calendar
                      id='icon'
                      showIcon
                      className='calendar-style'
                      placeholder='mm/dd/yyyy'
                      dateFormat='mm/dd/yy'
                      name='startDate'
                      maxDate={endDate}
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value)
                        setStartDateErrorMessage(null)
                        setExportReport(false)
                      }}
                    />
                    {startDateErrorMessage !== null &&
                    startDateErrorMessage.length > 0 ? (
                      <span className='error-msg report-error'>
                        {startDateErrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className=' col-md-4 form-group '>
                  <span className='input-label'>
                    End Date<span className='color-red'></span>
                  </span>
                  <div className='calendar-style'>
                    <Calendar
                      id='icon'
                      showIcon
                      className='calendar-style'
                      placeholder='mm/dd/yyyy'
                      dateFormat='mm/dd/yy'
                      name='endDate'
                      maxDate={maxDate}
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value)
                        setEndDateErrorMessage(null)
                        setExportReport(false)
                      }}
                    />
                    {endDateErrorMessage !== null &&
                    endDateErrorMessage.length > 0 ? (
                      <span className='error-msg report-error'>
                        {endDateErrorMessage}
                      </span>
                    ) : null}
                  </div>
                </div>

                <div
                  className='col-auto'
                  style={{ marginTop: '6px', marginLeft: '35px' }}
                >
                  <Button
                    id='downloadBtn'
                    className='btn btn-continue second-btn'
                    label={'Submit'}
                    onClick={() => {
                      getReportData()
                    }}
                  />
                </div>
                <div className='col-auto' style={{ marginTop: '6px' }}>
                  {exportReport ? (
                    <Button
                      id='downloadBtn'
                      className='btn btn-continue second-btn'
                      label={'Export'}
                      onClick={() => {
                        downloadCSVFile()
                      }}
                    />
                  ) : null}
                </div>
              </div>

              {loading ? (
                <div className='spinner-class'>
                  <ProgressSpinner />
                </div>
              ) : (
                <div className='datatable-doc-demo'>
                  <div className=''>
                    <DataTable
                      ref={dt}
                      value={reportData}
                      // paginator
                      className='transactionDetails-table'
                      rows={50}
                      paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                      rowsPerPageOptions={[50, 50, 50]}
                      dataKey='id'
                      loading={loading}
                      rowHover
                      filterDisplay='menu'
                      emptyMessage='No record found.'
                      responsiveLayout='scroll'
                      // currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
                      sortField='creationDate'
                      sortOrder={-1}
                      onPage={handlePageChange}
                    >
                      <Column
                        className='small-col'
                        field='paymentId'
                        header='Payment ID'
                        sortable
                      />

                      <Column
                        field='sendAmount'
                        header='Send Amount'
                        body={(rowData) => (
                          <span>{formatSendAmount(rowData.sendAmount)}</span>
                        )}
                        sortable
                      />

                      <Column
                        className='small-col'
                        field='sendCurrency'
                        header='Send Currency'
                        sortable
                      />

                      <Column
                        className='small-col'
                        field='receiveAmount'
                        header='Receive Amount'
                        body={(rowData) => (
                          <span>
                            {formatReceiveAmount(rowData.receiveAmount)}
                          </span>
                        )}
                        sortable
                      />

                      <Column
                        className='small-col'
                        field='receiveCurrency'
                        header='Receive Currency'
                        sortable
                      />

                      <Column
                        field='paymentType'
                        header='Payment Type'
                        sortable
                      />
                    </DataTable>
                    <div className='pagination-container'>
                      <Paginator
                        // first={first}
                        first={first}
                        rows={rows}
                        totalRecords={totalRows}
                        onPageChange={onPageChange}
                      />
                      <div
                        className='pagination-info'
                        style={{ color: 'var(--purple-dark)' }}
                      >
                        Showing page {currentPage * rows + 1} to{' '}
                        {Math.min((currentPage + 1) * rows, totalRows)} of{' '}
                        {totalRows} entries
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

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
      )}
    </>
  )
}

export default Report
