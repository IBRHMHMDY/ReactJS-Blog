import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {app} from '../firebase.js'
import { getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import { updateStart, updateSuccess,updateFailure, deleteStart, deleteFailure, deleteSuccess, signoutSuccess } from '../redux/user/userSlice.js';
import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import {Link} from 'react-router-dom'
import { HiMail, HiUser, HiKey, HiOutlineExclamationCircle } from 'react-icons/hi'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

    const {currentUser, error, loading} = useSelector(state => state.user);
    const [imgFile,setImgFile]= useState(null);
    const [imgFileUrl, setImgFileUrl] = useState(null);
    const [uploadProgress,setUploadProgress] = useState(null)
    const [uploadError,setUploadError] = useState(null)
    const [imgFileUploading, setImgFileUploading] = useState(false)
    const [updateUserSuccess, setUpdateUserSuccess]= useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [formData, setFormData] = useState({})
    const fileRef = useRef();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const resetMessages = ()=>{
            setUpdateUserError(null)
            setUpdateUserSuccess(null)
            setUploadError(null)
    }

    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImgFile(file);
            setImgFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(()=>{
        if(imgFile){
            uploadImage()
        }
      }, [imgFile])
    
    const uploadImage = async()=>{
        setUploadError(null)
        setImgFileUploading(true)
        const storage = getStorage(app)
        const fileName = new Date().getTime() + imgFile.name;
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef,imgFile);

         uploadTask.on('state_changed', (snapshot)=> {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress.toFixed(0))
        },
        (error) => {
            setUploadError('Could not Upload Image (The Image must be Less Than 2MB)')
            setImgFile(null)
            setImgFileUrl(null)
            setUploadProgress(null)
            setImgFileUploading(false)
            setUpdateUserError(null)
        },
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setImgFileUrl(downloadUrl);
                setFormData({...formData, profilePicture: downloadUrl});
                setImgFileUploading(false);
            });
        });
    }

    const handleChange = (e)=>{
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();
        resetMessages();
        if(Object.keys(formData).length === 0){
            setUpdateUserError("No changes made")
            return;
        }
        if(imgFileUploading){
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
           dispatch(updateStart());
           const res = await fetch(`/api/user/update/${currentUser._id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json',},
            body: JSON.stringify(formData),
           });
           const data = await res.json();
           if(!res.ok){
            dispatch(updateFailure(data.message))
            setUpdateUserError(data.message)
           }else{
               dispatch(updateSuccess(data))
               setUpdateUserSuccess("User's Profile updated successfully");
           }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    }
    const handleDeleteUser = async()=>{
        setShowModal(false)
        try {
            dispatch(deleteStart())
            const res = await fetch(`/api/user/delete/${currentUser._id}`,{
                method: 'DELETE',
            });
            const data = await res.json();
            if(!res.ok){
                dispatch(deleteFailure(data.message));
            }
            dispatch(deleteSuccess(data));
        } catch (error) {
            dispatch(deleteFailure(error.message));
        }
    }
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
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={handleImageChange} ref={fileRef} hidden/>
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
                        onClick={()=>fileRef.current.click()}>
                    <CircularProgressbar value={uploadProgress} strokeWidth={5}
                    styles={{
                        root: {
                            width: '100%',
                            height: '100%',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        },
                        path: {
                            stroke: `rgba(62, 152, 199, ${uploadProgress /100})`,
                        },
                    }}
                    />
                    <img src={imgFileUrl || currentUser.profilePicture} alt="User Profile" 
                    className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'/>
                </div>
                {uploadError && <Alert color='failure'>{uploadError}</Alert>}
                <TextInput type='text' id='username' icon={HiUser} 
                placeholder='UserName' defaultValue={currentUser.username} onChange={handleChange}/>
                <TextInput type='email' id='email' icon={HiMail} 
                placeholder='Your Email' defaultValue={currentUser.email} onChange={handleChange}/>
                <TextInput type='password' id='password' icon={HiKey} 
                placeholder='password' onChange={handleChange}/>
                <Button type='submit' gradientDuoTone='purpleToBlue' outline disabled={loading || imgFileUploading}>
                    {loading ? "Loading..." : "Update"}
                </Button>
                {currentUser.isAdmin && 
                    <Link to={'/create-post'}>
                        <Button type='submit' gradientDuoTone='purpleToPink' className='w-full' outline>
                            Create a Post
                        </Button>
                    </Link>
                }
            </form>
            <div className="flex justify-between mt-5 text-red-500 ">
                <span onClick={()=>setShowModal(true)} className="cursor-pointer">Delete Account</span>
                <span className="cursor-pointer" onClick={handleSignout}>SignOut</span>
            </div>
            {updateUserSuccess && (<Alert className='mt-5' color='success'>{updateUserSuccess}</Alert>)}
            {updateUserError && (<Alert className='mt-5' color='failure'>{updateUserError}</Alert>)}
            {error && (<Alert className='mt-5' color='failure'>{error}</Alert>)}
            <Modal show={showModal} onClose={()=>setShowModal(false)} size='md' popup>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className='w-14 h-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete your account?
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
