import { Button } from "@mui/material"
import { useState, useMemo, useEffect } from "react"

export default function Profile(props){
  const { userNickname, userImage, userIntroduce } = props.userData
  const [changeChoice, setChangeChoice] = useState(-1)
  const [nameContent, setNameContent] = useState(userNickname)
  const [textContent, setTextContent] = useState(userIntroduce)
  function textChange(event){
    setTextContent(event.target.value)
  }
  
  useEffect(async()=>{
    await setNameContent(userNickname)
    await setTextContent(userIntroduce)
  },[props])
  console.log("render")

  function nameChange(event){
    setNameContent(event.target.value)
  }  
  function confirmChange(idx,value){
    const choices = [userImage, userNickname, userIntroduce]    
    const names = ['userImage','userNickname' ,'userIntroduce']
    console.log("confirm")
    console.log(idx, value)
    console.log(choices[idx], "dd", value)

    if (choices[idx] !== value){
      console.log('change')
      props.handleChange(names[idx], value)
    }
  }


  return (
    <div>      
      <div className="flex justify-between">      
        <p>프로필 사진</p>
        <Button onClick={()=>setChangeChoice(0)}>변경</Button>
      </div>
      <img className="h-16 w-16 rounded" src="https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max" alt="profileImg" />
      <div className="flex justify-between">
        <p>이름</p>        
        <div>
          {changeChoice===1?<Button onClick={()=>{confirmChange(1,nameContent), setChangeChoice(-1)}}>확정</Button>:<Button onClick={()=>setChangeChoice(1)}>변경</Button>}
          {changeChoice===1 && <Button onClick={()=>{setNameContent(userNickname===null?"":userNickname), setChangeChoice(-1)}}>취소</Button>}
        </div>        
      </div>      
      <input type="text" disabled={changeChoice===1?false:true} onChange={nameChange}  value={nameContent}/>
      <div className="flex justify-between">
        <p>소개</p>
        <div>
          {changeChoice===2?<Button onClick={()=>{confirmChange(2,textContent), setChangeChoice(-1)}}>확정</Button>:<Button onClick={()=>setChangeChoice(2)}>변경</Button>}
          {changeChoice===2 && <Button onClick={()=>{setTextContent(userIntroduce===null?"":userIntroduce), setChangeChoice(-1)}}>취소</Button>}
        </div>
      </div>
      <textarea disabled={changeChoice===2?false:true} name="text" id="" cols="30" rows="10" onChange={textChange} value={textContent}></textarea>      
    </div>
  )
}