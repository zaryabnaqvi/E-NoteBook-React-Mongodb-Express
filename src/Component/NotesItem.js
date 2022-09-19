import React, { useContext } from 'react'
import NotesContext from '../Context/NotesContex'


export default function NotesItem(props) {
    const Context =useContext(NotesContext)
    const {deleteNotes}=Context
    const {Notes,UpdateNotes}=props;
    return (
        <div>
            <div className="card" style={{ "width": "30rem" }} >
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{props.tag}</h6>
                    <p className="card-text">{props.description}</p>
                    <i className="fa-solid fa-pen-to-square m-2" onClick={()=>{UpdateNotes(Notes)}} ></i>
                    <i className="fa-solid fa-trash m-2" onClick={()=>{deleteNotes(Notes._id)}}></i>
                </div>
            </div>
        </div>
    )
}
