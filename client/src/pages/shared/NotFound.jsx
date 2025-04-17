import './NotFound.modules.css'

import { useNavigate } from 'react-router-dom'

export function NotFound () {
    const navigate = useNavigate()

    return (
        <div className="not-found">
            <img src="./404.png" style={{width:'100%'}} />
            <button className='custom-button not-found-button' onClick={() => navigate('/')}>Back to home</button>
        </div>
    )
}