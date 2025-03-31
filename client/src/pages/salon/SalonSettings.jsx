import './SalonSettings.modules.css';

import { useEffect, useState } from 'react';

import { MdOutlineManageAccounts, MdOutlineReviews } from "react-icons/md";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { RiTeamLine, RiGalleryView2 } from "react-icons/ri";
import { PiDogLight } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrSchedule } from "react-icons/gr";

import { Loading } from '../../components/Loading';
// // import { Calendar } from '../../components/Calendar';
import { useAuth } from '../../context/AuthContext';
import { addTeamMember, editSalonDetails, getSalonDetails, getTeam, deleteTeamMember, getServices, addService, deleteService } from '../../handlers/salonHandler';
import { useForm } from '../../hooks/useForm';
import { useNotification } from '../../context/NotificationContext';
import { Modal } from '../../components/Modal';
import { Form } from '../../components/Form';
// import { Modal } from '../../components/Modal';
// import { Form } from '../../components/Form';


export function SalonSettings() {
  const [activeSetting, setActiveSetting] = useState('account');

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
          <li onClick={() => toggleSettings('schedule')} className={activeSetting === 'schedule' ? 'active' : ''}><AiOutlineSchedule /> Schedule</li>
          <li onClick={() => toggleSettings('appointments')} className={activeSetting === 'appointments' ? 'active' : ''}><GrSchedule /> Appointments</li>
          <li onClick={() => toggleSettings('gallery')} className={activeSetting === 'gallery' ? 'active' : ''}><RiGalleryView2 /> Gallery</li>
          <li onClick={() => toggleSettings('customer_reviews')} className={activeSetting === 'customer_reviews' ? 'active' : ''}><MdOutlineReviews /> Customer Reviews</li>
        </ul>
      </div>
      <div className="settings-details-container">
        {activeSetting === 'account' && <AccountSettings />}
        {activeSetting === 'team' && <TeamSettings />}
        {activeSetting === 'services' && <ServicesSettings />}
        {activeSetting === 'schedule' && <ScheduleSettings />}
        {activeSetting === 'appointments' && <AppointmentsSettings />}
        {activeSetting === 'gallery' && <GallerySettings />}
        {activeSetting === 'customer_reviews' && <CustomerReviewsSettings />}
      </div>
      <div className="settings-active-schedule-container">
        <h2>Today</h2>
        <div className="settings-appointments-view">
          <div className="settings-appointment busy">
            <h5>8:30 - 9:30</h5>
            <h5>Full Grooming</h5>
          </div>
          <div className="settings-appointment free">
            <h5>9:30 - 10:30</h5>
            <h5>Free</h5>
          </div>
          <div className="settings-appointment busy">
            <h5>10:30 - 11:00</h5>
            <h5>Nail clipping</h5>
          </div>
          <div className="settings-appointment free">
            <h5>11:00 - 14:30</h5>
            <h5>Free</h5>
          </div>
          <div className="settings-appointment break">
            <h5>14:30 - 15:00</h5>
            <h5>Break</h5>
          </div>
        </div>
      </div>
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
                  <FaTrashAlt color='red' onClick={() => onDelete(team_member_id)}/>
                </div>
              ))
            )}
          </div>
        </div>
        <hr></hr>
        <div className="settings-add-team-member-container">
          <div className="settings-individual-heading">
            <h5>Your team members</h5>
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
          <Form formName={'edit-service'} closeModal={closeModal} openModal={openModal} editData={initialValues} />
        </Modal>
      )}
    </div>
  );
}

function ScheduleSettings() {
  return (
    <div className="schedule-settings-container">
      <h3>Schedule Settings</h3>
      {/* <Calendar user='salon' /> */}
    </div>
  );
}

function AppointmentsSettings() {
  return (
    <div className="appointments-settings-container">
      <h3>Your appointments</h3>
      {/* <Calendar user='salon' /> */}
    </div>
  );
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
  return (
    <div className="customer-reviews-settings-container">
      <h3>Customer Reviews Settings</h3>
      <div className="settings-review-container">
        <h3>Example Example</h3>
        <h4>*****</h4>
        <p>Lovely description, example, example Lovely description, example, example</p>
      </div>
    </div>
  );
}
