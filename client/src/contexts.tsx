import { createContext, Dispatch, SetStateAction } from "react";

const SessionContext = createContext<any | null>(null);
const SessionDispatchContext = createContext<Dispatch<
  SetStateAction<any>
> | null>(null);

export { SessionContext, SessionDispatchContext };
