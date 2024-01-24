import {Link, useLocation} from 'react-router-dom';
import { Button, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon} from 'react-icons/fa6';
import Logo from './Logo';

export default function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Logo Url='/' StyleLink='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
        StyleSpan='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-1 rounded-lg text-white' />
        
        <form>
        <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'
            />
        </form>
        <Button className='w-12 h-10 lg:hidden' color="gray" pill>
            <AiOutlineSearch/> 
        </Button>
        <div className="flex gap-2 md:order-2">
            <Button className='w-12 h-10 ' color="gray" pill>
                <FaMoon/> 
            </Button>
            <Link to='/login'>
                <Button gradientDuoTone='purpleToBlue' outline>
                    Login
                </Button>
            </Link>
            <Navbar.Toggle/>
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path==="/"} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path==="/about"} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path==="/projects"} as={'div'}>
                <Link to='/projects'>Projects</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}
