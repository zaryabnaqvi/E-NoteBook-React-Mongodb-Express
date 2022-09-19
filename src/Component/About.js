import React from 'react'
import book from './ebook.png'

export default function About() {
  return (
    <div className='container mx-5'>
      <div className='row'>
        <div className='col-sm-5'>
          <img src={book} class="img-fluid rounded-top" alt=""/>
        </div>
    <div className='col-sm-5'>
      <h1 className="my-3 mt-5" style={{fontSize:"3rem"}}>What is e-NoteBook ?</h1>
      <p style={{fontSize:"2rem"}}>e-notebook is a diary kept in electronic format; an Internet journal. where you can keep your notes ,e-NoteBook Provide you a facility to ADD,DELETE,Update notes any time, also e-notebook provide you an id by which your notes kept private from others </p>
    </div>
    </div>
    </div>
  )
}
