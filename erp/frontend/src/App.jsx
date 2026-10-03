import {Routes,Route,Navigate} from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Employees from "./pages/Employees";
import EmployeeForm from "./pages/EmployeeForm";

export default function App() {
  return <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/employees" element={<Employees/>}/>
      <Route path="/employees/new" element={<ProtectedRoute adminOnly><EmployeeForm/></ProtectedRoute>}/>
      <Route path="/employees/:id/edit" element={<ProtectedRoute adminOnly><EmployeeForm/></ProtectedRoute>}/>
    </Route>
    <Route path="/" element={<Navigate to="/dashboard" replace/>}/>
    <Route path="*" element={<Navigate to="/dashboard" replace/>}/>
  </Routes>;
}
