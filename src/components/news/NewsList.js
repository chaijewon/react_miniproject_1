import {Fragment,useState,useEffect,useRef} from "react";
import {useParams,useNavigate} from "react-router-dom";
import axios from "axios";

function NewsList(){
    const nav=useNavigate()
    const [fd,setFd]=useState('맛집')
    const [newsList,setNewsList]=useState([])
    const fdRef=useRef(null)
    useEffect(() => {
        axios.get('http://localhost/news/list_react',{
            params:{
                fd:fd
            }
        }).then(response=>{
            console.log(response.data)
            setNewsList(response.data.items)
        })
    }, []);
    const fdChange=(e)=>{
        setFd(e.target.value)
    }
    const newsFind=()=>{
        if(fd.trim()==="")
        {
            fdRef.current.focus()
            return
        }
        axios.get('http://localhost/news/list_react',{
            params:{
                fd:fd
            }
        }).then(response=>{
            console.log(response.data)
            setNewsList(response.data.items)
        })
    }
    let html=newsList.map((news)=>
       <table className={"table"}>
           <tbody>
           <tr>
               <td><a href={news.link}><h3 style={{"color":"orange"}} dangerouslySetInnerHTML={{__html: news.title}}></h3></a></td>
           </tr>
           <tr>
               <td dangerouslySetInnerHTML={{__html: news.description}}></td>
           </tr>
           </tbody>
       </table>
    )
    return (
        <>
        <div className={"row"}>
           <table className={"table"}>
               <tbody>
                 <tr>
                     <td>
                         <input type={"text"} size={"20"} className={"input-sm"}
                           ref={fdRef} value={fd} onChange={fdChange}
                         />
                         <input type={"button"} value={"검색"}
                           className={"btn btn-sm btn-primary"}
                           onClick={newsFind}
                         />
                     </td>
                 </tr>
               </tbody>
           </table>
        </div>
        <div className={"row"}>
           <table className={"table"}>
               <tbody>
                 <tr>
                     <td>{html}</td>
                 </tr>
               </tbody>
           </table>
        </div>
        </>
    )
}
export default NewsList