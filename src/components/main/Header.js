import {Fragment} from "react";
import {Link} from "react-router-dom";
// jsx => javascript+xml => 태그 생성시에 문자열 결합이 없다
// 가상돔 => 메모리를 2개 (사용자 정의를 저장하는 메모리) (실제 브라우저에서 읽어 가는 메모리)
//                                                  실제돔
// 가상돔 <==> 실제돔 비교 ===> 변경된 부분만 수정 => 속도가 빠르다 / 깜박이는 효과가 없다
//       diff
// 장점 : 개발 생산성이 높다 (컴포넌트를 사용한다 => 나눠서 코딩을 한다)
// 구조가 간단하다 ... => 재사용이 좋다
// 공통 모듈을 구현
// class , function
// => 멤버변수 , 지역변수 => 메모리에 유지가 가능하게 ==> Hooks useState
/*
      class A
      {
         int a=10;
      }

      A aa=new A();
      aa.a=100;

      void aaa()
      {
         int a=10;
      }
      class => (X)  16.8
 */
function Header(){

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">
                    <Link className="navbar-brand" to={"/"}>Router연습</Link>
                </div>
                <ul className="nav navbar-nav">
                    <li className="active"><Link to={"/"}>Home</Link></li>

                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">스토어
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/goods/all"}>전체 상품</Link></li>
                            <li><Link to={"/goods/best"}>베스트 상품</Link></li>
                            <li><Link to={"/goods/special"}>특가 상품</Link></li>
                            <li><Link to={"/goods/new"}>신상품</Link></li>
                        </ul>
                    </li>
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="#">맛집
                            <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><Link to={"/food/list"}>맛집 목록</Link></li>
                            <li><Link to={"/food/find"}>맛집 검색</Link></li>
                        </ul>
                    </li>
                    <li><Link to={"/news/list"}>맛집 뉴스</Link></li>
                    <li><Link to={"/board/list"}>커뮤니티</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Header
/*
export const Header=()=>{

    return (

    )
}*/
/*
   문법 : 1. function / class => 명칭은 대문자로 한다
         html은 모두 소문자로 한다

         function Detail  / function Header
         => <Detail>       <Header>
         => html이 xml형식으로 제작 => 여는태그/닫는 태그가 동일
                                  => 루트태그가 존재
                                  => style={{}}
                                  => <input /> <img /> ...
 */
