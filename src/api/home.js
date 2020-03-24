import request from "./request.js"

//轮播图数据
export const reqHomeImg=()=>request("/home/multidata")

//请求home组件的推荐数据
export const reqHomeGoods = (type,page)=>request('/home/data',{type,page})