import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Modal} from 'flowbite-react'
import {Link} from 'react-router-dom'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashPosts() {

  const {currentUser} = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([]);
  const [showMore,setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false)
          }
        }else{
          setUserPosts(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchPosts();
    }
  }, [currentUser._id])
  
  const handleShowMore = async()=>{
    const startIndex = userPosts.length;
    try {
      const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json()
      if(data.posts.length < 9){
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeletePost = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/post/deletepost/${postIdToDelete}/${currentUser._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      }else{
        setUserPosts((prev)=>
          prev.filter((post)=> post._id !== postIdToDelete)
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
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable >
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Edit</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {userPosts.map((post)=>(
              <TableRow key={post.title} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt="img post" className='w-14 h-14 rounded-sm border-1 border-gray-500 dark:border-none'/>
                  </Link>
                </TableCell>
                <TableCell className='font-semibold'>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>
                  <Link to={`/edit/${post._id}`} className='font-medium text-teal- cursor-pointer hover:underline dark:text-teal-200'>
                    Edit
                  </Link>
                </TableCell>
                <TableCell>
                  <span className='font-medium text-red-500 cursor-pointer hover:underline dark:text-red-700' 
                  onClick={()=>{
                    setShowModal(true)
                    setPostIdToDelete(post._id);
                  }}>Delete</span>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (<button onClick={handleShowMore} className='w-full hover:text-teal-700 p-5 self-center'>ShowMore...</button>)}
        </>
      ):(
        <p>You have not a Post</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} size='md' popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this post?
                        </h3>
                        <div className="flex gap-6 justify-center">
                            <Button color='failure' onClick={handleDeletePost}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}
