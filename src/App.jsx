import { Routes, Route } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/homepage"
import SignUp from "./pages/signup"
import DashBoard from "./pages/dashboard"
import Verification from "./pages/verification"
import ForgotPassword from "./pages/forgotPassword"
import ResetPassword from "./pages/resetPassword"

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </div>
    </>
  )
}

export default App
