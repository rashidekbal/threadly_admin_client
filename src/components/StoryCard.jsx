import React from 'react'
import style from "./styles/StoryCard.module.css"
import { generatePreviewUrl } from '../utils/Cloudinary.util.js'

export default function StoryCard({data, onClick}) {
  return (
    <div className={`${style.mainContainer} cursor-pointer hover:opacity-80 transition-opacity`} onClick={onClick}>
      <img src={generatePreviewUrl(data.storyUrl)} loading='lazy' alt='story preview'/>
    </div>
  )
}
