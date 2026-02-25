import React from 'react'
import style from "./styles/StoryCard.module.css"
import { generatePreviewUrl } from '../utils/Cloudinary.util.js'
export default function StoryCard({data}) {
  return (
    
    <div className={style.mainContainer}><img src={generatePreviewUrl(data.storyUrl)} loading='lazy' alt='story preview'/></div>
  )
}
