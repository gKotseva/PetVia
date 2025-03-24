import './Calendar.modules.css'

import { useState } from 'react'

import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export function Calendar () {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const currentDate = new Date()
    const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth())
    const [currentYear, setCurrentYear] = useState(currentDate.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const prevMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1))
        setCurrentYear(prevYear => currentMonth === 0 ? prevYear - 1 : prevYear)
    }

    const nextMonth = () => {
        setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1))
        setCurrentYear(prevYear => currentMonth === 11 ? prevYear + 1 : prevYear)
    }

    
    return (
        <div className="calendar">
            <div className="calendar-header">
                <h2>{months[currentMonth]}, {currentYear}</h2>
                <div className="calendar-buttons">
                    <IoIosArrowBack onClick={prevMonth} />
                    <IoIosArrowForward onClick={nextMonth}/>
                </div>
            </div>
            <div className="calendar-heading">
                {weekdays.map(e => (
                    <span>{e}</span>
                ))}
            </div>
            <div className="calendar-days">
                {[...Array(firstDayOfMonth).keys()].map((_, index) => (
                    <span />
                ))}
                {[...Array(daysInMonth).keys()].map((day) => {
                    let className = day + 1 === currentDate.getDate() && currentMonth === currentDate.getMonth() && currentYear === currentDate.getFullYear() ? 'current-day' : '';

                    return (
                    <span className={className}>{day + 1}</span>
                    )
                })}
            </div>
        </div>
    )
}