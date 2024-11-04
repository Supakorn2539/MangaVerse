import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ChapterManage from './ChapterManage'

const ChapterSelect = () => {
    const {mangaId} = useParams()
    const [isViewOnly, setIsViewOnly] = useState(false)
  return (
    <div>
      <ChapterManage isViewOnly={true}/>
    </div>
  )
}

export default ChapterSelect
