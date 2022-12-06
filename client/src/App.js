import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import About from "./components/About/About.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Developer from "./components/Developer/Developer.jsx";
import axios from "axios";
import constants from "./constants.js";

function App() {
  const [refresh, setRefresh] = useState(false);
  const toggleRefresh = () => setRefresh((p) => !p);
  const [serviceMenu, setServiceMenu] = useState(null);

  useEffect(() => {

    axios
      .get(`${constants.API_URI}/menu`)
      .then((res) => setServiceMenu(res.data))
      .catch(() => toast.error("Error on fetching menu"));
  }, []);

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <BrowserRouter>
        <Navbar serviceMenu={serviceMenu} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/developer" element={<Developer />} />
          <Route
            path="/config/:serviceName/:configType"
            element={
              <Dashboard refresh={toggleRefresh} serviceMenu={serviceMenu} />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
