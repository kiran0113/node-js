/* eslint-disable */
/**
 * Password validator for login pages
 */
//import value from "assets/scss/_themes-vars.module.scss";
import moment from "moment";
// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) =>
  new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);
export const validTimeInSeconds = new RegExp(/^(?!0*(\.0+)?$)(\d+|\d*\.\d+)$/);
// set color based on password strength
export const strengthColor = (count) => {
  if (count < 2) return { label: "Poor", color: value.errorMain };
  if (count < 3) return { label: "Weak", color: value.warningDark };
  if (count < 4) return { label: "Normal", color: value.orangeMain };
  if (count < 5) return { label: "Good", color: value.successMain };
  if (count < 6) return { label: "Strong", color: value.successDark };
  return { label: "Poor", color: value.errorMain };
};
// prettier-ignore
export const validEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
export const validpostalcode = new RegExp("^[A-Za-z0-9-s]*$");

export const validContact = new RegExp("^\\+(?:[0-9]●?){6,14}[0-9]$");

export const validAlphabetNumber = new RegExp("^[0-9A-Za-z\\s-]*$");
export const validAlphabetOnly = new RegExp("^[A-Za-z\\s-]*$");
export const validFaxNumber = new RegExp("^\\+?[0-9]*$");
// prettier-ignore
export const validfees=new RegExp('^[0-9]{1,18}\.[0-9]{1,18}$');
// prettier-ignore
export const validWebsite = new RegExp(
    /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
); // validate fragment locator

export const checkEIN = (number) => {
  return new RegExp(/^[1-9]\d?-\d{7}$/).test(number);
};
export const checkITIN = (number) => {
  // return new RegExp(
  //   /(9\d{2})([ \-]?)(5\d|6[0-5]|8[0-8]|9[0-2,4-9])([ \-]?)(\d{4})/
  // ).test(number);
  return new RegExp(
    /^9\d{2}-\d{2}-\d{4}$/
  ).test(number);  
};
export const checkSSN = (number) => {
  return new RegExp(/^\d{3}-\d{2}-\d{4}$/).test(number);
};

export const checkLEI = (number) => {
  return new RegExp(/^[A-Z0-9]{18}[0-9]{2}$/).test(number);
};
export const checkGIIN = (number) => {
  return new RegExp(
    /^([A-N,P-Z,0-9]){6}\.([A-N,P-Z,0-9]){5}\.(LE|SL|ME|BR|SP)\.[0-9]{3}$/
  ).test(number);
};
export const checkTIN = (number) => {
  return new RegExp(/^(?![-])(?!.*[-]$)(?!.*[-]{2})[0-9-]+$/).test(number);
};

export const checkPhoneno = (number) => {
  return new RegExp(/^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g).test(
    number
  );
};

// password strength indicator
export const strengthIndicator = (number) => {
  let strengths = 0;
  if (number.length > 5) strengths += 1;
  if (number.length > 7) strengths += 1;
  if (hasNumber(number)) strengths += 1;
  if (hasSpecial(number)) strengths += 1;
  if (hasMixed(number)) strengths += 1;
  return strengths;
};

// export const getTabActiveIndex = (partnerPaymentRole, partnerTypes) => {
//   let index = 0;
//   if (partnerPaymentRole === 1 && partnerTypes.includes("B2B")) index = 0;
//   if (partnerPaymentRole === 2 && partnerTypes.includes("B2B")) index = 1;
//   if (partnerPaymentRole === 3 && partnerTypes.includes("B2B")) index = 0;
//   if (partnerPaymentRole === 1 && partnerTypes.includes("B2C")) index = 2;
//   if (partnerPaymentRole === 2 && partnerTypes.includes("B2C")) index = 3;
//   if (partnerPaymentRole === 3 && partnerTypes.includes("B2C")) index = 2;
//   if (partnerPaymentRole === 1 && partnerTypes.includes("C2C")) index = 4;
//   if (partnerPaymentRole === 2 && partnerTypes.includes("C2C")) index = 5;
//   if (partnerPaymentRole === 3 && partnerTypes.includes("C2C")) index = 4;
//   return index;
// };

export const getTabActiveIndex = (partnerPaymentRole, partnerTypes) => {
  let index = 0;
  if (partnerPaymentRole === 1 && partnerTypes.includes("B2B")) {
    index = 0;
  } else if (partnerPaymentRole === 2 && partnerTypes.includes("B2B")) {
    index = 1;
  } else if (partnerPaymentRole === 3 && partnerTypes.includes("B2B")) {
    index = 0;
  } else if (partnerPaymentRole === 1 && partnerTypes.includes("B2C")) {
    index = 0;
  } else if (partnerPaymentRole === 2 && partnerTypes.includes("B2C")) {
    index = 1;
  } else if (partnerPaymentRole === 3 && partnerTypes.includes("B2C")) {
    index = 1;
  } else if (partnerPaymentRole === 1 && partnerTypes.includes("C2C")) {
    index = 0;
  } else if (partnerPaymentRole === 2 && partnerTypes.includes("C2C")) {
    index = 1;
  } else if (partnerPaymentRole === 3 && partnerTypes.includes("C2C"))
    index = 1;
  return index;
};

export const currenciesList = [
  {
    Name: "USD",
  },
  {
    Name: "INR",
  },
  {
    Name: "BRL",
  },
  {
    Name: "CAD",
  },
  {
    Name: "AUD",
  },
  {
    Name: "SGD",
  },
  {
    Name: "JPY",
  },
  {
    Name: "KRW",
  },
  {
    Name: "NZD",
  },
  {
    Name: "MYR",
  },
  {
    Name: "MYR",
  },
  {
    Name: "VND",
  },
  {
    Name: "EGP",
  },
  {
    Name: "IDR",
  },
  {
    Name: "PHP",
  },
  {
    Name: "PKR",
  },
  {
    Name: "NPR",
  },
  {
    Name: "BDT",
  },
  {
    Name: "LKR",
  },
  {
    Name: "TRY",
  },
  {
    Name: "AED",
  },
  {
    Name: "KHR",
  },
  {
    Name: "HKD",
  },
  {
    Name: "MNT",
  },
  {
    Name: "CNY",
  },
  {
    Name: "UGX",
  },
  {
    Name: "KWD",
  },
  {
    Name: "OMR",
  },
  {
    Name: "LBP",
  },
 
  
];
currenciesList.sort((a, b) => {
  const nameA = a.Name.toUpperCase();
  const nameB = b.Name.toUpperCase();
  
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
export const instarailsCurrenciesList = [
  {
    Name: "USD",
  },

  
];
export const statusList = [
  { name: "Active", value: true },
  { name: "InActive", value: false },
];
export const countrycodeList = [
  {
    Name: "USA",
  },
  {
    Name: "IND",
  },
  {
    Name: "BRA",
  },
  {
    Name: "GBR",
  },
  {
    Name: "CAD",
  },
];
export const documentList = [
  {
    type: "Certificate of Incorporation",
  },
  {
    type: "Shareholder registry",
  },
  {
    type: "Government-issued ID",
  },
  {
    type: "Certificate of Incumbency",
  },
  {
    type: "Excerpts from the Register ",
  },
  {
    type: "List of directors or board members",
  },
  {
    type: "Certificate of Good Standing",
  },
  
];
export const brazildocumentList = [
  {
    type: "Certificate of Incorporation",
  },
  {
    type: "Shareholder registry",
  },
  {
    type: "Government-issued ID",
  },
  {
    type: "Certificate of Incumbency",
  },
  {
    type: "Excerpts from the Register ",
  },
  {
    type: "List of directors or board members",
  },
  {
    type: "Certificate of Good Standing",
  },
  
];
export const SLATypeList = [
  { name: "Seconds" },
  { name: "Minutes" },
  { name: "Hours" },
  { name: "Days" },
];

export const dateFormat = (date) => moment(date).format("YYYY-MM-DD HH:mm:ss");





export const countryList1 = [
 
  
  { name: "Afghanistan",  },
  { name: "Albania",  },
  { name: "Algeria",  },
  { name: "American Samoa"},
  { name: "Andorra"},
  { name: "Angola" },
  { name: "Anguilla", },
  { name: "Antarctica",},
  { name: "Antigua and Barbuda",  },
  { name: "Argentina",  },
  { name: "Armenia",  },
  { name: "Aruba",  },
  { name: "Australia",  },
  { name: "Austria", code: "AUT" },
  { name: "Azerbaijan", code: "AZE" },
  { name: "Bahamas", code: "BHS" },
  { name: "Bahrain", code: "BHR" },
  { name: "Bangladesh", code: "BGD" },
  { name: "Barbados", code: "BRB" },
  { name: "Belarus", code: "BLR" },
  { name: "Belgium", code: "BEL" },
  { name: "Belize", code: "BLZ" },
  { name: "Benin", code: "BEN" },
  { name: "Bermuda", code: "BMU" },
  { name: "Bhutan", code: "BTN" },
  { name: "Bolivia", code: "BOL" },
  { name: "Bosnia and Herzegovina", code: "BIH" },
  { name: "Botswana", code: "BWA" },
  { name: "Bouvet Island", code: "BVT" },
  { name: "British Indian Ocean Territory", code: "IOT" },
  { name: "Brunei Darussalam", code: "BRN" },
  { name: "Bulgaria", code: "BGR" },
  { name: "Burkina Faso", code: "BFA" },
  { name: "Burundi", code: "BDI" },
  { name: "Brazil ", code: "BRA" },
 
  { name: "Cambodia", code: "KHM" },
  { name: "Cameroon", code: "CMR" },
  { name: "Cape Verde", code: "CPV" },
  { name: "Canada ", code: "CAN" },
  
  { name: "Cayman Islands", code: "CYM" },
  { name: "Central African Republic", code: "CAF" },
  { name: "Chad", code: "TCD" },
  { name: "Chile", code: "CHL" },
  { name: "China", code: "CHN" },
  { name: "Christmas Island", code: "CXR" },
  { name: "Cocos (Keeling) Islands", code: "CCK" },
  { name: "Colombia", code: "COL" },
  { name: "Comoros", code: "COM" },
  { name: "Congo", code: "COG" },
  { name: "Congo, The Democratic Republic of the", code: "COD" },
  { name: "Cook Islands", code: "COK" },
  { name: "Costa Rica", code: "CRI" },
  { name: "Cote D'Ivoire", code: "CIV" },
  { name: "Croatia", code: "HRV" },
  { name: "Cyprus", code: "CYP" },
  { name: "Czech Republic", code: "CZE" },
  { name: "Denmark", code: "DNK" },
  { name: "Djibouti", code: "DJI" },
  { name: "Dominica", code: "DMA" },
  { name: "Dominican Republic", code: "DOM" },
  { name: "Ecuador", code: "ECU" },
  { name: "Egypt", code: "EGY" },
  { name: "El Salvador", code: "SLV" },
  { name: "Equatorial Guinea", code: "GNQ" },
  { name: "Eritrea", code: "ERI" },
  { name: "Estonia", code: "EST" },
  { name: "Ethiopia", code: "ETH" },
  { name: "Falkland Islands (Malvinas)", code: "FLK" },
  { name: "Faroe Islands", code: "FRO" },
  { name: "Fiji", code: "FJI" },
  { name: "Finland", code: "FIN" },
  { name: "France", code: "FRA" },
  { name: "French Guiana", code: "GUF" },
  { name: "French Polynesia", code: "PYF" },
  { name: "French Southern Territories", code: "ATF" },
  { name: "Gabon", code: "GAB" },
  { name: "Gambia", code: "GMB" },
  { name: "Georgia", code: "GEO" },
  { name: "Germany", code: "DEU" },
  { name: "Ghana", code: "GHA" },
  { name: "Gibraltar", code: "GIB" },
  { name: "Greece", code: "GRL" },
  { name: "Greenland", code: "GLP" },
  { name: "Grenada", code: "GRD" },
  { name: "Guadeloupe", code: "GLP" },
  { name: "Guam", code: "GUM" },
  { name: "Guatemala", code: "GTM" },
  { name: "Guernsey", code: "GGY" },
  { name: "Guinea", code: "GIN" },
  { name: "Guinea-Bissau", code: "GNB" },
  { name: "Guyana", code: "GUY" },
  { name: "Haiti", code: "HTI" },
  { name: "Heard Island and Mcdonald Islands", code: "HMD" },
  { name: "Holy See (Vatican City State)", code: "VAT" },
  { name: "Honduras", code: "HND" },
  { name: "Hong Kong", code: "HKG" },
  { name: "Hungary", code: "HUN" },
  { name: "Iceland", code: "ISL" },
  { name: "Indonesia", code: "IDN" },
  { name: "India ", code: "IND" },
  { name: "Iraq", code: "IRQ" },
  { name: "Ireland", code: "IRL" },
  { name: "Isle of Man", code: "IMN" },
  { name: "Israel", code: "ISR" },
  { name: "Italy", code: "ITA" },
  { name: "Jamaica", code: "JAM" },
  { name: "Japan", code: "JPN" },
  { name: "Jersey", code: "JEY" },
  { name: "Jordan", code: "JOR" },
  { name: "Kazakhstan", code: "KAZ" },
  { name: "Kenya", code: "KEN" },
  { name: "Kiribati", code: "KIR" },
  { name: "Korea, Democratic People'S Republic of", code: "PRK" },
  { name: "Korea, Republic of", code: "KOR" },
  { name: "Kuwait", code: "KWT" },
  { name: "Kyrgyzstan", code: "KGZ" },
  { name: "Lao People'S Democratic Republic", code: "LAO" },
  { name: "Latvia", code: "LVA" },
  { name: "Lebanon", code: "LBN" },
  { name: "Lesotho", code: "LSO" },
  { name: "Liberia", code: "LBR" },
  { name: "Libyan Arab Jamahiriya", code: "LBY" },
  { name: "Liechtenstein", code: "LIE" },
  { name: "Lithuania", code: "LTU" },
  { name: "Luxembourg", code: "LUX" },
  { name: "Macao", code: "MAC" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MKD" },
  { name: "Madagascar", code: "MDG" },
  { name: "Malawi", code: "MWI" },
  { name: "Malaysia", code: "MYS" },
  { name: "Maldives", code: "MDV" },
  { name: "Mali", code: "MLI" },
  { name: "Malta", code: "MLT" },
  { name: "Marshall Islands", code: "MHL" },
  { name: "Martinique", code: "MTQ" },
  { name: "Mauritania", code: "MRT" },
  { name: "Mauritius", code: "MUS" },
  { name: "Mayotte", code: "MYT" },
  { name: "Mexico", code: "MEX" },
  { name: "Micronesia, Federated States of", code: "FSM" },
  { name: "Moldova, Republic of", code: "MDA" },
  { name: "Monaco", code: "MCO" },
  { name: "Mongolia", code: "MNG" },
  { name: "Montserrat", code: "MSR" },
  { name: "Morocco", code: "MAR" },
  { name: "Mozambique", code: "MOZ" },
  { name: "Myanmar", code: "MMR" },
  { name: "Namibia", code: "NAM" },
  { name: "Nauru", code: "NRU" },
  { name: "Nepal", code: "NPL" },
  { name: "Netherlands", code: "NLD" },
  { name: "Netherlands Antilles", code: "ANT" },
  { name: "New Caledonia",  },
  { name: "New Zealand",  },
  { name: "Nicaragua",  },
  { name: "Niger", },
  { name: "Nigeria",  },
  { name: "Niue", },
  { name: "Norfolk Island", },
  { name: "Northern Mariana Islands", },
  { name: "Norway",  },
  { name: "Oman",  },
  { name: "Pakistan",  },
  { name: "Palau" },
  { name: "Palestinian Territory, Occupied"},
  { name: "Panama", code: "PAN" },
  { name: "Papua New Guinea"},
  { name: "Paraguay" },
  { name: "Peru" },
  { name: "Philippines", },
  { name: "Pitcairn",  },
  { name: "Poland",  },
  { name: "Portugal", },
  { name: "Puerto Rico",  },
  { name: "Qatar",},
  { name: "Reunion",  },
  { name: "Romania",  },
  { name: "Russian Federation",  },
  { name: "RWANDA",  },
  { name: "Saint Helena", },
  { name: "Saint Kitts and Nevis" },
  { name: "Saint Lucia" },
  { name: "Saint Pierre and Miquelon"},
  { name: "Saint Vincent and the Grenadines" },

  { name: "San Marino" },
  { name: "Sao Tome and Principe" },
  { name: "Saudi Arabia" },
  { name: "Senegal"},
  { name: "Serbia and Montenegro" },
  { name: "Seychelles" },
  { name: "Sierra Leone" },
  { name: "Singapore" },
  { name: "Slovakia"},
  { name: "Slovenia"},
  { name: "Solomon Islands" },
  { name: "Somalia"},
  { name: "South Africa" },
  { name: "South Georgia and the South Sandwich Islands"},
  { name: "Spain"},
  { name: "Sri Lanka"},
  { name: "Sudan" },
  { name: "Suriname" },
  { name: "Svalbard and Jan Mayen" },
  { name: "Swaziland" },
  { name: "Sweden" },
  { name: "Switzerland"},
 
  { name: "Taiwan, Province of China" },
  { name: "Tajikistan" },
  { name: "Tanzania, United Republic of" },
  { name: "Thailand" },
  { name: "Timor-Leste"},
  { name: "Togo"},
  { name: "Tokelau"},
  { name: "Tonga" },
  { name: "Trinidad and Tobago"},
  { name: "Tunisia" },
  { name: "Turkey"},
  { name: "Turkmenistan" },
  { name: "Turks and Caicos Islands" },
  { name: "Tuvalu" },
  { name: "Uganda"},
  { name: "Ukraine" },
  { name: "United States " },
  { name: "United Arab Emirates"},
  { name: "United Kingdom" },
  { name: "United States Minor Outlying Islands" },
  { name: "Uruguay" },
  { name: "Uzbekistan"},
  { name: "Vanuatu" },
  { name: "Venezuela" },
  { name: "Viet Nam" },
  { name: "Virgin Islands, British" },
  { name: "Virgin Islands, U.S."},
  { name: "Wallis and Futuna"},
  { name: "Western Sahara" },
  { name: "Yemen" },
  { name: "Zambia" },
  { name: "Zimbabwe"},


//saction co.(block)

  // { name: "Iran, Islamic Republic Of", code: "IRN" },
  // { name: "Cuba", code: "CUB" },
  // { name: "Syrian Arab Republic", code: "SYR" },
  // { name: "Korea, Democratic People'S Republic of", code: "PRK" },

];

export const countryList = [
 
  
  { name: "Afghanistan", code: "AFG" },
  { name: "Albania", code: "ALB" },
  { name: "Algeria", code: "DZA" },
  { name: "American Samoa", code: "ASM" },
  { name: "Andorra", code: "AND" },
  { name: "Angola", code: "AGO" },
  { name: "Anguilla", code: "AIA" },
  { name: "Antarctica", code: "ATA" },
  { name: "Antigua and Barbuda", code: "ATG" },
  { name: "Argentina", code: "ARG" },
  { name: "Armenia", code: "ARM" },
  { name: "Aruba", code: "ABW" },
  { name: "Australia", code: "AUS" },
  { name: "Austria", code: "AUT" },
  { name: "Azerbaijan", code: "AZE" },
  { name: "Bahamas", code: "BHS" },
  { name: "Bahrain", code: "BHR" },
  { name: "Bangladesh", code: "BGD" },
  { name: "Barbados", code: "BRB" },
  { name: "Belarus", code: "BLR" },
  { name: "Belgium", code: "BEL" },
  { name: "Belize", code: "BLZ" },
  { name: "Benin", code: "BEN" },
  { name: "Bermuda", code: "BMU" },
  { name: "Bhutan", code: "BTN" },
  { name: "Bolivia", code: "BOL" },
  { name: "Bosnia and Herzegovina", code: "BIH" },
  { name: "Botswana", code: "BWA" },
  { name: "Bouvet Island", code: "BVT" },
  { name: "British Indian Ocean Territory", code: "IOT" },
  { name: "Brunei Darussalam", code: "BRN" },
  { name: "Bulgaria", code: "BGR" },
  { name: "Burkina Faso", code: "BFA" },
  { name: "Burundi", code: "BDI" },
  { name: "Brazil ", code: "BRA" },
 
  { name: "Cambodia", code: "KHM" },
  { name: "Cameroon", code: "CMR" },
  { name: "Cape Verde", code: "CPV" },
  { name: "Canada ", code: "CAN" },
  
  { name: "Cayman Islands", code: "CYM" },
  { name: "Central African Republic", code: "CAF" },
  { name: "Chad", code: "TCD" },
  { name: "Chile", code: "CHL" },
  { name: "China", code: "CHN" },
  { name: "Christmas Island", code: "CXR" },
  { name: "Cocos (Keeling) Islands", code: "CCK" },
  { name: "Colombia", code: "COL" },
  { name: "Comoros", code: "COM" },
  { name: "Congo", code: "COG" },
  { name: "Congo, The Democratic Republic of the", code: "COD" },
  { name: "Cook Islands", code: "COK" },
  { name: "Costa Rica", code: "CRI" },
  { name: "Cote D'Ivoire", code: "CIV" },
  { name: "Croatia", code: "HRV" },
  { name: "Cyprus", code: "CYP" },
  { name: "Czech Republic", code: "CZE" },
  { name: "Denmark", code: "DNK" },
  { name: "Djibouti", code: "DJI" },
  { name: "Dominica", code: "DMA" },
  { name: "Dominican Republic", code: "DOM" },
  { name: "Ecuador", code: "ECU" },
  { name: "Egypt", code: "EGY" },
  { name: "El Salvador", code: "SLV" },
  { name: "Equatorial Guinea", code: "GNQ" },
  { name: "Eritrea", code: "ERI" },
  { name: "Estonia", code: "EST" },
  { name: "Ethiopia", code: "ETH" },
  { name: "Falkland Islands (Malvinas)", code: "FLK" },
  { name: "Faroe Islands", code: "FRO" },
  { name: "Fiji", code: "FJI" },
  { name: "Finland", code: "FIN" },
  { name: "France", code: "FRA" },
  { name: "French Guiana", code: "GUF" },
  { name: "French Polynesia", code: "PYF" },
  { name: "French Southern Territories", code: "ATF" },
  { name: "Gabon", code: "GAB" },
  { name: "Gambia", code: "GMB" },
  { name: "Georgia", code: "GEO" },
  { name: "Germany", code: "DEU" },
  { name: "Ghana", code: "GHA" },
  { name: "Gibraltar", code: "GIB" },
  { name: "Greece", code: "GRL" },
  { name: "Greenland", code: "GLP" },
  { name: "Grenada", code: "GRD" },
  { name: "Guadeloupe", code: "GLP" },
  { name: "Guam", code: "GUM" },
  { name: "Guatemala", code: "GTM" },
  { name: "Guernsey", code: "GGY" },
  { name: "Guinea", code: "GIN" },
  { name: "Guinea-Bissau", code: "GNB" },
  { name: "Guyana", code: "GUY" },
  { name: "Haiti", code: "HTI" },
  { name: "Heard Island and Mcdonald Islands", code: "HMD" },
  { name: "Holy See (Vatican City State)", code: "VAT" },
  { name: "Honduras", code: "HND" },
  { name: "Hong Kong", code: "HKG" },
  { name: "Hungary", code: "HUN" },
  { name: "Iceland", code: "ISL" },
  { name: "Indonesia", code: "IDN" },
  { name: "India ", code: "IND" },
  { name: "Iraq", code: "IRQ" },
  { name: "Ireland", code: "IRL" },
  { name: "Isle of Man", code: "IMN" },
  { name: "Israel", code: "ISR" },
  { name: "Italy", code: "ITA" },
  { name: "Jamaica", code: "JAM" },
  { name: "Japan", code: "JPN" },
  { name: "Jersey", code: "JEY" },
  { name: "Jordan", code: "JOR" },
  { name: "Kazakhstan", code: "KAZ" },
  { name: "Kenya", code: "KEN" },
  { name: "Kiribati", code: "KIR" },
  { name: "Korea, Democratic People'S Republic of", code: "PRK" },
  { name: "Korea, Republic of", code: "KOR" },
  { name: "Kuwait", code: "KWT" },
  { name: "Kyrgyzstan", code: "KGZ" },
  { name: "Lao People'S Democratic Republic", code: "LAO" },
  { name: "Latvia", code: "LVA" },
  { name: "Lebanon", code: "LBN" },
  { name: "Lesotho", code: "LSO" },
  { name: "Liberia", code: "LBR" },
  { name: "Libyan Arab Jamahiriya", code: "LBY" },
  { name: "Liechtenstein", code: "LIE" },
  { name: "Lithuania", code: "LTU" },
  { name: "Luxembourg", code: "LUX" },
  { name: "Macao", code: "MAC" },
  { name: "Macedonia, The Former Yugoslav Republic of", code: "MKD" },
  { name: "Madagascar", code: "MDG" },
  { name: "Malawi", code: "MWI" },
  { name: "Malaysia", code: "MYS" },
  { name: "Maldives", code: "MDV" },
  { name: "Mali", code: "MLI" },
  { name: "Malta", code: "MLT" },
  { name: "Marshall Islands", code: "MHL" },
  { name: "Martinique", code: "MTQ" },
  { name: "Mauritania", code: "MRT" },
  { name: "Mauritius", code: "MUS" },
  { name: "Mayotte", code: "MYT" },
  { name: "Mexico", code: "MEX" },
  { name: "Micronesia, Federated States of", code: "FSM" },
  { name: "Moldova, Republic of", code: "MDA" },
  { name: "Monaco", code: "MCO" },
  { name: "Mongolia", code: "MNG" },
  { name: "Montserrat", code: "MSR" },
  { name: "Morocco", code: "MAR" },
  { name: "Mozambique", code: "MOZ" },
  { name: "Myanmar", code: "MMR" },
  { name: "Namibia", code: "NAM" },
  { name: "Nauru", code: "NRU" },
  { name: "Nepal", code: "NPL" },
  { name: "Netherlands", code: "NLD" },
  { name: "Netherlands Antilles", code: "ANT" },
  { name: "New Caledonia", code: "NCL" },
  { name: "New Zealand", code: "NZL" },
  { name: "Nicaragua", code: "NIC" },
  { name: "Niger", code: "NER" },
  { name: "Nigeria", code: "NGA" },
  { name: "Niue", code: "NIU" },
  { name: "Norfolk Island", code: "NFK" },
  { name: "Northern Mariana Islands", code: "MNP" },
  { name: "Norway", code: "NOR" },
  { name: "Oman", code: "OMN" },
  { name: "Pakistan", code: "PAK" },
  { name: "Palau", code: "PLW" },
  { name: "Palestinian Territory, Occupied", code: "PSE" },
  { name: "Panama", code: "PAN" },
  { name: "Papua New Guinea", code: "PNG" },
  { name: "Paraguay", code: "PRY" },
  { name: "Peru", code: "PER" },
  { name: "Philippines", code: "PHL" },
  { name: "Pitcairn", code: "PCN" },
  { name: "Poland", code: "POL" },
  { name: "Portugal", code: "PRT" },
  { name: "Puerto Rico", code: "PRI" },
  { name: "Qatar", code: "QAT" },
  { name: "Reunion", code: "REU" },
  { name: "Romania", code: "ROU" },
  { name: "Russian Federation", code: "RUS" },
  { name: "RWANDA", code: "RWA" },
  { name: "Saint Helena", code: "SHN" },
  { name: "Saint Kitts and Nevis", code: "KNA" },
  { name: "Saint Lucia", code: "LCA" },
  { name: "Saint Pierre and Miquelon", code: "SPM" },
  { name: "Saint Vincent and the Grenadines", code: "VCT" },
  { name: "Samoa", code: "WSM" },
  { name: "San Marino", code: "SMR" },
  { name: "Sao Tome and Principe", code: "STP" },
  { name: "Saudi Arabia", code: "SAU" },
  { name: "Senegal", code: "SEN" },
  { name: "Serbia and Montenegro", code: "SCG" },
  { name: "Seychelles", code: "SYC" },
  { name: "Sierra Leone", code: "SLE" },
  { name: "Singapore", code: "SGP" },
  { name: "Slovakia", code: "SVK" },
  { name: "Slovenia", code: "SVN" },
  { name: "Solomon Islands", code: "SLB" },
  { name: "Somalia", code: "SOM" },
  { name: "South Africa", code: "ZAF" },
  { name: "South Georgia and the South Sandwich Islands", code: "SGS" },
  { name: "Spain", code: "ESP" },
  { name: "Sri Lanka", code: "LKA" },
  { name: "Sudan", code: "SDN" },
  { name: "Suriname", code: "SUR" },
  { name: "Svalbard and Jan Mayen", code: "SJM" },
  { name: "Swaziland", code: "SWZ" },
  { name: "Sweden", code: "SWE" },
  { name: "Switzerland", code: "CHE" },
 
  { name: "Taiwan, Province of China", code: "TWN" },
  { name: "Tajikistan", code: "TJK" },
  { name: "Tanzania, United Republic of", code: "TZA" },
  { name: "Thailand", code: "THA" },
  { name: "Timor-Leste", code: "TLS" },
  { name: "Togo", code: "TGO" },
  { name: "Tokelau", code: "TKL" },
  { name: "Tonga", code: "TON" },
  { name: "Trinidad and Tobago", code: "TTO" },
  { name: "Tunisia", code: "TUN" },
  { name: "Turkey", code: "TUR" },
  { name: "Turkmenistan", code: "TKM" },
  { name: "Turks and Caicos Islands", code: "TCA" },
  { name: "Tuvalu", code: "TUV" },
  { name: "Uganda", code: "UGA" },
  { name: "Ukraine", code: "UKR" },
  { name: "United States ", code: "USA" },
  { name: "United Arab Emirates", code: "ARE" },
  { name: "United Kingdom", code: "GBR" },
  { name: "United States Minor Outlying Islands", code: "UMI" },
  { name: "Uruguay", code: "URY" },
  { name: "Uzbekistan", code: "UZB" },
  { name: "Vanuatu", code: "VUT" },
  { name: "Venezuela", code: "VEN" },
  { name: "Viet Nam", code: "VNM" },
  { name: "Virgin Islands, British", code: "VGB" },
  { name: "Virgin Islands, U.S.", code: "VIR" },
  { name: "Wallis and Futuna", code: "WLF" },
  { name: "Western Sahara", code: "ESH" },
  { name: "Yemen", code: "YEM" },
  { name: "Zambia", code: "ZMB" },
  { name: "Zimbabwe", code: "ZWE" },


//saction co.(block)

  // { name: "Iran, Islamic Republic Of", code: "IRN" },
  // { name: "Cuba", code: "CUB" },
  // { name: "Syrian Arab Republic", code: "SYR" },
  // { name: "Korea, Democratic People'S Republic of", code: "PRK" },

];
export const paymenttypeListType = [
  {
    DeliveryName: "BankAccount",
  },
  {
    DeliveryName: "CashPickup",
  },
  {
    DeliveryName: "MobileWallet",
  },
  {
    DeliveryName: "RTP",
  },
  
  
  
];


export const paymenttypeList = [
  {
    Name: "RTP",
  },
  {
    Name: "BankAccount",
  },
  {
    Name: "Card",
  },
  {
    Name: "Mobile App",
  },
  {
    Name: "CashPickup",
  },
];
export const bankaccounttypeList = [
  { Name: "Checking" },
  { Name: "Savings" },
  { Name: "Current/General" },
  { Name: "Army Police Number" },
  { Name: "Business Registration Number" },
  { Name: "Mobile Number" },
  { Name: "NRIC" },
];
export const wallettypeList = [
  { Name: "ApplePay" },
  { Name: "Cash App" },
  { Name: "Google Pay" },
  { Name: "Samsung Pay" },
  { Name: "PayPal" },
  { Name: "Venmo" },
  { Name: "AliPay" },
  { Name: "Walmart Pay" },
  { Name: "Dwolla" },
  { Name: "Vodafone-M-Pesa" },
];

export const currenciesPaymentList = [
  {
    Id: 0,
    Country: "USA",
    Currency: "USD",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"USA",
  },
  {
    Id: 0,
    Country: "IND",
    Currency: "INR",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"IND",
  },
  {
    Id: 0,
    Country: "BRL",
    Currency: "BRL",
    Send: false,
    Receive: false,
    WalletId: null,
  },
  {
    Id: 0,
    Country: "CAN",
    Currency: "CAD",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"CAN",
  },
];

export const defaultCurrenciesPaymentList = [
  {
    Id: 0,
    Country: "USA",
    Currency: "USD",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"USA",
  },
  {
    Id: 0,
    Country: "IND",
    Currency: "INR",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"IND",
  },
  {
    Id: 0,
    Country: "BRL",
    Currency: "BRL",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"BRL",
  },
  {
    Id: 0,
    Country: "CAN",
    Currency: "CAD",
    Send: false,
    Receive: false,
    WalletId: null,
    countryName:"CAN",
  },
];

export const transactionTypeList = [
  { id: 1, name: "$5-$100" },
  { id: 2, name: "$101-$10000" },
  { id: 3, name: "$10001-$100000" },
  { id: 4, name: "$100001-$250000" },
  { id: 5, name: "$250000-$1000000" },
];
export const industryList = [
  { Name: "Accommodation (NAICS 721)" },
  { Name: "Accommodation and Food Services (NAICS 72)" },
  { Name: "Administrative and Support Services (NAICS 561)" },
  {
    Name: "Administrative and Support and Waste Management and Remediation Services (NAICS 56)",
  },
  { Name: "Agriculture, Forestry, Fishing and Hunting (NAICS 11)" },
  { Name: "Air Transportation (NAICS 481)" },
  { Name: "Ambulatory Health Care Services (NAICS 621)" },
  { Name: "Amusement, Gambling, and Recreation Industries (NAICS 713)" },
  { Name: "Animal Production (NAICS 112)" },
  { Name: "Apparel Manufacturing (NAICS 315)" },
  { Name: "Arts, Entertainment, and Recreation (NAICS 71)" },
  { Name: "Beverage and Tobacco Product Manufacturing (NAICS 312)" },
  { Name: "Broadcasting (except Internet)(NAICS 515)" },
  {
    Name: "Building Material and Garden Equipment and Supplies Dealers (NAICS 444)",
  },
  { Name: "Chemical Manufacturing (NAICS 325)" },
  { Name: "Clothing and Clothing Accessories Stores (NAICS 448)" },
  { Name: "Computer and Electronic Product Manufacturing (NAICS 334)" },
  { Name: "Construction (NAICS 23)" },
  { Name: "Construction of Buildings (NAICS 236)" },
  { Name: "Couriers and Messengers (NAICS 492)" },
  { Name: "Credit Intermediation and Related Activities (NAICS 522)" },
  { Name: "Crop Production (NAICS 111)" },
  { Name: "Data Processing, Hosting, and Related Services (NAICS 518)" },
  { Name: "Education and Health Services" },
  { Name: "Educational Services (NAICS 61)" },
  {
    Name: "Electrical Equipment, Appliance, and Component Manufacturing (NAICS 335)",
  },
  { Name: "Electronics and Appliance Stores (NAICS 443)" },
  { Name: "Fabricated Metal Product Manufacturing (NAICS 332)" },
  { Name: "Finance and Insurance (NAICS 52)" },
  { Name: "Financial Activities" },
  { Name: "Fishing, Hunting and Trapping (NAICS 114)" },
  { Name: "Food Manufacturing (NAICS 311)" },
  { Name: "Food Services and Drinking Places (NAICS 722)" },
  { Name: "Food and Beverage Stores (NAICS 445)" },
  { Name: "Forestry and Logging (NAICS 113)" },
  { Name: "Funds, Trusts, and Other Financial Vehicles (NAICS 525)" },
  { Name: "Furniture and Home Furnishings Stores (NAICS 442)" },
  { Name: "Furniture and Related Product Manufacturing (NAICS 337)" },
  { Name: "Gasoline Stations (NAICS 447)" },
  { Name: "General Merchandise Stores (NAICS 452)" },
  { Name: "Goods-Producing Industries" },
  { Name: "Health Care and Social Assistance (NAICS 62)" },
  { Name: "Health and Personal Care Stores (NAICS 446)" },
  { Name: "Heavy and Civil Engineering Construction (NAICS 237)" },
  { Name: "Hospitals (NAICS 622)" },
  { Name: "Information (NAICS 51)" },
  { Name: "Insurance Carriers and Related Activities (NAICS 524)" },
  { Name: "Internet Publishing and Broadcasting (NAICS 516)" },
  { Name: "Leather and Allied Product Manufacturing (NAICS 316)" },
  { Name: "Leisure and Hospitality" },
  {
    Name: "Lessors of Nonfinancial Intangible Assets (except Copyrighted Works) (NAICS 533)",
  },
  { Name: "Machinery Manufacturing (NAICS 333)" },
  { Name: "Management of Companies and Enterprises (NAICS 55)" },
  { Name: "Manufacturing (NAICS 31-33)" },
  { Name: "Merchant Wholesalers, Durable Goods (NAICS 423)" },
  { Name: "Merchant Wholesalers, Nondurable Goods (NAICS 424)" },
  { Name: "Mining (except Oil and Gas) (NAICS 212)" },
  { Name: "Mining, Quarrying, and Oil and Gas Extraction (NAICS 21)" },
  { Name: "Miscellaneous Manufacturing (NAICS 339)" },
  { Name: "Miscellaneous Store Retailers (NAICS 453)" },
  { Name: "Monetary Authorities - Central Bank (NAICS 521)" },
  { Name: "Motion Picture and Sound Recording Industries (NAICS 512)" },
  { Name: "Motor Vehicle and Parts Dealers (NAICS 441)" },
  { Name: "Museums, Historical Sites, and Similar Institutions (NAICS 712)" },
  { Name: "Natural Resources and Mining" },
  { Name: "Nonmetallic Mineral Product Manufacturing (NAICS 327)" },
  { Name: "Nonstore Retailers (NAICS 454)" },
  { Name: "Nursing and Residential Care Facilities (NAICS 623)" },
  { Name: "Oil and Gas Extraction (NAICS 211)" },
  { Name: "Other Information Services (NAICS 519)" },
  { Name: "Other Services (except Public Administration) (NAICS 81)" },
  { Name: "Paper Manufacturing (NAICS 322)" },
  {
    Name: "Performing Arts, Spectator Sports, and Related Industries (NAICS 711)",
  },
  { Name: "Personal and Laundry Services (NAICS 812)" },
  { Name: "Petroleum and Coal Products Manufacturing (NAICS 324)" },
  { Name: "Pipeline Transportation (NAICS 486)" },
  { Name: "Plastics and Rubber Products Manufacturing (NAICS 326)" },
  { Name: "Postal Service (NAICS 491)" },
  { Name: "Primary Metal Manufacturing (NAICS 331)" },
  { Name: "Printing and Related Support Activities (NAICS 323)" },
  { Name: "Private Households (NAICS 814)" },
  { Name: "Professional and Business Services" },
  { Name: "Professional, Scientific, and Technical Services (NAICS 54)" },
  { Name: "Publishing Industries (except Internet) (NAICS 511)" },
  { Name: "Rail Transportation (NAICS 482)" },
  { Name: "Real Estate (NAICS 531)" },
  { Name: "Real Estate and Rental and Leasing (NAICS 53)" },
  {
    Name: "Religious, Grantmaking, Civic, Professional, and Similar Organizations (NAICS 813)",
  },
  { Name: "Rental and Leasing Services (NAICS 532)" },
  { Name: "Repair and Maintenance (NAICS 811)" },
  { Name: "Retail Trade (NAICS 44-45)" },
  { Name: "Scenic and Sightseeing Transportation (NAICS 487)" },
  {
    Name: "Securities, Commodity Contracts, and Other Financial Investments and Related Activities (NAICS 523)",
  },
  { Name: "Service-Providing Industries" },
  { Name: "Social Assistance (NAICS 624)" },
  { Name: "Specialty Trade Contractors (NAICS 238)" },
  { Name: "Sporting Goods, Hobby, Book, and Music Stores (NAICS 451)" },
  { Name: "Support Activities for Agriculture and Forestry (NAICS 115)" },
  { Name: "Support Activities for Mining (NAICS 213)" },
  { Name: "Support Activities for Transportation (NAICS 488)" },
  { Name: "Telecommunications (NAICS 517)" },
  { Name: "Textile Mills (NAICS 313)" },
  { Name: "Textile Product Mills (NAICS 314)" },
  { Name: "Trade, Transportation, and Utilities" },
  { Name: "Transit and Ground Passenger Transportation (NAICS 485)" },
  { Name: "Transportation Equipment Manufacturing (NAICS 336)" },
  { Name: "Transportation and Warehousing (NAICS 48-49)" },
  { Name: "Truck Transportation (NAICS 484)" },
  { Name: "Utilities (NAICS 22)" },
  { Name: "Warehousing and Storage (NAICS 493)" },
  { Name: "Waste Management and Remediation Services (NAICS 562)" },
  { Name: "Water Transportation (NAICS 483)" },
  { Name: "Wholesale Electronic Markets and Agents and Brokers (NAICS 425)" },
  { Name: "Wholesale Trade (NAICS 42)" },
  { Name: "Wood Product Manufacturing (NAICS 321)" },
  { Name: "Other" },
];

export const PartnerTypeList = [
  { name: "Business", id: 1 },
 
  { name: "Consumer", id: 3 },
];
export const PartnerTypeList2 = [
  { name: "Business", id: 1 },
  { name: "Business", id: 2 },
  { name: "Consumer", id: 3 },
];
export const PartnerTypeList1 = [
  { name: "B2B", id: 1 },
  { name: "B2C", id: 2 },
  { name: "C2C", id: 3 },
];
