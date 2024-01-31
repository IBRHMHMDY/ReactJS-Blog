import {Button, FileInput, Select, TextInput} from 'flowbite-react'
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
  const [value, setValue] = useState('');
  return (
    <div className='max-w-3xl p-3 mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>
        Create a Post
      </h1>
      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput type='text' id='title' placeholder='Title' className='flex-1' required/>
          <Select>
            <option value="uncategorized">Select a category</option>
            <option value="javascript">Javascript</option>
            <option value="reactJs">ReactJs</option>
            <option value="nextJs">NextJs</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' />
          <Button type='submit' gradientDuoTone='purpleToBlue' size='sm' outline >
            Upload
          </Button>
        </div>
        <ReactQuill theme="snow" className='h-72 mb-12' required/>
        <Button type='button' gradientDuoTone='purpleToPink' size='sm'>Publish</Button>
      </form>
    </div>
  )
}
