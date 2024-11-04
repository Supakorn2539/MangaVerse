import React from 'react'
import { FaSquareFacebook, FaInstagram, FaLine } from "react-icons/fa6"
import { MdEmail } from "react-icons/md";
const UserFooter = () => {
  return (
    <footer className="bg-pink-200 text-gray-800 py-6 ">
      <div className="   gap-6 text-center  flex justify-around">
        <div>
          <h3 className="font-bold">ขับเคลื่อนและพัฒนาโดยชุมชน 100%:</h3>
          <ul className="mt-2">
            <li><a href="https://www.facebook.com/Midnight.LvMAX" className="hover:underline flex gap-3"><FaSquareFacebook className="hover:text-gray-300 text-3xl" />MangaVerseXLevelMax</a></li>
            <li><a href="mailto:support@MangaVerse.co" className="hover:underline flex gap-3"><MdEmail className='text-3xl' />support@MangaVerse.co</a></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold">นักอ่าน</h3>
          <ul className="mt-2">
            <li>นิยาย</li>
            <li>การ์ตูน</li>
            <li>นักเขียน</li>
          </ul>
        </div>

      </div>
    </footer>
  )
}

export default UserFooter
