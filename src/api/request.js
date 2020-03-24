import axios from "axios"
// "http://123.207.32.32:8000/api/wh" 
// "http://106.54.54.237:8000/api/wh" 
axios.defaults.baseURL="http://123.207.32.32:8000/api/wh"
axios.interceptors.response.use(res=>res.data)

export default function Myaxios(url,data={},method="get"){
    return new Promise(resolve=>{
        let p = null
        if (method === 'get') { //如果请求是get方式
            p = axios.get(url, {
                params:data
            })
        } else {
            p = axios.post(url, data)
        }

        p.then(res=>{
            resolve(res)
        })
    })
}