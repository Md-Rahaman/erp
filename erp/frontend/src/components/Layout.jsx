import {NavLink, Outlet} from "react-router-dom";
import {useAuth} from "../context/AuthContext";
import React from "react"

export default function Layout() {
  const {user, logout} = useAuth();
  return (
    <div className="shell">
      <aside className="sidebar">
        <h2>Manage</h2>
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/employees">Employees</NavLink>
          <NavLink to="/profile">Profile</NavLink>
        </nav>
        <div className="side-user">
          <b>{user?.name}</b>
          <span>{user?.role}</span>
          <button onClick={logout}>Logout</button>
        </div>
      </aside>
      <main className="main"><Outlet /></main>
    </div>
  );
}
