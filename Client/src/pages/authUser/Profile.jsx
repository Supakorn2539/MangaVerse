import React, { useState } from 'react';
import useAuthStore from '../../zustand/auth-store';
import { toast } from 'react-toastify'; // Assuming you're using toast for error handling
import Swal from 'sweetalert2';

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const user = useAuthStore(state => state.user);
  const editProfile = useAuthStore(state => state.editProfile);
  const [message, setMessage] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    username: user?.username,
    email: user?.email,
  });
  // console.log("ssadasd",user)
  const [image, setImage] = useState(null);

  const hdlChange = (e) => {
    setMessage(prv => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const hdlEdit = async () => {
    // console.log('edit')
    try {
      const body = new FormData();
      body.append('firstName', message.firstName);
      body.append('lastName', message.lastName);
      body.append('username', message.username);
      body.append('email', message.email);
      if (image) {
        body.append('profileImage', image);
      }

      for (let [key, value] of body.entries()) {
        console.log(`${key} : ${value}`)
      }

      const res = await editProfile(body);
      Swal.fire("Edit Profile Successful")
      // console.log(res)
    } catch (err) {
      const errMsg = err.response?.data?.error;
      console.log(errMsg);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const hdlImgChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className='h-[calc(100vh-218px)] w-2/4 mx-auto' style={{ marginBottom: '8px', backgroundColor: 'rgba(251,231,239,0.5)', borderRadius: '8px' }}>
      <div className='flex flex-col gap-3 items-center justify-center'>
        <div className='rounded-full w-32 h-32 bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer' onClick={() => document.getElementById("input-file").click()}>
          {image ? (
            <img src={URL.createObjectURL(image)} className='w-full h-full object-cover' />
          ) : (
            user?.profileImage ? (
              <img src={user.profileImage} className='w-full h-full object-cover' />
            ) : (
              <span>+</span>
            )
          )}
          <input type='file' accept='image/*' className='hidden' id="input-file" onChange={hdlImgChange} />
        </div>


        <div className='flex gap-2'>Username:
          {!isEdit ?
            <p>{user?.username}</p>
            :
            <input type="text" name="username" value={message.username} placeholder={user.username} onChange={hdlChange} />
          }
        </div>
        <div className='flex gap-2'>Email:
          {!isEdit ?
            <p>{user?.email}</p>
            :
            <input type="email" name="email" value={message.email} placeholder={user.email} onChange={hdlChange} />
          }
        </div>
        <div className='flex gap-2'>Firstname:
          {!isEdit ?
            <p>{user?.firstName}</p>
            :
            <input type="text" name="firstName" value={message.firstName} placeholder={user.firstName} onChange={hdlChange} />
          }
        </div>
        <div className='flex gap-2'>Lastname:
          {!isEdit ?
            <p>{user?.lastName}</p>
            :
            <input type="text" name="lastName" value={message.lastName} placeholder={user.lastName} onChange={hdlChange} />
          }
        </div>
        <button onClick={() => setIsEdit(prv => !prv)} className='btn btn-primary w-1/6'>{isEdit ? 'Save' : 'Edit'}</button>
        {isEdit && <button onClick={hdlEdit} className='btn btn-secondary w-1/6'>Submit5555</button>}
      </div>
    </div>
  );
};

export default Profile;






