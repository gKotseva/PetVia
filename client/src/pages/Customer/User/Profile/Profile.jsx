import { useState } from 'react'
import './Profile.modules.css'

export function Profile() {
    const [outstanding, setOutstanding] = useState([
        { img: "booking.png", placeName: "Test1", date: "01/02/2025", hour: "10:00" },
        { img: "booking.png", placeName: "Test2", date: "02/02/2025", hour: "11:30" },
        { img: "booking.png", placeName: "Test3", date: "03/02/2025", hour: "14:45" },
        { img: "booking.png", placeName: "Test4", date: "04/02/2025", hour: "16:00" },
        { img: "booking.png", placeName: "Test5", date: "05/02/2025", hour: "18:15" },
        { img: "booking.png", placeName: "Test6", date: "06/02/2025", hour: "20:30" },

    ])
    const [past, setPast] = useState([
        { img: "booking.png", placeName: "Test1", date: "01/02/2025", hour: "10:00" },
        { img: "booking.png", placeName: "Test2", date: "02/02/2025", hour: "11:30" },
        { img: "booking.png", placeName: "Test3", date: "03/02/2025", hour: "14:45" },
        { img: "booking.png", placeName: "Test4", date: "04/02/2025", hour: "16:00" },
        { img: "booking.png", placeName: "Test5", date: "05/02/2025", hour: "18:15" },
        { img: "booking.png", placeName: "Test6", date: "06/02/2025", hour: "20:30" },
    ])

    return (
        <div className="customer-profile-container">
            <div className="customer-update-info">
                <h2>Моята информация</h2>
                <form>
                    <label>Име</label>
                    <input type='text'></input>
                    <label>Имейл</label>
                    <input type='email'></input>
                    <label>Мобилен телефон</label>
                    <input type='text'></input>
                    <label>Парола</label>
                    <input type='password'></input>
                    <button>Запази</button>
                </form>
                <button className='delete-button'>Изтриване на профил</button>
            </div>
            <div className="customer-outstanding-appointments">
                {outstanding.length > 0 ? (
                    <div className='places-container'>
                        <h2>Предстоящи часове</h2>
                            {outstanding.map(e => (
                                <div className='place-details'>
                                    <img src={e.img} alt={e.placeName} />
                                    <h3>{e.placeName}</h3>
                                    <h4>{e.date}</h4>
                                    <h4>{e.hour}</h4>
                                </div>
                            ))}
                    </div>
                ) : (
                    <h2>Нямате предстоящи часове!</h2>
                )}
            </div>
            <div className="customer-past-appointments">
                {past.length > 0 ? (
                    <div className='places-container'>
                    <h2>Минали часове</h2>
                        {past.map(e => (
                            <div className='place-details'>
                                <img src={e.img} alt={e.placeName} />
                                <h3>{e.placeName}</h3>
                                <h4>{e.date}</h4>
                                <h4>{e.hour}</h4>
                            </div>
                        ))}
                    </div>
                ) : (
                    <h2>Нямате минали часове!</h2>
                )}
            </div>
        </div>
    )
}