import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

export default function Register() {
  const {register}=useAuth();
  const navigate=useNavigate();
  const [form,setForm]=useState({name:"",email:"",password:""});
  const [error,setError]=useState("");
  const [loading,setLoading]=useState(false);

  async function submit(e) {
    e.preventDefault(); setError("");
    if(form.name.trim().length<2) return setError("Name must contain at least 2 characters.");
    if(form.password.length<8) return setError("Password must contain at least 8 characters.");
    try {
      setLoading(true);
      await register(form);
      navigate("/login");
    } catch(err) {
      setError(err.response?.data?.detail || "Registration failed.");
    } finally {setLoading(false);}
  }

  return <div className="auth">
    <form className="auth-box" onSubmit={submit}>
      <h1>Create Account</h1>
      {error && <div className="error">{error}</div>}
      <label>Name</label>
      <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <label>Email</label>
      <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <label>Password</label>
      <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button disabled={loading}>{loading?"Creating...":"Register"}</button>
      <span>Already registered? <Link to="/login">Login</Link></span>
    </form>
  </div>;
}
