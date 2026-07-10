import React, { useEffect, useState } from 'react'
import style from "./styles/BarChart.module.css";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { getAnalytics } from "../repository/statsRepo";

export default function BarChartStats() {
  const [data, setData] = useState([
    { name: "Mon", new: 0 },
    { name: "Tue", new: 0 },
    { name: "Wed", new: 0 },
    { name: "Thu", new: 0 },
    { name: "Fri", new: 0 },
    { name: "Sat", new: 0 },
    { name: "Sun", new: 0 },
  ]);

  useEffect(() => {
    getAnalytics({
      success: (res) => {
        const postsTrend = res.data.data.posts;
        if (postsTrend && postsTrend.length > 0) {
          const formattedData = postsTrend.map(item => {
            const date = new Date(item.day);
            return {
              name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              new: item.posts
            };
          });
          setData(formattedData);
        }
      },
      error: (err) => {
        console.error("Failed to load bar graph stats", err);
      }
    });
  }, []);
     
  return (
    <div className={style.mainContainer}>
        <p>Post Creation Trend (Last 30 Days)</p>
     
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
           <BarChart data={data}>
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
