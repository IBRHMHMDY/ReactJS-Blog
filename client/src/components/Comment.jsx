import { useEffect, useState } from 'react'
import moment from 'moment'
import {FaPencil, FaThumbsUp, FaTrash} from 'react-icons/fa6'
import { useSelector } from 'react-redux'

export default function Comment({comment, onLike}) {
    const [user, setUser] = useState({})
    const { currentUser } = useSelector(state => state.user)
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

            <div className='flex items-center gap-2 pt-2 border-t max-w-fit dark:border-gray-700'>
                <button type='button' onClick={()=>onLike(comment?._id)}
                className={`flex items-center gap-2 text-gray-400 hover:text-blue-500 
                ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                    <FaThumbsUp className='text-sm'/>
                    <p className='text-gray-400'>
                        {comment.numberOfLikes > 0 &&
                        comment.numberOfLikes + ' ' + 
                        (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                    </p>
                </button>
                <button type='button' onClick={()=>editComment(comment?._id)}
                className='text-gray-400 hover:text-blue-500'>
                    <FaPencil className='text-sm'/>
                </button>
                <button type='button' onClick={()=>removeComment(comment?._id)}
                className='text-gray-400 hover:text-blue-500'>
                    <FaTrash className='text-sm'/>
                </button>
            </div>
        </div>
    </div>

  )
}
