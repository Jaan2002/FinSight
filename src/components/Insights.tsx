import { useApp } from "../context/AppContext";

export default function Insights() {
  const { transactions } = useApp();

  const map:any = {};

  transactions.forEach((t:any)=>{
    if(t.type==="expense"){
      map[t.category]=(map[t.category]||0)+t.amount;
    }
  });

  const highest = Object.keys(map).length
    ? Object.keys(map).reduce((a,b)=>map[a]>map[b]?a:b)
    : "N/A";

  return (
    <div className="card">
      <h2 className="section-title">Insights</h2>
      <p>Highest spending category: <strong>{highest}</strong></p>
    </div>
  );
}