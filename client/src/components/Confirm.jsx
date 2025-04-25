import './Confirm.modules.css'

export function Confirm ({title, text, onConfirm, onDeny }) {
    return (
        <div className="confirm-container">
            <div className="confirm-heading"></div>
            <div className="confirm-body">
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
            <div className="confirm-buttons">
                <button className='confirm-deny' onClick={onDeny}>Deny</button>
                <button className='confirm-button custom-button' onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    )
}