import React, { useState } from "react";

import WritePostScreen from "./app/screens/WritePostScreen"; // @ Andy
import SearchScreen from "./app/screens/SearchScreen"; // @ Parth
import RegisterScreen from "./app/screens/RegisterScreen"; // @ Vibha
import LoginScreen from "./app/screens/LoginScreen"; // @ Vibha

export default function App() {
  return <WritePostScreen stock_id="abc123" />;
  // return <LoginScreen />;
  // return <SearchScreen />;
}
