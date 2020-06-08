import { createContext } from "react";
import { User } from "../../models/User";

interface ISessionContext {
  user: User | null;
  login(): void;
  logout(): void;
}

export const SessionContext = createContext<ISessionContext>({
  user: { displayName: "Martin PELCAT" },
  login: () => {},
  logout: () => {},
});
