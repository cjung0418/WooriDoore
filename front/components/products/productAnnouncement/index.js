import {motion, AnimatePresence} from 'framer-motion';
import { useState, useEffect, useContext } from 'react';
import Backdrop from '../../modal/backdrop';
import Send from "../../../lib/Send.js";
import CustomButton from '../../ui/button/button';
import { UserContext } from '../../../lib/UserContext';

// 상품 공지사항 컴포넌트
const ProductAnnouncement = ({fundingSeq, fundInfo}) => {
  
  const [openAnnounceModal, setOpenAnnounceModal] = useState(false);
  const [announcementList, setAnnouncementList] = useState([]);
  const [seller, setSeller] = useState(fundInfo.userSeq);

  const {userSeq, setUserSeq} = useContext(UserContext);

  const toggleAnnounceModal = (e) => {
    e.preventDefault();
    openAnnounceModal ? close() : open();
  }
  const open = () => setOpenAnnounceModal(true);
  const close = () => setOpenAnnounceModal(false);

  const addAnnouncement = () => {
    // get 요청보낼때 해당 펀드상품의 pk값 필요
    Send.get(`/funding/board?fundingSeq=${fundingSeq}`)
      .then((data) =>{
        console.log(data.message);
        setAnnouncementList(data.data);
        console.log(announcementList);
      })
      .catch((e) =>{
        console.log(`error! ${e}`);
      })
  }

  useEffect(() => {
    addAnnouncement();
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
      <section className="grid grid-cols-1 gap-[5rem]">
        {/* 상품 공지사항 들어갈 위치 */}
        {announcementList.data && announcementList.data.length > 0 ? (announcementList.data.map(announcement => (
            <article key={announcement.boardContent} className="flex flex-col py-[1.5rem] gap-[2rem] justify-evenly border-l-4 border-theme-color/50">
              <header className="flex flex-row justify-between mx-[2rem]">
                <h2 className="text-2xl">제목: {announcement.boardTitle}</h2>
                {userSeq === seller && <button>삭제</button>}
              </header>
              <p className="mx-[2rem] my-[-1rem] text-gray-500/80">작성일 {announcement.boardCreatedDate}</p>
              <hr className="mx-[2rem]" />
              <p className="mx-[2rem]">
                {announcement.boardContent}입니다.
              </p>
            </article>
          ))) : (<h1>공지사항이 없습니다.</h1>)}
          
        <CustomButton func={toggleAnnounceModal} text="공지작성" classNameProp="w-48 py-[1rem] bg-theme-color text-white font-black antialiased text-xl justify-self-center"/>
      </section>
      <AnimatePresence
        // initial animation (바로 사라져버리는것?) 비활성화시킴
        initial={false}
        // animation이 다 끝나야만 화면에서 컴포넌트가 사라지게함
        exitBeforeEnter={true}
        >
        {openAnnounceModal && <Backdrop fundingSeq={fundingSeq}  label="announcement" addAnnouncement={addAnnouncement} handleClose={close} />}
      </AnimatePresence>
    </motion.div>
  )
  
}

export default ProductAnnouncement;