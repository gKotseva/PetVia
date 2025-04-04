import './ClientProfile.modules.css';

import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import { useAuth } from '../../context/AuthContext';
import { Loading } from '../../components/Loading';
import { getUserDetails, getUserBookings, updateUserDetails } from '../../handlers/userHandler';

export function ClientProfile() {
    const handler = updateUserDetails;
    const [initialValues, setInitialValues] = useState({});
    const form = 'edit-user'

    const { auth } = useAuth();
    const [userData, setUserData] = useState(null);
    const [bookings, setBookings] = useState(null);

    const { values, setValues, errors, success, successMessage, onChange, onSubmit } = useForm(handler, form, initialValues);

    useEffect(() => {
        if (!auth?.id) return;
        const fetchAccountDetails = async () => {
            const response = await getUserDetails(auth.id)
            setUserData(response.result)
            setValues(response.result)
            setInitialValues(response.result)
        }
        fetchAccountDetails()

        const fetchBookings = async () => {
            const response = await getUserBookings(auth.id)
            setBookings(response.result)
        }
        fetchBookings()
    }, [auth?.id])

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
                            value={values.password || ''}
                            name='password'
                            onChange={onChange}
                        />
                        <button className='custom-button'>Save</button>
                    </form>
                ) : (
                    <Loading />
                )}
                <button className='delete-button'>Delete Profile</button>
            </div>
            {bookings ? (
                <>
                    <div className="customer-outstanding-appointments">
                        {bookings.future?.length > 0 ? (
                            <div className='places-container'>
                                <h2>Upcoming Appointments</h2>
                                {bookings.future.map(e => (
                                    <div className='place-details' key={e.appointment_id}>
                                        <img src='/image.png' alt={e.name} />
                                        <h3>{e.name}</h3>
                                        <h4>{e.appointment_date}</h4>
                                        <h4>{new Date(`1970-01-01T${e.start_time}`).toLocaleTimeString('en-US', {
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
                        {bookings.past?.length > 0 ? (
                            <div className='places-container'>
                                <h2>Past Appointments</h2>
                                {bookings.past.map(e => (
                                    <div className='place-details' key={e.appointment_id}>
                                        <img src='/image.png' alt={e.name} />
                                        <h3>{e.name}</h3>
                                        <h4>{e.appointment_date}</h4>
                                        <h4>{new Date(`1970-01-01T${e.start_time}`).toLocaleTimeString('en-US', {
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
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
