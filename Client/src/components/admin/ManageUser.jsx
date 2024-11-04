// import React, { useEffect, useState } from 'react'
// import useAuthStore from '../../zustand/auth-store'
// import { useNavigate } from 'react-router-dom'
// import axios from '../../config/axios'
// import Swal from 'sweetalert2'

// const ManageUser = () => {
//     const navigate = useNavigate()
//     const user = useAuthStore(state => state.user)
//     const currentUser = useAuthStore(state => state.currentUser)
//     // console.log(user)
//     const [member,setMember] = useState([])
    
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const result = await currentUser()
//                 const res = await axios.get("/admin/getUser")
//                 console.log(res.data)
//                 setMember(res.data.member)
//                 // console.log(result.data.user.role)
//                 if (result.data.user.role !== "ADMIN") {
//                     navigate("*")
//                 }
//             } catch (err) {
//                 console.log(err)
//             }
//         }
//         fetchData()
//     }, [])
    
//     const hdlRemoveMember = async(userId) => {
//         const res = await axios.delete(`/admin/member/${userId}`)
//         Swal.fire("Already Delete User")
//         fetchData()
//     }
//     const hdlUpdateMember = async(userId,role,isActive) =>{
//         const body = {role , isActive}
//         const res = await axios.patch(`/admin/member/${userId}`,body)
//         Swal.fire("Already Updated")
//         fetchData()
//     }
//     // console.log(user)
//     //     if(user.role !== "ADMIN"){
//     //     navigate("*")
//     // }
//     return (
//         <div className="overflow-x-auto min-h-screen">
//         <table className="table">
//           {/* head */}
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>IsActive</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* row 1 */}
//             {
//               member?.map((el,index)=>(<tr key={index} className='hover:bg-black'>
//                 <td>{(index)+1}</td>
//                 <td>{el.email}</td>
//                 <td>
//                   {/* {el.role} */}
//                   <select defaultValue={el.role} onChange={(e)=>hdlUpdateMember(el.id,e.target.value,el.isActive)}>
//                     <option>ADMIN</option>
//                     <option>USER</option>
//                   </select>
//                 </td>
//                 <td>
//                     <select defaultValue={el.isActive} onChange={(e)=>hdlUpdateMember(el.id, el.role, e.target.value === 'true')}>
//                         <option>true</option>
//                         <option>false</option>
//                     </select>
//                 </td>
//                 <td><button className="btn btn-primary hover:opacity-40" onClick={()=>{hdlRemoveMember(el.id)}}>Delete</button></td>
//               </tr>)
//             )}
            
           
//           </tbody>
//         </table>
//       </div>
//     )
// }

// export default ManageUser

import React, { useEffect, useState } from 'react'
import useAuthStore from '../../zustand/auth-store'
import { useNavigate } from 'react-router-dom'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

const ManageUser = () => {
    const navigate = useNavigate()
    const user = useAuthStore(state => state.user)
    const currentUser = useAuthStore(state => state.currentUser)
    const [member, setMember] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await currentUser()
                const res = await axios.get("/admin/getUser")
                setMember(res.data.member)
                if (result.data.user.role !== "ADMIN") {
                    navigate("*")
                }
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [navigate, currentUser])

    const hdlRemoveMember = async (userId) => {
        await axios.delete(`/admin/member/${userId}`)
        Swal.fire("User Deleted")
        fetchData()
    }

    const hdlUpdateMember = async (userId, role, isActive) => {
        const body = { role, isActive }
        await axios.patch(`/admin/member/${userId}`, body)
        Swal.fire("User Updated")
        fetchData()
    }

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="container mx-auto">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">Manage Users</h2>
                <div className="overflow-x-auto shadow-lg rounded-lg">
                    <table className="table-auto w-full bg-white rounded-lg shadow-sm">
                        {/* Table Head */}
                        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <tr>
                                <th className="py-3 px-6 text-left">ID</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-center">Role</th>
                                <th className="py-3 px-6 text-center">Active Status</th>
                                <th className="py-3 px-6 text-center">Actions</th>
                            </tr>
                        </thead>

                        {/* Table Body */}
                        <tbody className="text-gray-600 text-sm font-light">
                            {member?.map((el, index) => (
                                <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
                                    <td className="py-3 px-6 text-left">{index + 1}</td>
                                    <td className="py-3 px-6 text-left">{el.email}</td>
                                    <td className="py-3 px-6 text-center">
                                        <select
                                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                                            defaultValue={el.role}
                                            onChange={(e) => hdlUpdateMember(el.id, e.target.value, el.isActive)}
                                        >
                                            <option>ADMIN</option>
                                            <option>USER</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <select
                                            className="bg-gray-100 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-blue-400"
                                            defaultValue={el.isActive}
                                            onChange={(e) => hdlUpdateMember(el.id, el.role, e.target.value === 'true')}
                                        >
                                            <option value={true}>Active</option>
                                            <option value={false}>Inactive</option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-6 text-center">
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                                            onClick={() => hdlRemoveMember(el.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageUser
