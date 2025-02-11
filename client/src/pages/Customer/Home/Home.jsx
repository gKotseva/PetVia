import { useEffect, useState } from 'react';
import './Home.modules.css';
import { getAllCities, getAllStates } from '../../../handlers/salonHandler';

export function Home() {
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        const getStates = async () => {
            const result = await getAllStates()
            setStates(result)
        }
        getStates()

    }, [])

    const onChange = async (e) => {
        const result = await getAllCities(e.target.value)
        setCities(result)
    }

    return (
        <div className="home-container">
            <div className="home-section-1">
                <div className='home-form-container'>
                    <h3>Book an appointment for a fluffy refresh</h3>
                    <form>
                        <select name="state" id="state" onChange={onChange}>
                            <option value="" disabled selected>Select a state</option>
                            {states.map(e => (
                                <option value={e.state}>{e.state}</option>
                            ))}
                        </select>
                        <select name="city" id="city">
                            <option value="" disabled selected>Select a city</option>
                            {cities.map(e => (
                                <option value={e.city}>{e.city}</option>
                            ))}
                        </select>
                        <select name="service" id="service">
                            <option value="" disabled selected hidden>Select a service</option>
                            <option value="paws">Paw Cleaning</option>
                            <option value="fullGrooming">Full Grooming</option>
                            <option value="bath">Bathing</option>
                            <option value="brushing">Brushing</option>
                        </select>
                        <select name="dateAndTime" id="dateAndTime">
                            <option value="" disabled selected hidden>Select a date and time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="other">Other day</option>
                        </select>
                        <button className='custom-button'>Show salons</button>
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
