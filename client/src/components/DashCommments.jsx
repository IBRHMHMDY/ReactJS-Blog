import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Modal} from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashCommments() {
  const {currentUser} = useSelector(state => state.user)
  const [comments, setComments] = useState([]);
  const [showMore,setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');

  useEffect(()=>{
    const fetchComments = async()=>{
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false)
          }
        }else{
          setComments(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchComments();
    }
  }, [currentUser._id])
  
  const handleShowMore = async()=>{
    const startIndex = comments.length;
    try {
      const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
      const data = await res.json()
      if(data.comments.length < 9){
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteComment = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/comment/delete/${commentIdToDelete}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      }else{
        setComments((prev)=>
          prev.filter((comment)=> comment._id !== commentIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='table-auto overflow-x-scroll overflow-hidden md:mx-auto p-5 w-full
      scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
      dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable >
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Comment</TableHeadCell>
              <TableHeadCell>Number of Likes</TableHeadCell>
              <TableHeadCell>PostId</TableHeadCell>
              <TableHeadCell>UserId</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {comments && comments.map((comment)=>(
              <TableRow key={comment._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>{new Date(comment.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell className='font-semibold'>{comment.comment}</TableCell>
                <TableCell>{comment.numberOfLikes}</TableCell>
                <TableCell>{comment.postId}</TableCell>
                <TableCell>{comment.userId}</TableCell>
                <TableCell>
                  <span className='font-medium text-red-500 cursor-pointer hover:underline dark:text-red-700' 
                  onClick={()=>{
                    setShowModal(true)
                    setCommentIdToDelete(comment._id);
                  }}>Delete</span>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (<button onClick={handleShowMore} className='w-full hover:text-teal-700 p-5 self-center'>ShowMore...</button>)}
        </>
      ):(
        <p>You have not a Comments yet!</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} size='md' popup>
          <Modal.Header/>
          <Modal.Body>
              <div className="text-center">
                  <HiOutlineExclamationCircle className='w-10 h-10 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                  <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this Comment?
                  </h3>
                  <div className="flex gap-6 justify-center">
                      <Button color='failure' onClick={handleDeleteComment}>Yes, I'm sure</Button>
                      <Button color='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
                  </div>
              </div>
          </Modal.Body>
      </Modal>
    </div>
  )
}
