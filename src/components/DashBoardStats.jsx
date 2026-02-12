import React from 'react'
import style from "./styles/DashBoardStats.module.css"
import StatsCard from './StatsCard';
import { 
  Users, 
  Heart, 
  MessageSquare, 
  Eye, 
  ArrowUpRight, 
  ArrowDownRight 
}from 'lucide-react';
export default function DashBoardStats() {

    const data=[{
        title:"Total Users",
        value:"12M",
        change:"15%",
        trend:"up",
        icon:Users


    },{
        title:"Post Engagement",
        value:"854K",
        change:"1%",
        trend:"up",
        icon:Heart,
    },{
        title:"Total Comments",
        value:"2.1M",
        change:"4.1%",
        trend:"down",
        icon:MessageSquare,
    },{
        title:"Total Views",
        value:"45.1M",
        change:"18.1%",
        trend:"up",
        icon:Eye,
    }]
  return (
    <div className={`${style.mainContainer} hide-scroll`}>
        {data.map((item)=>(<StatsCard title={item.title} value={item.value} change={item.change} trend={item.trend} icon={item.icon}/>))}
        
       

    </div>
  )
}
