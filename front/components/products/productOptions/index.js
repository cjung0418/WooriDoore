import CustomButton from '../../ui/button/button';
import Router from "next/router";

const ProductOptions = ({option}) => {

  const checkOut = (e) => {
    e.preventDefault();
    Router.push("/order");
  }

  return (
    <article className="flex flex-col gap-[1rem] max-w-sm overflow-hidden shadow-lg">
      <img className="self-center w-fit mt-[2rem]" src="/welcome.png" alt="Sunset in the mountains" />
      <hr className="mx-[2rem]" />
      <section className="px-6 py-4">
        <div className="mb-2 text-2xl font-bold">{option.optionPrice} ETH</div>
        <div className="mb-2 text-xl font-bold">{option.optionTitle} - {option.optionMaxamount}개입</div>
        <p className="text-base text-gray-700">{option.optionText}</p>
      </section>

      <CustomButton func={checkOut} text="펀딩하기" classNameProp="w-40 py-[0.5rem] bg-theme-color text-white font-black antialiased text-xl self-center" />

      <section className="px-6 pt-4 pb-2">
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#early bird</span>
        <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#한정수량</span>
      </section>
    </article>
  )
}

export default ProductOptions;