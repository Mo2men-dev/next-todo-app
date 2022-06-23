import { Auth, User } from "firebase/auth";

export interface AuthContextType {
  currentUser: User;
  signup: (
    auth: Auth,
    email: string,
    password: string,
    displayName: string
  ) => Promise<User>;
  login: (auth: Auth, email: string, password: string) => Promise<User>;
  logout: (auth: Auth) => void;
}
