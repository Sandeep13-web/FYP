import { Button, Checkbox, DatePicker, DatePickerProps, Form, Modal, Radio, Select } from 'antd'
import axios from 'axios'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

function Recurring(props: any) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const currentDate = moment().format('YYYY-MM-DD')

    const [endDate , setEndDate] = useState<any>()
    const [recurringDay , setRecuringDay] = useState<any>()

    const backHome = () => {
        props.setIsContinueClicked(false)
        props.setIsRecurringClicked(false)
    }

    const getRecurringDay = (e:any) => {
        const storeDay = e.target.value;
        setRecuringDay(storeDay)
    }
    const getEndDate: DatePickerProps['onChange'] = (date) => {
        const selectEndDate = moment(date).format('YYYY-MM-DD')
        setEndDate(selectEndDate)
    }
    const headers = {
        'Content-Type': 'application/json'
    }
    
    

    const submitReccuringBooking = async(e:any) => {
        e.preventDefault();
        if(recurringDay==undefined || endDate  == undefined ){
            toast.warn("Please select all the required fields!")
        }else{
            const data = {
                "userName": session?.user?.name,
                "services": props.selectedServices.map(({ value }: any) => value),
                "staffId": props.selectedStaffDetails.id,
                "day":recurringDay,
                "startDate": currentDate,
                "endDate": props.selectedDate,
                "time": props.selectedTimeStore
            }
            const response = await axios.post('http://127.0.0.1:8080/api/v1/bookings', data, {headers:headers})
    
            //For success Modal
            let secondsToGo = 3;
    
            const modal = Modal.success({
                title: 'Your recurring booking was successful!',
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
                <p>You have successfully booked your recurring appointment.</p>
                <p>Your appointment has been scheduled every <strong>${recurringDay}</strong> from ${props.selectedDate} to ${endDate} at ${props.selectedTimeStore} by ${props.selectedStaffDetails.staffName}.</p>
                <p>Please be available at the required day and time in the salon.</p><br>
                <p>Regards, <br> Tonsorium - Your stylist partner</p>`
            }
            if (window.Email) {
                window.Email.send(sendMail);
                 router.push('/')
            }
        }
        
    }
    return (
        <>
            <div className="recurring">
                <div className="container">
                    <h5 className="recurring-head">Make Recurring Appointments</h5>

                    <div className="recurring-details">
                        <h5 className="recurring-details_head">Appointment Details</h5>

                        <Form>
                            <div className="recurring-details__list">
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">Client</p>
                                    <p className='recurring-details__list-individual--answer'>{session?.user?.name}</p>
                                </div>
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">Stylist</p>
                                    <p className='recurring-details__list-individual--answer'>{props.selectedStaffDetails.staffName}</p>
                                </div>
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">Start Time</p>
                                    <p className='recurring-details__list-individual--answer'>{props.selectedTimeStore}</p>
                                </div>
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">End Time</p>
                                    <p className='recurring-details__list-individual--answer'>11:30 am</p>
                                </div>
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">Service</p>
                                    <div className="service-list">{
                                        props.selectedServices.map((label:any , key:any) => (
                                            <p className='recurring-details__list-individual--answer' key={key}>{label.label}</p>
                                        ))
                                    }
                                    </div>
                                </div>
                            </div>
                            <div className="recurring-details__options">
                                <div className="recurring-details__options--item">
                                    <p className="recurring-details__options--item_label">Select Day</p>
                                    <div className="checkbox-section">
                                        <Radio.Group onChange={getRecurringDay}>
                                            <Radio value={"sunday"}>Sun</Radio>
                                            <Radio value={"monday"}>Mon</Radio>
                                            <Radio value={"tuesday"}>Tue</Radio>
                                            <Radio value={"wednesday"}>Wed</Radio>
                                            <Radio value={"thursday"}>Thu</Radio>
                                            <Radio value={"friday"}>Fri</Radio>
                                            <Radio value={"saturday"}>Sat</Radio>
                                        </Radio.Group>
                                    </div>
                                </div>

                                <div className="recurring-details__options--item">
                                    <p className="recurring-details__options--item_label">Make appointment every</p>

                                    <div className="select-section">
                                        <Form.Item name="times" label="Times">
                                            <p className='recurring-details__list-individual--answer'>1</p>
                                        </Form.Item>
                                        <Form.Item name="per" label="Per">
                                            <p className='recurring-details__list-individual--answer'>Week</p>
                                        </Form.Item>
                                    </div>
                                </div>
                                <div className="recurring-details__list-individual">
                                    <p className="recurring-details__list-individual--label">Start Date</p>
                                    <p className='recurring-details__list-individual--answer'>{currentDate}</p>
                                </div>
                                <div className="recurring-details__options--item">
                                    <p className="recurring-details__options--item_label">End Date</p>
                                    <DatePicker placement='topLeft' onChange={getEndDate} disabledDate={props.disabledDate} />

                                </div>
                                <div className="confirmation_buttonSection">
                                    <Button className='btn-primary' onClick={backHome}>Back</Button>
                                    <Button className='btn-green' onClick={submitReccuringBooking}>Make Appointment</Button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Recurring