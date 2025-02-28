import { editUserData, getAllUserData } from '../../handlers/userHandlers';
import { useUser } from '../../context/userContext';
import './ClientProfile.modules.css';

import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

export function ClientProfile() {
    const handler = editUserData;
    const [initialValues, setInitialValues] = useState({});
    const formName = 'editUser'

    const { user } = useUser();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [outstanding, setOutstanding] = useState([]);
    const [past, setPast] = useState([]);

    const { values, setValues, errors, success, successMessage, onChange, onSubmit } = useForm(handler, initialValues, formName);

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = await getAllUserData(user.id);
            setUserData(userData.userData);
            setBookings(userData.bookings);

            if (userData) {
                const userValues = {
                    first_name: userData.userData.first_name || '',
                    last_name: userData.userData.last_name || '',
                    email: userData.userData.email || '',
                    phone_number: userData.userData.phone_number || '',
                    password: ''
                };
        
                setValues(userValues);
                setInitialValues(userValues);
            }
        };
        user?.id && fetchUserData();
    }, [user]);

    useEffect(() => {
        const upcoming = [];
        const completed = [];

        bookings.forEach(e => {
            const today = new Date();
            const appointmentDate = new Date(e.date);

            if (today.getTime() > appointmentDate.getTime()) {
                completed.push(e);
            } else {
                upcoming.push(e);
            }
        });

        setPast(completed);
        setOutstanding(upcoming);
    }, [bookings]);

    return (
        <div className="customer-profile-container">
            <div className="customer-update-info">
                <h2>My Information</h2>
                {userData ? (
                    <form onSubmit={onSubmit}>
                        <label>First Name</label>
                        <input
                            type='text'
                            value={values.first_name}
                            name='first_name'
                            onChange={onChange}
                        />
                        <label>Last Name</label>
                        <input
                            type='text'
                            value={values.last_name}
                            name='last_name'
                            onChange={onChange}
                        />
                        <label>Email</label>
                        <input
                            type='email'
                            value={values.email}
                            name='email'
                            onChange={onChange}
                        />
                        <label>Mobile Phone</label>
                        <input
                            type='text'
                            value={values.phone_number}
                            name='phone_number'
                            onChange={onChange}
                        />
                        <label>Password</label>
                        <input
                            type='password'
                            value={values.password}
                            name='password'
                            onChange={onChange}
                        />
                        <button className='custom-button'>Save</button>
                    </form>
                ) : (
                    <p>Loading...</p>
                )}

                <button className='delete-button'>Delete Profile</button>
            </div>
            <div className="customer-outstanding-appointments">
                {outstanding.length > 0 ? (
                    <div className='places-container'>
                        <h2>Upcoming Appointments</h2>
                        {outstanding.map(e => (
                            <div className='place-details' key={e.booking_id}>
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
                            <div className='place-details' key={e.booking_id}>
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
                        <h2>You have no past appointments!</h2>
                    </div>
                )}
            </div>
        </div>
    );
}
