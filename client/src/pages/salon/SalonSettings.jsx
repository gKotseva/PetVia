import './SalonSettings.modules.css';

import { useEffect, useState } from 'react';

import { MdOutlineManageAccounts, MdOutlineReviews } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiTeamLine, RiGalleryView2 } from "react-icons/ri";
import { PiDogLight } from "react-icons/pi";
import { GrSchedule } from "react-icons/gr";

import { Loading } from '../../components/Loading';
import { useAuth } from '../../context/AuthContext';
import { addTeamMember, editSalonDetails, getSalonDetails, getTeam, deleteTeamMember, getServices, addService, deleteService, addSchedule, getReviews } from '../../handlers/salonHandlers';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/Modal';
import { Form } from '../../components/Form';
import { displayReviewStars } from '../../components/DisplayReviewStars';
import { Calendar } from '../../components/Calendar';
import { Schedule } from '../../components/Schedule';

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
      {auth && activeSetting !== 'appointments' ? (
        <div className="settings-active-schedule-container">
          <h2>Today</h2>
          <div className="settings-appointments-view">
            {/* <Appointments
              user_type="salon"
              id={auth.auth.id}
              service_duration={null}
              selected_date={formattedToday}
            /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function AccountSettings() {
  const auth = useAuth()
  const [salonDetails, setSalonDetails] = useState({})
  const handler = editSalonDetails;
  const [initialValues, setInitialValues] = useState({});
  const formName = 'edit-salon'
  const { values, setValues, onChange, onSubmit } = useForm(handler, formName, initialValues);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      const result = await getSalonDetails(auth.auth.id)
      const salonData = result.data
      setSalonDetails(salonData)

      if (salonData) {
        const salonValues = {
          name: salonData.name || '',
          address: salonData.address || '',
          city: salonData.city || '',
          state: salonData.state || '',
          description: salonData.description || '',
          email: salonData.email || '',
          phone_number: salonData.phone_number || '',
          password: ''
        };

        setValues(salonValues);
        setInitialValues(salonValues);
      }

    }
    auth.auth?.id && fetchSalonDetails()
  }, [auth])

  return (
    <div className="settings-account-container">
      <h2>Account settings</h2>
      <div className="settings-individual-heading">
        <h5>Edit your information</h5>
      </div>
      <div className="settings-form-container">
        {salonDetails && Object.keys(values).length > 0 ? (
          <form onSubmit={onSubmit}>
            <div className="form-row row">
              <div className='form-row'>
                <label>Email</label>
                <input
                  type='text'
                  value={values.email}
                  name='email'
                  onChange={onChange}
                />
              </div>
              <div className='form-row'>
                <label>Password</label>
                <input
                  type='password'
                  value={values.password}
                  name='password'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-row row">
              <div className='form-row'>
                <label>Salon name</label>
                <input
                  type='text'
                  value={values.name}
                  name='name'
                  onChange={onChange}
                />
              </div>
              <div className='form-row'>
                <label>Phone number</label>
                <input
                  type='text'
                  value={values.phone_number}
                  name='phone_number'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="form-row row">
              <div className='form-row'>
                <label>State</label>
                <input
                  type='text'
                  value={values.state}
                  name='state'
                  onChange={onChange}
                />
              </div>
              <div className='form-row'>
                <label>City</label>
                <input
                  type='text'
                  value={values.city}
                  name='city'
                  onChange={onChange}
                />
              </div>

              <div className='form-row'>
                <label>Address</label>
                <input
                  type='text'
                  value={values.address}
                  name='address'
                  onChange={onChange}
                />
              </div>
            </div>
            <div className='form-row'>
              <label>Description</label>
              <textarea
                type='text'
                value={values.description}
                name='description'
                onChange={onChange}
              />
            </div>
            <button className='custom-button'>Submit</button>
          </form>
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

  const handler = addTeamMember;

  const fetchTeamDetails = async () => {
    const result = await getTeam(auth.auth.id);
    setTeamDetails(result.data);
  };

  useEffect(() => {
    fetchTeamDetails();
  }, [auth]);

  const onDelete = async (id) => {
    const response = await deleteTeamMember(id)
    showNotification(response.message, 'success')
    fetchTeamDetails()
  }

  const { onChange, onSubmit } = useForm(handler, 'add-team-member', null, null, null, fetchTeamDetails);

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
                  <img src={'./image.png'} alt={name} />
                  <h4>{name}</h4>
                  <FaTrashAlt color='red' onClick={() => onDelete(team_member_id)} />
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
            <form onSubmit={onSubmit}>
              <label>Name</label>
              <input type='text' name='name' onChange={onChange}></input>
              <label>Image</label>
              <input type='file' name='image' onChange={onChange}></input>
              <button className='custom-button'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesSettings() {
  const { showNotification } = useNotification();
  const auth = useAuth()
  const handler = addService
  const [services, setServices] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialValues, setInitialValues] = useState(null)

  const fetchServices = async () => {
    const result = await getServices(auth.auth.id)
    setServices(result.data)
  }

  useEffect(() => {
    fetchServices()
  }, [auth])

  const onDelete = async (service_id) => {
    await deleteService(service_id)
    fetchServices()
    showNotification('Service removed!', 'success')
  }

  const openModal = (service) => {
    setInitialValues(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchServices()
  };

  const { onChange, onSubmit } = useForm(handler, 'add-service', null, null, null, fetchServices);

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
                    <p>{description}</p>
                  </div>
                  <div className="settings-buttons-container">
                    <FaEdit color='green' onClick={() => openModal({ service_id, name, price, duration, description })} />
                    <FaTrashAlt color='red' onClick={() => onDelete(service_id)} />
                  </div>
                </div>
                || <Loading />
              ))}
            </div>
          ) : (
            <p>You have no services added!</p>
          )}
        </div>
        <hr></hr>
        <div className="settings-add-new-service-container">
          <div className="settings-individual-heading">
            <h5>Add new service</h5>
          </div>
          <div className="settings-add-new-service">
            <form onSubmit={onSubmit}>
              <div className="form-row row">
                <div className='form-row'>
                  <label>Service name</label>
                  <input
                    type='text'
                    name='name'
                    onChange={onChange}
                  />
                </div>
                <div className='form-row'>
                  <label>Price</label>
                  <input
                    type='text'
                    name='price'
                    onChange={onChange}
                  />
                </div>
                <div className='form-row'>
                  <label>Duration</label>
                  <input
                    type='text'
                    name='duration'
                    onChange={onChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <label>Description</label>
                <textarea
                  name='description'
                  onChange={onChange}
                />
              </div>
              <button className='custom-button'>Submit</button>
            </form>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <Form formName={'edit-service'} closeModal={closeModal} openModal={openModal} editData={initialValues} refreshData={fetchServices} />
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
          <Schedule salonId={auth?.id} closeModal={() => setShowModal(false)}/>
        </Modal>
      )}
    </div>
  )
}

function GallerySettings() {
  return (
    <div className="gallery-settings-container">
      <h3>Gallery Settings</h3>
      <div className="settings-images-container">
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
        <img src='image.png' />
      </div>
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
              <p>{review.comment}</p>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}
