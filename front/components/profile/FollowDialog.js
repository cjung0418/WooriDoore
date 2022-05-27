import { Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person'
import { Button } from "@mui/material"
import { blue } from "@mui/material/colors"

export default function FollowDialog(props){

  const { onClose, open, showChoice, setShowChoice, followingList, followerList} = props

  return(
    <Dialog onClose={onClose} open={open}>
      <DialogTitle><Button onClick={()=>setShowChoice(0)}>Following</Button><Button onClick={()=>setShowChoice(1)}>Follower</Button></DialogTitle>
      {showChoice === 0 && <List sx={{ pt: 0 }}>
        {followingList.map((following) => (
          <ListItem button key={following.seller}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            {/* 이 부분 userNickname으로 바꿀 것 */}
            <ListItemText primary={following.seller} />
          </ListItem>
        ))}        
      </List>}
      {showChoice === 1 && <List sx={{ pt: 0 }}>
        {followerList.map((follower) => (
          <ListItem button  key={follower.userSeq}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            {/* 이 부분 userNickname으로 바꿀 것 */}
            <ListItemText primary={follower.userSeq} />
          </ListItem>
        ))}        
      </List>}
    </Dialog>
  )
}