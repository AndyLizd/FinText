import React, { useState } from "react";

import WritePostScreen from "./app/screens/WritePostScreen"; // @ Andy
import SearchScreen from "./app/screens/SearchScreen"; // @ Parth
import RegisterScreen from "./app/screens/RegisterScreen"; // @ Vibha
import LoginScreen from "./app/screens/LoginScreen"; // @ Vibha
import MainScreen from "./app/screens/MainScreen"; // @ Andy

export default function App() {
  const [page, setPage] = useState("login");

  const renderContent = (page) => {
    switch (page) {
      case "search":
        return <SearchScreen setPage={setPage} />;
      case "main":
        return <MainScreen setPage={setPage} />;
      case "login":
        return <LoginScreen setPage={setPage} />;
      case "register":
        return <RegisterScreen setPage={setPage} />;
      default:
        return <MainPost />;
    }
  };

  return <>{renderContent(page)}</>;

  // return <MainScreen />;
  // return <WritePostScreen stock_id="abc123" />;
  // return <LoginScreen />;
  // return <SearchScreen />;
}
