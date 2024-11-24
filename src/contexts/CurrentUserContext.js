import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useLoggedinUser = () => useContext(CurrentUserContext);
export const useSetLoggedinUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState(null);
  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setLoggedinUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleMount();
  }, []);

  return (
    <CurrentUserContext.Provider value={loggedinUser}>
      <SetCurrentUserContext.Provider value={setLoggedinUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
