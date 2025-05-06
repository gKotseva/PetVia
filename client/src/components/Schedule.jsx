import './Schedule.modules.css';
import { useEffect, useState } from "react";
import { getDaysInMonth, getStartDayOfMonth, weekDays } from "../utils/date";

export function Schedule () {
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const days = getDaysInMonth(currentYear, currentMonth + 1);
    setDaysInMonth(days);
  }, [currentMonth, currentYear]);

  const toggleDateSelection = (date) => {
    setSelectedDates((prevSelectedDates) => {
      if (prevSelectedDates.includes(date)) {
        return prevSelectedDates.filter((selectedDate) => selectedDate !== date);
      } else {
        return [...prevSelectedDates, date];
      }
    });
  };

  const startDay = getStartDayOfMonth(currentYear, currentMonth + 1);
  const emptyDays = Array(startDay === 0 ? 6 : startDay - 1).fill(null);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthName = new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' });

  return (
    <div className="add-schedule-container">
      <div className="small-calendar-container">
        <h5>Please select your working dates:</h5>
        <div className="small-calendar-heading">
          <div className="header">
            <h5>{monthName} {currentYear}</h5>
          </div>
          <div className="arrows">
            <h5 onClick={prevMonth}>{'<'}</h5>
            <h5 onClick={nextMonth}>{'>'}</h5>
          </div>
        </div>
        <div className="small-calendar-days-container">
          {weekDays.map((day) => (
            <div key={day} className="calendar-weekday">
              <p>{day}</p>
            </div>
          ))}

          {emptyDays.map((_, idx) => (
            <div key={idx} className="small-calendar-day empty"></div>
          ))}

          {daysInMonth.map((date) => {
            const day = Number(date.split('-')[2]);
            const isSelected = selectedDates.includes(date.toString());

            return (
              <p
                key={day}
                className={`small-calendar-day ${isSelected ? 'selected' : ''}`}
                onClick={() => toggleDateSelection(date.toString())}
              >
                {day}
              </p>
            );
          })}
        </div>
      </div>
      <div className="schedule-form-container">
        <h5>Enter time for selected dates:</h5>
        <form>
          <label>Open time</label>
          <input type="time"></input>
          <label>Close time</label>
          <input type="time"></input>
          <label>Break start time</label>
          <input type="time"></input>
          <label>Break end time</label>
          <input type="time"></input>
          <button className='custom-button'>Submit</button>
        </form>
      </div>
    </div>
  );
}
