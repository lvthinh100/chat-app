import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
const authContext = createContext();

export const AuthProvider = function ({ children }) {
  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userLogin) => {
      if (!isLoggedIn && userLogin) {
        console.log(isLoggedIn);
        const { displayName, email, photoURL, uid } = userLogin;
        setUser({ displayName, email, photoURL, uid });
        navigate("/chat");
        return;
      }
    });
    return () => {
      unsubscribe();
    };
  }, [navigate, isLoggedIn]);

  const logoutHandler = async function () {
    await signOut(auth);
    setUser(null);
    navigate("/");
  };

  return (
    <authContext.Provider value={{ user, logout: logoutHandler }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
