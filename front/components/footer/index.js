import Link from 'next/link';


export default function Footer() {
  
  return (
    <footer id="footer" className="flex flex-col gap-[1.5rem] mt-[7rem] mb-[2rem]">
      <div className="flex justify-center gap-[2rem]">
        <a href="#">
          {/* <img src="/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <span className="text-2xl antialiased font-semibold">우리두레</span>
        </a>
        <ul className="flex flex-wrap items-center text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
          </li>
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
          </li>
          <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
          </li>
          <li>
              <a href="#" className="hover:underline">Contact</a>
          </li>
        </ul>
      </div>
      <hr />
      <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 
        <a href="#" className="hover:underline">우리두레™</a>. 
        All Rights Reserved.
      </span>
    </footer>
  )
}