import "./Calendar.modules.css";

import { useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";



export function Calendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [visibleMonth, setVisibleMonth] = useState(currentMonth);

    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const prevMonth = () => {
        setVisibleMonth((prev) => (prev === 0 ? 11 : prev - 1));
    };

    const nextMonth = () => {
        setVisibleMonth((prev) => (prev === 11 ? 0 : prev + 1));
    };

    return (
        <div className="calendar-container">
            <div className="calendar-heading">
                <button onClick={prevMonth} className="calendar-button"><IoArrowBackCircleSharp color="#f31559"/></button>
                <span className="calendar-header">{months[visibleMonth]} {currentYear}</span>
                <button onClick={nextMonth} className="calendar-button"><IoArrowForwardCircle color="#f31559"/></button>
            </div>
            <div className="calendar-month">
                <h3 className="calendar-title">{months[visibleMonth]}</h3>
                <div className="calendar-grid">
                    {[...Array(getDaysInMonth(currentYear, visibleMonth))].map((_, day) => {
                        const date = new Date(currentYear, visibleMonth, day + 1);
                        const isPast = date < today.setHours(0, 0, 0, 0);
                        const isToday = date.toDateString() === today.toDateString();

                        return (
                            <div
                                key={day}
                                className={`calendar-day ${isToday ? "today" : ""} ${isPast ? "past" : ""}`}
                            >
                                {day + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
