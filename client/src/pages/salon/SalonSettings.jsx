import './SalonSettings.modules.css'

export function SalonSettings() {
    return (
        <div className="salon-settings-container">
            <div className="details-settings">
                <h1>Your salon details:</h1>
                <form>
                    <label>Salon Name</label>
                    <input></input>
                    <label>Salon Address</label>
                    <input></input>
                </form>
            </div>
            <div className="services-settings">
                <div className="current-salon-services">
                    <div className="salon-services-list">
                        <h1>Your services details:</h1>
                        <div className="details">
                            <h2>Example</h2>
                            <h2>price</h2>
                            <h2>durration</h2>
                        </div>
                        <div className="buttons">
                            <button>Delete</button>
                            <button>Edit</button>
                        </div>
                    </div>
                </div>
                <div className="add-new-service">
                <h1>Add new service:</h1>
                    <form>
                        <label>Name</label>
                        <input></input>
                        <label>Price</label>
                        <input></input>
                        <label>Durration</label>
                        <input></input>
                    </form>
                </div>
            </div>
            <div className="team-settings">
                <div className="current-salon-team">
                <h1>Your team:</h1>
                    <div className="salon-team-list">
                        <h2>Example</h2>
                    </div>
                    <div className="buttons">
                            <button>Delete</button>
                            <button>Edit</button>
                    </div>
                </div>
                <div className="add-new-team-member">
                <h1>Add new team member:</h1>
                    <form>
                        <label>Name</label>
                        <input></input>
                        <label>Image</label>
                        <input></input>
                    </form>
                </div>
            </div>
            <div className="gallery-settings"></div>
        </div>
    )
}