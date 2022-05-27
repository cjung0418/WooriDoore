import {motion} from 'framer-motion';
import Image from 'next/image';

// 상품 상세정보 컴포넌트
const ProductDetail = ({picture}) => {
  
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
      <section className="flex flex-col gap-[4rem]">
        {/* 상품 상세정보가 들어갈 위치 */}
        <Image src={picture} alt="road" width={900} height={1275} />
      </section>
    </motion.div>
  )
}

export default ProductDetail;