import styles from '../styles/Home.module.css'
import { Fade, Slide, Flip, JackInTheBox, Bounce, Rotate } from "react-awesome-reveal";
import Router from 'next/router';
import Head from 'next/head'

export default function index() {

  const goToLogin = () => {
    Router.push('/login')
  }

  return (
    <>
      <Head>
        <title>우리두레</title>
        <link rel="icon" href="/logo.png" />
      </Head>
    <div style={{margin: "auto", marginBottom: "200px", width: "70%"}}>
      <Fade>
        <h1 className="text-4xl antialiased font-semibold text-left text-gray-700 mb-10">"판매자를 어떻게 믿어요 ㅠㅠ"</h1>
      </Fade>
      <Slide direction={'up'}>
        <h1 className="text-4xl antialiased font-semibold text-right text-gray-700 mb-40">"또 플랫폼은요?"</h1>
      </Slide>
      <Flip>
        <h1 className="text-4xl antialiased font-semibold text-center text-gray-700 mb-10">.</h1>
        <h1 className="text-4xl antialiased font-semibold text-center text-gray-700 mb-10">.</h1>
        <h1 className="text-4xl antialiased font-semibold text-center text-gray-700 mb-60">.</h1>
      </Flip>
      <JackInTheBox fraction={0.8}>
        <h1 className="text-5xl antialiased font-bold text-center text-gray-700 mb-40">그런 당신을 위한 단 하나의 플랫폼</h1>
      </JackInTheBox>
      <Bounce fraction={0.8} triggerOnce={true}>
        <img style={{margin: "auto", marginBottom: "2rem"}} src="/wd.webp" width="400px" alt="우리 두레" />
        <h1 className="text-7xl antialiased font-bold text-center text-gray-700 mb-80">우리 두레</h1>
      </Bounce>

      <Bounce>
        <h1 className="text-5xl antialiased font-bold text-center text-gray-700 mb-60">어떻게 사용하냐고요?</h1>
      </Bounce>

      <Bounce>
        <h1 className="text-5xl antialiased font-bold text-center text-gray-700 mb-80">걱정 마세요!</h1>
      </Bounce>

      <Fade fraction={0.8}>
        <h1 className="text-4xl antialiased font-bold text-left text-gray-700 mb-20">1. 메타마스크 지갑을 준비해요.</h1>
      </Fade>
      <iframe width="800" height="400" src="https://www.youtube.com/embed/dHANMtxLXt0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

      <h1 className="text-4xl mt-60 antialiased font-bold text-right text-gray-700 mb-20">2. 네이버, 카카오, 구글 <br/> 어떤 것이든 이용하실 수 있어요.</h1>
      <div style={{margin: "auto", marginBottom: "2rem", marginLeft: "max(50%, 400px)"}}>
        <Fade>
          <img style={{border: "1px solid grey", borderRadius: "10%"}} src="/login-page.jpg" width="600px" alt="우리 두레" />
        </Fade>
      </div>

      <div>
        <Fade fraction={0.8}>
          <h1 className="text-4xl mt-48 antialiased font-bold text-left text-gray-700 mb-20">3. 지갑으로 확인을 누르시면 <br/> 펀딩을 생성할 수 있어요.</h1>
        </Fade>
      </div>
      <div style={{margin: "auto", marginBottom: "2rem", marginRight: "-30px"}}>
        <Fade fraction={0.3}>
          <img style={{border: "1px solid grey"}} src="/intro/creation.jpg" width="600px" alt="우리 두레" />
        </Fade>
      </div>

      <div>
        <Bounce fraction={0.8}>
          <h1 className="text-4xl mt-48 antialiased font-bold text-right text-gray-700 mb-20">4. 옵션 개수를 선택해 주세요</h1>
        </Bounce>
      </div>
      <div style={{margin: "auto", marginBottom: "2rem", marginLeft: "max(50%, 400px)"}}>
        <Bounce fraction={0.3}>
          <img style={{border: "1px solid grey"}} src="/intro/buy.jpg" width="600px" alt="우리 두레" />
        </Bounce>
      </div>


      <JackInTheBox fraction={0.8}>
        <h1 onClick={goToLogin} className="mt-64 cursor-pointer text-5xl antialiased font-bold text-center text-gray-700 mb-8">자, 그럼 시작해볼까요?!</h1>
      </JackInTheBox>

      <Bounce fraction={1}>
        <h1 className="mt-16 text-2xl antialiased font-bold text-center text-gray-700 mb-40">↑ 클릭!</h1>
      </Bounce>

      
      
    </div>
  </>
  )
}