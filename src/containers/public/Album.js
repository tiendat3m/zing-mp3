import React from 'react'
import { useParams } from 'react-router-dom'

const Album = () => {

    const { title, pid } = useParams
    console.log({title, pid})
  return (
    <div>

    </div>
  )
}

export default Album
