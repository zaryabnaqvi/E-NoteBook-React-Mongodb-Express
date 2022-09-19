import React, { useState } from 'react'
import NotesContext from './NotesContex'

 const NotesState=(props)=> {
  const auth=localStorage.getItem("token");

  const getNotes=async()=>{
    const data = await fetch("http://localhost:5000/api/notes/fetchallnotes",{
      method:"GET",
      headers:{
        "Content-type":"application/json",
        "auth-token":auth
      }
    })
    const json=await data.json();
    
    setNotes(json)
  }

  const AddNotes=async(title,description,tag)=>{
    const data = await fetch("http://localhost:5000/api/notes/addnotes",{
      method:"POST",
      headers:{
        "Content-type":"application/json",
        "auth-token":auth
      },
      body:JSON.stringify({title,description,tag})}
    )
    const json=await data.json();
    let state=Notes;
    setNotes(state.concat(json))

  }

  const UpdateNotes=async(id,title,desc,tag)=>{
    const data = await fetch(`http://localhost:5000/api/notes/updatenotes/${id}`,{
      method:"PUT",
      headers:{
        "Content-type":"application/json",
        "auth-token":auth
      },
      body:JSON.stringify({title,desc,tag})}
    )
    let EditNotes=Notes;
    console.log(EditNotes)
    for (let index = 0; index < EditNotes.length; index++) {
      if (EditNotes[index]._id===id){
        EditNotes[index].title=title;
        EditNotes[index].description=desc;
        EditNotes[index].tag=tag;
        break;
      }
    }
    console.log(EditNotes);
    setNotes(EditNotes);

    

  }
  const deleteNotes=async( id)=>{
    console.log(id)
    const data = await fetch(`http://localhost:5000/api/notes/deletenotes/${id}`,{
      method:"DELETE",
      headers:{
        "auth-token":auth
      }
    })
    const NewNotes = Notes.filter((note)=>{return note._id!==id});
    setNotes(NewNotes);


  }


  const [Notes,setNotes]=useState([]);
  
  
  
  return (
    <NotesContext.Provider value={{Notes,setNotes,AddNotes,UpdateNotes,deleteNotes,getNotes}}>
        {props.children}
    </NotesContext.Provider>   
  )
}

export default NotesState;

