export const today = new Date();

export const months = {
    0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June",
    6: "July", 7: "August", 8: "September", 9: "October", 10: "November", 11: "December"
};

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const isPastDate = (date) => {
    const todayCopy = new Date(today);
    todayCopy.setHours(0, 0, 0, 0);
    return date < todayCopy;
};

export const dayScheduleBookings = (scheduleDays, bookings) => {
    const appointments = {}

    scheduleDays.map(el => {
        const currentDay = el.date
        appointments[currentDay] = {
            open_time: el.start_time,
            closing_time: el.end_time,
            break_start: el.break_time_start,
            break_end: el.break_time_end,
            appointments: []
        }
    })

    Object.keys(appointments).forEach(date => {
        const { open_time, closing_time, break_start, break_end } = appointments[date]

        const slots = []
        let currentTime = new Date(`${date}T${open_time}`)
        const endTime = new Date(`${date}T${closing_time}`)
        const breakStart = new Date(`${date}T${break_start}`)
        const breakEnd = new Date(`${date}T${break_end}`)

        while (currentTime < endTime) {
            let nextTime = new Date(currentTime.getTime() + 30 * 60000)

            let slot = {
                start: currentTime.toTimeString().slice(0, 5),
                end: nextTime.toTimeString().slice(0, 5),
                status: "free",
                booking: null
            }

            if (currentTime >= breakStart && currentTime < breakEnd) {
                slot.status = "break"
            }

            bookings.forEach(booking => {
                let bookingStart = new Date(`${date}T${booking.start_time}`)
                let bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000)

                if (currentTime >= bookingStart && currentTime < bookingEnd && booking.date === date) {
                    slot.status = "booked"
                    slot.booking = booking
                }
            })

            slots.push(slot)
            currentTime = nextTime
        }
        appointments[date].appointments = slots
    })

    return appointments;
}



  