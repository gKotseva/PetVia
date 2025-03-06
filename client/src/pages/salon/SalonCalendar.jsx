import "./SalonCalendar.modules.css";

import { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getBookings, getSchedule, getSigleServiceInfo } from "../../handlers/salonHandlers";
import { checkAvailableSlots, checkDateStatus, dayScheduleBookings, formatDate, getFullMonth, today } from "../../utils/calendar";

export function SalonCalendar({ serviceId, salonId }) {
    const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
    const [dayBookings, setDayBookings] = useState({});
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedService, setSelectedService] = useState({})
    const [availableDates, setAvailableDates] = useState({})


    useEffect(() => {
        const fetchSchedule = async () => {
            const fetchBookings = await getBookings(salonId);
            const fetchSchedule = await getSchedule(salonId);
            const fetchServiceInfo = await getSigleServiceInfo(serviceId, salonId)

            const bookings = dayScheduleBookings(fetchSchedule, fetchBookings)
            setDayBookings(bookings)
            setSelectedService(fetchServiceInfo[0])
        };
        fetchSchedule();
    }, []);

    useEffect(() => {
        if (dayBookings && selectedDate) {
            const isAvailable = checkAvailableSlots(dayBookings, selectedService, selectedDate);
            setAvailableDates(isAvailable)
        }
    }, [selectedDate, dayBookings, selectedService]);

    const prevMonth = () => {
        setVisibleMonth((prev) => (prev === 0 ? 11 : prev - 1));
    };

    const nextMonth = () => {
        setVisibleMonth((prev) => (prev === 11 ? 0 : prev + 1));
    };

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const showSchedule = (date) => {
        setSelectedDate(date)
        setIsScheduleVisible(true);
    };

    return (
        <div className="calendar-container">
            <div className="calendar-days">
                <div className="calendar-heading">
                    <button onClick={prevMonth} className="calendar-button">
                        <IoArrowBackCircleSharp />
                    </button>
                    <span className="calendar-header">{getFullMonth(visibleMonth)} {today.getFullYear()}</span>
                    <button onClick={nextMonth} className="calendar-button">
                        <IoArrowForwardCircle />
                    </button>
                </div>
                <div className="calendar-month">
                    <div className="calendar-grid">
                        {[...Array(getDaysInMonth(today.getFullYear(), visibleMonth))].map((_, day) => {
                            const date = new Date(today.getFullYear(), visibleMonth, day + 1);
                            const formattedDate = formatDate(date)
                            const dateStatus = checkDateStatus(date, selectedDate)
                            const isDateInBookings = formattedDate in dayBookings;
                            const secondClass = availableDates[formattedDate] ? "available" : "booked"
                            const additionalClass = dateStatus.isSelected
                                ? "selected"
                                : dateStatus.isToday
                                    ? "today"
                                    : dateStatus.isPast || !isDateInBookings
                                        ? "past"
                                        : "";

                            return (
                                <div
                                    key={day}
                                    className={`calendar-day ${additionalClass} ${secondClass}`}
                                    onClick={() => showSchedule(new Date(today.getFullYear(), visibleMonth, day + 1))}
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
                        <span className="calendar-header">{selectedDate.getDate()} {getFullMonth(selectedDate.getMonth())}</span>
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
