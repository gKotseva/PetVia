import './TimePicker.modules.css';

import { useState } from 'react';
import { LuAlarmClock } from "react-icons/lu";


export function TimePicker({ value = "", onChange }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 10, 20, 30, 40, 50];
  const [showPicker, setShowPicker] = useState(false);

  const [hour, minute] = value.split(':').map(Number);
  const selectedHour = isNaN(hour) ? 0 : hour;
  const selectedMinute = isNaN(minute) ? 0 : minute;

  const handleHourChange = (e) => {
    const newHour = e.target.value;
    onChange && onChange(`${String(newHour).padStart(2, '0')}:${String(selectedMinute).padStart(2, '0')}`);
  };

  const handleMinuteChange = (e) => {
    const newMinute = e.target.value;
    onChange && onChange(`${String(selectedHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`);
  };

  return (
    <div className="time-picker">
      <div className="select" onClick={() => setShowPicker(!showPicker)}>
        <p>{value || 'HH:MM'}</p>
        <LuAlarmClock />
      </div>
      {showPicker && (
        <div className="options">
          <div className="time-column">
            <select size="6" value={selectedHour} onChange={handleHourChange}>
              {hours.map(h => (
                <option key={h} value={h}>
                  {String(h).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
          <div className="time-column">
            <select size="6" value={selectedMinute} onChange={handleMinuteChange}>
              {minutes.map(m => (
                <option key={m} value={m}>
                  {String(m).padStart(2, '0')}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

