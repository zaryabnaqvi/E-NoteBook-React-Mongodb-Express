import React, { useContext, useState } from 'react'
import NotesContext from '../Context/NotesContex'

export default function AddNotes() {
    const Context = useContext(NotesContext)
    const {AddNotes}=Context
    const [note,setNotes]=useState({title:"",description:"",tag:""})
    const AddNote=(e)=>{
        e.preventDefault();
        AddNotes(note.title,note.description,note.tag);
        setNotes({title:"",description:"",tag:""});
    }
    const onChange =(e)=>{
        setNotes({...note,[e.target.name]:e.target.value})

    }
    return (
        <div className="container">
            <h1>Add Notes</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={onChange} />
                </div>
                <div className="mb-3 ">
                    <label htmlFor="tag" className="form-label">tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} />
                </div>
                <button type="submit" disabled={note.title.length<5 && note.description.length<5} onClick={AddNote} className="btn btn-primary mb-3">AddNote</button>
            </form>
        </div>
    )
}
