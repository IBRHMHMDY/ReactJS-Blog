import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';

export default function RecentArticles() {
    const [recentPosts, setRecentPosts] = useState(null)
    useEffect(()=>{
        try {
            const fetchRecentPosts = async()=>{
                const res = await fetch(`/api/post/getposts?limit=3`);
                const data = await res.json()
                if(res.ok){
                    setRecentPosts(data.posts);
                }
            };
            fetchRecentPosts()
        } catch (error) {
            console.log(error.message);
        }
    })
  return (
    <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-2xl mt-5'>Recent Articles</h1>
        <div className='flex flex-wrap justify-center items-center gap-4 mt-5'>
            {
                recentPosts &&
                    recentPosts.map((post)=>(
                        <PostCard key={post._id} post={post} />
                    ))
            }
        </div>
    </div>
  )
}
