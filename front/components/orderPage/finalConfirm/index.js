import CustomButton from "../../ui/button/button";
import {useState, useEffect} from 'react';

const FinalConfirm = ({confirmFinalOrder, curOption, choices}) => {
  
  const [total, setTotal] = useState(0);

  const getTotal = () => {
    let temp = 0;
    for(let i = 0; i < choices.length; i ++) {
      temp = temp + (curOption[i].optionPrice * choices[i])
    }
    setTotal(temp);
  }
  
  useEffect(() => {
    getTotal();
  }, [])

  return (
    <section className="flex flex-col items-center gap-[3rem] border-2 py-[4rem] mx-[255px]">
      {choices.map((choice, idx) => (
        choice && (
        <div className="flex flex-row justify-center">
          <p>펀드 상품명 : {curOption[idx].optionTitle}</p>
          <p className="text-white">------</p>
          <p>가격 : {curOption[idx].optionPrice}</p>
          <p className="text-white">------</p>
          <p>수량 : {choice} 개</p>
        </div>
        )
      ))}
      <hr className="w-[26rem] border-theme-color/60 border-2"></hr>
      <div className="flex flex-row justify-center border-b-4">
        <p className="text-xl ">총 가격 :</p>
        <p className="text-white">------</p>
        <p className="text-xl">{total}원</p>
      </div>
      <CustomButton 
        func={confirmFinalOrder}
        text="최종 구매 확정"  
        classNameProp="bg-theme-color text-white font-semibold w-40 h-10 " />
    </section>
  )

}

export default FinalConfirm;