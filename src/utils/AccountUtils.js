export const Logindata = (response, navigate) => {
  sessionStorage.setItem("User", JSON.stringify(response.data));
  sessionStorage.setItem("PartnerId", JSON.stringify(response.data.partnerId));

  sessionStorage.setItem("Token", JSON.stringify(response.data.jwtToken));

  sessionStorage.setItem("StepFlag", JSON.stringify(response.data.stepFlag));
   sessionStorage.setItem("PartnerLogo", JSON.stringify(response.data.logoURL));
  sessionStorage.setItem("PartnerLegalName",JSON.stringify(response.data.legalName));
  sessionStorage.setItem("Env",JSON.stringify(response.data.env));
  sessionStorage.setItem("OnboardingStatus", JSON.stringify(response.data.onboardingStatus));

  navigate(`/admin/dashboard`);
};
export const Logout = (navigate) => {
  sessionStorage.clear();
  navigate("/");
};
export const IsValidRoute = (navigate) => {
  const stepFlag = parseInt(sessionStorage.getItem("StepFlag"));
  const onboardingStatus = parseInt(sessionStorage.getItem("OnboardingStatus"));

  if (
    (stepFlag === 1 || stepFlag === 2 || stepFlag === 3 || stepFlag === 4) &&
    onboardingStatus === 1
  ) {
    navigate("/details");
  }
  if (stepFlag === 5 && (onboardingStatus === 2 || onboardingStatus === 5)) {
    navigate("/onboarding");
  }
  if (
    (stepFlag === 5 && onboardingStatus === 4) ||
    ((stepFlag === 6 ||
      stepFlag === 7 ||
      stepFlag === 8 ||
      stepFlag === 9 ||
      stepFlag === 10) &&
      onboardingStatus === 6)
  ) {
    navigate("/payment");
  }
};
