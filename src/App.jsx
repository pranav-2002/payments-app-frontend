import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import SignIn from "./components/signin/SignIn";
import Dashboard from "./components/dashboard/Dashboard";
import Navbar from "./components/navbar/Navbar";
import PrivateRoutes from "./routes/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" exact />
            <Route element={<Dashboard />} path="/dashboard" exact />
          </Route>
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
