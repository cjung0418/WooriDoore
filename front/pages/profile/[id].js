import {useEffect, useState, useContext, useLayoutEffect} from "react"
import Basic from "../../components/profile/Basic"
import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material'
import { Tab,Box } from "@mui/material"
import { TabContext,TabList,TabPanel } from "@mui/lab"
import DonationCard from "../../components/profile/DonationCard"
import FundingCard from "../../components/profile/FundingCard"
import FundedCard from "../../components/profile/FundedCard"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Send from '../../lib/Send'
import { UserContext } from '../../lib/UserContext'
import contractGetter from "../../lib/ContractGetter"
import Donations from "../../components/profile/Donations"
import Funding from "../../components/profile/Funding"
import { useRouter } from "next/router"


export default function Profile(props){ 
  //isMine은 이 프로필이 내것인가의 여부 확인변수, 만약 교체시 Basic도 교체할 것
  const {userSeq, setUserSeq} = useContext(UserContext);
  const router = useRouter()  
  const { id } = router.query
  const profileId = id
  console.log(id)
  const [userData, setUserData] = useState({})
  const [isMine, setIsMine] = useState(profileId === userSeq? true : false)
  const [tabNum, setTabNum] = useState(isMine?"0":"1")
  const [openState, setOpenState] = useState([false,false])
  const [followingList, setFollowingList] = useState([])
  const [followerList, setFollowerList] = useState([])
  const [donationData, setDonationData] = useState([])
  const [fundingData, setFundingData] = useState([])  
  const [fundingList, setFundingList] = useState([])
  const [fundedList, setFundedList] = useState([])
  
  
  

  const getUserData =  () => {
    Send.get(`https://j6a305.p.ssafy.io/api/user/${profileId}`)
      .then(({data}) => {       
        console.log(data.userWalletAddress)
        wallet = data.userWalletAddress 
        setUserData(data)
      })
      .catch((e) => {
        console.log(`error! ${e}`)
      })
  }

  function handleChange(event){
    const {name, value} = event.target
    setUserData(prevData => {
      return{
        ...prevData,
        [name]: value
      }
    })
  }  
  function handleTab(event, newValue){
    setTabNum(newValue)
    setOpenState([false,false])
  }

  function donationSplit(donations){
    const d1 = new Date().getTime()
    const donating = []
    const donated = []
    donations.map(async data=>{

      const contract = contractGetter(data.fundingContract)      
      const endDate = await contract.endDate()      
      const startDate = await contract.startDate()      
      const ftl = await contract.getFunderToList('0x2e0ED90D391aE5c1EA89b505dEc88E5448E99bF6')
      const options = []
      ftl.map(async (option,index) => {
        const price = await contract.optionPrices(index)
        const value = parseInt(price._hex,16)/10**18
        options.push({amount:parseInt(option._hex,16), price:value})
        
      })
      const result = Object.assign({}, data, {options:options})    
      if (parseInt(startDate._hex, 16)*1000 <= d1 && d1 <= parseInt(endDate._hex, 16)*1000) {
        donating.push(data)
      } else {
        donated.push(data)
      }
      
    })
    console.log("done",donating)
    console.log("done",donated)
    setOnDonationList(donating)
    setOffDonationList(donated)
  }

  function fundingSplit(fundings){
    const d1 = new Date().getTime()
    const funding = []
    const funded = []    
    fundings.map(async data=>{

      const contract = contractGetter(data.fundingContract)      
      const endDate = await contract.endDate()
      const startDate = await contract.startDate()
      
      // const options = await contract.optionPrices(0)      
      // console.log('options',options)
      // console.log('ftl', ftl)
        
      if (parseInt(startDate._hex, 16)*1000 <= d1 && d1 <= parseInt(endDate._hex, 16)*1000) {
        funding.push(data)
      } else {
        
        funded.push(data)
      }
      
    })
    console.log('funding',funding)
    console.log('funded',funded)
    setFundingList(funding)
    setFundedList(funded)
  }
 
  

  const getFollowingList =  () => {
    Send.get(`https://j6a305.p.ssafy.io/api/follow/followings?userSeq=${profileId}`)
      .then(res => res.data.data)
      .then(data=> setFollowingList(data))
      .catch((e) => {
        console.log(`error! ${e}`)
      })
  }

  const getFollowerList =  () => {
    Send.get(`https://j6a305.p.ssafy.io/api/follow/followers?seller=${profileId}`)
      .then(res => res.data.data)
      .then(data=> setFollowerList(data))
      .catch((e) => {
          console.log(`error! ${e}`)
        })
  }

  const getDonationData =  () => {
    Send.get(`https://j6a305.p.ssafy.io/api/funding/lists/buy?userSeq=${profileId}`)
      .then(res => setDonationData(res.data.data))      
      .catch(e => console.log(`error! ${e}`))
  }

  const getFundingData =  () => [
    Send.get(`https://j6a305.p.ssafy.io/api/funding/lists/sell?userSeq=${profileId}`)
      .then(res => setFundingData(res.data.data))      
      .catch(e => console.log(`error! ${e}`))
  ]  
  
  useEffect(async ()=>{
    const res1 = await Send.get(`https://j6a305.p.ssafy.io/api/user/${profileId}`)
    const data1 = await res1.data
    // wallet = await data1.userWalletAddress    
    const res2 = await Send.get(`https://j6a305.p.ssafy.io/api/follow/followings?userSeq=${profileId}`)
    const data2 = await res2.data.data
    const res3 = await Send.get(`https://j6a305.p.ssafy.io/api/follow/followers?seller=${profileId}`)
    const data3 = await res3.data.data
    const res4 = await Send.get(`https://j6a305.p.ssafy.io/api/funding/lists/buy?userSeq=${profileId}`)
    const data4 = await res4.data.data
    const res5 = await Send.get(`https://j6a305.p.ssafy.io/api/funding/lists/sell?userSeq=${profileId}`)
    const data5 = await res5.data.data
    // const funding = []
    // const funded = []
    // const d1 = new Date().getTime()
    // console.log('data5',data5)
    // await data5.map(async data=>{
    //   const contract = contractGetter(data.fundingContract)
    //   const endDate = await contract.endDate()
    //   const startDate = await contract.startDate()
    //   if (parseInt(startDate._hex, 16)*1000 <= d1 && d1 <= parseInt(endDate._hex, 16)*1000) {
    //     funding.push(data)
    //   } else {
    //     funded.push(data)
    //   }
    // })    
    setUserData(data1)
    setFollowingList(data2)
    setFollowerList(data3)
    // donationSplit(data1.userWalletAddress,data4)
    // fundingSplit(data5)    
    setDonationData(data4)
    setFundingData(data5)
  },[profileId])

  // useEffect(()=>{
  //   if(fundingData.length !== 0){
  //     fundingSplit(fundingData)
  //   }
  // },[fundingData])

  // useEffect(()=>{
  //   if(donationData.length !== 0){
  //     donationSplit(donationData)
  //   }
  // },[donationData])
  
  

  console.log("render")

  // useEffect( ()=>{    
    
  //     getUserData()        
  //     getFollowingList()
  //     getFollowerList()      
  //     if(isMine){
  //       getDonationData()   
  //     }
  //     getFundingData()   
    
  // },[])

  // useEffect( () => {
  //   fundingSplit(fundingData)
  // }, [fundingData])

  // useEffect( () => {
  //   donationSplit(donationData)
  // }, [donationData])  
  
  
  
  return(
    <>
      {/* 닉네임, 팔로잉,팔로우, 받은 찜, 자기소개 글 */}
      <Basic handleChange={handleChange} userData={userData} profileId={profileId} followerList={followerList} followingList={followingList} isMine={isMine}/>
      {/* 탭 부분 */}      
      <TabContext value={tabNum}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTab} aria-label="lab API tabs example">
            {isMine && <Tab label="후원이력 및 현황" value="0" />}
            <Tab label="펀딩 이력 및 현황" value="1" />            
          </TabList>
        </Box>
        {/* 카드 등을 보여줄 공간 나중에는 Card가 아니라 map으로 cardElements를 만들어서 보낼 예정 */}
        {isMine && <TabPanel value="0">
          {/* <h3 onClick={console.log("clicked")}>후원 진행중(Arrlength) {openState[0]?<ExpandLessIcon/>:<ExpandMoreIcon/>}</h3>
          {openState[0] && <DonationCard/>}
          <h3 onClick={()=>setOpenState([openState[0],!openState[1]])}>후원 종료(Arrlength) {openState[1]?<ExpandLessIcon/>:<ExpandMoreIcon/>}</h3>
          이 부분은 나중에 버튼 뺄 것
          {openState[1] && <DonationCard/>} */}
          <Donations userWalletAddress={userData.userWalletAddress} donationData={donationData}/>          
        </TabPanel>}
        <TabPanel value="1">
          {/* <h3 onClick={()=>setOpenState(!openState[0],openState[1])}>펀딩 진행중(Arrlength) {openState[0]?<ExpandLessIcon/>:<ExpandMoreIcon/>}</h3>
          {openState[0] && <FundingCard/>}
          <h3 onClick={()=>setOpenState(openState[0],!openState[1])}>펀딩 진행중(Arrlength) {openState[1]?<ExpandLessIcon/>:<ExpandMoreIcon/>}</h3>
          {openState[1] && <FundedCard/>} */}
          {/* <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
              펀딩진행중 ({fundingList.length}) 
            </AccordionSummary>
            <AccordionDetails>
              <FundingCard/>
            </AccordionDetails>
          </Accordion> */}
          <Funding fundingData={fundingData} isMine={isMine}/>          
        </TabPanel>        
      </TabContext>
      <div>
        {/* 현재는 한 개의 카드이지만 나중에는 Data를 받아서 map으로 여러 개의 카드를 보여주도록 만들 예정 */}
        
        
        
      </div>
    </>
  )
}

