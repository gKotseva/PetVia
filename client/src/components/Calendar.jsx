import './Calendar.modules.css';

import { useEffect, useState } from 'react';
import { formatDate, getDayName, getWeekDays } from '../utils/date';
import { bookAppointment, deleteSchedule, getSchedule } from '../handlers/calendarHandlers';
import { useNotification } from '../context/NotificationContext';
import { Modal } from './Modal';
import { Confirm } from './Confirm';
import { MdEditCalendar } from "react-icons/md";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { Form } from './Form';

export function Calendar({ userType, salonId, customerId, serviceDuration, service, registeredUser }) {
  const [schedule, setSchedule] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { showNotification } = useNotification()
  const [modalType, setModalType] = useState(null);

  const defaultTimeSlots = [
    '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00'
  ];

  const fetchSchedule = async () => {
    try {
      const response = await getSchedule(userType, salonId, serviceDuration);
      setSchedule(response.data || {});
    } catch (error) {
      setSchedule({});
    }
  };

  useEffect(() => {
    const effectiveServiceDuration = userType === 'customer' ? serviceDuration : null;
    if (salonId && (userType !== 'customer' || effectiveServiceDuration)) {
      fetchSchedule(salonId, effectiveServiceDuration);
    }
  }, [salonId, userType, serviceDuration]);


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
          const hasSchedule = Boolean(schedule[formattedDate]);
          const isUnavailable = !hasSchedule;

          const slots = hasSchedule
            ? schedule[formattedDate].slots
            : defaultTimeSlots.map((slot) => ({
              slot,
              status: 'unavailable'
            }));

          return (
            <div key={date} className={`calendar-day-card ${isToday ? 'today' : isPast ? 'past' : isUnavailable ? 'unavailable' : ''}`}>
              <div className="calendar-day-heading">
                <p>{getDayName(date)}</p>
                <p>{formatDate(date)}</p>
                {userType === 'salon' ? (
                  <>
                    <p>{schedule[formattedDate]?.working_hours || '- No schedule -'}</p>
                    <div className="calendar-edit-delete-buttons">
                      <MdEditCalendar
                        data-testid="edit-schedule-icon"
                        color={isPast ? 'gray' : 'green'}
                        style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
                        onClick={() => {
                          if (isPast) return;
                          setSelectedSlot({ date: formattedDate });
                          setModalType('edit');
                          setShowModal(true);
                        }}
                      />
                      <RiDeleteBack2Fill
                        data-testid="delete-schedule-icon"
                        color={isPast ? 'gray' : 'red'}
                        style={{ cursor: isPast ? 'not-allowed' : 'pointer' }}
                        onClick={() => {
                          if (isPast) return;
                          setSelectedSlot({ date: formattedDate });
                          setModalType('delete');
                          setShowModal(true);
                        }}
                      />
                    </div>
                  </>
                ) : null}
              </div>
              <div className="day-slots">
                {slots.map((slot, index) => (
                  <div
                    key={index}
                    className={`slot ${userType} ${userType}-${slot.status} ${slot.status === 'unavailable' ? 'disabled-slot' : ''}`}
                    onClick={() => {
                      if (slot.status === 'free' && !isPast) {
                        setSelectedSlot({ date: formattedDate, slot });
                        setModalType('book');
                        setShowModal(true);
                      }
                    }}
                  >
                    {slot.slot}
                  </div>
                ))}
              </div>
              {showModal && modalType === 'book' && selectedSlot && userType === 'customer' && (
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

                      try {
                        const response = await bookAppointment(customerId, salonId, service.service_id, selectedSlot.date, selectedSlot.slot.slot)
                        showNotification(response.message, 'success')
                        fetchSchedule()
                        setShowModal(false);
                      } catch (error) {
                        showNotification(error, 'error')
                        fetchSchedule()
                        setShowModal(false);
                      }
                    }}
                    onDeny={() => setShowModal(false)}
                  />
                </Modal>
              )}
              {showModal && modalType === 'delete' && selectedSlot && userType === 'salon' && (
                <Modal onClose={() => setShowModal(false)}>
                  <Confirm
                    title="Delete schedule"
                    text={
                      <>
                        Are you sure you would like to delete the schedule for <strong>{selectedSlot.date}</strong>?
                      </>
                    }
                    onConfirm={async () => {
                      await deleteSchedule(selectedSlot.date, salonId)
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
        {showModal && modalType === 'edit' && selectedSlot && userType === 'salon' && (
          <Modal onClose={() => setShowModal(false)}>
            <Form formName='edit-schedule' closeModal={() => setShowModal(false)} openModal={null} editData={selectedSlot.date} refreshData={fetchSchedule} />
          </Modal>
        )}
      </div>
    </div>
  );
}
