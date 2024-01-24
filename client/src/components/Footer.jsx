import React from 'react'
import { Footer } from 'flowbite-react'
import Logo from './Logo'
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa6'
export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500 rounded-bl-none rounded-br-none
    '>
        <div className='w-full mx-auto max-w-7xl'>
            <div className='grid sm:grid-cols-2'>
                <div className='mx-auto max-w- flex gap-4'>
                    <Logo Url='/' StyleLink='self-center whitespace-nowrap text-2xl font-semibold dark:text-white'
                        StyleSpan='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mr-1 rounded-lg text-white' />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 w-full">
                    <div>
                        <Footer.Title title='about' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='https://ibrahimhamdy.net'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                MyWebsite
                            </Footer.Link>
                            <Footer.Link 
                                href='/about'
                            >
                                About
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Follow us' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='https://github.com/ibrhmhmdy'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                GitHub
                            </Footer.Link>
                            <Footer.Link 
                                href='https://linkedin.com/ibrhmhmdy'
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                Linkedin
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                    <div>
                        <Footer.Title title='Legal' />
                        <Footer.LinkGroup col>
                            <Footer.Link 
                                href='#'
                            >
                                Privacy Policy
                            </Footer.Link>
                            <Footer.Link 
                                href='#'
                            >
                                Terms &amp; Conditions
                            </Footer.Link>
                        </Footer.LinkGroup>
                    </div>
                </div>
            </div>
            <Footer.Divider />
            <div className="flex justify-between">
            <Footer.Copyright href='https://ibrahimhamdy.net' by='SelfStudy BLOG' year={new Date().getFullYear()} />
            <div className="flex gap-3">
                <Footer.Icon icon={FaFacebook} />
                <Footer.Icon icon={FaLinkedin} />
                <Footer.Icon icon={FaYoutube} />
                <Footer.Icon icon={FaInstagram} />
            </div>
            </div>
        </div>
    </Footer>
  )
}
