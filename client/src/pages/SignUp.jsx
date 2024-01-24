import React from 'react'
import { Link } from 'react-router-dom'
import {Button, Label, TextInput} from 'flowbite-react'
export default function Signup() {
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row max-w-3xl mx-auto md:items-center p-4 gap-5'>
        {/* Left */}
        <div className='flex flex-col p-3 mx-auto gap-4 flex-1'>
          <div className='whitespace-nowrap text-4xl font-semibold dark:text-white'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>SelfStudy</span>
              BLOG
          </div>
          <p className='text-sm'>You can Signup by Username and Password Or by Google Account</p>
        </div>
        {/* Right */}
        <div className='flex flex-col flex-1'>
          {/* Form */}
          <form className='flex flex-col gap-4'>
            <div>
              <Label value='Your Name'/>
              <TextInput
              type='text'
              placeholder='Username'
              id='username'
               />
            </div>
            <div>
              <Label value='Your Email'/>
              <TextInput
              type='text'
              placeholder='example@gmail.com'
              id='email'
               />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
              type='text'
              placeholder='Your Password'
              id='password'
               />
            </div>
            <Button gradientDuoTone="purpleToPink" type='submit'>SignUp</Button>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Have an Account</span>
            <Link to='/login' className='text-blue-500'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}


// 