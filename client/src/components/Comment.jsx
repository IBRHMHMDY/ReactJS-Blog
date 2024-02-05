import { useEffect, useState } from 'react'
import moment from 'moment'

export default function Comment({comment}) {
    const [user, setUser] = useState({})

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/user/${comment.userId}`);
                const data = await res.json()
                if(res.ok){
                    setUser(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getUser()
    }, [comment])
  return (
        
    <div className='flex text-sm p-4 border-b dark:border-gray-600'>
        <div className='flex-shrink-0 mr-3'>
            <img src={user.profilePicture} 
            alt={user.username} 
            className='rounded-full w-10 h-10 bg-gray-200' />
        </div>
        <div className='flex-1'>
            <div className='flex items-center mb-1 gap-1'>
                <span className='font-bold mr-1 text-xs truncat'>
                    {user ? `@${user.email}` : 'anonymous user'} 
                </span>
                <span className='text-gray-500 text-xs'>{moment(comment.createdAt).fromNow()}</span>
            </div>
            <p className='text-gray-500 pb-2'>{comment.comment}</p>
            <div className=''>
                like
            </div>
        </div>
    </div>

  )
}
