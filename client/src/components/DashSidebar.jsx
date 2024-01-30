import {Sidebar} from 'flowbite-react';
import {HiArrowSmallRight, HiUser} from 'react-icons/hi2'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
export default function DashSidebar() {

    const dispatch = useDispatch();

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
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active as='div' icon={HiUser} label={'User'} labelColor='dark'>
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
