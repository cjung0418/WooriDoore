import { Box } from "@mui/material"
import { TabList, TabContext, TabPanel } from "@mui/lab"
import { Tab } from "@mui/material"
import { useEffect, useMemo, useState, useContext } from "react"
import Profile from "../components/userSetting/Profile"
import Account from "../components/userSetting/Account"
import Wallet from "../components/userSetting/Wallet"
import Address from "../components/userSetting/Address"
import Send from "../lib/Send"
import { UserContext } from '../lib/UserContext'
import Router from "next/router";

export default function Setting(){
  const [tabNum, setTabNum] = useState("0")
  const [userData, setUserData] = useState("")
  const [address, setAddress] = useState([])
  function handleTab(event, newValue){
    setTabNum(newValue)
  }
  const {userSeq, setUserSeq} = useContext(UserContext);

  const getUserData = () => {
    Send.get(`https://j6a305.p.ssafy.io/api/user/${userSeq}`)
      .then(({data}) => {        
        setUserData(data)
      })
      .catch((e) => {
        console.log(`error! ${e}`)
      })
  }

  const getAddress = () => {
    Send.get(`https://j6a305.p.ssafy.io/api/delivery/list?userSeq=${userSeq}`)
      .then(({data}) => {        
        setAddress(data)
      })
      .catch((e) => {
        console.log(`error! ${e}`)
      })
  }

  useEffect(async ()=>{
    if (!userSeq) {
      Router.push('/login')
    }
    getUserData()
    getAddress()
  },[])
  

  function handleChange(name,value){
    console.log("handle")
    console.log(name,value)
    setUserData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })

  }  

  return(
    <div>
      <h2 className="p-4">설정</h2>
      <TabContext value={tabNum}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleTab} aria-label="lab API tabs example">
            <Tab label="프로필" value="0" />            
            <Tab label="지갑" value="2" />
            {/* <Tab label="배송지" value="3" /> */}
          </TabList>
        </Box>
        <TabPanel value="0">
          <Profile userData={userData} handleChange={handleChange}/>
        </TabPanel>        
        <TabPanel value="2">
          <Wallet userData={userData} handleChange={handleChange}/>
        </TabPanel>
        {/* <TabPanel value="3">
          <Address userSeq={userSeq} address={address}/>
        </TabPanel> */}
      </TabContext>
    </div>
  )
}