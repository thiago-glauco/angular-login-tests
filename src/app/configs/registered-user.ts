//interface para criar o documento inicial do usuário logado
export interface RegisteredUser {
  fbUserid: string;
  email: string;
  name: string;
  verified: boolean;
}