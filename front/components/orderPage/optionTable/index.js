import { motion } from "framer-motion";


const OptionTable = ({option}) => {
  
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
      <div class="max-w-sm min-w-sm lg:max-w-full lg:flex">
       <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{backgroundImage: `url('/productImg.jpg')`}} title="product thumbnail pic">
       </div>
       <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
         <div class="mb-8">
           <div class="text-gray-900 font-bold text-xl mb-2">가격: {option.optionPrice}</div>
           <p class="text-gray-700 text-base">임시 제목입니다. {option.optionTitle}</p>
           <p class="text-gray-700 text-base">임시 펀딩 상품 소개글입니다. {option.optionText}</p>
         </div>
       </div>
     </div>
    </motion.div>
  )

}
export default OptionTable;