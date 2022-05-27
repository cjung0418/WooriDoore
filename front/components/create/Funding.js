import { LocalizationProvider } from "@mui/lab"
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { DatePicker } from "@mui/lab"
import { Button, TextField } from "@mui/material"
import { TimePicker } from "@mui/lab"
import { useState } from "react"
import { Dialog } from "@mui/material"
import { DialogTitle } from "@mui/material"
import { DialogContent } from "@mui/material"
import { InputAdornment } from "@mui/material"
import { DialogActions } from "@mui/material"
import { List } from "@mui/material"
import { ListItem } from "@mui/material"
import { ListItemText } from "@mui/material"

export default function Funding(props){
  const {goal, startDay, startTime, endDay, option} = props.fundingData
  const [open, setOpen]   = useState(false);
  const [itemData, setItemData] = useState({optionTitle:"", optionPrice:"", optionDescription:"", optionMaxAmount:1})


  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false);
    setItemData({optionTitle:"", optionPrice:0, optionDescription:"", optionMaxAmount:1})
  }

  function handleItem(event){
    const {name,value} = event.target
    setItemData(prevData => {
      return {
        ...prevData,
        [name]: value
      }
    })
  }

  function changeOption(){
    for (const item in itemData){
      if ((item !== "optionMaxAmount") || (item !== "optionPrice")) {
        if(itemData[item] === "") {
          alert("빈 공간이 있습니다.")
          return
        }
      } else {
        if (itemData[item] < 0) {
          alert("숫자는 음수가 될 수 없습니다.")
          return
        }
      }
    }    
    props.addItem(itemData)
    handleClose()
  }

  function addDays(date, days){
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const itemList = option.map((option,index) => {
    return (
      <ListItem sx={{border: "2px solid #6667AB", borderRadius: "5px"}} key={index}>
        <ListItemText primary={`${option.optionTitle}: ${option.optionPrice}ETH에 ${option.optionDescription}의 구성`} />
      </ListItem>
    )
  })
  
  return(
    <div className="grid gap-6 items-center mt-16 w-5/12 mx-auto min-w-max">
      <div className="flex grid-cols-12 flex-col items-left">
        <label htmlFor="goal">목표 금액</label>
        <TextField 
          type="text"
          id="goal" 
          name="goal"
          InputProps={{
            endAdornment:<InputAdornment position="end">ETH</InputAdornment>,
          }}
          onChange={props.handleChange}
          value={goal}
        />
      </div>
      <LocalizationProvider dateAdapter={AdapterDateFns} sx={{ marginY: "1.5rem" }}>
        <DatePicker
          label="시작일"
          value={startDay}
          minDate={new Date()}
          onChange={(newVal)=> props.changeDate(newVal,"startDay")}
          renderInput={(params)=> <TextField {...params} />}
        />
        <TimePicker
          label="시작시간(한 시간 단위)"
          views={['hours']}
          value={startTime}          
          onChange={(newVal)=> props.changeDate(newVal,"startTime")}
          ampm={true}
          renderInput={(params)=> <TextField {...params} />}       
        />
        <DatePicker
          label="종료일"
          value={endDay}
          disabled={startDay && startTime ? false : true}
          minDate={startDay}
          maxDate={addDays(startDay, 60)}
          onChange={(newVal)=> props.changeDate(newVal,"endDay")}
          renderInput={(params)=> <TextField {...params} />}
        />
      </LocalizationProvider>
      <div>
        <p>선물옵션</p>
        <List>
          {itemList}
        </List>
      </div>
      <Button sx={{width: "100px", marginLeft: "auto"}} variant="outlined" onClick={handleClickOpen}>+ 새 옵션</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>새로운 옵션</DialogTitle>
        <DialogContent>
          <TextField
            className="my-3"
            label="옵션 제목"
            type="text"
            fullWidth
            required
            value={itemData.optionTitle}
            name="optionTitle"
            onChange={handleItem}
          />
          <TextField
            className="my-3"
            label="옵션 가격"
            type="number"
            fullWidth
            value={itemData.optionPrice}
            InputProps={{
              endAdornment:<InputAdornment position="end">ETH</InputAdornment>,
            }}
            name="optionPrice"
            onChange={handleItem}
          />
          <TextField
            className="my-3"
            label="옵션 내용"
            type="text"
            fullWidth
            required
            value={itemData.optionDescription}
            name="optionDescription"
            onChange={handleItem}
          />
          <TextField
            className="my-3"
            label="옵션 최대 선택 가능 개수"
            type="number"
            fullWidth
            value={itemData.optionMaxAmount}
            InputProps={{
              endAdornment:<InputAdornment position="end">개</InputAdornment>,
            }}
            name="optionMaxAmount"
            onChange={handleItem}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={changeOption}>등록</Button>
          <Button onClick={handleClose}>취소</Button>
        </DialogActions>

      </Dialog>
      
    </div>
  )
}