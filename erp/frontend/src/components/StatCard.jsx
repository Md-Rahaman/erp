import React from "react";
export default function StatCard({label,value,hint}) {
  return <div className="card stat">
    <span>{label}</span>
    <strong>{value}</strong>
    <small>{hint}</small>
  </div>;
}
