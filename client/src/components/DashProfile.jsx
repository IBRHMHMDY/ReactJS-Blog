import { TextInput } from 'flowbite-react';
import {useSelector} from 'react-redux'
import {HiMail, HiUser, HiKey} from 'react-icons/hi'

export default function DashProfile() {

    const {currentUser} = useSelector(state => state.user);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
                    <img src={currentUser.profilePicture} alt="" className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
                </div>
                <TextInput type='text' id='username' icon={HiUser} placeholder='UserName' defaultValue={currentUser.username}/>
                <TextInput type='email' id='email' icon={HiMail} placeholder='Your Email' defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' icon={HiKey} placeholder='password' />

            </form>

        </div>
    )
}
