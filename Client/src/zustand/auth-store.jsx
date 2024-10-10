import {create} from "zustand"
import {toast} from 'react-toastify'
import { register,login, getMe } from "../api/auth-api"
import {createJSONStorage, persist} from 'zustand/middleware'
const useAuthStore = create(persist((set)=>({
    name : "Manga",
    user : null,
    token : null,
    actionRegister : async (form)=>{
        try {
            //code
            // console.log('action register in Zustand')
            const resp = await register(form)
            console.log(resp)
            toast.success(resp)
        } catch (err) {
            //err
        
            toast.error(err.response.data.message)
        }
    },
    getMe : async ()=>{
        try {
            
     
            const resp = await getMe()
           
            set({
                user : resp.data.user,
                
            })
            
            return resp
        } catch (err) {
            
            console.log(err)
            // toast.error(err.response.data.message)
        }
    },
    actionLogin : async (form)=>{
        try {
            //code
     
            const resp = await login(form)
            console.log('object',resp)
           
            set({
                user : resp.data.user,
                token : resp.data.token
            })
            localStorage.setItem("ACCESS_TOKEN", resp.data.token)
            // toast.success(resp.data.token)
            return resp.data.user.user.role
        } catch (err) {
            //err
            console.log(err)
            // toast.error(err.response?.data?.message)
        }
    },
    actionLogout : ()=> {
        localStorage.clear()
        set({user : null, token : null})
    }
})
// ,{
//     name : 'user-store',
//     storage : createJSONStorage(()=> localStorage),
//     partialize: (state) => (state.token )
// }
)
)
export default useAuthStore