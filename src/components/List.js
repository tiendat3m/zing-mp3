import moment from 'moment'
import React, {memo} from 'react'
import icons from '../utils/icons'
import { useDispatch } from 'react-redux'
import * as actions from '../store/actions'

const { BsMusicNoteBeamed } = icons

const List = ({songData}) => {
    const dispactch = useDispatch()
    // console.log(songData)
  return (
    <div 
        className='flex justify-between items-center p-[10px] border-t border-[rgba(0,0,0,0.05)] hover:bg-[#DDE4E4] cursor-pointer'
        onClick={() => {
            dispactch(actions.setCurSongId(songData?.encodeId))
            dispactch(actions.play(true))
        }}
    >
        <div className='flex items-center gap-3 flex-1'>
            <span><BsMusicNoteBeamed/></span>
            <img src={songData?.thumbnail} alt="thumbnailM" className='w-10 object-cover h-10 rounded-md'/>
            <span className='flex flex-col w-full'>
                <span className='text-sm fonts-semibold'>{songData?.title?.length > 30 ? `${songData?.title?.slice(0,30)}...`: songData?.title}</span>
                <span className='text-[12px]'>{songData?.artistsNames}</span>
            </span>
        </div>
        <div className='flex-1 flex items-center justify-between'>
            <div className='flex '>
                {songData?.album?.title?.length > 30 ? `${songData?.album?.title?.slice(0,30)}...`: songData?.album?.title}
            </div>
            <div className='flex justify-end'>
                {moment.utc(songData?.duration * 1000).format("mm:ss")}
            </div>
        </div>
    </div>
  )
}

export default memo(List)
