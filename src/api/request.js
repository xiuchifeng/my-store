import axios from "axios"
// 接口不方便暴露不然容易崩..
//接口是别人那拿的
// axios.defaults.baseURL="http://123.207.32.32:8000/api/wh"
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
