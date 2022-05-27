import { Button } from "@mui/material"

export default function Account(props){
  const { userEmail, userPhone } = props.userData
  return(
    <div>
      <div className="flex justify-between">
        <p>이메일</p>
        
      </div>      
      <div className="flex justify-between">
        <p>연락처</p>
        
      </div>      
    </div>
  )
}