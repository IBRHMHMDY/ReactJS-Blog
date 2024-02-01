import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashPosts() {

  const {currentUser} = useSelector(state => state.user)
  const [userPosts, setUserPosts] = useState([]);
  useEffect(()=>{
    const fetchPosts = async()=>{
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if(res.ok){
          setUserPosts(data.posts);
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
  return (
    <div className='table-auto overflow-x-scroll overflow-hidden md:mx-auto p-3
      scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300
       dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='overflow-hidden' >
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>Category</TableHeadCell>
              <TableHeadCell>Actions</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {userPosts.map((post)=>(
              <TableRow key={post.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>{new Date(post.updatedAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Link to={`/post/${post.slug}`}>
                    <img src={post.image} alt="img post" className='w-16 h-16 rounded-full'/>
                  </Link>
                </TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell className='flex gap-5 items-center justify-center'>
                  <Link className='text-teal-500 hover:text-teal-900 dark:hover:text-teal-200' to={`/edit/${post._id}`}>Edit</Link>
                  <Link className='text-red-500 hover:text-red-900 dark:hover:text-red-300' to={`/post/delete`}>Delete</Link>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ):(
        <p>You have not a Post</p>
      )}
    </div>
  )
}
