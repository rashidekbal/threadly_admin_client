import React from 'react'
import style from "./UserPosts.module.css";
import PostCard from '../../components/PostCard';
export default function UserPosts() {
    const Data=[{
        postid:1,
        previewUrl:"https://res.cloudinary.com/dphwlcyhg/video/upload/v1763372768/cm3gclpgo7xiwhuwplos.jpg",
        type:"video",
        caption:"Beautiful morning in the valley! #nature #sunrise",
        views:250,
        likes:200,
        comments:400,
        createdAt:new Date().toDateString(),
    },{
        postid:2,
        previewUrl:"https://res.cloudinary.com/dphwlcyhg/video/upload/v1762338484/xccyufpct6dxc6e98lq1.jpg",
        type:"video",
        caption:"Beautiful morning in the valley! #nature #sunrise",
        views:2580,
        likes:2980,
        comments:490,
        createdAt:new Date().toDateString(),
    },{
        postid:3,
        previewUrl:"https://res.cloudinary.com/dphwlcyhg/image/upload/v1761998649/cuzy9cepcdhnriyn02rf.jpg",
        type:"image",
        caption:"Beautiful morning in the valley! #nature #sunrise",
        views:2540,
        likes:2000,
        comments:400,
        createdAt:new Date().toDateString(),
    },{
        postid:3,
        previewUrl:"https://res.cloudinary.com/dphwlcyhg/image/upload/v1761998649/cuzy9cepcdhnriyn02rf.jpg",
        type:"image",
        caption:"Beautiful morning in the valley! #nature #sunrise",
        views:2540,
        likes:2000,
        comments:400,
        createdAt:new Date().toDateString(),
    },]
  return (
    <div className={style.mainContainer}>
       {Data.map((item)=>(<PostCard data={item} key={item.postid}/>))}
    </div>
  )
}
