import './ClientProfile.modules.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../context/AuthContext';
import { cancelAppointment, getUserBookings, getUserDetails } from '../../handlers/customer';
import { Loading } from '../../components/Loading';
import { Confirm } from '../../components/Confirm';
import { Modal } from '../../components/Modal';
import { Form } from '../../components/Form';

export function ClientProfile() {
  const { auth, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [futurePage, setFuturePage] = useState(1);
  const [pastPage, setPastPage] = useState(1);
  const [modalContent, setModalContent] = useState('')
  const [initialValues, setInitialValues] = useState({});
  const navigate = useNavigate()
  const [appointmentId, setAppointmentId] = useState(null)

  const itemsPerPage = 4;

  const fetchBookings = async () => {
    const response = await getUserBookings(auth.id)
    setBookings(response.result)
  }

  const fetchAccountDetails = async () => {
    const response = await getUserDetails(auth.id)
    setUserData(response.result)
    setInitialValues(response.result)
  }

  useEffect(() => {
    if (!auth?.id) return;
    fetchAccountDetails()
    fetchBookings()
  }, [auth?.id])

  if (!userData || !bookings) return <Loading />;

  const totalFuturePages = Math.ceil(bookings.future.length / itemsPerPage);
  const paginatedFuture = bookings.future.slice(
    (futurePage - 1) * itemsPerPage,
    futurePage * itemsPerPage
  );

  const totalPastPages = Math.ceil(bookings.past.length / itemsPerPage);
  const paginatedPast = bookings.past.slice(
    (pastPage - 1) * itemsPerPage,
    pastPage * itemsPerPage
  );

  return (
    <div className="customer-profile-container">
      <div className="customer-profile-settings">
        <h4>Personal Information</h4>
        <Form form='edit-user' initialData={initialValues} refreshData={fetchAccountDetails} />
        <button
          className="delete-button"
          onClick={() => {
            setModalContent('delete-profile')
            setShowModal(true)
          }}
        >
          Delete Profile
        </button>
      </div>
      <div className="customer-profile-appointments">
        <div className="customer-profile-upcoming-appointments">
          <h4>Upcoming Appointments</h4>
          {paginatedFuture.length > 0 ? (
            paginatedFuture.map(booking => (
              <div className="customer-profile-appointment-container" key={booking.appointment_id}>
                <div className="appointment-date">
                  <p>{booking.appointment_date}</p>
                  <p>{booking.start_time.slice(0, 5)}</p>
                  <p onClick={() => {
                    setModalContent('delete-appointment')
                    setAppointmentId(booking.appointment_id)
                    setShowModal(true)
                  }}>cancel</p>
                </div>
                <div className="appointment-data">
                  <p>{booking.salon_name}</p>
                  <p>{booking.service_name}</p>
                </div>
                <div className="appointment-image" onClick={() => navigate(`/salon/${booking.salon_id}`)}>
                  <img src={`./images/${booking.image}`} />
                </div>
              </div>
            ))
          ) : (
            <h4>No upcoming bookings</h4>
          )}
          {totalFuturePages > 1 && (
            <div className="pagination">
              <button onClick={() => setFuturePage(prev => Math.max(prev - 1, 1))} disabled={futurePage === 1}>
                {'<'}
              </button>
              <span>{futurePage} ... {totalFuturePages}</span>
              <button onClick={() => setFuturePage(prev => Math.min(prev + 1, totalFuturePages))} disabled={futurePage === totalFuturePages}>
                {'>'}
              </button>
            </div>
          )}
        </div>
        <div className="customer-profile-past-appointments">
          <h4>Past Appointments</h4>
          {paginatedPast.length > 0 ? (
            paginatedPast.map(booking => (
              <div className="customer-profile-appointment-container" key={booking.appointment_id}>
                <div className="appointment-date">
                  <p>{booking.appointment_date}</p>
                  <p>{booking.start_time.slice(0, 5)}</p>
                </div>
                <div className="appointment-data">
                  <p>{booking.salon_name}</p>
                  <p>{booking.service_name}</p>
                </div>
                <div className="appointment-image" onClick={() => navigate(`/salon/${booking.salon_id}`)}>
                  <img src={`./images/${booking.image}`} />
                </div>
              </div>
            ))
          ) : (
            <h4>No past bookings</h4>
          )}
          {totalPastPages > 1 && (
            <div className="pagination">
              <button onClick={() => setPastPage(prev => Math.max(prev - 1, 1))} disabled={pastPage === 1}>
                {'<'}
              </button>
              <span>{pastPage} ... {totalPastPages}</span>
              <button onClick={() => setPastPage(prev => Math.min(prev + 1, totalPastPages))} disabled={pastPage === totalPastPages}>
                {'>'}
              </button>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {modalContent === 'delete-profile' ? (
            <Confirm
              title="Delete profile"
              text="Are you sure you would like to delete your profile with PetVia?"
              onConfirm={async () => {
                setShowModal(false);
                await deleteUser(auth.id)
                logout()
              }}
              onDeny={() => setShowModal(false)}
            />
          ) : (
            <Confirm
              title="Cancel appointment"
              text="Are you sure you would like to cancel your appointment?"
              onConfirm={async () => {
                setShowModal(false);
                await cancelAppointment(appointmentId)
                fetchBookings()
                setAppointmentId(null)
              }}
              onDeny={() => setShowModal(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}