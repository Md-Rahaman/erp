import React,{useEffect,useState} from "react";
import {BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,ResponsiveContainer} from "recharts";
import api from "../services/api";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const [data,setData]=useState(null);
  const [error,setError]=useState("");

  useEffect(()=>{
    api.get("/dashboard/summary")
      .then(r=>setData(r.data))
      .catch(e=>setError(e.response?.data?.detail||"Unable to load dashboard."));
  },[]);

  if(error) return <div className="page"><div className="error">{error}</div></div>;
  if(!data) return <div className="center">Loading dashboard...</div>;

  return <div className="page">
    <header><h1>Dashboard</h1><p>Employee overview</p></header>
    <div className="stats">
      <StatCard label="Total Employees" value={data.total_employees} hint="All records"/>
      <StatCard label="Active" value={data.active_employees} hint="Currently active"/>
      <StatCard label="Inactive" value={data.inactive_employees} hint="Inactive records"/>
      <StatCard label="Average Salary" value={`₹${data.average_salary.toLocaleString()}`} hint="Average"/>
    </div>
    <div className="card">
      <h2>Employees by Department</h2>
      <ResponsiveContainer width="100%" height={330}>
        <BarChart data={data.departments}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="department"/>
          <YAxis allowDecimals={false}/>
          <Tooltip/>
          <Bar dataKey="count"/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>;
}
