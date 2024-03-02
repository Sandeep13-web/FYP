import FooterLayout from "./FooterLayout"
import HeaderLayout from "./HeaderLayout"


function MainLayout({children}:any) {
  return (
    <>
        <HeaderLayout />
        <>
            {children}
        </>
        <FooterLayout />
    </>
  )
}

export default MainLayout