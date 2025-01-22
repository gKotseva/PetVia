import './Navigation.modules.css'

export function Navigation () {
    return (
        <div className="navigation-container">
            <div className="navigation-logo-container">
                <img src="./logo.png"/>
            </div>
            <div className="navigation-links-container">
                <ul>
                    <li>Влизане</li>
                    <li>Регистриране</li>
                    <li>Излез</li>
                </ul>
            </div>
        </div>
    )
}