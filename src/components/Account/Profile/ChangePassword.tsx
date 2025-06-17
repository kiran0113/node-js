import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import { Logout } from "../../../utils/AccountUtils";
import { ProgressSpinner } from "primereact/progressspinner";
import { ChangePasswordService } from "../../../services/Account/ChangePasswordService";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";



const ChangePassword: React.FC<any> = () => {

    const navigate = useNavigate();

    const toast = useRef<Toast>(null);

    const [loading, setLoading] = useState(false);

    const [buttonloading, setButtonLoading] = useState(false);

    const id = sessionStorage.getItem("PartnerId");

    const [partnerid, setpartnerId] = React.useState(id);

    const [newPasswordErrorMessage, setNewPasswordErrorMessage] = useState("");

    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");
    const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] = useState("");
    const [passwordType, setPasswordType] = useState("password");

    const [confirmpasswordType, setConfirmPasswordType] = useState("password");

    const [checkchangepassword, setCheckChangePassword] = useState(false);
    const [currentpasswordType, setCurrentPasswordType] = useState("password");
    const [changePasswordModel, setChangePasswordModel] = React.useState({
        id: 0,
        partnerId: Number(partnerid),
        newPassword: "",
        confirmPassword: "",
        currentPassword: "",
        userName: JSON.parse(sessionStorage.getItem("User"))?.username
    });



    //Set model Empty set
    const setModelEmpty = () => {
        setChangePasswordModel({
            id: 0,
            partnerId: Number(partnerid),
            newPassword: "",
            confirmPassword: "",
            currentPassword: "",
            userName: JSON.parse(sessionStorage.getItem("User"))?.username,
        });
    };

    //error message model   
    const ErrorMessageEmptyModel = () => {
        setNewPasswordErrorMessage("");
        setConfirmPasswordErrorMessage("");
        setCurrentPasswordErrorMessage("");
    };

    //check null values  
    const CheckNull = (value: any) => {
        if (value === "" || value === undefined || value === null) {
            return true;
        }
        return false;
    };

    //toggle password 
    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    //toggle confirm password
    const toggleConfirmPassword = () => {
        if (confirmpasswordType === "password") {
            setConfirmPasswordType("text");
            return;
        }
        setConfirmPasswordType("password");
    };
    const toggleCurrentPassword = () => {
        if (currentpasswordType === "password") {
            setCurrentPasswordType("text");
            return;
        }
        setCurrentPasswordType("password");
    };

    //validate 
    const isValidate = (values: any) => {
        let formIsValid = true;
        ErrorMessageEmptyModel();
        if (CheckNull(values.currentPassword)) {
            setCurrentPasswordErrorMessage("Please enter current password.");
            formIsValid = false;
        }

        if (!CheckNull(values.currentPassword)) {
            if (values.currentPassword.trim().length === 0) {
                setCurrentPasswordErrorMessage("Empty password not allowed.");
                formIsValid = false;
            }
        }
        if (CheckNull(values.newPassword)) {
            setNewPasswordErrorMessage("Please enter new password.");
            formIsValid = false;
        }

        if (!CheckNull(values.newPassword)) {
            if (values.newPassword.trim().length === 0) {
                setNewPasswordErrorMessage("Empty password not allowed.");
                formIsValid = false;
            }
            const regix = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            if (regix.test(values.newPassword) === false) {
                setNewPasswordErrorMessage("Please enter a valid password minimum length 8 characters, 1 special character, 1 capital letter, 1 lower case letter, and 1 number");
                formIsValid = false;
            }
        }
        if (CheckNull(values.confirmPassword)) {
            setConfirmPasswordErrorMessage("Please enter confirm password.");
            formIsValid = false;
        }
        if (!CheckNull(values.confirmPassword)) {
            if (values.confirmPassword.trim().length === 0) {
                setConfirmPasswordErrorMessage("Empty password not allowed.");
                formIsValid = false;
            }
            if (values.newPassword !== values.confirmPassword) {
                setConfirmPasswordErrorMessage("Confirm password does not match");
                formIsValid = false;
            }
        }

        return formIsValid;
    };

    //handle submit   
    const handleSubmit = (event: React.FormEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setButtonLoading(true);
        if (isValidate(changePasswordModel)) {
            ChangePasswordService.changePassword(changePasswordModel)
                .then((data) => {
                    toast.current?.show({
                        severity: "success",
                        summary: "Password change successfully!",
                        life: 3000,
                    });
                    setButtonLoading(false);
                    navigate("/");
                })
                .catch((error) => {
                    if (error.response.status === 401) {
                        toast.current?.show({
                            severity: "error",
                            summary: "Unauthorized",
                            life: 3000,
                        });
                        Logout(navigate);
                    } else if (error.response.status === 400) {
                        setCurrentPasswordErrorMessage(error.response.data)
                    } else if (error.response.status === 409) {        
                        setNewPasswordErrorMessage(error.response.data)
                    } else {
                        toast.current?.show({
                            severity: "error",
                            summary: "These are returned when an internal server error occurs. Check dev portal for any maintenance in progress or reach out to techsupport@instarails.io",
                            life: 3000,
                        });
                    }
                    setButtonLoading(false);
                });
        } else {
            setButtonLoading(false);
        }
    };

    //handle submit check
    const handleClose = () => {
        setModelEmpty();
        ErrorMessageEmptyModel();
        setCheckChangePassword(false);
    };

    //update change password   
    const UpdateChangePassword = () => {
        setCheckChangePassword(true);
    };

    //use effect call
    useEffect(() => {
        const useroobj: any = sessionStorage.getItem("User");
        if (useroobj === null || useroobj === undefined) {
            Logout(navigate);
        } else {
            changePasswordModel.userName = JSON.parse(useroobj)?.username;
        }

    }, []);

    return (
        <>
            <div className="container-fluid acc-screen info-section contact-info personal-details Amount-details">
                <Toast ref={toast}></Toast>
                {loading ? (
                    <div className="spinner-class">
                        <ProgressSpinner />
                    </div>
                ) : (
                    <>
                        {checkchangepassword === false ? (
                            <>
                                <div className="row account-details">
                                    <div className="col-md-6 form-group ">
                                        <span>User Name</span>
                                        <input
                                            disabled
                                            readOnly
                                            className="form-control "
                                            type="text"
                                            name="legalFirstName"
                                            placeholder="Enter username"
                                            value={changePasswordModel.userName}
                                            id="legalFirstName"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group "></div>
                                </div>
                                <div className="row account-details">
                                    <div className="col-md-6 form-group ">
                                        <span>Password</span>
                                        <div className="password-input-icon">
                                            <input
                                                readOnly
                                                className="form-control "
                                                type="password"
                                                name="legalFirstName"
                                                placeholder="Enter password"
                                                value={"********"}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="button-section">
                                    <div className="bottom-btns">
                                        <Button
                                            label="Change Password"
                                            className="btn btn-continue second-btn"
                                            loading={buttonloading}
                                            onClick={UpdateChangePassword}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="row account-details">
                                    <div className="col-md-6 form-group ">
                                        <span>
                                            User Name <span className="color-red">*</span>
                                        </span>
                                        <input
                                            disabled
                                            readOnly
                                            className="form-control "
                                            type="text"
                                            name="legalFirstName"
                                            placeholder="Enter username"
                                            value={changePasswordModel.userName}
                                            id="legalFirstName"
                                        />
                                    </div>
                                    <div className="col-md-6 form-group ">
                                        <span>
                                            Current Password <span className="color-red">*</span>
                                        </span>
                                        <div className="password-input-icon">
                                            <input
                                                className="form-control "
                                                type={currentpasswordType}
                                                name="legalFirstName"
                                                placeholder="Enter current password"
                                                value={changePasswordModel.currentPassword}
                                                onChange={(e) =>
                                                    setChangePasswordModel({
                                                        ...changePasswordModel,
                                                        currentPassword: e.target.value,
                                                    })
                                                }
                                                autoComplete="new-password"
                                            />
                                            <span className="eyeicon">
                                                {currentpasswordType === "password" ? (
                                                    <i
                                                        className="pi pi-eye-slash"
                                                        onClick={toggleCurrentPassword}
                                                    ></i>
                                                ) : (
                                                    <i className="pi pi-eye" onClick={toggleCurrentPassword}></i>
                                                )}
                                            </span>
                                            {currentPasswordErrorMessage !== null &&
                                                currentPasswordErrorMessage.length > 0 ? (
                                                <span className="login-error-msg">
                                                    {currentPasswordErrorMessage}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="row account-details">
                                    <div className="col-md-6 form-group ">
                                        <span>
                                            New Password <span className="color-red">*</span>
                                        </span>
                                        <div className="password-input-icon">
                                            <input
                                                className="form-control "
                                                type={passwordType}
                                                name="legalFirstName"
                                                placeholder="Enter new password"
                                                value={changePasswordModel.newPassword}
                                                onChange={(e) =>
                                                    setChangePasswordModel({
                                                        ...changePasswordModel,
                                                        newPassword: e.target.value,
                                                    })
                                                }
                                                autoComplete="new-password"
                                            />
                                            <span className="eyeicon">
                                                {passwordType === "password" ? (
                                                    <i
                                                        className="pi pi-eye-slash"
                                                        onClick={togglePassword}
                                                    ></i>
                                                ) : (
                                                    <i className="pi pi-eye" onClick={togglePassword}></i>
                                                )}
                                            </span>
                                            {newPasswordErrorMessage !== null &&
                                                newPasswordErrorMessage.length > 0 ? (
                                                <span className="login-error-msg">
                                                    {newPasswordErrorMessage}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                    <div className="col-md-6 form-group ">
                                        <span>
                                            Confirm Password<span className="color-red">*</span>
                                        </span>
                                        <div className="password-input-icon">
                                            <input
                                                className="form-control "
                                                type={confirmpasswordType}
                                                placeholder="Enter confirm password"
                                                name="legalMiddleName"
                                                value={changePasswordModel.confirmPassword}
                                                onChange={(e) =>
                                                    setChangePasswordModel({
                                                        ...changePasswordModel,
                                                        confirmPassword: e.target.value,
                                                    })
                                                }
                                                autoComplete="new-password"
                                            />
                                            <span className="eyeicon">
                                                {confirmpasswordType === "password" ? (
                                                    <i
                                                        className="pi pi-eye-slash"
                                                        onClick={toggleConfirmPassword}
                                                    ></i>
                                                ) : (
                                                    <i
                                                        className="pi pi-eye"
                                                        onClick={toggleConfirmPassword}
                                                    ></i>
                                                )}
                                            </span>
                                            {confirmPasswordErrorMessage !== null &&
                                                confirmPasswordErrorMessage.length > 0 ? (
                                                <span className="login-error-msg">
                                                    {confirmPasswordErrorMessage}
                                                </span>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="button-section">
                                    <div className="bottom-btns">
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="btn btn-cancel second-btn"
                                        >
                                            Cancel
                                        </button>

                                        <Button
                                            label="Save"
                                            className="btn btn-continue second-btn"
                                            loading={buttonloading}
                                            onClick={handleSubmit}
                                        />
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    );
};
export default ChangePassword;
