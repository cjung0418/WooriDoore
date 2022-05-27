import { Accordion, AccordionDetails } from "@mui/material"
import { AccordionSummary } from "@mui/material"
import { useState } from "react"
import { Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Image from 'next/image'
import contractGetter from "../../lib/ContractGetter";

export default function DonationCard({donationData, walletAddress}){
  const [expanded, setExpanded] = useState(false)
  const [buyData, setBuyData] = useState(false)
  const finished = false

  const sumValues = obj => Object.values(obj).reduce((a,b)=>(a.price*a.amount+b.price*b.amount))

  useState(async ()=>{
    if(donationData && walletAddress){
      const contract = contractGetter(donationData.fundingContract)
      const endDate = await contract.endDate()
      const startDate = await contract.startDate()
      const endTime = new Date(parseInt(endDate._hex,16)*1000)
      const startTime = new Date(parseInt(startDate._hex,16)*1000)
      const total = await contract.funderToAmount(walletAddress)
      const ftl = await contract.getFunderToList(walletAddress)
      const options = []
      await ftl.map(async (option,index) => {
        const price = await contract.optionPrices(index)
        const value = parseInt(price._hex,16)/10**18
        options.push({index:index,amount:parseInt(option._hex,16), price:value})
      })
      options.sort((a,b)=> a.index - b.index)
      setBuyData({startTime:startTime, endTime:endTime, total:total ,options:options})

    }
  },[donationData,walletAddress])
  console.log(buyData)
  return(
    <div className="my-4">
      <Accordion expanded={expanded} onChange={()=>setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="flex flex-row">
           {donationData && <Image width="120" height="120" src={donationData.fundingImage} alt={donationData.fundingTitle} />}
           <div>
             {donationData && <p>제목: {donationData.fundingTitle}</p>}
             {donationData && <p>스마트컨트랙트 번호: {donationData.fundingContract}</p>}
           </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <h3 className="p-4">후원 정보</h3>
          <div className="border-solid border-black border-2 p-6">
            {buyData && <p>펀딩 시작일: {buyData.startTime.toLocaleString()}</p>}
            {buyData && <p>펀딩 마감일: {buyData.endTime.toLocaleString()}</p>}
            {buyData && buyData.options.sort((a,b)=>a.index-b.index).map(option => <p>{option.index+1}번 옵션 - {option.price}ETH로 {option.amount}개 후원</p>)}
            {buyData && <p>총 소비액: {parseFloat(buyData.total/10**18,16)}ETH</p>}
          </div>
          
        </AccordionDetails>
      </Accordion>
    </div>
  )
}