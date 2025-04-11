import './Appointments.modules.css'

import { useEffect, useState } from "react"
import { getSlots } from "../handlers/sharedHandlers"

export function Appointments({ user_type, id, service_duration, selected_date }) {
    const [slots, setSlots] = useState([])

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await getSlots(user_type, id, service_duration, selected_date)
            setSlots(response.data)
        }
        fetchSchedule()
    }, [])

    return (
        <>
            <div className="appointments-container">
                <h3>Please select your slot:</h3>
                <div className="appointments">
                    {slots.map(e => (
                        <div className={`appointment appointment-${e.status}`} key={e.slot}>
                            <h4>{e.slot}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}