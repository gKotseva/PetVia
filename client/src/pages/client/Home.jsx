import './Home.modules.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { MdLocationPin } from "react-icons/md";
import { getAllCities, getAllStates, getAllServices, getAllSalons } from '../../handlers/salonHandlers';

export function Home() {
    const navigate = useNavigate();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [services, setServices] = useState([]);
    const [salons, setSalons] = useState([]);
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
    };

    const showSalons = (e) => {
        e.preventDefault();
        navigate('/salons', { state: { selectedCity, selectedState, selectedService } });
    };

    useEffect(() => {
        const getSalons = async () => {
            const result = await getAllSalons();
            setSalons(result);
        }

        getSalons();
    }, []);

    return (
        <div className="home-container">
            <div className="home-section-1">
                <h3>Book an appointment for a fluffy refresh</h3>
                <form>
                    <select name="state" id="state" onChange={onStateChange} value={selectedState}>
                        <option value="" disabled>Select a state</option>
                        {states.length > 0 ? (
                            states.map(e => (
                                <option value={e.state} key={e.state}>{e.state}</option>
                            ))
                        ) : (
                            <option value="" disabled>No States to show</option>
                        )}
                    </select>
                    <select name="city" id="city" onChange={onCityChange} value={selectedCity}>
                        <option value="" disabled>Select a city</option>
                        {cities.length > 0 ? (
                            cities.map(e => (
                                <option value={e.city} key={e.city}>{e.city}</option>
                            ))
                        ) : (
                            <option value="" disabled>No Cities to show</option>
                        )}
                    </select>
                    <select name="service" id="service" onChange={onServiceChange} value={selectedService}>
                        <option value="" disabled hidden>Select a service</option>
                        {services.length > 0 ? (
                            services.map(e => (
                                <option value={e.service_name} key={e.service_name}>{e.service_name}</option>
                            ))
                        ) : (
                            <option value="" disabled>No Services to show</option>
                        )}
                    </select>
                    <button className='custom-button' onClick={showSalons}>Show salons</button>
                </form>
            </div>
            <div className="home-section-2">
                <div className="div">
                    <img src="./image.png" alt="Booking" />
                    <h3>Book an appointment online, anytime, free of charge!</h3>
                </div>
                <div className="div">
                    <img src="./image.png" alt="Appointments" />
                    <h3>1 appointment booked through PetVia!</h3>
                </div>
                <div className="div">
                    <img src="./image.png" alt="Grooming salons" />
                    <h3>12 grooming salons!</h3>
                </div>
            </div>
            <div className="home-section-3">
                <div>
                    <h2>Explore our grooming salons</h2>
                    <h4>When fur needs a little love and a pair of scissors.</h4>
                </div>
                {salons.length > 0 ? (
                    <div className="salon-cards">
                        {salons.map(e => (
                            <div className="salon-card" key={e.salon_id}>
                                <img src='image.png' className='salon-image' />
                                <h2>{e.name}</h2>
                                <h3><MdLocationPin /> {e.state}</h3>
                                <p>{e.city}, {e.address}</p>
                            </div>
                        ))}
                    </div>

                ) : (
                    <div className="no-salons">
                        <p>No salons to show!</p>
                        <img src='./image.png'></img>
                    </div>
                )}
            </div>
        </div>
    )
}