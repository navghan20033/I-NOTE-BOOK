import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";
import axios from "axios";


const NoteState = (props) => {



  const [notes, setNotes] = useState([]);
  const [log, setLog] = useState(false)
  const [field, setField] = useState({ name: "", email: "", password: "" })



  const [user, setUser] = useState({ name: "", email: "", date: "" })

  const handleUserInfo = () => {

    try {
      axios.post("http://localhost:5000/api/auth/getuser", {

        "email": field.email,
        "password": field.password
      }).then(async (resp) => {

        // console.log(resp.data);
        setUser({

          name: resp.data.name,
          email: resp.data.email,
          date: resp.data.date
        })

      });


    } catch (error) {


      console.log("API error", error.message);
    }

  }
  const handleLoginSubmit = () => {
    setLog(true)
  };

  const notesInitials = async () => {
    try {
      axios.post("http://localhost:5000/api/notes/getnotes", {

        "email": field.email,
        "password": field.password
      })
        .then(async (resp) => {


          setNotes(resp.data)
          // console.log(resp.data);
        })
    } catch (error) {
      console.log("API ERRPOR", error.message)
    }
  }


  // Add note
  const addNote = async (email, password, title, description, tag) => {
    try {
      // Replace this with the actual API endpoint
      const apiUrl = 'http://localhost:5000/api/notes/createnote';

      const requestData = {
        "email": email,
        "password": password,
        title: title,
        description: description,
        tag: tag,
        user: field.name,
        date: Date.now(),
        __v: 0,
      };

      // Send a POST request to create a note
      const response = await axios.post(apiUrl, requestData);

      // Handle the response
      if (response.status === 201) {
        console.log('Note created successfully:', response.data);

      } else {
        console.error('Failed to create note. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('API ERROR:', error.message);
    }
    try {
      axios.post("http://localhost:5000/api/notes/getnotes", {

        "email": field.email,
        "password": field.password
      })
        .then(async (resp) => {


          setNotes(resp.data)
        })
    } catch (error) {
      console.log("API ERRPOR", error.message)
    }
  };


  const editNote = async (email, password, _id, title, description, tag) => {



    try {
      // Replace this with the actual API endpoint for editing a note
      const apiUrl = `http://localhost:5000/api/notes/updatenote/${_id}`;

      // Data to send in the PUT request
      const requestData = {
        "email": email,
        "password": password,
        title: title,
        description: description,
        tag: tag,
        user: field.name,
        date: Date.now(),
        __v: 0,
      };

      // Send a PUT request to edit the note
      const response = await axios.put(apiUrl, requestData);
      // Handle the response
      if (response.status === 200) {
        console.log('Note edited successfully:', response.data);




        // Assuming you have a way to update the edited note in your UI, do it here.
      } else {
        console.error('Failed to edit note. Server responded with status:', response.status);
      }
    } catch (error) {
      console.error('API ERROR:', error.message);
    }
    try {
      axios.post("http://localhost:5000/api/notes/getnotes", {
        "email": field.email,
        "password": field.password
      })
        .then(async (resp) => {
          setNotes(resp.data)
          // console.log(resp.data);
        })
    } catch (error) {
      console.log("API ERRPOR", error.message)
    }
  };
  //Delete Note
  const deleteNote = (_id) => {
    try {
      axios.delete(`http://localhost:5000/api/notes/removenote/${_id}`)
        .then(async (resp) => {
          setNotes(notes.filter((item) => item._id !== _id));
        })
    } catch (error) {
      console.log("API ERRPOR", error.message)
    }
  }
  return (
    <noteContext.Provider value={{ notes, addNote, editNote, deleteNote, handleLoginSubmit, notesInitials, log, setLog, field, setField, handleUserInfo, user, setUser }}>
      {props.children}
    </noteContext.Provider>
  )
}
export default NoteState