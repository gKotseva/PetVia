import './SalonAdmin.modules.css'

import { useState, useEffect, useContext } from "react";
import { DateContext } from "../../../../context/DateContext";
import { Loading } from "../../../../components/Loading";

export function SalonAdmin() {
    const { datesOfTheMonth } = useContext(DateContext) || { datesOfTheMonth: [] };
    const [workingHours, setWorkingHours] = useState([
        { day: "Monday", open: "09:00", close: "18:00", isOpen: true },
        { day: "Tuesday", open: "09:00", close: "18:00", isOpen: true },
        { day: "Wednesday", open: "09:00", close: "18:00", isOpen: true },
        { day: "Thursday", open: "09:00", close: "18:00", isOpen: true },
        { day: "Friday", open: "09:00", close: "18:00", isOpen: true },
        { day: "Saturday", open: "10:00", close: "16:00", isOpen: true },
        { day: "Sunday", open: "Closed", close: "Closed", isOpen: false },
    ]);

    const updateWorkingHours = (index, field, value) => {
        const updatedHours = [...workingHours];
        updatedHours[index][field] = value;
        setWorkingHours(updatedHours);
    };

    return (
        <div className="salon-settings-container">
            <div className="information">
                <form>
                    <h2>Edit your information</h2>
                    <label>Salon Name</label>
                    <input></input>
                    <label>Address</label>
                    <input></input>
                    <label>Description</label>
                    <input></input>
                    <button className='custom-button'>Edit</button>
                </form>
            </div>
            <div className="working-hours">
                <div className="manage-working-hours">
                <h2>Manage Working Hours</h2>
                {workingHours.map((day, index) => (
                    <div key={index} className="day-setting">
                        <label>{day.day}</label>
                        <input
                            type="time"
                            value={day.open}
                            disabled={!day.isOpen}
                            onChange={(e) => updateWorkingHours(index, "open", e.target.value)}
                        />
                        <input
                            type="time"
                            value={day.close}
                            disabled={!day.isOpen}
                            onChange={(e) => updateWorkingHours(index, "close", e.target.value)}
                        />
                        <input
                            type="checkbox"
                            checked={day.isOpen}
                            onChange={(e) => updateWorkingHours(index, "isOpen", e.target.checked)}
                        />
                        <label>Open</label>
                    </div>
                ))}
                </div>
                <div className="manage-working-days">
                    {datesOfTheMonth.map(e => (
                        <h5>{e}</h5>
                    ))}

                </div>
            </div>
            <div className="images"></div>
            <div className="edit-services">
            <h2>Your services</h2>
            <div className="services-forms">
            <form>
                    <h2>Add service</h2>
                    <label>Name</label>
                    <input></input>
                    <label>Durration</label>
                    <input></input>
                    <label>Price</label>
                    <input></input>
                    <button className='custom-button'>Sumbit</button>
                </form>
                <form>
                    <h2>Current services</h2>
                    <div className="edit-service">
                        <h3>Full Groom</h3>
                        <h3>Price</h3>
                        <h3>Durration</h3>
                        <button className='edit-button'>Edit</button>
                        <button className='delete-button'>Delete</button>
                    </div>
                </form>
            </div>
            </div>
            <div className="team">
                <h2>Your team</h2>
                <div className="team-forms">
                <form>
                    <h2>Add team members</h2>
                    <label>Name</label>
                    <input></input>
                    <label>Name</label>
                    <input></input>
                    <label>Name</label>
                    <input></input>
                    <button className='custom-button'>Sumbit</button>
                </form>
                <form>
                    <h2>Current team members</h2>
                    <div className="member">
                        <h3>Jason</h3>
                        <img />
                        <button className='delete-button'>Delete</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}
