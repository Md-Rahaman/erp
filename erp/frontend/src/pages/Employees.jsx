import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
import api from "../services/api";
import {useAuth} from "../context/AuthContext";

export default function Employees() {
  const {user}=useAuth();
  const [data,setData]=useState({items:[],page:1,pages:1,total:0});
  const [search,setSearch]=useState("");
  const [department,setDepartment]=useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState("");

  async function load(page=1) {
    setLoading(true); setError("");
    try {
      const r=await api.get("/employees",{params:{search:search||undefined,department:department||undefined,page,page_size:8}});
      setData(r.data);
    } catch(e) {setError(e.response?.data?.detail||"Unable to load employees.");}
    finally {setLoading(false);}
  }

  useEffect(()=>{load(1)},[department]);

  async function remove(id) {
    if(!confirm("Delete this employee?")) return;
    try {await api.delete(`/employees/${id}`); load(data.page);}
    catch(e){setError(e.response?.data?.detail||"Delete failed.");}
  }

  return <div className="page">
    <header className="row"><div><h1>Employees</h1><p>Employee management</p></div>
      {user?.role==="admin"&&<Link className="button" to="/employees/new">+ Add Employee</Link>}
    </header>

    <div className="toolbar">
      <input placeholder="Search name, email or job title" value={search} onChange={e=>setSearch(e.target.value)}
        onKeyDown={e=>e.key==="Enter"&&load(1)}/>
      <select value={department} onChange={e=>setDepartment(e.target.value)}>
        <option value="">All departments</option><option>IT</option><option>HR</option>
        <option>Finance</option><option>Sales</option><option>Operations</option>
      </select>
      <button onClick={()=>load(1)}>Search</button>
    </div>

    {error&&<div className="error">{error}</div>}

    <div className="card table-wrap">
      {loading?<p>Loading...</p>:<table>
        <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Job</th><th>Salary</th><th>Status</th>{user?.role==="admin"&&<th>Actions</th>}</tr></thead>
        <tbody>
          {data.items.map(e=><tr key={e.id}>
            <td>{e.name}</td><td>{e.email}</td><td>{e.department}</td><td>{e.job_title}</td>
            <td>₹{e.salary.toLocaleString()}</td>
            <td><span className={e.active?"active":"inactive"}>{e.active?"Active":"Inactive"}</span></td>
            {user?.role==="admin"&&<td><Link to={`/employees/${e.id}/edit`}>Edit</Link> <button className="delete" onClick={()=>remove(e.id)}>Delete</button></td>}
          </tr>)}
        </tbody>
      </table>}
      {!loading&&!data.items.length&&<p>No employees found.</p>}
    </div>

    <div className="pagination">
      <button disabled={data.page<=1} onClick={()=>load(data.page-1)}>Previous</button>
      <span>Page {data.page} of {data.pages}</span>
      <button disabled={data.page>=data.pages} onClick={()=>load(data.page+1)}>Next</button>
    </div>
  </div>;
}
