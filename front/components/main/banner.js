import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner() {
  return (
    <div style={{marginTop: "-80px", height: "280px"}}>
      <Carousel autoPlay showThumbs={false} infiniteLoop>
        <div>
          <img style={{ height: "280px" }} alt="" src="/dimsum.jfif" />
          <p className="text-white mt-[-130px] ml-[92px] font-semibold absolute" style={{fontSize: "20px"}}>대만 현지의 맛 그대로</p>
          <p className="text-white mt-[-100px] ml-[92px] font-semibold absolute" style={{fontSize: "20px"}}>타이완딤섬</p>
        </div>
        <div>
          <img style={{ height: "280px" }} alt="" src="/boardgame.jfif" />
          <p className="text-white mt-[-130px] ml-[100px] font-semibold absolute" style={{fontSize: "20px"}}>끊임없는 모험과 재미</p>
          <p className="text-white mt-[-100px] ml-[100px] font-semibold absolute" style={{fontSize: "20px"}}>판타지 캐릭터와 미션의 환상적 콜라보</p>
        </div>
      </Carousel>
    </div>
  )
}