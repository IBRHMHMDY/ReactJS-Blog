import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {HiArrowNarrowUp, HiOutlineChatAlt, HiOutlineDocumentText, HiOutlineUserGroup} from 'react-icons/hi'
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
import {Link} from 'react-router-dom'

export default function DashDashboard() {
  const [users,setUsers] = useState([])
  const [posts,setPosts] = useState([])
  const [comments,setComments] = useState([])
  const [totalUsers,setTotalUsers] = useState(0)
  const [totalPosts,setTotalPosts] = useState(0)
  const [totalComments,setTotalComments] = useState(0)
  const [lastMonthUsers,setLastMonthUsers] = useState(0)
  const [lastMonthPosts,setLastMonthPosts] = useState(0)
  const [lastMonthComments,setLastMonthComments] = useState(0)
  const {currentUser} = useSelector(state => state.user)
  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const res = await fetch(`/api/user/getusers?limit=5`)
        const data = await res.json()
        if(res.ok){
          setUsers(data.users)
          setTotalUsers(data.totalUsers)
          setLastMonthUsers(data.lastMonthUsers)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchPosts = async()=>{
      try {
        const res = await fetch(`/api/post/getposts?limit=5`)
        const data = await res.json()
        if(res.ok){
          setPosts(data.posts)
          setTotalPosts(data.totalPosts)
          setLastMonthPosts(data.lastMonthPosts)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    const fetchComments = async()=>{
      try {
        const res = await fetch(`/api/comment/getcomments?limit=5`)
        const data = await res.json()
        if(res.ok){
          setComments(data.comments)
          setTotalComments(data.totalComments)
          setLastMonthComments(data.lastMonthComments)
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchUsers()
      fetchPosts()
      fetchComments()
    }
  }, [currentUser])
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex flex-wrap justify-center items-center gap-4'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-xl text-gray-500 uppercase'>Total Users</h3>
              <p className='text-2xl'>{totalUsers}</p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white text-5xl rounded-full p-3 shadow-lg'/>
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthUsers}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-xl text-gray-500 uppercase'>Total Posts</h3>
              <p className='text-2xl'>{totalPosts}</p>
            </div>
            <HiOutlineDocumentText className='bg-teal-600 text-white text-5xl rounded-full p-3 shadow-lg'/>
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthPosts}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-xl text-gray-500 uppercase'>Total Comments</h3>
              <p className='text-2xl'>{totalComments}</p>
            </div>
            <HiOutlineChatAlt className='bg-teal-600 text-white text-5xl rounded-full p-3 shadow-lg'/>
          </div>
          <div className='flex gap-2 text-sm'>
            <span className='flex items-center text-green-500'>
              <HiArrowNarrowUp />
              {lastMonthComments}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 '>
        {/* Recent Users */}
        <div className='flex flex-col gap-4 my-5 justify-between items-center w-full'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between items-center text-sm p-3 font-semibold'>
              <h1 className='text-center p-2'>Recent Users</h1>
              <Button gradientDuoTone='purpleToPink' outline>
                <Link to={"/dashboard?tab=users"}>See All</Link>
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>User Name</TableHeadCell>
              </TableHead>
              <TableBody>
              {
                users && users.map((user)=>(
                  <TableRow key={user._id}>
                    <TableCell>
                      <img src={user.profilePicture} alt={user.username}
                      className='rounded-full w-16 h-16' />
                    </TableCell>
                    <TableCell>
                      {user.username}          
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </div>
        </div>
        {/* Recent Posts */}
        <div className='flex flex-col gap-4 my-5 justify-between items-center w-full'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between items-center text-sm p-3 font-semibold'>
              <h1 className='text-center p-2'>Recent Posts</h1>
              <Button gradientDuoTone='purpleToPink' outline>
                <Link to={"/dashboard?tab=posts"}>See All</Link>
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableHeadCell>Post Image</TableHeadCell>
                <TableHeadCell>Post title</TableHeadCell>
              </TableHead>
              <TableBody>
              {
                posts && posts.map((post)=>(
                  <TableRow key={post._id}>
                    <TableCell>
                      <img src={post.image} alt={post.title}
                      className='rounded-full w-16 h-16' />
                    </TableCell>
                    <TableCell>
                      {post.title}          
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </div>
        </div>
        {/* Recent Comments */}
        <div className='flex flex-col gap-4 my-5 justify-between items-center w-full'>
          <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
            <div className='flex justify-between items-center text-sm p-3 font-semibold'>
              <h1 className='text-center p-2'>Recent Comments</h1>
              <Button gradientDuoTone='purpleToPink' outline>
                <Link to={"/dashboard?tab=comments"}>See All</Link>
              </Button>
            </div>
            <Table>
              <TableHead>
                <TableHeadCell>Comment</TableHeadCell>
                <TableHeadCell>Likes</TableHeadCell>
              </TableHead>
              <TableBody>
              {
                comments && comments.map((comment)=>(
                  <TableRow key={comment._id}>
                    <TableCell>
                      {comment.comment}
                    </TableCell>
                    <TableCell>
                      {comment.numberOfLikes}          
                    </TableCell>
                  </TableRow>
                ))
              }
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
