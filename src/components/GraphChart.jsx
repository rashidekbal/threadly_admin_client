import React from "react";
import style from "./styles/GraphChart.module.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function GraphChart() {
  const DASHBOARD_STATS = [
    { name: "Mon", active: 4000},
    { name: "Tue", active: 3000 },
    { name: "Wed", active: 2000},
    { name: "Thu", active: 2780 },
    { name: "Fri", active: 1890 },
    { name: "Sat", active: 2390 },
    { name: "Sun", active: 3490 },
  ];
  return (
    <div className={style.mainContainer}>
        <p>User Activity trend</p>
      <ResponsiveContainer width="100%" height="100%" minHeight={300}>
        <AreaChart data={DASHBOARD_STATS}>
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
