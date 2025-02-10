import './Home.modules.css';

export function Home() {
    return (
        <div className="home-container">
            <div className="home-section-1">
                <div className='home-form-container'>
                    <h3>Book an appointment for a fluffy refresh</h3>
                    <form>
                        <select name="location" id="location">
                            <option value="" disabled selected hidden>Select a city</option>
                            <option value="sofia">Sofia</option>
                            <option value="varna">Varna</option>
                            <option value="burgas">Burgas</option>
                            <option value="plovdiv">Plovdiv</option>
                        </select>
                        <select name="service" id="service">
                            <option value="" disabled selected hidden>Select a service</option>
                            <option value="paws">Paw Cleaning</option>
                            <option value="fullGrooming">Full Grooming</option>
                            <option value="bath">Bathing</option>
                            <option value="brushing">Brushing</option>
                        </select>
                        <select name="dateAndTime" id="dateAndTime">
                            <option value="" disabled selected hidden>Select a date and time</option>
                            <option value="today">Today</option>
                            <option value="tomorrow">Tomorrow</option>
                            <option value="other">Other day</option>
                        </select>
                        <button className='custom-button'>Show salons</button>
                    </form>
                </div>
            </div>
            <div className="home-section-2">
                <div className="div">
                    <img src="./booking.png" alt="Booking"/>
                    <h3>Book an appointment online, anytime, free of charge!</h3>
                </div>
                <div className="div">
                    <img src="./book.png" alt="Appointments"/>
                    <h3>1 appointment booked through PetVia!</h3>
                </div>
                <div className="div">
                    <img src="./grooming.png" alt="Grooming salons"/>
                    <h3>12 grooming salons!</h3>
                </div>
            </div>
            <div className="home-section-3">
                <div>
                    <h2>Explore our grooming salons</h2>
                    <h4>When fur needs a little love and a pair of scissors.</h4>
                </div>
            </div>
        </div>
    );
}
