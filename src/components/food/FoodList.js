import {Fragment,useState,useEffect} from "react";
import axios from "axios";
/* global kakao */

/*
   Hooks = function단위
   상태관리 (데이터 관리) => state (변경이 가능한 변수) => vue (data(){})
                          props (변경이 불가능한 변수)

                          => state : useState()
                          => props : 함수의 매개변수
                             function Detail(props)

   useState :  프로그램 종료시까지 유지
   생명 주기
      class App extends Component
      {
          constructor(){
            => state변수
            => 이벤트 등록
          }
          componentWillMount(){}
          componentDidMount(){} == mounted() window.onload
          componentWillUpdate(){}
          componentDidUpdate(){} == state가 변경이 될때
      }
      function App()
      {
          state ==> useState
          componentDidMount(){} ==> useEffect()
          componentDidUpdate() => 사용이 가능
      }

      useEffect(()=>{
         처리 내용 => 서버 연결 => axios , fetch
                                ====== 동기,비동기
                                aync axios
      },[]) => 한번만 수행
      useEffect(()=>{
         처리 내용 => 서버 연결 => axios , fetch
                                ====== 동기,비동기
                                aync axios
      },[page]) => page가 변경이 될때 재호출

      최적화
       useMemo / useCallback
      공통 모듈
       useContext
      URL을 이용해서 값을 받는 경ㅇ
       useParams
      => useReducer ==> MVC (Redux ***)
      input의 데이터를 참조 : useRef

      1. 변수 설정
      2. 데이터 초기화
      3. return 에 있는 html을 => index.html로 전송
      4. 데이터가 변경시에 return을 수행
      ===========================================
       압축 => webpack
 */
function FoodList(){
    const [curpage,setCurpage]=useState(1)
    const [startPage,setStartPage]=useState(0)
    const [endPage,setEndPage]=useState(0)
    const [totalpage,setTotalpage]=useState(0)
    const [foodList,setFoodList]=useState([])
    const [foodDetail,setFoodDetail]=useState({})
    const [open,setOpen]=useState(false)

    // 값을 서버로부터 값을 받는다
    useEffect(() => {
        axios.get('http://localhost/food/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            setFoodList(response.data.list)
            setCurpage(response.data.curpage)
            setTotalpage(response.data.totalpage)
            setStartPage(response.data.startPage)
            setEndPage(response.data.endPage)
        })
    }, [curpage]);
    useEffect(()=>{
        const script=document.createElement("script")
        // <script src=""></script>
        script.async=true
        script.src="//dapi.kakao.com/v2/maps/sdk.js?appkey=9965c727d3306713c47391be682e4be9&autoload=false&libraries=services"
        document.head.appendChild(script)
        /*
            <head>
             <script src=""></script>
            </head>
         */
        script.onload=()=>{
            kakao.maps.load(()=>{
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };

                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(foodDetail.address, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style="width:150px;text-align:center;padding:6px 0;">'+foodDetail.name+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        }
    },[foodDetail])
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prevHandler=()=>{
        setCurpage(startPage-1)
    }
    const nextHandler=()=>{
        setCurpage(endPage+1)
    }
    const onFoodDetail=(vo)=>{
        setOpen(true)
        setFoodDetail(vo)

    }
    let html=foodList.map((vo) =>
        <div className="col-md-4">
            <div className="thumbnail">
                    <img src={'http://www.menupan.com' + vo.poster} style={{"width": "100%"}}
                     onClick={()=>onFoodDetail(vo)}
                    />
                    <div className="caption">
                        <p>{vo.name}</p>
                    </div>
            </div>
        </div>
    )
    let row=[]
    if(startPage>1)
    {
        row.push(<li><a href={"#"} onClick={()=>prevHandler()}>&laquo;</a></li>)

    }
    for(let i=startPage;i<=endPage;i++)
    {
        if(curpage===i)
        {
            row.push(<li className={"active"}><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
        else
        {
            row.push(<li><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }

    }
    if(endPage<totalpage)
    {
        row.push(<li><a href={"#"} onClick={()=>nextHandler()}>&raquo;</a></li>)
    }

    return (
        <Fragment>
        <div className={"row"}>
            <div className={"col-sm-8"}>
                {html}
                <div style={{"height":"20px"}}></div>
                <div className={"text-center"}>
                    <ul className={"pagination"}>
                        {row}
                    </ul>

                </div>
            </div>
            <div className={"col-sm-4"}>
                {open ? <Detail vo={foodDetail}/> : null}
                <div style={{"height": "10px"}}></div>
                <Maps/>
            </div>
        </div>

        </Fragment>
    )
}
function Maps()
{
    return (
        <div id="map" style={{"width": "100%", "height": "350px"}}></div>
    )
}

// state => useState , props => property => 태그의 속성을 이용해서 값을 가지고 온다
// 메인 => function ==> 여러개의  function을 사용할 수 있다
// 연결시에 반드시 props를 이용한다
function Detail(props) {
   return (
       <table className={"table"}>
           <tbody>
           <tr>
               <td colSpan={"2"} className={"text-center"}>
                   <img src={"http://www.menupan.com" + props.vo.poster} style={{"width": "100%"}}/>
               </td>
           </tr>
           <tr>
               <td colSpan={"2"}>
                   <h3>{props.vo.name}&nbsp;<span style={{"color": "orange"}}>{props.score}</span></h3>
               </td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>주소</td>
               <td width={"75%"}>{props.vo.address}</td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>전화</td>
               <td width={"75%"}>{props.vo.phone}</td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>음식종류</td>
               <td width={"75%"}>{props.vo.type}</td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>가격대</td>
               <td width={"75%"}>{props.vo.price}</td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>영업시간</td>
               <td width={"75%"}>{props.vo.time}</td>
           </tr>
           <tr>
               <td width={"25%"} className={"text-center"}>좌석</td>
               <td width={"75%"}>{props.vo.seat}</td>
           </tr>
           </tbody>
       </table>
   )
}

export default FoodList