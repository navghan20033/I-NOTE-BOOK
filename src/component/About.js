import React from 'react';
import { Center, Box } from '@chakra-ui/react';

const About = () => {
    return (
        <Center minH="50vh">
            <Box textAlign="center">
                <p style={{ fontSize: '2em' }}><strong>Write your story, keep it safe. In the clouds, your notes find their place.</strong></p>
                <p style={{ fontSize: '1.8em' }}>iNotebook is all about storing your important thoughts on the Cloud.</p>
                <p style={{ fontSize: '1.4em' }}>Made By Abhay Trivedi And Navghan Kabira</p>
            </Box>
        </Center>
    );
}

export default About;
