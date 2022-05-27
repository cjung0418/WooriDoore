import { ethers } from 'ethers'
import ABI from './ABI.json'

const provider = new ethers.providers.AlchemyProvider("maticmum", "uuZ1M18wKF7wrp9SSrHJ2IpznLixKBRb")

const contractGetter = (address) => {
  return new ethers.Contract(address, ABI, provider)
}

export default contractGetter