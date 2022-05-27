import { Input, Select } from "@mui/material"
import { MenuItem } from "@mui/material"
import { FormControl } from "@mui/material"
import { InputLabel } from "@mui/material"
import { TextField } from "@mui/material"
import { Button } from "@mui/material"
import { display } from "@mui/system"
import { styled } from "@mui/material"
import Texteditor from "./Texteditor"

export default function Project(props){
  const {fundingTitle, fundingSimple, fundingCategory, image, fundingText} = props.projectData  
  
  
  const Input = styled('input')(
    {display: 'none'}
  )

  function checkEvent(event){
    console.log(event)
  }

  function handleImage(event){
    const image = event.target.files[0]
    console.log(image)
    const formData = new FormData()
    formData.append('file',image)
    console.log(formData)
    props.handleChange({target:{name:'image', value:formData}})
  }

  const categoryItems = props.categories.map(item => 
    <MenuItem value={item.categoryNumber} key={item.categoryNumber}>{item.categoryName}</MenuItem>
  )

  return(
    <div className="mt-4 flex flex-col items-center">
      <div className="my-6 flex-col flex items-start">
        <label className="mr-6" htmlFor="fundingTitle">프로젝트 명:</label>
        <TextField 
          type="text" 
          id="fundingTitle" 
          name="fundingTitle"
          onChange={props.handleChange}
          value={fundingTitle}
          className="w-96"
        />
      </div>
      <div className="my-6 flex-col flex items-start">
        <label className="mr-6" htmlFor="fundingSimple">프로젝트 한줄 소개:</label>
        <TextField 
          type="text" 
          id="fundingSimple" 
          name="fundingSimple"
          onChange={props.handleChange}
          value={fundingSimple}
          className="w-96"
        />
      </div>
      <div className="my-6 flex items-center w-96">
        <label className="mr-6" htmlFor="fundingCategory">프로젝트 카테고리:</label>        
        <FormControl sx={{ m:1, minWidth: 120}}>          
          <Select             
            value={fundingCategory}
            onChange={props.handleChange}
            displayEmpty
            name="fundingCategory"
          >
            <MenuItem value="">카테고리 선택</MenuItem>
            {categoryItems}

          </Select>
        </FormControl>
      </div>
      <div className="my-6 flex items-center w-96">
        <label className="mr-6" htmlFor="image">
          프로젝트 이미지 : 
        </label>
          <Input id="image"  accept="image/*" multiple type="file" name="image" onChange={handleImage} />
          <Button variant="contained" component="span">
            Upload
          </Button>          
      </div>
      <div className="my-6 mt-12 flex items-start flex-col w-9/12 mx-auto">
        <label htmlFor="fundingText">프로젝트 설명:</label>
        {/* <TextField 
          type="text" 
          id="description" 
          name="description"
          onChange={props.handleChange}
          value={description}
        /> */}        
        <Texteditor id="fundingText" handleChange={props.handleChange}/>
      </div>
    </div>    
  )
}