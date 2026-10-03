import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function Login() {
  const {login}=useAuth();
  const navigate=useNavigate();
  const [form,setForm]=useState({email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e) {
    e.preventDefault(); setError("");
    if(!form.email || !form.password) return setError("Email and password are required.");
    try {
      setLoading(true);
      await login(form.email,form.password);
      navigate("/dashboard");
    } catch(err) {
      setError(err.response?.data?.detail || "Login failed.");
    } finally {setLoading(false);}
  }

  return <div className="auth">
    <form className="auth-box" onSubmit={submit}>
      <h1>Login</h1>
      <p>Employee Management System</p>
      {error && <div className="error">{error}</div>}
      <label>Email</label>
      <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <label>Password</label>
      <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button disabled={loading}>{loading?"Signing in...":"Login"}</button>
      <span>New user? <Link to="/register">Register</Link></span>
    </form>
  </div>;
}
