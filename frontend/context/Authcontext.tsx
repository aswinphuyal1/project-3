import {
  createContext,
  useState,
  useEffect,
  useContext,
  Children,
} from "react";

const Authcontext = createContext();
export const Authcontextprovider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setsession] = useState(undefined);
  return (
    <Authcontext.Provider value={{ session }}>{children}</Authcontext.Provider>
  );
};
export const userAuth = () => {
  return useContext(Authcontext);
};
