import { AutoComplete } from 'primereact/autocomplete'
import { Button } from 'primereact/button'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ProgressSpinner } from 'primereact/progressspinner'
import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Logout } from '../../utils/AccountUtils'
import 'react-phone-number-input/style.css'
import React from 'react'
import moment from 'moment'
import { CurrenciesService } from '../../services/Partner/Currencies/Currencies'
import { Toast } from 'primereact/toast'
import { PartnerDepositService } from '../../services/Partner/Deposit/PartnerDeposit'
import Scrollbars from 'react-custom-scrollbars-2'
import LoadinIcon from '../../Layout/loadingIcon'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { Paginator } from 'primereact/paginator'

const Deposit: React.FC<any> = ({ onSaveAndContinueClick }) => {
  const { partnerid } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [partnerloading, setpartnerloading] = useState(false)
  const [depositloading, setdepositloading] = useState(false)
  const [withdrawloading, setwithdrawloading] = useState(false)
  const [loadingTransactions, setloadingTransactions] = useState(false)
  const [filteredWalletlist, setFilteredWalletlist] = React.useState<any[]>([])
  const [walletValue, setWalletValue] = useState('')
  const [errorMessageWalletValue, setErrorMessageWalletValue] = useState('')
  const [currencyValue, setCurrencyValue] = useState('')
  const [headerValue, setHeaderValue] = useState('Amount')
  const [rechargeAmountValue, setRechargeAmountValue] = useState('')
  const [noteValue, setnoteValue] = useState('')
  const [totalbalance, settotalbalance] = useState(0)
  const [show, setshow] = useState(false)
  const [showbalance, setBalance] = useState(false)
  const [showwallet, setWallet] = useState(true)
  const [displayDeletePopup, setDisplayDeletePopup] = useState(false)
  const [deletedata, setDeleteData] = useState(null)
  const [globalFilterValue, setGlobalFilterValue] = useState(null)
  const [displayDepositePopup, setDisplayDepositePopup] = useState(false)
  const [depositedata, setDepositeData] = useState(null)
  const [first, setFirst] = useState(0)
  const [rows, setRows] = useState(50)
  const [currentPage, setCurrentPage] = useState(0)
  const [pagesCount, setPagesCount] = useState(1)
  const [walletid, setWalletid] = useState(0)
  const [totalRows, setTotalRows] = useState(0)

  const [AccountId, setAccountId] = useState<string>('')
  const [RowsOfPage, setRowsOfPage] = useState<string>('')
  const [PageNumber, setPageNumber] = useState<string>('')

  const [errorMessageRechargeAmountValue, setErrorMessageRechargeAmountValue] =
    useState('')
  const toast = useRef<Toast>(null)
  const [walletList, setwalletList] = React.useState([])
  const [transactionHistoryModel, setTransactionHistoryModel] = React.useState(
    []
  )
  const [depositModel, setDepositModel] = React.useState({
    id: 0,
    AccountId: 0,
    PartnerId: 0,
    Amount: 0.0,
    PaymentOption: 0,
    TransactionId: '',
    TransactionType: '',
    RecordType: 0,
    Notes: '',
  })

  const [balancelodding, setBalanceLoding] = React.useState(true)

  const onPageChange = (e: any) => {
    if (e && e.first === 0) {
      setFirst(1)
    } else {
      setFirst(e.first)
    }

    setCurrentPage(e.page)
    setPagesCount(e.page + 1)
  }
  const [acbalancemodel, setAcbalanceModel] = React.useState({
    AvailableBalance: 0.0,
    CurrentBalance: 0.0,
  })
  const setModelEmpty = () => {
    setAcbalanceModel({
      AvailableBalance: 0.0,
      CurrentBalance: 0.0,
    })
  }

  const [currancy, setCurrency] = React.useState()
  const PartnerRoleId = sessionStorage.getItem('PartnerRoleId')

  useEffect(() => {
    // Update the document title using the browser API
    const useroobj = sessionStorage.getItem('User')
    if (useroobj === null || useroobj === undefined) {
      Logout(navigate)
    }
    setDepositModel({
      ...depositModel,
      PartnerId: Number(partnerid),
    })
    getCurrenciesByPartnerId(partnerid)
  }, [])

  useEffect(() => {
    getAllTransactionsByPartner(partnerid, AccountId)
  }, [RowsOfPage, PageNumber, first, pagesCount, globalFilterValue])

  const getAllTransactionsByPartner = (partnerid: any, accountId: any) => {
    setpartnerloading(true)
    let PageNumber = pagesCount
    let RowsOfPage = rows
    let SearchKey = globalFilterValue ? globalFilterValue : ''

    PartnerDepositService.getDepositeTransactions(
      partnerid,
      accountId,
      PageNumber,
      RowsOfPage,
      SearchKey
    )
      .then((transcationdetails: any) => {
        setTotalRows(transcationdetails.data.totalRecord)
        setTransactionHistoryModel(transcationdetails.data.responseBody)

        getTotalDepositeBalance(partnerid, accountId)
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.current?.show({
            severity: 'error',
            summary: 'Something went wrong',
            life: 3000,
          })
        } else if (error.response.status === 401) {
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
      })
  }

  const getTotalDepositeBalance = (partnerid: any, accountId: any) => {
    PartnerDepositService.getTotalBalance(partnerid, accountId)
      .then((totalbalancebypartnerid: any) => {
        setAcbalanceModel({
          ...acbalancemodel,
          AvailableBalance: totalbalancebypartnerid.data.availableBalance,
          CurrentBalance: totalbalancebypartnerid.data.currentBalance,
        })

        setpartnerloading(false)
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.current?.show({
            severity: 'error',
            summary: 'Something went wrong',
            life: 3000,
          })
        } else if (error.response.status === 401) {
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
        } else if (error.response.status === 404) {
          toast.current?.show({
            severity: 'error',
            summary: 'Data Not Found',
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
      })
  }

  const getCurrenciesByPartnerId = (partnerid: any) => {
    setLoading(true)
    let getdatafor = 'wallets'
    CurrenciesService.getCurrenciesByPartnerId(partnerid, getdatafor)
      .then((currencies: any) => {
        setwalletList(currencies.data)
        // getAllTransactionsByPartner(partnerid, 0);
        setLoading(false)
      })
      .catch((error) => {
        if (error.response.status === 500) {
          toast.current?.show({
            severity: 'error',
            summary: 'Something went wrong',
            life: 3000,
          })
        } else if (error.response.status === 401) {
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
            summary: 'Error while getting partnership details.',
            life: 3000,
          })
        }
        setLoading(false)
      })
  }

  const searchWallet = (event: any) => {
    let query = event.query
    let _filteredItems: any = []
    for (let i = 0; i < walletList.length; i++) {
      let item = walletList[i]

      if (item.code.toLowerCase().indexOf(query.toLowerCase()) === 0) {
        _filteredItems.push(item)
      }
    }
    setFilteredWalletlist(_filteredItems)
  }

  const onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRechargeAmountValue(e.target.value)
    setErrorMessageRechargeAmountValue('')
    setDepositModel({ ...depositModel, Amount: Number(e.target.value) })
  }

  const CheckNull = (value: any) => {
    if (
      value === '' ||
      value === undefined ||
      value === null ||
      value === '0'
    ) {
      return true
    }
    return false
  }

  const validate = () => {
    var formIsValid = true

    if (CheckNull(walletValue)) {
      setErrorMessageWalletValue('Please select wallet.')
      formIsValid = false
    }
    if (
      rechargeAmountValue == null ||
      rechargeAmountValue == '0' ||
      rechargeAmountValue == ''
    ) {
      setErrorMessageRechargeAmountValue('Please enter the  amount.')
      formIsValid = false
    }

    if (!CheckNull(rechargeAmountValue)) {
      if (Number(rechargeAmountValue) < 0) {
        setErrorMessageRechargeAmountValue(
          'Deposit amount can not be negative.'
        )
        formIsValid = false
      }
      if (!(Number(rechargeAmountValue) < 0)) {
        if (!rechargeAmountValue.match(/^\d{1,18}(\.\d{0,2})?$/)) {
          setErrorMessageRechargeAmountValue(
            'Deposit amount valid only upto length(16,2).'
          )
          formIsValid = false
        }
      }
    }
    return formIsValid
  }

  //  Deposit Amount
  const rechargeWallet = () => {
    if (validate()) {
      setdepositloading(true)
      PartnerDepositService.depositeAmount(depositModel)
        .then((data: any) => {
          setRechargeAmountValue('')
          setnoteValue('')
          setTransactionHistoryModel(data.data)

          getAllTransactionsByPartner(
            depositModel.PartnerId,
            depositModel.AccountId
          )
          // getTotalDepositeBalance(depositModel.PartnerId, depositModel.AccountId);

          setdepositloading(false)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.current?.show({
              severity: 'error',
              summary: 'Something went wrong',
              life: 3000,
            })
          } else if (error.response.status === 401) {
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
          setdepositloading(false)
          setRechargeAmountValue('')
          setnoteValue('')
          setpartnerloading(false)
        })
    }
  }

  const reject = () => {
    setDeleteData(null)
    setDisplayDeletePopup(false)
  }

  const rejectDeposite = () => {
    setDepositeData(null)
    setDisplayDepositePopup(false)
  }

  //  withdraw Amount
  const withdrawWallet = () => {
    if (validate()) {
      setwithdrawloading(true)
      // if (acbalancemodel.AvailableBalance >= 0.01)
      if (acbalancemodel.AvailableBalance >= 0.0) {
        const formattedAmount = parseFloat(rechargeAmountValue).toFixed(2)

        // const amount = Math.round(parseFloat(rechargeAmountValue) * 100);
        setDepositModel({
          ...depositModel,
          Amount: Number(formattedAmount),
          // Amount: formattedAmount
        })
      }

      PartnerDepositService.withdrawAmount(depositModel)
        .then((data: any) => {
          setRechargeAmountValue('')
          setnoteValue('')
          setTransactionHistoryModel(data.data)

          getAllTransactionsByPartner(
            depositModel.PartnerId,
            depositModel.AccountId
          )
          // getTotalDepositeBalance(depositModel.PartnerId, depositModel.AccountId);

          setwithdrawloading(false)

          setDisplayDeletePopup(false)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.current?.show({
              severity: 'error',
              summary: 'Something went wrong',
              life: 3000,
            })

            setDisplayDeletePopup(false)
          } else if (error.response.status === 401) {
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
          setwithdrawloading(false)
          setRechargeAmountValue('')
          setnoteValue('')
          setpartnerloading(false)
        })
    } else {
      setDisplayDeletePopup(false)
    }
  }

  const onWalletChange = (e: any) => {
    const selectedCode = e.target.value.code
    const transactionHistoryList = [...transactionHistoryModel]
    const newTransactionHistoryList = transactionHistoryList.filter(
      (transaction: any) => transaction.code === selectedCode
    )
    setTransactionHistoryModel(newTransactionHistoryList)
    setloadingTransactions(true)
    setWalletValue(e.value)
    setAccountId(e.value.id)
    setCurrencyValue(e.value.currency)
    setHeaderValue('Amount (' + e.value.currency + ')')
    setDepositModel({ ...depositModel, AccountId: e.value.id })
    getAllTransactionsByPartner(partnerid, e.value.id)
    setErrorMessageRechargeAmountValue('')
    setRechargeAmountValue('')
    setErrorMessageWalletValue('')
    setnoteValue('')
    setWalletid(e.value.id)
    setshow(true)
    setBalance(true)
    setWallet(false)
  }

  const formatDateField = (rowData: any) => {
    return (
      <React.Fragment>
        <span>{moment(rowData.date).format('MM/DD/YY H:mm:ss')} </span>
      </React.Fragment>
    )
  }

  return (
    <>
      {loading ? (
        <div className='spinner-class'>
          <ProgressSpinner />
        </div>
      ) : (
        <div className='table-screen add-user-screen wrapper ledgermain'>
          {/* <Toast ref={toast}></Toast> */}
          <div className='container-fluid acc-screen adm-insta-fees-table  info-section'>
            <div className='right-tab-section'>
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
                <div className='user-tab ledger-tab datatable-doc-demo'>
                  <div className='row'>
                    <div className=' col-md-6 form-group '>
                      <span className='input-label'>
                        Wallet<span className='color-red'>*</span>{' '}
                      </span>

                      <AutoComplete
                        tabIndex={7}
                        field='code'
                        dropdown
                        forceSelection
                        aria-label='wallets'
                        dropdownAriaLabel='Select Wallet'
                        className='dropdown-acc'
                        placeholder='Select Wallet'
                        suggestions={filteredWalletlist}
                        completeMethod={searchWallet}
                        onChange={(e) => onWalletChange(e)}
                        value={walletValue}
                      />
                      {errorMessageWalletValue !== null &&
                      errorMessageWalletValue.length > 0 ? (
                        <span className='login-error-msg'>
                          {errorMessageWalletValue}
                        </span>
                      ) : null}
                    </div>
                    <div className=' col-md-6 form-group '>
                      <span className='input-label'>Currency </span>

                      <input
                        className='form-control '
                        type='text'
                        name='currenty'
                        placeholder='Enter currency'
                        value={currencyValue}
                        readOnly
                        disabled
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <div className=' col-md-6 form-group '>
                      <span className='input-label'>
                        Amount <span className='color-red'>*</span>{' '}
                      </span>
                      <input
                        className='form-control'
                        type='number'
                        id='rechargeAmount'
                        name='rechargeAmount'
                        placeholder='Enter amount'
                        value={rechargeAmountValue}
                        onChange={onAmountChange}
                      />
                      {errorMessageRechargeAmountValue !== null &&
                      errorMessageRechargeAmountValue.length > 0 ? (
                        <span className='login-error-msg'>
                          {errorMessageRechargeAmountValue}
                        </span>
                      ) : null}
                    </div>
                    <div className=' col-md-6 form-group '>
                      <span className='input-label'>Note </span>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Enter note'
                        value={noteValue}
                        onChange={(e) => {
                          setnoteValue(e.target.value)
                          setDepositModel({
                            ...depositModel,
                            Notes: e.target.value,
                          })
                        }}
                      />
                    </div>
                  </div>

                  <div
                    className='user-heading heading-section'
                    style={{ textAlign: 'end' }}
                  >
                    <Button
                      iconPos='left'
                      label={'Withdraw'}
                      disabled={
                        walletValue && rechargeAmountValue ? false : true
                      }
                      className='btn btn-continue send-btn'
                      onClick={() => {
                        // withdrawWallet();

                        setDisplayDeletePopup(true)
                      }}
                      loading={withdrawloading}
                    />

                    {PartnerRoleId && Number(PartnerRoleId) !== 2 ? (
                      <Button
                        iconPos='left'
                        label={'Deposit'}
                        disabled={
                          walletValue && rechargeAmountValue ? false : true
                        }
                        className='btn btn-continue send-btn'
                        onClick={() => {
                          // rechargeWallet
                          setDisplayDepositePopup(true)
                        }}
                        loading={depositloading}
                      />
                    ) : (
                      <></>
                    )}

                    <Button
                      iconPos='left'
                      icon='pi pi-refresh'
                      label='Refresh'
                      className='btn btn-continue'
                      onClick={() => {
                        getAllTransactionsByPartner(partnerid, walletid)
                        getTotalDepositeBalance(partnerid, walletid)
                      }}
                    />
                  </div>

                  <div className='wallet-table'>
                    {partnerloading ? (
                      <div className='spinner-class-partnerloader wallet-loader'>
                        <ProgressSpinner />
                      </div>
                    ) : (
                      <>
                        <div className='datatable-doc-demo balance-amount'>
                          {walletValue ? (
                            <div className='row  '>
                              <div className='col-md-3'>
                                Available Balance :{' '}
                                {acbalancemodel.AvailableBalance}
                              </div>
                              <div className='col-md-3'>
                                Current Balance :{' '}
                                {acbalancemodel.CurrentBalance}
                              </div>
                            </div>
                          ) : (
                            <></>
                          )}

                          <span className='text-blue-address transaction'>
                            Transactions
                          </span>
                          <div className='col-md-6 data-search-input'>
                            <span className='p-input-icon-left'>
                              <i className='pi pi-search' />
                              <InputText
                                type='search'
                                placeholder='Search...'
                                onInput={(e: any) =>
                                  setGlobalFilterValue(e.target.value)
                                }
                              />
                            </span>
                          </div>
                          <br></br>
                          <div className=''>
                            <DataTable
                              value={transactionHistoryModel}
                              // paginator
                              className='p-datatable-customers'
                              rows={10}
                              paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown'
                              rowsPerPageOptions={[10, 25, 50]}
                              dataKey='id'
                              rowHover
                              filterDisplay='menu'
                              responsiveLayout='scroll'
                              globalFilter={globalFilterValue}
                              filters={globalFilterValue}
                              // globalFilterFields={[
                              //   "name",
                              //   "country.name",
                              //   "representative.name",
                              //   "balance",
                              //   "status",
                              // ]}
                              sortField='date'
                              sortOrder={-1}
                              emptyMessage='Data Not Found.'
                              currentPageReportTemplate='Showing {first} to {last} of {totalRecords} entries'
                            >
                              <Column
                                field='date'
                                header='Date Time'
                                sortable
                                body={formatDateField}
                              />
                              {showwallet ? (
                                <Column
                                  field='code'
                                  header='WalletId'
                                  sortable
                                />
                              ) : (
                                <></>
                              )}

                              <Column
                                field='amount'
                                header={headerValue}
                                sortable
                                bodyClassName={(rowData) =>
                                  rowData.paymentOption?.includes('Credit')
                                    ? 'text-green'
                                    : 'text-danger'
                                }
                              />

                              {/* <Column
                              field="amount"
                              header={headerValue}
                              sortable
                              bodyClassName={(rowData) =>
                                rowData.paymentOption?.includes("Debit")
                                  ? "text-green"
                                  : "text-danger"
                              }

                            /> */}

                              {/* <Column
                              field="amount"
                              header={headerValue}
                              sortable
                              bodyClassName={(rowData) =>
                                rowData.paymentOption?.includes("Debit")
                                  ? "text-green"
                                  : "text-danger"
                              }

                            /> */}

                              <Column
                                field='paymentOption'
                                sortable
                                header='Payment Option'
                              />
                              <Column field='notes' header='Note' sortable />
                              <Column
                                field='currency'
                                header='Currency'
                              ></Column>
                              <Column
                                field='createdBy'
                                header='Created By'
                                sortable
                              />
                            </DataTable>
                            <div className='pagination-container'>
                              <Paginator
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
                                {Math.min((currentPage + 1) * rows, totalRows)}{' '}
                                of {totalRows} entries
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      )}

      {displayDeletePopup ? (
        <div className='popup-body'>
          <div
            className='register-popup Payment-screen'
            style={{ width: '570px' }}
          >
            <div className='text-center '>
              <div className='awesome-text'>
                <h4 style={{ margin: '5px', padding: '5px' }}>
                  <i
                    className='pi pi-info-circle'
                    style={{
                      marginLeft: '10px',
                      marginTop: '-24px',
                      marginRight: '-26px',
                    }}
                  ></i>
                  {/* <i className="pi pi-info-circle" style={{ marginLeft: '6px', marginTop: '-17px', marginRight: '-2px' }}></i> */}
                  Are you sure that you want to withdraw funds from the
                  partner's wallet?
                </h4>
              </div>
            </div>
            <div className='payment-screen-btn'>
              <button className='btn btn-cancel second-btn' onClick={reject}>
                Cancel
              </button>
              <button
                className='btn btn-continue second-btn yes-btn-popup'
                onClick={() => {
                  withdrawWallet()
                  setDisplayDeletePopup(false)
                }}
                style={{
                  marginRight: '10px',
                  paddingRight: '10px',
                  paddingLeft: '5px',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* {walletValue && rechargeAmountValue && displayDepositePopup ? ( */}
      {displayDepositePopup ? (
        <div className='popup-body'>
          <div
            className='register-popup Payment-screen'
            style={{ width: '610px' }}
          >
            <div className='text-center '>
              <div className='awesome-text'>
                {/* <h4 style={{ margin: '5px', padding: '5px' }}> */}

                <h4 style={{ margin: '5px', padding: '5px' }}>
                  <i
                    className='pi pi-info-circle'
                    style={{
                      marginLeft: '10px',
                      marginTop: '-24px',
                      marginRight: '-16px',
                    }}
                  ></i>
                  {/* <i className="pi pi-info-circle" ></i> */}
                  Are you sure that you want to deposit funds to the partner's
                  wallet?
                </h4>
              </div>
            </div>
            <div className='payment-screen-btn'>
              <button
                className='btn btn-cancel second-btn'
                onClick={rejectDeposite}
              >
                Cancel
              </button>
              <button
                className='btn btn-continue second-btn yes-btn-popup'
                onClick={() => {
                  rechargeWallet()
                  setDisplayDepositePopup(false)
                }}
                style={{
                  marginRight: '10px',
                  paddingRight: '10px',
                  paddingLeft: '5px',
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}

export default Deposit
