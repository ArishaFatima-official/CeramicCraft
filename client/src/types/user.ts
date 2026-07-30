export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: "admin" | "customer";
}

export interface Userpassword {
  currentpassword: number;
  newpassword: string;
}