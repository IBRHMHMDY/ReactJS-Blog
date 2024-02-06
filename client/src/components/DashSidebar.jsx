import {Sidebar} from 'flowbite-react';
import {HiArrowSmallRight, HiCursorArrowRipple, HiDocumentText, HiUser, HiUsers} from 'react-icons/hi2'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useState } from 'react';
import { HiArrowsExpand, HiChat, HiOutlineChartSquareBar } from 'react-icons/hi';


export default function DashSidebar() {

    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.user)
    const [tab, setTab] = useState('');
    
    const handleSignout = async()=>{
        try {
            const res = await fetch(`/api/user/signout`, {
                method: 'POST',
            });
            const data = await res.json();
            if(!res.ok){
                console.log(data.message);
            }
            dispatch(signoutSuccess(data))
        } catch (error) {
            console.log(error.message);
        }

    }
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                {currentUser.isAdmin && (
                    <Link to={'/dashboard?tab=dash'}>
                        <Sidebar.Item active={tab === 'dash' || !tab} icon={HiOutlineChartSquareBar} labelColor='dark'  as='div' >
                            Dashboard
                        </Sidebar.Item>
                    </Link>
                )}
                {currentUser.isAdmin && (
                    <Link to={'/dashboard?tab=posts'}>
                        <Sidebar.Item active={tab === 'posts'} icon={HiDocumentText} labelColor='dark'  as='div' >
                            Posts
                        </Sidebar.Item>
                    </Link>
                )}
                {currentUser.isAdmin && (
                    <Link to={'/dashboard?tab=comments'}>
                        <Sidebar.Item active={tab === 'comments'} icon={HiChat} labelColor='dark'  as='div' >
                            Comments
                        </Sidebar.Item>
                    </Link>
                )}
                {currentUser.isAdmin && (
                    <Link to={'/dashboard?tab=users'}>
                        <Sidebar.Item active={tab === 'users'} icon={HiUsers} labelColor='dark'  as='div' >
                            Users
                        </Sidebar.Item>
                    </Link>
                )}
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active={tab === 'profile'} as='div' icon={HiUser} label={currentUser.isAdmin? 'Admin' : 'User'} labelColor='dark'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmallRight} className='cursor-pointer' onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
