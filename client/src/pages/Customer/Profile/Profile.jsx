import { useState } from 'react'
import './Profile.modules.css'

export function Profile () {
    const [outstanding, setOutstanding] = useState([])
    const [past, setPast] = useState([])

    return (
        <div className="customer-profile-container">
            <div className="customer-update-info"></div>
            <div className="customer-outstanding-appointments">
                {outstanding.length > 0 ? (
                    <h2>Предстоящи часове</h2>
                ) : (
                    <h2>Нямате предстоящи часове!</h2>
                )}
            </div>
            <div className="customer-past-appointments">
                {past.length > 0 ? (
                    <h2>Минали часове</h2>
                ) : (
                    <h2>Нямате минали часове!</h2>
                )}
            </div>
        </div>
    )
}