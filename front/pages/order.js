import { useState, useRef, useContext, useEffect } from "react";
import RecepientForm from "../components/orderPage/recepientForm";
import { motion } from "framer-motion";
import Image from 'next/image';
import { UserContext } from "../lib/UserContext";
import CustomButton from "../components/ui/button/button";
import FinalConfirm from "../components/orderPage/finalConfirm";
import AddSubt from "../components/orderPage/addsubt";
import Send from "../lib/Send";
import Router from "next/router";
// import {useRouter} from 'next/router';
import { ethers, ContractFactory } from 'ethers'
import toast, { Toaster } from 'react-hot-toast';
import ABI from '../lib/ABI.json'
import Bytecode from '../lib/Bytecode.json'

const Order = () => {
  
  const [orderProcess, setOrderProcess] = useState(0);
  const [openPostSearch, setOpenPostSearch] = useState(false);

  const {curOption, setCurOption} = useContext(UserContext);
  const {userSeq, setUserSeq} = useContext(UserContext);
  const {fundSeq, setFundSeq} = useContext(UserContext);

  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState('');
  const [receiver, setReceiver] = useState('');
  const [telNumber, setTelNumber] = useState('');
  const phoneRef = useRef();

  const temp = []
    for (let i = 0; i < curOption.length; i ++) {
      temp.push(0)
    }
  const [choices, setChoices] = useState(temp);
  const [provider, setProvider] = useState(null)
  const [signer, setSigner] = useState(null)

  //https://velog.io/@sbinha/next.js-Router%EB%A5%BC-%ED%86%B5%ED%95%B4-props-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84
  // 위 글대로 했는데 왜 안되지;
  // const router = useRouter();
  // console.log("option:", router.query.option);
  // console.log("fundingSeq:", router.query.fundingSeq);


  const handlePhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const numberLength = 11;

    let result;
    result = "";  

    for (let i = 0; i < value.length && i < numberLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;

        default:
          break;
      }

      result += value[i];
    }

    phoneRef.current.value = result;

    setTelNumber(e.target.value); 
  };

  const togglePostSearch = (e) => {
    e.preventDefault();
    openPostSearch ? close() : open();
  }
  const open = () => setOpenPostSearch(true);
  const close = () => setOpenPostSearch(false);

  const toProductSelection = (e) => {
    e.preventDefault();
    setOrderProcess(0);
  }
  const toRecepientForm = (e) => {
    e.preventDefault();
    setOrderProcess(1);
  }
  const toFinalConfirm = (e) => {
    e.preventDefault();
    setOrderProcess(2);
  } 

  const confirmFinalOrder = async (e) => {
    e.preventDefault();
    const contract = new ethers.Contract('0x2aDbcD4Be17fB724b39ad7FC80963b118669A805', ABI, signer);
    try {
      await contract.fund(choices, {value: ethers.utils.parseEther("0.06")})
    
    for (let i = 0; i < choices.length; i++) {
      let data = {
        "userSeq": userSeq,
        "fundingSeq": fundSeq,
        "optionNum": choices[i],
        "optionSeq": i,
      }
      if (data.optionNum) {
        Send.post('/history', data)
          .then((res) => {
            console.log(res);
            setCurOption([]);
            setFundSeq('');
            Router.push('/paymentDone');
          })
          .catch((err) => {
            console.log(err);
          })
      }
    }
    } catch (error) {
      toast.error("거래가 정상적으로 완료되지 않았어요 ㅠ")
    }
  }

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

  }, [])
  

  return (
    <main className="flex flex-col gap-[5rem]">
      <nav className="flex flex-row justify-center gap-[4rem]">
        <motion.button 
          whileTap={{ scale: 0.98 }} 
          className={`${orderProcess === 0 && "text-theme-color border-theme-color/70 border-b-4"} "rounded-lg hover:text-theme-color hover:border-b-4 w-20 h-10`}
          onClick={toProductSelection}
        >
          <span className="text-lg antialiased font-medium">상품 선택</span>
        </motion.button>
        <Image src="/arrow.svg" height={20} width={20} />
        <motion.button 
          whileTap={{ scale: 0.98 }} 
          className={`${orderProcess === 1 && "text-theme-color border-theme-color/70 border-b-4"} "rounded-lg hover:text-theme-color hover:border-b-4 w-20 h-10`}
          onClick={toRecepientForm}
        >
          <span className="text-lg antialiased font-medium">수령 정보</span>
        </motion.button>
        <Image src="/arrow.svg" height={20} width={20} />
        <motion.button 
          whileTap={{ scale: 0.98 }} 
          className={`${orderProcess === 2 && "text-theme-color border-theme-color/70 border-b-4"} "rounded-lg hover:text-theme-color hover:border-b-4 w-20 h-10`}
          onClick={toFinalConfirm}
        >
          <span className="text-lg antialiased font-medium">최종 확인</span>
        </motion.button>
      </nav>

      {orderProcess === 0 && (
        <section className="flex flex-col items-center gap-[2rem] border-2 py-[1rem] mx-[255px]">
          <section className="flex flex-wrap justify-center gap-x-[45px] gap-y-[96px] my-10">
            {curOption && curOption.map((option, idx) => (
              <AddSubt choices={choices} setChoices={setChoices} option={option} idx={idx} key={option.optionTitle}>
              </AddSubt>
            ))}
          </section>
          <CustomButton text="수령정보 입력" func={toRecepientForm} classNameProp="bg-theme-color text-white font-semibold w-40 h-10 self-center mt-[-1rem] mb-[2rem]" />
        </section>
      )}

      {orderProcess === 1 && (
        <RecepientForm 
        togglePostSearch={togglePostSearch} 
        setReceiver={setReceiver} 
        receiver={receiver} 
        setOrderProcess={setOrderProcess}
        address={address}
        setAddress={setAddress}
        setAddress2={setAddress2} 
        handlePhone={handlePhone} 
        phoneRef={phoneRef} 
        openPostSearch={openPostSearch}
        handleClose={close}
        telNumber={telNumber}
        />
      )
      }
      {orderProcess === 2 && (
        <FinalConfirm confirmFinalOrder={confirmFinalOrder} curOption={curOption} choices={choices} />
      )}
      

      <section>
        
      </section>
      <Toaster></Toaster>
    </main>
    
  )
}

export default Order;