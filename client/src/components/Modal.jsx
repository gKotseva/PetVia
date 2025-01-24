import "./Modal.modules.css";

export function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
}
