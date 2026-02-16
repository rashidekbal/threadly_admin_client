import React from 'react'
import style from "./styles/StoryCard.module.css"
export default function StoryCard({data}) {
  return (
    <div className={style.mainContainer}><img src={data.previewUrl}/></div>
  )
}
