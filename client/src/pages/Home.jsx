import {Button} from 'flowbite-react'
import {Link} from 'react-router-dom'
import CallToActions from '../components/CallToActions'
import { useEffect, useState } from 'react'
import PostCard from '../components/PostCard'

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const fetchPosts = async()=>{
      const res = await fetch(`/api/post/getposts`);
      const data = await res.json();
      setPosts(data.posts);
    }
    fetchPosts()
  }, [])
  return (
    <div className=''>
      <div className='flex flex-col gap-6 lg:p-28 mx-auto max-w-6xl '>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome to myBlog</h1>
        <p className='text-xs sm:text-sm text-gray-500'>
          Here you'll find a variety of articles and tutorials on topics such as web developement, software engineering, and programming languages.
        </p>
        <Link to={'/'} className='text-teal-500 font-bold text-sm hover:underline'>See all posts</Link>
      </div>
      <div className='bg-amber-100 dark:bg-slate-100 p-3 my-5 '>
        <CallToActions className="w-full mx-auto"/>
      </div>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {
          posts && posts.length > 0 && (
            <div className='flex flex-col gap-6'>
              <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-3 mx-auto'>
                {posts.map((post)=>(
                  <PostCard key={post._id} post={post}/>
                ))}
              </div>
              <Link to={'/search'} className='text-lg text-teal-500 hover:underline text-center w-full'>View All Post</Link>
            </div>
          )
        }
      </div>
    </div>
  )
}
