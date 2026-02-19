import { AlertTriangleIcon, ShieldAlert, X } from 'lucide-react'
import React, { useState } from 'react'

export default function ProfileBlockInterface({data,toggle}) {
    const [banDuration,setBanDuration]=useState("24");
  return (
    <div className='w-150.5 h-147.5 bg-white rounded-4xl overflow-hidden overflow-y-scroll hide-scroll p-6' >
        {/* toolbar */}
       <div className=' flex gap-4'>
        <span >< ShieldAlert className='bg-red-200 h-10 w-10 p-2 text-red-600 rounded-xl' /></span>
       <div>
        <p className='text-xl'> Restrict Account: {data.username} </p>
        <p className='text-slate-400 text-[0.9rem] font-serif mt-1' style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}}>Restricting an account will limit the user's ability to post, comment, and interact with other users. This action will be logged in the system audit trail. </p>
       </div>
       <span onClick={()=>{
        toggle(false)
       }}><X className='text-slate-500 cursor-pointer'/></span>
       </div>
       {/* block selector */}
       <div className='w-full flex justify-between gap-6 my-10'>
        <div className='border-2 border-red-600 py-2 px-5 rounded-2xl bg-red-50 w-full cursor-pointer'>
            <p className='text-red-500 text-start'>Temporary (24h)</p>
            <p className='text-gray-400 text-start text-[0.9rem]' style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}}>Automated lift after 24 hours</p>
        </div>
        <div className='border border-slate-400 py-2 px-5 rounded-2xl w-full cursor-pointer'>
            <p className='text-black text-start'>
                permanent
            </p>
            <p className='text-slate-400 text-[0.9rem] text-start'style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}}>
                Require manual review to lift
            </p>
        </div>
       </div>
       {/* reason for restriction section */}
       <p className='text-slate-400 my-2' style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}}>REASON FOR RESTRICTION</p>
       <textarea placeholder='e.g. Suspicious activity, community guideline violation' className='border border-slate-300 rounded-xl w-full h-40 p-4 outline-0' style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}}/>
    <div className='flex gap-4 bg-orange-100 px-4 py-4 rounded-2xl my-5'>
        <span><AlertTriangleIcon className='text-orange-400'/></span>
        <div>
            <p className='text-orange-600'>Important Note</p>
            <p  style={{fontFamily:" \"Gill Sans\", \"Gill Sans MT\", Calibri, \"Trebuchet MS\", sans-serif ",}} className='text-orange-500 '>This user is a {data.privacy.toLowerCase()} account. Restricting them will notify their followers and hide their content form the global feed during the restriction period.</p>
        </div>
    </div>
    {/* save section */}
    <div className='flex justify-between'>
        <button className='w-full text-slate-500 cursor-pointer  py-3 rounded-2xl' onClick={()=>{
            toggle(false)
        }}>Cancel</button>
        <button className='w-full text-white bg-red-400 py-3 rounded-2xl cursor-pointer'>Confirm Restriction</button>
    </div>
    </div>
  )
}
