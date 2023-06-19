import "./App.css";
import { useState } from "react";
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import Profile from "./components/profile/Profile";
import { PrimaryBody } from "./components/body-primary/PrimaryBody";
import { SecondaryBody } from "./components/body-secondary/SecondaryBody";
import { Result } from "./components/result/Result";
import Cookies from 'js-cookie';
import DatabaseDisplay from "./components/reported-database/DatabaseDisplay";
import ChangePassword from "./components/change-password/ChangePassword";
import ReportURL from "./components/report-url/ReportURL";
import LoginPage from "./components/login/LoginPage"
import SignUpPage from "./components/signup/SignUpPage";
import DeleteAccountMain from "./components/delete-account/DeleteAccountMain";
import SetPasswordPage from "./components/set-password/SetPassword";
import TypoSquatGenerator from "./components/typosquat-url/TypoSquatGenerator";

function NotFound() {
  // Redirect all unknown paths to /
  return <Navigate to="/" />;
}

function FrontPage() {

  const [showProgress, setProgressVisible] = useState(false);

  // Check the cookies to see if already loggedIn
  const savedEmail = Cookies.get('email');
  const savedPassword = Cookies.get('password');

  return (
    <div>
      <Header LoggedInUser={savedEmail} />
      {showProgress ? <LinearProgress color="error" /> : null}
      <PrimaryBody showProgress={setProgressVisible} />
      <SecondaryBody />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signup/set_password" element={<SetPasswordPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<ReportURL />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/reported_urls" element={<DatabaseDisplay />} />
        <Route path="/typesquat_url_generator" element={<TypoSquatGenerator />} />
        <Route path="/delete_account" element={<DeleteAccountMain />} />
        <Route path="/" element={<FrontPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
