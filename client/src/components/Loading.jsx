import './Loading.modules.css'

import { IoPaw } from "react-icons/io5";

export function Loading () {
    return (
        <div className="loading-container">
            <div className="spinner">
                <IoPaw color='#f31559' size='50px'/>
            </div>
            <p>Grooming the data ...</p>
        </div>
    );
}
