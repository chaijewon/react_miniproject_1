import {useState,useEffect,Fragment} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";

function RecipeDetail(){

    const [recipeVO,setRecipeVO]=useState({})
    const [stuff,setStuff]=useState([])
    const [foodImg,setFoodImg]=useState([])
    const [foodMake,setFoodMake]=useState([])
    const {no}=useParams()
    const nav=useNavigate()
    // mounted() => 변경되는 데이터 ==> [변수] => 재호출
    // /detail_react?no=
    /*
         response={data:{make:[],image:[],recipe:{}}}
         response.data.recipe

         class response
         {
             data b=new data()
         }
         class B
         {
            recipe c=new recipe()
         }

         A a=new A();
         a.b.c
     */
    useEffect(() => {
        axios.get('http://localhost/recipe/detail_react',{
            params:{
                no:no
            }
        }).then(response=>{
            console.log(response)
            setRecipeVO(response.data.recipe)
            let str=response.data.recipe.stuff;
            str=str.replaceAll("구매","");
            setStuff(str.split(","))
            setFoodImg(response.data.image)
            setFoodMake(response.data.make)
        })
    }, []);
    let ss=stuff.map((s)=>
        <li>{s}</li>
    )
    let mm=foodMake.map((fm,index)=>
      <tr>
          <td className={"text-left"}>{fm}</td>
          <td className={"text-right"}>
              <img src={foodImg[index]} style={{"width":"100px","height":"60px"}}/>
          </td>
      </tr>
    )
    return (
        <div className={"row"}>
            <table className={"table"}>
                <tr>
                    <td className={"text-center"} colSpan={"3"}>
                        <img src={recipeVO.poster} style={{"width": "850px", "height": "250px"}}/>
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"} colSpan={"3"}>
                        <h3 className={"text-center"}>{recipeVO.title}</h3>
                    </td>
                </tr>
                <tr>
                    <td className={"text-center"} colSpan={"3"}>{recipeVO.content}</td>
                </tr>
                <tr>
                    <td className={"text-center"}><img src={"/icon/a1.png"}/></td>
                    <td className={"text-center"}><img src={"/icon/a2.png"}/></td>
                    <td className={"text-center"}><img src={"/icon/a3.png"}/></td>
                </tr>
                <tr>
                    <td className={"text-center"}>{recipeVO.info1}</td>
                    <td className={"text-center"}>{recipeVO.info2}</td>
                    <td className={"text-center"}>{recipeVO.info3}</td>
                </tr>
            </table>
            <table className={"table"}>
                <caption><h3>재료</h3></caption>
                <tr>
                    <td>
                        <ul>
                            {ss}
                        </ul>
                    </td>
                </tr>
            </table>
            <table className={"table"}>
                <caption><h3>요리방법</h3></caption>
                <tbody>
                {mm}
                </tbody>
            </table>
            <table className={"table"}>
                <caption><h3>쉐프정보</h3></caption>
                <tr>
                    <td className={"text-center"} rowSpan={"2"} width={"30%"}>
                        <img src={recipeVO.chef_poster} style={{"width":"80px","height":"60px"}}/>
                    </td>
                    <td width="70%">{recipeVO.chef}</td>
                </tr>
                <tr>
                    <td width={"70%"}>{recipeVO.chef_profile}</td>
                </tr>
            </table>
            <table className={"table"}>
                <tr>
                    <td className={"text-right"}>
                        <button className={"btn-sm btn-primary"}
                        onClick={()=>nav(-1)}
                        >목록</button>
                    </td>
                </tr>
            </table>
        </div>
    )
}

export default RecipeDetail