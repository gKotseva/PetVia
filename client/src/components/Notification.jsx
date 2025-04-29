import './Notification.modules.css'

export function Notification ({message, type, onClose}) {
    return (
        <div className={`notification ${type}`}>
            <div className="notification-header">
                <p>{type}</p>
                <span onClick={onClose}>x</span>
            </div>
            <div className='notification-text'>
                <p>{message}</p>
            </div>
        </div>
    )
}