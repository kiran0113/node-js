export interface ISetPassword {
  setPasswordToken: string | undefined;
  newPassword: string;
  confirmPassword: string;
  isActive: boolean;
  userName: string;
  firstName: string;
  lastName: string;
}
