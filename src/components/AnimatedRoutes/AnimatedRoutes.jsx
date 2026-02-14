import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Landing from "../Landing/Landing";
import MainAppLayout from "../MainAppLayout/MainAppLayout";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../../Context/AuthContext";
import Layout from "./Layout";

export default function AnimatedRoutes() {
  const { globalUser, isLoading } = useAuth();
  let location = useLocation();

  if (isLoading && location.pathname !== "/") {
    return (
      <div className="app-loader">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {globalUser ? (
          <Route path="/" element={<Navigate to={"/app"} replace />}></Route>
        ) : (
          <Route path="/" element={<Landing />}></Route>
        )}
        <Route path="/app" element={<Layout />}>
          <Route index element={<MainAppLayout />}></Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
