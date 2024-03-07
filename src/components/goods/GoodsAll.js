
import {useState} from "react";
import {useQuery} from "react-query";
import axios from "axios";

const GoodsAll=()=>{
    const {isLoading,data,isError,error}=useQuery('get-recipe',()=>{
        return axios.get('http://localhost/recipe/list_react',{
               params:{
                   page:1
               }
            }
        )
    })
    if(isError) return <div>{error.message}</div>
    console.log(data.data)
    return (
        <h1 className={"text-center"}>전체 상품</h1>
    )
}
export default GoodsAll