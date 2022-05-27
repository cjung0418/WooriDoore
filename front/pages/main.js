import Link from 'next/link';
import Banner from '../components/main/banner'
import Grid from '@mui/material/Grid'
import FundCardFav from '../components/cards/cardFav'
import FundCard from '../components/cards/card';
import FundCardSmall from '../components/cards/cardSmall';
import FundCardSmallTest from '../components/cards/cardSmall';
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
  console.log(funds)
  return (
    <>
      <Banner />
      <Grid container style={{marginTop: "10px"}}>
        <Grid item xs={8}>
          <div>
            <h2 className="mt-2 pl-2" style={{ fontSize: "26px", marginBottom: "5px" }}>회원님이 좋아할 펀딩</h2>
            <div className="flex flex-wrap justify-center mx-[0px] gap-x-[5%] gap-y-[40px] mt-4 mb-9">
              {/* funds[0] -> 인기, 1 -> 신규, 2 -> 급상승 */}
              {funds[0][0].slice(0, 6).map(fund => (
                // <Link href={'/products/' + fund.id} key={fund.id} passHref>
                <Link href={'/products/' + fund.fundingSeq} key={fund.fundingSeq} passHref>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-1/2 sm:w-1/2 md:w-1/4 lg:w-1/4 xl:w-1/4"
                  >
                    <FundCardFav fund={fund} />
                  </ motion.button>
                </Link>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item xs={4} style={{ paddingLeft: "15px", borderLeft: "1px solid #e5e7eb" }}>
          <div>
            <h2 className="mt-2 pl-3" style={{ fontSize: "26px", marginBottom: "5px" }}>인기 펀딩</h2>
            <div className="flex flex-col flex-wrap justify-center gap-x-[16px] gap-y-[25px] mt-4 mb-8">
              {funds[0][0].slice(6, 11).map((fund, index) => (
                // <Link href={'/products/' + fund.id} key={fund.id} passHref>
                <Link href={'/products/' + fund.fundingSeq} key={fund.fundingSeq} passHref>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <FundCardSmall fund={fund} index={index} />
                  </ motion.button>
                </Link>
              ))}
            </div>
          </div>
        </Grid>
      </Grid>
        <hr />
        <div>
          <h2 className="mt-3.5 pl-2" style={{ fontSize: "26px" }}>급상승 펀딩</h2>
          <Grid container>
            <div className="flex flex-wrap justify-center gap-x-[3.6%] gap-y-[32px] mt-4 mb-9">
              {funds[0][0].slice(11, 15).map(fund => (
                // <Link href={'/products/' + fund.id} key={fund.id} passHref>
                <Link href={'/products/' + fund.fundingSeq} key={fund.fundingSeq} passHref>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-1/2 sm:w-1/2 md:w-1/5 lg:w-1/5 xl:w-1/5"
                  >
                    <FundCard fund={fund} />
                  </ motion.button>
                </Link>
              ))}
            </div>
          </Grid>
        </div>
        <hr />
        <div>
          <h2 className="mt-3.5 pl-2" style={{ fontSize: "26px" }}>신규 펀딩</h2>
          <Grid container>
            <div className="flex flex-wrap justify-center gap-x-[3.6%] gap-y-[64px] mt-4 mb-9">
              {funds[0][0].slice(14, 18).map(fund => (
                // <Link href={'/products/' + fund.id} key={fund.id} passHref>
                <Link href={'/products/' + fund.fundingSeq} key={fund.fundingSeq} passHref>
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-1/2 sm:w-1/2 md:w-1/5 lg:w-1/5 xl:w-1/5"
                  >
                    <FundCard fund={fund} />
                  </ motion.button>
                </Link>
              ))}
            </div>
          </Grid>
        </div>
    </>
  )
}

export default Products;