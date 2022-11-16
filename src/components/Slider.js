import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getArraySlider } from '../utils/fn'
import * as actions from '../store/actions'

const Slider = () => {
    const { banner } = useSelector(state => state.app)
    const dispatch = useDispatch()

    useEffect(() => {
        const sliderEls = document.getElementsByClassName("slider-item")
        let min = 0;
        let max = 2;
        const intervalId = setInterval(() => {
            const list = getArraySlider(min, max, sliderEls.length - 1)
            // console.log(list)
            for(let i = 0; i < sliderEls.length; i++) {
                sliderEls[i]?.classList?.remove('animate-slide-right', 'order-last', 'z-20')
                sliderEls[i]?.classList?.remove('animate-slide-left', 'order-first', 'z-10')
                sliderEls[i]?.classList?.remove('animate-slide-left2', 'order-2', 'z-10')

                if(list.some(item => item === i)) {
                    sliderEls[i].style.cssText = `display: block`
                } else {
                    sliderEls[i].style.cssText = `display: none`
                }
            }    
            list.forEach((item) => {
                if(item === max) {
                    sliderEls[item]?.classList.add('animate-slide-right', 'order-last', 'z-20');
                }else if(item === min) {
                    sliderEls[item]?.classList.add('animate-slide-left', 'order-first', 'z-10')
                }else {
                    sliderEls[item]?.classList.add('animate-slide-left2', 'order-2', 'z-10')
                }
            })

            if( min === sliderEls.length - 1) {
                min = 0
            }else {
                min+=1
            }
            if( max === sliderEls.length - 1) {
                max = 0
            }else {
                max+=1
            }

        }, 3000)
        return () => {
            intervalId && clearInterval(intervalId)
        }
    }, [])


    const handleClickBanner = (item) => {
        if(item.type === 1) {
            dispatch(actions.setCurSongId(item.encodeId))
            dispatch(actions.play(true))
        } else if(item.type === 4) {
            
        }
    }

    return (
        <div className='flex gap-4 w-full overflow-hidden px-[59px] pt-8'>
            {banner.map((item, index) => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img 
                    key={item.encodeId}
                    src={item.banner} 
                    className={`slider-item flex-1 object-contain w-1/3 rounded-lg ${index <= 2 ? 'block' : 'hidden'}`}
                    onClick={() => handleClickBanner(item)}
                />
            ))}
        </div>
    )
    }

export default Slider