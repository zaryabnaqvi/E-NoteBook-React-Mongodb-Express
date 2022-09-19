import React, { useContext, useEffect, useRef,useState } from 'react'
import NotesContext from '../Context/NotesContex';
import AddNotes from './AddNotes';

import NotesItem from './NotesItem';

export default function Notes() {
    let auth=localStorage.getItem("token")
    const Context = useContext(NotesContext);

    useEffect(()=>{
        if(auth){
        Context.getNotes();
        // eslint-disable-next-line 
        }
})

    const ref=useRef(null)
    const refClose =useRef(null)


    const [note,setNotes]=useState({id:"",title:"",description:"",tag:""})

    const UpdateNotes=(currentNote)=>{
        setNotes({id:currentNote._id,title:currentNote.title,description:currentNote.description,tag:currentNote.tag})
        console.log(currentNote)
        ref.current.click();
        
     

    }

    
    const EditNote=(e)=>{
        Context.UpdateNotes(note.id,note.title,note.description,note.tag);
        refClose.current.click();
  
        
    }
    const onChange =(e)=>{
        setNotes({...note,[e.target.name]:e.target.value})
    }

    return (
        <>

<button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Notes</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="etitle" name='title' value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="edescription" name='description' value={note.description} onChange={onChange} />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="etag" name='tag' value={note.tag} onChange={onChange} />
                </div>
                
            </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" data-bs-dismiss="modal" onClick={EditNote}>Save changes</button>
      </div>
    </div>
  </div>
</div>



            <div className='container mt-5'>
                <AddNotes/>
                <h1>Notes</h1>
                <div className='row'>

                    {Context.Notes.length===0 && (<p>No Notes to Show</p>)}
                    {Context.Notes.map((notes) => {
                        return (
                            <div className='col-sm-5 m-3' key={notes._id}>
                                <NotesItem title={notes.title} tag={notes.tag} description={notes.description} Notes={notes} UpdateNotes={UpdateNotes}/>
                            </div>

                        )
                    })}

                </div>
            </div>
        </>
    )
}
