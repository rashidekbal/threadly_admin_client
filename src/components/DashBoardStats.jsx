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
export default function DashBoardStats({statsCardData}) {

    const data=[{
        title:"Total Users",
        value:statsCardData.usersStats.totalValue,
        change:statsCardData.usersStats.change,
        trend:statsCardData.usersStats.trend,
        last7Days:statsCardData.usersStats.last7Days,
        icon:Users


    },{
        title:"Post Engagement",
        value:statsCardData.likeStats.totalValue,
        change:statsCardData.likeStats.change,
        trend:statsCardData.likeStats.trend,
        last7Days:statsCardData.likeStats.last7Days,
        icon:Heart,
    },{
        title:"Total Comments",
        value:statsCardData.commentStats.totalValue,
        change:statsCardData.commentStats.change,
        trend:statsCardData.commentStats.trend,
            last7Days:statsCardData.commentStats.last7Days,
        icon:MessageSquare,
    },{
        title:"Total Views",
        value:statsCardData.postViewStats.totalValue,
        change:statsCardData.postViewStats.change,
        trend:statsCardData.postViewStats.trend,
        last7Days:statsCardData.postViewStats.last7Days,
        icon:Eye,
    }]
  return (
    <div className={`${style.mainContainer} hide-scroll`}>
        {data.map((item)=>(<StatsCard title={item.title} value={item.value} change={item.change} trend={item.trend} icon={item.icon} currentWeekValue={item.last7Days}/>))}
        
       

    </div>
  )
}
