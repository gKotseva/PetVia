export const today = new Date();

export const formatDate = (date) => {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

export const getFullMonth = (monthIndex) => {
    return (`${new Date(2025, monthIndex).toLocaleString('en-US', { month: 'long' })}`)
}

export const compareDates = (date1, date2) => {
    if(new Date(date1).getTime() === new Date(date2).getTime()){
        return true
    } else {
        return false
    }
}

export const checkDateStatus = (date, schedule) => {
    const formattedDate = formatDate(date);
    const formattedToday = formatDate(today);
    let status = [];

    if (formattedDate < formattedToday) {
        status.push('past');
    } else if (formattedDate === formattedToday) {
        status.push('today');
    }

    if (formattedDate in schedule) {
        if (schedule[formattedDate].appointments.length > 0) {
            status.push('booked');
        } else {
            status.push('available');
        }
    } else {
        status.push('dayOff');
    }

    return status;
};

export const checkSalonAvailability = (schedule, bookings) => {
    const formattedSchedule = {};

    for (const date of schedule) {
        const appointments = bookings.filter(appointment => compareDates(date.date, appointment.date));

        formattedSchedule[date.date] = {
            appointments,
            schedule: date,
            slots: generateSlots(date, appointments) // ✅ Updated slot structure
        };
    }

    return formattedSchedule;
};

const generateSlots = (schedule, appointments) => {
    const { start_time, end_time, break_time_start, break_time_end } = schedule;

    const timeSlots = [];
    let currentTime = new Date(`1970-01-01T${start_time}`);
    const endTime = new Date(`1970-01-01T${end_time}`);
    const breakStartTime = new Date(`1970-01-01T${break_time_start}`);
    const breakEndTime = new Date(`1970-01-01T${break_time_end}`);

    while (currentTime < endTime) {
        let nextSlot = new Date(currentTime);
        nextSlot.setMinutes(nextSlot.getMinutes() + 30);

        const startTimeStr = currentTime.toTimeString().slice(0, 5);
        const endTimeStr = nextSlot.toTimeString().slice(0, 5);
        const slotString = `${startTimeStr} - ${endTimeStr}`;

        if (nextSlot > breakStartTime && currentTime < breakEndTime) {
            currentTime = nextSlot;
            continue;
        }

        // Find if there are any appointments that overlap with this time slot
        const bookedAppointments = appointments.filter(appointment => {
            const appointmentStartTime = new Date(`1970-01-01T${appointment.start_time}`);
            const appointmentEndTime = new Date(appointmentStartTime);
            appointmentEndTime.setMinutes(appointmentStartTime.getMinutes() + appointment.duration);

            // Check if the current slot overlaps with the appointment duration
            return appointmentStartTime < nextSlot && appointmentEndTime > currentTime;
        });

        // Mark slot as 'booked' if any appointment overlaps
        timeSlots.push({
            slot: slotString,
            status: bookedAppointments.length > 0 ? 'booked' : 'available',
            appointment: bookedAppointments.length > 0 ? bookedAppointments : []
        });

        currentTime = nextSlot;
    }

    return timeSlots;
};




