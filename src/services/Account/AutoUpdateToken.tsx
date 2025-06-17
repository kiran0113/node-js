import { useState, useEffect, useRef } from "react";
import { LoginService } from "./LoginService";
import { Toast } from "primereact/toast";
import { Logout } from "../../utils/AccountUtils";
import { useNavigate } from "react-router-dom";

const AutoUpdateToken: React.FC = () => {
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivity = () => {
      setLastActivityTime(Date.now());
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        handleActivity();
      }
    };

    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updateToken = () => {
      LoginService.updatetoken()
        .then((response) => {
          sessionStorage.setItem("User", JSON.stringify(response.data));
          sessionStorage.setItem(
            "PartnerId",
            JSON.stringify(response.data.partnerId)
          );
          sessionStorage.setItem(
            "Token",
            JSON.stringify(response.data.jwtToken)
          );
          // sessionStorage.setItem("StepFlag", "1");
          // sessionStorage.setItem("OnboardingStatus", "1");
        })
        .catch((error) => {
          if (error.response.status === 500) {
            toast.current?.show({
              severity: "error",
              summary: "Something went wrong",
              life: 3000,
            });
          } else if (error.response.status === 401) {
            toast.current?.show({
              severity: "error",
              summary: "Unauthorized",
              life: 3000,
            });
            Logout(navigate);
          } else if (error.response.status === 400) {
            toast.current?.show({
              severity: "error",
              summary: error.response.data[0].errorMessage,
              life: 3000,
            });
          } else {
            toast.current?.show({
              severity: "error",
              summary: "Error while getting updated token.",
              life: 3000,
            });
          }
        });
    };

    const thirtyMinutesPassed =
      Date.now() - lastActivityTime >= 2 * 60 * 1000;

    if (thirtyMinutesPassed) {
      updateToken();
    } else {
      const timeout = setTimeout(
        updateToken,
        2* 60 * 1000 - (Date.now() - lastActivityTime)
      );

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [lastActivityTime, navigate]);

  return null;
};

export default AutoUpdateToken;
