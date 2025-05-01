import './Calendar.modules.css'

import { useEffect, useState } from "react"
import { bookAppointment, getSchedule } from "../handlers/calendarHandlers"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { formatDate, getDayName, getWeekDays } from "../utils/date";
import { Modal } from './Modal';
import { Confirm } from './Confirm';
import { useNotification } from '../context/NotificationContext';


export function Calendar({ userType, salon_id, customer_id, service_duration, service, registeredUser }) {
    const [schedule, setSchedule] = useState([])
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const { showNotification } = useNotification()

    const fetchSchedule = async () => {
        const response = await getSchedule(userType, salon_id, service_duration)
        setSchedule(response.data)
    }

    useEffect(() => {
        salon_id && fetchSchedule();
    }, [userType, salon_id, service_duration]);

    const goToPreviousWeek = () => {
        setCurrentWeekIndex((prev) => prev - 1);
    };

    const goToNextWeek = () => {
        setCurrentWeekIndex((prev) => prev + 1);
    };

    const weekDays = getWeekDays(currentWeekIndex);

    return (
        <div className="calendar-container">
            <div className="calendar-navigation">
                <h4 className="week-title">Week of {formatDate(weekDays[0])}</h4>
                <div className="navigation-buttons">
                    <IoIosArrowBack onClick={goToPreviousWeek} />
                    <IoIosArrowForward onClick={goToNextWeek} />
                </div>
            </div>
            <div className="calendar-grid">
                {weekDays.map((date) => {
                    const today = formatDate(new Date());
                    const formattedDate = formatDate(date);
                    const isPast = formattedDate < today;
                    const hasSchedule = !!schedule[formattedDate];
                    const isUnavailable = !hasSchedule;

                    return (
                        <div key={formattedDate} className={`day-card ${(isPast || isUnavailable) ? 'past' : ''}`}>
                            <div className="day-card-heading">
                                <p>{getDayName(date)}</p>
                                <p>{formattedDate}</p>
                                {userType === 'salon' ? (
                                    <p>{schedule[formattedDate]?.working_hours || '- No schedule -'}</p>
                                ) : null}
                            </div>

                            <div className="day-card-slots">
                                {hasSchedule &&
                                    schedule[formattedDate].slots.map((slot, index) => (
                                        <div
                                            key={index}
                                            className={`slot ${userType} ${userType}-${slot.status}`}
                                            onClick={() => {
                                                if (slot.status === 'free') {
                                                    setSelectedSlot({ date: formattedDate, slot });
                                                    setShowModal(true);
                                                }
                                            }}
                                        > 
                                        {slot.slot}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    );
                })}
                {showModal && selectedSlot && userType === 'customer' && (
                    <Modal onClose={() => setShowModal(false)}>
                        <Confirm
                            title="Confirm appointment reservation"
                            text={
                                <>
                                    Are you sure you would like to book an appointment at <strong>{selectedSlot.slot.slot}</strong> on <strong>{selectedSlot.date}</strong> for "<strong>{service.name}</strong>"?
                                </>
                            }
                            onConfirm={async () => {
                                if (registeredUser === 'salon' || !registeredUser) {
                                    showNotification('Only customers can book appointments.', 'error')
                                    setShowModal(false)
                                    return;
                                }

                                const response = await bookAppointment(customer_id, salon_id, service.service_id, selectedSlot.date, selectedSlot.slot.slot)
                                showNotification(response.message, 'success')
                                fetchSchedule()
                                setShowModal(false);
                            }}
                            onDeny={() => setShowModal(false)}
                        />
                    </Modal>
                )}
            </div>
        </div>
    )
}