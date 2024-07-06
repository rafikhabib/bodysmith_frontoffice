export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickName: string;
  birthDate: string;
  role: string;
  email: string;
  password: string;
  token?: string;
  adresse?: string;
  phoneNumber?: number;
  active?: boolean;
  isApproved?: boolean;
}
