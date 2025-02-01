import AuthContext from "./AuthProvider";
import { useState } from "react";
import { isLoggedIn as isLoggedInHelper } from "@/app/helpers/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInHelper());

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;
