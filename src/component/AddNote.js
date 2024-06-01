import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

const AddNote = () => {

    const context = useContext(noteContext)

    const { addNote, field } = context


    const toast = useToast()
    const [notes, setNotes] = useState({ title: "", description: "", tag: "" })


    const OnChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='d-flex justify-content-start my-5'   >
                <form>
                    <div className="mb-1">
                        <label className="form-label"><strong>Title:</strong></label>
                        <input type="text" name='title' placeholder='Title' style={{ width: "350px" }} onChange={OnChange} value={notes.title} className="form-control" />
                    </div>
                    <div className="mb-1">
                        <label className="form-label"><strong>Description:</strong></label>
                        <input type="text" placeholder='Your Thought' className="form-control" style={{ height: "150px" }} onChange={OnChange} value={notes.description} name="description" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label"><strong>Tag:</strong></label>
                        <input type="text" className="form-control" onChange={OnChange} value={notes.tag} name="tag" />
                    </div>
                    <Button style={{ backgroundColor: "#5AA9E6", "fontFamily": "Arial ", color: "black" }} onClick={(e) => {
                        e.preventDefault();
                        addNote(field.email, field.password, notes.title, notes.description, notes.tag)
                        toast({
                            title: 'Note Created',
                            description: "Note Saved Successfully.",
                            status: 'success',
                            duration: 5000,
                            isClosable: true,
                        })   
                        setNotes({ title: "", description: "", tag: "" })
                    }} className="btn btn-dark d-grid gap-2 col-6 mx-auto" >Create Note</Button>
                </form>
            </div>
        </>
    )
}

export default AddNote

