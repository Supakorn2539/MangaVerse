import axios from "../../config/axios";
import { useRef, useState } from "react";
import useMangaStore from "../../zustand/manga-store";

const Modal = ({setShowModal,  id ,fn,showModal,idParams}) => {
  // console.log(id)
  const fileRef = useRef(null)
  const [files, setFiles] = useState(null)
  const [input, setInput] = useState({
    chapterTitle : "",
    description : "",
    chapterNo : "",
  })
  const addChapter = useMangaStore(state => state.addChapter)
  const [loading,setLoading] = useState(false)


  const hdlInputChange = e => {
    setInput(pre => ({
      ...pre,[e.target.name] : e.target.value
    })
    )
  }
  const hdlOnChange = e => {

    setFiles(e.target.files)
    console.log(e.target.files)
  }
  const hdlSubmit = async e => {
    try {
      setLoading(true)
       e.preventDefault()
       console.log("file",files)
    const payload = Object.values(files)
    console.log("payload",payload)

    const data = new FormData()
    payload.forEach(item => data.append('images', item))
    
    for (let key in input) {
      data.append(key,input[key])
    }
    if(showModal.action ==="ADD"){
      await addChapter( id, data)
      
    }else {
      await axios.put(`/manga/myManga/${idParams}/Chapter/${id}`,data)
    }
    await fn()
    await setShowModal(false)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
   

  }
  // console.log(manga)
  // console.log(input)
  return (
<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
  <div className="bg-white rounded-lg shadow-xl w-3/4 max-w-2xl mx-auto p-8 relative">
    <button
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition duration-150 ease-in-out"
      onClick={() => setShowModal(false)}
    >
      &times;
    </button>

    <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">{showModal.action} Chapter</h2>

    <form className="space-y-6" onSubmit={hdlSubmit}>

      <div
        className="w-full h-40 bg-gray-100 rounded-lg flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-pink-300 hover:border-pink-400 transition duration-150 ease-in-out"
        onClick={() => fileRef.current.click()}
      >
        <input type="file" id="file-input" className="hidden" ref={fileRef} onChange={hdlOnChange} multiple />
        <span className="text-gray-500 text-lg">{files && files.length > 0 ? `${files.length} file(s) selected` : "Click to upload an image"}</span>
      </div>

      <div className="flex flex-col">
        <label className="text-pink-600 font-medium mb-2">Chapter Title</label>
        <input 
          type="text" 
          className="border border-pink-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500" 
          value={showModal.action === "ADD" ? input.chapterTitle : showModal.chapterTitle} 
          name="chapterTitle" 
          onChange={hdlInputChange} 
          required 
        />
      </div>
      
      <div className="flex flex-col">
        <label className="text-pink-600 font-medium mb-2">Chapter No.</label>
        <input 
          type="text" 
          className="border border-pink-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500" 
          value={showModal.action === "ADD" ? input.chapterNo : showModal.id} 
          name="chapterNo" 
          onChange={hdlInputChange} 
          disabled={showModal.action === "EDIT"} 
          required 
        />
      </div>

      <div className="flex flex-col">
        <label className="text-pink-600 font-medium mb-2">Description</label>
        <input 
          type="text" 
          className="border border-pink-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-500" 
          value={showModal.action === "ADD" ? input.description : showModal.description} 
          name="description" 
          onChange={hdlInputChange} 
          required 
        />
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700 transition duration-150 ease-in-out"
          onClick={() => setShowModal(false)}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`py-2 px-4 rounded-md ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600 text-white'} ml-2 transition duration-150 ease-in-out`}
          disabled={loading}
        >
          {loading ? <span className="loading loading-spinner text-primary"></span> : showModal.action}
        </button>
      </div>
    </form>
  </div>
</div>



  );  
};

export default Modal
