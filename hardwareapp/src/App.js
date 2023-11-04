import "./App.css";
import React from "react";
import { useParams } from "react-router-dom";
import { Link, Route, Routes } from "react-router-dom";

import PageNotFound from ".//Pages/PageNotFound";

import Login from ".//Pages/Login";
import Projects from ".//Pages/Projects";

function App() {
  return (
    <div>
      <nav>
        <ul>

        <li>
          <Link to="/">
            Login
          </Link>
          </li>

          <li>
          <Link to="/projects">
            Projects
          </Link>
          </li>


        </ul>
      </nav>

      {/* Defining routes path and rendering components as element */}
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/projects" element={<Projects />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;