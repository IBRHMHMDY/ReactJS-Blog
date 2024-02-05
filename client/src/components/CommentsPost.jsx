import {useSelector} from 'react-redux'
import { Link } from 'react-router-dom'
import {Alert, Button, Modal, Textarea} from 'flowbite-react'
import { useEffect, useState } from 'react'
import Comment from './Comment'
import { useNavigate } from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function CommentsPost({postId}) {
    const {currentUser} = useSelector(state => state.user)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const [commentToDelete,setCommentToDelete] = useState(null)
    const [errorComment, setErrorComment] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const navigate  = useNavigate();

    useEffect(()=>{
        const getComments = async()=>{
            try {
                const res = await fetch(`/api/comment/getcomments/${postId}`)
                const data = await res.json()
                if(res.ok){
                    setComments(data)
                }
            } catch (error) {
                console.log(error.message);
            }
        }
        getComments()
    }, [postId]);

    const handleLike = async(commentId)=>{
        try {
            if(!currentUser){
                navigate('/login')
                return;
            }

            const res = await fetch(`/api/comment/likeComment/${commentId}`, {
                method: 'PUT',
            });
            if (res.ok) {
                const data = await res.json();
                if (data && data.likes) {
                    setComments(comments.map((comment) =>
                        comment._id === commentId ? {
                            ...comment,
                            likes: data?.likes,
                            numberOfLikes: data.likes.length,
                        } : comment
                    ));
                } else {
                    console.error('Invalid response data');
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(comment.length > 200){
            setErrorComment('')
            return;
        }
        try {
            const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({comment, postId, userId: currentUser._id})
            });
            const data = await res.json()
            if(res.ok){
                setComment(null)
                setErrorComment(null)
                setComments([data, ...comments]);
            }
        } catch (error) {
            setErrorComment(error.message)
        }
        
    }

    const handleEditComment = async(comment, editedComment) => {
        setComments(comments.map((c)=> c._id === comment._id ?
        {...c, comment: editedComment} : c));
    }
    const handleRemoveComment = async(commentId)=>{
        setShowModal(false)
        try {
            if(!currentUser){
                navigate('/login')
                return;
            }
            const res = await fetch(`/api/comment/delete/${commentId}`, {
                method: 'DELETE',
            });
            if(res.ok){
                const data = await res.json()
                setComments(comments.filter((comment)=> comment._id !== commentId))
                console.log(data);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ? (
            <div className='flex items-center gap-2 my-5 text-gray-500 text-sm'>
                <p>Signed in as:</p>
                <img src={currentUser.profilePicture} alt="" 
                width={26} height={26} className='rounded-full'/>
                <Link to={'/dashboard?tab=profile'} className='text-cyan-500 hover:underline '>@{currentUser.username}</Link>
            </div>
        ):(
            <div className='flex items-center gap-2 '>
                You must be signed in to comment.
                <Link to={'/login'} className='hover:underline'>Sign In</Link>
            </div>
        )}
        {currentUser && (
            <form onSubmit={handleSubmit} className='border border-teal-500 rounded-md p-3'>
                <Textarea onChange={(e)=> setComment(e.target.value)}
                value={comment} placeholder='Add a comment' rows='3' maxLength='200'/>
                <div className='flex justify-between items-center mt-5'>
                    <p className='text-gray-500 text-xs'>200 - {comments.length} characters remaining</p>
                    <Button gradientDuoTone='purpleToPink' type='submit'>Submit</Button>
                    {errorComment && <Alert color={failure}>{errorComment}</Alert>}
                </div>
            </form>
        )}
        {comments.length === 0 ? (
            <p className='text-sm my-5'>No comment yet!</p>
        ):(
            <>
                <div className='flex items-center gap-2 text-sm my-5'>
                    <div className='flex items-center gap-1 border rounded-md px-3 py-1 text-center'>
                        <p>{comments.length}</p>
                        <p>Comments</p>
                    </div>
                </div>
                {comments.map(comment => (
                    <Comment key={comment?._id} 
                            comment={comment} 
                            onLike={handleLike}
                            onEdit={handleEditComment}
                            onDelete={(commentId)=> {
                                setShowModal(true)
                                setCommentToDelete(commentId)
                            }}/>
                ))}
                
            </>
        )}
        <Modal show={showModal} onClose={()=>setShowModal(false)} size='md' popup>
            <Modal.Header/>
            <Modal.Body>
                <div className="text-center">
                    <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                        Are you sure, you want to delete this Comment?
                    </h3>
                    <div className="flex gap-6 justify-center">
                        <Button color='failure' onClick={()=>handleRemoveComment(commentToDelete)}>Yes, I'm sure</Button>
                        <Button color='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}
