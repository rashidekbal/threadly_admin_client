import React, { useEffect, useState } from "react";
import style from "./styles/GraphChart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAnalytics } from "../repository/statsRepo";

export default function GraphChart() {
  const [data, setData] = useState([
    { name: "Mon", active: 0},
    { name: "Tue", active: 0 },
    { name: "Wed", active: 0},
    { name: "Thu", active: 0 },
    { name: "Fri", active: 0 },
    { name: "Sat", active: 0 },
    { name: "Sun", active: 0 },
  ]);

  useEffect(() => {
    getAnalytics({
      success: (res) => {
        const signupsTrend = res.data.data.signups;
        if (signupsTrend && signupsTrend.length > 0) {
          const formattedData = signupsTrend.map(item => {
            const date = new Date(item.day);
            return {
              name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
              active: item.signups
            };
          });
          setData(formattedData);
        }
      },
      error: (err) => {
        console.error("Failed to load graph stats", err);
      }
    });
  }, []);
  return (
    <div className={style.mainContainer}>
        <p>User Signups Trend (Last 30 Days)</p>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
            </linearGradient>
          </defs>
         
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              width:"25%",
              border: "1px solid #e2e8f0",
            }}
            itemStyle={{ fontSize: "12px", fontWeight: 600 }}
          />
          <Area
            type="monotone"
            dataKey="active"
            stroke="#4f46e5"
            fillOpacity={1}
            fill="url(#colorActive)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
