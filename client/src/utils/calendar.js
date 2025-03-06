export const today = new Date();

export const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const checkDateStatus = (date, selectedDate = null) => {
    const today = new Date();

    const formattedToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const formattedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const isPast = formattedDate < formattedToday;

    const isToday = formattedDate.getTime() === formattedToday.getTime();

    const isSelected = selectedDate && formattedDate.getTime() === new Date(selectedDate).setHours(0, 0, 0, 0);

    return { isPast, isToday, isSelected };
};

export const getFullMonth = (monthIndex) => {
    return (`${new Date(2025, monthIndex).toLocaleString('en-US', { month: 'long' })}`)
}

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

export const checkAvailableSlots = (bookings, serviceInfo) => {
    const neededSlots = serviceInfo.duration / 30;
    const dates = {};

    console.log(bookings['2025-03-26'])

    Object.entries(bookings).forEach(([date, booking]) => {
        const appointments = booking.appointments;
        let availableCount = 0;
        let isAvailable = false;

        console.log(booking.appointments)
        for (let el of appointments) {
            if (el.status === 'free') {
                availableCount++;
            } else {
                availableCount = 0;
            }

            if (availableCount === neededSlots) {
                isAvailable = true;
                break;
            }
        }

        dates[date] = isAvailable
    });

    return dates;
};



