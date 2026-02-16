import React from 'react'
import style from "./UserHistory.module.css"
import PostWatchHistoryCard from '../../components/PostWatchHistoryCard'
export default function UserHistory() {
  return (
    <div className={style.mainContainer}>
        <PostWatchHistoryCard/>
    </div>
  )
}
