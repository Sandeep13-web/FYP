import { Avatar, Button, Image, Modal } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'

function Confirmation(props: any) {
    const { data: session, status } = useSession()

    const router = useRouter()

    const headers = {
        'Content-Type': 'application/json'
    }
    
    
    const confirm = async (e: any) => {
        e.preventDefault()
        const data = {
            "userName": session?.user?.name,
            "services": props.selectedServices.map(({ value }: any) => value),
            "staffId": props.selectedStaffDetails.id,
            "day": props.selectDay.toLowerCase(),
            "startDate": props.selectedDate,
            "endDate": props.selectedDate,
            "time": props.selectedTimeStore
        }
        

        const response = await axios.post('http://127.0.0.1:8080/api/v1/bookings', data, {headers:headers})
        

        //For success Modal
        let secondsToGo = 6;

        const modal = Modal.success({
            title: 'Your booking was successful!',
            content: `An email has been sent to your account about your appointment `,
        });

        const timer = setInterval(() => {
            secondsToGo -= 1;
            modal.update({
                content: `An email has been sent to your account about your appointment `,
            });
        }, 1000);

        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
        }, secondsToGo * 1000);

        //Sending Email

        const sendMail = {
            Host: "smtp.elasticemail.com",
            Username: "tonsoriumbooking@gmail.com",
            Password: "BCD8006D4E5C6E174753C7A743950CAA814E",
            // SecureToken:'75610f47-5d55-4837-b462-0ebbaa846780',
            To: session?.user?.email,
            From: "tonsoriumbooking@gmail.com",
            Subject: "Appointment Booking Successful",
            Body: `
            <p>Hi <strong>${session?.user?.name}</strong></p>
            <p>You have successfully booked your appointment.</p>
            <p>Your appointment has been scheduled in ${props.selectedDate} - (${props.selectDay}) at ${props.selectedTimeStore} by ${props.selectedStaffDetails.staffName}.</p>
            <p>Please be available at the required time in the salon.</p><br>
            <p>Regards, <br> Tonsorium - Your stylist partner</p>`
        }
        if (window.Email) {
            window.Email.send(sendMail);
             router.push('/')
        }

    }

    return (
        <>
            <section className='confirmation'>
                <h4 className='book-heading'><span>Confirmation</span></h4>

                <div className="container">
                    <div className="confirmation_item">
                        <h5 className="confirmation_item--head">Services</h5>
                        <p className='confirmation_item--selected'>{props.selectedServices.map(({ label }: any) => label).join(' , ')}</p>
                    </div>
                    <div className="confirmation_item">
                        <h5 className="confirmation_item--head">Staff</h5>

                        <div className="d-flex align-items-center g-2">
                            {
                                props.selectedStaffDetails && props.selectedStaffDetails.image ?
                                <img className='confirmation_item--img' src={props.selectedStaffDetails.image}/>
                                :
                                <Avatar icon={<UserOutlined />} className="confirmation_item--img" size={64}/>
                            }
                            {props.selectedStaffDetails.staffName}
                        </div>
                    </div>
                    <div className="confirmation_item">
                        <h5 className="confirmation_item--head">Date & Time</h5>
                        <p className='confirmation_item--selected'>{props.selectedDate} <span>({props.selectDay})</span> | {props.selectedTimeStore}</p>
                    </div>

                    <div className="confirmation_buttonSection">
                        <Button className='btn-primary' onClick={() => props.setIsContinueClicked(false)}>Back</Button>
                        <Button className='btn-secondary' onClick={()=> props.setIsRecurringClicked(true)}>Book Recurring</Button>
                        <Button className='btn-green' onClick={confirm}>Confirm</Button>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Confirmation

declare global {
    interface Window {
        Email: any;
    }
}