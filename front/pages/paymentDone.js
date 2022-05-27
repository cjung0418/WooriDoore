import Link from 'next/link';
import {UserContext} from '../lib/UserContext';
import { useContext, useEffect, useState } from 'react';
import Image from 'next/image';

export default function PaymentDone() {

  const {userSeq, setUserSeq} = useContext(UserContext);
  const [useSeq, setUseSeq] = useState(userSeq);

  return (
    <div className="flex justify-center" style={{marginTop: "-30px"}}>
      <div className="border-4 border-[#6667AB]/[.6] p-10 shadow-lg mt-[5rem]">
        <div className="flex justify-center mb-5 w-[40rem]">
          <Image width="400rem" height="260rem" src="/shrimpJang.webp" alt="" />
        </div>
        <div className="flex justify-center my-[3rem]">
          <h2 className="text-2xl antialiased font-semibold">🎉 후원해주셔서 감사합니다! 🎉</h2>
        </div>
        <div className="flex justify-around">
          <Link href="/main" passHref>
            <div className="flex cursor-pointer border-[2.5px] border-[#6667AB] rounded-full pl-[10px] pr-3 py-[2px]">
              <img className="w-10 mr-[6px]" src="/logo.png" alt="" />
              <button className="">홈으로</button>
            </div>
          </Link>
          <Link href={`/profile/${useSeq}`} passHref>
          <div className="flex cursor-pointer items-center border-[2.5px] border-[#6667AB] rounded-full pl-[12.5px] pr-3 py-[1.5px]">
              <img className="w-7 h-[25px] mr-2 mb-[1px]" src="/mypage.png" alt="" />
              <button className="">마이페이지로</button>
            </div>
          </Link>

        </div>
      </div>
    </div>
  )
}