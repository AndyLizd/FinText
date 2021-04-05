import React, { useState } from "react";

import SearchScreen from "./app/screens/SearchScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import LoginScreen from "./app/screens/LoginScreen";
import MainScreen from "./app/screens/MainScreen";

export default function App() {
  const [page, setPage] = useState("main");

  const renderContent = (page) => {
    switch (page) {
      case "search":
        return <SearchScreen setPage={setPage} />;
      case "main":
        return <MainScreen setPage={setPage} stockId="AAPL" />;
      case "login":
        return <LoginScreen setPage={setPage} />;
      case "register":
        return <RegisterScreen setPage={setPage} />;
      default:
        return <MainPost />;
    }
  };

  return <>{renderContent(page)}</>;
}
