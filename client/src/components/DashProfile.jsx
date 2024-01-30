import { Alert, Button, TextInput } from 'flowbite-react';
import {useSelector} from 'react-redux'
import {HiMail, HiUser, HiKey} from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {

    const {currentUser} = useSelector(state => state.user);
    const [imgFile,setImgFile]= useState(null);
    const [imgFileUrl, setImgFileUrl] = useState(null);
    const [uploadProgress,setUploadProgress] = useState(null)
    const [uploadError,setUploadError] = useState(null)
    const fileRef = useRef();

    console.log(uploadProgress, uploadError);
    
    const handleImageChange = (e)=>{
        const file = e.target.files[0]
        if(file){
            setImgFile(file);
            setImgFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(()=>{
        if(imgFile){
          UploadImage()
        }
      }, [imgFile])
    
    const UploadImage = async()=>{
        setUploadError(null)
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
        },
        ()=> {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
                setImgFileUrl(downloadUrl)
            })
        });
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
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
                <TextInput type='text' id='username' icon={HiUser} placeholder='UserName' defaultValue={currentUser.username}/>
                <TextInput type='email' id='email' icon={HiMail} placeholder='Your Email' defaultValue={currentUser.email}/>
                <TextInput type='password' id='password' icon={HiKey} placeholder='****************' disabled />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>Update</Button>
                <div className="flex justify-between mt-5 text-red-500 ">
                    <span className="cursor-pointer">Delete Account</span>
                    <span className="cursor-pointer">SignOut</span>
                </div>
            </form>
        </div>
    )
}
