import React from 'react'
import { useParams } from 'react-router'

export default function UserInfoPage() {
    const {userid}=useParams();
  return (
    <div>UserInfoPage {userid}</div>
  )
}
