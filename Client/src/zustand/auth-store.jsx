import { create } from 'zustand';
import { toast } from 'react-toastify';
import axios from '../config/axios';


const useAuthStore = create((set, get) => ({
  name: 'Manga',
  user: null,

  actionRegister: async (form) => {
    try {
      const result = await axios.post('/auth/register',form);
      toast.success("Register Complete");
    } catch (err) {
      const errMsg = err.response?.data?.message
      toast.error(errMsg, { position: 'bottom-center' });
    }
  },
  currentUser: async () => {
    try {
      const result = await axios.get('/auth/current-user')
      set({
        user: result.data.user,
      });

      return result;
    } catch (err) {
      console.log(err);
    }
  },
  actionLogin: async(form) => {
      const result = await axios.post('/auth/login',form)
      localStorage.setItem('ACCESS_TOKEN', result.data.token);
      // await get().currentUser();
      return result.data.user.user;
     
     
      


      // console.log(result)

      
      // const errMsg = err.response?.data?.error
      // console.log(errMsg)
      
    
  },
  actionLogout: () => {
    localStorage.removeItem('ACCESS_TOKEN')
    set({ user: null, token: "" });

  },
  getLink: async (body) => {
    try {
      const result = await axios.post("/auth/resetpassword", body)
      toast.success("Reset link sent!", { position: 'bottom-center' });
    } catch (err) {
      const errMsg = err.response?.data?.error
      console.log(errMsg)
      toast.error(errMsg, { position: 'bottom-center' })
    }
  },
  resetPassword: async (body) => {
    try {
      const result = await axios.put("/auth/resetpassword/", body)

    } catch (err) {
      const errMsg = err.response?.data?.error
      console.log(errMsg)
      toast.error(errMsg, { position: 'bottom-center' })
    }
  },
  editProfile : async(body) => {
    try {
      // console.log('helo')
      const result = await axios.patch("/auth/editProfile",body)
      // console.log(result)
      const updatedUser = result.data
      set({user : updatedUser})
    } catch (err) {
      const errMsg = err.response?.data?.error
      console.log(errMsg)
      toast.error(errMsg, { position: 'bottom-center' })
    }
  }
}));

export default useAuthStore;