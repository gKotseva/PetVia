import './Home.modules.css';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchServicesPerDetails, getAllCounts, getAllSalons } from '../../handlers/sharedHandlers';
import { MdLocationPin } from "react-icons/md";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { HiScissors } from "react-icons/hi2";
import { MdPeople } from "react-icons/md";

export function Home() {
    const navigate = useNavigate()
    const [salons, setSalons] = useState([])
    const [counts, setCounts] = useState({})
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
            const response = await getAllCounts()
            setCounts(response)
        }
        fetchAllAppointmentsCount()
    }, [])

    useEffect(() => {
            if (salons.length > 0) {
                const states = [...new Set(salons.map(salon => salon.state))].sort()
                setStates(states)
            }

            if (salons.length < 2) return;
        
            const gallery = setInterval(() => {
                setGalleryIndex(prev => (prev + 1) % salons.length);
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
            setServices(response.data.map(e => e.name))
        } else if (name === "service") {
            setSelectedService(value);
        }
    };

    const showSalons = (e) => {
        e.preventDefault();
        navigate('/salons', { state: { selectedCity, selectedState, selectedService } });
    };

    const maxVisible = Math.min(5, salons.length);
    const end = galleryIndex + maxVisible;
    
    const visibleSalons =
        end <= salons.length
            ? salons.slice(galleryIndex, end)
            : [...salons.slice(galleryIndex), ...salons.slice(0, end - salons.length)];
    
    return (
        <div className="home-container">
            <div className="home-heading-container">
                <div className="home-heading-form-container">
                    <h5>Book your appointment today <br /> and give your pet the grooming they <br /> <span>deserve!</span></h5>
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
            </div>
            <div className="home-information-container">
                <div className="home-information-card1-container">
                <MdPeople />
                    <span>{counts.customers}</span>
                    <p>Customers</p>
                </div>
                <div className="home-information-card2-container">
                <BsCalendar2CheckFill />
                    <span>{counts.appointments}</span>
                    <p>Appointments Booked</p>
                </div>
                <div className="home-information-card3-container">
                <HiScissors />
                    <span>{counts.salons}</span>
                    <p>Salons</p>
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
                            <div className="salon-card" key={e.salon_id} style={{ backgroundImage: (e.image ? `url(./images/${e.image})` : `url('./image.png')`)}}>
                                <div className="salon-card-information">
                                <h3>{e.name}</h3>
                                <h4><MdLocationPin /> {e.state}</h4>
                                <p>{e.city}, {e.address}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="no-salons">
                        <p>No salons to show!</p>
                    </div>
                )}
            </div>
        </div>
    )
}