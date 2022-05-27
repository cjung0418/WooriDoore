import Creator from '../components/create/Creator'
import Project from '../components/create/Project'
import Funding from '../components/create/Funding'
import Policy from '../components/create/Policy'
import {useState, useContext, useEffect } from 'react'
import Button from '@mui/material/Button'
import { ButtonGroup } from '@mui/material'
import { UserContext } from '../lib/UserContext'
import Router from 'next/router'
import { ethers, ContractFactory } from 'ethers'
import toast, { Toaster } from 'react-hot-toast';
import ABI from '../lib/ABI.json'
import Bytecode from '../lib/Bytecode.json'
import Send from "../lib/Send"


export default function Create(){
  const [creatorData, setCreatorData] = useState({userNickname:"", userPhone:"", userIntroduce:"" })
  const [projectData, setProjectData] = useState({fundingTitle:"", fundingSimple:"", fundingCategory:"", image:"", fundingText:""})
  const [fundingData, setFundingData] = useState({goal:"", startDay:new Date(), startTime:"", endDay:"", option:[]})
  const [choice, setChoice] = useState(0)
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)
  const [categories, setCategories] = useState([])

  const {userSeq, setUserSeq} = useContext(UserContext);
 
  function handleChange(event) {
    const {name, value} = event.target
    switch (choice) {
      case 0:
        setCreatorData(prevData=> {
          return {
            ...prevData,
            [name] : value
          }
        })
        return
      case 1:
        setProjectData(prevData=> {
          return {
            ...prevData,
            [name] : value
          }
        })
        return
      case 2:
        setFundingData(prevData=> {
          return {
            ...prevData,
            [name] : value
          }
        })
        return
      case 3:
        console.log("policy")
        return
      default:
        console.log("error")
    }
  }
  const handleChoice = event => {
    setChoice(parseInt(event.target.value))
  }
  
  function changeDate(newVal, name){
    setFundingData(prevData => {
      return {
        ...prevData,
        [name]:newVal
      }
    })
  }

  function addItem(item){
    setFundingData(prevData => {
      return {
        ...prevData,
        option: [...prevData.option, item]
      }
    })
  }

  const handleNext = () => {
    setChoice((choice) => {
      if (choice <= 2) {
        return (choice + 1)  
      }
      })
  }

  // 유저 정보를 받아오고, 지갑도 확인한 뒤 지갑주소가 유저 정보에 저장된 지갑주소와 같은지 확인합니다.
  useEffect( async () => {
    const data = await fetch('https://j6a305.p.ssafy.io/api/user/check');
    let temp
    try {
      temp = await data.json();
    } catch {
      toast.error('로그인되지 않은 사용자입니다. 로그인페이지로 이동합니다.')
      setTimeout(() => {
        Router.push('/login')
      }, 2000 )
    }

    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        const res = await fetch(`https://j6a305.p.ssafy.io/api/user/${temp.userSeq}`);
        const data = await res.json();
        const userWalletAddress = data.userWalletAddress
        setCreatorData({userNickname:data.userNickname, userPhone:data.userPhone, userIntroduce:data.userIntroduce})
        window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
              chainId: "0x13881",
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              chainName: "Mumbai Testnet",
              nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18
              },
              blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"]
          }]
        })

        const _provider = new ethers.providers.Web3Provider(window.ethereum);
        await _provider.send("eth_requestAccounts", []);
        const _signer = _provider.getSigner()
        setProvider(_provider);
        setSigner(_signer);
        console.log("signer: ", _signer)
        const address = await _signer.getAddress()
        if (address !== userWalletAddress) {
          toast.error(`지갑 주소가 저장된 것과 다릅니다.  
          ${userWalletAddress && userWalletAddress.slice(0, 10)}... 주소를 이용하여 주세요.`)
          setTimeout(() => {
            Router.push('/')
          }, 3000 )
        }
          //   const address = await _signer.getAddress()

          // .error(
          //   (err) => {
          //     toast.error(err)
          //     Router.push('/')
          //   }
          // );
        
      } catch (error) {
        console.error("유저 정보 획득 실패:", error)
        return
      }
    } else {
      toast.error('메타마스크를 먼저 설치해 주세요 ㅠ')
      setTimeout(
        () => {Router.push('/intro')},
        2000
      )
    }
    
    Send.get(`https://j6a305.p.ssafy.io/api/categories`)
      .then(res=>setCategories(res.data.data))
      .catch(e=>console.log(e))

  }, [])


  // 블록체인 컨트랙트 생성에 사용되는 더미데이터입니다! 세부사항 완성되면 불러주세요.
  const temp_optionPrices = [ethers.utils.parseEther("0.01"), ethers.utils.parseEther("0.02"), ethers.utils.parseEther("0.03")];
  const temp_startDate = 111111;
  const temp_endDate = 1650422845;
  const temp_targetAmount = ethers.utils.parseEther("3");
  // 펀딩 등록할 때 사용하는 함수입니다! 초반부는 컨트랙트 부분이고 후반부는 백엔드 API 연동 부분입니다.
  const createProject = async () => {
    try {
      const res = await fetch(`https://j6a305.p.ssafy.io/api/user/${userSeq}`);
      const data = await res.json();
      const userWalletAddress = data.userWalletAddress;
      const address = await signer.getAddress()
      if (address !== userWalletAddress) {
        toast.error(`지갑 주소가 저장된 것과 다릅니다.  
        ${userWalletAddress && userWalletAddress.slice(0, 10)}... 주소를 이용하여 주세요.
        \n 곧 메인페이지로 이동합니다.`)
        setTimeout(() => {
          Router.push('/')
        }, 3000 )
      }
      
      
      const factory = new ContractFactory(ABI, Bytecode, signer);
      const contract = await factory.deploy(temp_startDate, temp_endDate, temp_targetAmount, temp_optionPrices);
      const fullMessage = await contract.deployTransaction.wait()
      console.log(fullMessage)
      const contractAddress = contract.address; // 컨트랙트 주소입니다! 이것을 백엔드에 함께 전송해 주십시오!
      
      // 여기서부터 백엔드 API 연동을 해주시면 됩니다.
      const tempProjectData = {...projectData}
      delete tempProjectData.image
      const TotalData = Object.assign({}, creatorData, tempProjectData, {option:fundingData.option}, {userSeq:userSeq, fundingContract:contractAddress})
      const formData = projectData.image
      formData.append("request", new Blob([JSON.stringify(TotalData)], {type: "application/json"}))
      Send.post(`https://j6a305.p.ssafy.io/api/funding`,formData)
        .then(res=>console.log('success'))
        .catch(e=>console.log(`error ${e}`))
      



      // 맨 마지막에는 거래 성공^^
      toast.success('축하합니다! 펀딩이 등록되었습니다! \n 잠시 후 메인페이지로 이동합니다.')
      setTimeout( () => {Router.push('/')}, 4000) // 메인페이지로 이동

    } catch (error) {
      console.log(error)
      toast.error('거래가 정상적으로 이루어지지 않았습니다. 다시 시도해주세요.')
    }
  }


  return (
    <div className="container mx-auto py-10">
      {/* flex: inline-flex -> flex로 */}      
      <div style={{margin: "auto", display: "flex", justifyContent: "center"}}>
        <ButtonGroup style={{color: "#6667AB", margin: "auto"}} className="flex justify-center mb-8" variant="text" aria-label="text button group">
          <Button style={choice === 0 ? {color: "#6667AB", fontWeight: "bold"} : {color: "grey"}} className="font-semibold" onClick={handleChoice} value={0}>창작자 정보</Button>
          <Button style={choice === 1 ? {color: "#6667AB", fontWeight: "bold"} : {color: "grey"}} className="font-semibold" onClick={handleChoice} value={1}>프로젝트 정보</Button>
          <Button style={choice === 2 ? {color: "#6667AB", fontWeight: "bold"} : {color: "grey"}} className="font-semibold" onClick={handleChoice} value={2}>펀딩 계획</Button>
          <Button style={choice === 3 ? {color: "#6667AB", fontWeight: "bold"} : {color: "grey"}} className="font-semibold" onClick={handleChoice} value={3}>정책 안내</Button>
        </ButtonGroup>
      </div>
      
      {choice===0 && <Creator creatorData={creatorData} handleChange={handleChange}/>}
      {choice===1 && <Project projectData={projectData} categories={categories} handleChange={handleChange}/>}
      {choice===2 && <Funding fundingData={fundingData} handleChange={handleChange} addItem={addItem} changeDate={changeDate}/>}
      {choice===3 && <Policy/>}
      <br/>
      { choice <= 2 ? 
      <button style={{borderRadius: "1rem", display: "block"}} className="mt-4 mx-auto text-center border-2 p-3 font-semibold text-[#6667AB] border-[#6667AB]" onClick={handleNext}>다음으로 넘어가기</button>
      : <button style={{borderRadius: "1rem", display: "block"}} className="mt-4 mx-auto text-center border-2 p-3 font-semibold text-white bg-[#6667AB] border-[#6667AB]" onClick={createProject}>동의하고 프로젝트 생성!</button>
      }
      <Toaster />
    </div>
  )
}