import React, { useContext } from 'react'
import noteContext from '../context/noteContext'
import { Highlight, Heading, Card, CardBody, Stack, StackDivider, Box, Text, Center } from '@chakra-ui/react';

const User = () => {
    const context = useContext(noteContext)
    const { user } = context

    
    return (
        <div>
            <Center>
                <Box>
                    <Heading lineHeight='tall' style={{ fontFamily: 'Arial' }}>
                        <Highlight
                            query='  User Information'
                            styles={{ px: '1', py: '1', rounded: 'full',}}
                        >
                            User Information
                        </Highlight>
                    </Heading>
                    <Card >
                        <CardBody>
                            <Stack divider={<StackDivider />} spacing='1'>
                                <Box position='relative'>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Name:
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <h6>{user.name}</h6>
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Email:
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <h6>   {user.email}</h6>
                                    </Text>
                                </Box>
                                <Box>
                                    <Heading size='xs' textTransform='uppercase'>
                                        Account Creation Date:
                                    </Heading>
                                    <Text pt='2' fontSize='sm'>
                                        <h6>{new Date(`${user.date}`).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</h6>
                                    </Text>
                                </Box>
                            </Stack>
                        </CardBody>
                    </Card>
                </Box>
            </Center>
        </div>
    )
}

export default User
