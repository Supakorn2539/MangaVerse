import axios from "../../config/axios";
import { useRef, useState } from "react";
import useMangaStore from "../../zustand/manga-store";

const ModalForEdit = (props) => {
  const {  setShowModal,  mangaId ,fn} = props
  const fileRef = useRef(null)
  const [files, setFiles] = useState(null)
  const [input, setInput] = useState({
    chapterTitle : "",
    description : "",
    chapterNo : "",
  })
  const addChapter = useMangaStore(state => state.addChapter)
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
       e.preventDefault()
       console.log("file",files)
    const payload = Object.values(files)
    console.log("payload",payload)

    const data = new FormData()
    payload.forEach(item => data.append('images', item))
    
    for (let key in input) {
      data.append(key,input[key])
    }
    
    await addChapter( mangaId, data)
    await fn()
    await setShowModal(false)
    } catch (err) {
      console.log(err)
    }
   

  }
  // console.log(manga)
  // console.log(input)
  return (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-3/4 max-w-2xl mx-auto p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          onClick={() => setShowModal(false)}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-4">Add Chapter</h2>

        <form className="space-y-4" onSubmit={hdlSubmit}>

          <div
            className="w-full h-64 bg-gray-100 rounded-lg flex flex-col justify-center items-center cursor-pointer border-2 border-dashed border-pink-200 hover:border-pink-300"
            onClick={() => fileRef.current.click()}
          >
            <input type="file" id="file-input" className="hidden" ref={fileRef} onChange={hdlOnChange} multiple />
            <span className="text-gray-500">Click to upload an image</span>

          </div>

          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Chapter Title</label>
            <input type="text" className="border " value={input.chapterTitle} name="chapterTitle" onChange={hdlInputChange}/>
          </div>
          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Chapter No.</label>
            <input type="text" className="border " value={input.chapterNo} name="chapterNo" onChange={hdlInputChange}/>
          </div>

          <div className="flex flex-col">
            <label className="text-pink-600 font-medium mb-1">Description</label>
            <input type="text" className="border " value={input.description} name="description" onChange={hdlInputChange}/>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-700"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 rounded-md bg-pink-500 hover:bg-pink-600 text-white ml-2"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>

  );
};

export default ModalForEdit



