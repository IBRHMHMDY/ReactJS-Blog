import { Button } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function CallToActions() {
  return (
    <div className=''>
        <div className='flex justify-between items-center gap-6 border rounded-tl-xl rounded-br-xl p-3 border-teal-500 '>
            <img src={"https://media.geeksforgeeks.org/wp-content/cdn-uploads/20221114110410/Top-10-JavaScript-Project-Ideas-For-Beginners-2023.png"} alt=""
            width={650} height={150} className='order-2' />
            <div className='flex flex-col gap-4 justify-center items-center w-full text-center'>
                <h2 className='font-semibold text-xl'>Want to learn HTML, CSS and Javascript by building fun and engaging projects?</h2>
                <p className='text-gray-500'>check our 100 projects website and start building your own projects</p>
                
                    <Button gradientDuoTone='purpleToPink' className='w-full border-none rounded-bl-none rounded rounded-tr-none rounded-tl-xl rounded-br-xl px-5 '>
                        100 Javascript Projects
                    </Button>
                
            </div>
            
        </div>
    </div>
  )
}
