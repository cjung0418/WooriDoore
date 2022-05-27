import Link from 'next/link';
import {useState, useEffect, useContext} from 'react';
import style from './navbar.module.css';
import { UserContext } from '../../lib/UserContext';
import Send from '../../lib/Send';
import {Router, useRouter} from "next/router"

export default function Navbar() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {userSeq, setUserSeq} = useContext(UserContext);
  const {userInfo, setUserInfo} = useContext(UserContext);

  const logout = (e) => {
    e.preventDefault();
    Send.get('/user/logout')
    .then((data) => {
      console.log(data);
      setUserSeq('');
      setUserInfo('');
      setIsLoggedIn(false);
    })
  }

  const getUserInfo = async () => {
    const data = await fetch('https://j6a305.p.ssafy.io/api/user/check');
    try {
    const temp = await data.json();
    console.log('JSON화 유저정보: ', temp);
    await setUserSeq(temp.userSeq);
    await setUserInfo(temp);
    if (temp.userSeq) {
      setIsLoggedIn(true);
    }
    } catch {
        console.log('사용자가 아닙니다');
    }
  }

  useEffect(() => {
    getUserInfo();
  }, [])


  return (
    <nav className={style.container} >
      <ul className="border-b-4">
        <li className={style.li}>
          <Link href="/main" passHref>
            <button>
              <img className="-mb-4" src="logo.png" width="50" alt="home logo" />
            </button>
          </Link>
        </li>
        <li className={style.li}>
          <Link href="/intro" passHref>
            <button className="underline decoration-4 underline-offset-8 decoration-white hover:decoration-theme-color/70">우리두레란?</button>
          </Link>
        </li>
        <li className={style.li}>
          <Link href="/upcoming" passHref>
            <button className="underline decoration-4 underline-offset-8 decoration-white hover:decoration-theme-color/70">펀딩예정</button>
          </Link>
        </li>
        <li className={style.li}>
          <Link href="/products" passHref>
            <button className="underline decoration-4 underline-offset-8 decoration-white hover:decoration-theme-color/70">후원하기</button>
          </Link>
        </li>
        <li className={style.li}>
          <Link href="/create" passHref>
            <button className="underline decoration-4 underline-offset-8 decoration-white hover:decoration-theme-color/70">프로젝트 생성</button>
          </Link>
        </li>
        <li className={style.li}>
          <div className={style.container}>
            <div className="relative flex flex-wrap items-stretch w-full mb-4 rounded input-group">
              <div className={style.li}>
                <input type="search" className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Search" aria-label="Search" aria-describedby="button-addon2" />
                
              </div>
            </div>
          </div>
        </li>
        {/* 유저 로그인 상태 */}
        {isLoggedIn && (
          <>
            <li className={style.li}>              
              <Link href={`/profile/${userSeq}`}>
                <a className="text-lg antialiased font-semibold text-theme-color">{userInfo.userNickname}</a>
              </Link>
            </li>
            <li className={style.li}>
              <Link href="/">
                <a onClick={logout}>
                  logout
                </a>
              </Link>
            </li>
          </>
        )}
        {/* 유저 로그아웃 상태 */}
        {!isLoggedIn && (
          <li className={style.li}>
            <Link href="/login">
              <a>login</a>
            </Link>
          </li>
        )}      
      </ul>
    </nav>
  )

} 