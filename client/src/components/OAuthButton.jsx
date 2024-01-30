import { Button } from 'flowbite-react'
import React from 'react'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { signInSuccess } from '../redux/user/userSlice'
import {useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleOAuthGoogle = async()=>{
        const Auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account'});
        try {
            const authGoogle = await signInWithPopup(Auth, provider)
            const res = await fetch('/api/auth/google', {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: authGoogle.user.displayName,
                    email: authGoogle.user.email,
                    googlePhotoUrl: authGoogle.user.photoURL
                })
            })
            const data = res.json()
            console.log(data);
            if(res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <Button type='submit' gradientDuoTone="pinkToOrange" outline
            onClick={handleOAuthGoogle} >
        <AiFillGoogleCircle className='mr-2 w-6 h-6'/> Continue with Google
    </Button>
  )
}

