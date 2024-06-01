import React, { useContext, useState } from 'react'
import {
    Modal,
    Button,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Badge,
    Input
} from '@chakra-ui/react'

import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import { useToast } from '@chakra-ui/react'
import noteContext from '../context/noteContext'
import AddNote from './AddNote'

const Notes = () => {
    const context = useContext(noteContext)
    const { deleteNote, editNote, notes, field } = context
    const toast = useToast()
    const [note, setNote] = useState({ title: "", description: "", tag: "", date: "" })
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const OnChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const editHandler = (item) => {
        setIsOpen(true);
        setNote(item);
    }

    const addNoteHandler = () => {
        AddNote(
            {
                title: note.title,
                description: note.description,
                tag: note.tag,
                date: new Date().toISOString()
            }
        );

        setNote({
            title: "",
            description: "",
            tag: "",
            date: new Date().toISOString()
        })

        setIsOpen(false);

        toast({
            title: 'Note Created',
            description: "Note Saved Successfully.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }

    const filteredNotes = notes.filter((note) => {
        return (
            note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <>
            <div className="container d-flex justify-content-around ">
                <div className='d-flex justify-content-start' style={{ width: "400px" }}>
                    <AddNote addNote={addNoteHandler} />
                </div>

                <div style={{ marginBottom: "10px" }}>
                    <Input
                        placeholder="Search by title or tag"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Note</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <div className='d-flex '   >
                                <form>
                                    <div className="mb-1">
                                        <label className="form-label">Title:</label>
                                        <input type="text" name='title' value={note.title} style={{ width: "350px" }} onChange={OnChange} className="form-control" />
                                    </div>
                                    <div className="mb-1">
                                        <label className="form-label">Description:</label>
                                        <input type="text" className="form-control" value={note.description} style={{ height: "150px" }} onChange={OnChange} name="description" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label" >Tag:</label>
                                        <input type="text" className="form-control" value={note.tag} onChange={OnChange} name="tag" />
                                    </div>
                                </form>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' colorScheme='red' onClick={(e) => {
                                editNote(field.email, field.password, note._id, note.title, note.description, note.tag)
                                setIsOpen(false)
                                toast({
                                    title: 'Edit Note',
                                    description: "Note Edited Successfully.",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            }} >Save Changes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal >

                <div className="row px-0 d-flex justify-content-end " style={{ backgroundColor: "", width: "800px", height: "400px" }}>
                    {(filteredNotes.length === 0 && "No Notes to Display") || filteredNotes.map((item, index) => {
                        return (
                            <div key={item._id} className="form-floating my-2 mx-1 col-md-4">
                                <div className="card" >
                                    <div className="card-body ">
                                        <strong><h5 className="card-title" style={{ fontFamily: 'Arial', textDecorationThickness: 'dark' }}>Title:{item.title}</h5></strong>
                                        <p className='d-flex justify-content-end my-2' style={{ fontSize: "9px" }}>{new Date(`${item.date}`).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                                        <hr />
                                        <p className="card-text" style={{ fontFamily: 'times new roman' }}><strong>Description : </strong>
                                            <br />{item.description}</p>
                                        <Badge colorScheme='pink'>{item.tag}</Badge>
                                        <div className='d-flex justify-content-start my-3'>
                                            <Button className='mx-2' onClick={() => {
                                                editHandler(item);
                                            }}><EditIcon className='mx-2' /></Button><Button onClick={() => {
                                                deleteNote(item._id, index);
                                                toast({
                                                    title: 'Delete Note',
                                                    description: "Note Deleted Successfully.",
                                                    status: 'error',
                                                    duration: 5000,
                                                    isClosable: true,
                                                })
                                            }}><DeleteIcon className='mx-2' /></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    )}
                </div >
            </div >
        </>
    )
}

export default Notes
