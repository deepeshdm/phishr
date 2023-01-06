import "./App.css";
import { useState } from "react";
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter as Router,
} from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "./components/header/Header";
import { Footer } from "./components/footer/Footer";
import { PrimaryBody } from "./components/body-primary/PrimaryBody";
import { SecondaryBody } from "./components/body-secondary/SecondaryBody";
import { Result } from "./components/result/Result";

function NotFound() {
  // Redirect all unknown paths to /
  return <Navigate to="/" />;
}

function FrontPage() {
  const [showProgress, setProgressVisible] = useState(false);

  return (
    <div>
      <Header />
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
        <Route path="/" element={<FrontPage />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
