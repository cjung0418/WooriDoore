import {useState,useContext} from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Button } from "@mui/material"
import { UserContext } from '../../lib/UserContext'
import FollowDialog from "./FollowDialog";
import {follow, unfollow} from '../../lib/User'
import Router from "next/router";
import Image from "next/image";

export default function Basic(props){  
  const isMine = props.isMine
  const [isEdit, setIsEdit] = useState(false)  
  const [isFollow, setIsFollow] = useState(props.followerList.find(x=>x.userSeq===userSeq) !== undefined ? true: false)
  const [open, setOpen] = useState(false)
  const [showChoice, setShowChoice] = useState(0)
  const {userSeq, setUserSeq} = useContext(UserContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setShowChoice(0);
  };

  function followChange(){
    if(!userSeq) {
      Router.push('login/')
    }
    if (isFollow) {
      follow(userSeq, props.profileId)
      setIsFollow(prev => !prev)
    } else {
      unfollow(userSeq, props.profileId)
      setIsFollow(prev => !prev)
    }
  }

  return(
    <div className="flex flex-row justify-center align-middle">            
      <img className="h-32 w-32 m-4" src={props.userData.userImage===null?"https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max":props.userData.userImage} alt="userImg" />

      <div>
        <p className="pl-4">{props.userData.userNickname}
          {isMine && <button className="pl-2" onClick={()=>Router.push('/setting')}><SettingsIcon/></button>}
          {!isMine && !isFollow && <Button onClick={()=>{ followChange(),setIsFollow(!isFollow)}}>Follow</Button>}
          {!isMine && isFollow && <Button onClick={()=>{followChange(),setIsFollow(!isFollow)}}>UnFollow</Button>}
        </p>
        <div className="flex flex-row" onClick={handleClickOpen}>
          <div className="flex flex-col items-center">
            <p className="p-2">팔로잉</p>
            <p className="p-2">{props.followingList.length}</p>            
          </div>
          <div className="flex flex-col items-center">
            <p className="p-2">팔로우</p>
            <p className="p-2">{props.followerList.length}</p>            
          </div>          
        </div>
        <FollowDialog
          open={open}
          onClose={handleClose}
          showChoice={showChoice}
          followerList={props.followerList}
          followingList={props.followingList}
          setShowChoice={setShowChoice}
        />
      </div>
      <div className="p-4">
        <p>자기소개 글 
          {isMine && !isEdit && <button onClick={()=>setIsEdit(true)}><EditIcon/></button>}
          {isEdit && <button onClick={()=>setIsEdit(false)}><CheckCircleOutlineIcon/></button>}</p>
        <textarea name="userIntroduce" disabled={isEdit?false:true} value={props.userData.userIntroduce?props.userData.userIntroduce:""} onChange={props.handleChange}/>
      </div> 
    </div>
  )
}