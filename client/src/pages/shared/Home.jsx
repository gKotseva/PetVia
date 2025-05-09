import './Home.modules.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServicesPerDetails, getAllAppointmentsCount, getAllSalons } from '../../handlers/sharedHandlers';
import { MdLocationPin } from "react-icons/md";

export function Home() {
    const navigate = useNavigate()
    const [salons, setSalons] = useState([])
    const [appointmentsCount, setAppointmentsCount] = useState(Number)
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [services, setServices] = useState([])
    const [selectedState, setSelectedState] = useState('')
    const [selectedCity, setSelectedCity] = useState('')
    const [selectedService, setSelectedService] = useState('')
    const [galleryIndex, setGalleryIndex] = useState(0)

    useEffect(() => {
        const fetchAllSalons = async () => {
            const response = await getAllSalons()
            setSalons(response.result)
        }
        fetchAllSalons()

        const fetchAllAppointmentsCount = async () => {
            const response = await getAllAppointmentsCount()
            setAppointmentsCount(response.appointments)
        }
        fetchAllAppointmentsCount()
    }, [])

    useEffect(() => {
        if (salons.length > 0) {
            const states = [...new Set(salons.map(salon => salon.state))].sort()
            setStates(states)
        }

        const gallery = setInterval(() => {
            setGalleryIndex(prev => {
                const nextIndex = prev + 1;
                return nextIndex >= salons.length ? 0 : nextIndex;
            });
        }, 2000);

        return () => clearInterval(gallery);

    }, [salons]);

    const handleSelectChange = async (event) => {
        const { name, value } = event.target;

        if (name === "state") {
            setSelectedState(value);
            const cities = [...new Set(salons.filter(salon => salon.state === value).map(salon => salon.city))].sort();
            setCities(cities)
        } else if (name === "city") {
            setSelectedCity(value);
            const response = await fetchServicesPerDetails(value, selectedState)
            setServices([response.name])
        } else if (name === "service") {
            setSelectedService(value);
        }
    };

    const showSalons = (e) => {
        e.preventDefault();
        navigate('/salons', { state: { selectedCity, selectedState, selectedService } });
    };

    const visibleSalons = [
        ...salons.slice(galleryIndex, galleryIndex + 5),
        ...salons.slice(0, Math.max(0, (galleryIndex + 5) - salons.length))
    ];

    return (
        <div className="home-container">
            <div className="home-heading-container">
                <div className="home-heading-form-container">
                    <form onSubmit={showSalons}>
                        <select name="state" id="state" onChange={handleSelectChange} value={selectedState}>
                            <option value="" disabled>Select a state</option>
                            {states.length > 0 ? (
                                states.map(e => <option value={e} key={e}>{e}</option>)
                            ) : (
                                <option value="" disabled>No States to show</option>
                            )}
                        </select>
                        <select name="city" id="city" onChange={handleSelectChange} value={selectedCity}>
                            <option value="" disabled>Select a city</option>
                            {cities.length > 0 ? (
                                cities.map(e => (
                                    <option value={e} key={e}>{e}</option>
                                ))
                            ) : (
                                <option value="" disabled>No Cities to show</option>
                            )}
                        </select>
                        <select name="service" id="service" onChange={handleSelectChange} value={selectedService}>
                            <option value="" disabled>Select a service</option>
                            {services.length > 0 ? (
                                services.map(e => (
                                    <option value={e} key={e}>{e}</option>
                                ))
                            ) : (
                                <option value="" disabled>No Services to show</option>
                            )}
                        </select>
                        <button className='custom-button'>Show salons</button>
                    </form>
                </div>
                <div className="home-heading-image-container">
                    <img src='./image.png' />
                </div>
            </div>
            <div className="home-information-container">
                <div className="home-information-card1-container">
                    <img src="./image.png" />
                    <span></span>
                    <p></p>
                </div>
                <div className="home-information-card2-container">
                    <img src="./image.png" />
                    <span>{appointmentsCount}</span>
                    <p>Appointments Booked</p>
                </div>
                <div className="home-information-card3-container">
                    <img src="./image.png" />
                    <span>{salons.length}</span>
                    <p>Salons available</p>
                </div>
            </div>
            <div className="home-gallery-container">
                <div>
                    <h2>Explore our grooming salons</h2>
                    <h4>When fur needs a little love and a pair of scissors.</h4>
                </div>
                {salons.length > 0 ? (
                    <div className="salon-cards">
                        {visibleSalons.map(e => (
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