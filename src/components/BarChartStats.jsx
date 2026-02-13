import React from 'react'
import style from "./styles/BarChart.module.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
export default function BarChartStats() {
     const DASHBOARD_STATS = [
    { name: "Mon", new: 2400 },
    { name: "Tue", new: 1398 },
    { name: "Wed", new: 9800 },
    { name: "Thu", new: 3908 },
    { name: "Fri", new: 4800 },
    { name: "Sat", new: 3800 },
    { name: "Sun", new: 4300 },
  ];
  return (
    <div className={style.mainContainer}>
        <p>Engagement Distribution</p>
     
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
           <BarChart data={DASHBOARD_STATS}>
          <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{fill: '#64748b', fontSize: 12}}
          />
          <YAxis 
          axisLine={false}
          tickLine={false}
          tick={{fill: '#64748b', fontSize: 12}}/>
                 
          <Bar dataKey="new" fill="#818cf8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      
        
    </div>
  )
}
