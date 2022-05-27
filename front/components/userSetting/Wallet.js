import { Button } from "@mui/material";
import { useState,useContext } from "react";
import Send from "../../lib/Send"
import { UserContext } from '../../lib/UserContext'
import { ethers, ContractFactory } from 'ethers'


export default function Wallet(props){
  const [walletAddress, setWalletAddress] = useState(props.userData.userWalletAddress)
  const [walletBalance, setWalletBalance] = useState(-1)
  // if (typeof window.ethereum !== 'undefined') {
  //   console.log(window.ethereum);
  // }

  const {userSeq, setUserSeq} = useContext(UserContext);
  
  async function connect() {
    const _provider = new ethers.providers.Web3Provider(window.ethereum)
    await _provider.send("eth_requestAccounts", []);
    const _signer = _provider.getSigner()
    // setProvider(_provider);
    // setSigner(_signer);
    console.log("signer: ", _signer)
    const address = await _signer.getAddress()
    setWalletAddress(address)     
    Send.patch('https://j6a305.p.ssafy.io/api/user', {...props.userData, userWalletAddress:address})
        .then(res=>console.log(res))
        .catch(e=>console.log(e))
    
  }  
  
  return (
    <div>      
      {window.ethereum !== undefined 
      ? <Button onClick={connect}>{walletAddress?"지갑 변경":"지갑 연결"}</Button> 
      : <Button onClick={()=>location.href="https://metamask.io/"}>metamask를 설치해야 합니다.</Button>}
      <p>{walletAddress?`지갑주소: ${walletAddress}`:""}</p>
      {/* {walletBalance === -1 ? <p></p>: <p>지갑잔액: {walletBalance}</p>} */}
    </div>
  )
}