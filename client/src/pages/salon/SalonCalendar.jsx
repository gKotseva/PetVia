import "./SalonCalendar.modules.css";

import { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getBookings, getSchedule } from "../../handlers/salonHandlers";
import { isPastDate, months, today } from "../../utils/calendar";

export function SalonCalendar() {
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const [visibleMonth, setVisibleMonth] = useState(currentMonth);
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [dayBookings, setDayBookings] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [schedule, setSchedule] = useState(null);

    useEffect(() => {
        const fetchSchedule = async () => {
            const bookings = await getBookings(1);
            const schedule = await getSchedule(1);

            setBookings(bookings);
            setSchedule(schedule);
        };
        fetchSchedule();
    }, []);

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const prevMonth = () => {
        setVisibleMonth((prev) => (prev === 0 ? 11 : prev - 1));
    };
    
    const nextMonth = () => {
        setVisibleMonth((prev) => (prev === 11 ? 0 : prev + 1));
    };
    
    const showSchedule = (day, monthIndex, monthName, year) => {
        setSelectedDate({ day, month: monthName, year });
        const selectedDate = new Date(year, monthIndex, day);
        setIsScheduleVisible(true);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-days">
                <div className="calendar-heading">
                    <button onClick={prevMonth} className="calendar-button">
                        <IoArrowBackCircleSharp />
                    </button>
                    <span className="calendar-header">{months[visibleMonth]} {currentYear}</span>
                    <button onClick={nextMonth} className="calendar-button">
                        <IoArrowForwardCircle />
                    </button>
                </div>
                <div className="calendar-month">
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
                                    onClick={() => showSchedule(day + 1, visibleMonth, months[visibleMonth], currentYear)}
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
                            <div className="available-hours">
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
