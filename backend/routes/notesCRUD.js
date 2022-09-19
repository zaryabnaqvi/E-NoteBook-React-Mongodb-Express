const express=require("express");
const Notes = require("../models/Notes")
const router=express.Router();
const fetchuser = require("../middleware/getuser");
const { body, validationResult } = require('express-validator');


router.get("/fetchallnotes",fetchuser,async(req,res)=>{
    let notes = await Notes.find({user:req.user.id})
    res.send(notes)
})

router.post("/addnotes",fetchuser,[
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })],async(req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const note = new Notes({
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag,
        user:req.user.id
    })
    const SavedNotes= await note.save(); 
    res.json(SavedNotes)   

})

router.put("/UpdateNotes/:id",fetchuser,async(req,res)=>{
   const{title,description,tag}=req.body;
   const newNotes ={}
   if(title){newNotes.title=title}
   if(description){newNotes.description=description}
   if(tag){newNotes.tag=tag}
    

   let note = await Notes.findById(req.params.id)
   if(!note){return res.status(401).json({error:"user not found"})}
   if(note.user.toString()!==req.user.id){
    return res.status(401).json({error:"user not found"})
   }
   note=await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
   res.json(note)
})

router.delete("/deletenotes/:id",fetchuser,async(req,res)=>{
    const{title,description,tag}=req.body;

     
    let note = await Notes.findById(req.params.id)
    if(!note){return res.status(401).json({error:"notes not found"})}
    if(note.user.toString()!==req.user.id){
     return res.status(401).json({error:"Only user is allowed to change Notes"})
    }
    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Notes has been Deleted", note:note})
 })

module.exports=router;
