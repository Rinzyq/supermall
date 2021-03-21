import {request} from "./request"

export function getHomeMultidataAxios(){
    return request({
        url:"/home/multidata"
    })
}
export function getHomeGoodsAxios(type,page){
    return request({
        url:"/home/data",
        params:{
            type,
            page
        }
    })
}