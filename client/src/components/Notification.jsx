import './Notification.modules.css'

export function Notification ({message, type}) {
    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
    )
}