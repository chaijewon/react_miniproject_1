import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";

function FoodDetail(){
    let {fno}=useParams()
    return (
        <h1 className={"text-center"}>선택된 맛집 번호:{fno}</h1>
    )
}
export default FoodDetail