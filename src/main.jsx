import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import CreateNeta from "./components/Admin/CreateNeta.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import UserInfo from "./components/UserInfo.jsx";
import LeaderInfo from "./components/LeaderInfo.jsx";
import OtpVerify from "./components/OtpVerify.jsx";

createRoot(document.getElementById("root")).render(

    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Layout />} > 
            <Route index element={<Home />} />
            <Route path= "/home/:id" element={<LeaderInfo />} />
            <Route path="/home/user/:userId" element={<UserInfo />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/otp-verify" element={<OtpVerify />} />
          <Route path="/createNeta" element={<CreateNeta />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
);
