import React from 'react'
import icons from '../utils/icons'

const { HiOutlineSearch } = icons
const Search = () => {
  return (
    <div className='w-full flex items-center'>
        <span className='h-10 pl-4 flex items-center justify-center bg-[#DDE4E4] rounded-l-[20px] text-gray-500'>
            <HiOutlineSearch size={20}/>
        </span>
        <input 
            type="text" 
            className='outline-none bg-[#DDE4E4] p-2 w-full h-10 rounded-r-[20px] text-gray-500 placeholder: text-[14px]'
            placeholder='Tìm kiếm bài hát, nghệ sĩ, lời bài hát...'
        />
    </div>
  )
}

export default Search