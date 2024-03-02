import { useSession, signOut, getSession, signIn } from 'next-auth/react'
import { Button, Dropdown, Image, Layout, Menu } from "antd";

import { Header } from "antd/lib/layout/layout";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { logoImage } from "../../ImageConfig"

function HeaderLayout() {
  const { data: session, status } = useSession()
  let user = session?.user?.name;
  let userSplit = user?.split(' ')!
  

  // if (status === 'authenticated') {
  //   return (
  //     <div>
  //       Welcome, {userSplit[0]}
  //       <button onClick={() => signOut()}>SignOut</button>
  //     </div>
  //   )
  // } else {
  //   <></>
  // }

  const menu: any = (
    <Menu>
      <p className='welcome-text'>Welcome {/*{userSplit[0]}*/} <span>{user}</span> !</p>
      <Menu.Item>
        <Link href={'/appointment'}>
            <a className='btn book-btn'>Book Appointment</a>
        </Link>
      </Menu.Item>
      <Menu.Item>
          <Button onClick={() => signOut()} className="logout-btn">
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            Logout</Button>
      </Menu.Item>
    </Menu>
  );


  return (
    <Layout className="layout">
      <div className="logo">
        <Link href={'/'}>
            <Image className="logo-img" src={logoImage.logo} preview={false}></Image>
        </Link>
      </div>

      <Header className='d-flex align-items-center'>
        <div className="menu-sign">
          <Menu mode="horizontal" defaultSelectedKeys={['home']}>
            <Menu.Item key='home'>
              <Link href={'/'}>Home</Link>
            </Menu.Item>
            <Menu.Item key='about'>
              <Link href={'/about'}>About</Link>
            </Menu.Item>
            <Menu.Item key='services'>
              <Link href={'/service'}>Services</Link>
            </Menu.Item>
            <Menu.Item key='contact'>
              <Link href={'/contact'}>Contact</Link>
            </Menu.Item>
            {
              session ?
              <>
                <Dropdown overlay={menu} placement="bottomRight" arrow className='header-dropdown'>
                  <Button className='dropdown-btn'> 
                    <img src={session && session.user?.image!} alt="" width={50} height={50} />
                    </Button>
                </Dropdown>
              </>
              :
              <Button onClick={() => signIn('google')} className='btn btn-primary'>Login</Button>
            }
          </Menu>
        </div>

      </Header>

    </Layout>
  )
}

export default HeaderLayout

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }
  return {
    props: { session }
  }
}