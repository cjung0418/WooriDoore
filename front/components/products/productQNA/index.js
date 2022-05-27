import {motion, AnimatePresence} from 'framer-motion';
import {useState, useEffect} from 'react';
import Backdrop from '../../modal/backdrop';
import Send from '../../../lib/Send';
import CustomButton from '../../ui/button/button';


// 상품 QnA 컴포넌트
// ISR 활용하여 처음에는 페이지 SSG 로 렌더 => qna 수정되면 일단 CSR로 사용자에게 일시적으로 보여줌
// 현재 방법은 sustainable 하지 않음, 고로 추후 on-demand ISR로 수정필요
const ProductQNA = ({fundingSeq}) => {
  
  const [openQnaModal, setOpenQnaModal] = useState(false);
  const [qnaList, setQnaList] = useState([]);

  const toggleQnaModal = (e) => {
    e.preventDefault();
    openQnaModal ? close() : open();
  }
  const open = () => setOpenQnaModal(true);
  const close = () => setOpenQnaModal(false);

  const addQna = () => {
    // get 요청보낼때 해당 펀드상품의 pk값 필요
    Send.get(`/funding/qna?fundingSeq=${fundingSeq}`)
      .then((data) =>{
        console.log(data.message);
        setQnaList(data.data);
      })
      .catch((e) =>{
        console.log(e);
      })
  }

  useEffect(() => {
    addQna();
  }, [])

  return (
    // framer-motion 라이브러리를 활용, 해당 컴포넌트가 보여질때 마다 transition effect를 발생시킵니다
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}>
      <section className="grid grid-cols-1 gap-[4rem]">
        {/* 상품 QnA가 들어갈 위치 */}
        {qnaList.data && qnaList.data.length > 0 ? (qnaList.data.map(qna => (
            // 스압방지를 위해서 + 질문 제목 빠르게 파악할 수 있게 하기 위해 질문 단위로 접었다 폇다 가능하게 구현
            <details className="border py-[1rem] hover:shadow-lg hover:shadow-theme-color/30  focus:border-theme-color" key={qna.qnaTitle}>
              <summary className="font-sans text-xl antialiased list-none pl-[1rem] cursor-pointer">Q. {qna.qnaTitle}</summary>
              {/* 카톡 메신저 창 처럼 좌측 상대방, 우측 본인 구조로 채팅을 주고받듯이 말풍선 구현 */}
              <hr className="m-[1rem] py-[1rem]" />
              <section className="flex flex-row justify-end gap-[2rem] my-[1rem] mr-[1rem]">
                {qna.secret ? (
                  <p className="mr-[-2.21rem] pl-[1rem] p-2 antialiased font-normal rounded-[15px] bg-theme-color/60 max-w-[25rem] shadow-md">비밀 질문입니다.</p>
                ) : (
                  <p className="mr-[-2.21rem] pl-[1rem] p-2 antialiased font-normal rounded-[15px] bg-theme-color/60 max-w-[25rem] shadow-md">{qna.qnaText}</p>
                )}
                <span className="mt-[0.5rem] text-theme-color/70 mix-blend-color-dodge">▶</span>
              </section>
              {qna.replyText && (
                <section className="flex flex-row gap-[2rem] ml-[1rem] my-[1rem]">
                  <img className="flex-none w-[4rem] h-[4rem] shadow-md border-black rounded-full mr-[-1rem]" src="https://i.pinimg.com/736x/b8/69/5f/b8695f007aea9a08a0419479217ca6aa.jpg" alt="seller profile image" />
                  <span className="mt-[1rem] text-black/20 mix-blend-color-dodge">◀</span>
                  {qna.secret ? (
                    <p className="ml-[-2.21rem] pl-[1rem] p-2 antialiased font-normal rounded-[15px] bg-black/20 max-w-[25rem] shadow-md">비밀 답변입니다.</p>
                  ) : (
                    <p className="ml-[-2.21rem] pl-[1rem] p-2 antialiased font-normal rounded-[15px] bg-black/20 max-w-[25rem] shadow-md">{qna.replyText}</p>
                  )}
                </section>
              )}
            </details>
          ))) : (<h1>첫 질문을 등록해주세요!</h1>)}

        <CustomButton func={toggleQnaModal} text="질문하기" classNameProp="w-48 py-[1rem] bg-theme-color text-white font-black antialiased text-xl justify-self-center" />
      </section>

      {/* 모달창 사라지는 애니매이션 유지시키기위해 AnimatePresence 활용 */}
      <AnimatePresence
        // initial animation (바로 사라져버리는것?) 비활성화시킴
        initial={false}
        // animation이 다 끝나야만 화면에서 컴포넌트가 사라지게함
        exitBeforeEnter={true}
        >
        {openQnaModal && <Backdrop fundingSeq={fundingSeq} addQna={addQna} label="qna" handleClose={close} />}
      </AnimatePresence>
    </motion.div>
  )
  
}

export default ProductQNA;