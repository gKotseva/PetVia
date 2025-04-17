import { useEffect, useState } from 'react';
import './Home.modules.css';

import { MdLocationPin } from "react-icons/md";
import { fetchServicesPerDetails, getAllAppointmentsCount, getAllSalons } from '../../handlers/sharedHandlers';
import { useNavigate } from 'react-router-dom';

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

    return (
        <div className="home-container">
            <div className="home-section-1">
                <h3>Book an appointment for a fluffy refresh</h3>
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
            <div className="home-section-2">
                <div className="div">
                    <img src="./image.png" alt="Booking" />
                    <h3>Book an appointment online, anytime, free of charge!</h3>
                </div>
                <div className="div">
                    <img src="./image.png" alt="Appointments" />
                    <h3>{appointmentsCount} appointments booked through PetVia!</h3>
                </div>
                <div className="div">
                    <img src="./image.png" alt="Grooming salons" />
                    <h3>{salons.length} grooming salons!</h3>
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