import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../storage/store";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const jwt = useSelector((s: RootState) => s.user.jwt);
  if (!jwt) {
    return <Navigate to={"/auth/login"} replace />;
  } else {
    return children;
  }
}
