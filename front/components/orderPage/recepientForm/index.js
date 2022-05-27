import CustomButton from '../../ui/button/button.js';
import Backdrop from '../../modal/backdrop';
import {motion, AnimatePresence} from 'framer-motion';

const RecepientForm = ({
  togglePostSearch, 
  setReceiver, 
  receiver, 
  address, 
  setAddress,
  setAddress2, 
  handlePhone, 
  phoneRef,
  setOrderProcess, 
  openPostSearch,
  handleClose,
  telNumber
}) => {

  const toFinalOrder = (e) => {
    e.preventDefault();
    setOrderProcess(2);
  }

  return (
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
      <section className="flex flex-col items-center gap-[2rem] border-2 py-[4rem] mx-[255px]">
        <form className="w-full max-w-xl">
          <div className="flex flex-row mb-6 -mx-3">
            <p className=" basis-[6rem]">수령인</p>
            <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
              <input 
              onChange={(e) => setReceiver(e.target.value)} 
              required 
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-theme-color/70 focus:bg-white" 
              id="grid-first-name" 
              type="text" 
              placeholder="예) 홍길동" />
              {receiver === '' &&
                <p className="text-xs italic text-red-500">필수 입력</p>
              }
            </div>
          </div>
          <div className="flex flex-row mb-6 -mx-3">
            <p className="basis-1/4">수령주소</p>
            <div className="w-full px-3">
              <input 
              required 
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-theme-color/70 focus:bg-white focus:border-gray-500" 
              id="address" 
              type="text" 
              placeholder="예) 판교역로 235, 분당 주공" 
              autoComplete="off" 
              readOnly 
              value={address} />
              {address === '' &&
                <p className="{} text-red-500 text-xs italic">필수 입력</p>
              }
            </div>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="border px-[2rem] mb-[2rem] rounded-md shadow-md" 
              onClick={togglePostSearch} 
              >
                주소 검색
            </motion.button>
          </div>
          <div className=" flex flex-row -mx-3 mb-6 mt-[-1rem]">
            <p className="basis-[7.3rem] text-gray-500"></p>
            <div className="w-full px-3">
              <input 
              onChange={(e) => setAddress2(e.target.value)} 
              className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-theme-color/70 focus:bg-white focus:border-gray-500" 
              id="address" 
              type="text" 
              placeholder="추가 주소" 
              autoComplete="off" />
            </div>
          </div>
          <div className="flex flex-row mb-6 -mx-3">
            <p className=" basis-[6.8rem]">전화번호</p>
            <div className="w-1/3">
              <input 
              onChange={handlePhone} 
              ref={phoneRef} 
              required 
              className="block w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-theme-color/70 focus:bg-white focus:border-gray-500" 
              id="grid-city" 
              type="tel" 
              placeholder="예) 010-1577-1577" 
              maxLength="15" />
              {telNumber === '' &&
                <p className="mt-3 text-xs italic text-red-500">필수 입력</p>
              }
            </div>
          </div>
        </form>
        <CustomButton text="결제정보 확인" func={toFinalOrder} classNameProp="bg-theme-color text-white font-semibold w-40 h-10 " />
        
        <AnimatePresence
        // initial animation (바로 사라져버리는것?) 비활성화시킴
        initial={false}
        // animation이 다 끝나야만 화면에서 컴포넌트가 사라지게함
        exitBeforeEnter={true}
        >
          {openPostSearch && <Backdrop label="post" handleClose={handleClose} setAddress={setAddress} />}
        </AnimatePresence>
      </section>
    </motion.div>
  )
}
export default RecepientForm;