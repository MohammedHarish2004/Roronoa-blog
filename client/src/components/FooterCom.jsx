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
                <Link to='/dashboard?tab=profile'>
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
                <Footer.Link href='https://www.linkedin.com/authwall?trk=bf&trkInfo=AQHy65-nfm4JmgAAAY_3LTCI4vcc2EG0A1BG-iL0hm0IFcrwZ8aPPPQ4A0QeCp_nvKsKeXfYl2pRQByCoXj2zEBr-w_5Y3VZJsw-wtgZOP1L4Q-Fap30BPTqKJM_h6JWR9E1B8w=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fmohammed-harris-8967842a9%3Futm_source%3Dshare%26utm_campaign%3Dshare_via%26utm_content%3Dprofile%26utm_medium%3Dandroid_app'
                target='_blank'
                rel='noopener noreferrer'
                >LinkedIn</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Footer.Link >Privacy Policy</Footer.Link>
                <Footer.Link >Terms &amp; Conditions</Footer.Link>
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