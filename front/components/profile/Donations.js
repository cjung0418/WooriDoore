import { Accordion, AccordionDetails } from "@mui/material"
import { AccordionSummary } from "@mui/material"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import contractGetter from "../../lib/ContractGetter";
import DonationCard from "./DonationCard";


export default function Donations(props){
  const [onDonations,setOnDonations] = useState()
  const [offDonations, setOffDonations] = useState()
  
  
  

  // useEffect(()=>{
  //   function makeElements(){
  //     setOnElements(onDonations.map((donation,idx)=>{
  //       return (<DonationCard key={idx} donation={donation}></DonationCard>)
  //     }))
  //   }
  //   if(onDonations){
  //     makeElements()
  //   }
  // }, [onDonations])

  // useEffect(()=>{
  //   function makeElements(){
  //     setOffElements(offDonations.map((donation,idx)=>{
  //       return (<DonationCard key={idx} donation={donation}></DonationCard>)
  //     }))
  //   }
  //   if(offDonations){
  //     makeElements()
  //   }
  // }, [offDonations])
  

  
  return(
    <div className="my-4">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          후원 이력들 ({props.donationData.length})
        </AccordionSummary>
        <AccordionDetails>
          {props.donationData.map(donationData=><DonationCard walletAddress={props.userWalletAddress} donationData={donationData}></DonationCard>)}          
        </AccordionDetails>
      </Accordion>    
    </div>
  )
}