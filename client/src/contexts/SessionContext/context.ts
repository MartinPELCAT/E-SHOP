import { createContext } from "react";
import { User } from "../../models/User";

interface ISessionContext {
  user: User | null;
}

export const SessionContext = createContext<ISessionContext>({
  user: { displayName: "Martin PELCAT" },
});
