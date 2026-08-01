export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "admin" | "customer";
}

export interface UpdateProfileData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface Userpassword {
  currentPassword: string;
  newPassword: string;
}