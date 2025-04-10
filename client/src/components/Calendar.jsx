import './Calendar.modules.css'

import { useEffect, useState } from 'react'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { getSchedule } from '../handlers/calendarHandlers';

export function Calendar({ user, onSelectDates, onShowAppointments }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const currentDate = new Date()
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())
    const [schedule, setSchedule] = useState([])
    const [selectedDates, setSelectedDates] = useState([])

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear(prevYear => currentMonth === 0 ? prevYear - 1 : prevYear)
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear(prevYear => currentMonth === 11 ? prevYear + 1 : prevYear)
    }

    useEffect(() => {
        const fetchSchedule = async () => {
            const response = await getSchedule(user.salonId, currentMonth + 1, currentYear);
            setSchedule(response.schedule)
        };

        fetchSchedule();
    }, [currentMonth, currentYear])

    const handleScheduleClick = (day) => {
        if (!day.isPast) {
            setSelectedDates(prev => {
                const exists = prev.includes(day.date);
                if (exists) {
                    return prev.filter(d => d !== day.date);
                } else {
                    return [...prev, day.date];
                }
            });
        }
    }

    useEffect(() => {
        if (onSelectDates) {
            onSelectDates(selectedDates);
        }
    }, [selectedDates]);

    const handleUserClick = (day) => {
        if (!day.isWorking || day.isPast) {
            return
        } else {
            if (onShowAppointments) {
                onShowAppointments(day.date)
            }
        }
    }

    return (
        <div className='calendar-container'>
            <div className="calendar">
                <div className="calendar-header">
                    <h2>{months[currentMonth]}, {currentYear}</h2>
                    <div className="calendar-buttons">
                        <IoIosArrowBack onClick={prevMonth} />
                        <IoIosArrowForward onClick={nextMonth} />
                    </div>
                </div>
                <div className="calendar-heading">
                    {weekdays.map(e => (
                        <span key={e}>{e}</span>
                    ))}
                </div>
                <div className="calendar-days">
                    {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                        <span key={index} />
                    ))}
                    {schedule?.map(e => (
                        <span key={e.date} 
                            className={`user-${e.isPast ? 'past' : ''}${e.isToday ? 'today' : ''}${e.isFuture ? e.isWorking ? 'working' : 'not-working' : ''} ${selectedDates.includes(e.date) ? 'selected' : ''}`} 
                            onClick={
                                user.calendarType === 'schedule'
                                  ? () => handleScheduleClick(e)
                                  : user.userType === 'customer'
                                  ? () => handleUserClick(e)
                                  : null
                              }>{new Date(e.date).getDate()}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}