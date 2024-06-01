import React, { useState } from 'react'
import axios from "axios";
import {AbsoluteCenter, Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react';
const Signup = () => {
    const [field, setField] = useState({ name: "", email: "", password: "" })
    const toast = useToast()
    const creating = (error) => {
        try {
            axios.post("http://localhost:5000/api/auth/createuser", {
                "name": field.name,
                "email": field.email,
                "password": field.password
            })
                .then(async (resp) => {
                    toast({
                        title: 'Account created.',
                        description: "We've created your account for you.",
                        status: 'success',
                        duration: 5000,
                        isClosable: true,
                    })
                    setField({ name: "", email: "", password: "" })
                })
                .catch((error) => {
                    console.log(error);
                })
        } catch (error) {

            console.log("API ERRPOR", error.message)
        }

        console.log(error);
    }
    const OnChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }
    return (
        <> 
            <Center><h3 >Create New Account</h3></Center>
            <div className='d-flex justify-content-center my-3'  >
                <form>
                    <div className="mb-3">
                        <label style={{ color: "#150578" }} className="form-label">Name:</label>
                        <input type="email" style={{ backgroundColor: "#DFF1FF" }} className="form-control" value={field.name} name='name' onChange={OnChange} aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label style={{ color: "#150578" }} className="form-label">Email:</label>
                        <input type="email" style={{ backgroundColor: "#DFF1FF" }} className="form-control" value={field.email} name='email' onChange={OnChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" style={{ color: "#150578" }} className="form-label">Password:</label>
                        <input type="password" style={{ backgroundColor: "#DFF1FF" }} className="form-control" name='password' value={field.password} onChange={OnChange} />
                    </div>
                    <Button type="submit" style={{ backgroundColor: "#5AA9E6" }} className="btn btn-primary" onClick={(e) => {
                        e.preventDefault();
                        try {
                            axios.post("http://localhost:5000/api/auth/getuser", {

                                "email": field.email,
                                "password": field.password
                            })
                                .then(async (resp) => {

                                    toast({
                                        title: 'Change Your Credentails',
                                        description: "User Found With same credentials.",
                                        status: 'info',
                                        duration: 5000,
                                        isClosable: true,
                                    })
                                    setField({ name: "", email: "", password: "" })
                                })
                                .catch((error) => {
                                    creating(error);
                                })
                        } catch (error) {
                            console.log("API ERRPOR", error.message)
                        }

                    }} >Submit</Button>
                </form>
            </div>
        </>
    )
}

export default Signup
