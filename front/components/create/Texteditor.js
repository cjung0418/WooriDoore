import { useRef, useState, useMemo, createRef, forwardRef, useEffect } from 'react'
import Image from 'next/image'
// import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Send from "../../lib/Send"
import axios from 'axios'
import dynamic from 'next/dynamic'



const ReactQuill = dynamic(async () => {
  const { default: RQ } = await import('react-quill')
  return function comp({ forwardedRef, ...props}) {
    return <RQ ref={forwardedRef} {...props}/>
  }
}, { ssr: false })


export default function Texteditor(props){

  const [value, setValue] = useState('')
  const [tempValue, setTempValue] = useState()
  const [tempValue2, setTempValue2] = useState()
  const quillRef = useRef()
  
  const modules = useMemo(() => {
    return { 
      toolbar: {
        container:[
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link','image'],
          ['clean']
        ],
        handlers: {
          image: imageHandler,
          }
      }
    }
  }, [])

  useEffect(()=>{
    props.handleChange({target:{name:'fundingText', value:value}})
  }, [value])

  function imageHandler() {    
    const input = document.createElement('input')

    

    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.addEventListener('change', async () => {
      let img = input.files[0]           
      const formData = new FormData()
      formData.append('files',img)
      const result = await axios.post(`https://j6a305.p.ssafy.io/api/file`, formData)
        // .then(res=>console.log(res))
        // .catch(e=>console.log(e))
      const IMG_URL = await result.data.file
      console.log(IMG_URL)
      const editor = quillRef.current.getEditor()
      const range = editor.getSelection()      
      setTempValue(<Image src={IMG_URL} width={300} height={300}/>)
      setTempValue2(<img src={IMG_URL}/>)
    })   
  }
  console.log(typeof(value))

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]
  
  return(
    <div style={{height: "500px", width: "100%"}}>
      {/* <QuillNoSSRWrapper ref={quillRef} theme="snow" modules={modules} formats={formats} onChange={setValue}/> */}
      {tempValue}
      {tempValue2}
      {/* <Image src='/files/2022/4/6/d2bb8674-f129-4af2-9304-ef91928780dd_ethereum.png' width={300} height={300}/> */}
      <ReactQuill style={{height: "500px"}} forwardedRef={quillRef} theme="snow" modules={modules} formats={formats} value={value} onChange={setValue}/>
    </div>
  )
}