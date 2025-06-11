import './SalonSettings.modules.css';

import { useEffect, useState } from 'react';

import { MdOutlineManageAccounts, MdOutlineReviews } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiTeamLine, RiGalleryView2 } from "react-icons/ri";
import { PiDogLight } from "react-icons/pi";
import { GrSchedule } from "react-icons/gr";
import { FaTrashRestore } from "react-icons/fa";

import { Loading } from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { getSalonDetails, getTeam, deleteTeamMember, getServices, deleteService, getReviews, getTodayAppointments, getImages } from '../../handlers/salon';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/Modal';
import { Form } from '../../components/Form';
import { displayReviewStars } from '../../components/DisplayReviewStars';
import { Calendar } from '../../components/Calendar';
import { Schedule } from '../../components/Schedule';
import { formatDate } from '../../utils/date';
import { Confirm } from '../../components/Confirm';

export function SalonSettings() {
  const [activeSetting, setActiveSetting] = useState('account');
  const auth = useAuth()
  const today = new Date()
  const formattedToday = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`

  const toggleSettings = (component) => {
    if (activeSetting !== component || activeSetting === 'account') {
      setActiveSetting(component);
    }
  };

  return (
    <div className="salon-settings-container">
      <div className="settings-navigation-container">
        <h1>Settings</h1>
        <ul>
          <li onClick={() => toggleSettings('account')} className={activeSetting === 'account' ? 'active' : ''}><MdOutlineManageAccounts /> Account</li>
          <li onClick={() => toggleSettings('team')} className={activeSetting === 'team' ? 'active' : ''}><RiTeamLine /> Team</li>
          <li onClick={() => toggleSettings('services')} className={activeSetting === 'services' ? 'active' : ''}><PiDogLight /> Services</li>
          <li onClick={() => toggleSettings('appointments')} className={activeSetting === 'appointments' ? 'active' : ''}><GrSchedule /> Appointments</li>
          <li onClick={() => toggleSettings('gallery')} className={activeSetting === 'gallery' ? 'active' : ''}><RiGalleryView2 /> Gallery</li>
          <li onClick={() => toggleSettings('customer_reviews')} className={activeSetting === 'customer_reviews' ? 'active' : ''}><MdOutlineReviews /> Customer Reviews</li>
        </ul>
      </div>
      <div className={`settings-details-container ${activeSetting === 'appointments' ? 'full-width' : ''}`}>
        {activeSetting === 'account' && <AccountSettings />}
        {activeSetting === 'team' && <TeamSettings />}
        {activeSetting === 'services' && <ServicesSettings />}
        {activeSetting === 'appointments' && <AppointmentsSettings />}
        {activeSetting === 'gallery' && <GallerySettings />}
        {activeSetting === 'customer_reviews' && <CustomerReviewsSettings />}
      </div>
      {activeSetting !== 'appointments' ? (
        <TodayAppointments />
      ) : null}
    </div>
  );
}

function AccountSettings() {
  const auth = useAuth()
  const [salonDetails, setSalonDetails] = useState({})
  const [initialValues, setInitialValues] = useState({});

  const fetchSalonDetails = async () => {
    const result = await getSalonDetails(auth.auth.id)
    const salonData = result.data
    setSalonDetails(salonData)

    if (salonData) {
      setInitialValues(salonData);
    }
  }

  useEffect(() => {
    auth.auth?.id && fetchSalonDetails()
  }, [auth])

  return (
    <div className="settings-account-container">
      <h2>Account settings</h2>
      <div className="settings-form-container">
        {salonDetails && Object.keys(initialValues).length > 0 ? (
          <Form form={'edit-salon'} initialData={initialValues} refreshData={fetchSalonDetails} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

function TeamSettings() {
  const auth = useAuth()
  const [teamDetails, setTeamDetails] = useState([])
  const { showNotification } = useNotification();

  const fetchTeamDetails = async () => {
    const result = await getTeam(auth.auth.id);
    setTeamDetails(result.data);
  };

  useEffect(() => {
    fetchTeamDetails();
  }, [auth]);

  const onDelete = async (id, image) => {
    const response = await deleteTeamMember(id, image)
    showNotification(response.message, 'success')
    fetchTeamDetails()
  }

  return (
    <div className="team-settings-container">
      <h3>Team Settings</h3>
      <div className="settings-team-contents">
        <div className="settings-team-members-container">
          <div className="settings-individual-heading">
            <h5>Your team members</h5>
          </div>
          <div className="settings-team-members">
            {teamDetails === null ? (
              <Loading />
            ) : teamDetails.length === 0 ? (
              <p>No team members added.</p>
            ) : (
              teamDetails.map(({ team_member_id, name, image }) => (
                <div key={team_member_id} className="setting-team-member">
                  <div className="team-member-image">
                    <img src={image ? `/images/${image}` : 'image.png'} alt={name} />
                  </div>
                  <div className="team-member-info">
                    <h4>{name}</h4>
                    <FaTrashAlt color='red' onClick={() => onDelete(team_member_id, image)} />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <hr></hr>
        <div className="settings-add-team-member-container">
          <div className="settings-individual-heading">
            <h5>Add members</h5>
          </div>
          <div className="settings-add-team-member">
            <Form form={'add-team-member'} refreshData={fetchTeamDetails} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSettings() {
  const auth = useAuth()

  const { showNotification } = useNotification();
  const [services, setServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState('')
  const [initialValues, setInitialValues] = useState(null)

  const fetchServices = async () => {
    const result = await getServices(auth.auth.id)
    setServices(result.data)
  }

  useEffect(() => {
    fetchServices()
  }, [auth])

  const openModal = (service, modalType) => {
    setInitialValues(service);
    setModalType(modalType)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchServices()
  };

  return (
    <div className="services-settings-container">
      <h3>Services Settings</h3>
      <div className="services-contents">
        <div className="settings-current-services-container">
          <div className="settings-individual-heading">
            <h5>Your current services</h5>
          </div>
          {services.length > 0 ? (
            <div className='settings-single-service'>
              {services?.map(({ service_id, name, price, duration, description }) => (
                <div className="settings-service" key={service_id}>
                  <div className="setting-service-details">
                    <h4>{name}</h4>
                    <h4>{price}$</h4>
                    <h4>{duration} min</h4>
                    <p>{description || 'No description added!'}</p>
                  </div>
                  <div className="settings-buttons-container">
                    <FaEdit data-testid={`edit-service-${service_id}`} color='green' onClick={() => openModal({ service_id, name, price, duration, description }, 'edit')} />
                    <FaTrashAlt data-testid={`delete-service-${service_id}`} color='red' onClick={() => openModal({ service_id, name }, 'delete')} />
                  </div>
                </div>
                || <Loading />
              ))}
            </div>
          ) : (
            <div className='settings-single-service'>
              <div className='settings-service'>
                <p>You have no services added!</p>
              </div>
            </div>
          )}
        </div>
        <hr></hr>
        <div className="settings-add-new-service-container">
          <div className="settings-individual-heading">
            <h5>Add new service</h5>
          </div>
          <div className="settings-add-new-service">
            <Form form={'add-service'} refreshData={fetchServices} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          {modalType === 'edit' ? (
            <Form form={'edit-service'} closeModal={closeModal} openModal={openModal} initialData={initialValues} refreshData={fetchServices} />
          ) : (
            <Confirm
              title="Deleting service"
              text={
                <>
                  Are you sure you would like to delete service <strong>{initialValues.name}</strong>?
                </>
              }
              onConfirm={async () => {
                await deleteService(initialValues.service_id)
                fetchServices()
                setIsModalOpen(false)
                showNotification('Service removed!', 'success')
              }}
              onDeny={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

function AppointmentsSettings() {
  const { auth } = useAuth()
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="settings-appointments-container">
      <div className="settings-appointments-header">
        <h4>Your appointments</h4>
        <button onClick={() => setShowModal(true)}>bulk add schedule</button>
      </div>
      <Calendar userType="salon" salonId={auth?.id} />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Schedule salonId={auth?.id} closeModal={() => setShowModal(false)} />
        </Modal>
      )}
    </div>
  )
}

function GallerySettings() {
  const [showModal, setShowModal] = useState(false)
  const [images, setImages] = useState([])
  const auth = useAuth()

  const fetchImages = async () => {
    const result = await getImages(auth.auth.id);
    setImages(result.data);
  }

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="settings-gallery-container">
      <div className="settings-add-images">
        <button className='add-images-button custom-button' onClick={() => setShowModal(true)}>Add images</button>
      </div>
      <br></br>
      <hr></hr>
      <br></br>
      <div className="settings-images-container">
        {images.map(image => (
          <div className="settings-image-card" key={image.image_id}>
            <div className="image-card-header">
              <button className='make-primary-button'>Primary</button>
              <FaTrashRestore color='red' />
            </div>
            <div className="image-card-image">
              <img src={`./images/${image.image_url}`} />
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <Form form='add-photos' closeModal={() => setShowModal(false)} refreshData={fetchImages}/>
        </Modal>
      )}
    </div>
  );
}

function CustomerReviewsSettings() {
  const auth = useAuth()
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetchReviews = async () => {
      const result = await getReviews(auth.auth.id)
      setReviews(result.data)
    }
    fetchReviews()
  }, [])

  return (
    <div className="customer-reviews-settings-container">
      <h3>Customer Reviews Settings</h3>
      <div className="review-settings-container">
        {reviews.length > 0 ? (
          reviews.map(review => (
            <div className="settings-review-container" key={review.review_id}>
              <h3>{review.first_name}, {review.last_name}</h3>
              <h4>{displayReviewStars(review.rating)}</h4>
              <p>{formatDate(new Date(review.created_at))}</p>
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <div className="settings-review-container">
            <p>There are no reviews for your salon!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TodayAppointments() {
  const auth = useAuth()
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    const fetchAppointments = async () => {
      const result = await getTodayAppointments(auth.auth.id, formatDate(new Date()))
      setAppointments(result.data)
    }
    fetchAppointments()
  }, [])

  return (
    <div className="settings-active-schedule-container">
      <h2>Today</h2>
      <div className="settings-appointments-view">
        {appointments?.length > 0 ? (
          appointments.map(e => (
            <div className="appointment-div">
              <div className="appointment-customer-info">
                <p>Client: {e.first_name} {e.last_name}</p>
              </div>
              <div className="appointment-service-info">
                <p>{e.start_time.slice(0, 5)}</p>
                <p>{e.duration} min</p>
                <p>{e.name}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No appointments for today.</p>
        )}
      </div>
    </div>
  );
}