import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsGithub, BsYoutube } from 'react-icons/bs';
export default function FooterCom() {
  return (
    <Footer container className=' border-t-8 border-cyan-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='flex flex-col gap-4 w-full sm:flex-row sm:justify-between '>
          <div className='mt-4'>
            <Link to='/' className='text-lg sm:text-xl font-bold dark:text-white'>
                <span className='px-4 py-1 bg-gradient-to-br from-purple-600 to-cyan-500 hover:bg-gradient-to-bl "  rounded-lg text-white'>Zoro's</span>
                Blog
            </Link>
          </div>
          <div className='flex flex-wrap gap-12 sm:gap-8 mt-4 '>
            <div>
              <Footer.Title title='Quick Links' />
              <Footer.LinkGroup col>
                <Link to='/about'>
                  Zoro's Blog
                </Link>
                <Link to='/dashboard'>
                  Dashboard
                </Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.github.com/MohammedHarish2004'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link href='#'>Privacy Policy</Footer.Link>
                <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            by="Zoro's blog"
            year={new Date().getFullYear()}
          />
          <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsYoutube}/>
            <Footer.Icon href='https://github.com/MohammedHarish2004' icon={BsGithub}/>
          </div>
        </div>
      </div>
    </Footer>
  );
}