import React from "react";
import DashboardHome from "./DashboardHome";
import { useScrollToTop } from "../../hooks/useScrollToTop";

const SecretaryDashboard: React.FC = () => {
  // Automatically scroll to top when component mounts
  useScrollToTop();

  return <DashboardHome />;
};

export default SecretaryDashboard;
