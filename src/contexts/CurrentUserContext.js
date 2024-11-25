import { useState, useEffect, createContext, useContext, useMemo } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useLoggedinUser = () => useContext(CurrentUserContext);
export const useSetLoggedinUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const [loggedinUser, setLoggedinUser] = useState(null);

  const history = useHistory();

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("dj-rest-auth/user/");
      setLoggedinUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        try {
          await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
          setLoggedinUser((prevUser) => {
            if (prevUser) {
              history.push("/signin");
            }
            return null;
          });
          return config;
        }
        return config;
      },
      (err) => {
        return Promise.rejsct(err);
      }
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.respnse?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setLoggedinUser((prevUser) => {
              if (prevUser) {
                history.push("signin");
              }
              return null;
            });
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      }
    );
  }, [history]);

  return (
    <CurrentUserContext.Provider value={loggedinUser}>
      <SetCurrentUserContext.Provider value={setLoggedinUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
