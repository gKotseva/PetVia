import { getAllUserData } from '../../handlers/userHandlers'
import { useUser } from '../../context/userContext'
import './ClientProfile.modules.css'

import { useEffect, useState } from 'react'

export function ClientProfile() {
    const { user } = useUser()
    const [userData, setUserData] = useState([])
    const [bookings, setBookings] = useState([])
    const [outstanding, setOutstanding] = useState([])
    const [past, setPast] = useState([])

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getAllUserData(user.id)
            setUserData(userData.userData)
            setBookings(userData.bookings)
        }
        fetchUserData()

    }, [user])

    useEffect(() => {
        bookings.map(e => {
            const today = new Date();
            const appointmentDate = new Date(e.date);

            if (today.getTime() > appointmentDate.getTime()) {
                setPast(prevPast => [...prevPast, e]);
            } else {
                setOutstanding(prevOutstanding => [...prevOutstanding, e]);
            }
        })
    }, [bookings])

    return (
        <div className="customer-profile-container">
            <div className="customer-update-info">
                <h2>My Information</h2>
                <form>
                    <label>First Name</label>
                    <input type='text' value={userData.first_name}></input>
                    <label>Last Name</label>
                    <input type='text' value={userData.last_name}></input>
                    <label>Email</label>
                    <input type='email' value={userData.email}></input>
                    <label>Mobile Phone</label>
                    <input type='text' value={userData.phone_number}></input>
                    <label>Password</label>
                    <input type='password'></input>
                    <button className='custom-button'>Save</button>
                </form>
                <button className='delete-button'>Delete Profile</button>
            </div>
            <div className="customer-outstanding-appointments">
                {outstanding.length > 0 ? (
                    <div className='places-container'>
                        <h2>Upcoming Appointments</h2>
                        {outstanding.map(e => (
                            <div className='place-details'>
                            <img src='/image.png' alt={e.name} />
                            <h3>{e.name}</h3>
                            <h4>{new Date(e.date).toLocaleDateString('bg-BG')}</h4>
                            <h4>{new Date(`1970-01-01T${e.start_time}Z`).toLocaleTimeString('bg-BG', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</h4>
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className='place-details'>
                        <h2>You have no upcoming appointments!</h2>
                    </div>
                )}
            </div>
            <div className="customer-past-appointments">
                {past.length > 0 ? (
                    <div className='places-container'>
                        <h2>Past Appointments</h2>
                        {past.map(e => (
                            <div className='place-details'>
                                <img src='/image.png' alt={e.name} />
                                <h3>{e.name}</h3>
                                <h4>{new Date(e.date).toLocaleDateString('bg-BG')}</h4>
                                <h4>{new Date(`1970-01-01T${e.start_time}Z`).toLocaleTimeString('bg-BG', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className='place-details'>
                        <h2>You have no upcoming appointments!</h2>
                    </div>
                )}
            </div>
        </div>
    )
}
