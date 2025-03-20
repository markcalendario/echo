import fetchAPI from "@/utils/fetch.js";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function SignedInRoute({ unauthorizedPath, children }) {
  const [isAuth, setIsAuth] = useState(null);

  const fetchAuthentication = async () => {
    const config = { method: "GET", credentials: "include" };
    const response = await fetchAPI("/auth", config);
    setIsAuth(response.isAuthenticated);
  };

  useEffect(() => {
    fetchAuthentication();
  }, []);

  if (isAuth === null) return <p>Authenticating...</p>;
  else if (!isAuth) return <Navigate to={unauthorizedPath} />;
  return children;
}
