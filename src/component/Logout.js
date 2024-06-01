import React from 'react'

import { Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'


const Logout = () => {
  
    const toast = useToast()
    const reloader = () => {
       
        window.location.reload();
        toast({
            title: 'Logout',
            description: "You have Logged out Successfully.",
            status: 'info',
            duration: 5000,
            isClosable: true,
        })
        
    }
    return (
        <div className="container">
          
            <Button center className='btn' onClick={reloader}>Logout</Button>

        </div>
    )
}

export default Logout
