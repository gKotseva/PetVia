import './Notification.modules.css'

export function Notification ({type, message}) {
    return (
        <div className={`notification ${type}`}>
            <p>{message}</p>
        </div>
    )
}