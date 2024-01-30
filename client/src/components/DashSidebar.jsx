import {Sidebar} from 'flowbite-react';
import {HiArrowSmallRight, HiUser} from 'react-icons/hi2'
import { Link } from 'react-router-dom';
export default function DashSidebar() {
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to={'/dashboard?tab=profile'}>
                    <Sidebar.Item active icon={HiUser} label={'User'} labelColor='dark'>
                        Profile
                    </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmallRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
