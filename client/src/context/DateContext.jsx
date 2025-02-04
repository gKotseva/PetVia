



        import React, { createContext, useEffect, useState } from 'react';

        export const DateContext = createContext();
        
        export const DateProvider = ({ children }) => {
          const [datesOfTheMonth, setDatesOfTheMonth] = useState([]);

          useEffect(() => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            const currentYear = currentDate.getFullYear();
        
            const daysInMonth = [];
        
            const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        
            const currentDay = currentDate.getDate();
        
            for (let day = 1; day <= daysInCurrentMonth; day++) {
              const formattedDay = String(day).padStart(2, '0');
              const formattedMonth = String(currentMonth + 1).padStart(2, '0');
              daysInMonth.push(`${formattedDay}.${formattedMonth}.${currentYear}`);
            }
        
            setDatesOfTheMonth(daysInMonth);
          }, []);
        

          return (
            <DateContext.Provider value={{
                datesOfTheMonth
            }}>
              {children}
            </DateContext.Provider>
          );
        };