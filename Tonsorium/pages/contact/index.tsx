import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Form, Input, Radio, Row } from "antd"
import TextArea from "antd/lib/input/TextArea";
import Head from "next/head"
import { useState } from "react";
import MapPicker from 'react-google-map-picker'

function Contact() {
  type LayoutType = Parameters<typeof Form>[0]['layout'];

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>('vertical');

  const onFormLayoutChange = ({ layout }: { layout: LayoutType }) => {
    setFormLayout(layout);
  };

  const formItemLayout =
    formLayout === 'horizontal'
      ? {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      }
      : null;

  const buttonItemLayout =
    formLayout === 'horizontal'
      ? {
        wrapperCol: { span: 14, offset: 4 },
      }
      : null;

  const DefaultLocation = { lat: 10, lng: 106 };
  const DefaultZoom = 10;

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat : any, lng :any) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom:any) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }
  return (
    <>
      <Head>
        <title>Tonsorium | Contact</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="./title-icon.png" />
      </Head>

      <section className="inner-page-banner contact-banner"></section>

      <section className="description-section contact">
        <div className="container">
          <h3 className="page-heading">Contact</h3>

          <div className="contact-desc">
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" xl={16}>
                <MapPicker defaultLocation={defaultLocation}
                  zoom={zoom}
                  // mapTypeId="roadmap"
                  style={{ height: '700px' }}
                  onChangeLocation={handleChangeLocation}
                  onChangeZoom={handleChangeZoom}
                  apiKey='AIzaSyCpvO8JtVwQlPXZbRMswjySxUycKGsN5Bw'
                />
                {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27689224273!2d85.2911133645718!3d27.709031933208905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1664449836559!5m2!1sen!2snp" loading="lazy"></iframe> */}

                <div className="send-mail">
                  <p className="form-heading">USE THIS FORM TO SEND US AN EMAIL</p>

                  <Form
                    {...formItemLayout}
                    layout={formLayout}
                    form={form}
                    initialValues={{ layout: formLayout }}
                    onValuesChange={onFormLayoutChange}
                  >
                    <Form.Item label="Name">
                      <div className="d-flex align-item-center g-2">
                        <Input placeholder="First Name" />
                        <Input placeholder="Last Name" />
                      </div>
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                    <Form.Item label="Subject">
                      <Input placeholder="Enter Subject" />
                    </Form.Item>
                    <Form.Item label="Message">
                      <TextArea placeholder="" />
                    </Form.Item>
                    <Form.Item {...buttonItemLayout}>
                      <Button type="primary" className="btn-primary">Submit</Button>
                    </Form.Item>
                  </Form>
                </div>

              </Col>
              <Col className="gutter-row" xl={8}>
                <div className="contact-info">
                  <p className="contact-head">Contact Us</p>
                  <div className="desc">
                    <p className="location">6 B flushcombe road blacktown, Sydney 2148</p>
                    <p className="imp">
                      <FontAwesomeIcon icon={faPhone} />
                      (61)123654789
                    </p>
                    <p className="imp">
                      <FontAwesomeIcon icon={faEnvelope} />
                      barber@tonsorium.com
                    </p>
                  </div>

                  <div className="open-status">
                    <p className="head">OPEN 7 DAYS A WEEK!</p>
                    <ul>
                      <li>Mon - Thurs: <span>10am - 9pm</span></li>
                      <li>Fri: <span>10am - 7pm</span></li>
                      <li>Sat: <span>8am - 6pm</span></li>
                      <li>Sun: <span>9am - 5pm</span></li>
                    </ul>
                  </div>

                </div>
              </Col>

            </Row>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact