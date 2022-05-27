import Link from 'next/link';
import FundCard from '../../components/ui/fundCard';
import {motion} from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';

// 상품 페이지를 통해 상세 페이지로의 이동을 임시 구현하기 위해 만든 테스트 페이지
export const getStaticProps = async () => {

  // const res = await fetch('https://retoolapi.dev/X9nA53/dummy'); // 전체 펀딩리스트를 가져올 수 있는지 확인 필요
  // const res = await fetch('https://j6a305.p.ssafy.io/api/funding/lists/1', {"sort": 1});
  // const data = await res.json();
  let fundsList = [];
  for (let i = 1; i < 4; i++) {
    const res = await fetch(`https://j6a305.p.ssafy.io/api/funding/lists/${i}`, {"sort": `${i}`});
    const data = await res.json();
    fundsList.push([data.data])
  }

  return {
    props: {
      funds: fundsList,
    }
  }
}


const Products = ({funds}) => {

  const [category, setCategory] = useState(1);
  const [categoryTitle, setCategoryTitle] = useState('인기');

  const showPopular = (e) => {
    e.preventDefault();
    setCategory(1);
    setCategoryTitle('인기');
  }
  const showNew = (e) => {
    e.preventDefault();
    setCategory(2);
    setCategoryTitle('신규');
  }
  const showTrending = (e) => {
    e.preventDefault();
    setCategory(3);
    setCategoryTitle('급상승');
  }
  const showLife = (e) => {
    e.preventDefault();
    setCategory(4);
    setCategoryTitle('생활');
  }
  const showFood = (e) => {
    e.preventDefault();
    setCategory(5);
    setCategoryTitle('식품');
  }

  return (
    <>
      <nav className="flex flex-row justify-center gap-[5rem] mt-[2rem] mb-[6rem]">
        <motion.button whileTap={{ scale: 0.98 }} className={`${category === 1 && "text-theme-color"} "rounded-2xl flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl`} onClick={showPopular}>
          <Image width="70rem" height="70rem" className="rounded-t-xl" src="/category/popular.jpg" alt="popular category button image" />
          <span className="font-black mb-[0.3rem]">인기</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} className={`${category === 2 && "text-theme-color"} "rounded-2xl flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl`} onClick={showNew}>
          <Image width="70rem" height="70rem" className="rounded-t-xl" src="/category/new.webp" alt="new category button image" />
          <span className="font-black">신규</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} className={`${category === 3 && "text-theme-color"} "rounded-2xl flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl`} onClick={showTrending}>
          <Image width="70rem" height="70rem" className="rounded-t-xl" src="/category/trending.jpg" alt="trending category button image" />
          <span className="font-black">급상승</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} className={`${category === 4 && "text-theme-color"} "rounded-2xl flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl`} onClick={showLife}>
          <Image width="70rem" height="70rem" className="object-none rounded-t-xl" src="/category/life.avif" alt="life category button image" />
          <span className="font-black">생활</span>
        </motion.button>
        <motion.button whileTap={{ scale: 0.98 }} className={`${category === 5 && "text-theme-color"} "rounded-2xl flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl`} onClick={showFood}>
          <Image width="70rem" height="70rem" className="object-none rounded-t-xl" src="/category/food.avif" alt="food category button image" />
          <span className="font-black">식품</span>
        </motion.button>
      </nav>
      <h2 className="text-2xl antialiased font-semibold text-center text-gray-700">{categoryTitle} 펀딩 상품</h2>
      <hr className="mt-[32px] mb-[50px]  mx-[236px]" />
      <div className="flex flex-wrap justify-center mx-[230px] gap-x-[45px] gap-y-[96px] my-10">
        {funds[category-1] ? funds[category-1][0].map(fund => (
          // <Link href={'/products/' + fund.id} key={fund.id} passHref>
          <Link href={'/products/' + fund.fundingSeq} key={fund.fundingSeq} passHref>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              // className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4 px-[16px]"
              className="max-w-[320px] min-w-[320px] min-h-[300] max-h-[300px]"
            >
              <FundCard fund={fund} />
            </ motion.button>
          </Link>
        )) :
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
          }}
        >
          <h2 className="text-center my-[5rem]">해당 카테고리의 펀딩 상품이 없습니다.</h2>
        </motion.div>
        }
      </div>
    
    </>
  )

}

export default Products;