export const ROUTES = {
  ROOT: '/',
  LOGIN: '/login',
  ADMIN: {
    ROOT: '/admin',
    USER_MANAGEMENT: '/admin/usermanagement',
    COUNTY_MASTER: '/admin/countymaster',
    AGENT_MASTER: '/admin/agentmaster',
    ALL_COUNTRY: '/admin/allcountry',
    COMPLIANCE: '/admin/compliance',
    PARTNER: '/admin/partner',
    PARTNER_DETAILS: ':partnerdetails/:partnerid/:type',
    PARTNER_PAYMENT: ':partnerdetails/payment/:partnerid/:type',
    PARTNER_ADMIN: ':partner/admin/:partnerid',
    PARTNER_ADMIN_FEES: ':partner/admin/fees',
    PARTNER_ADMIN_USERINFO: ':partner/admin/userinfo',
    DASHBOARD: ':dashboard',
  },
  PAYMENT_INFO: '/paymentinfo',
  PAYOUT: '/payout',
  VIEW_TRANSACTION: '/viewtransaction',
  PROFILE: '/profile',
  TRANSACTION_DETAILS: '/transaction-details/:paymentId',
  SANCTIONS_PROGRAM: '/sanctionsprogram',
}
