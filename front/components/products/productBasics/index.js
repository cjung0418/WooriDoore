import Link from 'next/link';
import Image from 'next/image';
import {useRouter} from "next/router";
import Router from "next/router"

import {useEffect, useContext, useState} from 'react';
import {follow, unfollow} from '../../../lib/User.js';
import CustomButton from '../../ui/button/button.js';

import {UserContext} from "../../../lib/UserContext";
import contractGetter from '../../../lib/ContractGetter';

const ProductBasics = ({src, fundInfo}) => {
  const router = useRouter()

  const {userSeq, setUserSeq} = useContext(UserContext);  // 현 유저의 userSeq 값

  const [getAlarm, setGetAlarm] = useState(false);        // 보여주기용 알람 버튼 토글 상태값
  const [like, setLike] = useState(false);                // 찜 버튼 토글 상태 값
  const [seller, setSeller] = useState(fundInfo.userSeq);
  const [overall, setOverall] = useState('0 ETH');           // 현재까지의 모금액 총계
  const [fundRatio, setFundRatio] = useState('0%');         // 현재까지 몇 퍼센트가 모였는지 알려주는 string
  const [following, setFollowing] = useState(false);

  const toggleFollowing = (e) => {
    e.preventDefault();
    setFollowing(!following);
  }

  const toggleLike = (e) => {
    e.preventDefault();
    setLike(!like);
  }

  const checkOut = (e) => {
    e.preventDefault();
    if (userSeq) {
      Router.push("/order");
    } else {
      Router.push("/login");
    }
  }

  const toLoginPage = (e) => {
    e.preventDefault();
    Router.push("/login");   // 회원가입 페이지로 라우트
  }

  useEffect(async () => {
    console.log("fundinfo", fundInfo.fundingContract)
    const contract = await contractGetter(fundInfo.fundingContract)
    const _overall = await contract.getOverall()
    const _target = await contract.getTargetAmount()
    setOverall((Number(BigInt(_overall._hex) / BigInt(1e15)) / 1000).toString() + ' ETH') // 전체 모금액 설정
    setFundRatio((BigInt(_overall._hex) * 100n / BigInt(_target._hex)).toString() + '%')  // 몇 퍼센트 모았는지 설정
  }, [])

  return (
    <header className="flex flex-row justify-center gap-[10rem]">
      <section>
        <Image src={src} alt="thumbnail" width="470px" height="300px" />
        {/* <Image width="470px" height="300px" src="/productImg.jpg" alt="펀드 썸네일 사진" /> */}
      </section>
      <section className="flex flex-col gap-[2rem] w-96">
        <h2>{fundInfo.fundingTitle}</h2>
        <div>
          <div className="w-full mt-4 bg-gray-200 rounded-full dark:bg-gray-700">
            <div className="p-1 rounded-full bg-theme-color" style={{width: fundRatio}}></div>
          </div>
          <p>{fundRatio} 달성 ({overall})</p>
        </div>
        <p>매우 간편한 설명! : {fundInfo.fundingSimple}</p>
        <div className="flex flex-row justify-evenly gap-[3rem]">
          <Link href={'/order/'} passHref>
            <CustomButton func={checkOut} text="펀딩하기" classNameProp="w-48 py-[0.5rem] bg-theme-color text-white font-black antialiased text-xl justify-self-center" />
          </Link>
          <button onClick={toggleLike} className="w-48 py-[0.5rem] border-2 text-gray-600 font-black antialiased text-xl justify-self-center "><span className={like ? "text-theme-color/70 font-black" : "hidden"}>♡ </span>{like ? <span>찜콕~!</span> : <span>찜하기</span>}</button>
        </div>
        <div className="flex flex-row justify-evenly">
          <p className="basis-1/2">파트너 정보:
            <button onClick={()=>router.push(`/profile/${fundInfo.userSeq}`)}>{fundInfo.userNickname}</button>
          </p>
          <div className="flex flex-row justify-end gap-[1rem] basis-1/2">  
            {/* 팔로우 버튼 토글 애니매이션 폭망. 다시짜야함  */}
            <button 
              onClick={userSeq ? toggleFollowing : toLoginPage} 
              className={`${userSeq && following ? "bg-theme-color text-white" : "text"} w-[4.5rem] py-[1px] antialiased border-2 justify-self-center rounded-lg hover:border-theme-color`}
            >
              {following ? <span>팔로잉</span> : <span>팔로우</span> }
            </button>
          </div>
        </div>
      </section>
    </header>
  )
}

export default ProductBasics;