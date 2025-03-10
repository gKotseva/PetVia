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

export const checkSalonAvailability = (schedule, bookings) => {
    const formattedSchedule = []

    for (const date of schedule) {
        formattedSchedule[date.date] = []
        for (const appointment of bookings) {
            const result = compareDates(date.date, appointment.date)
            if (!result) {
                break
            } else {
                formattedSchedule[date.date].push(appointment)
            }
        }
    }

    return formattedSchedule
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
        if (schedule[formattedDate].length > 0) {
            status.push('booked');
        } else {
            status.push('available');
        }
    } else {
        status.push('dayOff');
    }

    return status;
};
