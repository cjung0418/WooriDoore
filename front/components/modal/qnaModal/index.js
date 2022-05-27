import {motion} from "framer-motion";
import { useState, useContext } from "react";
import {UserContext} from "../../../lib/UserContext";
import Send from '../../../lib/Send';

export default function QnaModal({fundingSeq, addQna, handleClose}) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSecret, setIsSecret] = useState(false);
  const {userSeq, setUserSeq} = useContext(UserContext);

  const cancel = (e) => {
    e.preventDefault();
    handleClose();
  }

  const submitQna = (e) => {
    e.preventDefault();
    let data = {
      "fundingSeq": fundingSeq,
      "userSeq": userSeq,
      "qnaTitle": title,
      "qnaText": content,
      "secret": isSecret,
    }
    // qna 제출 시 DB에 post 요청 보내고
    Send.post('/funding/qna', data)
      .then((data) =>{
        console.log(data);
        addQna();  // qna 새롭게 요청해서 화면에 표시 (QnA 컴포넌트에서 실행됨)
        setTitle('');
        setContent('');
        setIsSecret(false);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const popUp = {
    initial: {
      y: "-30vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      }
    },
    exit: {
      y: "-30vh",
      opacity: 0,
      transition: {
        duration: 0.2,
      }
    }
  }

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      variants={popUp}
      initial="initial"
      animate="visible"
      exit="exit"
      className="modal"
      >
      <form className="flex flex-col justify-center h-[27rem] px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <header className="flex flex-row gap-[8rem]">
          <h1 className="text-lg font-medium">질문하기</h1>
          <div className="form-check">
            <input checked={isSecret} onClick={(e) => setIsSecret(!isSecret)} className="float-left w-4 h-4 mt-1 mr-2 align-top transition duration-200 bg-white bg-center bg-no-repeat bg-contain border border-gray-300 rounded-sm appearance-none cursor-pointer form-check-input checked:bg-theme-color/70 checked:border-theme-color focus:outline-none" type="checkbox" value="" id="secretBox" />
            <label className="inline-block text-gray-800 form-check-label" htmlFor="secretBox">
              비밀질문
            </label>
          </div>
        </header>
        <section className="my-4">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="title">
            제목
          </label>
          <input onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 text-gray-700 border rounded shadow focus:outline-none focus:shadow-theme-color" id="title" type="text" />
        </section>
        <section className="py-4 mb-12">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="content">
            질문 내용
          </label>
          <textarea onChange={(e) => setContent(e.target.value)} className="w-full h-full px-3 py-2 mb-3 text-gray-700 border rounded shadow focus:outline-none focus:shadow-theme-color" id="content" />
        </section>
        <section className="flex items-center justify-between">
          <button onClick={submitQna} className="px-4 py-2 font-bold text-white rounded bg-theme-color/80 hover:bg-theme-color focus:outline-none focus:shadow-outline">
            작성
          </button>
          <button onClick={cancel} className="inline-block text-sm font-bold align-baseline text-theme-color hover:text-blue-800" href="#">
            취소
          </button>
        </section>
      </form>
    </motion.div>
  )
}