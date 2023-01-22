export interface AuthDTO {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
  encryptedPrivateKey: string;
  publicKey: string;
  csr: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}