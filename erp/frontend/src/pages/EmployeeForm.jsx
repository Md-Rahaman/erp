import {useEffect,useState} from "react";
import {Link,useNavigate,useParams} from "react-router-dom";
import api from "../services/api";

const initial={name:"",email:"",department:"IT",job_title:"",salary:"",joining_date:"",active:true};

export default function EmployeeForm() {
  const {id}=useParams();
  const navigate=useNavigate();
  const editing=Boolean(id);
  const [form,setForm]=useState(initial);
  const [error,setError]=useState("");
  const [saving,setSaving]=useState(false);

  useEffect(()=>{
    if(editing) api.get(`/employees/${id}`)
      .then(r=>setForm(r.data))
      .catch(e=>setError(e.response?.data?.detail||"Unable to load employee."));
  },[id,editing]);

  const set=(key,value)=>setForm(x=>({...x,[key]:value}));

  async function submit(e) {
    e.preventDefault(); setError("");
    if(!form.name||!form.email||!form.job_title||!form.joining_date) return setError("Fill all required fields.");
    try {
      setSaving(true);
      const payload={...form,salary:Number(form.salary)};
      if(editing) await api.put(`/employees/${id}`,payload);
      else await api.post("/employees",payload);
      navigate("/employees");
    } catch(err) {setError(err.response?.data?.detail||"Save failed.");}
    finally {setSaving(false);}
  }

  return <div className="page narrow">
    <header className="row"><div><h1>{editing?"Edit":"Add"} Employee</h1><p>Employee information</p></div><Link className="button secondary" to="/employees">Back</Link></header>
    <form className="card form" onSubmit={submit}>
      {error&&<div className="error">{error}</div>}
      <label>Name *</label><input value={form.name} onChange={e=>set("name",e.target.value)}/>
      <label>Email *</label><input type="email" value={form.email} onChange={e=>set("email",e.target.value)}/>
      <label>Department *</label><select value={form.department} onChange={e=>set("department",e.target.value)}>
        <option>IT</option><option>HR</option><option>Finance</option><option>Sales</option><option>Operations</option>
      </select>
      <label>Job Title *</label><input value={form.job_title} onChange={e=>set("job_title",e.target.value)}/>
      <label>Salary *</label><input type="number" min="0" value={form.salary} onChange={e=>set("salary",e.target.value)}/>
      <label>Joining Date *</label><input type="date" value={form.joining_date} onChange={e=>set("joining_date",e.target.value)}/>
      <label><input type="checkbox" checked={form.active} onChange={e=>set("active",e.target.checked)}/> Active</label>
      <button disabled={saving}>{saving?"Saving...":"Save Employee"}</button>
    </form>
  </div>;
}
