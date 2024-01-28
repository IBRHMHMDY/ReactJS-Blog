import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {Alert, Button, Label, Spinner, TextInput} from 'flowbite-react'
import Logo from '../components/Logo';
import {useDispatch, useSelector} from 'react-redux';
import {SignUpFailure, signUpStart, signUpSuccess} from '../redux/user/userSlice'

export default function SignUp() {
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return dispatch(SignUpFailure("Please fill all fields."));
    }

    try {
      dispatch(signUpStart())
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(SignUpFailure(data.message))
      }
      if(res.ok){
        dispatch(signUpSuccess(data))
        navigate('/login')
      }
    } catch (error) {
      dispatch(SignUpFailure(error.message))
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
              <Label value='Your Name'/>
              <TextInput
              type='text'
              placeholder='Username'
              id='username'
              onChange={handleChange}
               />
            </div>
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
                ) : 'SignUp'
              }
            </Button>
          </form>
          <div className='flex gap-2 mt-5'>
            <span>Have an Account? </span>
            <Link to='/login' className='text-blue-500'>Login</Link>
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
