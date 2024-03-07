import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Home(){
    const [count,setCount]=useState(0);
    const [startPage,setStartPage]=useState(0)
    const [endPage,setEndPage]=useState(0)
    const [totalpage,setTotalpage]=useState(0)
    const [curpage,setCurpage]=useState(1)
    const [recipeData,setRecipeData]=useState({})
    const [recipeList,setRecipeList]=useState([])
    useEffect(()=>{
       axios.get('http://localhost/recipe/list_react',{
           params:{
               page:curpage
           }
       }).then(response=>{
           console.log(response.data)
           setCount(response.data.count)
           setTotalpage(response.data.totalpage)
           setStartPage(response.data.startPage)
           setEndPage(response.data.endPage)
           setCurpage(response.data.curpage)
           setRecipeList(response.data.list)
       })
    },[curpage])
    // [{},{},{}....] for(Recipe vo:list)
    let html=recipeList.map((vo)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={"/recipe/detail/"+vo.no}>
                    <img src={vo.poster} title={vo.title} style={{"width":"100%"}}/>
                        <div className="caption">
                            <p>{vo.chef}</p>
                        </div>
                </Link>
            </div>
        </div>
    )
    // 이벤트 (버튼 클릭)
    const prevHandler=()=>{
        setCurpage(curpage>1?curpage-1:curpage)
    }
    const nextHandler=()=>{
        setCurpage(curpage<totalpage?curpage+1:curpage)
        // render() => useEffect() 재호출
    }
    return (
        <Fragment>
        <div className={"row"}>
            <h4>총 <span style={{"fontSize":"30px","color":"green"}}>{count}</span>개의 맛있는 레시피가 있습니다.</h4>
            <hr/>
        </div>
        <div className={"row"}>
            {html}
        </div>
        <div className={"row"}>
         <div className={"text-center"}>
             <input type={"button"} value={"이전"} className={"btn-sm btn-danger"} onClick={prevHandler}/>
             {curpage} page / {totalpage} pages
             <input type={"button"} value={"다음"} className={"btn-sm btn-primary"} onClick={nextHandler}/>
         </div>
        </div>
        </Fragment>
    )
}
export default Home