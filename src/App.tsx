import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import './App.css'
import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
// import "@fontsource/space-grotesk";
import 'primeicons/primeicons.css'
import 'primereact/resources/themes/lara-light-indigo/theme.css'
import 'primereact/resources/primereact.min.css'
import LoadinIcon from './Layout/loadingIcon'
import AutoUpdateToken from './services/Account/AutoUpdateToken'
import sessionStorageContext from './components/context/LocalStorageContext'
import TransactionsPaymentDetails from './components/Partner/Transactions/TransactionPaymentDetails'
import SanctionsProgram from './components/Partner/Compliance/SanctionsProgram'
import LocalStorageProvider from './components/Provider/LocalStorageProvider'
import Compliance from './components/Partner/Compliance/Compliance'
// import ComplianceTab from "./components/AdminTabcontent/ComplianceTab";
import ComplainceTab from './components/Partner/Compliances/ComplianceTab'
import AllCountry from './components/AllCountry/AllCountry'
import { ROUTES } from './constants/paths'
const PaymentInfo = React.lazy(
  () => import('./components/PartnerOnboardReady/Payment/PaymentInfo')
)
const Payout = React.lazy(
  () => import('./components/PartnerOnboardReady/Payout/Payout')
)
const ViewTransaction = React.lazy(
  () =>
    import('./components/PartnerOnboardReady/ViewTransaction/ViewTransaction')
)
const UserInformation = React.lazy(
  () =>
    import('./components/PartnerOnboardReady/UserInformation/UserInformation')
)
const Profile = React.lazy(() => import('./components/Account/Profile/Profile'))
const Layout = React.lazy(() => import('./Layout/Layout'))
const AdminTab = React.lazy(
  () => import('./components/AdminTabcontent/AdminTab')
)
const InstrailsFees = React.lazy(
  () => import('./components/AdminTabcontent/InstrailsFees')
)
const PartnerTable = React.lazy(
  () => import('./components/Partner/PartnerTable/PartnerTable')
)
const UserManagement = React.lazy(
  () => import('./components/Users/UserManagement')
)
const Details = React.lazy(() => import('./Layout/Details'))
const Login = React.lazy(() => import('./components/Account/Login/Login'))
const Payment = React.lazy(() => import('./Layout/Payment'))
const Paymentsettingread = React.lazy(
  () => import('./components/Partner/PaymentReadonly/Paymentsettingread')
)
const Dashboard = React.lazy(() => import('./Layout/Dashboard'))
const CountyManagement = React.lazy(
  () => import('./components/CountryMaster/CountyManagement')
)
const AgentManagement = React.lazy(
  () => import('./components/AgentMaster/AgentManagement')
)

export default function App() {
  return (
    <BrowserRouter>
      <LocalStorageProvider>
        <AutoUpdateToken />
        <Routes>
          <Route
            path={ROUTES.ROOT}
            element={
              <Suspense>
                <Login />
              </Suspense>
            }
          />
          <Route path={ROUTES.LOGIN} element={<Navigate to={ROUTES.ROOT} />} />

          <Route path={ROUTES.ADMIN.ROOT} element={<Layout />}>
            <Route index element={<Details />} />
            <Route
              path={ROUTES.ADMIN.PARTNER_DETAILS}
              element={
                <Suspense>
                  <Details />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.PARTNER_PAYMENT}
              element={
                <Suspense>
                  <Payment />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.USER_MANAGEMENT}
              element={
                <Suspense>
                  <UserManagement />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.COUNTY_MASTER}
              element={
                <Suspense>
                  <CountyManagement />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.AGENT_MASTER}
              element={
                <Suspense>
                  <AgentManagement />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.ALL_COUNTRY}
              element={
                <Suspense>
                  <AllCountry />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.COMPLIANCE}
              element={
                <Suspense>
                  <ComplainceTab />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.DASHBOARD}
              element={
                <Suspense>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.PARTNER}
              element={
                <Suspense>
                  <PartnerTable />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.PARTNER_ADMIN}
              element={
                <Suspense>
                  <AdminTab />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.PARTNER_ADMIN_FEES}
              element={
                <Suspense>
                  <InstrailsFees />
                </Suspense>
              }
            />
            <Route
              path={ROUTES.ADMIN.PARTNER_ADMIN_USERINFO}
              element={
                <Suspense>
                  <UserInformation />
                </Suspense>
              }
            />
          </Route>

          <Route
            path='*'
            element={
              <Suspense>
                <PageNotFound />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.PAYMENT_INFO}
            element={
              <Suspense>
                <PaymentInfo />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.PAYOUT}
            element={
              <Suspense>
                <Payout />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.VIEW_TRANSACTION}
            element={
              <Suspense>
                <ViewTransaction />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <Suspense>
                <Profile />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.TRANSACTION_DETAILS}
            element={
              <Suspense>
                <TransactionsPaymentDetails />
              </Suspense>
            }
          />
          <Route
            path={ROUTES.SANCTIONS_PROGRAM}
            element={
              <Suspense>
                <SanctionsProgram />
              </Suspense>
            }
          />
        </Routes>
      </LocalStorageProvider>
    </BrowserRouter>
  )
}

function PageNotFound() {
  return (
    <div>
      <h2>404 Page not found</h2>
    </div>
  )
}
