import React, { useContext } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Divider, AbsoluteCenter, Box, useToast } from '@chakra-ui/react'
import About from './About'
import Notes from './Notes'
import Login from './Login'
import Signup from './Signup'
import noteContext from '../context/noteContext'
import Logout from './Logout'
import User from './User'

function Navbar() {

    const context = useContext(noteContext)
    const toast = useToast()
    const { log, handleLoginSubmit, activeTab } = context
    return (
        <>
            <div className=" container my-4" style={{ "fontFamily": "DM Sans 18pt" }}>
                <Box position='relative' padding='1'>
                    <Divider />
                    <AbsoluteCenter bg='' px='100'>
                        <h1 style={{ fontSize: '2em' }}>iNotebook</h1>
                    </AbsoluteCenter>
                </Box>
            </div>
            <div className="container my-3">
                <Tabs variant='soft-rounded' colorScheme='red' index={activeTab} >
                    <TabList>
                        {log && <Tab>User</Tab>}
                        {log && <Tab>Notes</Tab>}
                        {!log && <Tab>Login</Tab>}
                        {!log && <Tab>Signup</Tab>}
                        {log && <Tab>Logout</Tab>}
                        <Tab>About</Tab>
                    </TabList>
                    <TabPanels>
                        {log && <TabPanel><User /></TabPanel>}
                        {log && <TabPanel><Notes /></TabPanel>}
                        {!log && <TabPanel><Login onSubmit={handleLoginSubmit} /></TabPanel>}
                        {!log && <TabPanel><Signup /></TabPanel>}
                        {log && <TabPanel><Logout /></TabPanel>}
                        <TabPanel><About /></TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </>
    )
}

export default Navbar
