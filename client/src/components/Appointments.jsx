import './Appointments.modules.css'

import { useEffect, useState } from "react"
import { getSlots } from "../handlers/sharedHandlers"

export function Appointments({ user_type, id, service_duration, selected_date }) {
    const [slots, setSlots] = useState([])

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await getSlots(user_type, id, service_duration, selected_date)
            if (response.data) {
                setSlots(response.data)
            } else {
                console.log(response)
            }
        }
        fetchSchedule()
    }, [])

    return (
        <>
            <div className="appointments-container">
                {user_type === 'customer' ? (<h3>Please select your slot:</h3>) : null}
                <div className="appointments">
                    {slots.length > 0 ? (
                        slots.map(e => (
                            <div className={`appointment appointment-${e.status}`} key={e.slot}>
                                <h4>{e.slot}</h4>
                            </div>
                        ))
                    ) : (
                        <h1>Nothing to show!</h1>
                    )}
                </div>
            </div>
        </>
    )
}