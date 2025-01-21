import './Home.modules.css'

export function Home() {
    return (
        <div className="home-container">
            <div className="home-section-1">
                <div className='home-form-container'>
                    <h3>Запази час за пухкаво обновление</h3>
                    <form>
                    <select name="location" id="location">
                        <option value="" disabled selected hidden>Изберете град</option>
                            <option value="sofia">София</option>
                            <option value="varna">Варна</option>
                            <option value="burgas">Бургас</option>
                            <option value="plovdiv">Пловдив</option>
                        </select>
                        <select name="service" id="service">
                        <option value="" disabled selected hidden>Изберете услуга</option>
                            <option value="paws">Почистване лапи</option>
                            <option value="fullGrooming">Цялостен грууминг</option>
                            <option value="bath">Къпане</option>
                            <option value="brushing">Ресане</option>
                        </select>
                        <select name="dateAndTime" id="dateAndTime">
                        <option value="" disabled selected hidden>Изберете ден и час</option>
                            <option value="today">Днес</option>
                            <option value="tomorrow">Утре</option>
                            <option value="other">Друг ден</option>
                        </select>
                        <button>Покажи салоните</button>
                    </form>
                </div>
            </div>
            <div className="home-section-2">
                <div className="div">
                    <img src="./booking.png" />
                    <h3>Записваш час онлайн, по всяко време, без такса!</h3>
                </div>
                <div className="div">
                    <img src="./book.png" />
                    <h3>1 запазени часа през ПетВиа!</h3>
                </div>
                <div className="div">
                    <img src="./grooming.png" />
                    <h3>12 грууминг салона!</h3>
                </div>
            </div>
            <div className="home-section-3">
                <div>
                    <h2>Разгледай нашите грууминг салони</h2>
                    <h4>Когато козината има нужда от малко любов и ножица.</h4>
                </div>
            </div>
        </div>
    )
}