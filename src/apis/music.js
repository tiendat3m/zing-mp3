import axios from "../axios";

export const apiGetSong = (sid) => new Promise( async(resolve, reject) => {
    try {
        const response = await axios({
            url: '/song',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailSong = (sid) => new Promise( async(resolve, reject) => {
    try {
        const response = await axios({
            url: '/infosong',
            method: 'get',
            params: {id: sid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetDetailPlaylist = (pid) => new Promise( async(resolve, reject) => {
    try {
        const response = await axios({
            url: '/getdetailplaylist',
            method: 'get',
            params: {id: pid}
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
}) 