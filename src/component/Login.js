import React, { useContext } from 'react'
import axios from "axios";
import noteContext from '../context/noteContext'
import { Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react';

function Login() {

    const context = useContext(noteContext)
    const { handleLoginSubmit, field, setField, notesInitials,handleUserInfo } = context
    const toast = useToast()
    const OnChange = (e) => {
        setField({ ...field, [e.target.name]: e.target.value })
    }
    return (
        <>
            <Center><h3 >Login</h3></Center>
            <div className='d-flex justify-content-around my-5'  >
                
                <form>
                    <div className="mb-3">
                        <label style={{ color: "#150578" }} className="form-label">Email:</label>
                        <input type="email" style={{ backgroundColor: "#DFF1FF" }} className="form-control" name='email' value={field.email} onChange={OnChange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" style={{ color: "#150578" }} className="form-label">Password:</label>
                        <input type="password" style={{ backgroundColor: "#DFF1FF" }} value={field.password} name='password' onChange={OnChange} className="form-control" />
                    </div>
                    <Button type="submit" style={{ backgroundColor: "#5AA9E6" }} onClick={(e) => {
                        e.preventDefault();
                        try {
                            axios.post("http://localhost:5000/api/auth/login", {

                                "email": field.email,
                                "password": field.password
                            }).then(async (resp) => {
                                handleLoginSubmit();
                                // setField({ email: "", password: "" })
                                handleUserInfo();
                                    toast({
                                    title: 'Log-IN',
                                    description: "You have logged In Successfully.",
                                    status: 'success',
                                    duration: 5000,
                                    isClosable: true,
                                })
                                notesInitials();
                            }).catch((error) => {
                                toast({
                                    title: 'Give Correct Credentials',
                                    description: error.response.data,
                                    status: 'error',
                                    duration: 5000,
                                    isClosable: true,
                                })
                            });


                        } catch (error) {
                            console.log("API error", error.message);
                        }

                    }} className="btn btn-primary">Submit</Button>
                </form>
            </div>
        </>
    )
}

export default Login
