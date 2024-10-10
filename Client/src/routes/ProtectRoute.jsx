import React, { useEffect } from 'react'
import useAuthStore from '../zustand/auth-store'

const ProtectRoute = (props) => {


    
    const {element, } = props
    
    const token = useAuthStore(state => state.token)
    const currentUser = useAuthStore(state => state.getMe)

    useEffect(()=>{
        //code
        
            checkRole()

       
        
    },[])
    // console.log('token from ProtectRoute', token)
    // console.log('token from ProtectRoute', user.user.role)
    const checkRole = async () => {
        try {
            //code  
            const resp = await currentUser()
            
         
          
        } catch (err) {
            //err
            console.log(err)
          
        }
    }
    return element
}

export default ProtectRoute
