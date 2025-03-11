import "./SalonCalendar.modules.css";

import { useEffect, useState } from "react";
import { IoArrowForwardCircle } from "react-icons/io5";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { getBookings, getSchedule } from "../../handlers/salonHandlers";
import { today, getFullMonth, checkSalonAvailability, checkDateStatus, formatDate } from "../../utils/calendar";

export function SalonCalendar({ serviceId, salonId }) {
    const [visibleMonth, setVisibleMonth] = useState(today.getMonth());
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);
    const [salonSchedule, setSalonSchedule] = useState([])

    useEffect(() => {
        const fetchSchedule = async () => {
            const bookingsResult = await getBookings(salonId);
            const scheduleResult = await getSchedule(salonId);

            const salonAvailability = checkSalonAvailability(scheduleResult, bookingsResult)
            setSalonSchedule(salonAvailability)
        };
        fetchSchedule();
    }, []);

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
                            const result = checkDateStatus(date, salonSchedule);

                            const conditionalClasses = `calendar-day ${result.join(' ')}`;
                            return (
                                <div
                                    key={day}
                                    className={`calendar-day ${conditionalClasses}`}
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
                                {salonSchedule[formatDate(selectedDate)].slots.map(e => (
                                    <div className={`slot-${e.status}`} key={e.slot}>
                                        <h5>{e.slot}</h5>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
