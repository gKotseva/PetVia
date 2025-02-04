import "./Modal.modules.css";

export function Modal({ children, onClose }) {
    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content">
                <p className="modal-close" onClick={onClose}>
                    ✖
                </p>
                {children}
            </div>
        </div>
    );
}
