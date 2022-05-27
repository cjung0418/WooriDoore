import Image from 'next/image';
import {motion} from 'framer-motion';
import contractGetter from '../../lib/ContractGetter';
import { useEffect, useState } from 'react';

const FundCardSmallTest = ({fund, index}) => {
  const [dDay, setDDay] = useState('...')
  useEffect(
    async () => {
      const contract = contractGetter(fund.fundingContract)
      const temp = await contract.endDate()
      const endDate = (Number(BigInt(temp._hex)) * 1000)
      if ((endDate - Date.now()) / 86400000 > 1) {
        setDDay(`${parseInt((endDate - Date.now()) / 86400000)}일 남음`)
      } else if (endDate - Date.now() > 7200000) {
        setDDay(`${parseInt((endDate - Date.now()) / 3600000)}시간 남음`)
      } else if (endDate - Date.now() > 120000) {
        setDDay(`${parseInt((endDate - Date.now()) / 60000)}분 남음`)
      } else {
        return
      }
    }
  , [])


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

      <article className="flex items-center ml-1.5 grid grid-cols-12 shadow-md">
        <b className="col-span-1" style={{ fontSize: "20px", padding: "0 10px"}}>{index+1}</b>
        <img className="w-full col-span-3" src={fund.fundingImage} alt="fund card image" />
        <div className="col-span-8">
          <section className="px-[3%] overflow-hidden">
            <div className="mb-1 font-bold" style={{fontSize: "14px"}}>{fund.fundingTitle}</div>
            <div className="text-gray-700" style={{fontSize: "13px"}}>{fund.fundingSimple}</div>
          </section>
          <section className="px-[3%] pb-2">
            <span className="inline-block px-3 py-1 mt-2 mb-0.5 mr-2 font-semibold text-gray-700 bg-gray-200 rounded-full" style={{fontSize: "12px"}}># {dDay}</span>
            <span className="inline-block px-3 py-1 mt-2 mb-0.5 mr-2 font-semibold text-gray-700 bg-gray-200 rounded-full" style={{fontSize: "12px"}}># 한정수량</span>
          </section>
        </div>
      </article>

    </motion.div>

    // <div class="max-w-sm min-w-sm lg:max-w-full lg:flex">                                                         {/* 아래거 안될시 style={{backgroundImage: `url('/productImg.jpg')`}} 로 대체*/} 
    //   <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${fund.fundingImage})` }} title="product thumbnail pic">
    //   </div>
    //   <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
    //     <div class="mb-8">
    //       <div class="text-gray-900 font-bold text-xl mb-2">{fund.fundingTitle}</div>
    //       <p class="text-gray-700 text-base">매우단순한 설명입니다:</p>
    //       <p class="text-gray-700 text-base">{fund.fundingSimple}</p>
    //     </div>
    //     <div class="flex items-center">
    //       <Image width="30rem" height="30rem" class="rounded-full mr-4" src="https://i.pinimg.com/736x/b8/69/5f/b8695f007aea9a08a0419479217ca6aa.jpg" alt="seller pic" />
    //       <div class="text-sm">
    //         <p class="text-gray-900 leading-none">Jonathan Reinink</p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}

export default FundCardSmallTest;
