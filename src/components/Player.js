import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../apis";
import icons from "../utils/icons";
import * as actions from "../store/actions"
import moment from "moment";
import { toast } from "react-toastify";
const {
  AiOutlineHeart,
  MdOutlineMoreHoriz,
  MdSkipNext,
  MdSkipPrevious,
  CiRepeat,
  CiShuffle,
  BsPlayCircle,
  BsPauseCircle,
} = icons;

var intervalId

const Player = () => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
  const [songInfo, setSongInfo] = useState(null);
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(0)
  const [audio, setAudio] = useState(new Audio());
  const thumbRef = useRef();
  const trackRef = useRef();

  useEffect(() => {
    const fetchDetailSong = async () => {
      
      const [res1, res2] = await Promise.all([
        apis.apiGetDetailSong(curSongId),
        apis.apiGetSong(curSongId)
      ])
      if(res1.data.err === 0) {
        // console.log(res1);
        setSongInfo(res1.data.data)
      }

      if(res2.data.err === 0) {
        audio.pause()
        setAudio(new Audio(res2.data.data['128']))
      }else {
        setAudio(new Audio())
        dispatch(actions.play(false))
        toast.warn(res2.data.msg)
        audio.pause()
        setSeconds(0)
        thumbRef.current.style.cssText = `right: 100%`
      }
    };
    fetchDetailSong()
  }, [curSongId]);

  useEffect(() => {
    intervalId && clearInterval(intervalId)
    audio.pause()
    audio.load()
    if(isPlaying) {
      audio.play()
      intervalId = setInterval(() => {
        // console.log(audio.currentTime)
        let percent = Math.round(audio.currentTime * 10000 / songInfo.duration ) / 100
        thumbRef.current.style.cssText = `right: ${100 - percent}%`
        setSeconds(Math.round(audio.currentTime))
      }, 200) 
    }
  }, [audio])

  const handleTogglePlayMusic = () => {
    if(isPlaying) {
      audio.pause()
      dispatch(actions.play(false))
    } else {
      audio.play()
      dispatch(actions.play(true))
    }
  }  

  const handleClickProgressbar = (e) => {
    const trackRect = trackRef.current.getBoundingClientRect()
    const percent = Math.round((e.clientX - trackRect.left) * 10000 / trackRect.width) / 100
    thumbRef.current.style.cssText = `right: ${100 - percent}%`
    audio.currentTime = (percent * songInfo.duration) / 100
    setSeconds(Math.round((percent * songInfo.duration) / 100))
  }

  return (
    <div className="bg-main-400 px-5 h-full flex">
      <div className="w-[30%] flex-auto flex items-center gap-3">
        <img
          src={songInfo?.thumbnail}
          alt="thumbnail"
          className="w-16 h16 object-cover rounded-md"
        />
        <div className="flex flex-col ">
          <span className="font-semibold text-gray-700 text-sm">
            {songInfo?.title}
          </span>
          <span className="text-xs text-gray-500">
            {songInfo?.artistsNames}
          </span>
        </div>
        <div className="flex gap-4 text-gray-500 pl-3">
          <span>
            <AiOutlineHeart size={16} />
          </span>
          <span>
            <MdOutlineMoreHoriz size={16} />
          </span>
        </div>
      </div>
      <div className="w-[40%] flex-auto border flex gap-4 items-center justify-center flex-col border-green-400 py-2">
          <div className="flex gap-8 justify-center items-center">
            <span className="cursor-pointer" title="Bật phát ngẫu nhiên"><CiShuffle size={24}/></span>
            <span className="cursor-pointer"><MdSkipPrevious size={24}/></span>
            <span 
              className="p-1 hover:text-main-500 cursor-pointer "
              onClick={handleTogglePlayMusic}
            >
              {isPlaying ? <BsPauseCircle size={32}/> : <BsPlayCircle size={32}/>}
            </span>
            <span className="cursor-pointer"><MdSkipNext size={24}/></span>
            <span className="cursor-pointer" title="Bật phát lại tất cả"><CiRepeat size={24}/></span>
          </div>
          <div className="w-full flex items-center justify-center gap-3 text-xs">
            <span>{moment.utc(seconds * 1000).format("mm:ss")}</span>
              <div
                className="w-3/5 h-[3px] hover:h-[6px] relative bg-[rgba(0,0,0,0.1)] rounded-r-full rounded-l-full cursor-pointer"
                onClick={handleClickProgressbar}
                ref={trackRef} 
              >
                <div ref={thumbRef} className="absolute top-0 left-0 bottom-0 bg-[#0e8080] rounded-r-full rounded-l-full"></div>
              </div>
            <span>{moment.utc(songInfo?.duration * 1000).format("mm:ss")}</span>
          </div>
      </div>
      <div className="w-[30%] flex-auto border border-blue-400">Volume</div>
    </div>
  );
};

export default Player;
