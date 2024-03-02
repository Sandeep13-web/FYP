import { faEnvelope } from "@fortawesome/free-regular-svg-icons"
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Col, Image, Row } from "antd"
import Link from "next/link"
import { logoImage } from "../../ImageConfig"


function FooterLayout() {
  return (
    <>
      <footer>
        <div className="container">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" xl={8} md={12}>
              <div className="footer-logo-desc">
                <Image className="footer-img" src={logoImage.logo} preview={false}></Image>

                <div className="address">
                  <div className="address-item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>6 B flushcombe road blacktown, Sydney 2148</p>
                  </div>
                  <div className="address-item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>barber@tonsorium.com</p>
                  </div>
                  <div className="address-item">
                    <FontAwesomeIcon icon={faPhone} />
                    <p>(61)123654789</p>
                  </div>
                </div>
              </div>
            </Col>

            <Col className="gutter-row" xl={8} md={24}>
              <div className="open-time-list">
                <h4 className="head">Open Hours</h4>
                <ul>
                  <li>Mon - Thurs: <span>10am - 9pm</span></li>
                  <li>Fri: <span>10am - 7pm</span></li>
                  <li>Sat: <span>8am - 6pm</span></li>
                  <li>Sun: <span>9am - 5pm</span></li>
                </ul>
              </div>
            </Col>

            <Col className="gutter-row" xl={8} md={24}>
              <div className="socials">
                <h4 className="head">Connect With Us</h4>
                <div className="social-links">
                  <Link href={'facebook.com'}>
                    <a>
                      <Image src={logoImage.facebook} alt='Social Icon' />
                    </a>
                  </Link>
                  <Link href={'instagram.com'}>
                    <a>
                      <Image src={logoImage.instagram} alt='Social Icon' />
                    </a>
                  </Link>
                  <Link href={'twitter.com'}>
                    <a>
                      <Image src={logoImage.twitter} alt='Social Icon' />
                    </a>
                  </Link>
                </div>
              </div>
            </Col>

            <Col className="gutter-row" span={24}>
              <div className="copy-right">
                <p>All Rights Reserved. Copyright &copy; 2022 Tonsorium</p>
              </div>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  )
}

export default FooterLayout