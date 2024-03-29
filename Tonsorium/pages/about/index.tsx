import { Col, Row, Avatar, Image, Input, Button } from "antd"
import { UserOutlined } from '@ant-design/icons';
import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"
import { about } from "../../ImageConfig"
import { useAppDispatch, useAppSelector } from "../../store/reduxHooks";
import { getStaff } from "../../store/actions/StaffActionCreator";
import Search from "antd/lib/transfer/search";


function About() {
  const [staffDetails, setStaffDetails] = useState<any>([])
  const dispatch = useAppDispatch()
  const { Search } = Input;
  const {staffData, staffLoading} = useAppSelector((state:any) => state.staffReducer)
  const [staffName , setStaffName] = useState<string>("")
  // const getStaff = async () => {
  //   try {
  //     const response = await axios.get('http://127.0.0.1:8080/api/v1/staffs');

  //     console.log("repsonse", response)
      
  //     setStaffDetails(response.data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const storeName =(e:any) => {
    setStaffName(e.target.value)
  }
  const searchStaff = (e:any) => {
    if(e.key === 'Enter'){
      dispatch(getStaff({staffName}))
    }
  }

  useEffect(() => {
    dispatch(getStaff({}))
  }, [])

  return (
    <>
      <Head>
        <title>Tonsorium | About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./title-icon.png" />
      </Head>

      <section className="inner-page-banner about-banner"> </section>

      <section className="description-section">
        <div className="container">
          <h3 className="page-heading">About</h3>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xl={12}>
              <div className="description">
                <h1 className="description__heading">AT SUNNY BARBERS, WE BELIEVE THAT, AT ITS BEST, A BARBERSHOP IS A DEPENDABLE, TRUSTED NEIGHBORHOOD INSTITUTION.</h1>


                <div className="description__subHeading">
                  <h4>OUR PRIMARY GOAL IS TO BUILD STRONG, LONG-TERM RELATIONSHIPS WITH EACH OF OUR CLIENTS.</h4>
                  <p>Sunny Barbers&apos; is proud to be an independent, Sydney-bred and operated store focused solely on serving the Sydney market. <br /><br />
                    Our unparalleled team of expert barbers has personal pride riding on each haircut and hot lather shave. No one on Sunny Barbers&apos; staff has been cutting hair fewer than 10 years. We’ve seen it all and can do it all. We are about substance and skill, not gimmicks. We like to have fun, but we take our work seriously. </p>
                </div>
              </div>
            </Col>
            <Col className="gutter-row" xl={12}>
              <div className="img-short">
                <Image src={about?.aboutDesc} className='card-img' width={400} height={429} alt='Description Image' preview={false} />
              </div>
            </Col>
          </Row>
        </div>
      </section>

      <section className="barbers">
        <div className="container">
          <div className="barber-head">
            <Image src={about.barberHeading} alt='Barber Heading Image' preview={false} />
          </div>

          <div className="search d-flex">
            <Input type="text" value={staffName} onChange={storeName} onKeyDown={searchStaff} width={200}/>
          </div>

          <div className="barbers__list">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {
                staffData ? staffData.map((staff: any) => (
                  <Col className="gutter-row" span={8} key={staff.id}>
                    <div className="barber-card">
                      <div className="card-img-top">
                        {
                          staff && staff.img ?
                          <img src={staff.img}  alt="Barber Image" />
                          :
                          <Avatar shape="square" icon={<UserOutlined/>} size={220} />
                        }
                      </div>
                      <div className="card-desc">
                        <p className="name">{staff.staffName}</p>
                        <p className="position">-- {staff.staffPosition} --</p>
                        <p className="barber-desc">
                          {staff.staffDescription}
                        </p>
                      </div>
                    </div>
                  </Col>
                ))
                : <p>Loading</p>
              }
            </Row>
          </div>
        </div>
      </section>
    </>
  )
}

export default About