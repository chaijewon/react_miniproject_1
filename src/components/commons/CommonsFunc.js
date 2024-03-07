import {useQuery} from "react-query";
import axios from "axios";
function CommonsFunc(url,params){
    const {data}=useQuery('get-data',()=>{
        return axios.get(url,{
            params:params
        })
    })
    return data
}
export default CommonsFunc