import React from "react";
import { Navigate, useLocation } from "react-router";

const useAuth = () => {
  const checkProfile = localStorage.getItem("dataProfile");
  if (checkProfile) {
    const profile = JSON.parse(checkProfile);
    return profile;
  }
  return null;
};

export const Authorized = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth) return <Navigate to={"/"} state={{ from: location }} replace />;
  return children;
};

export const Authenticated = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth)
    return <Navigate to={"/profile"} state={{ from: location }} replace />;
  return children;
};

export const Guest = ({ children }) => {
  const location = useLocation();
  if (
    location.state === "" &&
    location.state === null &&
    location.state === undefined
  ) {
    return <Navigate to={"/"} state={{ from: location }} replace />;
  }
  return children;
};
