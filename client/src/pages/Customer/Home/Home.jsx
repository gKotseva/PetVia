import { useEffect, useState } from 'react';
import './Home.modules.css';
import { getAllCities, getAllStates, getAllServices } from '../../../handlers/salonHandler';
import { useNavigate } from 'react-router-dom';

export function Home() {
    const navigate = useNavigate()
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedService, setSelectedService] = useState('');

    useEffect(() => {
        const fetchStates = async () => {
            const result = await getAllStates();
            setStates(result);
        };
        fetchStates();
    }, []);

    useEffect(() => {
        const fetchCities = async () => {
            if (selectedState) {
                const result = await getAllCities(selectedState);
                setCities(result);
            } else {
                setCities([]);
                setServices([]);
            }
        };
        fetchCities();
    }, [selectedState]);


    useEffect(() => {
        const fetchServices = async () => {
            if (selectedState && selectedCity) {
                const servicesResult = await getAllServices(selectedState, selectedCity);
                setServices(servicesResult);
            } else {
                setServices([]);
            }
        };
        fetchServices();
    }, [selectedState, selectedCity]);

    const onStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setSelectedCity('');
    };

    const onCityChange = (e) => {
        const city = e.target.value;
        setSelectedCity(city);
    };

    const onServiceChange = (e) => {
        const service = e.target.value;
        setSelectedService(service);
    }

    const showSalons = (e) => {
        e.preventDefault()
        navigate('/salons', {state: {selectedCity, selectedState, selectedService}})
    }

    return (
        <div className="home-container">
            <div className="home-section-1">
                <div className='home-form-container'>
                    <h3>Book an appointment for a fluffy refresh</h3>
                    <form>
                        <select name="state" id="state" onChange={onStateChange}>
                            <option value="" disabled selected>Select a state</option>
                            {states.map(e => (
                                <option value={e.state}>{e.state}</option>
                            ))}
                        </select>
                        <select name="city" id="city" onChange={onCityChange} value={selectedCity}>
                            <option value="" disabled selected>Select a city</option>
                            {cities.map(e => (
                                <option value={e.city}>{e.city}</option>
                            ))}
                        </select>
                        <select name="service" id="service" onChange={onServiceChange}>
                            <option value="" disabled selected hidden>Select a service</option>
                            {services.map(e => (
                                <option value={e.service_name}>{e.service_name}</option>
                            ))}
                        </select>
                        {/* <select name="dateAndTime" id="dateAndTime">
                            <option value="" disabled selected hidden>Select a date and time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="other">Other day</option>
                        </select> */}
                        <button className='custom-button' onClick={showSalons}>Show salons</button>
                    </form>
                </div>
            </div>
            <div className="home-section-2">
                <div className="div">
                    <img src="./booking.png" alt="Booking"/>
                    <h3>Book an appointment online, anytime, free of charge!</h3>
                </div>
                <div className="div">
                    <img src="./book.png" alt="Appointments"/>
                    <h3>1 appointment booked through PetVia!</h3>
                </div>
                <div className="div">
                    <img src="./grooming.png" alt="Grooming salons"/>
                    <h3>12 grooming salons!</h3>
                </div>
            </div>
            <div className="home-section-3">
                <div>
                    <h2>Explore our grooming salons</h2>
                    <h4>When fur needs a little love and a pair of scissors.</h4>
                </div>
            </div>
        </div>
    );
}
