import Image from 'next/image';
import {motion} from 'framer-motion';
import contractGetter from '../../../lib/ContractGetter';
import { useEffect, useState } from 'react';

const FundCard = ({fund}) => {
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

      <article className="flex flex-col gap-[16px] overflow-hidden flex-wrap shadow-lg">
        {fund.fundingImage ? (
          <Image width="250px" height="200px" src={fund.fundingImage} alt="펀드 썸네일 사진" />
          ) : (
          // <img className="w-full" src="/productImg.jpg" alt="fund card image" />
          <Image width="250px" height="200px" src="/productImg.jpg" alt="펀드 썸네일 사진" />
        )}
        {console.log(fund.fundingImage)}
        <section className="px-6">
          <div className="mb-2 text-xl font-bold">{fund.fundingTitle}</div>
          <p className="text-base text-gray-700">{fund.fundingSimple.length > 17 ? fund.fundingSimple.substring(0, 18) + "..." : fund.fundingSimple}</p>
        </section>
        <section className="px-6 pb-2">
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"># {dDay}</span>
          <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"># 한정수량</span>
        </section>
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

export default FundCard;