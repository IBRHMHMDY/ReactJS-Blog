import {useLocation} from 'react-router-dom';
import { useEffect,useState } from 'react';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashCommments from '../components/DashCommments';
import DashDashboard from '../components/DashDashboard';

export default function Dashboard() {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if(tabFromUrl){
      setTab(tabFromUrl)
    }
  }, [location.search]);
  
  return (
    <div className='flex flex-col md:flex-row min-h-screen'>
      <div className='md:w-56'>
        <DashSidebar />
      </div>
      
      {tab === 'dash' && <DashDashboard/>}
      {tab === 'posts' && <DashPosts/>}
      {tab === 'comments' && <DashCommments/>}
      {tab === 'users' && <DashUsers/>}
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}
