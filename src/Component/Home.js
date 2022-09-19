import React from 'react'
import Notes from './Notes'

export default function Home() {
    const auth=localStorage.getItem("token")
  return (
    <>
    
    <div>
    {!auth&&<h1 className='text-center mt-5 bt-3'>Login to See the Notes</h1>}    
    {auth&&<Notes/>}
    </div>
    </>
  )
}
