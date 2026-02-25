import React from 'react'

export default function LogOutDialog({toggle,logoutHandler}) {
  return (
    <div className='bg-white w-auto h-auto rounded-2xl p-4'><p className='text-start text-xl text-slate-500'>Do you really want to Logout ?</p>
    <div className=' mt-10'><button className='border block border-slate-400 px-5 py-1 rounded-2xl cursor-pointer w-full bg-green-400 text-white' onClick={()=>{
        logoutHandler();
    }}>Yes</button><button  className='border border-slate-400 px-5 block py-1 rounded-2xl cursor-pointer w-full mt-2 bg-red-500 text-white' onClick={()=>{
        toggle(false)
    }}>No</button></div></div>
  )
}
