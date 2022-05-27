import Router from 'next/router';
import { useEffect } from 'react';
import axios from 'axios';

export default function Login() {
  
  const toKakao = () => {

    Router.push("http://j6a305.p.ssafy.io:9999/api/oauth2/authorization/kakao");
  }

  const toNaver = () => {
    Router.push("http://j6a305.p.ssafy.io:9999/api/oauth2/authorization/naver");
  }

  const toGoogle = () => {
    Router.push("http://j6a305.p.ssafy.io:9999/api/oauth2/authorization/google");
  }

  
  return (
    <main className="flex flex-col gap-[4rem] items-center mt-[5rem] mb-[10rem]">
      <h1 className="font-sans text-4xl antialiased text-center ">우리 두레의 회원이 되어<br />당신만의 펀딩을 시작하세요.</h1>
      <section className="flex flex-col gap-[1rem]">
        <div>
          <label className="inline-flex items-center gap-[2rem]">
            <input type="checkbox" className="form-checkbox accent-theme-color" />
            <span className="ml-2 text-sm">우리두레 회원가입 기본/필수 약관 <br /> 개인정보 취급방침 동의 (필수)</span>
            <button>전문보기</button>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center gap-[2rem]">
            <input type="checkbox" className="form-checkbox accent-theme-color" />
            <span className="ml-2 mr-1.5 text-sm ">우리두레 서비스의 다양한 소식과 <br /> 이벤트 알람 (선택)</span>
            <button>전문보기</button>
          </label>
        </div>
        <hr className="mt-[2.5rem] mb-[-1.5rem] border-black/20" />
      </section>

      <img className="hover:cursor-pointer mt-[1rem]" src="/kakao.png" alt="카카오로그인버튼" onClick={toKakao} />
      <section className="separator my-[-2rem]">
        <div className="text-white line">------------------------------------------</div>
          <h2>또는</h2>
        <div className="text-white line"></div>
      </section>
      <section className="flex flex-row justify-center gap-[2.5rem] mt-[-0.5rem]">
        <div className="flex flex-row items-center gap-[0.5rem]">
          <img className="hover:cursor-pointer" src="/naver.png" width="40px" alt="네이버로그인버튼" onClick={toNaver} />
          <p className="text-sm">네이버로 시작하기</p>
        </div>
        <div className="flex flex-row items-center gap-[1rem]">
          <img className="hover:cursor-pointer" src="/google.svg" alt="구글로그인버튼" onClick={toGoogle} />
          <p className="text-sm">구글로 시작하기</p>
        </div>
      </section>
    </main>
  )
}