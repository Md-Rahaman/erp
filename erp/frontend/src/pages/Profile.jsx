import React,{useEffect,useState} from "react";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";

export default function Profile() {
  const {user}=useAuth();
  const [form,setForm]=useState({name:"",email:""});
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");

  useEffect(()=>{
    api.get("/users/me").then(r=>setForm({name:r.data.name,email:r.data.email}));
  },[]);

  async function save(e) {
    e.preventDefault(); setError(""); setMessage("");
    try { await api.put("/users/me",form); setMessage("Profile updated."); }
    catch(err) { setError(err.response?.data?.detail||"Update failed."); }
  }

  return <div className="page narrow">
    <header><h1>Profile</h1><p>Manage your account</p></header>
    <form className="card form" onSubmit={save}>
      {message&&<div className="success">{message}</div>}
      {error&&<div className="error">{error}</div>}
      <label>Name</label>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <label>Email</label>
      <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <label>Role</label>
      <input value={user?.role||""} disabled/>
      <button>Save Changes</button>
    </form>
  </div>;
}
