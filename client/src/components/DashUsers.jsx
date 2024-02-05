import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, Button, Modal} from 'flowbite-react'
import {FaCheck, FaTimes} from 'react-icons/fa'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

export default function DashUsers() {

  const {currentUser} = useSelector(state => state.user)
  const [users, setUsers] = useState([]);
  const [showMore,setShowMore] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');

  useEffect(()=>{
    const fetchUsers = async()=>{
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if(res.ok){
          setUsers(data.users);
          if(data.users.length < 9){
            setShowMore(false)
          }
        }else{
          setUsers(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    if(currentUser.isAdmin){
      fetchUsers();
    }
  }, [currentUser._id])
  
  const handleShowMore = async()=>{
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json()
      if(data.users.length < 9){
        setShowMore(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleDeleteUser = async()=>{
    setShowModal(false)
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message);
      }else{
        setUsers((prev)=>
          prev.filter((user)=> user._id !== userIdToDelete)
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
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable >
            <TableHead>
              <TableHeadCell>Date created</TableHeadCell>
              <TableHeadCell>User Image</TableHeadCell>
              <TableHeadCell>User Name</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>Delete</TableHeadCell>
            </TableHead>
            <TableBody className='divide-y'>
              {users && users.map((user)=>(
              <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                    <img src={user.profilePicture} alt="img user" className='w-14 h-14 rounded-full border-1 border-gray-500 dark:border-none'/>
                </TableCell>
                <TableCell className='font-semibold'>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? (<FaCheck className='text-green-500'/>):(<FaTimes className='text-red-500'/>)}</TableCell>
                <TableCell>
                  <span className='font-medium text-red-500 cursor-pointer hover:underline dark:text-red-700' 
                  onClick={()=>{
                    setShowModal(true)
                    setUserIdToDelete(user._id);
                  }}>Delete</span>
                </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
          {showMore && (<button onClick={handleShowMore} className='w-full hover:text-teal-700 p-5 self-center'>ShowMore...</button>)}
        </>
      ):(
        <p>You have not a Users yet!</p>
      )}
      <Modal show={showModal} onClose={()=>setShowModal(false)} size='md' popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='w-10 h-10 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete this user?
                        </h3>
                        <div className="flex gap-6 justify-center">
                            <Button color='failure' onClick={handleDeleteUser}>Yes, I'm sure</Button>
                            <Button color='gray' onClick={()=>setShowModal(false)}>No, Cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
    </div>
  )
}
