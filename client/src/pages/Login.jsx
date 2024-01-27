import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import Logo from '../components/Logo';

export default function Login() {
  
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.password){
      return setErrorMessage("Please fill out all fields.");
    }
    try {
      setLoading(true)
      setErrorMessage(null)
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col md:flex-row max-w-3xl mx-auto md:items-center p-4 gap-5'>
        {/* Left */}
        <div className='flex flex-col p-3 mx-auto gap-4 flex-1'>
          <Logo Url='/' StyleLink='whitespace-nowrap text-4xl font-semibold dark:text-white'
                StyleSpan='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'/>
          <p className='text-sm'>You can Signup by Username and Password Or by Google Account</p>
        </div>
        {/* Right */}
        <div className='flex flex-col flex-1'>
          {/* Form */}
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Your Email'/>
              <TextInput
              type='email'
              placeholder='example@gmail.com'
              id='email'
              onChange={handleChange}
               />
            </div>
            <div>
              <Label value='Your Password'/>
              <TextInput
              type='password'
              placeholder='Your Password'
              id='password'
              onChange={handleChange}
               />
            </div>
            <Button type='submit' gradientDuoTone="purpleToPink" disabled={loading}>
              {
                loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : 'Login'
              }
            </Button>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Don't Have an Account? </span>
            <Link to='/signup' className='text-blue-500'>SignUp</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5 text-xl' color="failure">{errorMessage}</Alert>
            )
          }
        </div>
      </div>
    </div>
  )
}
