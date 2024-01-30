import {Link, useLocation} from 'react-router-dom';
import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { AiOutlineSearch } from "react-icons/ai";
import {FaMoon, FaSun} from 'react-icons/fa6';
import Logo from './Logo';
import {useDispatch, useSelector} from 'react-redux'
import { toggleTheme } from '../redux/themes/themeSlice';
import {signoutSuccess} from '../redux/user/userSlice.js'
export default function Header() {
    const path = useLocation().pathname;
    const {currentUser} = useSelector(state => state.user);
    const {theme} = useSelector(state => state.theme);
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
            <Button className='w-12 h-10' color="gray" pill onClick={()=>dispatch(toggleTheme())}>
                {theme === 'light'? <FaMoon/> : <FaSun/>}
            </Button>
                {currentUser ? (
                    <Dropdown 
                        arrowIcon={false}
                        inline
                        label={<Avatar rounded img={currentUser.profilePicture} alt='img user'/>}
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium'>@{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider/>
                        <Dropdown.Item onClick={handleSignout}>SignOut</Dropdown.Item>
                    </Dropdown>
                    
                ) : (
                    <Link to={'/login'}>
                        <Button type='button' gradientDuoTone='purpleToBlue' outline>
                            Login
                        </Button>
                    </Link>
                )}
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
