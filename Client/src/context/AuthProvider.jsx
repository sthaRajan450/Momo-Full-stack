import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      let response = await fetch(
        "http://localhost:9000/api/users/getSingleUser",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (response.ok) {
        response = await response.json();
        console.log(response);
        setUser(response.data);
        setIsAuth(true);
      } else {
        setUser(null);
        setIsAuth(false);
      }
    } catch (error) {
      console.log(error);
      setUser(null);
      setIsAuth(false);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ setIsAuth, setUser, setIsLoading, isAuth, isLoading, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
