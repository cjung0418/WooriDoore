import { motion } from "framer-motion";
import OptionTable from "../optionTable";

const addSubt = ({ option, idx, choices, setChoices }) => {

  const minus = () => {
    console.log(choices)
    const temp = [...choices]
    console.log("temp는", temp)
    choices[idx] > 0 && (temp[idx] -= 1)
    setChoices(temp)
  } 

  const add = () => {
    console.log(choices)
    setChoices((choices) => {
      const temp = [...choices]
      temp[idx] += 1
      console.log(temp)
      return temp
    })
  }
  
  return (
    <div>
      <motion.button 
        whileTap={{ scale: 0.98 }} 
        className="flex flex-col items-center gap-[0.5rem] shadow-lg hover:text-theme-color hover:shadow-gray-400/70 rounded-xl" 
        onClick={add}
      >
        <OptionTable option={option} key={option.optionTitle} />
      </motion.button>
      <div className="flex my-4 justify-evenly">
      <button onClick={minus} style={{borderRadius: "0.5rem", display: "block"}} className="mx-auto text-center border-2 p-3 text-white bg-[#6667AB] font-semibold border-[#6667AB]">-</button>
        <div style={{borderRadius: "0.5rem"}} className="w-32 p-3 text-xl text-center border-2 border-theme-color text-bold">
          {choices[idx]}
        </div>
      <button onClick={add} style={{borderRadius: "0.5rem", display: "block"}} className="mx-auto text-center border-2 p-3 text-white bg-theme-color font-semibold border-[#6667AB]">+</button>
        <button>

        </button>

      </div>

    </div>
  )

}

export default addSubt;