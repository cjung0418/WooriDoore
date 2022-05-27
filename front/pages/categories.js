import CardFav from '../components/cards/cardFav'
import Banner from '../components/main/banner'
import Grid from '@mui/material/Grid'
import style from "../components/cards/card.module.css"
import Category from '../components/category'
import {useState, useEffect} from 'react'
import axios from 'axios'

export default function categories() {
  let a = []
  for(let i = 0; i < 16; i++) {
    a.push(i)
  }
  const [categories, setCategories] = useState(a)
  const [fundings, setFundings] = useState([])
  const [categoryNum, setCategoryNum] = useState(1)
  useEffect(() => {
    axios.all(
      [
        axios.get("https://j6a305.p.ssafy.io/api/funding/lists/1"),
        axios.get("https://j6a305.p.ssafy.io/api/categories")
      ]
    )
      .then(axios.spread(
        (resFundings, resCategories) => {
          setFundings(resFundings.data.data)
          setCategories(resCategories.data.data)
        }
      ))
  }, [])
  // category 받아오기
  // async function getCategories() {
  //   const res = await axios({
  //     url: "https://"
  //   })
  //   if (!res.ok) {
  //     throw new Error(`HTTP error! status: ${res.status}`);
  //   }
  //   console.log(res)
  //   return await res.blob();
  // }
  // getCategories().then(() => {

  // }).catch(e => console.log(e))

  // serious인가? 그거 풀어도 에러나면 if사용 (serious인가 그거 사용하면 state사용전 렌더링 한번)
  const categoryElements = categories.map(category => {
    return <Category key={category.categoryNumber} category={category}/>
  })

  const fundingElements = fundings.map(funding => {
    return <CardFav key={funding.fundingSeq} info={funding} style={style.card} />
  })

  return (
    <>
      {!categoryNum && <Banner />}
      <div style={{display: "flex", justifyContent: "flex-start"}}>
        {categoryElements}
      </div>
      <div style={{display: "flex", justifyContent: "space-between"}}>
        <div>
          {categoryNum!==0 && (<h2>{categories[categoryNum].categoryName}</h2>)}
        </div>
        <div>
          <input type="text" style={{border: "1px solid gray"}}/>
          <button style={{border: "1px solid black"}}>검색</button>
          <select style={{border: "1px solid black"}} name="" id="">
            <option value="">전체</option>
            <option value="">진행중</option>
            <option value="">종료된</option>
          </select>
          <select style={{border: "1px solid black"}} name="" id="">
            <option value="">추천순</option>
            <option value="">인기순</option>
            <option value="">펀딩액순</option>
            <option value="">마감임박순</option>
            <option value="">최신순</option>
            <option value="">응원참여자순</option>
          </select>
        </div>
      </div>
      <Grid container>
        {fundingElements}
      </Grid>
    </>
  )
}