import "./Calendar.modules.css";

import { useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export function Calendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [visibleMonth, setVisibleMonth] = useState(currentMonth);
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedHour, setSelectedHour] = useState(null);
    const [startHour, setStartHour] = useState(9)
    const [endHour, setEndHour] = useState(18)

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

    const showSchedule = (day, month, year) => {
        setSelectedDate({ day, month, year });
        setIsScheduleVisible(true);
        setSelectedHour(null);
    };

    const isPastDate = (date) => {
        const todayCopy = new Date(today);
        todayCopy.setHours(0, 0, 0, 0);
        return date < todayCopy;
    };

    const availableHours = (day) => {
        const hours = [];
        for (let i = startHour; i < endHour; i++) {
            const hour = i;
            hours.push(hour);
        }
        return hours;
    };

    const handleHourSelect = (hour) => {
        setSelectedHour(hour);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-days">
            <div className="calendar-heading">
                <button onClick={prevMonth} className="calendar-button">
                    <IoArrowBackCircleSharp color="#f31559" />
                </button>
                <span className="calendar-header">{months[visibleMonth]} {currentYear}</span>
                <button onClick={nextMonth} className="calendar-button">
                    <IoArrowForwardCircle color="#f31559" />
                </button>
            </div>
            <div className="calendar-month">
                <h3 className="calendar-title">{months[visibleMonth]}</h3>
                <div className="calendar-grid">
                    {[...Array(getDaysInMonth(currentYear, visibleMonth))].map((_, day) => {
                        const date = new Date(currentYear, visibleMonth, day + 1);
                        const isPast = isPastDate(date);
                        const isToday = date.toDateString() === today.toDateString();
                        const isSelected = selectedDate && selectedDate.day === day + 1;

                        return (
                            <div
                                key={day}
                                className={`calendar-day ${isToday ? "today" : ""} ${isPast ? "past" : ""} ${isSelected ? "selected" : ""}`}
                                onClick={() => showSchedule(day + 1, months[visibleMonth], currentYear)}
                            >
                                {day + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
            </div>
            <div className="calendar-hours">
            {isScheduleVisible && selectedDate && (
                <div className="hours-per-day">
                    <span className="calendar-header">{selectedDate.day} {selectedDate.month}</span>
                    <div className="schedule-hours">
                        {availableHours(selectedDate.day).map((hour, index) => (
                            <h4
                                key={index}
                                className={`hour-button ${selectedHour === hour ? "selected" : ""}`}
                            >
                                {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`} - {hour + 1 > 12 ? `${hour + 1 - 12}:00 PM` : `${hour + 1}:00 AM`}
                            </h4>
                        ))}
                    </div>
                </div>
            )}
            </div>
        </div>
    );
}
