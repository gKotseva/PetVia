import './SalonSettings.modules.css';

import { useEffect, useState } from 'react';

import { MdOutlineManageAccounts } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { PiDogLight } from "react-icons/pi";
import { AiOutlineSchedule } from "react-icons/ai";
import { GrSchedule } from "react-icons/gr";
import { RiGalleryView2 } from "react-icons/ri";
import { MdOutlineReviews } from "react-icons/md";
import { Loading } from '../../components/Loading';

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
  const formName = 'editSalon'
  const { values, setValues, errors, success, successMessage, onChange, onSubmit } = useForm(handler, initialValues, formName);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      const result = await getSalonDetails(auth.auth.salonID)
      const salonData = result.results[0]
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
    auth.auth?.salonID && fetchSalonDetails()
  }, [auth])

  return (
    <div className="account-settings-container">
      <h2>Account settings</h2>
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
            <input
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
  );
}

function TeamSettings() {
  return (
    <div className="team-settings-container">
      <h3>Team Settings</h3>
      <div className="settings-team-members-container">
        <div className="setting-team-member">
          <img src='image.png' />
          <h4>Example Name</h4>
        </div>
        <div className="setting-team-member">
          <img src='image.png' />
          <h4>Example Name</h4>
        </div>
        <div className="setting-team-member">
          <img src='image.png' />
          <h4>Example Name</h4>
        </div>
      </div>
      <hr></hr>
      <div className="settings-add-team-member-container">
        <h4>Add new team member</h4>
        <form>
          <label>Name</label>
          <input type='text'></input>
          <label>Image</label>
          <input type='file'></input>
          <button className='custom-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}

function ServicesSettings() {
  return (
    <div className="services-settings-container">
      <div className="services-heading">
        <h3>Services Settings</h3>
      </div>
      <div className="services-content">
        <div className="settings-current-services-container">
          <h4>Your current services</h4>
          <div className="settings-service">
            <h4>service name</h4>
            <h4>price</h4>
            <h4>durration</h4>
            <div className="settings-buttons-container">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
          <div className="settings-service">
            <h4>service name</h4>
            <h4>price</h4>
            <h4>durration</h4>
            <div className="settings-buttons-container">
              <button>edit</button>
              <button>delete</button>
            </div>
          </div>
        </div>
        <div className="settings-add-new-service-container">
          <h4>Add new service</h4>
          <form>
            <label>Service name</label>
            <input type='text'></input>
            <label>Price</label>
            <input type='text'></input>
            <label>Durration</label>
            <input type='text'></input>
            <label>Description</label>
            <input type='text'></input>
            <button className='custom-button'>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

import { Calendar } from '../../components/Calendar';
import { editSalonDetails, getSalonDetails } from '../../handlers/salonHandlers';
import { useAuth } from '../../context/AuthContext';
import { useForm } from '../../hooks/useForm';

function ScheduleSettings() {
  return (
    <div className="schedule-settings-container">
      <h3>Schedule Settings</h3>
      <Calendar user='salon' />
    </div>
  );
}

function AppointmentsSettings() {
  return (
    <div className="appointments-settings-container">
      <h3>Your appointments</h3>
      <Calendar user='salon' />
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
