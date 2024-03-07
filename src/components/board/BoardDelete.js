import {useState,useRef} from "react";
import axios from "axios";
import {useParams, useNavigate, Link} from "react-router-dom";


function BoardDelete(){
    const {no} = useParams()
    const nav=useNavigate()
    const [pwd,setPwd]=useState('')
    const pwdRef=useRef(null)
    const pwdChange=(e)=>{
        setPwd(e.target.value)
    }
    const boarddel=()=>{
        if(pwd.trim()==="")
        {
            pwdRef.current.focus()
            return
        }
        axios.post('http://localhost/board/delete_react',null,{
            params:{
                pwd:pwd,
                no:no
            }
        }).then(response=>{
            if(response.data==='yes')
            {
                window.location.href="/board/list"
            }
            else
            {
                alert("비밀번호가 틀립니다")
                setPwd('')
                pwdRef.current.focus()
            }
        })
    }
    return (
        <div className={"row row1"}>
            <table className={"table"}>
                <tbody>
               <tr>
                 <td>
                     비밀번호:<input type={"password"} className={"input-sm"}
                                 onChange={pwdChange}
                                 ref={pwdRef} value={pwd}
                     />
                 </td>
               </tr>

                <tr>
                   <td className={"text-center"}>
                       <input type={"button"} value={"삭제"}
                              className={"btn btn-sm btn-danger"} onClick={boarddel}/>
                       <button className={"btn btn-sm btn-danger"}
                         onClick={()=>nav(-1)}
                       >취소</button>
                   </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BoardDelete