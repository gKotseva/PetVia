import './Calendar.modules.css';

import { useEffect, useState } from 'react';
import { formatDate, getDayName, getWeekDays } from '../utils/date';
import { bookAppointment, getSchedule } from '../handlers/calendarHandlers';
import { useNotification } from '../context/NotificationContext';
import { Modal } from './Modal';
import { Confirm } from './Confirm';

export function Calendar ({userType, salonId, customerId, serviceDuration, service, registeredUser}) {
  const [schedule, setSchedule] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { showNotification } = useNotification()

  const fetchSchedule = async () => {
    const response = await getSchedule(userType, salonId, serviceDuration)
    setSchedule(response.data)
  }

  useEffect(() => {
    salonId && fetchSchedule();
  }, [userType, salonId, serviceDuration]);

  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

  const goToPreviousWeek = () => {
    setCurrentWeekIndex((prev) => prev - 1);
  };

  const goToNextWeek = () => {
    setCurrentWeekIndex((prev) => prev + 1);
  };

  const weekDays = getWeekDays(currentWeekIndex);

  return (
    <div className="calendar-container">
      <div className="calendar-heading">
        <p>Week of {formatDate(weekDays[0])}</p>
        <div className="calendar-buttons">
          <button onClick={(userType !== 'salon' && currentWeekIndex === 0) ? null : goToPreviousWeek}>{'<'}</button>
          <button onClick={goToNextWeek}>{'>'}</button>
        </div>
      </div>
      <div className="caledar-contents">
        {weekDays.map((date) => {
          const today = formatDate(new Date());
          const formattedDate = formatDate(date);
          const isPast = formattedDate < today;
          const isToday = formattedDate === today
          const hasSchedule = !!schedule[formattedDate];
          const isUnavailable = !hasSchedule;

          return (
            <div key={date} className={`calendar-day-card ${isToday ? 'today' : (isPast || isUnavailable) ? 'past' : ''}`}>
              <div className="calendar-day-heading">
                <p>{getDayName(date)}</p>
                <p>{formatDate(date)}</p>
                {userType === 'salon' ? (
                  <p>{schedule[formattedDate]?.working_hours || '- No schedule -'}</p>
                ) : null}
              </div>
              <div className="day-slots">
                {hasSchedule &&
                  schedule[formattedDate].slots.map((slot, index) => (
                    <div
                      key={index}
                      className={`slot ${userType} ${userType}-${slot.status}`}
                      onClick={() => {
                        if (slot.status === 'free' && !isPast) {
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

                      const response = await bookAppointment(customerId, salonId, service.service_id, selectedSlot.date, selectedSlot.slot.slot)
                      showNotification(response.message, 'success')
                      fetchSchedule()
                      setShowModal(false);
                    }}
                    onDeny={() => setShowModal(false)}
                  />
                </Modal>
              )}
            </div>
          )
        })}
      </div>
    </div>
  );
}
