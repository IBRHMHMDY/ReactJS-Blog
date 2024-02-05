import { useEffect, useState } from 'react'
import moment from 'moment'
import {FaPencil, FaThumbsUp, FaTrash} from 'react-icons/fa6'
import { useSelector } from 'react-redux'
import { Button, Textarea } from 'flowbite-react'

export default function Comment({comment, onLike, onEdit, onDelete}) {
    const { currentUser } = useSelector(state => state.user)
    const [user, setUser] = useState({})
    const [isEditing, setIsEditing] = useState(false)
    const [editComment, setEditComment] = useState(comment.comment)
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
    }, [comment]);

    const handleEditComment = async()=>{
        setIsEditing(true)
        setEditComment(comment.comment)
    }
    const handleUpdate = async()=>{
        try {
            const res = await fetch(`/api/comment/edit/${comment._id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({comment: editComment})
            });
            if(res.ok){
                setIsEditing(false)
                onEdit(comment, editComment)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

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
            {isEditing ? (
                <>
                <Textarea className='mt-3' 
                        rows={3} value={editComment} 
                        onChange={(e)=> setEditComment(e.target.value)}/>
                <div className='flex justify-end items-center gap-2 mt-3'>
                    <Button type='button' gradientDuoTone='purpleToPink' 
                            size='sm' onClick={handleUpdate}>Update</Button> 
                    <Button type='button' gradientDuoTone='purpleToPink' 
                            size='sm' outline onClick={()=> setIsEditing(false)}>Cancel</Button> 
                </div>
                </>
            ):(
                <>
                    <p className='text-gray-500 pb-2'>{comment.comment}</p>
                    <div className='flex items-center gap-6 pt-2 border-t max-w-fit dark:border-gray-700'>
                        <div className='flex items-center gap-2'>
                            <button type='button' onClick={()=>onLike(comment?._id)}
                            className={`text-gray-400 hover:text-blue-500 
                            ${currentUser && comment.likes.includes(currentUser._id) && '!text-blue-500'}`}>
                                <FaThumbsUp className='text-sm'/>
                            </button>
                            <p className='text-gray-400'>
                                {comment.numberOfLikes > 0 &&
                                comment.numberOfLikes + ' ' + 
                                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
                            </p>
                        </div>
                        {
                            currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) && (
                                <button type='button'
                                    className='text-gray-400 hover:text-blue-500'
                                    onClick={handleEditComment}>
                                        <FaPencil className='text-sm'/>
                                </button>
                            )
                        }
                        
                        <button type='button' onClick={()=>onDelete(comment?._id)}
                                className='text-gray-400 hover:text-red-500'>
                            <FaTrash className='text-sm'/>
                        </button>
                    </div>
                </>
            )}
        </div>
    </div>

  )
}
