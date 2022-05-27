import { TextField } from "@mui/material"
import Image from 'next/image';

export default function Creator(props){
  const {userNickname, userPhone, userIntroduce} = props.creatorData
  
  return(

    <div className="flex flex-col items-center">
      <div className="my-10">
        <Image className="my-6" style={{marginBottom: "3rem"}} width={150} height={40} src="/welcome.png" alt="welcome" />      
      </div>
      <div className="flex items-center my-6 w-2/4">
        <label className="mr-5" htmlFor="userNickname">창작자 닉네임:</label>
        <TextField 
          type="text"
          id="userNickname" 
          name="userNickname"
          onChange={props.handleChange}
          value={userNickname}
          className="w-3/4"
        />
      </div>
      <div className="flex items-center my-6 w-2/4">
        <label className="mr-5"  htmlFor="userPhone">창작자 연락처:</label>
        <TextField 
          type="text" 
          id="userPhone" 
          name="userPhone"
          onChange={props.handleChange}
          value={userPhone}
          className="w-3/4"
        />
      </div>
      <div className="flex items-center my-6 w-2/4">
        <label className="mr-5" htmlFor="userIntroduce">창작자 소개글: </label>
        <TextField 
          type="text" 
          id="userIntroduce" 
          name="userIntroduce"
          onChange={props.handleChange}
          value={userIntroduce}
          multiline
          className="w-3/4"
        />
      </div>
    </div>
  )
}