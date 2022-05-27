import { Accordion, AccordionDetails } from "@mui/material"
import { AccordionSummary } from "@mui/material"
import { useState } from "react"
import { Button } from "@mui/material"
import OnFundingTable from "./OnFundingTable"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import contractGetter from "../../lib/ContractGetter"
import Image from "next/image"

export default function FundingCard({fundingData, isMine}){
  const [expanded, setExpanded] = useState(false)  
  const d1 = new Date().getTime()
  const [sellData, setSellData] = useState(false)
  useState(async ()=>{
    if(fundingData){
      const contract = contractGetter(fundingData.fundingContract)
      const endDate = await contract.endDate()
      const startDate = await contract.startDate()
      const endTime = new Date(parseInt(endDate._hex,16)*1000)
      const startTime = new Date(parseInt(startDate._hex,16)*1000)
      const nowAmount =  await contract.getOverall()
      const goalAmount =  await contract.getTargetAmount()
      if (parseInt(startDate._hex, 16)*1000 <= d1 && d1 <= parseInt(endDate._hex, 16)*1000) {        
        setSellData({startTime:startTime, endTime:endTime, nowAmount:parseInt(nowAmount._hex,16)/10**18, goalAmount:parseInt(goalAmount._hex,16)/10**18})
      } 
    }
  }, [fundingData])
  console.log(sellData, fundingData)  

  return(  
    <div className="my-4">
      {sellData && <Accordion expanded={expanded} onChange={()=>setExpanded(!expanded)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <div className="flex flex-row">
           <Image width="120" height="120" src={fundingData.fundingImage} alt={fundingData.fundingTitle} />
           <div>
             <p>제목: {fundingData.fundingTitle}</p>
             <p>현재모금액: {sellData.nowAmount}ETH</p>
             <p>목표모금액: {sellData.goalAmount}ETH</p>
             <p>달성률: {(sellData.nowAmount*100)/(sellData.goalAmount*100)*100}%</p>
             <p>기간: {sellData.startTime.toLocaleString()} ~ {sellData.endTime.toLocaleString()}</p>
           </div>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <h3 className="p-4">후원 정보</h3>
          <OnFundingTable/>
          <h3 className="p-4">선물 정보</h3>
          <div className="p-6 border-2 border-black border-solid">
            {/* <p>선물 구성: gift</p>
            <p>후원 금액: amount</p>
            <p>전달 상태: state</p> */}
            {fundingData.option.map(opt => {
              return(
                <div className="p-2 border-1 border-black border-solid">                  
                  <p>옵션 제목: {opt.optionTitle}</p>
                  <p>옵션 가격: {opt.optionPrice}</p>
                  <p>옵션 내용: {opt.optionText}</p>
                  <p>최대 선택 가능 개수: {opt.optionMaxamount}</p>
                </div>
              )
            })}
          </div>
          <Button className="mt-2 border-2 border-solid">펀딩 취소</Button>
        </AccordionDetails>
      </Accordion>}
    </div>
  )
}