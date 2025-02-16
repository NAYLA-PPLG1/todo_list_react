import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./input.css";

const Register = lazy(() => import("./pages/register"));
const Login = lazy(() => import("./pages/login"));
const LandingPages = lazy(() => import("./pages/LandingPages"));
const Home = lazy(() => import("./pages/Home"));

const Loading = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-[#0b192c]">
        <div className="w-16 h-16 border-4 border-slate-200 border-t-indigo-600 dark:border-gray-800 dark:border-t-slate-500 dark:border-l-slate-500 rounded-full animate-spin"></div>
      </div>
    );
  };
  

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<LandingPages />} />
          <Route path="/load" element={<Loading />} />

          <Route path="/auth">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>

          <Route path="/pages">
            <Route path="home" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
