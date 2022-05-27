import { Accordion, AccordionDetails } from "@mui/material"
import { AccordionSummary } from "@mui/material"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import OnFundingTable from "./OnFundingTable"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FundingCard from "./FundingCard"
import contractGetter from "../../lib/ContractGetter";
import FundedCard from "./FundedCard"

export default function Funding(props){
  // console.log(props)
  return(
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          펀딩진행중 
        </AccordionSummary>
        <AccordionDetails>
          {props.fundingData.map(fundingData=><FundingCard fundingData={fundingData} isMine={props.isMine}/>)}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          펀딩완료 혹은 예정 
        </AccordionSummary>
        <AccordionDetails>
          {props.fundingData.map(fundingData=><FundedCard fundingData={fundingData} isMine={props.isMine}/>)}
        </AccordionDetails>
      </Accordion>
      
      </>
  )
}