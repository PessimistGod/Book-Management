import React from 'react'

import { BiSolidBookAdd } from 'react-icons/bi';

const BooksPage = () => {
  return (
    <section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-wrap -m-4">
        <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
          <div class="block relative h-48 rounded overflow-hidden">
            <img alt="ecommerce" class=" object-center w-full h-full block object-contain" src="https://covers.openlibrary.org/b/id/9326654-M.jpg" />

          
          </div>
         
          <div class="mt-4">
            <h3 class="text-gray-500 text-xs tracking-widest title-font mb-1">Author 1 Author 2</h3>
            <h2 class="text-gray-900 title-font text-md font-normal">Harry Potter and the Half-Blood Prince</h2>
            <p className='text-gray-400 text-[0.65rem] text-justify'>Potter, harry (fictitious character), fiction Hogwarts school of witchcraft and wizardry (imaginary organization), fiction Wizards, fiction Fantasy fiction Children's fiction Magic, fiction Schools, fiction England, fiction</p>
            <div className='flex justify-between items-center my-1'>
            <p class="mt-1">$16.00</p>
          <button className=' px-4 py-1 bg-gray-800 hover:bg-black text-white border rounded-2xl whitespace-nowrap'><BiSolidBookAdd className='inline m-1'/>Add To Cart</button>
            </div>
          </div>
        </div>
        </div>
  </div>
</section>
  )
}

export default BooksPage